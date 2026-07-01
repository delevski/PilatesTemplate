# Chat Trigger Tooltip Design

## Goal

Make the Ask Lumina floating control geometrically consistent with the WhatsApp and back-to-top controls.

## Design

- The visible trigger is always a 48×48 circular black button.
- The sparkle icon remains centered in the circle.
- “Ask Lumina” is removed from the visible button surface.
- On pointer hover or keyboard focus, a compact luxury tooltip appears to the left of the button.
- The tooltip does not resize or move the floating control stack.
- On touch/mobile layouts, the button stays icon-only; its accessible name remains “Ask Lumina”.

## Accessibility

- Preserve `aria-label="Ask Lumina"` on the trigger.
- Reveal the tooltip for both `:hover` and `:focus-visible`.
- Treat the tooltip as decorative duplicate text so assistive technology does not announce the label twice.
- Preserve existing focus styling and chat open/close behavior.

## Verification

- Add a regression assertion that the trigger contains a tooltip label marked `aria-hidden`.
- Confirm the trigger computes to equal width and height.
- Confirm the tooltip is hidden by default and appears on hover/focus without shifting adjacent controls.
- Re-run component tests, full tests, build, React Doctor, and browser verification.
