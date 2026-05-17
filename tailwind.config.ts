import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // VOLT design tokens — CSS-var-driven so admin theming works
        bg:          "rgb(var(--bg)          / <alpha-value>)",
        surface:     "rgb(var(--surface)     / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2)   / <alpha-value>)",
        line:        "rgb(var(--line)        / <alpha-value>)",
        "line-2":    "rgb(var(--line-2)      / <alpha-value>)",
        text:        "rgb(var(--text)        / <alpha-value>)",
        body:        "rgb(var(--body)        / <alpha-value>)",
        muted:       "rgb(var(--muted)       / <alpha-value>)",
        quiet:       "rgb(var(--quiet)       / <alpha-value>)",
        accent:      "rgb(var(--accent)      / <alpha-value>)",
        // shadcn aliases — wired to VOLT CSS vars
        border:      "rgb(var(--line)        / <alpha-value>)",
        input:       "rgb(var(--line)        / <alpha-value>)",
        ring:        "rgb(var(--accent)      / <alpha-value>)",
        background:  "rgb(var(--bg)          / <alpha-value>)",
        foreground:  "rgb(var(--text)        / <alpha-value>)",
        primary: {
          DEFAULT:    "rgb(var(--accent)     / <alpha-value>)",
          foreground: "rgb(var(--bg)         / <alpha-value>)",
        },
        secondary: {
          DEFAULT:    "rgb(var(--surface-2)  / <alpha-value>)",
          foreground: "rgb(var(--text)       / <alpha-value>)",
        },
        destructive: { DEFAULT: "#C84D2C", foreground: "#FAFAFA" },
        card: {
          DEFAULT:    "rgb(var(--surface)    / <alpha-value>)",
          foreground: "rgb(var(--text)       / <alpha-value>)",
        },
        popover: {
          DEFAULT:    "rgb(var(--surface)    / <alpha-value>)",
          foreground: "rgb(var(--text)       / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter-tight)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        // tighter scale, display-led
        "display-xl": ["clamp(64px, 11vw, 168px)", { lineHeight: "0.92", letterSpacing: "-0.055em" }],
        "display-lg": ["clamp(40px, 5vw, 72px)", { lineHeight: "1", letterSpacing: "-0.045em" }],
        "display-md": ["clamp(32px, 4.5vw, 56px)", { lineHeight: "1", letterSpacing: "-0.04em" }],
      },
      letterSpacing: {
        tightest: "-0.06em",
        tighter: "-0.04em",
      },
      borderRadius: {
        lg: "4px",
        md: "3px",
        sm: "2px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.65, 0, 0.35, 1) both",
        "fade-in": "fade-in 0.5s cubic-bezier(0.65, 0, 0.35, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
