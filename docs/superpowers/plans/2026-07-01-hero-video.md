# Hero Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hero image with the supplied silent, looping MP4 without changing its frame or responsive presentation.

**Architecture:** Keep `Hero` responsible for the media element and reuse `assetUrl` for GitHub Pages-safe URLs. The existing WebP becomes the poster fallback, while shared `.hero-visual` media CSS applies identical sizing and cropping to both image and video.

**Tech Stack:** React 19, Vite, CSS, Vitest, Testing Library

## Global Constraints

- Preserve all hero overlays, sizing, rounded corners, responsive crop, and parallax behavior.
- Use autoplay, muted, loop, and inline playback without native controls.
- Keep the current WebP as poster and fallback.
- Store the MP4 under `public/videos/` and resolve it through `assetUrl`.

---

### Task 1: Hero Video Media

**Files:**
- Create: `public/videos/lumina-hero.mp4`
- Create: `src/components/Hero.test.jsx`
- Modify: `src/components/Hero.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `assetUrl(path)` from `src/utils/assets.js`
- Produces: a hero `<video>` with `/videos/lumina-hero.mp4` and `/images/hero-studio.webp` poster URLs

- [ ] **Step 1: Write the failing test**

```jsx
test('renders a silent looping inline hero video with poster fallback', () => {
  const { container } = render(<Hero onBook={() => {}} />);
  const video = container.querySelector('.hero-visual video');
  expect(video).toHaveAttribute('src', '/videos/lumina-hero.mp4');
  expect(video).toHaveAttribute('poster', '/images/hero-studio.webp');
  expect(video).toHaveAttribute('autoplay');
  expect(video).toHaveAttribute('loop');
  expect(video).toHaveAttribute('playsinline');
  expect(video.muted).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/Hero.test.jsx --run`
Expected: FAIL because no hero video exists.

- [ ] **Step 3: Copy the supplied media asset**

Run: `mkdir -p public/videos && cp /Users/corphd/Downloads/hf_20260701_105612_0d15a583-7626-45ff-9bd1-5aa87f5a8254.mp4 public/videos/lumina-hero.mp4`

- [ ] **Step 4: Implement the video and shared media styling**

Replace the hero `<img>` with:

```jsx
<video
  ref={media}
  src={assetUrl('videos/lumina-hero.mp4')}
  poster={assetUrl('images/hero-studio.webp')}
  aria-label="Pilates training in the Lumina studio"
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
/>
```

Update selectors from `.hero-visual>img` and `.hero-visual img` to `.hero-visual>video` and `.hero-visual video`, preserving all existing declarations.

- [ ] **Step 5: Run focused and full verification**

Run: `npm test -- src/components/Hero.test.jsx --run && npm test -- --run && npm run build`
Expected: all tests PASS and the production build exits 0.

- [ ] **Step 6: Run React and browser checks**

Run: `npx -y react-doctor@latest . --verbose --diff`
Then verify the local page shows the video playing silently inside the original hero frame.
