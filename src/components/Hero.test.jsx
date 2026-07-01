import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders a silent looping inline hero video with poster fallback', () => {
    const { container } = render(<Hero onBook={() => {}} />);
    const video = container.querySelector('.hero-visual video');

    expect(video).toHaveAttribute('src', '/videos/lumina-hero.mp4');
    expect(video).toHaveAttribute('poster', '/images/hero-studio.webp');
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('playsinline');
    expect(video).not.toHaveAttribute('controls');
    expect(video.muted).toBe(true);
  });
});
