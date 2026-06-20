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
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
