# YLH UI Sample — Floating Dock

Full multi-page Next.js site using YLH's real color tokens and fonts, with a macOS-style floating bottom dock for navigation (icons grow as your cursor approaches), magnetic hover on every button/link/tag, and a working light/dark mode toggle.

## Run locally
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages
1. Push as its own repo named exactly `ylh-sample-dock` (or update `basePath` in `next.config.js`).
2. `npm run build` → creates `out/`.
3. Use GitHub Actions or push `out/` to a `gh-pages` branch.
4. Enable GitHub Pages: Settings → Pages → Source.

## What's distinct about this sample
- Navigation: floating bottom dock, magnifies on cursor proximity
- Animation style: bouncier, more kinetic entrance transitions
- Cursor interaction: magnetic pull on buttons, tags, and team avatars
- No persistent background graphic — clean surface, motion does the work
