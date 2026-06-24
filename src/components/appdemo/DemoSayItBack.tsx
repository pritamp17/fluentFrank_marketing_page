import { ArrowRight, Volume2 } from "lucide-react";

import type { AppDemoBeat } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SayItBackProps {
  readonly beat: AppDemoBeat;
  readonly onListen?: () => void;
  readonly listening?: boolean;
}

/** The "Now you say it in {L2}" card — recreates the app's SayItBackPanel. */
export function DemoSayItBack({ beat, onListen, listening }: SayItBackProps) {
  return (
    <div className="rounded-xl border border-sage-500/30 bg-sage-500/[0.06] p-3">
      <p className="flex items-center gap-1.5 text-sm font-medium text-sage-200">
        <ArrowRight className="h-4 w-4" aria-hidden />
        Now you say it in {beat.l2Label}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-sage-500/[0.12] px-3 py-1.5 font-display text-sm font-medium text-ink-100 ring-1 ring-sage-500/20">
          {beat.sayItBack.phrase}
        </span>
        <button
          type="button"
          onClick={onListen}
          tabIndex={-1}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-sage-200 transition-colors hover:bg-sage-500/10"
        >
          <Volume2 className={cn("h-3.5 w-3.5", listening && "animate-pulse")} aria-hidden />
          Hear it
        </button>
      </div>

      <p className="mt-2 text-xs text-ink-500">Speak or type it below. This is the bit that sticks.</p>
    </div>
  );
}
