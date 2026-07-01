import { ArrowUpRight } from 'lucide-react';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  return <button type="button" className={`button button--${variant} ${className}`} {...props}><span>{children}</span>{variant !== 'text' && <ArrowUpRight size={17}/>}</button>;
}
