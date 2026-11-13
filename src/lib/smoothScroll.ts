import Lenis from "lenis";

let lenis: Lenis | null = null;

/** Start inertia ("buttery") page scrolling once. Skipped for reduced-motion users and touch devices keep native momentum. */
export function initSmoothScroll(): () => void {
  if (typeof window === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  if (lenis) return () => {};

  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.95,
    anchors: false,
  });
  document.documentElement.classList.add("lenis");

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
    document.documentElement.classList.remove("lenis");
  };
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
