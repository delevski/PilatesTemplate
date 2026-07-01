import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { Button } from './Button';
import { NAV_ITEMS } from '../config/studio';

export function Header({ onBook, isScrolled }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.classList.toggle('menu-open', open); return () => document.body.classList.remove('menu-open'); }, [open]);
  useEffect(() => { const key = e => e.key === 'Escape' && setOpen(false); addEventListener('keydown', key); return () => removeEventListener('keydown', key); }, []);
  return <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
    <a href="#home" className="logo-link" aria-label="Lumina Pilates home"><BrandMark /></a>
    <nav className={`nav${open ? ' is-open' : ''}`} aria-label="Primary navigation">
      {NAV_ITEMS.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      <Button onClick={() => { setOpen(false); onBook(); }}>Book a session</Button>
    </nav>
    <button type="button" className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? <X/> : <Menu/>}</button>
  </header>;
}
