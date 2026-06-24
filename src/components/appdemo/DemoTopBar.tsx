import { ChevronDown, Globe, Moon } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import type { AppDemoBeat } from "@/lib/types";

/** The conversation header: Frank lockup + language pill + End session. */
export function DemoTopBar({ beat }: { readonly beat: AppDemoBeat }) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-ink-800 px-4 py-3 sm:px-5">
      <span className="flex shrink-0 items-center gap-2">
        <BrandMark className="h-6 w-6" />
        <span className="font-display text-base font-semibold tracking-tight text-fg">Frank</span>
      </span>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-ink-800 bg-ink-900/60 px-3 py-1.5 text-sm text-ink-200 shadow-soft">
          <Globe className="h-3.5 w-3.5 shrink-0 text-gold-300" aria-hidden />
          <span className="font-medium text-ink-100">
            {beat.flag} {beat.l2Label}
          </span>
          <span className="hidden text-ink-400 sm:inline">· in {beat.l1Label}</span>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-ink-400" aria-hidden />
        </span>

        <span className="hidden h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-400 sm:grid" aria-hidden>
          <Moon className="h-4 w-4" />
        </span>

        <span className="shrink-0 whitespace-nowrap rounded-lg border border-ink-700 px-3 py-1.5 text-sm font-medium text-ink-200">
          End session
        </span>
      </div>
    </header>
  );
}
