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
        navy: { DEFAULT: "#2C587D", dark: "#1e3f5a", deep: "#0d1f30" },
        brand: { DEFAULT: "#0A4D9C", dark: "#083b78" },
        sky: { DEFAULT: "#25B5E9", soft: "#EAF6FF" },
        ink: "#1a1a2e",
        muted: "#5a7090",
        line: "#E6EDF7",
      },
      fontFamily: { sans: ["Poppins", "system-ui", "sans-serif"] },
      boxShadow: {
        card: "0 10px 30px -12px rgba(12,59,120,.18)",
        lift: "0 22px 45px -18px rgba(12,59,120,.35)",
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
