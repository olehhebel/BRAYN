# Silver Pulse – Delete Account Flow Prototype

A pixel-perfect, single-file inline HTML prototype demonstrating a 3-screen iOS-style interaction flow for the **Silver Pulse** health app.

---

## Screens & Flow

| Step | Description |
|------|-------------|
| **Screen 1** | Base state — Silver Pulse dashboard with profile, health stats, and a live ECG waveform |
| **Screen 2** | Settings dropdown — iOS-style frosted-glass context menu anchored to the settings icon (⚙️ top-right) |
| **Screen 3** | Delete Account confirmation — iOS-style modal alert with destructive action |

### Interaction

1. **Tap the ⚙️ icon** (top-right) → dropdown menu slides/fades in with a spring feel
2. **Tap "Delete account"** in the menu → confirmation popup opens modally
3. **Tap outside** any overlay, press **Esc**, or tap **Cancel** → overlay closes, returns to Screen 1
4. **Tap "Delete Account"** in the popup → confirms action, closes all overlays

---

## Files

```
docs/silver-pulse-delete-account/
├── index.html   ← Self-contained prototype (no build step required)
└── README.md    ← This file
```

---

## Running Locally

Simply open `index.html` in any modern browser:

```bash
# macOS
open docs/silver-pulse-delete-account/index.html

# Linux
xdg-open docs/silver-pulse-delete-account/index.html

# Windows
start docs/silver-pulse-delete-account/index.html
```

No server, no build step, no dependencies.

---

## GitHub Pages URL

Once GitHub Pages is enabled for this repository (from `/docs`):

```
https://olehhebel.github.io/BRAYN/silver-pulse-delete-account/
```

---

## Implementation Notes

- **Vanilla HTML / CSS / JS** — no frameworks or dependencies
- **Responsive & mobile-first** — fluid layout capped at 393 × 852 px (iPhone 14 Pro dimensions); adapts to any smaller screen
- **iOS safe-area insets** — uses `env(safe-area-inset-*)` for notch/home-indicator support
- **Motion** — soft spring easing (`cubic-bezier(.32,1.25,.42,1)`) on open, smooth ease-out on close; no jarring jumps
- **Accessibility** — ARIA roles (`menu`, `menuitem`, `alertdialog`), focus trap in popup, Escape key support
- **Live clock** — status bar shows the current time
- **ECG waveform** — animated SVG loop for the Live heart rate card
