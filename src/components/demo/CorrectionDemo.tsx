"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Brain, Keyboard, Languages, Mic, RotateCcw, Volume2 } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { CorrectionCard } from "@/components/demo/CorrectionCard";
import { DemoPhase, InputMode } from "@/lib/enums";
import { DEMO_EXCHANGES } from "@/lib/content";
import type { DemoExchange } from "@/lib/types";
import { cn } from "@/lib/utils";

const MODE_META: Record<InputMode, { label: string; icon: typeof Mic }> = {
  [InputMode.Voice]: { label: "Voice", icon: Mic },
  [InputMode.Text]: { label: "Text", icon: Keyboard },
  [InputMode.SayItInEnglish]: { label: "Say it in English", icon: Languages },
};

const MODE_ORDER: readonly InputMode[] = [
  InputMode.Voice,
  InputMode.Text,
  InputMode.SayItInEnglish,
];

function Waveform({ active }: { active: boolean }) {
  return (
    <span className="inline-flex h-5 items-end gap-[3px]" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={cn(
            "w-[3px] rounded-full bg-accent",
            active ? "animate-pulse" : "",
          )}
          style={{
            height: `${[40, 75, 100, 60, 30][i] ?? 50}%`,
            animationDelay: `${i * 110}ms`,
            animationDuration: "900ms",
          }}
        />
      ))}
    </span>
  );
}

