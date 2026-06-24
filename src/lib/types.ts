import type { LucideIcon } from "lucide-react";
import type {
  BillingInterval,
  DemoCardKind,
  FeatureId,
  Language,
  MethodFeatureId,
  PlanId,
} from "@/lib/enums";

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export interface Stat {
  readonly value: string;
  readonly label: string;
}

export interface ProblemPoint {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly body: string;
}

export type ValueKind = "rational" | "emotional" | "social";

export interface ValuePillar {
  readonly kind: ValueKind;
  readonly label: string;
  readonly title: string;
  readonly body: string;
  readonly icon: LucideIcon;
}

export interface HowItWorksStep {
  readonly index: number;
  readonly title: string;
  readonly body: string;
  readonly icon: LucideIcon;
}

export interface Feature {
  readonly id: FeatureId | MethodFeatureId;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly bullets: readonly string[];
  readonly icon: LucideIcon;
}

export interface Testimonial {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly initials: string;
}

export interface Endorsement {
  readonly quote: string;
  readonly name: string;
  readonly title: string;
  readonly initials: string;
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

/** A cell in the Free-vs-Pro comparison: either a boolean check or a short label. */
export type PlanCapabilityValue = boolean | string;

export interface PlanCapability {
  readonly label: string;
  readonly free: PlanCapabilityValue;
  readonly pro: PlanCapabilityValue;
}

export interface Plan {
  readonly id: PlanId;
  readonly name: string;
  readonly tagline: string;
  readonly priceByInterval: Readonly<Record<BillingInterval, number>>;
  readonly featured: boolean;
  readonly ctaLabel: string;
  readonly perks: readonly string[];
}

/* ----------------------------------------------- App-faithful demo (multi-lang) -- */

/** A correction card in the app-faithful demo (mirrors the app's CorrectionCard). */
export interface AppDemoCorrection {
  readonly kind: DemoCardKind;
  /** Grammar point label, e.g. "ser vs estar" (omitted for a clean nail). */
  readonly typeLabel?: string;
  /** Calm severity chip, e.g. "Polish" / "Nailed it". */
  readonly severityLabel: string;
  /** What the learner nailed (leads the card when present). */
  readonly nailed?: string;
  /** The learner's original (struck through). Omitted when there's nothing to fix. */
  readonly said?: string;
  /** The fix (the highlighted, heaviest element). */
  readonly fix: string;
  /** The one-line "why", framed in the learner's own language (L1). */
  readonly why?: string;
}

/**
 * One scripted beat of the app-faithful demo. Language-agnostic so the demo can
 * cycle Spanish → French → Hindi: each beat carries its own locale + labels, the
 * learner's L1 request, the L2 phrase Frank teaches, the correction, and the
 * say-it-back target. `audioSrc` is set only where a real clip exists (Spanish);
 * other locales fall back to the browser's speech synthesis.
 */
export interface AppDemoBeat {
  readonly id: string;
  readonly language: Language;
  /** BCP-47 tag for speech synthesis, e.g. "es-ES". */
  readonly locale: string;
  /** Target-language display name, e.g. "Spanish". */
  readonly l2Label: string;
  /** Native-language display name (the explanation language), e.g. "English". */
  readonly l1Label: string;
  /** Emoji flag for the language pill + caption. */
  readonly flag: string;
  /** L1 flag for the "Stuck? Say it in {L1}" hatch. */
  readonly l1Flag: string;
  /** What the learner wants to say, in their own language (the learner bubble). */
  readonly learnerText: string;
  /** The natural phrase Frank teaches, in the target language (the coach bubble). */
  readonly coachText: string;
  /** Plain L1 gloss of the coach phrase. */
  readonly gloss: string;
  /** Real TTS clip, when one exists for this locale. */
  readonly audioSrc?: string;
  /** The mistake-memory line ("I'll bring this back next time"). */
  readonly memoryNote: string;
  /** The "Now you say it in {L2}" target. */
  readonly sayItBack: AppDemoSayItBack;
  readonly correction: AppDemoCorrection;
}

export interface AppDemoSayItBack {
  readonly phrase: string;
  readonly gloss?: string;
}
