import type { ReactNode } from "react";
import { Lock } from "lucide-react";

import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const APP_HOST = SITE.appUrl.replace(/^https?:\/\//, "");

interface AppWindowProps {
  readonly children: ReactNode;
  /** Render the slim browser-chrome strip (used by the full demo for realism). */
  readonly chrome?: boolean;
  readonly className?: string;
}

/** The app-shell frame: a rounded, hairline-bordered window over the page. */
export function AppWindow({ children, chrome = false, className }: AppWindowProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl border border-ink-800 bg-ink-950 shadow-app-glow",
        className,
      )}
    >
      {chrome ? (
        <div className="flex items-center gap-3 border-b border-ink-800 bg-ink-900/60 px-4 py-2.5">
          <span className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-ink-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-700" />
          </span>
          <span className="mx-auto flex items-center gap-1.5 rounded-md bg-ink-850 px-3 py-1 text-xs text-ink-500">
            <Lock className="h-3 w-3" aria-hidden />
            {APP_HOST}
          </span>
          {/* Spacer to keep the URL pill centered against the traffic lights. */}
          <span className="w-[42px]" aria-hidden />
        </div>
      ) : null}
      {children}
    </div>
  );
}
