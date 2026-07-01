# LUMINA PILATES

Premium one-page React/Vite website for a boutique Pilates studio.

## Run locally

```bash
npm install
npm run dev
```

Production verification:

```bash
npm test -- --run
npm run build
```

## Studio configuration

Edit `src/config/studio.js` before launch. It centralizes the studio name, tagline, display phone, WhatsApp number (digits only, including country code), email, location, and social URLs. Current contact details are intentionally marked sample values.

Pricing, testimonials, experience copy, and coach credentials live in `src/data/content.js`. Replace all sample content with studio-approved information before publishing.

## Lead integration

`src/services/leads.js` is the integration boundary. The current safe preview adapter stores submitted records under the browser local-storage key `lumina_leads`.

To connect a webhook or CRM, set `LEAD_ENDPOINT` to the endpoint URL. `submitLead()` already posts the normalized record as JSON and treats a non-2xx response as a delivery failure. The booking modal opens WhatsApp only after `submitLead()` succeeds.

For production, route the request through a protected server or serverless function rather than exposing private CRM credentials in the browser.

## Lumina chat advisor

The floating bilingual advisor answers questions about Pilates, membership pricing, general availability and choosing the right session. It runs from trusted local studio content when `CHAT_ENDPOINT` is empty, so the complete demo works on GitHub Pages without exposing credentials.

Configure general availability and the future endpoint in `src/config/chat.js`. A real AI integration should use a protected server or serverless endpoint; never place an API key in frontend code. Booking intent reveals an explicit contact form that reuses the existing lead integration boundary.

Medical responses are intentionally limited to general safety information and do not provide diagnosis or replace a physician or physiotherapist.

## Images

Optimized WebP assets are stored in `public/images`. Keep the existing filenames to replace photography without modifying components, or update the paths and alt text in `src/data/content.js`.
