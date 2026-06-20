"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Brain, Pause, Play, Volume2 } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { CorrectionCard } from "@/components/demo/CorrectionCard";
import { TypingDots } from "@/components/demo/TypingDots";
import { Waveform } from "@/components/demo/Waveform";
import { DEMO_EXCHANGES } from "@/lib/content";
import { DemoPhase } from "@/lib/enums";
import { cn } from "@/lib/utils";

/** How long each phase holds before the loop advances (ms). */
const PHASE_MS: Readonly<Record<DemoPhase, number>> = {
  [DemoPhase.Idle]: 0,
  [DemoPhase.Listening]: 1000,
  [DemoPhase.Processing]: 900,
  [DemoPhase.Revealed]: 4600,
};

/**
 * A self-playing showcase of the product's "aha" — it scripts itself through
 * the real exchanges (listening → honest check → reveal + correction) and loops.
 * No fake input box: nothing here pretends to be a wired-up chatbot. Visitors
 * can still hear the audio, scrub examples via the dots, or pause.
 */
export function CorrectionDemo({ className }: { readonly className?: string }) {
  const reduce = useReducedMotion();
  const total = DEMO_EXCHANGES.length;

  const [exIndex, setExIndex] = useState(0);
  const [phase, setPhase] = useState<DemoPhase>(DemoPhase.Revealed);
  const [playing, setPlaying] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Phase machine. Re-runs on every phase change to schedule the next beat.
  useEffect(() => {
    if (reduce) {
      setPhase(DemoPhase.Revealed);
      return;
    }
    if (!playing) return;
    if (phase === DemoPhase.Revealed && audioPlaying) return; // let the clip finish

    const id = setTimeout(() => {
      if (phase === DemoPhase.Listening) {
        setPhase(DemoPhase.Processing);
      } else if (phase === DemoPhase.Processing) {
        setPhase(DemoPhase.Revealed);
      } else {
        setExIndex((current) => (current + 1) % total);
        setPhase(DemoPhase.Listening);
      }
    }, PHASE_MS[phase]);
    return () => clearTimeout(id);
  }, [phase, exIndex, playing, audioPlaying, reduce, total]);

  // Stop any audio on unmount.
  useEffect(() => () => audioRef.current?.pause(), []);

  const active = DEMO_EXCHANGES[exIndex] ?? DEMO_EXCHANGES[0];
  if (!active) return null;

  const playAudio = (): void => {
    if (typeof window === "undefined") return;
    audioRef.current?.pause();
    const audio = new Audio(active.audioSrc);
    audioRef.current = audio;
    setAudioPlaying(true);
    audio.addEventListener("ended", () => setAudioPlaying(false));
    void audio.play().catch(() => {
      // If the clip can't load, fall back to the browser's Spanish voice.
      setAudioPlaying(false);
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(active.spanish);
        utterance.lang = "es-ES";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
    });
  };

  const jumpTo = (index: number): void => {
    audioRef.current?.pause();
    setAudioPlaying(false);
    setExIndex(index);
    setPhase(reduce ? DemoPhase.Revealed : DemoPhase.Listening);
    setPlaying(true);
  };

  const revealed = phase === DemoPhase.Revealed;

  return (
    <div
      className={cn(
        "flex w-full max-w-md flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface-2/60 shadow-glow backdrop-blur",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-surface/80 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="relative inline-flex">
            <BrandMark className="h-7 w-7" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-sage" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-fg">Frank</p>
            <p className="text-[0.7rem] text-fg-subtle">Your language coach</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[0.7rem] font-medium text-fg-subtle">
          <span className={cn("h-1.5 w-1.5 rounded-full", playing && !reduce ? "animate-pulse bg-sage" : "bg-fg-subtle")} aria-hidden />
          {reduce ? "Preview" : playing ? "Auto-playing" : "Paused"}
        </span>
      </div>

      {/* Conversation */}
      <div className="flex min-h-[20rem] flex-col gap-3 px-4 py-4">
        {/* User bubble */}
        <div className="flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-tr-sm bg-accent px-3.5 py-2.5 text-sm font-medium text-accent-fg">
            {active.english}
          </p>
        </div>

        {/* Frank response */}
        <div className="flex items-start gap-2.5">
          <BrandMark className="mt-0.5 h-6 w-6 shrink-0" />
          <div className="flex w-full flex-col gap-3">
            {phase === DemoPhase.Listening ? (
              <div className="inline-flex items-center gap-2.5 self-start rounded-2xl rounded-tl-sm bg-surface px-3.5 py-2.5 text-sm text-fg-muted">
                <Waveform active />
                Listening…
              </div>
            ) : null}

            {phase === DemoPhase.Processing ? (
              <div className="inline-flex items-center gap-2 self-start rounded-2xl rounded-tl-sm bg-surface px-3.5 py-2.5 text-sm text-fg-muted">
                <TypingDots />
                Checking it the honest way…
              </div>
            ) : null}

            {revealed ? (
              <div key={active.id} className="flex animate-fadeRise flex-col gap-3">
                <div className="rounded-2xl rounded-tl-sm bg-surface px-3.5 py-3">
                  <p className="font-display text-lg font-semibold leading-snug text-fg">{active.spanish}</p>
                  <p className="mt-1 text-xs text-fg-subtle">{active.gloss}</p>
                  <button
                    type="button"
                    onClick={playAudio}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft/70 px-3 py-1.5 text-xs font-semibold text-accent-strong transition hover:border-accent/50"
                  >
                    <Volume2 className={cn("h-3.5 w-3.5", audioPlaying && "animate-pulse")} />
                    {audioPlaying ? "Playing…" : "Hear it"}
                  </button>
                </div>

                <CorrectionCard correction={active.correction} />

                <p className="inline-flex items-center gap-1.5 self-start rounded-full bg-surface px-3 py-1.5 text-xs text-fg-muted">
                  <Brain className="h-3.5 w-3.5 text-accent" aria-hidden />
                  {active.memoryNote}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Playback controls — replaces the old (unwired) input dock. */}
      <div className="flex items-center justify-between gap-3 border-t border-border bg-surface/80 px-4 py-3">
        <div className="flex items-center gap-1.5">
          {DEMO_EXCHANGES.map((exchange, i) => (
            <button
              key={exchange.id}
              type="button"
              aria-label={`Show example ${i + 1}: ${exchange.english}`}
              aria-current={i === exIndex ? true : undefined}
              onClick={() => jumpTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === exIndex ? "w-6 bg-accent" : "w-2.5 bg-border hover:bg-fg-subtle",
              )}
            />
          ))}
          <span className="ml-2 hidden text-[0.7rem] text-fg-subtle sm:inline">Real corrections, on a loop</span>
        </div>

        {!reduce ? (
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Pause demo" : "Play demo"}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-fg-muted transition-colors hover:text-fg"
          >
            {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {playing ? "Pause" : "Play"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
