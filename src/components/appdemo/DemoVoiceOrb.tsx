"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Loader2, Mic, Volume2 } from "lucide-react";

import { DemoPhase } from "@/lib/enums";
import { cn } from "@/lib/utils";

type OrbIcon = "mic" | "speak" | "loading";

interface OrbLook {
  readonly fill: string;
  readonly icon: OrbIcon;
  readonly pulse: boolean;
  readonly scale: number;
}

/** Phase → orb look, mirroring the app's OrbCore states (sage/amber/gold). */
function lookFor(phase: DemoPhase): OrbLook {
  switch (phase) {
    case DemoPhase.Listening:
      return {
        fill: "bg-sage-500 text-ink-950 shadow-sage-glow ring-2 ring-sage-300/60",
        icon: "mic",
        pulse: true,
        scale: 1.08,
      };
    case DemoPhase.Processing:
      return {
        fill: "bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/30",
        icon: "loading",
        pulse: false,
        scale: 1,
      };
    case DemoPhase.Revealed:
      return {
        fill: "bg-gold-500/20 text-gold-200 shadow-app-glow ring-1 ring-gold-400/40",
        icon: "speak",
        pulse: false,
        scale: 1.04,
      };
    default:
      return {
        fill: "bg-ink-850 text-ink-300 ring-1 ring-ink-700",
        icon: "mic",
        pulse: false,
        scale: 1,
      };
  }
}

const ICON_FOR: Record<OrbIcon, typeof Mic> = {
  mic: Mic,
  speak: Volume2,
  loading: Loader2,
};

/** The big circular voice orb (recreates VoiceOrb + OrbCore). Decorative. */
export function DemoVoiceOrb({ phase, className }: { readonly phase: DemoPhase; readonly className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const look = lookFor(phase);
  const Icon = ICON_FOR[look.icon];

  return (
    <div className={cn("relative grid h-24 w-24 place-items-center", className)}>
      {look.pulse && !reduce ? (
        <span className="absolute h-20 w-20 rounded-full bg-sage-500/40 animate-pulse-ring" aria-hidden />
      ) : null}
      <motion.div
        className={cn("grid h-20 w-20 place-items-center rounded-full transition-colors", look.fill)}
        animate={reduce ? undefined : { scale: look.scale }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        aria-hidden
      >
        <Icon className={cn("h-7 w-7", look.icon === "loading" && "animate-spin")} />
      </motion.div>
    </div>
  );
}
