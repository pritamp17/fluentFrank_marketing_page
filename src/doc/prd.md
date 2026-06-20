# FluentFrank — Marketing Site PRD & Build Log

> Living document for the FluentFrank marketing landing page (`fluentFrank_marketing_page`).
> Captures what was built, why, and the decisions behind it. Live at **https://fluentfrank.vercel.app**.

---

## 1. Overview

A high-conversion, animated marketing landing page for **FluentFrank** — a web-first
conversational AI language coach that gets adults *speaking* Spanish without freezing, corrects
them honestly (in their own language), and remembers what they keep getting wrong.

- **Repo:** `github.com/pritamp17/fluentFrank_marketing_page` (standalone marketing site — separate from the main app)
- **Primary CTA target:** `https://useapp.fluentfrank.com`
- **Deploy:** Vercel (zero env vars; fully static)

## 2. Goals & Constraints (from the brief)

- Make it **really attractive** and **animated** — the hero should make a first-time visitor's eyes light up.
- Follow the shared references: **Dan Kulkov's landing-page structure** (Google Doc) + his "23 tips" thread.
- Engineering bar: **type-safe** (strict TS, never `any`), **enums** where sensible, **small reusable components**, follow the project's Tailwind config, **don't break other code**, **desktop + responsive**, **always verify the build**.
- Cut a branch, push, open a PR; deploy on Vercel.

## 3. Research Inputs

- **Product source of truth:** the attached `fluentfrank-technical-prd.md`, `language-coach-research-dossier-v2.md`, and the "what-makes-mine-different" cheat sheet; plus the FluentFrank context recalled from the **supermemory** MCP (`sm_project_default`).
- **Landing structure:** Dan Kulkov's **9-block framework** (Weekly Dan #50) + tips (delete gratuitous animation, ≤2-sentence paragraphs, a CTA every ~2 screens, product visuals as motion, lead with opinion-leader endorsements).
- **Conversion psychology (web research):** for an anxiety/shame-sensitive audience, **name the shame before offering the fix**; **endowment + loss aversion** (reverse trial > classic trial); a **product/explainer animation is justified** for an abstract SaaS people can't picture.

## 4. Positioning & Wedge

- **Tagline:** "Say it in your language. We'll teach you to say it in theirs."
- **Persona:** Frank — a warm, adult coach (no mascot, no baby-talk).
- **The wedge (the only 3 things that are uniquely ours):**
  1. **L1-first** — start in English; never freeze at a blank screen.
  2. **Honest correction by architecture** — a separate check catches mistakes instead of flattering them.
  3. **Mistake memory** — cross-session memory of *your* errors compounds into a personal coach.
- **Position against:** human tutors (cost/scheduling) and Duolingo (gamified, no speaking). Never "better than ChatGPT."
- **Tone:** calm, ED-safe — "nailed" before "to fix", the *why* in English, red reserved for system errors only, no streak guilt.

## 5. Information Architecture (Kulkov 9-block)

