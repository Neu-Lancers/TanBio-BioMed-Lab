import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import bgPattern from "@/assets/images/home-pattern1.webp";
import { SERVICES } from "@/data/services";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import ServiceRectCard from "./ServiceRectCard";

const GAP = 24; // px between cards (gap-6)

/** Cards visible at once: 2.5 on desktop, 1.5 on tablet, ~1.1 on phones. */
function visibleCards(w: number) {
  if (w >= 1024) return 2.5;
  if (w >= 640) return 1.5;
  return 1.1;
}

const navHeight = () =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 72;

export default function ServicesShowcase() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null); // scroll runway
  const stageRef = useRef<HTMLDivElement>(null); // sticky stage (heading + cards)
  const viewportRef = useRef<HTMLDivElement>(null); // clips the track
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [cardW, setCardW] = useState(420);
  const [travel, setTravel] = useState(0); // px of horizontal travel
  const [stageH, setStageH] = useState(0); // px height of the pinned stage
  const [pinTop, setPinTop] = useState(72); // px from viewport top where the stage pins

  // geometry lives in a ref: no React re-renders while scrolling
  const state = useRef({ max: 0, raf: 0, cardW: 420, left: 0, vw: 1, pin: 72 });

  /* ── measure: card width, horizontal travel, stage height, pin offset ── */
  const measure = useCallback(() => {
    const vp = viewportRef.current;
    const stage = stageRef.current;
    if (!vp || !stage) return;
    const cs = getComputedStyle(vp);
    const padL = parseFloat(cs.paddingLeft);
    const inner = vp.clientWidth - padL - parseFloat(cs.paddingRight);
    const n = visibleCards(window.innerWidth);
    // n cards + floor(n) gaps fill the visible width exactly → the next card peeks in
    const w = Math.max(260, (inner - GAP * Math.floor(n)) / n);
    const t = Math.max(0, SERVICES.length * w + GAP * (SERVICES.length - 1) - inner);
    const h = stage.offsetHeight;
    // centre the stage vertically in the viewport, but never under the navbar
    const pin = Math.max(navHeight(), Math.round((window.innerHeight - h) / 2));
    const s = state.current;
    s.max = t;
    s.cardW = w;
    s.left = vp.getBoundingClientRect().left + padL;
    s.vw = window.innerWidth;
    s.pin = pin;
    setCardW(w);
    setTravel(t);
    setStageH(h);
    setPinTop(pin);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /* ── scroll → progress → transform. No extra lerp: Lenis already smooths the scroll ── */
  useEffect(() => {
    if (reduced) return;
    const s = state.current;

    const frame = () => {
      s.raf = 0;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const start = wrap.getBoundingClientRect().top + window.scrollY - s.pin;
      const p = Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, s.max)));
      const x = p * s.max;
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${-x}px,0,0)`;

      // subtle depth: cards ease down in scale/opacity towards the edges (pure style writes)
      const mid = s.vw / 2;
      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const centre = s.left + i * (s.cardW + GAP) + s.cardW / 2 - x;
        const d = Math.min(1, Math.abs(centre - mid) / s.vw);
        el.style.transform = `scale(${(1 - d * 0.06).toFixed(4)})`;
        el.style.opacity = (1 - d * 0.28).toFixed(3);
      }
    };
    const kick = () => {
      if (!s.raf) s.raf = requestAnimationFrame(frame);
    };

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
  }, [reduced, travel, cardW, pinTop]);

  /* ── keyboard: focusing an off-screen card scrolls the page so it comes into view ─ */
  const revealCard = (index: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const s = state.current;
    const start = wrap.getBoundingClientRect().top + window.scrollY - s.pin;
    const x = Math.min(s.max, index * (s.cardW + GAP));
    window.scrollTo({ top: start + x, behavior: "instant" as ScrollBehavior });
  };

  /* soft photo/pattern backdrop with a white→blue wash so the white cards pop */
  const backdrop = (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <img src={bgPattern} alt="" width={1600} height={900} loading="lazy" decoding="async" className="h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-sky-soft/70 to-brand/10" />
    </div>
  );

  const heading = (
    <SectionHeading
      eyebrow="Our Services"
      title="Comprehensive Diagnostic"
      highlight="Solutions"
      description="Seven specialised departments under one roof — keep scrolling to explore them all."
    />
  );

  /* ── reduced motion: plain native snap row, no pinning ───────────────── */
  if (reduced) {
    return (
      <section id="services" className="section relative isolate bg-sky-soft" aria-labelledby="services-title">
        {backdrop}
        <div className="container" id="services-title">
          {heading}
        </div>
        <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 sm:px-8">
          {SERVICES.map((svc) => (
            <div key={svc.id} className="w-[88%] shrink-0 snap-start sm:h-[320px] sm:w-[62%] lg:w-[40%]">
              <ServiceRectCard svc={svc} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="services" aria-labelledby="services-title" className="relative isolate bg-sky-soft">
      {backdrop}
      {/* runway: stage height + horizontal travel = exactly the scroll distance that drives the track */}
      <div ref={wrapRef} style={{ height: stageH + travel }} className="relative">
        <div ref={stageRef} style={{ top: pinTop }} className="sticky flex flex-col gap-6 py-8 md:gap-8 md:py-10 3xl:gap-12">
          <div className="container" id="services-title">
            {heading}
          </div>

          <div
            ref={viewportRef}
            className="container w-full overflow-hidden py-3"
            role="region"
            aria-roledescription="carousel"
            aria-label="Diagnostic services"
            onScroll={(e) => {
              // a focused card must never scroll the clipped viewport itself — the page scroll drives the track
              e.currentTarget.scrollLeft = 0;
            }}
          >
            <div ref={trackRef} className="flex items-stretch will-change-transform" style={{ gap: GAP, transform: "translate3d(0,0,0)" }}>
              {SERVICES.map((svc, i) => (
                <div
                  key={svc.id}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  onFocusCapture={() => revealCard(i)}
                  style={{ width: cardW }}
                  className="shrink-0 origin-center will-change-[transform,opacity] sm:h-[320px] 3xl:h-[360px]"
                >
                  <ServiceRectCard svc={svc} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
