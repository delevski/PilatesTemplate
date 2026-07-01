# Lumina Pilates Chat Agent Design

## Goal

Add a premium bilingual chat experience that answers questions about Pilates, studio services, prices, and general availability. The first release must work as a static GitHub Pages site with a smart local demo engine and expose a clean `CHAT_ENDPOINT` integration boundary for a real AI agent later.

## Product Scope

The chat agent covers:

- Pilates and the studio's offered experiences.
- Membership prices and included sessions.
- General, statically configured availability.
- Beginner guidance and choosing between private and small-group sessions.
- Lead collection only when the visitor asks to book or requests an exact time.
- General safety guidance for pain or medical questions without diagnosis.

The agent does not diagnose medical conditions, invent prices, invent exact appointment slots, or answer unrelated topics.

## User Experience

### Entry Point

- Add a compact floating “Ask Lumina” button beside the existing WhatsApp and back-to-top actions.
- Use a refined neutral/gold treatment that visually belongs to the existing Lumina interface.
- Keep WhatsApp available as a separate human-contact channel.

### Chat Window

- Open a compact corner panel on desktop without obscuring the page.
- Use a bottom-sheet presentation on mobile.
- Header: “Lumina Pilates Advisor” with a visible “Available now” status.
- Include close, minimize, and accessible focus behavior.
- Announce new assistant messages through an `aria-live` region.
- Show an initial welcome message and quick actions for pricing, availability, beginners, private sessions, and small groups.
- Preserve the conversation while the widget is minimized during the current page session.

### Language

- Support Hebrew and English.
- Select the initial language from the browser locale.
- Detect the language of each visitor message and reply in that language.
- Render Hebrew messages with right-to-left direction and English messages left-to-right.

## Architecture

### `ChatWidget`

Owns presentation state, message history, input, quick actions, loading state, error state, focus management, and the conditional lead form.

### `chatKnowledge.js`

Provides a single editable source for:

- Plans and prices.
- Studio experiences.
- Frequently asked questions.
- General availability windows.
- Bilingual response copy.
- Medical-safety and out-of-scope responses.

Pricing should reuse the existing membership data rather than duplicating conflicting values.

### `chatService.js`

Exposes one asynchronous chat interface. It accepts the current message and a compact conversation context.

- When `CHAT_ENDPOINT` is configured, send a JSON request to that endpoint.
- When it is empty, call the local demo engine.
- If the endpoint request fails, return a local fallback response and expose a non-blocking degraded-mode flag to the UI.
- Never include an API key or private credential in frontend code.

### Local Demo Engine

The demo engine classifies a visitor message into a small set of supported intents:

- pricing
- availability
- beginner guidance
- private sessions
- small groups
- booking or exact-time request
- medical or pain question
- greeting
- out of scope

It returns deterministic bilingual responses from the local knowledge source. It must not present static availability as a confirmed booking slot.

## Data Flow

1. The visitor opens the widget or selects a quick action.
2. `ChatWidget` appends the visitor message and displays a short typing state.
3. `chatService` calls `CHAT_ENDPOINT` when configured or uses the local engine.
4. The assistant response is appended in the detected language and correct direction.
5. If the response indicates booking intent or an exact-time request, the widget offers a compact contact form.
6. The form requires explicit submission and uses the existing `submitLead()` boundary.
7. A successful lead shows confirmation and an optional WhatsApp continuation link.

## Lead Collection and Privacy

- Never collect or submit personal details at chat start.
- Ask for name, phone, and email only after booking or exact-availability intent.
- Explain that the details are used to continue the booking conversation.
- Do not send a lead without an explicit submit action.
- Continue using the current safe preview adapter until `LEAD_ENDPOINT` is configured.
- Avoid logging personal chat content to the console.

## Safety Behavior

- Medical and pain-related answers are general information only.
- Clearly state that the agent cannot diagnose or replace a physician or physiotherapist.
- Encourage professional assessment for acute, persistent, worsening, post-injury, pregnancy-related, or otherwise concerning symptoms.
- Avoid exercise prescriptions for an undisclosed medical condition.

## Errors and Fallbacks

- An unavailable `CHAT_ENDPOINT` falls back to the local engine without discarding the visitor's message.
- A failed lead submission keeps all entered details and offers retry.
- Unsupported questions receive a concise scope explanation plus relevant quick actions.
- Empty messages are not submitted.
- Repeat submissions are disabled while a request is in progress.

## Accessibility and Responsive Behavior

- Full keyboard support for opening, closing, messaging, quick actions, and lead submission.
- Focus moves into the panel when opened and returns to the trigger when closed.
- Escape closes the panel.
- Visible focus styles and sufficient contrast follow the existing design system.
- The desktop panel remains compact; the mobile bottom sheet respects safe areas and available viewport height.
- Motion respects `prefers-reduced-motion`.

## Configuration

- Add `CHAT_ENDPOINT` as an empty integration value for later configuration.
- Add editable weekly availability windows and confirmation wording to the local knowledge/config layer.
- Treat the existing studio phone, email, social links, prices, and availability as sample content until confirmed before production launch.

## Testing

Automated tests cover:

- Opening, closing, and focus restoration.
- Hebrew and English message handling and direction.
- Pricing, availability, beginner, private, group, greeting, and out-of-scope intents.
- Medical-safety response boundaries.
- Booking-intent detection and deferred lead collection.
- Explicit lead submission, success, failure, and retry states.
- Endpoint success and local fallback after endpoint failure.
- GitHub Pages-safe operation with an empty `CHAT_ENDPOINT`.

Manual responsive verification covers desktop and mobile layout, keyboard navigation, reduced motion, and the coexistence of chat, WhatsApp, and back-to-top controls.

## Future Real-Agent Integration

The future serverless endpoint will receive conversation context, apply a studio-specific system prompt and trusted knowledge, and return a structured response. API credentials and model calls remain server-side. Replacing the local demo engine must not require changes to the chat UI or lead flow.
