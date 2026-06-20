import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  readonly className?: string;
  readonly children: ReactNode;
}

/** Base surface card used across sections. */
export function Card({ className, children }: CardProps) {
  return (
    <div className={cn("rounded-2xl border border-border bg-surface p-6 shadow-soft", className)}>
      {children}
    </div>
  );
}
