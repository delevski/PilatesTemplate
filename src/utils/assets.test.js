import { describe, expect, it } from 'vitest';
import { assetUrl } from './assets';

describe('assetUrl', () => {
  it('places public assets under the configured deployment base path', () => {
    expect(assetUrl('/images/hero-studio.webp', '/PilatesTemplate/'))
      .toBe('/PilatesTemplate/images/hero-studio.webp');
  });

  it('keeps root deployments free of duplicate slashes', () => {
    expect(assetUrl('images/coach.webp', '/')).toBe('/images/coach.webp');
  });
});
