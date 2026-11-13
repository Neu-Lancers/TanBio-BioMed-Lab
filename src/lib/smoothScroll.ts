import Lenis from "lenis";

let lenis: Lenis | null = null;
let users = 0; // initSmoothScroll() callers (React StrictMode mounts twice)

type Sub = (scrollY: number) => void;
const subs = new Set<Sub>();
let raf = 0;

/**
 * The ONE animation-frame loop for scrolling. Each frame:
 *   1. Lenis advances its inertia and writes window scroll
 *   2. subscribers run synchronously with the SAME scroll position the browser
 *      will paint (so sticky stages and scroll-driven transforms never desync)
 * Started lazily, stopped when nothing needs it.
 */
function tick(time: number) {
  lenis?.raf(time);
  if (subs.size) {
    const y = window.scrollY;
    subs.forEach((cb) => cb(y));
  }
  raf = lenis || subs.size ? requestAnimationFrame(tick) : 0;
}
function ensureLoop() {
  if (!raf && (lenis || subs.size)) raf = requestAnimationFrame(tick);
}

/** Run `cb(scrollY)` every frame, in lockstep with Lenis. Keep callbacks cheap (math + direct style writes only). */
export function subscribeScroll(cb: Sub): () => void {
  subs.add(cb);
  ensureLoop();
  cb(window.scrollY);
  return () => {
    subs.delete(cb);
  };
}

/**
 * Start the ONE page-wide smooth scroller (Lenis, lerp mode). Wheel/trackpad get inertia;
 * touch keeps native momentum (syncTouch off). Skipped for reduced-motion users.
 * Safe to call repeatedly / under StrictMode — reference counted.
 */
export function initSmoothScroll(): () => void {
  if (typeof window === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  users++;
  if (!lenis) {
    lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
      anchors: false,
    });
    document.documentElement.classList.add("lenis", "lenis-smooth");
    ensureLoop();
  }

  let released = false;
  return () => {
    if (released) return;
    released = true;
    users--;
    if (users <= 0 && lenis) {
      lenis.destroy();
      lenis = null;
      users = 0;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    }
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
