import { ArrowUp, MessageCircle } from 'lucide-react';
import { STUDIO_CONFIG } from '../config/studio';
export function FloatingActions({showBackToTop}) {return <div className="floating-actions"><a className="float-whatsapp" href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle/></a><button type="button" className={showBackToTop?'is-visible':''} onClick={()=>scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top"><ArrowUp/></button></div>}
