import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { testimonials } from '../data/content';
import { SectionHeader } from './SectionHeader';

export function Testimonials() {
  const [index,setIndex]=useState(0); const [paused,setPaused]=useState(false); const touch=useRef(0);
  const go = n => setIndex((n+testimonials.length)%testimonials.length);
  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer=setInterval(()=>setIndex(i=>(i+1)%testimonials.length),6000); return()=>clearInterval(timer);
  },[paused]);
  const t=testimonials[index];
  return <section className="section testimonials" id="stories"><div className="container">
    <div className="testimonials-head"><SectionHeader eyebrow="Member stories" title={<>Strength you can<br/><em>feel and see.</em></>}/><div className="rating-summary"><b>4.9</b><span>★★★★★<small>Based on member feedback</small></span></div></div>
    <div className="testimonial-stage" role="region" aria-label="Testimonials carousel" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocus={()=>setPaused(true)} onBlur={()=>setPaused(false)} onTouchStart={e=>touch.current=e.touches[0].clientX} onTouchEnd={e=>{const d=e.changedTouches[0].clientX-touch.current;if(Math.abs(d)>40)go(index+(d<0?1:-1))}}>
      <div className="quote-mark"><Quote/></div><blockquote aria-live="polite">“{t.quote}”</blockquote><div className="client"><img src={t.image} alt=""/><div><b>{t.name}</b><span>{t.role}</span></div></div>
      <div className="carousel-controls"><button type="button" aria-label="Previous testimonial" onClick={()=>go(index-1)}><ArrowLeft/></button><div>{testimonials.map((item,i)=><button type="button" key={item.name} aria-label={`Show testimonial ${i+1}`} aria-current={i===index} onClick={()=>go(i)}/>)}</div><button type="button" aria-label="Next testimonial" onClick={()=>go(index+1)}><ArrowRight/></button></div>
      <span className="testimonial-count">0{index+1} / 0{testimonials.length}</span>
    </div>
  </div></section>;
}
