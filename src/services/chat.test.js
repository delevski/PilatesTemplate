import { describe, expect, it, vi } from 'vitest';
import { detectLanguage, getLocalReply, sendChatMessage } from './chat';

describe('chat service', () => {
  it('detects Hebrew and English messages', () => {
    expect(detectLanguage('מה המחיר?')).toBe('he');
    expect(detectLanguage('What does it cost?')).toBe('en');
  });

  it('answers pricing from the configured membership plans', () => {
    const reply = getLocalReply('מה המחירים?');

    expect(reply.text).toContain('₪390');
    expect(reply.text).toContain('₪690');
    expect(reply.intent).toBe('pricing');
    expect(reply.language).toBe('he');
  });

  it('offers lead capture only for booking or exact availability intent', () => {
    expect(getLocalReply('אפשר לקבוע מחר בשעה 10?').offerLead).toBe(true);
    expect(getLocalReply('אני מתחילה').offerLead).toBe(false);
  });

  it('provides a non-diagnostic response for medical questions', () => {
    const reply = getLocalReply('כואב לי הגב, מה יש לי?');

    expect(reply.intent).toBe('medical');
    expect(reply.text).toContain('לא יכול');
  });

  it('uses the remote endpoint when configured', async () => {
    const remote = { text: 'Remote answer', language: 'en', intent: 'greeting', offerLead: false };
    const fetchFn = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(remote) });

    await expect(sendChatMessage({ message: 'Hello', history: [] }, fetchFn, 'https://example.test/chat')).resolves.toEqual(remote);
    expect(fetchFn).toHaveBeenCalledWith('https://example.test/chat', expect.objectContaining({ method: 'POST' }));
  });

  it('falls back locally when the remote endpoint fails', async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error('offline'));
    const reply = await sendChatMessage({ message: 'prices', history: [] }, fetchFn, 'https://example.test/chat');

    expect(reply.intent).toBe('pricing');
    expect(reply.degraded).toBe(true);
  });
});
