import { BrandMark } from "@/components/brand/BrandMark";
import { cn } from "@/lib/utils";

interface WordmarkProps {
  readonly className?: string;
  readonly markClassName?: string;
}

/** Logo lockup: mark + "FluentFrank". */
export function Wordmark({ className, markClassName }: WordmarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <BrandMark className={cn("h-7 w-7", markClassName)} />
      <span className="font-display text-lg font-semibold tracking-tight text-fg">
        Fluent<span className="text-accent-strong">Frank</span>
      </span>
    </span>
  );
}
