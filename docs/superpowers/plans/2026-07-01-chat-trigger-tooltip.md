# Chat Trigger Tooltip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the asymmetric Ask Lumina pill with a fixed circular icon and non-layout-shifting hover/focus tooltip.

**Architecture:** Keep the trigger’s accessible name and behavior unchanged. Add a decorative tooltip span inside the button and use a CSS pseudo-independent label treatment positioned absolutely to its left.

**Tech Stack:** React 19, CSS, Vitest, Testing Library

## Global Constraints

- The trigger is always 48×48 and circular.
- The tooltip appears only on pointer hover or keyboard focus.
- The tooltip must not resize or move the floating controls.
- Mobile remains icon-only.
- Preserve `aria-label="Ask Lumina"` and chat behavior.

---

### Task 1: Circular Trigger and Tooltip

**Files:**
- Modify: `src/components/ChatWidget.test.jsx`
- Modify: `src/components/ChatWidget.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: existing `.chat-trigger` button.
- Produces: child `.chat-trigger-label[aria-hidden="true"]` displayed visually only on hover/focus.

- [ ] **Step 1: Add a failing accessibility regression assertion**

```jsx
const trigger = screen.getByRole('button', { name: 'Ask Lumina' });
expect(trigger.querySelector('.chat-trigger-label')).toHaveAttribute('aria-hidden', 'true');
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `npm test -- src/components/ChatWidget.test.jsx --run --testTimeout=15000`
Expected: FAIL because `.chat-trigger-label` does not exist.

- [ ] **Step 3: Add the decorative tooltip label**

```jsx
<button className="chat-trigger" aria-label="Ask Lumina" ...>
  <Sparkles />
  <span className="chat-trigger-label" aria-hidden="true">Ask Lumina</span>
</button>
```

- [ ] **Step 4: Replace pill styling with fixed-circle styling**

```css
.floating-actions>.chat-trigger {
  position: relative;
  width: 48px;
  min-width: 48px;
  height: 48px;
  padding: 0;
  border-radius: 50%;
}
.chat-trigger-label {
  position: absolute;
  right: calc(100% + 10px);
  opacity: 0;
  pointer-events: none;
  transform: translateX(5px);
}
.chat-trigger:hover .chat-trigger-label,
.chat-trigger:focus-visible .chat-trigger-label {
  opacity: 1;
  transform: none;
}
@media(max-width:700px) {
  .chat-trigger-label { display: none; }
}
```

- [ ] **Step 5: Run focused and complete verification**

Run: `npm test -- src/components/ChatWidget.test.jsx --run --testTimeout=15000 && npm test -- --run --testTimeout=15000 && npm run build && git diff --check`
Expected: all tests PASS, build exits 0, and diff check is clean.

- [ ] **Step 6: Verify in browser**

Confirm the trigger is 48×48, tooltip is hidden by default, tooltip appears on hover/focus, and the chat still opens.
