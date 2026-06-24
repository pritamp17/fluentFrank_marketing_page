import { MessageSquareText } from "lucide-react";

import { Badge, BadgeTone } from "@/components/appdemo/Badge";
import { DemoCorrectionCard } from "@/components/appdemo/DemoCorrectionCard";
import type { AppDemoBeat } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CorrectionsPanelProps {
  /** The beats whose corrections are visible so far (oldest first). */
  readonly beats: readonly AppDemoBeat[];
  readonly activeId: string | null;
  readonly onSelect: (id: string | null) => void;
  readonly className?: string;
}

/** The right-hand Corrections rail (recreates the app's CorrectionsPanel). */
export function DemoCorrectionsPanel({ beats, activeId, onSelect, className }: CorrectionsPanelProps) {
  return (
    <aside className={cn("hidden w-80 shrink-0 flex-col border-l border-ink-800 lg:flex", className)}>
      <div className="flex items-center justify-between border-b border-ink-800 px-4 py-3">
        <p className="text-sm font-semibold text-ink-100">Corrections</p>
        {beats.length > 0 ? <Badge tone={BadgeTone.Amber}>{beats.length}</Badge> : null}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {beats.length === 0 ? (
          <EmptyState />
        ) : (
          beats
            .slice()
            .reverse()
            .map((beat) => (
              <DemoCorrectionCard
                key={beat.id}
                correction={beat.correction}
                highlighted={activeId === beat.id}
                onSelect={() => onSelect(activeId === beat.id ? null : beat.id)}
              />
            ))
        )}
      </div>
    </aside>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-800 px-4 py-10 text-center">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-ink-800/60 text-ink-400">
        <MessageSquareText className="h-5 w-5" aria-hidden />
      </span>
      <p className="mt-3 text-sm font-medium text-ink-200">No corrections yet</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-500">
        They appear here as you speak. Calm notes, never red marks.
      </p>
    </div>
  );
}
