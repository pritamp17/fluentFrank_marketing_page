"use client";

import { useReducedMotion } from "framer-motion";

import { FloatingEndonyms } from "@/components/hero/FloatingEndonyms";
import { AmbientVideo } from "@/components/motion/AmbientVideo";
import { ASSETS } from "@/lib/site";

/**
 * The premium hero backdrop, ported from the app's onboarding AmbientArt:
 *   1) warm-paper gradient floor (the resilient base if art fails to load)
 *   2) theme-switched still art (light/dark webp, zero-JS via `dark:`)
 *   3) a subtle drifting-waves motion loop (webm), skipped for reduced motion
 *   4) the floating multilingual glyph layer (greetings + endonyms)
 *   5) a theme-aware vignette, plus a fade into the page background at the seam
 * Decorative + non-interactive. Scoped to the hero (absolute, not fixed).
 */
export function AmbientBackdrop() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-canvas bg-[linear-gradient(180deg,_rgb(var(--ob-canvas))_0%,_rgb(var(--ob-canvas-2))_100%)]"
    >
      {/* Still art — correct per theme, no flash, no JS. */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90 dark:hidden"
        style={{ backgroundImage: `url(${ASSETS.ambient.light})` }}
      />
      <div
        className="absolute inset-0 hidden bg-cover bg-center opacity-90 dark:block"
        style={{ backgroundImage: `url(${ASSETS.ambient.dark})` }}
      />

      {/* Drifting-waves motion loop — silent, looping; skipped for reduced motion. */}
      {!reduce ? (
        <AmbientVideo
          src={ASSETS.ambient.loop}
          poster={ASSETS.ambient.light}
          type="video/webm"
          className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-multiply dark:mix-blend-screen"
        />
      ) : null}

      {/* Living language — greetings + endonyms popping in and out. */}
      <FloatingEndonyms />

      {/* Edge-settle vignette (theme-aware: tints to --ob-vignette). */}
      <div className="absolute inset-0 bg-[radial-gradient(125%_110%_at_50%_28%,transparent_55%,rgb(var(--ob-vignette)/0.5)_100%)]" />

      {/* Fade the warm canvas into the page background at the bottom seam. */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_bottom,transparent,rgb(var(--bg)))]" />
    </div>
  );
}
