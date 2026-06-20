import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface SectionHeadingProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly align?: "left" | "center";
  readonly className?: string;
}

/** Eyebrow + title + optional subtitle, used to open most sections. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-[2.85rem]",
          centered && "mx-auto",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg",
            centered && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
