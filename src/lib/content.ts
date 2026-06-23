import {
  AudioLines,
  BookA,
  Brain,
  CalendarClock,
  CheckCheck,
  Gamepad2,
  GraduationCap,
  Languages,
  Leaf,
  Lock,
  RefreshCw,
  ShieldCheck,
  Snowflake,
  ThumbsUp,
  TrendingUp,
  Users,
  Volume2,
} from "lucide-react";

import {
  BillingInterval,
  CorrectionSeverity,
  FeatureId,
  MethodFeatureId,
  PlanId,
} from "@/lib/enums";
import { LANGUAGE_COUNT, LANGUAGES } from "@/lib/languages";
import { ASSETS, PRICING, SITE } from "@/lib/site";
import type {
  DemoExchange,
  Endorsement,
  Feature,
  FaqItem,
  HowItWorksStep,
  Plan,
  PlanCapability,
  ProblemPoint,
  Stat,
  Testimonial,
  ValuePillar,
} from "@/lib/types";

/* ------------------------------------------------------------------ Hero -- */

export const HERO = {
  eyebrow: `Conversational AI coach · ${LANGUAGE_COUNT} languages`,
  headline: "Finally speak a new language without freezing.",
  // Lead + tail wrap the hero's animated language cycler (see LanguageCycler).
  headlineLead: "Finally speak ",
  headlineTail: " without freezing.",
  // ≤ 2 sentences (Kulkov rule).
  subhead:
    "You can read it, but the second you have to speak, your mind goes blank. Frank gets you talking in your first minute, then gently fixes what you'd otherwise keep getting wrong.",
  microProof: "No credit card · Your first correction in under a minute",
  webFirst: "Works right in your browser · nothing to install",
} as const;

export const HERO_STATS: readonly Stat[] = [
  { value: "60 sec", label: "to your first real correction" },
  { value: "L1-first", label: "start in your own language" },
  { value: "Remembers", label: "every mistake you make" },
];

/* -------------------------------------------------------------- Problem -- */

export const PROBLEM = {
  eyebrow: "The freeze is real",
  title: "Years of apps. Still can't get a sentence out.",
  closer:
    "None of this is your fault. You were never given a safe place to be bad at this. Until now.",
} as const;

export const PROBLEM_POINTS: readonly ProblemPoint[] = [
  {
    icon: Snowflake,
    title: "You freeze mid-sentence",
    body: "The words are in your head. They just won't come out when a real person is waiting for an answer.",
  },
  {
    icon: Gamepad2,
    title: "Apps never made you talk",
    body: "Streaks, matching games, a cute owl, but you've still never actually held a conversation.",
  },
  {
    icon: ThumbsUp,
    title: "ChatGPT just agrees with you",
    body: "It nods along at broken grammar. You walk away more confident and exactly as wrong as before.",
  },
  {
    icon: CalendarClock,
    title: "Tutors are pricey and scheduled",
    body: "Forty dollars an hour and a calendar invite is a lot of friction for ten minutes of practice.",
  },
];

/* ------------------------------------------------------- Value proposition -- */

export const VALUE = {
  eyebrow: "Why FluentFrank",
  title: "Speak from day one. Improve every time you do.",
  subtitle:
    "Not another chatbot. A coach built around the one thing that makes you fluent: talking, and being corrected with care.",
} as const;

export const VALUE_PILLARS: readonly ValuePillar[] = [
  {
    kind: "rational",
    label: "The logic",
    title: "Correction that's actually honest",
    body: "A separate check reads every line before Frank replies, so mistakes get caught instead of flattered.",
    icon: ShieldCheck,
  },
  {
    kind: "emotional",
    label: "The feeling",
    title: "Practice without the fear",
    body: "No grades, no red ink, no judgment. Just a calm coach who tells you what you nailed first.",
    icon: Leaf,
  },
  {
    kind: "social",
    label: "The payoff",
    title: "Show up for the people who matter",
    body: "Order on your trip. Talk to your partner's family. Handle the doctor, the landlord, the interview.",
    icon: Users,
  },
];

/* ---------------------------------------------------------- How it works -- */

export const HOW_IT_WORKS = {
  eyebrow: "How it works",
  title: "Four beats. One conversation that actually sticks.",
} as const;

