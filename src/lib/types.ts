import type { LucideIcon } from "lucide-react";
import type {
  BillingInterval,
  CorrectionSeverity,
  FeatureId,
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

/**
 * A scripted exchange for the interactive demo: the learner's English, the
 * Spanish Frank teaches, a plain gloss, the warm correction, and a TTS clip.
 */
export interface DemoExchange {
  readonly id: string;
  readonly english: string;
  readonly spanish: string;
  readonly gloss: string;
  readonly correction: DemoCorrection;
  readonly audioSrc: string;
  readonly memoryNote: string;
}

export interface DemoCorrection {
  readonly severity: CorrectionSeverity;
  readonly typeLabel: string;
  readonly said: string;
  readonly fix: string;
  readonly why: string;
}
