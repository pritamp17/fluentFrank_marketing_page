"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

interface LanguageCyclerProps {
  /** Words to rotate through. The first is the SSR / reduced-motion default. */
  readonly words: readonly string[];
  /** Dwell time per word, in milliseconds. */
  readonly intervalMs?: number;
  readonly className?: string;
}

/**
 * Rotates the hero's target language through the animated gradient sheen
 * ("Finally speak ___ — without freezing").
 *
 * - Zero layout shift: an invisible stack of every word reserves the widest
 *   box, so the surrounding headline never reflows as the word changes width.
 * - SSR / reduced-motion: renders the first word statically (keeps the page's
 *   core Spanish keyword in the server HTML and respects motion preferences).
 */
export function LanguageCycler({ words, intervalMs = 2200, className }: LanguageCyclerProps) {
  const reduce = useReducedMotion();
  const safeWords = words.length > 0 ? words : [""];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || safeWords.length <= 1) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % safeWords.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [reduce, intervalMs, safeWords.length]);

  const fallback = safeWords[0] ?? "";
  const active = safeWords[index] ?? fallback;

  return (
    <span className={cn("relative inline-grid align-baseline", className)}>
      {/* Invisible sizer stack — reserves the widest word's box (no reflow). */}
      {safeWords.map((word, i) => (
        <span
          key={`sizer-${word}-${i}`}
          aria-hidden
          className="invisible col-start-1 row-start-1 whitespace-nowrap"
        >
          {word}
        </span>
      ))}

      {reduce ? (
        <span className="text-gradient-animated col-start-1 row-start-1 whitespace-nowrap">
          {fallback}
        </span>
      ) : (
        <span aria-hidden className="col-start-1 row-start-1 whitespace-nowrap">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={active}
              className="text-gradient-animated inline-block"
              initial={{ y: "0.4em", opacity: 0, filter: "blur(8px)" }}
              animate={{ y: "0em", opacity: 1, filter: "blur(0px)" }}
              exit={{ y: "-0.4em", opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {active}
            </motion.span>
          </AnimatePresence>
        </span>
      )}

      {/* Stable label for assistive tech (the visible word rotates silently). */}
      <span className="sr-only">{fallback}</span>
    </span>
  );
}
