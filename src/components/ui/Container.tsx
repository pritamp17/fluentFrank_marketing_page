import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  readonly className?: string;
  readonly children: ReactNode;
}

/** Centered max-width content wrapper with responsive horizontal padding. */
export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
