"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ data -- */

/**
 * Each entry is the SAME idea said across the roster's languages. Floating words
 * morph through them, quietly depicting the whole product: one thought, many
 * tongues. Order roughly tracks the language roster (EN, ES, FR, DE, IT, JA, KO,
 * ZH, PT, HI, AR, RU).
 */
const MORPH_PHRASES: readonly (readonly string[])[] = [
  ["hello", "hola", "bonjour", "hallo", "ciao", "こんにちは", "안녕", "你好", "olá", "नमस्ते", "مرحبا", "привет"],
  ["thank you", "gracias", "merci", "danke", "grazie", "ありがとう", "감사합니다", "谢谢", "obrigado", "धन्यवाद", "شكرًا", "спасибо"],
  ["of course", "claro", "bien sûr", "natürlich", "certo", "もちろん", "물론", "当然", "claro", "ज़रूर", "بالطبع", "конечно"],
  ["cheers", "salud", "santé", "prost", "salute", "乾杯", "건배", "干杯", "saúde", "चियर्स", "في صحتك", "будем"],
  ["let's go", "vamos", "allons-y", "los geht's", "andiamo", "行こう", "가자", "走吧", "vamos", "चलो", "هيا بنا", "поехали"],
  ["good morning", "buenos días", "bonjour", "guten Morgen", "buongiorno", "おはよう", "좋은 아침", "早上好", "bom dia", "सुप्रभात", "صباح الخير", "доброе утро"],
  ["see you soon", "nos vemos", "à bientôt", "bis bald", "a presto", "またね", "또 봐요", "再见", "até logo", "फिर मिलेंगे", "أراك قريبًا", "до скорого"],
];

interface FloatingConfig {
  readonly phraseIndex: number;
  readonly startIndex: number;
  readonly top: string;
  readonly left?: string;
  readonly right?: string;
  readonly sizeClass: string;
  readonly intervalMs: number;
  readonly hideOnMobile?: boolean;
}

const FLOATING: readonly FloatingConfig[] = [
  { phraseIndex: 0, startIndex: 1, top: "9%", left: "1%", sizeClass: "text-3xl sm:text-4xl", intervalMs: 2600 },
  { phraseIndex: 1, startIndex: 3, top: "20%", right: "2%", sizeClass: "text-2xl sm:text-3xl", intervalMs: 3000, hideOnMobile: true },
  { phraseIndex: 2, startIndex: 6, top: "70%", left: "3%", sizeClass: "text-2xl sm:text-3xl", intervalMs: 2800 },
  { phraseIndex: 5, startIndex: 4, top: "84%", left: "30%", sizeClass: "text-xl sm:text-2xl", intervalMs: 3200, hideOnMobile: true },
  { phraseIndex: 4, startIndex: 7, top: "60%", right: "6%", sizeClass: "text-2xl sm:text-3xl", intervalMs: 2700, hideOnMobile: true },
  { phraseIndex: 3, startIndex: 2, top: "4%", left: "44%", sizeClass: "text-xl sm:text-2xl", intervalMs: 3400, hideOnMobile: true },
  { phraseIndex: 6, startIndex: 9, top: "90%", right: "10%", sizeClass: "text-xl sm:text-2xl", intervalMs: 3600, hideOnMobile: true },
];

/* --------------------------------------------------------------- helpers -- */

const WAVE_VIEW_W = 1200;

