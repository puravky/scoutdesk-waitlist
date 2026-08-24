# scoutdeck — Waitlist Landing Page

A personal opportunity scout for students and early-career builders. This is the pre-launch waitlist page: hero pitch, "how it works" walkthrough, and a landing page for the future coming product - scoutdeck.

**Live:** [scoutdeck](https://scoutsdeck.netflify.app)

## Stack
- Static HTML / CSS / vanilla JS
- [Motion](https://motion.dev) for scroll reveals and micro-interactions
- [Lucide](https://lucide.dev) for icons
- [tsParticles](https://particles.js.org) for the ambient star field (dark mode)
- [Formspree](https://formspree.io) for form submissions

## Files
| File | Purpose |
|---|---|
| `index.html` | Page markup |
| `styles.css` | All styling, incl. light/dark theme |
| `script.js` | Theme toggle, form handling, cursor, motion effects |

## Local dev
No build step — just open `index.html` in a browser, or serve the folder:
```bash
npx serve .
```

## Notes
- Dark mode is a designed companion palette (`body[data-theme="dark"]`), not a filter — toggled and persisted via `localStorage`.
- Update the Formspree endpoint in both `<form action="...">` tags before going live.
