import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { sendChatMessage } from '../services/chat';
import { submitLead } from '../services/leads';

const copy = {
  en: {
    welcome: 'Hello, I’m Lumina Advisor. Ask me about Pilates, pricing, availability, or finding the right session.',
    placeholder: 'Write a message…', messageLabel: 'Message', formLabel: 'Message form', close: 'Close chat',
    quick: [['Pricing', 'What are the prices?'], ['Availability', 'What is the general availability?'], ['Beginners', 'I am a beginner'], ['Book a session', 'I want to book a session']],
    share: 'Share contact details', leadTitle: 'Let the studio find your time.', name: 'Name', phone: 'Phone', email: 'Email',
    leadForm: 'Contact details form', sendDetails: 'Send details', sending: 'Sending…', success: 'Your details were received.',
    error: 'We couldn’t save your details. Please try again.', privacy: 'Your details are used only to continue your booking conversation.',
  },
  he: {
    welcome: 'שלום, אני Lumina Advisor. אפשר לשאול אותי על פילאטיס, מחירים, זמינות והתאמת מסלול.',
    placeholder: 'כתבו הודעה…', messageLabel: 'הודעה', formLabel: 'טופס הודעה', close: 'סגירת הצ׳אט',
    quick: [['מחירים', 'מה המחירים?'], ['זמינות', 'מה הזמינות הכללית?'], ['מתחילים', 'אני מתחילה'], ['קביעת שיעור', 'אני רוצה לקבוע שיעור']],
    share: 'השארת פרטים', leadTitle: 'נמצא יחד את הזמן המתאים.', name: 'שם', phone: 'טלפון', email: 'אימייל',
    leadForm: 'טופס פרטי קשר', sendDetails: 'שליחת פרטים', sending: 'שולח…', success: 'הפרטים התקבלו.',
    error: 'לא הצלחנו לשמור את הפרטים. אפשר לנסות שוב.', privacy: 'הפרטים משמשים רק להמשך שיחת קביעת השיעור.',
  },
};

const initialLead = { name: '', phone: '', email: '' };

export function ChatWidget({ initialLanguage, sendMessage = sendChatMessage, submitLeadFn = submitLead }) {
  const browserLanguage = typeof navigator !== 'undefined' && navigator.language?.startsWith('he') ? 'he' : 'en';
  const startingLanguage = initialLanguage || browserLanguage;
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState(startingLanguage);
  const [messages, setMessages] = useState([{ id: 'welcome', role: 'assistant', text: copy[startingLanguage].welcome, language: startingLanguage }]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadOffered, setLeadOffered] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState(initialLead);
  const [leadStatus, setLeadStatus] = useState('idle');
  const triggerRef = useRef(null);
  const inputRef = useRef(null);
  const t = copy[language];
  const direction = language === 'he' ? 'rtl' : 'ltr';

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const compactHistory = useMemo(() => messages.slice(-6).map(({ role, text }) => ({ role, text })), [messages]);

  const closeChat = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const sendText = async text => {
    const value = text.trim();
    if (!value || loading) return;
    const messageLanguage = /[\u0590-\u05ff]/.test(value) ? 'he' : 'en';
    setLanguage(messageLanguage);
    setMessages(current => [...current, { id: crypto.randomUUID(), role: 'user', text: value, language: messageLanguage }]);
    setDraft('');
    setLoading(true);
    const reply = await sendMessage({ message: value, history: compactHistory });
    setMessages(current => [...current, { id: crypto.randomUUID(), role: 'assistant', ...reply }]);
    setLeadOffered(Boolean(reply.offerLead));
    setLoading(false);
  };

  const handleMessage = event => {
    event.preventDefault();
    sendText(draft);
  };

  const handleLead = async event => {
    event.preventDefault();
    if (!lead.name.trim() || !lead.phone.trim() || !lead.email.trim() || leadStatus === 'loading') return;
    setLeadStatus('loading');
    try {
      await submitLeadFn({ ...lead, session: 'Chat enquiry', contactTime: 'Not specified' });
      setLeadStatus('success');
    } catch {
      setLeadStatus('error');
    }
  };

  return <>
    <button ref={triggerRef} type="button" className="chat-trigger" aria-label="Ask Lumina" aria-expanded={open} onClick={() => setOpen(value => !value)}>
      <Sparkles/><span className="chat-trigger-label" aria-hidden="true">Ask Lumina</span>
    </button>
    {open && <section className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title" onKeyDown={event => event.key === 'Escape' && closeChat()} dir={direction}>
      <header className="chat-header">
        <span className="chat-avatar"><Sparkles/></span>
        <div><b id="chat-title">Lumina Pilates Advisor</b><small><i/> Available now</small></div>
        <button type="button" onClick={closeChat} aria-label={t.close}><X/></button>
      </header>
      <div className="chat-messages" aria-live="polite">
        {messages.map(message => <div key={message.id} className={`chat-message is-${message.role}`} dir={message.language === 'he' ? 'rtl' : 'ltr'}>{message.text}</div>)}
        {loading && <div className="chat-typing" aria-label="Lumina is typing"><i/><i/><i/></div>}
        {leadOffered && !showLead && leadStatus !== 'success' && <button type="button" className="chat-lead-offer" onClick={() => setShowLead(true)}>{t.share}<ArrowRight/></button>}
        {showLead && <form className="chat-lead" aria-label={t.leadForm} onSubmit={handleLead}>
          {leadStatus === 'success' ? <div className="chat-lead-success"><Sparkles/><b>{t.success}</b></div> : <>
            <b>{t.leadTitle}</b>
            <label>{t.name}<input aria-label={t.name} value={lead.name} onChange={event => setLead({ ...lead, name: event.target.value })}/></label>
            <label>{t.phone}<input aria-label={t.phone} value={lead.phone} onChange={event => setLead({ ...lead, phone: event.target.value })}/></label>
            <label>{t.email}<input aria-label={t.email} type="email" value={lead.email} onChange={event => setLead({ ...lead, email: event.target.value })}/></label>
            {leadStatus === 'error' && <p className="chat-error" role="alert">{t.error}</p>}
            <button type="submit" disabled={leadStatus === 'loading'}>{leadStatus === 'loading' ? t.sending : t.sendDetails}<ArrowRight/></button>
            <small>{t.privacy}</small>
          </>}
        </form>}
      </div>
      {!showLead && <>
        <div className="chat-quick-actions">{t.quick.map(([label, message]) => <button type="button" key={label} onClick={() => sendText(message)}>{label}</button>)}</div>
        <form className="chat-composer" aria-label={t.formLabel} onSubmit={handleMessage}>
          <MessageCircle aria-hidden="true"/>
          <input ref={inputRef} aria-label={t.messageLabel} value={draft} placeholder={t.placeholder} onChange={event => setDraft(event.target.value)}/>
          <button type="submit" aria-label={language === 'he' ? 'שליחה' : 'Send message'} disabled={!draft.trim() || loading}><Send/></button>
        </form>
      </>}
    </section>}
  </>;
}
