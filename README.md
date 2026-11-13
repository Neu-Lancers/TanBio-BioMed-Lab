# TanBio BioMed Genomics Laboratory — website

React 19 + TypeScript + Vite + Tailwind CSS, hosted on Firebase Hosting.

## Scripts
| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Typecheck → Vite build → per-route SEO HTML + `sitemap.xml` (`scripts/prerender.mjs`) into `build/` |
| `npm run icons` | Regenerate favicons, PWA icons and `og-image.jpg` from `scripts/source/logo-original.png` |
| `npm run deploy` | Build and `firebase deploy --only hosting` |

## Structure
```
src/
  assets/images/        WebP images only
  components/
    layout/             Navbar, Footer, FloatingWhatsApp, ScrollManager
    ui/                 Hero (shared by every page), Button, Reveal, SectionHeading, Seo
    sections/           home/ about/ services/ contact/
  data/                 services, packages, popular tests (typed)
  hooks/ lib/ pages/
scripts/                generate-icons.mjs, prerender.mjs
public/                 favicons, manifest, robots.txt, og-image, .well-known
```
Business details (phone, address, hours, nav) live in `src/lib/site.ts`.
When adding a route, also add it to `ROUTES` in `scripts/prerender.mjs` for SEO.
