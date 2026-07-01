# LUMINA PILATES Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, responsive one-page Pilates studio website that captures first-session leads and continues the conversation through WhatsApp.

**Architecture:** A Vite React single-page application composed from focused section components and data modules. A centralized studio configuration drives all contact details; a tested `submitLead()` adapter isolates future backend integration while the initial implementation stores leads locally. Custom CSS tokens, responsive images, and lightweight browser APIs provide the visual system and motion without a heavy UI framework.

**Tech Stack:** React 18, Vite 5, Vitest, Testing Library, Lucide React, CSS, generated WebP/JPEG assets, Google Fonts.

## Global Constraints

- Mobile-first responsive behavior across phone, tablet, and desktop.
- Palette: background `#FAF8F5`, primary `#B38A5A`, secondary `#DCCBB5`, text `#2D2D2D`, accent `#8D6E63`.
- Use Playfair Display for headings and Inter for body copy.
- Preserve semantic HTML, keyboard operation, visible focus, reduced-motion support, and WCAG-oriented contrast.
- Keep all configurable business/contact data in one module.
- Do not add a production backend, CRM, payment flow, authentication, live scheduling, or analytics vendor.
- Do not present sample pricing, contact details, achievements, or testimonials as verified real-world facts.

---

## File Map

- `package.json`, `vite.config.js`, `index.html`: toolchain, scripts, metadata shell, and font preconnects.
- `src/main.jsx`, `src/App.jsx`: application bootstrap and page composition.
- `src/styles.css`: tokens, layout, components, motion, and responsive rules.
- `src/config/studio.js`: business metadata, contacts, navigation, and WhatsApp settings.
- `src/data/content.js`: values, gallery items, testimonials, memberships, coach facts, and FAQs.
- `src/services/leads.js`: normalized lead validation, persistence, and future integration boundary.
- `src/utils/whatsapp.js`: deterministic prefilled WhatsApp URL construction.
- `src/hooks/useReveal.js`, `src/hooks/useScrollUI.js`: viewport reveal and global scroll state.
- `src/components/BrandMark.jsx`, `src/components/Button.jsx`, `src/components/SectionHeader.jsx`: reusable primitives.
- `src/components/Header.jsx`, `Hero.jsx`, `Values.jsx`, `Experience.jsx`, `Testimonials.jsx`, `Memberships.jsx`, `Coach.jsx`, `Faq.jsx`, `FinalCta.jsx`, `Footer.jsx`: page sections.
- `src/components/BookingModal.jsx`, `src/components/FloatingActions.jsx`, `src/components/Loader.jsx`: conversion and utility UI.
- `src/services/leads.test.js`, `src/utils/whatsapp.test.js`, `src/components/BookingModal.test.jsx`: behavioral tests.
- `public/images/*`: optimized bespoke hero, gallery, testimonial, and coach imagery.

