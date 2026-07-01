export const LEAD_ENDPOINT = '';
const STORAGE_KEY = 'lumina_leads';

export async function submitLead(input) {
  const lead = {
    name: input.name?.trim(),
    phone: input.phone?.trim(),
    email: input.email?.trim().toLowerCase(),
    session: input.session?.trim() || 'Not specified',
    contactTime: input.contactTime?.trim() || 'Not specified',
  };
  for (const field of ['name', 'phone', 'email']) {
    if (!lead[field]) throw new Error(`${field} is required`);
  }
  const record = { ...lead, id: crypto.randomUUID(), storedAt: new Date().toISOString() };
  const previous = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...previous, record]));

  if (LEAD_ENDPOINT) {
    const response = await fetch(LEAD_ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record),
    });
    if (!response.ok) throw new Error('Lead delivery failed');
  }
  return { id: record.id, storedAt: record.storedAt };
}