function buildWave(amplitude: number, wavelength: number, midY: number, phase: number): string {
  let d = "";
  for (let x = 0; x <= WAVE_VIEW_W; x += 24) {
    const y = midY + amplitude * Math.sin((x / wavelength) * Math.PI * 2 + phase);
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)} `;
  }
  return d.trim();
}

/** Keyframe paths whose amplitude + phase shift make the line look like it's vibrating. */
function buildVibration(baseAmp: number, wavelength: number, midY: number): string[] {
  const specs = [
    { amp: baseAmp * 0.45, phase: 0 },
    { amp: baseAmp * 1.0, phase: Math.PI * 0.66 },
    { amp: baseAmp * 0.68, phase: Math.PI * 1.33 },
    { amp: baseAmp * 1.18, phase: Math.PI * 2 },
  ];
  return specs.map((spec) => buildWave(spec.amp, wavelength, midY, spec.phase));
}

interface RibbonConfig {
  readonly baseAmp: number;
  readonly wavelength: number;
  readonly midY: number;
  readonly stroke: string;
  readonly strokeWidth: number;
  readonly opacity: number;
  readonly durationSec: number;
}

const RIBBONS: readonly RibbonConfig[] = [
  { baseAmp: 24, wavelength: 360, midY: 150, stroke: "url(#ffWaveAccent)", strokeWidth: 2.4, opacity: 0.6, durationSec: 3.2 },
  { baseAmp: 17, wavelength: 280, midY: 205, stroke: "url(#ffWaveSage)", strokeWidth: 1.8, opacity: 0.42, durationSec: 4.1 },
  { baseAmp: 30, wavelength: 460, midY: 255, stroke: "url(#ffWaveAccent)", strokeWidth: 1.6, opacity: 0.28, durationSec: 5.0 },
];

/* ----------------------------------------------------------- subcomponents -- */

function MorphWord({ config, animate }: { readonly config: FloatingConfig; readonly animate: boolean }) {
  const phrases = MORPH_PHRASES[config.phraseIndex] ?? MORPH_PHRASES[0] ?? [];
  const [i, setI] = useState(config.startIndex % Math.max(phrases.length, 1));

  useEffect(() => {
    if (!animate || phrases.length <= 1) return;
    const id = setInterval(() => setI((current) => (current + 1) % phrases.length), config.intervalMs);
    return () => clearInterval(id);
  }, [animate, phrases.length, config.intervalMs]);

  const text = phrases[i] ?? phrases[0] ?? "";
  const staticText = phrases[1] ?? phrases[0] ?? "";

  return (
    <span
      className={cn(
        "pointer-events-none absolute select-none font-display italic text-accent/25",
        config.sizeClass,
        config.hideOnMobile && "hidden md:block",
      )}
      style={{ top: config.top, left: config.left, right: config.right }}
      aria-hidden
    >
      {!animate ? (
        <span>{staticText}</span>
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

/** Voice-wave ribbons that vibrate in place (amplitude + phase morph), with a soft glow. */
function VoiceWaves({ animate }: { readonly animate: boolean }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      style={{ filter: "drop-shadow(0 0 10px rgb(var(--accent) / 0.18))" }}
      aria-hidden
    >
      <defs>
        <linearGradient id="ffWaveAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0" />
          <stop offset="50%" stopColor="rgb(var(--accent))" stopOpacity="0.7" />
          <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ffWaveSage" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(var(--sage))" stopOpacity="0" />
          <stop offset="50%" stopColor="rgb(var(--sage))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="rgb(var(--sage))" stopOpacity="0" />
        </linearGradient>
      </defs>
      {RIBBONS.map((ribbon, i) => {
        const frames = buildVibration(ribbon.baseAmp, ribbon.wavelength, ribbon.midY);
        return (
          <motion.path
            key={i}
            d={frames[0]}
            fill="none"
            stroke={ribbon.stroke}
            strokeWidth={ribbon.strokeWidth}
            strokeLinecap="round"
            style={{ opacity: ribbon.opacity }}
            animate={animate ? { d: frames } : undefined}
            transition={{ duration: ribbon.durationSec, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
        );
      })}
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
      <VoiceWaves animate={animate} />
      {FLOATING.map((config, i) => (
        <MorphWord key={`${config.phraseIndex}-${i}`} config={config} animate={animate} />
      ))}
      <Sparkles animate={animate} />
      {/* Soft vignette so the words/waves never compete with the headline. */}
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
