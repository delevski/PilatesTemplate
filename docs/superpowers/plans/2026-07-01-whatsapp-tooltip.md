# WhatsApp Tooltip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the same non-layout-shifting hover/focus tooltip to the WhatsApp icon.

**Architecture:** Reuse one `.floating-label` styling contract for Ask Lumina and WhatsApp. Keep each control’s accessible name on its button/link and mark duplicate visual text `aria-hidden`.

**Tech Stack:** React 19, CSS, Vitest, Testing Library

## Global Constraints

- Do not change the WhatsApp URL or accessible name.
- Show “WhatsApp” only on hover/focus and hide it on mobile.
- Do not move or resize the floating controls.

---

### Task 1: Shared Floating Tooltip

**Files:**
- Create: `src/components/FloatingActions.test.jsx`
- Modify: `src/components/FloatingActions.jsx`
- Modify: `src/components/ChatWidget.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Produces `.floating-label[aria-hidden="true"]` inside both floating contact controls.

- [ ] **Step 1: Write a failing test**

```jsx
render(<FloatingActions showBackToTop={false} />);
const whatsapp = screen.getByRole('link', { name: 'Chat on WhatsApp' });
expect(whatsapp.querySelector('.floating-label')).toHaveTextContent('WhatsApp');
expect(whatsapp.querySelector('.floating-label')).toHaveAttribute('aria-hidden', 'true');
```

- [ ] **Step 2: Confirm RED**

Run: `npm test -- src/components/FloatingActions.test.jsx --run --testTimeout=15000`
Expected: FAIL because the WhatsApp label is absent.

- [ ] **Step 3: Add the label and shared class**

```jsx
<a className="float-whatsapp" ...>
  <MessageCircle />
  <span className="floating-label" aria-hidden="true">WhatsApp</span>
</a>
```

Use `className="chat-trigger-label floating-label"` for Ask Lumina.

- [ ] **Step 4: Share tooltip styling**

Replace `.chat-trigger-label` visual rules with `.floating-label`; reveal it through `.chat-trigger:hover`, `.chat-trigger:focus-visible`, `.float-whatsapp:hover`, and `.float-whatsapp:focus-visible`. Add `position:relative` to `.float-whatsapp`.

- [ ] **Step 5: Verify**

Run: `npm test -- --run --testTimeout=15000 && npm run build && npx -y react-doctor@latest . --verbose --scope changed && git diff --check`
Expected: all checks pass.
