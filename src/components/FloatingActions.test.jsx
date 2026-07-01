import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FloatingActions } from './FloatingActions';

describe('FloatingActions', () => {
  it('adds a decorative hover label to the WhatsApp link', () => {
    render(<FloatingActions showBackToTop={false} />);
    const whatsapp = screen.getByRole('link', { name: 'Chat on WhatsApp' });
    const label = whatsapp.querySelector('.floating-label');

    expect(label).toHaveTextContent('WhatsApp');
    expect(label).toHaveAttribute('aria-hidden', 'true');
  });
});
