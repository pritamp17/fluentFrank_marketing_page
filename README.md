# FluentFrank — Marketing Site

The landing page for **FluentFrank**, the web-first conversational AI language coach that
gets you speaking Spanish without freezing — and corrects you honestly.

Built to convert: it follows a benefit-led structure (hero → problem → value → how it works →
live demo → features → about → social proof → pricing → FAQ → CTA), names the speaking-anxiety
moment before offering the fix, and keeps a calm, ED-safe tone (no streak guilt, red reserved
for genuine errors).

## Stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript** (strict, `no-any`)
- **Tailwind CSS v3** — theme tokens as CSS variables; accent is theme-aware (green in light, gold in dark)
- **Framer Motion** — scroll/entrance motion, respects `prefers-reduced-motion`
- **next-themes** — light (default) / dark / system, no-flash
- Fonts: Inter + Playfair Display via runtime `<link>`

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Deploy (Vercel)

Zero config. Import the repo into Vercel — framework preset **Next.js**, build `next build`,
output handled automatically. No environment variables required (the page is fully static and
the primary CTA links to `useapp.fluentfrank.com`).

## Where to edit

- **`src/lib/site.ts`** — brand, links, pricing, the primary/secondary CTA, and `SOCIAL_PROOF`.
- **`src/lib/content.ts`** — every line of copy (hero, problem, features, FAQ, testimonials, demo).
- **`src/lib/enums.ts`** — section anchors, plans, correction severities, input modes.
- **`tailwind.config.ts` + `src/app/globals.css`** — design tokens (one place for both themes).

## Before launch — replace placeholders

- **Testimonials** (`TESTIMONIALS` in `content.ts`) — illustrative personas; swap for real, attributable quotes.
- **Endorsement** (`ENDORSEMENT`) — replace with a real opinion-leader quote.
- **`SOCIAL_PROOF`** (`site.ts`) — learner count and rating are placeholders.
- **Footer legal links** — Privacy/Terms point to `useapp.fluentfrank.com/*`; update if needed.

## Media

`public/` holds generated assets: `og.png` (share card), `hero-ambient.jpg` / `hero-ambient.mp4`
(calm ambient visual + loop), and `audio/es-*.wav` (the Spanish clips the live demo plays).

## Structure

```
src/
  app/            layout, page, globals.css, providers, icon
  components/
    brand/        BrandMark, Wordmark
    demo/         CorrectionCard, CorrectionDemo (interactive), HeroPreview (static)
    layout/       Navbar, Footer
    motion/       Reveal, AmbientVideo
    sections/     Hero, Problem, ValueProp, HowItWorks, DemoSection, Features,
                  About, Proof, Pricing, Faq, FinalCta, EndorsementBar
    theme/        ThemeToggle
    ui/           Button, Card, Container, Eyebrow, IconBadge, Section, SectionHeading
  lib/            site.ts, content.ts, enums.ts, types.ts, utils.ts
```
