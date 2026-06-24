"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";

import { AppWindow } from "@/components/appdemo/AppWindow";
import { DemoConversation } from "@/components/appdemo/DemoConversation";
import { DemoCorrectionsPanel } from "@/components/appdemo/DemoCorrectionsPanel";
import { DemoInputDock } from "@/components/appdemo/DemoInputDock";
import { DemoNavRail } from "@/components/appdemo/DemoNavRail";
import { DemoTopBar } from "@/components/appdemo/DemoTopBar";
import { useDemoAudio } from "@/components/appdemo/useDemoAudio";
import { useDemoMachine } from "@/components/appdemo/useDemoMachine";
import { APP_DEMO_BEATS } from "@/lib/content";
import { DemoPhase } from "@/lib/enums";
import type { AppDemoBeat } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * The full three-pane Practice workspace (NavRail · conversation · Corrections),
 * driven by the self-playing machine. This is the "screenshot of the real app"
 * shown in the Demo section. Collapses to a single chat column < lg.
 */
export function AppDemoWorkspace({ className }: { readonly className?: string }) {
  const beats = APP_DEMO_BEATS;
  const machine = useDemoMachine(beats.length);
  const audio = useDemoAudio();
  const [activeId, setActiveId] = useState<string | null>(null);

  // Hold the loop while a "Hear it" clip plays.
  useEffect(() => {
    machine.setAudioPlaying(audio.playing);
  }, [audio.playing, machine]);

  const current = beats[machine.beatIndex] ?? beats[0];
  if (!current) return null;

  // Each beat is a self-contained vignette: the top bar, conversation, and
  // Corrections panel all reflect the one current beat (its language too), so
  // nothing ever desyncs as the demo cycles Spanish → French → Hindi.
  const revealedBeats = machine.phase === DemoPhase.Revealed ? [current] : [];

  const onListen = (beat: AppDemoBeat): void => {
    machine.setPlaying(true);
    audio.play(beat);
  };

  return (
    <div className={cn("w-full", className)}>
      <AppWindow chrome>
        <div className="flex h-[34rem] min-h-0 flex-col lg:h-[40rem] lg:flex-row">
          <DemoNavRail />
          <div className="flex min-h-0 flex-1 flex-col">
            <DemoTopBar beat={current} />
            <DemoConversation
              shownBeats={[]}
              current={current}
              phase={machine.phase}
              onListen={onListen}
              audioBeatId={audio.playingId}
              highlightedId={activeId}
            />
            <DemoInputDock beat={current} phase={machine.phase} />
          </div>
          <DemoCorrectionsPanel beats={revealedBeats} activeId={activeId} onSelect={setActiveId} />
        </div>
      </AppWindow>

      {/* Playback controls (scrub between examples, pause the loop). */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1.5">
          {beats.map((beat, i) => (
            <button
              key={beat.id}
              type="button"
              aria-label={`Show example ${i + 1}: ${beat.l2Label}`}
              aria-current={i === machine.beatIndex ? true : undefined}
              onClick={() => machine.jumpTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === machine.beatIndex ? "w-6 bg-accent" : "w-2.5 bg-border hover:bg-fg-subtle",
              )}
            />
          ))}
          <span className="ml-2 hidden text-xs text-fg-subtle sm:inline">Real corrections, on a loop</span>
        </div>

        {!machine.reduce ? (
          <button
            type="button"
            onClick={() => machine.setPlaying((value) => !value)}
            aria-label={machine.playing ? "Pause demo" : "Play demo"}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-fg-muted transition-colors hover:text-fg"
          >
            {machine.playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {machine.playing ? "Pause" : "Play"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
