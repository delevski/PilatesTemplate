import { useCallback, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Values } from './components/Values';
import { Experience } from './components/Experience';
import { Testimonials } from './components/Testimonials';
import { Memberships } from './components/Memberships';
import { Coach } from './components/Coach';
import { Faq } from './components/Faq';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FloatingActions } from './components/FloatingActions';
import { Loader } from './components/Loader';
import { useScrollUI } from './hooks/useScrollUI';

export default function App() {
  const [booking,setBooking]=useState(false); const open=useCallback(()=>setBooking(true),[]); const close=useCallback(()=>setBooking(false),[]); const scroll=useScrollUI();
  return <><Loader/><div className="scroll-progress" style={{width:`${scroll.progress}%`}}/><Header onBook={open} isScrolled={scroll.isScrolled}/><main><Hero onBook={open}/><Values/><Experience/><Testimonials/><Memberships onBook={open}/><Coach/><Faq/><FinalCta onBook={open}/></main><Footer/><FloatingActions showBackToTop={scroll.showBackToTop}/><BookingModal open={booking} onClose={close}/></>;
}
