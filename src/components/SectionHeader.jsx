export function SectionHeader({ eyebrow, title, text, align = 'left' }) {
  return <header className={`section-header section-header--${align}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</header>;
}
