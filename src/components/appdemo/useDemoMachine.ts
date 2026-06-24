"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { DemoPhase } from "@/lib/enums";

/** How long each phase holds before the loop advances (ms). Matches the app feel. */
const PHASE_MS: Readonly<Record<DemoPhase, number>> = {
  [DemoPhase.Idle]: 0,
  [DemoPhase.Listening]: 1000,
  [DemoPhase.Processing]: 900,
  [DemoPhase.Revealed]: 4600,
};

export interface DemoMachine {
  readonly beatIndex: number;
  readonly phase: DemoPhase;
  readonly playing: boolean;
  readonly reduce: boolean;
  readonly setPlaying: (next: boolean | ((value: boolean) => boolean)) => void;
  /** Pauses auto-advance while a "Hear it" clip is playing. */
  readonly setAudioPlaying: (next: boolean) => void;
  readonly jumpTo: (index: number) => void;
}

/**
 * The self-playing scripted machine that drives the app-faithful demo
 * (listening → honest check → reveal → next beat → loop). Lifted from the
 * original CorrectionDemo so the hero and the full workspace share one loop.
 * Honors prefers-reduced-motion (pins to the revealed state, no auto-advance).
 */
export function useDemoMachine(beatCount: number): DemoMachine {
  const reduce = useReducedMotion() ?? false;

  const [beatIndex, setBeatIndex] = useState(0);
  const [phase, setPhase] = useState<DemoPhase>(DemoPhase.Revealed);
  const [playing, setPlaying] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);

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
        setBeatIndex((current) => (current + 1) % beatCount);
        setPhase(DemoPhase.Listening);
      }
    }, PHASE_MS[phase]);
    return () => clearTimeout(id);
  }, [phase, beatIndex, playing, audioPlaying, reduce, beatCount]);

  const jumpTo = (index: number): void => {
    setBeatIndex(index);
    setPhase(reduce ? DemoPhase.Revealed : DemoPhase.Listening);
    setPlaying(true);
  };

  return { beatIndex, phase, playing, reduce, setPlaying, setAudioPlaying, jumpTo };
}
