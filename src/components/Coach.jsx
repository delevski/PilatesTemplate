import { Award, Check } from 'lucide-react';
import { coach } from '../data/content';
import { SectionHeader } from './SectionHeader';

export function Coach() { return <section className="section coach-section" id="coach"><div className="container coach-grid">
  <div className="coach-photo"><div className="coach-frame"><img src={coach.image} alt={`${coach.name}, founder and lead instructor`} loading="lazy" decoding="async"/></div><div className="coach-badge"><Award/><span>Guided by expertise.<br/><b>Grounded in care.</b></span></div></div>
  <div className="coach-copy"><SectionHeader eyebrow="Meet your coach" title={<>The strength behind<br/><em>your strength.</em></>}/><h3>{coach.name}</h3><span className="coach-role">{coach.role}</span><p>{coach.bio}</p><div className="coach-stats">{coach.stats.map(([n,l])=><div key={l}><b>{n}</b><span>{l}</span></div>)}</div><h4>Specialist certifications</h4><div className="chips">{coach.certifications.map(x=><span key={x}><Check/>{x}</span>)}</div><small className="sample-note">Biography and credentials shown are sample content pending studio confirmation.</small></div>
  </div></section>; }