### Task 1: Scaffold the Application and Content Contracts

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`
- Create: `src/config/studio.js`, `src/data/content.js`, `src/styles.css`

**Interfaces:**
- Produces: `STUDIO_CONFIG`, `NAV_ITEMS`, and data arrays `values`, `experiences`, `testimonials`, `plans`, `faqs`.

- [ ] **Step 1: Create the Vite package contract**

Define scripts `dev`, `build`, `preview`, and `test`; dependencies `react`, `react-dom`, and `lucide-react`; dev dependencies `vite`, `vitest`, `jsdom`, and Testing Library packages.

- [ ] **Step 2: Create the semantic HTML shell**

Add title, description, viewport, theme color, Open Graph metadata, Google Font preconnects, and a `LocalBusiness` JSON-LD object whose unverified address/phone fields come from clearly marked sample configuration.

- [ ] **Step 3: Create centralized business and page content modules**

Export:

```js
export const STUDIO_CONFIG = {
  name: 'LUMINA PILATES',
  phoneDisplay: '+972 50-000-0000',
  whatsappNumber: '972500000000',
  email: 'hello@luminapilates.example',
  location: 'Tel Aviv, Israel',
  instagramUrl: '#',
  facebookUrl: '#',
};
```

Populate all requested English copy, five distinct testimonials, the three plan tiers, coach biography/certification copy labeled as sample content, and the five FAQ topics.

- [ ] **Step 4: Bootstrap React and compose temporary semantic landmarks**

Render `<Header />`, `<main>`, and `<Footer />` placeholders from `App.jsx` so the dev server has a valid page before later tasks replace each placeholder.

- [ ] **Step 5: Run the baseline checks**

Run: `npm install && npm run build`

Expected: dependencies install and Vite produces `dist/` without errors.

### Task 2: Add and Optimize the Brand Imagery

**Files:**
- Create: `public/images/hero-studio.webp`
- Create: `public/images/experience-private.webp`, `experience-group.webp`, `experience-reformer.webp`, `experience-functional.webp`, `experience-recovery.webp`
- Create: `public/images/coach.webp`
- Create: `public/images/client-1.webp` through `client-5.webp`

**Interfaces:**
- Produces: stable image URLs consumed by `content.js` and section components.

- [ ] **Step 1: Generate the hero and coach photography**

Use the image-generation skill with warm editorial daylight, realistic reformer equipment, Scandinavian wood finishes, natural posture, diverse adult clients, no text, no watermark, and ample negative space for the site composition.

- [ ] **Step 2: Generate the five experience and five client assets**

Keep color grading, camera language, uniforms, and studio materials consistent across all images while varying pose, crop, and activity.

- [ ] **Step 3: Copy selected assets into `public/images` and convert them**

Use ImageMagick or `cwebp` to cap hero/coach at 1800px and card/avatar assets at 1000px, quality 82. Preserve source aspect ratios and inspect for malformed hands, duplicated equipment, embedded text, or inconsistent interiors.

- [ ] **Step 4: Wire exact image paths into `src/data/content.js`**

Every image entry must include a concise, descriptive `alt` string; decorative background usage must use empty alt text at render time.

### Task 3: Build and Test the Lead/WhatsApp Boundary

**Files:**
- Create: `src/services/leads.js`, `src/services/leads.test.js`
- Create: `src/utils/whatsapp.js`, `src/utils/whatsapp.test.js`

**Interfaces:**
- Produces: `submitLead(lead): Promise<{ id: string, storedAt: string }>` and `buildWhatsAppUrl(lead, number): string`.

- [ ] **Step 1: Write failing lead adapter tests**

Cover normalization, rejection of missing name/phone/email, persistence under `lumina_leads`, preservation of previous leads, and returned identifier/timestamp.

- [ ] **Step 2: Run the tests and verify failure**

Run: `npm test -- src/services/leads.test.js --run`

Expected: FAIL because `submitLead` does not exist.

- [ ] **Step 3: Implement the minimal adapter**

Validate and trim fields, construct an immutable lead record, append it to local storage, and resolve the public result. Export an `LEAD_ENDPOINT` constant set to an empty string and document the single `fetch` branch that will be enabled when a webhook is supplied.

- [ ] **Step 4: Write failing WhatsApp URL tests**

Assert an `https://wa.me/<number>?text=<encoded>` URL, normalized digits, and message inclusion of name plus preferred session.

- [ ] **Step 5: Implement and verify both utilities**

Run: `npm test -- src/services/leads.test.js src/utils/whatsapp.test.js --run`

Expected: all tests PASS.

### Task 4: Create the Design System and Global Navigation

**Files:**
- Create: `src/components/BrandMark.jsx`, `Button.jsx`, `SectionHeader.jsx`, `Header.jsx`, `FloatingActions.jsx`, `Loader.jsx`
- Create: `src/hooks/useScrollUI.js`
- Modify: `src/styles.css`, `src/App.jsx`

