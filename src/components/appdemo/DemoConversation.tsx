"use client";

import { useEffect, useRef } from "react";
import { Brain } from "lucide-react";

import { DemoConversationTurn } from "@/components/appdemo/DemoConversationTurn";
import { DemoSayItBack } from "@/components/appdemo/DemoSayItBack";
import { DemoListeningPill, DemoProcessingPill } from "@/components/appdemo/DemoThinking";
import { DemoPhase, DemoRole } from "@/lib/enums";
import type { AppDemoBeat } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ConversationProps {
  /** Earlier beats in this cycle, already fully revealed (oldest first). */
  readonly shownBeats: readonly AppDemoBeat[];
  readonly current: AppDemoBeat;
  readonly phase: DemoPhase;
  readonly onListen: (beat: AppDemoBeat) => void;
  /** Which beat's "Hear it" audio is currently playing (animates the icon). */
  readonly audioBeatId: string | null;
  readonly highlightedId: string | null;
  /** Hero/compact mode: hide the say-it-back card + memory note to stay tidy. */
  readonly minimal?: boolean;
  readonly className?: string;
}

/** The scrollable transcript pane (center of the workspace). */
export function DemoConversation({
  shownBeats,
  current,
  phase,
  onListen,
  audioBeatId,
  highlightedId,
  minimal,
  className,
}: ConversationProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the latest turn in view as the demo plays.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [current.id, phase]);

  const revealed = phase === DemoPhase.Revealed;

  return (
    <div ref={scrollRef} className={cn("flex-1 space-y-4 overflow-y-auto px-5 py-6", className)}>
      {shownBeats.map((beat) => (
        <BeatTurns
          key={beat.id}
          beat={beat}
          onListen={onListen}
          audioBeatId={audioBeatId}
          highlightedId={highlightedId}
        />
      ))}

      {/* Current beat */}
      <DemoConversationTurn
        role={DemoRole.Learner}
        text={current.learnerText}
        highlighted={highlightedId === current.id}
      />

      <div className="flex w-full flex-col gap-3">
        {phase === DemoPhase.Listening ? <DemoListeningPill /> : null}
        {phase === DemoPhase.Processing ? <DemoProcessingPill /> : null}

        {revealed ? (
          <div key={current.id} className="flex animate-fade-up flex-col gap-3">
            <DemoConversationTurn
              role={DemoRole.Coach}
              text={current.coachText}
              gloss={current.gloss}
              display
              tools
              onListen={() => onListen(current)}
              listening={audioBeatId === current.id}
              highlighted={highlightedId === current.id}
            />
            {!minimal ? (
              <>
                <DemoSayItBack
                  beat={current}
                  onListen={() => onListen(current)}
                  listening={audioBeatId === current.id}
                />
                <p className="inline-flex items-center gap-1.5 self-start rounded-full bg-ink-800 px-3 py-1.5 text-xs text-ink-400">
                  <Brain className="h-3.5 w-3.5 text-gold-300" aria-hidden />
                  {current.memoryNote}
                </p>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function BeatTurns({
  beat,
  onListen,
  audioBeatId,
  highlightedId,
}: {
  readonly beat: AppDemoBeat;
  readonly onListen: (beat: AppDemoBeat) => void;
  readonly audioBeatId: string | null;
  readonly highlightedId: string | null;
}) {
  return (
    <>
      <DemoConversationTurn role={DemoRole.Learner} text={beat.learnerText} highlighted={highlightedId === beat.id} />
      <DemoConversationTurn
        role={DemoRole.Coach}
        text={beat.coachText}
        gloss={beat.gloss}
        display
        tools
        onListen={() => onListen(beat)}
        listening={audioBeatId === beat.id}
        highlighted={highlightedId === beat.id}
      />
    </>
  );
}
