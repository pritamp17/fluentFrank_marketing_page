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
        sage: withAlpha("--sage"),
        amber: {
          DEFAULT: withAlpha("--amber"),
          soft: withAlpha("--amber-soft"),
        },
        danger: withAlpha("--danger"),
        ring: withAlpha("--ring"),
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "Cambria", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(2 12 6 / 0.04), 0 10px 30px -12px rgb(2 12 6 / 0.10)",
        card: "0 1px 3px rgb(2 12 6 / 0.05), 0 18px 40px -20px rgb(22 163 74 / 0.16)",
        glow: "0 0 0 1px rgb(var(--border) / 0.7), 0 28px 70px -28px rgb(22 163 74 / 0.28)",
      },
      keyframes: {
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
      },
    },
  },
  plugins: [],
};

export default config;
