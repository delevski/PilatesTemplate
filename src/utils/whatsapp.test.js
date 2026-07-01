import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl } from './whatsapp';

describe('buildWhatsAppUrl', () => {
  it('normalizes the number and encodes lead context', () => {
    const url = buildWhatsAppUrl({ name: 'Maya', session: 'Private session' }, '+972 50-000-0000');
    expect(url).toMatch(/^https:\/\/wa\.me\/972500000000\?text=/);
    expect(decodeURIComponent(url)).toContain('Maya');
    expect(decodeURIComponent(url)).toContain('Private session');
  });
});
