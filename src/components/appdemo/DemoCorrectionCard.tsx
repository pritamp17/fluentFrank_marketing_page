import { AlertCircle, Check, Sparkles } from "lucide-react";

import { Badge, BadgeTone } from "@/components/appdemo/Badge";
import { DemoCardKind } from "@/lib/enums";
import type { AppDemoCorrection } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CorrectionCardProps {
  readonly correction: AppDemoCorrection;
  readonly highlighted?: boolean;
  readonly onSelect?: () => void;
}

/** A correction card — Error (amber fix), Teach (sage), or Clean (sage nail). */
export function DemoCorrectionCard({ correction, highlighted, onSelect }: CorrectionCardProps) {
  const isError = correction.kind === DemoCardKind.Error;
  const isClean = correction.kind === DemoCardKind.Clean;

  const Icon = isError ? AlertCircle : isClean ? Check : Sparkles;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full animate-fade-up rounded-2xl border p-4 text-left shadow-soft transition-shadow",
        isError ? "border-amber-500/20 bg-amber-500/[0.06]" : "border-sage-500/30 bg-sage-500/[0.06]",
        highlighted && "ring-2 ring-gold-400/50",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Icon className={cn("h-4 w-4", isError ? "text-amber-200" : "text-sage-200")} aria-hidden />
        {correction.typeLabel ? <Badge tone={BadgeTone.Gold}>{correction.typeLabel}</Badge> : null}
        <Badge tone={isError ? BadgeTone.Amber : BadgeTone.Sage}>{correction.severityLabel}</Badge>
      </div>

      {correction.nailed ? (
        <p className="mt-2.5 text-sm text-sage-200">
          <span className="font-medium">Nailed it · </span>
          {correction.nailed}
        </p>
      ) : null}

      {correction.said ? (
        <p className="mt-2.5 text-[0.7rem] font-medium uppercase tracking-wide text-ink-500">
          You said{" "}
          <span className="ml-1 text-sm normal-case text-ink-400 line-through decoration-ink-600">
            {correction.said}
          </span>
        </p>
      ) : null}

      <div
        className={cn(
          "mt-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-100 ring-1",
          isError ? "bg-amber-500/[0.08] ring-amber-500/20" : "bg-sage-500/[0.1] ring-sage-500/20",
        )}
      >
        {correction.fix}
      </div>

      {correction.why ? (
        <p className="mt-2.5 text-sm leading-relaxed text-ink-300">
          <span className="font-semibold text-ink-200">Why · </span>
          {correction.why}
        </p>
      ) : null}
    </button>
  );
}
