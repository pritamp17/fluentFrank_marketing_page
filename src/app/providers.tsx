"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Theme } from "@/lib/enums";

/** App-wide client providers. next-themes drives the light/dark token swap. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={Theme.Light}
      // Light is the deterministic default on first visit (no OS-driven dark).
      // The manual toggle still switches and persists light/dark per visitor.
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
