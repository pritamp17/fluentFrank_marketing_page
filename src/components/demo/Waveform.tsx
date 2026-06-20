import { cn } from "@/lib/utils";

const BAR_HEIGHTS = [40, 75, 100, 60, 30] as const;

/** Five little bars that pulse while Frank is "listening". Presentational. */
export function Waveform({ active }: { readonly active: boolean }) {
  return (
    <span className="inline-flex h-5 items-end gap-[3px]" aria-hidden>
      {BAR_HEIGHTS.map((height, i) => (
        <span
          key={i}
          className={cn("w-[3px] rounded-full bg-accent", active && "animate-pulse")}
          style={{ height: `${height}%`, animationDelay: `${i * 110}ms`, animationDuration: "900ms" }}
        />
      ))}
    </span>
  );
}
