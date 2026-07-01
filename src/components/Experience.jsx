import { ArrowUpRight } from 'lucide-react';
import { experiences } from '../data/content';
import { SectionHeader } from './SectionHeader';

export function Experience() {
  return <section className="section experience-section" id="experience"><div className="container">
    <SectionHeader eyebrow="The studio experience" title={<>Movement, elevated<br/>to an <em>experience.</em></>} text="Light-filled spaces, world-class equipment and attention that never feels rushed." />
    <div className="experience-grid">{experiences.map((x,i) => <article className={`experience-card experience-card--${i+1}`} key={x.title}>
      <img src={x.image} alt={x.alt} loading="lazy" decoding="async"/><div className="experience-overlay"><span>0{i+1}</span><div><h3>{x.title}</h3><p>{x.text}</p></div><ArrowUpRight/></div>
    </article>)}</div>
  </div></section>;
}
