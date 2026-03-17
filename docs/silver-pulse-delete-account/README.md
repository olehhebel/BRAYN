# Silver Pulse — Delete Account Flow

A responsive, iOS-style interactive prototype that demonstrates the account-deletion flow for the **Silver Pulse** app.

## Screens

| # | State | Description |
|---|-------|-------------|
| 1 | **Resting** | Profile / Settings screen with a "more options" icon in the top-right corner. |
| 2 | **Dropdown Menu** | iOS-style contextual menu anchored to the settings icon, with options including "Delete Account". |
| 3 | **Delete Confirmation** | Modal popup asking the user to confirm permanent account deletion. |

## Figma Source

Design nodes from the **Silver_Pulse** Figma file (requires access to the private file):

- [Screen 1](https://www.figma.com/design/LsZx2axPeUwOu8SCTHylKp/Silver_Pulse?node-id=974-3062) → `node-id=974-3062`
- [Screen 2](https://www.figma.com/design/LsZx2axPeUwOu8SCTHylKp/Silver_Pulse?node-id=974-3213) → `node-id=974-3213`
- [Screen 3](https://www.figma.com/design/LsZx2axPeUwOu8SCTHylKp/Silver_Pulse?node-id=974-3010) → `node-id=974-3010`

## Interaction Flow

1. Start on **Screen 1**.
2. Tap the ⋮ icon (top-right) → **Screen 2** dropdown menu slides in.
3. Tap **Delete Account** → **Screen 3** confirmation popup appears.
4. Tap **Cancel** or tap outside the popup → returns to **Screen 1**.
5. Press **Esc** on desktop to dismiss any active overlay.

## How to Open Locally

Simply open the HTML file in any modern browser:

```bash
open docs/silver-pulse-delete-account/index.html
# or
python3 -m http.server 8000   # then visit http://localhost:8000/docs/silver-pulse-delete-account/
```

## GitHub Pages

This prototype is ready for GitHub Pages hosting:

1. Go to **Settings → Pages** in the repository.
2. Set **Source** to `Deploy from a branch`.
3. Set **Branch** to `main` (or your default branch) and folder to `/docs`.
4. Save — the flow will be available at:

```
https://<owner>.github.io/<repo>/silver-pulse-delete-account/
```

No build step is required.
