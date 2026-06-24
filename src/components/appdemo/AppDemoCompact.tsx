"use client";

import { useEffect } from "react";

import { AppWindow } from "@/components/appdemo/AppWindow";
import { DemoConversation } from "@/components/appdemo/DemoConversation";
import { DemoInputDock } from "@/components/appdemo/DemoInputDock";
import { DemoTopBar } from "@/components/appdemo/DemoTopBar";
import { useDemoAudio } from "@/components/appdemo/useDemoAudio";
import { useDemoMachine } from "@/components/appdemo/useDemoMachine";
import { APP_DEMO_BEATS } from "@/lib/content";
import type { AppDemoBeat } from "@/lib/types";

/**
 * The compact, single-pane app window for the hero (no nav rail / corrections /
 * browser chrome). Same self-playing machine as the full workspace — it just
 * shows the live conversation + voice orb so the hero reads as the real app.
 */
export function AppDemoCompact({ className }: { readonly className?: string }) {
  const beats = APP_DEMO_BEATS;
  const machine = useDemoMachine(beats.length);
  const audio = useDemoAudio();

  useEffect(() => {
    machine.setAudioPlaying(audio.playing);
  }, [audio.playing, machine]);

  const current = beats[machine.beatIndex] ?? beats[0];
  if (!current) return null;

  const onListen = (beat: AppDemoBeat): void => {
    machine.setPlaying(true);
    audio.play(beat);
  };

  return (
    <AppWindow className={className}>
      <div className="flex h-[28rem] min-h-0 flex-col sm:h-[30rem]">
        <DemoTopBar beat={current} />
        <DemoConversation
          shownBeats={[]}
          current={current}
          phase={machine.phase}
          onListen={onListen}
          audioBeatId={audio.playingId}
          highlightedId={null}
          minimal
        />
        <DemoInputDock beat={current} phase={machine.phase} />
      </div>
    </AppWindow>
  );
}
