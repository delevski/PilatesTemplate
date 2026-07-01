# Lumina Pilates Chat Agent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a premium bilingual static-site chat advisor for Pilates, prices, availability, safety guidance, and booking-intent lead capture.

**Architecture:** A deterministic local knowledge engine provides safe GitHub Pages-compatible answers. `sendChatMessage()` becomes the stable adapter for a future `CHAT_ENDPOINT`; the React widget owns presentation and delegates existing lead delivery to `submitLead()`.

**Tech Stack:** React 19, Vite, Vitest, Testing Library, Lucide React, CSS

## Global Constraints

- The first release must work with an empty `CHAT_ENDPOINT` on GitHub Pages.
- Support Hebrew and English and render each message in the correct direction.
- Never expose API credentials in frontend code.
- Never invent prices or confirmed appointment slots.
- Collect contact details only after booking or exact-time intent and explicit submission.
- Medical answers are general information and must not diagnose.
- Preserve the separate WhatsApp and back-to-top controls.

---

### Task 1: Local Knowledge and Chat Adapter

**Files:**
- Create: `src/config/chat.js`
- Create: `src/services/chat.js`
- Create: `src/services/chat.test.js`
- Read: `src/data/content.js`

**Interfaces:**
- Produces: `detectLanguage(message)`, `getLocalReply(message, language?)`, and `sendChatMessage({ message, history }, fetchFn?)`.
- `getLocalReply` returns `{ text, language, intent, offerLead }`.
- `sendChatMessage` returns the local shape plus optional `degraded: true` after endpoint failure.

- [ ] **Step 1: Write failing intent, bilingual, safety, and fallback tests**

```js
import { describe, expect, it, vi } from 'vitest';
import { detectLanguage, getLocalReply, sendChatMessage } from './chat';

describe('chat service', () => {
  it('detects Hebrew and English', () => {
    expect(detectLanguage('מה המחיר?')).toBe('he');
    expect(detectLanguage('What does it cost?')).toBe('en');
  });

  it('answers pricing from the configured plans', () => {
    const reply = getLocalReply('מה המחירים?');
    expect(reply.text).toContain('₪390');
    expect(reply.text).toContain('₪690');
    expect(reply.intent).toBe('pricing');
  });

  it('offers a lead only for booking intent', () => {
    expect(getLocalReply('אפשר לקבוע מחר בשעה 10?').offerLead).toBe(true);
    expect(getLocalReply('אני מתחילה').offerLead).toBe(false);
  });

  it('does not diagnose medical questions', () => {
    const reply = getLocalReply('כואב לי הגב, מה יש לי?');
    expect(reply.intent).toBe('medical');
    expect(reply.text).toContain('לא יכול');
  });

  it('falls back locally when the endpoint fails', async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error('offline'));
    const reply = await sendChatMessage({ message: 'prices', history: [] }, fetchFn, 'https://example.test/chat');
    expect(reply.intent).toBe('pricing');
    expect(reply.degraded).toBe(true);
  });
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `npm test -- src/services/chat.test.js --run`
Expected: FAIL because `src/services/chat.js` does not exist.

- [ ] **Step 3: Add chat configuration**

```js
export const CHAT_ENDPOINT = '';

export const GENERAL_AVAILABILITY = {
  en: 'General availability: Sunday–Thursday, mornings and evenings. Exact times are confirmed by the studio.',
  he: 'זמינות כללית: ראשון–חמישי, בשעות הבוקר והערב. שעות מדויקות מאושרות מול הסטודיו.',
};
```

- [ ] **Step 4: Implement the local engine and endpoint adapter**

```js
import { plans } from '../data/content';
import { CHAT_ENDPOINT, GENERAL_AVAILABILITY } from '../config/chat';

export function detectLanguage(text = '') {
  return /[\u0590-\u05ff]/.test(text) ? 'he' : 'en';
}

const has = (text, terms) => terms.some(term => text.includes(term));

