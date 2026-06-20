import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/** Small uppercase label that sits above section titles. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-strong",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      {children}
    </span>
  );
}
