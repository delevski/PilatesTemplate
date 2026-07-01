import { beforeEach, describe, expect, it } from 'vitest';
import { submitLead } from './leads';

describe('submitLead', () => {
  beforeEach(() => localStorage.clear());

  it('normalizes and persists a valid lead', async () => {
    const result = await submitLead({ name: '  Maya  ', phone: ' 050 123 4567 ', email: ' MAYA@EXAMPLE.COM ', session: 'Private', contactTime: 'Morning' });
    const [stored] = JSON.parse(localStorage.getItem('lumina_leads'));
    expect(stored).toMatchObject({ name: 'Maya', phone: '050 123 4567', email: 'maya@example.com', session: 'Private', contactTime: 'Morning' });
    expect(result).toEqual({ id: stored.id, storedAt: stored.storedAt });
  });

  it.each(['name', 'phone', 'email'])('rejects a lead missing %s', async (field) => {
    const lead = { name: 'Maya', phone: '0501234567', email: 'm@example.com' };
    lead[field] = '';
    await expect(submitLead(lead)).rejects.toThrow(`${field} is required`);
  });

  it('preserves previously captured leads', async () => {
    localStorage.setItem('lumina_leads', JSON.stringify([{ id: 'existing' }]));
    await submitLead({ name: 'Maya', phone: '0501234567', email: 'm@example.com' });
    expect(JSON.parse(localStorage.getItem('lumina_leads'))).toHaveLength(2);
  });
});