export function getLocalReply(message, requestedLanguage) {
  const language = requestedLanguage || detectLanguage(message);
  const value = message.toLocaleLowerCase();
  const he = language === 'he';
  const prices = plans.map(plan => `${plan.name} ${plan.price}`).join(' · ');
  let intent = 'out-of-scope';
  if (has(value, ['מחיר', 'עלות', 'price', 'cost', 'membership'])) intent = 'pricing';
  else if (has(value, ['זמינ', 'שעה', 'מתי', 'available', 'availability', 'time'])) intent = 'availability';
  else if (has(value, ['כאב', 'פציע', 'רפוא', 'pregnan', 'pain', 'injur', 'medical'])) intent = 'medical';
  else if (has(value, ['לקבוע', 'להזמין', 'book', 'schedule', 'exact time'])) intent = 'booking';
  else if (has(value, ['מתחיל', 'מתחילה', 'beginner', 'first time'])) intent = 'beginner';
  else if (has(value, ['פרטי', 'private'])) intent = 'private';
  else if (has(value, ['קבוצה', 'group'])) intent = 'group';
  else if (has(value, ['שלום', 'היי', 'hello', 'hi'])) intent = 'greeting';

  const text = {
    pricing: he ? `המסלולים שלנו: ${prices}. המחירים באתר הם מחירי דוגמה עד לאישור הסטודיו.` : `Our plans: ${prices}. Website prices are sample offers pending studio confirmation.`,
    availability: GENERAL_AVAILABILITY[language],
    medical: he ? 'אני יכול לתת מידע כללי בלבד ולא יכול לאבחן. בכאב מתמשך, חריף או לאחר פציעה כדאי להתייעץ עם רופא או פיזיותרפיסט לפני אימון.' : 'I can offer general information only and cannot diagnose. For acute, persistent, worsening, or post-injury pain, please consult a physician or physiotherapist before training.',
    booking: he ? 'בשמחה. אשמור את הפרטים שלך כדי שהסטודיו יאשר שעה מדויקת.' : 'Absolutely. I can collect your details so the studio can confirm an exact time.',
    beginner: he ? 'מתחילים מתקבלים בחום. השיעור הראשון מותאם לרמה שלך וכולל היכרות והערכת תנועה רגועה.' : 'Beginners are warmly welcomed. Your first session is adapted to your level and includes a relaxed movement assessment.',
    private: he ? 'שיעור פרטי מעניק תשומת לב מלאה ותכנית שמותאמת למטרות ולגוף שלך.' : 'A private session gives you complete attention and a program tailored to your goals and body.',
    group: he ? 'הקבוצות קטנות כדי לשמור על הדרכה אישית לצד אנרגיה משותפת.' : 'Groups stay small, balancing personal guidance with shared energy.',
    greeting: he ? 'שלום, אני Lumina Advisor. אפשר לשאול אותי על פילאטיס, מחירים, זמינות והתאמת מסלול.' : 'Hello, I’m Lumina Advisor. Ask me about Pilates, pricing, availability, or finding the right session.',
    'out-of-scope': he ? 'אני מתמחה בפילאטיס ובשירותי Lumina. אפשר לשאול על מחירים, זמינות או איזה מסלול מתאים לך.' : 'I specialize in Pilates and Lumina services. Ask about pricing, availability, or which experience may suit you.',
  }[intent];
  return { text, language, intent, offerLead: intent === 'booking' || intent === 'availability' };
}

export async function sendChatMessage({ message, history = [] }, fetchFn = fetch, endpoint = CHAT_ENDPOINT) {
  if (!endpoint) return getLocalReply(message);
  try {
    const response = await fetchFn(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, history }) });
    if (!response.ok) throw new Error('Chat delivery failed');
    return await response.json();
  } catch {
    return { ...getLocalReply(message), degraded: true };
  }
}
```

- [ ] **Step 5: Run focused tests and confirm GREEN**

Run: `npm test -- src/services/chat.test.js --run`
Expected: all chat-service tests PASS.

---

### Task 2: Accessible Chat Widget and Lead Capture

**Files:**
- Create: `src/components/ChatWidget.jsx`
- Create: `src/components/ChatWidget.test.jsx`
- Modify: `src/components/FloatingActions.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `sendChatMessage({ message, history })` and `submitLead(form)`.
- Produces: an accessible “Ask Lumina” trigger, dialog, bilingual messages, quick actions, and conditional lead form.

- [ ] **Step 1: Write failing component tests**

