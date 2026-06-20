"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ data -- */

interface WordPair {
  readonly en: string;
  readonly es: string;
}

interface FloatingWord {
  readonly pair: WordPair;
  /** Position as CSS values (use left OR right). */
  readonly top: string;
  readonly left?: string;
  readonly right?: string;
  readonly sizeClass: string;
  readonly duration: number;
  readonly delay: number;
  readonly hideOnMobile?: boolean;
}

/**
 * Words sit in the hero's negative space (never over the headline or the
 * product card). Morphing English→Spanish quietly depicts the whole product:
 * finding your voice in another language.
 */
const WORDS: readonly FloatingWord[] = [
  { pair: { en: "hello", es: "hola" }, top: "9%", left: "1%", sizeClass: "text-3xl sm:text-4xl", duration: 7.5, delay: 0 },
  { pair: { en: "thank you", es: "gracias" }, top: "20%", right: "2%", sizeClass: "text-2xl sm:text-3xl", duration: 9, delay: 0.6, hideOnMobile: true },
  { pair: { en: "of course", es: "claro" }, top: "70%", left: "3%", sizeClass: "text-2xl sm:text-3xl", duration: 8, delay: 1.1 },
  { pair: { en: "good morning", es: "buenos días" }, top: "84%", left: "30%", sizeClass: "text-xl sm:text-2xl", duration: 10, delay: 0.3, hideOnMobile: true },
  { pair: { en: "let's go", es: "vamos" }, top: "60%", right: "6%", sizeClass: "text-2xl sm:text-3xl", duration: 8.5, delay: 1.6, hideOnMobile: true },
  { pair: { en: "cheers", es: "salud" }, top: "4%", left: "44%", sizeClass: "text-xl sm:text-2xl", duration: 9.5, delay: 0.9, hideOnMobile: true },
  { pair: { en: "see you soon", es: "nos vemos" }, top: "90%", right: "10%", sizeClass: "text-xl sm:text-2xl", duration: 11, delay: 2, hideOnMobile: true },
];

/* --------------------------------------------------------------- helpers -- */

function buildWave(width: number, amplitude: number, wavelength: number, midY: number): string {
  let d = "";
  for (let x = 0; x <= width; x += 14) {
    const y = midY + amplitude * Math.sin((x / wavelength) * Math.PI * 2);
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)} `;
  }
  return d.trim();
}

/* ----------------------------------------------------------- subcomponents -- */

function MorphWord({ word, animate }: { readonly word: FloatingWord; readonly animate: boolean }) {
  const [showEs, setShowEs] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const id = setInterval(() => setShowEs((value) => !value), 3400 + word.delay * 400);
    return () => clearInterval(id);
  }, [animate, word.delay]);

  const text = showEs ? word.pair.es : word.pair.en;

  return (
    <span
      className={cn(
        "pointer-events-none absolute select-none font-display italic text-accent/25",
        word.sizeClass,
        word.hideOnMobile && "hidden md:block",
      )}
      style={{ top: word.top, left: word.left, right: word.right }}
      aria-hidden
    >
      {!animate ? (
        <span>{word.pair.es}</span>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={text}
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="inline-block"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  );
}

function Aurora({ animate }: { readonly animate: boolean }) {
  const blobs = [
    { className: "left-[-10%] top-[-15%] h-[34rem] w-[34rem]", color: "rgb(var(--accent) / 0.20)", x: [0, 40, 0], y: [0, 26, 0], duration: 17 },
    { className: "right-[-8%] top-[6%] h-[28rem] w-[28rem]", color: "rgb(var(--sage) / 0.18)", x: [0, -36, 0], y: [0, 30, 0], duration: 21 },
    { className: "left-[28%] bottom-[-22%] h-[30rem] w-[30rem]", color: "rgb(var(--accent) / 0.14)", x: [0, 28, 0], y: [0, -22, 0], duration: 24 },
  ];
  return (
    <>
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={cn("absolute rounded-full blur-3xl", blob.className)}
          style={{ background: `radial-gradient(circle at center, ${blob.color}, transparent 70%)` }}
          animate={animate ? { x: blob.x, y: blob.y } : undefined}
          transition={{ duration: blob.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

function VoiceRibbons({ animate }: { readonly animate: boolean }) {
  const width = 2400;
  const ribbons = [
    { d: buildWave(width, 26, 400, 150), opacity: 0.5, duration: 26, stroke: "url(#ffWaveAccent)" },
    { d: buildWave(width, 18, 300, 250), opacity: 0.35, duration: 34, stroke: "url(#ffWaveSage)" },
  ];
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="ffWaveAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0" />
          <stop offset="50%" stopColor="rgb(var(--accent))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ffWaveSage" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(var(--sage))" stopOpacity="0" />
          <stop offset="50%" stopColor="rgb(var(--sage))" stopOpacity="0.55" />
          <stop offset="100%" stopColor="rgb(var(--sage))" stopOpacity="0" />
        </linearGradient>
      </defs>
      {ribbons.map((ribbon, i) => (
        <motion.path
          key={i}
          d={ribbon.d}
          fill="none"
          stroke={ribbon.stroke}
          strokeWidth={2}
          style={{ opacity: ribbon.opacity }}
          animate={animate ? { x: [0, -1200] } : undefined}
          transition={{ duration: ribbon.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </svg>
  );
}

function Sparkles({ animate }: { readonly animate: boolean }) {
  if (!animate) return null;
  const dots = [
    { top: "16%", left: "22%", delay: 0 },
    { top: "32%", left: "8%", delay: 1.3 },
    { top: "62%", left: "40%", delay: 0.7 },
    { top: "24%", right: "16%", delay: 2.1 },
    { top: "74%", right: "24%", delay: 1.7 },
    { top: "48%", left: "2%", delay: 2.6 },
  ];
  return (
    <>
      {dots.map((dot, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-accent"
          style={{ top: dot.top, left: dot.left, right: dot.right, boxShadow: "0 0 8px 1px rgb(var(--accent) / 0.6)" }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: dot.delay, ease: "easeInOut" }}
          aria-hidden
        />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ main -- */

export function HeroAtmosphere() {
  const reduce = useReducedMotion();
  const animate = !reduce;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-x-0 top-0 h-[34rem] bg-grid opacity-50" />
      <Aurora animate={animate} />
      <VoiceRibbons animate={animate} />
      {WORDS.map((word) => (
        <MorphWord key={`${word.pair.en}-${word.top}`} word={word} animate={animate} />
      ))}
      <Sparkles animate={animate} />
      {/* Soft vignette so the words/ribbons never compete with the headline. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, transparent 55%, rgb(var(--bg) / 0.55))",
        }}
      />
    </div>
  );
}
