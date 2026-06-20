import { Sparkles } from "lucide-react";

import type { LanguageInfo } from "@/lib/languages";
import { cn } from "@/lib/utils";

/**
 * One language in the roster. Presentational + server-rendered. Leads with the
 * endonym (set in its own script/direction), then the English name, a native
 * greeting, and a one-line reason it's on the list. The flagship gets a ring.
 */
export function LanguageChip({ language }: { readonly language: LanguageInfo }) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border bg-surface/80 p-5 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-card",
        language.flagship ? "border-accent/40 ring-1 ring-accent/25" : "border-border hover:border-accent/40",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-mist opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      {language.flagship ? (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[0.65rem] font-semibold text-accent-strong">
          <Sparkles className="h-3 w-3" aria-hidden /> Flagship
        </span>
      ) : null}

      <div
        className="font-display text-2xl font-semibold leading-none text-fg"
        dir={language.rtl ? "rtl" : undefined}
        lang={language.id}
      >
        {language.nativeName}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-fg">{language.name}</span>
        <span
          className="font-display text-sm italic text-accent-strong"
          dir={language.rtl ? "rtl" : undefined}
          aria-hidden
        >
          {language.greeting}
        </span>
      </div>

      <p className="mt-auto text-xs leading-snug text-fg-subtle">{language.note}</p>
    </div>
  );
}