**Interfaces:**
- Consumes: `STUDIO_CONFIG`, `NAV_ITEMS`.
- Produces: `onBook()` callback contract shared by every booking CTA.

- [ ] **Step 1: Build the SVG lotus/movement brand mark and reusable primitives**

Use a stroked circular arc and three abstract lotus petals in inline SVG. Ensure the mark inherits `currentColor` and includes an accessible title only in logo contexts.

- [ ] **Step 2: Implement tokens and responsive foundations**

Define palette, typography, spacing, radii, shadows, container widths, focus ring, reduced motion, fluid section padding, and button variants in `styles.css`.

- [ ] **Step 3: Implement sticky navigation and mobile menu**

Use a native button with `aria-expanded`, lock body scroll while open, close on Escape/link selection, and provide the booking action without duplicating modal state.

- [ ] **Step 4: Implement scroll progress, WhatsApp, and back-to-top actions**

`useScrollUI()` returns `{ progress, showBackToTop, isScrolled }`; throttle updates with `requestAnimationFrame` and hide nonessential controls near the page top.

- [ ] **Step 5: Add a short branded loader transition**

Remove it after the first paint plus a bounded delay; skip the transition for reduced-motion users and never block page interaction for more than 900ms.

- [ ] **Step 6: Run production build**

Run: `npm run build`

Expected: PASS with no missing imports or CSS parse errors.

### Task 5: Build the Hero, Values, and Experience Story

**Files:**
- Create: `src/components/Hero.jsx`, `Values.jsx`, `Experience.jsx`
- Create: `src/hooks/useReveal.js`
- Modify: `src/App.jsx`, `src/styles.css`

**Interfaces:**
- Consumes: `onBook()`, `values`, `experiences`.
- Produces: section anchors `home`, `why-us`, and `experience`.

- [ ] **Step 1: Implement reusable viewport reveal behavior**

Use one Intersection Observer hook that adds an `is-visible` state once, disconnects after reveal, and returns visible immediately when reduced motion is enabled.

- [ ] **Step 2: Build the cinematic hero**

Add the exact headline/subheadline, two CTAs, four trust badges, responsive hero image, decorative orbit lines, and pointer-only parallax capped to a subtle transform range.

- [ ] **Step 3: Build the four value cards**

Use distinct Lucide icons, staggered reveal delays, hover lift, and semantic headings. Add an animated count strip using meaningful studio metrics clearly labeled as sample values.

- [ ] **Step 4: Build the editorial experience gallery**

Use a large-first asymmetric desktop grid and a horizontal snap rail on mobile. Each card includes image, category number, title, and short supporting line.

- [ ] **Step 5: Verify the page at three widths**

Inspect at 390×844, 768×1024, and 1440×900. Expected: no horizontal overflow, readable hero text, reachable CTAs, and gallery cards with stable aspect ratios.

### Task 6: Build Social Proof, Memberships, Coach, FAQ, and Footer

**Files:**
- Create: `src/components/Testimonials.jsx`, `Memberships.jsx`, `Coach.jsx`, `Faq.jsx`, `FinalCta.jsx`, `Footer.jsx`
- Modify: `src/App.jsx`, `src/styles.css`

**Interfaces:**
- Consumes: data arrays, `STUDIO_CONFIG`, and `onBook()`.
- Produces: anchors `stories`, `memberships`, `coach`, `faq`, and `contact`.

- [ ] **Step 1: Implement the testimonial carousel**

Provide previous/next buttons, dot tabs, touch swipe, arrow-key support, `aria-live="polite"`, and 6-second autoplay paused during hover, focus, touch interaction, document hiding, or reduced motion.

- [ ] **Step 2: Implement three membership cards**

Make all inclusions explicit, visually emphasize Premium, route each CTA through `onBook()`, and label prices as sample content in a small but readable note.

- [ ] **Step 3: Implement the coach profile**

