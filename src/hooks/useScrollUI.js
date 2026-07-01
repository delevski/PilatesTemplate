import { useEffect, useState } from 'react';

export function useScrollUI() {
  const [state, setState] = useState({ progress: 0, showBackToTop: false, isScrolled: false });
  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        setState({ progress: max > 0 ? scrollY / max * 100 : 0, showBackToTop: scrollY > 700, isScrolled: scrollY > 20 });
      });
    };
    update(); addEventListener('scroll', update, { passive: true });
    return () => { removeEventListener('scroll', update); cancelAnimationFrame(frame); };
  }, []);
  return state;
}
