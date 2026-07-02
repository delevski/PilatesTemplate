# Thumbnail Preview Design

## Goal

Give LUMINA PILATES a consistent premium preview across social sharing, browser tabs, and the GitHub README.

## Social Preview

- Create a 1200×630 cinematic image using the existing luxury Pilates hero aesthetic.
- Combine the sunlit studio/instructor photography with a subtle dark-to-transparent gradient for readable typography.
- Include the Lumina lotus mark, “LUMINA PILATES”, and “Move with Confidence. Transform with Purpose.”
- Preserve the warm cream, sand, gold, and charcoal visual system.
- Keep important content inside safe central margins for cropped social cards.
- Export an optimized `public/images/lumina-social-preview.jpg`.

## Metadata

- Add `og:image`, image dimensions, image alt text, `og:url`, and site name metadata.
- Add equivalent Twitter/X large-image card metadata.
- Use an absolute production image URL so external crawlers can load the preview from GitHub Pages.
- Preserve the existing title, description, and website type.

## Favicon

- Create a square favicon based on the existing abstract lotus mark on a cream background.
- Include a scalable SVG favicon and an Apple touch icon for high-resolution devices.
- Keep the icon legible at small sizes with no wordmark text.

## README

- Add the social preview image prominently below the project title/tagline.
- Link the image to the live GitHub Pages website.
- Keep the existing developer documentation intact.

## Verification

- Confirm generated image dimensions and reasonable file sizes.
- Build the Vite project and inspect the generated HTML metadata.
- Confirm favicon links resolve under the `/PilatesTemplate/` GitHub Pages base path.
- Render the README image path locally and verify the live absolute metadata URLs.
