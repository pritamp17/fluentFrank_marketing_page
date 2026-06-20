import { BillingInterval, SectionId } from "@/lib/enums";
import type { NavLink } from "@/lib/types";

/** Single source of truth for brand, links, and pricing. */
export const SITE = {
  name: "FluentFrank",
  persona: "Frank",
  tagline: "Say it in your language. We'll teach you to say it in theirs.",
  description:
    "FluentFrank is the AI coach that actually gets you speaking Spanish — it corrects you honestly, explains the fix in English, and remembers what you keep getting wrong.",
  url: "https://fluentfrank.com",
  appUrl: "https://useapp.fluentfrank.com",
  email: "hello@fluentfrank.com",
  company: "Tournahub Solutions Private Limited",
  pair: { from: "English", to: "Spanish" },
  /** Optional social handles — left empty so nothing renders until set. */
  social: {
    x: "",
  },
} as const;

export const PRIMARY_CTA = {
  label: "Start speaking free",
  href: SITE.appUrl,
} as const;

export const SECONDARY_CTA = {
  label: "Try it live",
  href: `#${SectionId.Demo}`,
} as const;

export const NAV_LINKS: readonly NavLink[] = [
  { label: "How it works", href: `#${SectionId.HowItWorks}` },
  { label: "Try it", href: `#${SectionId.Demo}` },
  { label: "Features", href: `#${SectionId.Features}` },
  { label: "Pricing", href: `#${SectionId.Pricing}` },
  { label: "FAQ", href: `#${SectionId.Faq}` },
];

/** Pricing — mirrors the product (Dodo Payments, Merchant of Record). */
export const PRICING = {
  currency: "USD",
  symbol: "$",
  byInterval: {
    [BillingInterval.Monthly]: 12,
    [BillingInterval.Annual]: 79,
  },
  trialDays: 7,
  reverseTrialSessions: 3,
  annualSavingsPct: 45,
} as const;

/**
 * Social-proof figures shown on the page.
 * PLACEHOLDER VALUES — replace with real, verifiable numbers before launch.
 */
export const SOCIAL_PROOF = {
  learners: "12,000+",
  rating: "4.9",
  ratingCount: "800+",
  secondsToFirstCorrection: "60",
} as const;

/**
 * Generated media (hero visual, ambient loop, OG card, demo audio) served from
 * a durable public URL. To fully self-host, download each into `public/` and
 * repoint these at the local paths.
 */
export const ASSETS = {
  ogImage:
    "https://pub.hyperagent.com/api/published/pbf01KVJWXTE4_QJZ7EVK7TGCTS1Z9/a66140aa-bc08-4ee0-bd7d-6ad176d771ae.png",
  heroImage:
    "https://pub.hyperagent.com/api/published/pbf01KVJWXTWQ_85DFDJK7HVCE01JM/01441e64-9c2a-4e5b-8e8d-c1f1d10f53a3.png",
  heroVideo:
    "https://pub.hyperagent.com/api/published/pbf01KVJWXVC8_FN72AWHF8801GH03/1483a25e-85bc-4eb4-baf0-02b53c16a309.mp4",
  audio: {
    coffee:
      "https://pub.hyperagent.com/api/published/pbf01KVJWXVPA_ZG94DCAHSK37GPJ0/79ee5c4b-def3-4051-b95b-310bbb7556f4.wav",
    station:
      "https://pub.hyperagent.com/api/published/pbf01KVJWXVZK_SYCMFME26Z79K2WB/243efe70-952c-4138-a368-d5eb99331235.wav",
    table:
      "https://pub.hyperagent.com/api/published/pbf01KVJWXW9E_YWDHZQNC2838M8S2/5192d154-d41d-47d3-a839-0ab3cb31617b.wav",
  },
} as const;
