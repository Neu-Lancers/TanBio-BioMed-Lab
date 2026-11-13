import { useCallback, useEffect, useRef, useState } from "react";

/** Scroll-snap carousel helper: prev/next by one page, jump to item, track the active item. */
export function useCarousel<T extends HTMLElement = HTMLDivElement>() {
  const trackRef = useRef<T>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const ticking = useRef(false);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    let closest = 0;
    let min = Infinity;
    items.forEach((it, i) => {
      const d = Math.abs(it.offsetLeft - el.offsetLeft - el.scrollLeft);
      if (d < min) {
        min = d;
        closest = i;
      }
    });
    setActive(closest);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        measure();
        ticking.current = false;
      });
    };
    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure]);

  const scrollPage = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const step = first ? first.getBoundingClientRect().width + 24 : el.clientWidth;
    const perView = Math.max(1, Math.floor(el.clientWidth / step));
    el.scrollBy({ left: dir * step * perView, behavior: "smooth" });
  }, []);

  const scrollTo = useCallback((i: number) => {
    const el = trackRef.current;
    const item = el?.children[i] as HTMLElement | undefined;
    if (el && item) el.scrollTo({ left: item.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, []);

  return { trackRef, active, canPrev, canNext, scrollPage, scrollTo };
}