| # | Section | Purpose |
|---|---------|---------|
| — | Navbar | Logo, anchors, theme toggle, primary CTA |
| 1 | **Hero** | Outcome headline + product preview card + CTAs + quick proof |
| — | Endorsement bar | Opinion-leader quote placed high (per Kulkov's tip) |
| 2 | **Problem** | 4 pains + shame-normalizing closer ("none of this is your fault") |
| 3 | **Value proposition** | Rational / emotional / social value |
| 4 | **How it works** | 4 beats: say-it → hear → honest correction → remember |
| 5 | **Try it (live demo)** | Interactive correction-card demo |
| 6 | **Features** | 3 benefit-led pillars |
| 7 | **About** | "Why we're not scammers" + credibility chips |
| 8 | **Social proof** | User testimonials |
| 9 | **Pricing** | Free vs Pro, one plan highlighted |
| 10 | **FAQ** | 7 objections |
| — | **Final CTA** | Ambient-video band + restated outcome |
| — | Footer | Links, company, legal |

## 6. Design System

- **Tokens as CSS variables** (`src/app/globals.css`: `:root` = light, `.dark` = dark), consumed by `tailwind.config.ts` as `rgb(var(--token) / <alpha-value>)`. Same classes, two themes, zero per-component edits.
- **Theme-aware accent:** green `#16A34A` in light, gold `#C8A24C` in dark — mirroring the two brand marks. `BrandMark` = speech-bubble + check (bubble fill = accent, check stroke = bg → auto-matches each theme).
- Supporting tokens: `sage` (positive), `amber` (correction emphasis, never alarm), `danger` (system errors only).
- **Type:** Playfair Display (display/serif) + Inter (body), loaded via a runtime `<link>` (see Decisions §13).
- **Theme:** light default; light / dark / system via `next-themes` (no flash).
- **Responsive** to 320px; touch targets ≥ 44px. **Accessibility:** skip link, ARIA, keyboard nav, `prefers-reduced-motion` honored everywhere.

## 7. Tech Stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript** (`strict`, `noUncheckedIndexedAccess`, no `any`)
- **Tailwind CSS v3** (config-file tokens) · **Framer Motion** · **next-themes** · **lucide-react** · `clsx` + `tailwind-merge`
- Fully static output; deploys on Vercel with no environment variables.

## 8. Component Map

```
src/
  app/            layout, page, globals.css, providers, icon.svg
  components/
    brand/        BrandMark, Wordmark
    demo/         CorrectionCard, CorrectionDemo (interactive), HeroPreview (static)
    hero/         HeroAtmosphere (hero animation)
    layout/       Navbar, Footer
    motion/       Reveal, AmbientVideo
    sections/     Hero, EndorsementBar, Problem, ValueProp, HowItWorks, DemoSection,
                  Features, About, Proof, Pricing, Faq, FinalCta
    theme/        ThemeToggle
    ui/           Button, Card, Container, Eyebrow, IconBadge, Section, SectionHeading
  lib/            site.ts, content.ts, enums.ts, types.ts, utils.ts
  doc/            prd.md (this file)
```

- **Copy & config are centralized:** all strings in `content.ts`, brand/links/pricing/assets in `site.ts`, magic-string-free via `enums.ts` (`Theme`, `SectionId`, `BillingInterval`, `PlanId`, `FeatureId`, `CorrectionSeverity`, `InputMode`, `DemoPhase`).

## 9. Interactive Demo (`CorrectionDemo.tsx`)

The product's "aha" in one card, runnable in-browser with no signup:

- **Flow:** say it in English → *listening* → *processing* → reveal the natural Spanish + **"Hear it"** (plays a generated TTS clip, with a browser `speechSynthesis` es-ES fallback) + a **CorrectionCard** (nailed-first; what you said struck-through; the fix; the *why* in English) + a memory note.
- **Three scripted exchanges teach real points:** a polite request (*Nailed*), **ser vs estar** (location), **por vs para**.
- Honest fallback for free-typed input (no fake translation — it nudges to the app).
- Input-mode bar (Voice / Text / **Say it in English**) showcases the L1-first wedge.

## 10. Hero Animation — the "Language Field" (`HeroAtmosphere.tsx`)

Ambient motion that depicts the product **indirectly** (finding your voice across languages) rather than copying the app UI:

- **Breathing green aurora** (calm = the opposite of speaking anxiety)
- **Flowing "voice-wave" ribbons** — seamless sine paths (wavelengths divide the loop distance), evoking speech
- **Floating words that morph English → Spanish** — `hello→hola`, `thank you→gracias`, `of course→claro`, `cheers→salud`, `let's go→vamos`, `see you soon→nos vemos`, `good morning→buenos días` — low opacity, in the negative space
- **Subtle twinkling sparkles** + a **radial vignette** so the headline and demo card stay crisp
- **Animated gradient sheen** on the headline word "Spanish"
- Everything collapses to a calm static state under `prefers-reduced-motion`; GPU-light (transform/opacity only).

## 11. Media Assets

Generated in-session and served from durable public URLs (referenced via `ASSETS` in `site.ts`):

| Asset | Use |
|-------|-----|
| OG image | Social share card (`opengraph`/`twitter` meta) |
| Hero ambient image | About section visual + video poster |
| Hero ambient loop (mp4) | Final-CTA background (reduced-motion → static poster) |
| 3 × Spanish TTS clips | Demo "Hear it" playback |

> To fully self-host, download each into `public/` and repoint `ASSETS` at local paths.

## 12. Pricing (mirrors the product)

- **Free:** daily voice practice, unlimited text, honest corrections, core scenarios.
- **Pro:** **$12/mo** or **$79/yr** (~45% off), 7-day free trial, unlimited voice, mistake memory, all scenarios + daily plan, pronunciation flags.
- **Dodo Payments** (Merchant of Record) — secure checkout, cancel anytime. Reverse-trial note (keep a taste of Pro memory for 3 sessions if the trial is dismissed).

## 13. Key Decisions & Tradeoffs

- **Fonts via runtime `<link>`, not `next/font`** — the build sandbox proxy blocks `next/font`'s build-time fetch; a runtime link keeps the build offline-friendly and still works on Vercel.
- **Media on public URLs, not committed binaries** — the push path (GitHub MCP) is text-only and there's no local git credential in the build environment, so binaries are hosted and referenced rather than committed. Centralized in `ASSETS` for easy self-hosting.
- **Light theme leads** — visual continuity between the page and the app (which opens light) is a trust/conversion lever.
- **Animation is purposeful** — reconciles Kulkov's "delete animations" with the "make it mesmerizing" goal: motion that *demonstrates/evokes the product*, never decorative noise, always reduced-motion safe.

## 14. Build & Deploy

```bash
npm install
npm run build      # ✓ compiles, types valid, 5 static routes, ~144 kB First Load JS
npm run lint
npm run typecheck
```

Deploy: import the repo into Vercel (preset **Next.js**, no env vars).

## 15. Before Launch — Replace Placeholders

- **Testimonials** + **endorsement** quote (illustrative personas) → `content.ts`
- **`SOCIAL_PROOF`** learner count / rating → `site.ts`
- **Footer Privacy/Terms** links (currently point to the app domain)
- Optionally **self-host media** into `public/`

## 16. Changelog

| PR | Branch | Change |
|----|--------|--------|
| #1 | `feat/landing-page` | Initial landing page — full Next.js + Tailwind + Framer Motion site (merged) |
| #2 | `feat/hero-animation` | Hero "language field" animation (aurora, voice ribbons, EN→ES morphing words, sparkles, gradient sheen) |
| #3 | `docs/session-prd` | This PRD / build log |

## 17. Backlog / Future

- Real testimonials, endorsement, and metrics
- Self-hosted media in `public/`
- Optional: scroll-reveal motion polish on remaining sections; additional language pairs as the app expands; analytics on the landing → app CTA.