export const HOW_STEPS: readonly HowItWorksStep[] = [
  {
    index: 1,
    title: "Say it in your language",
    body: "Stuck? Type or speak in your own language. Frank shows you exactly how to say it in the one you're learning.",
    icon: Languages,
  },
  {
    index: 2,
    title: "Hear it, then say it back",
    body: "Frank reads the natural phrase aloud and listens as you repeat it at your own pace.",
    icon: Volume2,
  },
  {
    index: 3,
    title: "One honest correction",
    body: "What you said, the fix, and a one-line why, in English. Calm and clear, never harsh.",
    icon: CheckCheck,
  },
  {
    index: 4,
    title: "Frank remembers it",
    body: "Next time that slip shows up, Frank's already on it. Your coach compounds session over session.",
    icon: Brain,
  },
];

/* ----------------------------------------------------------------- Demo -- */

export const DEMO = {
  eyebrow: "See it in action",
  title: "This is the whole product, in one card.",
  subtitle:
    "Watch Frank teach a real phrase, read it aloud, and catch the mistake you didn't know you were making, playing on a loop. Hear any line, or scrub between examples.",
  footnote: "No signup. This preview runs entirely in your browser.",
} as const;

export const DEMO_EXCHANGES: readonly DemoExchange[] = [
  {
    id: "coffee",
    english: "I'd like a coffee, please",
    spanish: "Quiero un café, por favor.",
    gloss: "I want a coffee, please.",
    audioSrc: ASSETS.audio.coffee,
    memoryNote: "Locked in: polite requests with “por favor”.",
    correction: {
      severity: CorrectionSeverity.Nailed,
      typeLabel: "Nailed it",
      said: "Quiero un café, por favor.",
      fix: "Quiero un café, por favor.",
      why: "Perfect: natural word order, the polite tag, the accent on café. Exactly how a local would order.",
    },
  },
  {
    id: "station",
    english: "Where is the train station?",
    spanish: "¿Dónde está la estación de tren?",
    gloss: "Where is the train station?",
    audioSrc: ASSETS.audio.station,
    memoryNote: "ser vs estar with location. I'll bring this back next time.",
    correction: {
      severity: CorrectionSeverity.Polish,
      typeLabel: "ser vs estar",
      said: "¿Dónde es la estación?",
      fix: "¿Dónde está la estación?",
      why: "Location uses estar, not ser. “Es” describes what a thing is; “está” tells you where it is.",
    },
  },
  {
    id: "table",
    english: "I'd like to book a table for two",
    spanish: "Me gustaría reservar una mesa para dos.",
    gloss: "I would like to reserve a table for two.",
    audioSrc: ASSETS.audio.table,
    memoryNote: "por vs para, noted on your mistake list.",
    correction: {
      severity: CorrectionSeverity.Polish,
      typeLabel: "por vs para",
      said: "…reservar una mesa por dos.",
      fix: "…reservar una mesa para dos.",
      why: "“Para” marks purpose or recipient, a table for two people. “Por” would suggest an exchange or a reason.",
    },
  },
];

/* ------------------------------------------------------------- Features -- */

export const FEATURES_SECTION = {
  eyebrow: "What makes Frank different",
  title: "Three things no streak-and-stickers app can copy.",
} as const;

export const FEATURES: readonly Feature[] = [
  {
    id: FeatureId.HonestCorrection,
    eyebrow: "Honest by architecture",
    title: "It corrects you. Most AIs won't.",
    description:
      "A dedicated correction check runs in parallel with every reply, so it can't be sweet-talked into saying “perfect” when it isn't.",
    bullets: [
      "What you said → the fix → the why, every single turn",
      "Explained in your own language, so the lesson actually lands",
      "Calm tone: red is for system errors, never for you",
    ],
    icon: CheckCheck,
  },
  {
    id: FeatureId.MistakeMemory,
    eyebrow: "A coach that remembers",
    title: "Your mistakes become your lessons.",
    description:
      "Frank keeps a private model of what trips you up and brings it back, gently, before you slip on it again.",
    bullets: [
      "Cross-session memory of your own errors",
      "“Last time ser vs estar tripped you up…”",
      "Review built from your slip-ups, not random flashcards",
    ],
    icon: Brain,
  },
  {
    id: FeatureId.NativeLanguageStart,
    eyebrow: "Start where you are",
    title: "Begin in your language. Always.",
    description:
      "Total beginner? You never stare at a blank screen. Say it in your language and Frank meets you exactly there.",
    bullets: [
      "No more freezing at “talk to me in your new language”",
      "Survival scenarios: café, doctor, interview, directions",
      "From zero to a real exchange in under a minute",
    ],
    icon: Languages,
  },
];

/* -------------------------------------------------------------- Method -- */

