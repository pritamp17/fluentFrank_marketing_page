"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface AmbientVideoProps {
  readonly src: string;
  readonly poster: string;
  readonly className?: string;
  /** MIME type of the source (defaults to mp4; pass "video/webm" for .webm). */
  readonly type?: string;
}

/**
 * Decorative looping background video. Falls back to the static poster image
 * when the user prefers reduced motion. The mounted guard keeps SSR and the
 * first client render identical (both render the video) to avoid hydration
 * mismatch, then swaps to the poster after mount if motion is reduced.
 */
export function AmbientVideo({ src, poster, className, type = "video/mp4" }: AmbientVideoProps) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted && reduce) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt="" aria-hidden className={className} />;
  }

  return (
    <video
      className={className}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      aria-hidden
      preload="metadata"
    >
      <source src={src} type={type} />
    </video>
  );
}
