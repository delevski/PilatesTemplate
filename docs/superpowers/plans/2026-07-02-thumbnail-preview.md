# Thumbnail Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add branded social preview, favicon, Apple touch icon, and README preview assets.

**Architecture:** Derive a cinematic 1200×630 card from the existing hero photography and overlay exact brand typography through deterministic image composition. Add static metadata with absolute GitHub Pages URLs and use base-aware paths for browser icons.

**Tech Stack:** Vite HTML, SVG, raster image tooling, Markdown

## Global Constraints

- Social card is exactly 1200×630.
- Preserve exact Lumina name and tagline.
- External metadata URLs use `https://delevski.github.io/PilatesTemplate/`.
- Favicon remains legible without wordmark text.
- Existing metadata and README documentation remain intact.

---

### Task 1: Preview and Icon Assets

**Files:**
- Create: `public/images/lumina-social-preview.jpg`
- Create: `public/favicon.svg`
- Create: `public/apple-touch-icon.png`

- [ ] **Step 1:** Compose the 1200×630 preview from `public/images/hero-studio.webp` with warm overlay, dark gradient, logo, name, and tagline.
- [ ] **Step 2:** Create the lotus-only SVG favicon using the existing BrandMark geometry.
- [ ] **Step 3:** Rasterize the favicon to a 180×180 Apple touch PNG.
- [ ] **Step 4:** Verify exact dimensions and file sizes.

### Task 2: Metadata and README

**Files:**
- Modify: `index.html`
- Modify: `README.md`

- [ ] **Step 1:** Add Open Graph image URL, width, height, alt, canonical URL, site name, Twitter card, title, description, and image metadata.
- [ ] **Step 2:** Add favicon and Apple touch icon links using `/PilatesTemplate/`-safe URLs.
- [ ] **Step 3:** Add the branded preview image linked to the live site below the README tagline.
- [ ] **Step 4:** Build and confirm the generated HTML contains the production URLs.
- [ ] **Step 5:** Run tests, build, diff check, inspect the assets visually, commit, and push `main`.
