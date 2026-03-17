# Silver Pulse — Delete Account Flow

A pixel-perfect, single-file iOS-style interactive prototype built from the Silver_Pulse Figma design.

## Screens

| State | Description |
|---|---|
| **Screen 1** | Base profile/settings screen |
| **Screen 2** | iOS-style dropdown menu anchored to ⚙ button |
| **Screen 3** | iOS-style confirmation popup for "Delete Account" |

## Interaction Flow

1. **Tap ⚙** (top-right) → dropdown menu slides in with spring easing
2. **Tap "Delete Account"** → confirmation alert appears with scale + fade
3. **Tap "Delete"** → alert closes, toast notification appears
4. **Tap "Cancel"** or **tap outside** → closes the active overlay
5. **Press Escape** (desktop) → closes any open overlay

## Tech

- Single self-contained `index.html` (no build step, no dependencies)
- Vanilla HTML + CSS + JS
- Mobile-first responsive layout (fluid up to 393 px device shell)
- iOS safe-area insets via `env(safe-area-inset-*)`)
- Soft spring easing on dropdown (`cubic-bezier(0.34, 1.56, 0.64, 1)`)
- Restrained scale + fade on alert (`cubic-bezier(0.34, 1.4, 0.64, 1)`)

## Running Locally

Open the file directly in any browser:

```
open docs/silver-pulse-delete-account/index.html
```

## 🔗 Launch Link

**https://olehhebel.github.io/BRAYN/silver-pulse-delete-account/**
