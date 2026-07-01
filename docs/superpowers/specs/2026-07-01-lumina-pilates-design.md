# LUMINA PILATES — One-Page Website Design

## Objective

Create a premium, responsive, high-conversion landing page for LUMINA PILATES. The experience should combine editorial luxury, calm wellness branding, strong social proof, and a friction-light lead capture flow.

## Audience and Conversion Goal

The primary audience is women seeking private or small-group Pilates in a boutique, supportive environment. The primary conversion is a completed first-session inquiry. Secondary conversions are opening WhatsApp, viewing the studio experience, and comparing memberships.

## Visual Direction

Use an editorial-luxury approach: warm white and sand surfaces, restrained brown accents, oversized Playfair Display headlines, clean Inter body copy, generous whitespace, softly rounded geometry, subtle glass panels, and cinematic photography. The interface should feel confident and refined rather than overtly feminine or decorative.

Palette:

- Background: `#FAF8F5`
- Primary: `#B38A5A`
- Secondary: `#DCCBB5`
- Text: `#2D2D2D`
- Accent: `#8D6E63`

The original logo will be an inline SVG combining an abstract lotus with a circular movement stroke. Photography will use bespoke generated assets with consistent warm daylight, Scandinavian interiors, natural body language, and realistic Pilates equipment.

## Page Structure

1. Sticky navigation with logo, section links, and booking CTA.
2. Full-screen cinematic hero with headline, supporting copy, dual CTAs, trust badges, and a dominant coach/studio image.
3. Four value cards: Security, Initiative, Consistency, and Immediate Results.
4. Editorial studio-experience gallery covering private sessions, small groups, reformer Pilates, functional training, and recovery/stretching.
5. Testimonial carousel with five realistic clients, profile images, and a 4.9/5 rating summary.
6. Three membership cards: Starter, Premium, and Elite VIP, with Premium visually emphasized.
7. Coach profile with portrait, biography, achievements, and certifications.
8. Accessible FAQ accordion covering pricing, the first session, parking, equipment, and experience level.
9. Emotional final CTA section.
10. Footer with navigation, social links, WhatsApp, email, phone, location, and privacy policy.

## Booking Flow

Every primary booking CTA opens a luxury modal. The form collects name, phone, email, preferred training format, and preferred contact time. Required fields receive inline validation and accessible error messaging.

Submission passes a normalized lead object to a single `submitLead()` integration boundary. Initially, the adapter will provide a development-safe placeholder implementation and persist a copy in local storage. It will be documented so a later API, webhook, CRM, or email service can replace the adapter without changing the modal UI.

After a successful submission, the modal shows a brief success state and opens WhatsApp with a prefilled message containing the visitor's name and session preference. Placeholder studio contact details will be centralized in one configuration object for easy replacement. If WhatsApp is blocked, a visible continuation link remains available. Failed lead submission keeps the form data intact and does not open WhatsApp.

## Interaction and Motion

- Initial page curtain/brand reveal with a short, non-blocking transition.
- Hero content fades and rises in a controlled sequence.
- Pointer parallax applies only to the hero image on devices with a fine pointer.
- Sections reveal through Intersection Observer.
- Statistics animate once when visible.
- Buttons use restrained lift, sheen, and press feedback.
- Testimonial carousel supports controls, swipe, keyboard navigation, and timed progression that pauses on interaction.
- FAQ uses animated height changes while preserving native button semantics.
- Smooth scrolling, a scroll-progress indicator, floating WhatsApp action, and back-to-top control complete the navigation layer.
- `prefers-reduced-motion` disables nonessential movement and autoplay behavior.

## Architecture

Build as a Vite React application with focused section components, shared UI primitives, and data-driven arrays for values, experiences, testimonials, plans, and FAQs. Keep studio metadata, contact details, and WhatsApp configuration in one module. Keep lead delivery isolated behind the `submitLead()` adapter.

Use CSS custom properties for tokens, fluid type and spacing with `clamp()`, semantic HTML landmarks, and minimal dependencies. Images will be responsive, lazy-loaded below the fold, and served in efficient formats where practical.

## Responsive Behavior

The mobile layout is the baseline. Hero content stacks with the image immediately below the primary actions. Horizontal collections become touch-friendly carousels or compact grids; pricing cards remain easily comparable; modal controls stay above the virtual keyboard. Tablet adds two-column sections, while desktop uses asymmetric editorial grids and expanded whitespace.

## Accessibility and SEO

- WCAG-oriented contrast, visible focus states, keyboard-complete interactions, labeled controls, modal focus trapping, Escape-to-close, and focus restoration.
- Semantic heading hierarchy, landmarks, descriptive alternative text, and ARIA only where native semantics are insufficient.
- Unique title and description, canonical-ready metadata, Open Graph tags, and JSON-LD for a local fitness business.
- No fabricated awards, medical guarantees, or misleading claims. Pricing and contact details are clearly marked as configurable sample content until replaced.

## Verification

Verify production build success, responsive behavior at mobile/tablet/desktop widths, keyboard navigation, modal validation and persistence, WhatsApp URL construction, accordion and carousel behavior, reduced-motion behavior, image loading, and browser console cleanliness. Perform a final visual pass in the browser for spacing, overflow, legibility, and interaction polish.

## Scope Boundaries

This phase does not include a production backend, CRM account setup, payment processing, member authentication, scheduling availability, or analytics vendor configuration. The interface and integration boundary will be ready for those additions later.
