import type { Config } from "tailwindcss";

/**
 * Single source of truth for design tokens.
 * Every color resolves to a CSS variable (an "R G B" channel triple) defined
 * per theme in `src/app/globals.css` (`:root` = light, `.dark` = dark) and
 * consumed here as `rgb(var(--token) / <alpha-value>)`. Same classes, two
 * themes, zero per-component edits.
 *
 * The `accent` token is THEME-AWARE: green (#16A34A) in light, gold (#C8A24C)
 * in dark — mirroring the two FluentFrank logo marks.
 */
const withAlpha = (variable: string): string => `rgb(var(${variable}) / <alpha-value>)`;

/**
 * App-faithful numeric ramps (ink/gold/sage/amber). Each shade resolves to its
 * own CSS var (`--ink-500`, etc.) defined per theme in globals.css. Additive —
 * the existing semantic tokens (bg/surface/fg/accent) are kept as-is.
 */
const ramp =
  (name: string) =>
  (shades: readonly (string | number)[]): Record<string, string> =>
    Object.fromEntries(shades.map((s) => [s, withAlpha(`--${name}-${s}`)]));

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        bg: withAlpha("--bg"),
        surface: {
          DEFAULT: withAlpha("--surface"),
          2: withAlpha("--surface-2"),
        },
        border: withAlpha("--border"),
        fg: {
          DEFAULT: withAlpha("--fg"),
          muted: withAlpha("--fg-muted"),
          subtle: withAlpha("--fg-subtle"),
        },
        accent: {
          DEFAULT: withAlpha("--accent"),
          strong: withAlpha("--accent-strong"),
          fg: withAlpha("--accent-fg"),
          soft: withAlpha("--accent-soft"),
        },
        // sage/amber/danger keep their existing DEFAULT (+ amber.soft) so current
        // sections using `bg-sage`/`text-amber`/`bg-amber-soft`/`text-danger` are
        // unchanged; the numeric shades add the app ramp for the new demo.
        sage: {
          ...ramp("sage")([50, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
          DEFAULT: withAlpha("--sage"),
        },
        amber: {
          ...ramp("amber")([50, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
          DEFAULT: withAlpha("--amber"),
          soft: withAlpha("--amber-soft"),
        },
        danger: {
          DEFAULT: withAlpha("--danger"),
          300: withAlpha("--danger-300"),
          500: withAlpha("--danger-500"),
        },
        ring: withAlpha("--ring"),

        // App-faithful neutral + accent ramps (used by src/components/appdemo/*).
        ink: ramp("ink")([50, 100, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950]),
        gold: {
          ...ramp("gold")([50, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
          DEFAULT: withAlpha("--gold-500"),
        },
        // Warm onboarding surfaces — same aliases the app uses (card-on-canvas).
        canvas: {
          DEFAULT: withAlpha("--ob-canvas"),
          2: withAlpha("--ob-canvas-2"),
        },
        card: withAlpha("--ob-card"),
        hairline: withAlpha("--ob-hairline"),
      },
      fontFamily: {
        display: ['"Louize"', "Georgia", "Cambria", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(2 12 6 / 0.04), 0 10px 30px -12px rgb(2 12 6 / 0.10)",
        card: "0 1px 3px rgb(2 12 6 / 0.05), 0 18px 40px -20px rgb(22 163 74 / 0.16)",
        glow: "0 0 0 1px rgb(var(--border) / 0.7), 0 28px 70px -28px rgb(22 163 74 / 0.28)",
        // App-faithful accent glows (track the theme-aware gold token). Named
        // `app-glow` so the existing `shadow-glow` above is left intact.
        "app-glow": "0 0 0 1px rgb(var(--gold-500) / 0.25), 0 8px 28px rgb(var(--gold-500) / 0.12)",
        "sage-glow": "0 0 0 1px rgb(var(--sage-500) / 0.30), 0 6px 24px rgb(var(--sage-500) / 0.14)",
        lift: "0 8px 30px rgb(0 0 0 / calc(0.30 * var(--shadow-strength)))",
      },
      keyframes: {
        // App orb/voice motion (additive — marketing keeps its own set below).
        "pulse-ring": {
          "0%": { transform: "scale(0.92)", opacity: "0.7" },
          "70%": { transform: "scale(1.25)", opacity: "0" },
          "100%": { transform: "scale(1.25)", opacity: "0" },
        },
        "wave-bar": {
          "0%, 100%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(1)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        mistDrift: {
          "0%": { transform: "translate3d(0,0,0) scale(1)", opacity: "0.7" },
          "100%": { transform: "translate3d(2%,-3%,0) scale(1.08)", opacity: "1" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        barIn: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        fadeRise: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        mist: "mistDrift 16s ease-in-out infinite alternate",
        blink: "blink 1.1s steps(2, start) infinite",
        shimmer: "shimmer 2s linear infinite",
        fadeRise: "fadeRise 0.5s ease-out",
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.4,0,0.6,1) infinite",
        "wave-bar": "wave-bar 1s ease-in-out infinite",
        "fade-up": "fade-up 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
