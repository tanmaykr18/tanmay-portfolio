# Tanmay Kumar — Portfolio

Next.js 14 + GSAP ScrollTrigger + Lenis smooth scroll.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (deploy on Vercel as-is)
```

- **Content**: everything lives in `data.js` (from the resume).
- **Photo**: put a transparent PNG cut-out at `public/me.png` (until then an abstract silhouette shows).
- **Scroll text effects**: `components/Split.js` (`mode="mask"` headings, `mode="scrub"` paragraphs).
- **Roaming cursors**: `components/Cursors.js` (they swarm the contact list at the bottom).
