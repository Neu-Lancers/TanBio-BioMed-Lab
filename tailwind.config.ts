import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1440px", "3xl": "1760px" },
    },
    screens: {
      xs: "480px", sm: "640px", md: "768px", lg: "1024px", xl: "1280px",
      "2xl": "1536px", "3xl": "1920px", "4xl": "2560px",
    },
    extend: {
      colors: {
        navy: { DEFAULT: "#0B1633", dark: "#070E22", deep: "#060B1A" },
        brand: { DEFAULT: "#0A36C8", dark: "#072A9E", light: "#3B63E6" },
        sky: { DEFAULT: "#1BA8E8", soft: "#EEF3FF" },
        cyan: { glow: "#34E3F0" },
        ink: "#0B1633",
        muted: "#55607A",
        line: "#E3E9F5",
      },
      /* Standard type scale — use these instead of arbitrary text-[…] sizes */
      fontSize: {
        display: ["clamp(2.25rem, 1.4rem + 2.6vw, 3.75rem)", { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "800" }],
        h2: ["clamp(1.65rem, 1.1rem + 1.9vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "800" }],
        h3: ["clamp(1.15rem, 1rem + 0.55vw, 1.5rem)", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "700" }],
        h4: ["1.0625rem", { lineHeight: "1.35", fontWeight: "700" }],
        lead: ["clamp(1.1rem, 1rem + 0.45vw, 1.4rem)", { lineHeight: "1.65" }],
        body: ["1rem", { lineHeight: "1.7" }],
        small: ["0.875rem", { lineHeight: "1.6" }],
        caption: ["0.75rem", { lineHeight: "1.5" }],
        btn: ["0.95rem", { lineHeight: "1", fontWeight: "600" }],
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        card: "0 18px 40px -22px rgba(10,54,200,.22), 0 2px 6px rgba(11,22,51,.04)",
        lift: "0 30px 60px -24px rgba(10,54,200,.38)",
        glow: "0 0 0 1px rgba(52,227,240,.9), 0 12px 30px -12px rgba(52,227,240,.55)",
      },
      transitionTimingFunction: { out: "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translate3d(0,24px,0)" }, to: { opacity: "1", transform: "none" } },
        "slide-left": { from: { opacity: "0", transform: "translate3d(-40px,0,0)" }, to: { opacity: "1", transform: "none" } },
        "slide-right": { from: { opacity: "0", transform: "translate3d(48px,0,0)" }, to: { opacity: "1", transform: "none" } },
        "page-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "ft-flip": { "0%,38%": { transform: "rotateX(0deg)" }, "50%,88%": { transform: "rotateX(-180deg)" }, "100%": { transform: "rotateX(-360deg)" } },
        "nl-shimmer": { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
        "nl-bolt": { "0%,100%": { opacity: "1" }, "50%": { opacity: ".65" } },
      },
      animation: {
        "fade-up": "fade-up .7s cubic-bezier(.22,1,.36,1) both",
        "slide-left": "slide-left .8s cubic-bezier(.22,1,.36,1) both",
        "slide-right": "slide-right .9s cubic-bezier(.22,1,.36,1) both",
        "page-in": "page-in .35s ease both",
        "ft-flip": "ft-flip 8s ease-in-out infinite",
        "nl-shimmer": "nl-shimmer 2.8s linear infinite",
        "nl-bolt": "nl-bolt 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