export function CorrectionDemo({ className }: { readonly className?: string }) {
  const [mode, setMode] = useState<InputMode>(InputMode.SayItInEnglish);
  const [phase, setPhase] = useState<DemoPhase>(DemoPhase.Idle);
  const [active, setActive] = useState<DemoExchange | null>(null);
  const [custom, setCustom] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [playing, setPlaying] = useState(false);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const clearTimers = (): void => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(
    () => () => {
      clearTimers();
      audioRef.current?.pause();
    },
    [],
  );

  const startExchange = (exchange: DemoExchange): void => {
    clearTimers();
    setCustom(null);
    setActive(exchange);
    setTyped("");
    setPhase(DemoPhase.Listening);
    timers.current.push(setTimeout(() => setPhase(DemoPhase.Processing), 850));
    timers.current.push(setTimeout(() => setPhase(DemoPhase.Revealed), 1500));
  };

  const startCustom = (text: string): void => {
    clearTimers();
    setActive(null);
    setCustom(text);
    setTyped("");
    setPhase(DemoPhase.Listening);
    timers.current.push(setTimeout(() => setPhase(DemoPhase.Processing), 700));
    timers.current.push(setTimeout(() => setPhase(DemoPhase.Revealed), 1300));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const value = typed.trim();
    if (value.length === 0) return;
    const match = DEMO_EXCHANGES.find(
      (exchange) => exchange.english.toLowerCase() === value.toLowerCase(),
    );
    if (match) {
      startExchange(match);
    } else {
      startCustom(value);
    }
  };

  const playAudio = (src: string, fallbackText: string): void => {
    if (typeof window === "undefined") return;
    audioRef.current?.pause();
    const audio = new Audio(src);
    audioRef.current = audio;
    setPlaying(true);
    audio.addEventListener("ended", () => setPlaying(false));
    void audio.play().catch(() => {
      // If the clip can't load, fall back to the browser's Spanish voice.
      setPlaying(false);
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(fallbackText);
        utterance.lang = "es-ES";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
    });
  };

  const reset = (): void => {
    clearTimers();
    audioRef.current?.pause();
    setPhase(DemoPhase.Idle);
    setActive(null);
    setCustom(null);
    setTyped("");
    setPlaying(false);
  };

  const userText = active?.english ?? custom ?? "";
  const showConversation = phase !== DemoPhase.Idle;

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
            <p className="text-[0.7rem] text-fg-subtle">Your Spanish coach</p>
          </div>
        </div>
        {showConversation ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-fg-muted transition-colors hover:text-fg"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        ) : (
          <span className="rounded-full border border-border px-2.5 py-1 text-[0.7rem] font-medium text-fg-subtle">
            Live preview
          </span>
        )}
      </div>

      {/* Conversation */}
      <div className="flex min-h-[19rem] flex-col gap-3 px-4 py-4">
        {!showConversation ? (
          <div className="flex items-start gap-2.5">
            <BrandMark className="mt-0.5 h-6 w-6 shrink-0" />
            <p className="rounded-2xl rounded-tl-sm bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-fg-muted">
              Tell me something you&apos;d actually want to say — in English. I&apos;ll teach you the
              Spanish, read it aloud, and fix what most people get wrong.
            </p>
          </div>
        ) : (
          <>
            {/* User bubble */}
            <div className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-tr-sm bg-accent px-3.5 py-2.5 text-sm font-medium text-accent-fg">
                {userText}
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
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg-subtle [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg-subtle [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg-subtle" />
                    </span>
                    Checking it the honest way…
                  </div>
                ) : null}

                {phase === DemoPhase.Revealed && active ? (
                  <>
                    <div className="rounded-2xl rounded-tl-sm bg-surface px-3.5 py-3">
                      <p className="font-display text-lg font-semibold leading-snug text-fg">
                        {active.spanish}
                      </p>
                      <p className="mt-1 text-xs text-fg-subtle">{active.gloss}</p>
                      <button
                        type="button"
                        onClick={() => playAudio(active.audioSrc, active.spanish)}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft/70 px-3 py-1.5 text-xs font-semibold text-accent-strong transition hover:border-accent/50"
                      >
                        <Volume2 className={cn("h-3.5 w-3.5", playing && "animate-pulse")} />
                        {playing ? "Playing…" : "Hear it"}
                      </button>
                    </div>

                    <CorrectionCard correction={active.correction} />

                    <p className="inline-flex items-center gap-1.5 self-start rounded-full bg-surface px-3 py-1.5 text-xs text-fg-muted">
                      <Brain className="h-3.5 w-3.5 text-accent" />
                      {active.memoryNote}
                    </p>
                  </>
                ) : null}

                {phase === DemoPhase.Revealed && custom ? (
                  <div className="flex flex-col gap-3">
                    <p className="rounded-2xl rounded-tl-sm bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-fg-muted">
                      Love that one — I&apos;ll teach you exactly how to say it inside the app. For
                      this quick preview, try one of these:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {DEMO_EXCHANGES.map((exchange) => (
                        <button
                          key={exchange.id}
                          type="button"
                          onClick={() => startExchange(exchange)}
                          className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-fg-muted transition hover:border-accent/40 hover:text-fg"
                        >
                          {exchange.english}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Input dock */}
      <div className="border-t border-border bg-surface/80 px-4 py-3">
        <div className="mb-2.5 flex items-center gap-1.5">
          {MODE_ORDER.map((value) => {
            const meta = MODE_META[value];
            const Icon = meta.icon;
            const isActive = value === mode;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-fg"
                    : "border border-border text-fg-muted hover:text-fg",
                )}
              >
                <Icon className="h-3 w-3" />
                <span className={cn(value === InputMode.SayItInEnglish ? "inline" : "hidden sm:inline")}>
                  {meta.label}
                </span>
              </button>
            );
          })}
        </div>

        {mode === InputMode.Voice ? (
          <button
            type="button"
            onClick={() => {
              const first = DEMO_EXCHANGES[0];
              if (first) startExchange(first);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg transition hover:brightness-105"
          >
            <Mic className="h-4 w-4" />
            Hold to speak
            <span className="text-xs font-normal opacity-80">(tap to simulate)</span>
          </button>
        ) : (
          <form onSubmit={onSubmit} className="flex items-center gap-2">
            <input
              value={typed}
              onChange={(event) => setTyped(event.target.value)}
              placeholder="Type it in English…"
              aria-label="Type something to say in English"
              className="h-10 w-full rounded-full border border-border bg-bg px-4 text-sm text-fg outline-none transition focus:border-accent/50"
            />
            <button
              type="submit"
              aria-label="Send"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg transition hover:brightness-105"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {DEMO_EXCHANGES.map((exchange) => (
            <button
              key={exchange.id}
              type="button"
              onClick={() => startExchange(exchange)}
              className="rounded-full border border-dashed border-border px-2.5 py-1 text-[0.7rem] text-fg-subtle transition hover:border-accent/40 hover:text-fg-muted"
            >
              {exchange.english}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
