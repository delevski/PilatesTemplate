import { Check } from 'lucide-react';
import { plans } from '../data/content';
import { Button } from './Button';
import { SectionHeader } from './SectionHeader';

export function Memberships({ onBook }) {
  return <section className="section memberships" id="memberships"><div className="container"><SectionHeader align="center" eyebrow="Memberships" title={<>Your practice.<br/><em>Your pace.</em></>} text="Choose the rhythm that supports the person you're becoming."/>
    <div className="plans-grid">{plans.map((p,i)=><article className={`plan-card${p.featured?' is-featured':''}`} key={p.name}>{p.featured&&<span className="popular">Most loved</span>}<span className="plan-no">0{i+1}</span><h3>{p.name}</h3><p>{p.desc}</p><div className="price"><b>{p.price}</b><span>/ month</span></div><strong>{p.sessions}</strong><ul>{p.features.map(f=><li key={f}><Check size={15}/>{f}</li>)}</ul><Button variant={p.featured?'light':'outline'} onClick={onBook}>Choose {p.name}</Button></article>)}</div>
    <p className="sample-note">Sample membership pricing — replace with studio’s confirmed offers before launch.</p>
  </div></section>;
}
