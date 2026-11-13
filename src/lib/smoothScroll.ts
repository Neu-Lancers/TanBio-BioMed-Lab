import Lenis from "lenis";

let lenis: Lenis | null = null;

/**
 * Start the ONE page-wide smooth scroller (Lenis). Wheel/trackpad get inertia;
 * touch keeps native momentum (syncTouch off). Skipped for reduced-motion users.
 */
export function initSmoothScroll(): () => void {
  if (typeof window === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  if (lenis) return () => {};

  lenis = new Lenis({
    duration: 1.2,
    // expo-out: fast response, long soft landing
    easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1,
    syncTouch: false,
    anchors: false,
  });
  document.documentElement.classList.add("lenis", "lenis-smooth");

  let raf = 0;
  const loop = (time: number) => {
    lenis?.raf(time);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
    document.documentElement.classList.remove("lenis", "lenis-smooth");
  };
}

export function isSmoothScrollActive(): boolean {
  return lenis !== null;
}

/** Current scroll position (Lenis-animated value when active, else window.scrollY). */
export function getScroll(): number {
  return lenis ? lenis.scroll : window.scrollY;
}

function navOffset(): number {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"));
  return -(Number.isFinite(v) ? v : 72) - 8;
}

/** Smoothly scroll to an element (works with or without Lenis). */
export function scrollToElement(el: Element) {
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: navOffset(), duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
}
