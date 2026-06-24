# FluentFrank — Marketing Site PRD & Build Log

> Living document for the FluentFrank marketing landing page (`fluentFrank_marketing_page`).
> Captures what was built, why, and the decisions behind it. Live at **https://fluentfrank.vercel.app**.

---

## 1. Overview

A high-conversion, animated marketing landing page for **FluentFrank** — a web-first
conversational AI language coach that gets adults *speaking* a new language without freezing
(a 12-language roster, Spanish-first), corrects them honestly (in their own language), and
remembers what they keep getting wrong.

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
| — | **Method** | The depth that compounds: from-zero alphabet, pronunciation that names the sound, spaced review + CEFR |
| — | **Languages** | The 12-language roster, same honest coaching in each |
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
- **App-faithful ramps (additive, both themes):** the FluentFrank app's exact `ink` / `gold` / `sage` / `amber` numeric ramps + warm onboarding surfaces (`canvas`, `card`, `hairline` via `--ob-*`) are copied verbatim into `globals.css` + `tailwind.config.ts`, alongside `shadow-app-glow` / `shadow-sage-glow` and the `pulse-ring` / `wave-bar` / `fade-up` keyframes. The existing semantic tokens (`bg`/`surface`/`fg`/`accent`) are untouched, so the marketing chrome is unchanged while the **app-demo** components (§9) render pixel-faithfully to the real app. Light's `ink` ramp inverts (near-white surfaces, dark text); dark is charcoal.
- **Type:** **Louize** (display/serif, matches the FluentFrank app), **self-hosted and inlined** as a woff2 data URI in `src/app/louize.css` + Inter (body, runtime `<link>`). All headings + display surfaces use Louize via the `display` token (see Decisions §13).
- **Theme:** **light by default on first visit** (`enableSystem={false}` so the OS theme never forces dark); a manual light / dark toggle still switches and persists via `next-themes` (no flash).
- **Warm light neutrals:** light `--bg`/`--surface`/`--surface-2`/`--border` carry a faint warm "paper" tint (not stark pure-white) so every section echoes the hero's warm ambient cohesively. Hero meta text is bumped to readable contrast tiers (`text-fg/70`–`text-fg/90`) over the busy ambient; navbar links use `text-fg/80`.
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
    appdemo/      App-faithful Practice recreation (§9): AppWindow, DemoNavRail,
                  DemoTopBar, DemoConversation, DemoConversationTurn, DemoThinking,
                  DemoSayItBack, DemoInputDock, DemoVoiceOrb, DemoCorrectionsPanel,
                  DemoCorrectionCard, Badge; AppDemoWorkspace (full), AppDemoCompact
                  (hero); useDemoMachine, useDemoAudio
    brand/        BrandMark, Wordmark
    demo/         TypingDots, Waveform (reused by the app-demo "thinking" pills)
    hero/         AmbientBackdrop (§10), FloatingEndonyms, LanguageCycler
    layout/       Navbar, Footer
    motion/       Reveal, AmbientVideo (accepts a `type` prop for webm)
    sections/     Hero, EndorsementBar, Problem, ValueProp, HowItWorks, DemoSection,
                  Features, FeatureGrid (shared), Method, Languages, About, Proof,
                  Pricing, Faq, FinalCta
    theme/        ThemeToggle
    ui/           Button, Card, Container, Eyebrow, IconBadge, Section, SectionHeading
  lib/            site.ts, content.ts, enums.ts, types.ts, utils.ts
  doc/            prd.md (this file)
