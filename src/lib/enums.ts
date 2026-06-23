/**
 * Centralized enums, referenced across components, content, and config so the
 * codebase stays DRY and type-safe (no magic strings).
 */

/** next-themes-compatible theme values. */
export enum Theme {
  Light = "light",
  Dark = "dark",
  System = "system",
}

/** Section anchors, used for nav links and `id` attributes (single source). */
export enum SectionId {
  Hero = "top",
  Problem = "the-problem",
  HowItWorks = "how-it-works",
  Demo = "try-it",
  Features = "features",
  Method = "the-method",
  Languages = "languages",
  About = "about",
  Proof = "stories",
  Pricing = "pricing",
  Faq = "faq",
  Cta = "get-started",
}

/** Billing cadence for the pricing toggle. */
export enum BillingInterval {
  Weekly = "weekly",
  Yearly = "yearly",
}

/**
 * Supported target languages. The value is the BCP-47 primary subtag, used as a
 * stable key (and handy for any future `lang`/`hreflang` wiring). Spanish is the
 * live flagship; the rest are part of the multi-language roster.
 */
export enum Language {
  English = "en",
  Spanish = "es",
  French = "fr",
  German = "de",
  Italian = "it",
  Japanese = "ja",
  Korean = "ko",
  Mandarin = "zh",
  Portuguese = "pt",
  Hindi = "hi",
  Arabic = "ar",
  Russian = "ru",
}

/** Pricing plan identity. */
export enum PlanId {
  Free = "free",
  Pro = "pro",
}

/** The three benefit-led product pillars. */
export enum FeatureId {
  HonestCorrection = "honest-correction",
  MistakeMemory = "mistake-memory",
  NativeLanguageStart = "native-language-start",
}

/**
 * The "method that compounds" differentiators, the systematic depth most AI
 * tutors skip (writing system, exact pronunciation, spaced review + CEFR).
 */
export enum MethodFeatureId {
  Foundations = "foundations",
  Pronunciation = "pronunciation",
  SpacedReview = "spaced-review",
}

/**
 * Correction tone. Calm by design, there is no "wrong". `Nailed` celebrates,
 * the rest are framed as data + a next step. Red is reserved for system errors.
 */
export enum CorrectionSeverity {
  Nailed = "nailed",
  Polish = "polish",
  Note = "note",
}

/** Auto-playing demo turn lifecycle. */
export enum DemoPhase {
  Idle = "idle",
  Listening = "listening",
  Processing = "processing",
  Revealed = "revealed",
}
