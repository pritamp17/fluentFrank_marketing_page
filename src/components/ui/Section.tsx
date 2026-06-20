import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  readonly id?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

/** Vertical rhythm wrapper. `scroll-mt` keeps anchored sections clear of the sticky nav. */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}
