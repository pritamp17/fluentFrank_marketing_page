"use client";

import { useEffect, useRef, useState } from "react";

import type { AppDemoBeat } from "@/lib/types";

export interface DemoAudio {
  readonly playing: boolean;
  /** Id of the beat currently playing (drives the bubble's speaker animation). */
  readonly playingId: string | null;
  /** Play the beat's coach phrase: a real clip when present, else browser TTS. */
  readonly play: (beat: AppDemoBeat) => void;
  readonly stop: () => void;
}

const hasSpeech = (): boolean =>
  typeof window !== "undefined" && "speechSynthesis" in window;

/**
 * "Hear it" playback for the demo. Uses the real TTS clip when a beat has one
 * (Spanish), otherwise falls back to the browser's speech synthesis in the
 * beat's locale (fr-FR / hi-IN). Purely cosmetic; never records.
 */
export function useDemoAudio(): DemoAudio {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const end = (): void => {
    setPlaying(false);
    setPlayingId(null);
  };

  const stop = (): void => {
    audioRef.current?.pause();
    if (hasSpeech()) window.speechSynthesis.cancel();
    end();
  };

  // Clean up any audio/speech on unmount (refs + module fn only — no deps).
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (hasSpeech()) window.speechSynthesis.cancel();
    };
  }, []);

  const speak = (beat: AppDemoBeat): void => {
    if (!hasSpeech()) {
      end();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(beat.coachText);
    utterance.lang = beat.locale;
    utterance.rate = 0.92;
    utterance.addEventListener("end", end);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const play = (beat: AppDemoBeat): void => {
    if (typeof window === "undefined") return;
    stop();
    setPlaying(true);
    setPlayingId(beat.id);

    if (beat.audioSrc) {
      const audio = new Audio(beat.audioSrc);
      audioRef.current = audio;
      audio.addEventListener("ended", end);
      void audio.play().catch(() => {
        // Clip failed to load → fall back to the browser voice.
        speak(beat);
      });
      return;
    }
    speak(beat);
  };

  return { playing, playingId, play, stop };
}
