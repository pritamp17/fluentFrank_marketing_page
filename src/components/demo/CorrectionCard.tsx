import { CheckCheck, Sparkles } from "lucide-react";
import { CorrectionSeverity } from "@/lib/enums";
import type { DemoCorrection } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CorrectionCardProps {
  readonly correction: DemoCorrection;
  readonly className?: string;
}

interface SeverityStyle {
  readonly badge: string;
  readonly nailed: boolean;
}

const SEVERITY_STYLE: Record<CorrectionSeverity, SeverityStyle> = {
  [CorrectionSeverity.Nailed]: {
    badge: "border-sage/30 bg-sage/15 text-sage",
    nailed: true,
  },
  [CorrectionSeverity.Polish]: {
    badge: "border-amber/30 bg-amber-soft text-amber",
    nailed: false,
  },
  [CorrectionSeverity.Note]: {
    badge: "border-amber/30 bg-amber-soft text-amber",
    nailed: false,
  },
};

/**
 * The product's signature surface. Calm by design: leads with the badge, shows
 * what you said (struck through, muted) only when there's a fix, then the fix
 * (the heaviest element) and a one-line "why" in English. Red is never used here.
 */
export function CorrectionCard({ correction, className }: CorrectionCardProps) {
  const style = SEVERITY_STYLE[correction.severity];

  return (
    <div className={cn("rounded-2xl border border-border bg-surface p-4 shadow-soft", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
          style.badge,
        )}
      >
        {style.nailed ? <CheckCheck className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
        {correction.typeLabel}
      </span>

      {!style.nailed ? (
        <p className="mt-3 text-sm">
          <span className="mr-2 text-[0.7rem] uppercase tracking-wide text-fg-subtle">You said</span>
          <span className="text-fg-subtle line-through decoration-fg-subtle/50">
            {correction.said}
          </span>
        </p>
      ) : null}

      <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-[0.7rem] uppercase tracking-wide text-fg-subtle">
          {style.nailed ? "Perfect" : "Say"}
        </span>
        <span className="font-display text-lg font-semibold text-accent-strong">
          {correction.fix}
        </span>
      </p>

      <p className="mt-2 text-sm leading-relaxed text-fg-muted">
        <span className="font-semibold text-fg">Why: </span>
        {correction.why}
      </p>
    </div>
  );
}