Use the generated portrait, biography, achievement metrics, and certification chips. Include a visible sample-content note so no credential is misrepresented.

- [ ] **Step 4: Implement the FAQ accordion**

Use one open item at a time, native buttons with `aria-expanded`/`aria-controls`, and CSS grid-row animation. Content remains in the DOM for screen readers.

- [ ] **Step 5: Implement the final CTA and complete footer**

Add the exact emotional headline, primary booking button, logo, navigation, social/contact links, privacy link, and current year.

- [ ] **Step 6: Run build and keyboard smoke test**

Run: `npm run build`

Expected: PASS. Tab order follows visual order; carousel/accordion controls operate with keyboard; focus never disappears.

### Task 7: Build and Test the Luxury Booking Modal

**Files:**
- Create: `src/components/BookingModal.jsx`, `src/components/BookingModal.test.jsx`
- Modify: `src/App.jsx`, `src/styles.css`

**Interfaces:**
- Consumes: `submitLead`, `buildWhatsAppUrl`, `STUDIO_CONFIG.whatsappNumber`.
- Produces: controlled interface `{ open, onClose }` and success-state WhatsApp continuation link.

- [ ] **Step 1: Write failing modal interaction tests**

Test title announcement, initial focus, required-field errors, successful `submitLead` call shape, WhatsApp window opening after success only, retained values after adapter failure, Escape close, and trigger focus restoration.

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- src/components/BookingModal.test.jsx --run`

Expected: FAIL because `BookingModal` does not exist.

- [ ] **Step 3: Implement dialog structure and form states**

Use `role="dialog"`, `aria-modal="true"`, labeled inputs, inline errors, loading/disabled submit state, an elegant confirmation panel, and a persistent manual WhatsApp link if pop-up opening fails.

- [ ] **Step 4: Implement focus containment and restoration**

Capture the opener, focus the first field, wrap Tab/Shift+Tab inside the modal, close on Escape/backdrop button, restore focus on close, and lock page scroll while open.

- [ ] **Step 5: Connect submission in the correct order**

Await `submitLead`; only on success compute/open WhatsApp and show confirmation. On failure, announce the error through an `aria-live` region and retain every field.

- [ ] **Step 6: Verify tests and build**

Run: `npm test -- --run && npm run build`

Expected: all tests PASS and production build succeeds.

### Task 8: SEO, Performance, Accessibility, and Browser QA

**Files:**
- Modify: `index.html`, `src/styles.css`, section components as findings require.
- Create: `README.md`

**Interfaces:**
- Consumes: the complete application.
- Produces: documented configuration and verified production artifact.

- [ ] **Step 1: Add final SEO and loading attributes**

Set width/height or aspect ratio for images, `loading="lazy"` below the fold, `decoding="async"`, canonical-ready URL comment, theme color, social metadata, and validated JSON-LD.

- [ ] **Step 2: Document configuration and integration**

In `README.md`, document install/build commands, every field in `STUDIO_CONFIG`, how to replace assets, the local lead key, and the exact `submitLead()` branch to connect to a webhook later.

- [ ] **Step 3: Run automated verification**

Run: `npm test -- --run && npm run build`

Expected: all tests PASS; Vite completes without warnings that affect correctness.

- [ ] **Step 4: Run final browser QA**

Test 390×844, 768×1024, and 1440×900; validate sticky header, anchors, carousel, FAQ, modal success/failure paths, progress indicator, back-to-top, mobile menu, WhatsApp fallback, focus management, and reduced motion. Expected: no console errors or horizontal overflow.

- [ ] **Step 5: Review visual finish**

Capture full-page and key-section screenshots, inspect typography, image crops, contrast, spacing rhythm, floating controls, and modal fit above the mobile keyboard. Iterate only on observed defects.

- [ ] **Step 6: Final clean status check**

Run: `git status --short` only if the user has initialized Git. Otherwise list the created files and leave version-control initialization to the user.

