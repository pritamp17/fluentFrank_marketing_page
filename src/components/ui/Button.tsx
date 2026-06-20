import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
  readonly newTab?: boolean;
  readonly iconRight?: ReactNode;
  readonly iconLeft?: ReactNode;
  readonly ariaLabel?: string;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg shadow-soft hover:brightness-[1.06] hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "border border-border bg-surface text-fg hover:border-accent/40 hover:bg-surface-2 hover:-translate-y-0.5",
  ghost: "text-fg-muted hover:text-fg hover:bg-surface-2",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-[3.25rem] px-7 text-base gap-2.5",
};

/**
 * All CTAs on the page are links (to the app or to in-page anchors), so the
 * button renders as an `<a>`. Touch target ≥ 44px at md/lg.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  newTab = false,
  iconRight,
  iconLeft,
  ariaLabel,
}: ButtonLinkProps) {
  const external = newTab;
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex select-none items-center justify-center rounded-full font-semibold transition-all duration-200 will-change-transform focus-visible:outline-none",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
    >
      {iconLeft}
      {children}
      {iconRight}
    </a>
  );
}
