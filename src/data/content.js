import { ShieldCheck, Sparkles, Repeat2, Zap } from 'lucide-react';

export const values = [
  { title: 'Security', text: 'Professional guidance that keeps your body safe.', icon: ShieldCheck },
  { title: 'Initiative', text: 'We motivate you to become your best self.', icon: Sparkles },
  { title: 'Consistency', text: 'Long-term habits that deliver real transformation.', icon: Repeat2 },
  { title: 'Immediate Results', text: 'Feel the difference from your very first session.', icon: Zap },
];

export const experiences = [
  { title: 'Private Sessions', text: 'Entirely yours. Every cue, every movement.', image: '/images/experience-private.webp', alt: 'Instructor guiding a private Pilates session' },
  { title: 'Small Groups', text: 'Personal attention with shared energy.', image: '/images/experience-group.webp', alt: 'Women training together on Pilates reformers' },
  { title: 'Reformer Pilates', text: 'Precision equipment. Intelligent resistance.', image: '/images/experience-reformer.webp', alt: 'Premium reformer Pilates equipment' },
  { title: 'Functional Training', text: 'Strength that moves beautifully beyond the studio.', image: '/images/experience-functional.webp', alt: 'Functional strength session in a bright studio' },
  { title: 'Recovery & Stretching', text: 'Restore range, ease and quiet confidence.', image: '/images/experience-recovery.webp', alt: 'Calm guided recovery and stretching session' },
];

export const testimonials = [
  { name: 'Maya R.', role: 'Member for 14 months', quote: 'I came for my posture and stayed for the feeling. Every session is precise, personal and somehow leaves me standing taller—in every sense.', image: '/images/client-1.webp' },
  { name: 'Noa L.', role: 'Private training', quote: 'The attention to detail is unlike anything I had experienced. I felt stronger after weeks, but more confident after the very first class.', image: '/images/client-2.webp' },
  { name: 'Dana S.', role: 'Small group member', quote: 'Beautiful space, exceptional coaching, and a group size that never feels anonymous. This is the hour I protect every week.', image: '/images/client-3.webp' },
  { name: 'Yael A.', role: 'Member for 8 months', quote: 'I was a complete beginner. The team made every movement approachable without ever making it feel easy or generic.', image: '/images/client-4.webp' },
  { name: 'Liat K.', role: 'Reformer member', quote: 'The balance of calm and challenge is perfect. My back feels better, my body feels capable, and I genuinely look forward to training.', image: '/images/client-5.webp' },
];

export const plans = [
  { name: 'Starter', sessions: '4 sessions / month', price: '₪390', desc: 'A graceful beginning for a consistent practice.', features: ['Small-group reformer', 'Movement assessment', 'Studio app access'] },
  { name: 'Premium', sessions: '8 sessions / month', price: '₪690', desc: 'Our signature rhythm for visible, lasting progress.', features: ['Small-group reformer', 'Monthly private session', 'Priority booking', 'Progress check-ins'], featured: true },
  { name: 'Elite VIP', sessions: 'Unlimited studio access', price: '₪1,290', desc: 'A fully personalized practice with complete flexibility.', features: ['Unlimited small groups', '2 private sessions', 'Recovery sessions', 'Direct coach support'] },
];

export const coach = {
  name: 'Sophia Ben-Ami', role: 'Founder & Lead Instructor', image: '/images/coach.webp',
  bio: 'Sophia founded Lumina around one conviction: training should make you feel safe enough to become powerful. Her approach blends precise classical foundations with intelligent, modern movement.',
  stats: [['10+', 'Years coaching'], ['1,800+', 'Sessions guided'], ['4', 'Specialist certifications']],
  certifications: ['Comprehensive Reformer', 'Pre & Postnatal', 'Functional Movement', 'Mobility & Recovery'],
};

export const faqs = [
  ['How much does a session cost?', 'Memberships begin at ₪390 per month. Private sessions and tailored combinations are quoted after a short introductory conversation.'],
  ['What happens in my first session?', 'We start with a relaxed movement assessment, talk through your goals, then guide you through a session adapted to your body and experience.'],
  ['Is parking available?', 'Yes. Member parking is available nearby, and full arrival instructions are sent before your first visit.'],
  ['Do I need to bring equipment?', 'No. We provide premium reformers and every prop you need. Bring comfortable clothing, grip socks and water.'],
  ['Do I need Pilates experience?', 'Not at all. Beginners are warmly welcomed, and advanced members receive progressions that keep every session focused and challenging.'],
];
