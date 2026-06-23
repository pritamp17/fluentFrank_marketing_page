import { Language } from "@/lib/enums";

/**
 * A single supported target language. Centralized, type-safe source of truth for
 * the hero word-cycle, the Languages section, and any copy that lists what Frank
 * teaches. Spanish is the live flagship; the rest make up the 12-language roster
 * (Duolingo's 2025 most-learned set + high-value business languages).
 */
export interface LanguageInfo {
  readonly id: Language;
  /** English display name, used in the headline cycle and as a heading. */
  readonly name: string;
  /** Endonym (the language's own name), shown in the Languages section. */
  readonly nativeName: string;
  /** A native "hello", for ambient flavor. */
  readonly greeting: string;
  /** One-line reason it's on the roster (shown under the chip). */
  readonly note: string;
  /** Right-to-left script (Arabic), flips text alignment in the UI. */
  readonly rtl?: boolean;
  /** The one language that's live in the app today. */
  readonly flagship?: boolean;
}

/**
 * Ordered for display: Spanish leads (it's live and the hero's default word),
 * then English, then the rest by global learner demand and business value.
 */
export const LANGUAGES: readonly LanguageInfo[] = [
  { id: Language.Spanish, name: "Spanish", nativeName: "Español", greeting: "¡Hola!", note: "Most loved · flagship", flagship: true },
  { id: Language.English, name: "English", nativeName: "English", greeting: "Hello!", note: "#1 studied worldwide" },
  { id: Language.French, name: "French", nativeName: "Français", greeting: "Bonjour !", note: "Diplomacy & culture" },
  { id: Language.German, name: "German", nativeName: "Deutsch", greeting: "Hallo!", note: "Engineering & EU trade" },
  { id: Language.Italian, name: "Italian", nativeName: "Italiano", greeting: "Ciao!", note: "Design & la dolce vita" },
  { id: Language.Japanese, name: "Japanese", nativeName: "日本語", greeting: "こんにちは", note: "Tech, gaming & travel" },
  { id: Language.Korean, name: "Korean", nativeName: "한국어", greeting: "안녕하세요", note: "Fastest-rising favorite" },
  { id: Language.Mandarin, name: "Mandarin", nativeName: "中文", greeting: "你好", note: "World's largest market" },
  { id: Language.Portuguese, name: "Portuguese", nativeName: "Português", greeting: "Olá!", note: "Brazil & beyond" },
  { id: Language.Hindi, name: "Hindi", nativeName: "हिन्दी", greeting: "नमस्ते", note: "1.5B+ speakers" },
  { id: Language.Arabic, name: "Arabic", nativeName: "العربية", greeting: "مرحبًا", note: "Energy & the MENA region", rtl: true },
  { id: Language.Russian, name: "Russian", nativeName: "Русский", greeting: "Привет", note: "Eurasia & STEM" },
];

/** Total supported languages, used in copy so the number stays in sync. */
export const LANGUAGE_COUNT: number = LANGUAGES.length;

/**
 * Words for the hero's animated cycler ("Finally speak ___, without freezing").
 * Spanish is first so the static / reduced-motion / SSR state reads naturally and
 * preserves the page's core Spanish keyword.
 */
export const HERO_CYCLE_WORDS: readonly string[] = LANGUAGES.map((language) => language.name);
