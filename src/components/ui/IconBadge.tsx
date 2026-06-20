import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconBadgeProps {
  readonly icon: LucideIcon;
  readonly className?: string;
}

/** Rounded square holding a feature/step icon, tinted with the accent-soft wash. */
export function IconBadge({ icon: Icon, className }: IconBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-strong",
        className,
      )}
    >
      <Icon className="h-5 w-5" aria-hidden />
    </span>
  );
}
