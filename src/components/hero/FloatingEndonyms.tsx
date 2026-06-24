"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Language } from "@/lib/enums";
import { LANGUAGES, type LanguageInfo } from "@/lib/languages";
import { cn } from "@/lib/utils";

/**
 * The "living language" backdrop layer (port of the app's FloatingGlyphs).
 * Greetings + endonyms across many scripts fade in and out at scattered spots
 * behind the hero, sourced from the existing LANGUAGES table. Deterministic
 * (no Math.random) so it is hydration-safe, theme-aware, and GPU-light.
 */
const BY_ID: Map<Language, LanguageInfo> = new Map(LANGUAGES.map((lang) => [lang.id, lang]));

/** Snap ease shared with the rest of the site's motion. */
const EASE_SNAP = [0.22, 1, 0.36, 1] as const;

enum GlyphSize {
  Sm = "sm",
  Md = "md",
  Lg = "lg",
}

const SIZE_CLASS: Record<GlyphSize, string> = {
  [GlyphSize.Sm]: "text-xl sm:text-2xl",
  [GlyphSize.Md]: "text-3xl sm:text-4xl",
  [GlyphSize.Lg]: "text-4xl sm:text-6xl",
};

interface GlyphSpec {
  readonly lang: Language;
  /** Show the endonym (true) or the greeting (false). */
  readonly endonym: boolean;
  readonly top: number;
  readonly left: number;
  readonly size: GlyphSize;
  readonly delay: number;
  readonly duration: number;
  /** Peak opacity (kept low so the hero copy + demo stay dominant). */
  readonly peak: number;
  /** Accent a few in the brand token (green in light / gold in dark). */
  readonly accent?: boolean;
}

// Scattered, biased to edges/corners so the headline (left) and demo (right) stay
// clear. Staggered delays/durations = never a synchronized blink.
const GLYPHS: readonly GlyphSpec[] = [
  { lang: Language.Japanese, endonym: true, top: 9, left: 6, size: GlyphSize.Lg, delay: 0, duration: 7.5, peak: 0.18, accent: true },
  { lang: Language.Spanish, endonym: false, top: 16, left: 80, size: GlyphSize.Md, delay: 1.4, duration: 8, peak: 0.16 },
  { lang: Language.Korean, endonym: true, top: 33, left: 11, size: GlyphSize.Md, delay: 3.1, duration: 7, peak: 0.15 },
  { lang: Language.Arabic, endonym: true, top: 11, left: 46, size: GlyphSize.Sm, delay: 2.2, duration: 8.5, peak: 0.14 },
  { lang: Language.Mandarin, endonym: false, top: 42, left: 88, size: GlyphSize.Lg, delay: 4.3, duration: 7.5, peak: 0.18, accent: true },
  { lang: Language.Hindi, endonym: true, top: 60, left: 7, size: GlyphSize.Md, delay: 1.9, duration: 8, peak: 0.15 },
  { lang: Language.Russian, endonym: false, top: 74, left: 82, size: GlyphSize.Sm, delay: 5.2, duration: 7, peak: 0.14 },
  { lang: Language.French, endonym: false, top: 86, left: 22, size: GlyphSize.Md, delay: 3.6, duration: 8.5, peak: 0.16 },
  { lang: Language.Italian, endonym: false, top: 88, left: 62, size: GlyphSize.Sm, delay: 4.8, duration: 9, peak: 0.13 },
  { lang: Language.Korean, endonym: false, top: 27, left: 64, size: GlyphSize.Sm, delay: 5.7, duration: 7.5, peak: 0.13, accent: true },
];

function glyphText(spec: GlyphSpec): string {
  const info = BY_ID.get(spec.lang);
  if (!info) return "";
  return spec.endonym ? info.nativeName : info.greeting;
}

export function FloatingEndonyms() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {GLYPHS.map((spec, i) => {
        const info = BY_ID.get(spec.lang);
        return (
          <motion.span
            key={`${spec.lang}-${spec.endonym ? "n" : "g"}-${i}`}
            dir={info?.rtl ? "rtl" : undefined}
            className={cn(
              "absolute select-none whitespace-nowrap font-display font-medium tracking-tight",
              SIZE_CLASS[spec.size],
              spec.accent ? "text-gold-400" : "text-ink-300",
            )}
            style={{ top: `${spec.top}%`, left: `${spec.left}%` }}
            initial={reduce ? { opacity: spec.peak * 0.5 } : { opacity: 0, scale: 0.92, y: 8 }}
            animate={
              reduce
                ? { opacity: spec.peak * 0.5 }
                : {
                    opacity: [0, spec.peak, spec.peak, 0],
                    scale: [0.92, 1, 1, 0.96],
                    y: [8, 0, 0, -8],
                  }
            }
            transition={
              reduce
                ? { duration: 0 }
                : {
                    duration: spec.duration,
                    delay: spec.delay,
                    times: [0, 0.22, 0.7, 1],
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: EASE_SNAP,
                  }
            }
          >
            {glyphText(spec)}
          </motion.span>
        );
      })}
    </div>
  );
}
