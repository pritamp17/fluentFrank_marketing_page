/**
 * Centralized enums — referenced across components, content, and config so the
 * codebase stays DRY and type-safe (no magic strings).
 */

/** next-themes-compatible theme values. */
export enum Theme {
  Light = "light",
  Dark = "dark",
  System = "system",
}

/** Section anchors — used for nav links and `id` attributes (single source). */
export enum SectionId {
  Hero = "top",
  Problem = "the-problem",
  HowItWorks = "how-it-works",
  Demo = "try-it",
  Features = "features",
  About = "about",
  Proof = "stories",
  Pricing = "pricing",
  Faq = "faq",
  Cta = "get-started",
}

/** Billing cadence for the pricing toggle. */
export enum BillingInterval {
  Monthly = "monthly",
  Annual = "annual",
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
 * Correction tone. Calm by design — there is no "wrong". `Nailed` celebrates,
 * the rest are framed as data + a next step. Red is reserved for system errors.
 */
export enum CorrectionSeverity {
  Nailed = "nailed",
  Polish = "polish",
  Note = "note",
}

/** Input modes in the live demo's mode bar. */
export enum InputMode {
  Voice = "voice",
  Text = "text",
  SayItInEnglish = "say-it-en",
}

/** Demo turn lifecycle. */
export enum DemoPhase {
  Idle = "idle",
  Listening = "listening",
  Processing = "processing",
  Revealed = "revealed",
}
