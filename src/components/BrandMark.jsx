export function BrandMark({ compact = false }) {
  return <span className="brand"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 25a16 16 0 1 0 5-12"/><path d="M24 31c-6-2-9-6-9-12 5 0 8 2 9 6 1-4 4-6 9-6 0 6-3 10-9 12Z"/><path d="M24 25c-3-4-3-8 0-12 3 4 3 8 0 12Z"/></svg>{!compact && <span><b>LUMINA</b><small>PILATES</small></span>}</span>;
}
