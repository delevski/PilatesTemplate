# Hero Video Replacement Design

## Goal

Replace the static hero image on the right side of the landing page with the supplied MP4 while preserving the current premium layout, dimensions, responsive crop, overlays, and decorative elements.

## Media Behavior

- The video starts automatically, loops continuously, and remains muted.
- `playsInline` keeps playback inside the page on mobile devices.
- Native controls are hidden.
- The existing hero image remains the video poster and fallback during loading or when playback is unavailable.
- The video is decorative marketing media but retains an accessible label describing its content.

## Layout and Styling

- The video occupies the same `hero-visual` media box as the current image.
- It inherits the existing rounded corners, shadow, sizing, and `object-fit: cover` crop.
- Mobile keeps the current focal-position behavior.
- The rating pill, purpose note, gradient overlay, and orbit decorations remain unchanged and layered above the video.
- The existing fine-pointer parallax behavior applies to the video element and remains disabled when reduced motion is preferred.

## Asset Handling

- Copy the supplied MP4 into `public/videos/` with a stable project filename.
- Resolve both video and poster through the existing `assetUrl` helper so they work locally and from the GitHub Pages subpath.

## Verification

- Add a component test that confirms autoplay, muted playback, looping, inline playback, poster fallback, and the repository-safe video URL.
- Run the focused test, full test suite, production build, React Doctor, and local browser verification.
- Browser verification confirms the video occupies the existing frame and is playing silently in a loop.
