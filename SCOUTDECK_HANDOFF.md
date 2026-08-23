# ScoutDeck waitlist — product and design handoff

## Product

ScoutDeck is an AI-powered opportunity scout for students and early-career professionals. A user shares their skills, interests, and goals; ScoutDeck continuously searches the web for hackathons, internships, conferences, fellowships, scholarships, and similar opportunities. Each week it returns five highly relevant picks, ranked with a match score and a plain-language explanation.

The core promise is: stop searching dozens of sites and receive a deliberately short, personalized weekly brief.

## This recovered version

This folder is the exact source checkpoint for the light editorial layout shown in the reference screenshot. It was recovered byte-for-byte from the Codex session history dated August 22, 2026, before the later high-end redesign.

Key visual elements:

- Warm off-white canvas, deep navy type, blue, mint, coral, and lilac accents
- Hero headline: “Your future has more tabs than time.”
- Inline handwritten-style email capture in the hero
- Tilted weekly opportunity brief featuring “Girls Who Yap Fellowship”
- Coral “Fit checked” and lilac “Friday brief” stickers
- Mint opportunity-category ticker
- Dark-mode toggle
- Animated opportunity card, rotating compass, ticker, orbit lines, reveal effects, and subtle cursor glow
- Responsive mobile layout and reduced-motion support

## Implementation

- Static HTML, CSS, and vanilla JavaScript
- Tailwind CSS loaded from CDN
- Lucide icons loaded from CDN
- Motion One loaded from CDN with safe fallbacks
- Google Fonts: Archivo, Caveat, DM Mono, Instrument Serif
- Both signup forms submit to Formspree: `https://formspree.io/f/xwlezwzw`
- No build step or authentication

## Files

- `index.html` — page content and component structure
- `styles.css` — responsive design, themes, and animation
- `script.js` — icons, theme persistence, interactions, and Formspree submission UX

## Deployment

Deploy the three source files together at the site root. They work on static hosts such as Vercel, Netlify, GitHub Pages, or Cloudflare Pages. For local testing, serve the folder over HTTP rather than opening only `index.html` in isolation.

Example:

```bash
python3 -m http.server 5500
```

Then open `http://localhost:5500`.

## Recovery note

Checkpoint source timestamp: `2026-08-22T18:35:15.543Z`. SHA-256 comparisons confirmed that `index.html`, `styles.css`, and `script.js` exactly match the retained checkpoint.