```jsx
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChatWidget } from './ChatWidget';

describe('ChatWidget', () => {
  it('opens, answers in Hebrew, and offers lead capture for availability', async () => {
    render(<ChatWidget initialLanguage="he" />);
    fireEvent.click(screen.getByRole('button', { name: 'Ask Lumina' }));
    fireEvent.change(screen.getByLabelText('הודעה'), { target: { value: 'יש זמינות מחר?' } });
    fireEvent.submit(screen.getByLabelText('טופס הודעה'));
    expect(await screen.findByText(/זמינות כללית/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /השארת פרטים/ })).toBeInTheDocument();
  });

  it('submits a lead only after explicit confirmation', async () => {
    const submitLeadFn = vi.fn().mockResolvedValue({ id: '1' });
    render(<ChatWidget initialLanguage="en" submitLeadFn={submitLeadFn} />);
    fireEvent.click(screen.getByRole('button', { name: 'Ask Lumina' }));
    fireEvent.click(screen.getByRole('button', { name: 'Availability' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Share contact details' }));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Maya' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '0501234567' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'maya@example.com' } });
    expect(submitLeadFn).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Send details' }));
    await waitFor(() => expect(submitLeadFn).toHaveBeenCalledTimes(1));
  });
});
```

- [ ] **Step 2: Run the focused component test and confirm RED**

Run: `npm test -- src/components/ChatWidget.test.jsx --run`
Expected: FAIL because `ChatWidget` does not exist.

- [ ] **Step 3: Implement `ChatWidget`**

Implement a component with:

```jsx
export function ChatWidget({ initialLanguage, sendMessage = sendChatMessage, submitLeadFn = submitLead }) {
  // Own open, messages, draft, loading, lead-form, lead-status and focus state.
  // Render the fixed trigger, role="dialog" panel, quick actions, message form,
  // and the explicit lead form only after `reply.offerLead`.
}
```

Required UI contracts:

```jsx
<button ref={triggerRef} className="chat-trigger" aria-label="Ask Lumina" aria-expanded={open} onClick={openChat}>...</button>
<section className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title">...</section>
<div className="chat-messages" aria-live="polite">...</div>
<form aria-label={he ? 'טופס הודעה' : 'Message form'} onSubmit={handleSend}>...</form>
```

Quick actions map to real visitor messages in both languages. Each assistant message receives `dir={message.language === 'he' ? 'rtl' : 'ltr'}`. Escape closes the panel; close restores focus to `triggerRef`.

- [ ] **Step 4: Add the widget to floating actions**

```jsx
import { ChatWidget } from './ChatWidget';

export function FloatingActions({ showBackToTop }) {
  return <div className="floating-actions">
    <ChatWidget />
    {/* existing WhatsApp and back-to-top controls */}
  </div>;
}
```

- [ ] **Step 5: Add premium responsive styling**

Add styles for `.chat-trigger`, `.chat-panel`, `.chat-header`, `.chat-messages`, `.chat-message`, `.chat-quick-actions`, `.chat-composer`, `.chat-lead`, loading states, right-to-left content, desktop corner placement, and a mobile bottom sheet under `@media(max-width:700px)`.

- [ ] **Step 6: Run component tests and confirm GREEN**

Run: `npm test -- src/components/ChatWidget.test.jsx --run`
Expected: all chat-widget tests PASS.

---

### Task 3: Integration Verification and Documentation

**Files:**
- Modify: `README.md`
- Verify: all files from Tasks 1–2

**Interfaces:**
- Documents `CHAT_ENDPOINT`, local availability, demo behavior, safety scope, and lead integration.

- [ ] **Step 1: Document configuration**

Add concise sections explaining:

```md
## Lumina chat advisor

The floating bilingual advisor runs locally from trusted studio content when `CHAT_ENDPOINT` is empty. Configure availability in `src/config/chat.js`. Connect a real agent through a protected server/serverless endpoint; never place API keys in frontend code.
```

- [ ] **Step 2: Run full automated verification**

Run: `npm test -- --run && npm run build && git diff --check`
Expected: every test PASS, Vite build exits 0, and diff check produces no output.

- [ ] **Step 3: Run React Doctor**

Run: `npx -y react-doctor@latest . --verbose --diff`
Expected: no new correctness, accessibility, or performance errors caused by this feature.

- [ ] **Step 4: Verify in the local browser**

Verify desktop and mobile:

- Ask Lumina opens and closes.
- Hebrew pricing and English availability replies render correctly.
- The lead form appears only after booking/availability intent.
- WhatsApp and back-to-top remain usable.
- The panel fits the viewport and keyboard focus returns to the trigger.