export const METHOD_SECTION = {
  eyebrow: "More than a chat",
  title: "A method that compounds, not a chatbot that forgets.",
  subtitle:
    "Frank is built on the parts most AI tutors skip: the writing system, the exact sound, and a memory of every slip. That's what turns practice into real progress.",
} as const;

export const METHOD_FEATURES: readonly Feature[] = [
  {
    id: MethodFeatureId.Foundations,
    eyebrow: "Start from zero",
    title: "Even a brand-new alphabet.",
    description:
      "Learning Japanese, Korean, or Russian from scratch? Frank starts you at the letters and sounds, then builds to your first real words. No prior knowledge assumed.",
    bullets: [
      "Kana, Hangul, Cyrillic, Devanagari, Arabic, and pinyin",
      "Hear every character, then say it back",
      "A1 vocabulary that gets you to a full sentence",
    ],
    icon: BookA,
  },
  {
    id: MethodFeatureId.Pronunciation,
    eyebrow: "Sound like you mean it",
    title: "It names the exact sound to fix.",
    description:
      "Most apps hand you a score and move on. Frank tells you which sound slipped and how to shape it, then lets you hear the difference.",
    bullets: [
      "Per-sound feedback, not just pass or fail",
      "Hear Frank, then hear yourself, back to back",
      "Drill the tricky one until it clicks",
    ],
    icon: AudioLines,
  },
  {
    id: MethodFeatureId.SpacedReview,
    eyebrow: "Progress you can measure",
    title: "Your mistakes come back on schedule.",
    description:
      "Every slip becomes a personal review deck, resurfaced right before you'd forget. Your level climbs the CEFR scale as the corrections stack up.",
    bullets: [
      "Spaced review built from your own errors",
      "Climb from A1 toward fluency, step by step",
      "A daily plan that keeps the habit alive",
    ],
    icon: TrendingUp,
  },
];

/* ----------------------------------------------------------- Languages -- */

export const LANGUAGES_SECTION = {
  eyebrow: `${LANGUAGE_COUNT} languages, one honest coach`,
  title: "Speak the language that opens your world.",
  subtitle:
    "The world's most-studied languages and the ones that move careers, each taught the FluentFrank way: you start in your own language, and Frank coaches you into theirs.",
  footnote: "Same honest correction, mistake memory, and say-it-in-your-language coaching in every one.",
} as const;

/* ---------------------------------------------------------------- About -- */

export const ABOUT = {
  eyebrow: "Why trust Frank",
  title: "Built by people who froze too.",
  body: "FluentFrank isn't a venture-funded chatbot wrapper. It's a focused tool from an indie team that got tired of “fluent in 5 minutes a day” promises that never made anyone actually speak.",
  body2:
    "Frank is grounded in the CEFR framework, keeps your practice private, and discards your audio right after analysis. Nothing sold, nothing trained on your conversations.",
} as const;

export interface AboutChip {
  readonly label: string;
  readonly icon: typeof GraduationCap;
}

export const ABOUT_CHIPS: readonly AboutChip[] = [
  { label: "CEFR-aligned", icon: GraduationCap },
  { label: "Audio discarded after analysis", icon: Lock },
  { label: `A ${SITE.company.split(" ").slice(0, 1).join(" ")} product`, icon: ShieldCheck },
  { label: "Cancel anytime", icon: RefreshCw },
];

/* ------------------------------------------------------------ Social proof -- */

/**
 * PLACEHOLDER testimonials and endorsement: replace with real, attributable
 * quotes before launch. Names are illustrative personas, not real customers.
 */
export const PROOF = {
  eyebrow: "Stories from the freeze",
  title: "From “I can't” to a real conversation.",
} as const;

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "Two years of Duolingo and I still couldn't order a coffee. Three days with Frank and I actually spoke to the barista in Mexico City.",
    name: "Priya",
    role: "Travels often",
    initials: "P",
  },
  {
    quote:
      "The “say it in English” button is the only reason I didn't quit on day one. I finally stopped freezing.",
    name: "Daniel",
    role: "B1 learner",
    initials: "D",
  },
  {
    quote:
      "It caught me mixing up ser and estar for weeks, and remembered. ChatGPT never once corrected me.",
    name: "Sam",
    role: "Self-taught",
    initials: "S",
  },
];

export const ENDORSEMENT: Endorsement = {
  quote:
    "Most AI tutors are too polite to teach. FluentFrank's correction-first design, and explaining the fix in the learner's own language, is exactly right.",
  name: "A. Reyes",
  title: "Language teacher, CEFR examiner",
  initials: "AR",
};

