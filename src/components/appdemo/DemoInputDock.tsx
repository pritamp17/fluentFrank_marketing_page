"use client";

import { useState } from "react";
import { Mic, Send, Type } from "lucide-react";

import { DemoVoiceOrb } from "@/components/appdemo/DemoVoiceOrb";
import { DemoInputMode, DemoPhase } from "@/lib/enums";
import type { AppDemoBeat } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUS_BY_PHASE: Readonly<Record<DemoPhase, string>> = {
  [DemoPhase.Idle]: "Tap to speak",
  [DemoPhase.Listening]: "Listening…",
  [DemoPhase.Processing]: "Checking it the honest way…",
  [DemoPhase.Revealed]: "Frank is speaking",
};

interface InputDockProps {
  readonly beat: AppDemoBeat;
  readonly phase: DemoPhase;
}

/** The bottom input dock: Voice/Text toggle + the big voice orb (recreates InputModeBar). */
export function DemoInputDock({ beat, phase }: InputDockProps) {
  const [mode, setMode] = useState<DemoInputMode>(DemoInputMode.Voice);

  return (
    <div className="border-t border-ink-800 px-4 py-4 sm:px-5">
      <div className="flex items-center justify-between">
        <div className="inline-flex rounded-xl bg-ink-850 p-1">
          <SegButton active={mode === DemoInputMode.Voice} onClick={() => setMode(DemoInputMode.Voice)}>
            <Mic className="h-3.5 w-3.5" aria-hidden />
            Voice
          </SegButton>
          <SegButton active={mode === DemoInputMode.Text} onClick={() => setMode(DemoInputMode.Text)}>
            <Type className="h-3.5 w-3.5" aria-hidden />
            Text
          </SegButton>
        </div>
        <span className="hidden text-xs font-medium text-ink-400 sm:inline">
          {beat.flag} Speak {beat.l2Label}
        </span>
      </div>

      {mode === DemoInputMode.Voice ? (
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-center text-xs font-medium text-ink-400 sm:hidden">
            {beat.flag} Speak {beat.l2Label}
          </p>
          <DemoVoiceOrb phase={phase} />
          <p className="text-xs text-ink-500">{STATUS_BY_PHASE[phase]}</p>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2">
          <div className="h-11 flex-1 truncate rounded-xl border border-ink-700 bg-ink-850 px-4 text-sm leading-[2.75rem] text-ink-500">
            Type in {beat.l2Label}…
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-500 text-ink-950" aria-hidden>
            <Send className="h-4 w-4" />
          </span>
        </div>
      )}

      <div className="mt-3 flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs text-ink-500">
          {beat.l1Flag} Stuck? Say it in {beat.l1Label}
        </span>
      </div>
    </div>
  );
}

function SegButton({
  active,
  onClick,
  children,
}: {
  readonly active: boolean;
  readonly onClick: () => void;
  readonly children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors",
        active ? "bg-ink-700 text-ink-50 shadow-soft" : "text-ink-400 hover:text-ink-200",
      )}
    >
      {children}
    </button>
  );
}
