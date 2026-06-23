import { cn } from "@/lib/utils";

interface BrandMarkProps {
  readonly className?: string;
  readonly title?: string;
}

/**
 * The FluentFrank mark: a speech bubble with a check.
 * Bubble fills with the theme-aware `accent` (green in light, gold in dark);
 * the check is knocked out in the page background color, so it matches the
 * official light/dark logo variants automatically.
 */
export function BrandMark({ className, title = "FluentFrank" }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={title}
      className={cn("h-8 w-8", className)}
    >
      <g className="fill-accent">
        <path d="M34 80 L25 106 L60 87 Z" />
        <rect x="14" y="16" width="92" height="74" rx="24" />
      </g>
      <path
        d="M42 54 L56 68 L86 34"
        fill="none"
        className="stroke-bg"
        strokeWidth={13}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
