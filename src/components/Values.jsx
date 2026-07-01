import { values } from '../data/content';
import { SectionHeader } from './SectionHeader';
import { useReveal } from '../hooks/useReveal';

export function Values() {
  const reveal = useReveal();
  return <section className="section values-section" id="why-us"><div className="container">
    <div {...reveal}><SectionHeader eyebrow="The Lumina standard" title={<>Built on trust.<br/><em>Designed for change.</em></>} text="A thoughtful practice is about more than movement. It is about feeling held, challenged and seen." /></div>
    <div className="values-grid">{values.map(({title,text,icon:Icon},i) => <article className="value-card reveal is-visible" key={title}><span className="card-no">0{i+1}</span><div className="icon-wrap"><Icon/></div><h3>{title}</h3><p>{text}</p><span className="card-line"/></article>)}</div>
    <div className="stats-bar"><div><b>4.9</b><span>Average rating</span></div><div><b>12</b><span>Max group size</span></div><div><b>45<sup>min</sup></b><span>Focused sessions</span></div><div><b>1:1</b><span>Private attention</span></div></div>
  </div></section>;
}
