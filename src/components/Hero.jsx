import { useRef } from 'react';
import { Play, Check } from 'lucide-react';
import { Button } from './Button';

export function Hero({ onBook }) {
  const image = useRef(null);
  const move = e => {
    if (!matchMedia('(pointer:fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    image.current.style.transform = `scale(1.035) translate(${((e.clientX-rect.left)/rect.width-.5)*-8}px, ${((e.clientY-rect.top)/rect.height-.5)*-8}px)`;
  };
  return <section className="hero" id="home">
    <div className="hero-copy">
      <span className="eyebrow hero-kicker">Boutique movement studio · Tel Aviv</span>
      <h1>Your Strongest<br/><em>Version</em> Starts Here.</h1>
      <p>Private and small-group Pilates sessions designed to improve posture, strength, flexibility and confidence.</p>
      <div className="hero-actions"><Button onClick={onBook}>Book Your First Session</Button><a className="tour-link" href="#experience"><span><Play size={14} fill="currentColor"/></span> Watch Studio Tour</a></div>
      <div className="trust-row">{['Certified Trainers','Personalized Programs','Premium Equipment','5-Star Experience'].map(x => <span key={x}><Check size={13}/>{x}</span>)}</div>
    </div>
    <div className="hero-visual" onMouseMove={move} onMouseLeave={() => image.current.style.transform = ''}>
      <div className="orbit orbit--one"/><div className="orbit orbit--two"/>
      <img ref={image} src="/images/hero-studio.webp" alt="Confident Pilates instructor in a sunlit luxury studio" width="1536" height="1024" fetchPriority="high" />
      <div className="hero-note"><span>01</span><p><b>Purposeful movement.</b><br/>Exceptional guidance.</p></div>
      <div className="rating-pill"><b>4.9</b><span>★★★★★<small>Member rating</small></span></div>
    </div>
    <a href="#why-us" className="scroll-cue">Scroll to discover <i/></a>
  </section>;
}
