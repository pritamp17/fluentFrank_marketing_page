import { Brain, Volume2 } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { CorrectionCard } from "@/components/demo/CorrectionCard";
import { DEMO_EXCHANGES } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Static, server-rendered snapshot of the product for the hero — shows a real
 * exchange + correction card so the value is legible instantly (the live,
 * interactive version lives in the "Try it" section).
 */
export function HeroPreview({ className }: { readonly className?: string }) {
  const sample = DEMO_EXCHANGES[1] ?? DEMO_EXCHANGES[0];
  if (!sample) return null;

  return (
    <div
      className={cn(
        "flex w-full max-w-md flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface-2/60 shadow-glow backdrop-blur",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border bg-surface/80 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="relative inline-flex">
            <BrandMark className="h-7 w-7" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-sage" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-fg">Frank</p>
            <p className="text-[0.7rem] text-fg-subtle">Your language coach</p>
          </div>
        </div>
        <span className="rounded-full border border-border px-2.5 py-1 text-[0.7rem] font-medium text-fg-subtle">
          Say it in your language
        </span>
      </div>

      <div className="flex flex-col gap-3 px-4 py-4">
        <div className="flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-tr-sm bg-accent px-3.5 py-2.5 text-sm font-medium text-accent-fg">
            {sample.english}
          </p>
        </div>

        <div className="flex items-start gap-2.5">
          <BrandMark className="mt-0.5 h-6 w-6 shrink-0" />
          <div className="flex w-full flex-col gap-3">
            <div className="rounded-2xl rounded-tl-sm bg-surface px-3.5 py-3">
              <p className="font-display text-lg font-semibold leading-snug text-fg">
                {sample.spanish}
              </p>
              <p className="mt-1 text-xs text-fg-subtle">{sample.gloss}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent-strong">
                <Volume2 className="h-3.5 w-3.5" />
                Frank reads it aloud
              </span>
            </div>

            <CorrectionCard correction={sample.correction} />

            <p className="inline-flex items-center gap-1.5 self-start rounded-full bg-surface px-3 py-1.5 text-xs text-fg-muted">
              <Brain className="h-3.5 w-3.5 text-accent" />
              {sample.memoryNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