```

- **Copy & config are centralized:** all strings in `content.ts` (incl. `APP_DEMO_BEATS`, the multi-language demo script), brand/links/pricing/assets in `site.ts`, magic-string-free via `enums.ts` (`Theme`, `SectionId`, `BillingInterval`, `Language`, `PlanId`, `FeatureId`, `MethodFeatureId`, `DemoPhase`, `DemoRole`, `DemoCardKind`, `DemoOrbState`, `DemoInputMode`). The `Feature` type is shared by the Features pillars and the Method differentiators (`id: FeatureId | MethodFeatureId`), rendered through one `FeatureGrid`.

## 9. App-Faithful Demo (`components/appdemo/`)

The demo is now an **authentic recreation of the real Practice workspace** (not a simplified chat card), so visitors see the actual app before signing up and never feel cheated. It mirrors the live app's exact chrome and tokens (NavRail · top bar with language pill + End session · learner/coach bubbles · "Now you say it" say-it-back · big voice orb with phase states · right-hand Corrections panel · browser-chrome frame).

- **Two entry points, one engine:**
  - `AppDemoCompact` — a single-pane window in the **hero** (no nav rail / corrections / chrome; orb stays the focal point).
  - `AppDemoWorkspace` — the full **three-pane** window in the Demo section (NavRail · conversation · Corrections + a `useapp.fluentfrank.com` browser-chrome strip), with scrub dots + play/pause.
  - Both share `useDemoMachine` (the proven *listening → processing → revealed → next* loop, `prefers-reduced-motion` → pinned reveal) and `useDemoAudio` ("Hear it": a real clip for Spanish, browser `speechSynthesis` for fr-FR / hi-IN).
- **Multi-language cycle (Spanish → French → Hindi)** from `APP_DEMO_BEATS` in `content.ts`. Each beat is a **self-contained vignette** — the language pill, conversation, say-it-back, and Corrections card all reflect the one current beat, so nothing desyncs. Beats teach real points: **ser vs estar** (es), **être vs avoir / aller** (fr), **tum vs aap** formality (hi).
- **Orb phases** map to the app's OrbCore: idle (`ink`), listening (`sage` + `pulse-ring`), thinking (`amber`), speaking (`gold`). Correction cards are calm (`amber` fix / `sage` teach-clean), red is never used.
- Responsive: `lg+` shows all three panes; below `lg` the NavRail + Corrections panel are hidden (`hidden lg:flex`) and it collapses to the single chat column — matching the app's own breakpoints and the attached mobile screenshots. Reuses `TypingDots` / `Waveform` for the listening/thinking pills.

## 10. Hero Ambient Backdrop (`AmbientBackdrop.tsx` + `FloatingEndonyms.tsx`)

The hero backdrop is ported from the app's **onboarding ambient** (the look users love), so the landing page feels like stepping into the app:

- **Warm-paper canvas** (`--ob-canvas → --ob-canvas-2` gradient; warm charcoal in dark) — the resilient floor.
- **Theme-switched still art** (`/onboarding/ambient-light.webp` · `…-dark.webp`, zero-JS via `dark:`) + a **drifting-waves motion loop** (`/onboarding/ambient-loop.webm`, `mix-blend-multiply` light / `dark:mix-blend-screen`), skipped under reduced motion.
- **`FloatingEndonyms`** — multilingual greetings + endonyms (`हिन्दी`, `日本語`, `¡Hola!`, `العربية` …) fade in and out in the negative space, sourced from `lib/languages.ts`, a **deterministic** table (no `Math.random`, hydration-safe), low opacity so the headline + demo stay dominant; RTL-aware.
- **Theme-aware vignette** + a **bottom fade** into the page `--bg` so the warm hero blends cleanly into the next section.
- **Animated language cycler** (`LanguageCycler.tsx`) still rotates the headline's target language behind an invisible sizer stack (no reflow). GPU-light; collapses to a calm static state under `prefers-reduced-motion`.

## 11. Media Assets

Generated in-session and served from durable public URLs (referenced via `ASSETS` in `site.ts`):

| Asset | Use |
|-------|-----|
| OG image | Social share card (`opengraph`/`twitter` meta) |
| Hero ambient image | About section visual + video poster |
| Hero ambient loop (mp4) | Final-CTA background (reduced-motion → static poster) |
| Spanish TTS clip (`audio.station`) | App-demo "Hear it" playback (fr/hi use `speechSynthesis`) |

**Committed in `public/`** (copied from the app, `ASSETS.ambient`): `onboarding/ambient-light.webp`, `onboarding/ambient-dark.webp`, `onboarding/ambient-loop.webm` (the hero backdrop, §10), and `brand/ff-mark-{light,dark}.svg`.

> Remaining `pub.hyperagent.com` URLs (OG, About image, Final-CTA video, demo audio) can be self-hosted later by downloading into `public/` and repointing `ASSETS`.

## 12. Pricing (mirrors the product)

- **Free:** daily voice practice, unlimited text, honest corrections, all 12 languages, core scenarios.
- **Pro:** **$3.99/week (3-day free trial)** or **$79.99/year (7-day free trial)** (~61% off the weekly run-rate, ≈$1.54/wk effective), unlimited voice, mistake memory, all scenarios + daily plan, pronunciation flags. Trial length is per cadence (`PRICING.trialDaysByInterval`); each plan card and the Pro CTA show the correct trial for the selected interval.
- **Token top-ups:** extra speaking minutes can be bought anytime, surfaced in the FAQ, not the pricing cards (keeps the plan choice simple).
- **Dodo Payments** (Merchant of Record), secure checkout, cancel anytime. Reverse-trial note (keep a taste of Pro memory for 3 sessions if the trial is dismissed).

## 13. Key Decisions & Tradeoffs

- **Louize is self-hosted and inlined** as a woff2 data URI in `src/app/louize.css` (imported by the layout) so the brand serif matches the app, ships inside the CSS with no extra request or swap flash, and commits as text (the deploy push path carries no binary blobs). Inter (body) still loads via a runtime `<link>` (not `next/font`), since the build sandbox proxy blocks `next/font`'s build-time fetch.
- **A single Louize optical master covers the heading weight range** (`font-weight: 400 700` on the `@font-face`) so the browser renders true Louize shapes at every weight rather than faux-bolding a single 400 master.
- **No em-dashes in any rendered copy** — em-dashes read as "AI slop"; all visible strings use commas / colons / periods (the `·` middot separators are kept as an intentional house style).
- **Media on public URLs, with the app ambient now committed** — most media stays on hosted URLs (centralized in `ASSETS`), but the onboarding ambient backdrop (`.webp`/`.webm`) and brand SVGs are copied into `public/` so the hero exactly reproduces the app's premium ambient. Louize stays inlined as a data URI; the rest can be self-hosted later.
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
| #4 | `feat/multi-language-premium-hero-pricing` | Multi-language: 12-language roster (`lib/languages.ts`), new **Languages** section, animated headline **LanguageCycler**; **vibrating** hero voice-waves + words morphing across all 12; **self-playing demo** (removed the fake input box); **Weekly $3.99 / Yearly $80** pricing with a prominent savings highlight + a token-top-up FAQ; premium polish; responsive |
| #5 | `feat/light-default-louize-premium-hero-pricing` | **Light theme by default** (`enableSystem={false}`, toggle kept); **self-hosted Louize** as the display font for all headings (replaces Playfair); **pricing** → Yearly **$79.99** + **per-cadence trials** (3-day weekly / 7-day yearly) shown per card and in the Pro CTA; **hero cycler line-height fix** (no more "Portuguese" merging) + em-dash removed from the headline; **all em-dashes stripped** from rendered copy; **premium hero** pass (Louize scale, refined tracking, web-first trust line); new **Method** section (from-zero alphabet · pronunciation that names the sound · spaced review + CEFR) via a shared `FeatureGrid`; tablet/mobile responsiveness pass. Local `npm install`/`build` blocked by a registry 502 outage through the sandbox proxy → Vercel preview build on the PR is the authoritative compile check |
| #6 | `feat/app-faithful-demo-ambient` | **App-faithful demo + onboarding ambient parity.** Rebuilt the hero `HeroPreview` and the `CorrectionDemo` slider into a real-app recreation under `components/appdemo/` (AppWindow + NavRail + TopBar + Conversation + SayItBack + InputDock + VoiceOrb + CorrectionsPanel + CorrectionCard + Badge, driven by `useDemoMachine`/`useDemoAudio`): `AppDemoCompact` (hero, single pane) + `AppDemoWorkspace` (Demo section, full three-pane window with browser chrome). **Multi-language cycle** (Spanish → French → Hindi) via `APP_DEMO_BEATS`, each a self-contained vignette. **Token alignment** — the app's exact `ink`/`gold`/`sage`/`amber` ramps + `--ob-*` warm surfaces + `app-glow`/`sage-glow`/`pulse-ring`/`wave-bar` added additively (existing tokens untouched). **Hero ambient** replaced with `AmbientBackdrop` (warm canvas + `ambient-loop.webm` drifting waves + `FloatingEndonyms` greetings/endonyms), ported from onboarding; ambient `.webp`/`.webm` + brand SVGs copied into `public/`. Flawless light + dark, responsive, reduced-motion safe. Removed superseded `HeroPreview`/`CorrectionDemo`/`demo/CorrectionCard`/`HeroAtmosphere` + dead `DEMO_EXCHANGES`/`DemoExchange`/`DemoCorrection`/`CorrectionSeverity`. `typecheck` + `lint` + `build` all green |

## 17. Backlog / Future

- Real testimonials, endorsement, and metrics
- Self-hosted media in `public/`
- Optional: scroll-reveal motion polish on remaining sections; additional language pairs as the app expands; analytics on the landing → app CTA.
