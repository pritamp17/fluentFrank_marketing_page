import { TypingDots } from "@/components/demo/TypingDots";
import { Waveform } from "@/components/demo/Waveform";

/** Coach "listening…" pill, shown while the learner is speaking. */
export function DemoListeningPill() {
  return (
    <div className="inline-flex items-center gap-2.5 self-start rounded-2xl bg-ink-800 px-4 py-2.5 text-sm text-ink-400">
      <Waveform active />
      Listening…
    </div>
  );
}

/** Coach "checking it the honest way…" pill, shown during the correction check. */
export function DemoProcessingPill() {
  return (
    <div className="inline-flex items-center gap-2 self-start rounded-2xl bg-ink-800 px-4 py-2.5 text-sm text-ink-400">
      <TypingDots />
      Checking it the honest way…
    </div>
  );
}
