import { plans } from '../data/content';
import { CHAT_ENDPOINT, GENERAL_AVAILABILITY } from '../config/chat';

export function detectLanguage(text = '') {
  return /[\u0590-\u05ff]/.test(text) ? 'he' : 'en';
}

const includesAny = (text, terms) => terms.some(term => text.includes(term));

function detectIntent(value) {
  if (includesAny(value, ['כאב', 'כואב', 'פציע', 'רפוא', 'הריון', 'pregnan', 'pain', 'injur', 'medical'])) return 'medical';
  if (includesAny(value, ['לקבוע', 'להזמין', 'לקביעת', 'book', 'schedule', 'reserve', 'exact time'])) return 'booking';
  if (includesAny(value, ['מחיר', 'עלות', 'price', 'cost', 'membership'])) return 'pricing';
  if (includesAny(value, ['זמינ', 'שעה', 'מתי', 'available', 'availability', 'time'])) return 'availability';
  if (includesAny(value, ['מתחיל', 'מתחילה', 'פעם ראשונה', 'beginner', 'first time'])) return 'beginner';
  if (includesAny(value, ['פרטי', 'private'])) return 'private';
  if (includesAny(value, ['קבוצה', 'קבוצתי', 'group'])) return 'group';
  if (includesAny(value, ['שלום', 'היי', 'הי ', 'hello', 'hi ', 'hey'])) return 'greeting';
  return 'out-of-scope';
}

export function getLocalReply(message, requestedLanguage) {
  const language = requestedLanguage || detectLanguage(message);
  const value = message.trim().toLocaleLowerCase();
  const intent = detectIntent(value);
  const he = language === 'he';
  const prices = plans.map(plan => `${plan.name} ${plan.price}`).join(' · ');
  const responses = {
    pricing: he
      ? `המסלולים שלנו: ${prices}. המחירים באתר הם מחירי דוגמה עד לאישור הסטודיו.`
      : `Our plans: ${prices}. Website prices are sample offers pending studio confirmation.`,
    availability: GENERAL_AVAILABILITY[language],
    medical: he
      ? 'אני יכול לתת מידע כללי בלבד ולא יכול לאבחן. בכאב מתמשך, חריף או לאחר פציעה כדאי להתייעץ עם רופא או פיזיותרפיסט לפני אימון.'
      : 'I can offer general information only and cannot diagnose. For acute, persistent, worsening, or post-injury pain, please consult a physician or physiotherapist before training.',
    booking: he
      ? 'בשמחה. אפשר להשאיר פרטים כדי שהסטודיו יאשר איתך שעה מדויקת.'
      : 'Absolutely. You can share your details so the studio can confirm an exact time.',
    beginner: he
      ? 'מתחילים מתקבלים בחום. השיעור הראשון מותאם לרמה שלך וכולל היכרות והערכת תנועה רגועה.'
      : 'Beginners are warmly welcomed. Your first session is adapted to your level and includes a relaxed movement assessment.',
    private: he
      ? 'שיעור פרטי מעניק תשומת לב מלאה ותכנית שמותאמת למטרות ולגוף שלך.'
      : 'A private session gives you complete attention and a program tailored to your goals and body.',
    group: he
      ? 'הקבוצות קטנות כדי לשמור על הדרכה אישית לצד אנרגיה משותפת.'
      : 'Groups stay small, balancing personal guidance with shared energy.',
    greeting: he
      ? 'שלום, אני Lumina Advisor. אפשר לשאול אותי על פילאטיס, מחירים, זמינות והתאמת מסלול.'
      : 'Hello, I’m Lumina Advisor. Ask me about Pilates, pricing, availability, or finding the right session.',
    'out-of-scope': he
      ? 'אני מתמחה בפילאטיס ובשירותי Lumina. אפשר לשאול על מחירים, זמינות או איזה מסלול מתאים לך.'
      : 'I specialize in Pilates and Lumina services. Ask about pricing, availability, or which experience may suit you.',
  };

  return { text: responses[intent], language, intent, offerLead: intent === 'booking' };
}

export async function sendChatMessage({ message, history = [] }, fetchFn = fetch, endpoint = CHAT_ENDPOINT) {
  if (!endpoint) return getLocalReply(message);

  try {
    const response = await fetchFn(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });
    if (!response.ok) throw new Error('Chat delivery failed');
    return await response.json();
  } catch {
    return { ...getLocalReply(message), degraded: true };
  }
}
