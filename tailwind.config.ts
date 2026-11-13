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
      },
      animation: {
        "fade-up": "fade-up .7s cubic-bezier(.22,1,.36,1) both",
        "slide-left": "slide-left .8s cubic-bezier(.22,1,.36,1) both",
        "slide-right": "slide-right .9s cubic-bezier(.22,1,.36,1) both",
        "page-in": "page-in .35s ease both",
      },
    },
  },
  plugins: [],
} satisfies Config;
