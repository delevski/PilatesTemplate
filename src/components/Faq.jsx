import { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqs } from '../data/content';
import { SectionHeader } from './SectionHeader';

export function Faq() { const [open,setOpen]=useState(0); return <section className="section faq-section" id="faq"><div className="container faq-grid"><SectionHeader eyebrow="Everything you need" title={<>Questions,<br/><em>answered.</em></>} text="Still curious? We are one message away."/><div className="faq-list">{faqs.map(([q,a],i)=><div className={`faq-item${open===i?' is-open':''}`} key={q}><button type="button" aria-expanded={open===i} aria-controls={`answer-${i}`} onClick={()=>setOpen(open===i?-1:i)}><span>0{i+1}</span>{q}<Plus/></button><div className="faq-answer" id={`answer-${i}`}><div><p>{a}</p></div></div></div>)}</div></div></section>; }
