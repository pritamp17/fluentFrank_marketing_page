import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export enum BadgeTone {
  Gold = "gold",
  Sage = "sage",
  Amber = "amber",
  Neutral = "neutral",
}

const TONE_CLASS: Record<BadgeTone, string> = {
  [BadgeTone.Gold]: "border-gold-500/30 bg-gold-500/10 text-gold-300",
  [BadgeTone.Sage]: "border-sage-500/30 bg-sage-500/10 text-sage-200",
  [BadgeTone.Amber]: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  [BadgeTone.Neutral]: "border-ink-700 bg-ink-800/60 text-ink-300",
};

interface BadgeProps {
  readonly tone?: BadgeTone;
  readonly icon?: ReactNode;
  readonly children: ReactNode;
  readonly className?: string;
}

/** A small calm tone-pill (gold/sage/amber/neutral) — mirrors the app's Badge. */
export function Badge({ tone = BadgeTone.Neutral, icon, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
        TONE_CLASS[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