/* -------------------------------------------------------------- Pricing -- */

export const PRICING_SECTION = {
  eyebrow: "Pricing",
  title: "Priced like an app, not a tutor.",
  subtitle: `Start free. Go weekly to test the waters, or save ${PRICING.annualSavingsPct}% with yearly once speaking every day becomes the habit.`,
} as const;

export const PLANS: readonly Plan[] = [
  {
    id: PlanId.Free,
    name: "Free",
    tagline: "Try it out, no card needed",
    priceByInterval: {
      [BillingInterval.Weekly]: 0,
      [BillingInterval.Yearly]: 0,
    },
    featured: false,
    ctaLabel: "Start free",
    perks: [
      "2 languages to try out",
      "15 minutes of voice practice",
      "Limited daily text practice",
      "Honest, in-line corrections",
      "Core survival scenarios",
    ],
  },
  {
    id: PlanId.Pro,
    name: "Pro",
    tagline: "Speak every day",
    priceByInterval: {
      [BillingInterval.Weekly]: PRICING.byInterval[BillingInterval.Weekly],
      [BillingInterval.Yearly]: PRICING.byInterval[BillingInterval.Yearly],
    },
    featured: true,
    ctaLabel: "Start free trial",
    perks: [
      "Everything in Free",
      "Unlimited voice conversations",
      "Cross-session mistake memory",
      "Every scenario + a daily plan",
      "Pronunciation flags",
    ],
  },
];

export const PLAN_CAPABILITIES: readonly PlanCapability[] = [
  { label: "Languages", free: "2 to try out", pro: `All ${LANGUAGE_COUNT}` },
  { label: "Honest correction cards", free: true, pro: true },
  { label: "Say it in your language", free: true, pro: true },
  { label: "Voice practice", free: "15 min", pro: "Unlimited" },
  { label: "Text practice", free: "Limited daily", pro: "Unlimited" },
  { label: "Cross-session mistake memory", free: false, pro: true },
  { label: "Survival scenarios", free: "Core", pro: "All + daily plan" },
  { label: "Pronunciation flags", free: false, pro: true },
];

export const PRICING_NOTE =
  "Not ready to commit? Dismiss the trial and you keep a taste of Pro memory for 3 sessions, no card required.";

/* ------------------------------------------------------------------ FAQ -- */

export const FAQ_SECTION = {
  eyebrow: "Questions",
  title: "The honest answers.",
} as const;

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "Is this just another Duolingo?",
    answer:
      "No. Duolingo gamifies tapping the right tiles. Frank gets you speaking out loud and corrects you the way a patient tutor would. That's the whole point.",
  },
  {
    question: "Will it embarrass me when I get things wrong?",
    answer:
      "Never. Frank leads with what you nailed, explains the fix in your own language, and reserves red for genuine system errors, not for you. Being corrected should feel like help, not a grade.",
  },
  {
    question: "I'm a total beginner. Will I be lost?",
    answer:
      "That's exactly who “Say it in your language” is built for. You start in your own language and Frank bridges you into your target language, one real phrase at a time.",
  },
  {
    question: "Isn't ChatGPT free?",
    answer:
      "It is, and it'll happily agree with broken grammar. Frank runs correction as a separate check that can't be talked out of teaching you, and it remembers your mistakes across sessions.",
  },
  {
    question: "Which languages can I learn?",
    answer: `All ${LANGUAGE_COUNT}, available today: ${LANGUAGES.map((language) => language.name).join(", ")}. Frank starts you in your own language and coaches you into any of them, and we add more over time.`,
  },
  {
    question: "What if I want to practise more than my plan includes?",
    answer:
      "You can top up anytime with tokens, each one a block of extra speaking minutes. Grab a pack whenever you want more conversation: no plan change, no commitment.",
  },
  {
    question: "Do I have to talk out loud?",
    answer:
      "Voice is where the magic happens, but you can practice entirely by typing whenever you can't speak out loud.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. Your audio is discarded after analysis, your conversations are never sold or used for training, and you can cancel anytime.",
  },
];

/* ------------------------------------------------------------ Final CTA -- */

export const FINAL_CTA = {
  eyebrow: "Your move",
  title: "The barista is waiting. So is your partner's family.",
  subtitle: "Have your first real conversation in the next 60 seconds.",
  microProof: "Free to start · No credit card · Cancel anytime",
} as const;
