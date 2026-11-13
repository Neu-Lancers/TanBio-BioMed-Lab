import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import bgPattern from "@/assets/images/home-pattern1.webp";
import { SERVICES } from "@/data/services";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { subscribeScroll } from "@/lib/smoothScroll";
import ServiceRectCard from "./ServiceRectCard";

const GAP = 24; // px between cards (gap-6)
const SPEED = 1.3; // the track moves 1.3px for every 1px scrolled → shorter runway, never feels trapped

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

  const [cardW, setCardW] = useState(420);
  const [travel, setTravel] = useState(0); // px of horizontal travel
  const [stageH, setStageH] = useState(0); // px height of the pinned stage
  const [pinTop, setPinTop] = useState(72); // px from viewport top where the stage pins

  // geometry lives in a ref: no React re-renders while scrolling
  // (start = document-top scroll position where the stage begins pinning; cached so the frame path never reads layout)
  const state = useRef({ max: 0, cardW: 420, pin: 72, start: 0, lastX: NaN });

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
    const runway = t / SPEED;
    const h = stage.offsetHeight;
    // centre the stage vertically in the viewport, but never under the navbar
    const pin = Math.max(navHeight(), Math.round((window.innerHeight - h) / 2));
    const s = state.current;
    s.max = t;
    s.cardW = w;
    s.pin = pin;
    const wrap = wrapRef.current;
    if (wrap) s.start = wrap.getBoundingClientRect().top + window.scrollY - pin;
    s.lastX = NaN;
    setCardW(w);
    setTravel(runway);
    setStageH(h);
    setPinTop(pin);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (stageRef.current) ro.observe(stageRef.current);
    ro.observe(document.body); // page height changes (images/fonts loading) move the section's document offset
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, [measure]);

  /* ── scroll → transform, driven by the shared Lenis ticker (same frame as the sticky position) ── */
  useEffect(() => {
    if (reduced) return;
    const s = state.current;
    return subscribeScroll((y) => {
      const x = Math.min(s.max, Math.max(0, (y - s.start) * SPEED));
      if (x === s.lastX) return;
      s.lastX = x;
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${-x}px,0,0)`;
    });
  }, [reduced]);

  /* ── keyboard: focusing an off-screen card scrolls the page so it comes into view ─ */
  const revealCard = (index: number) => {
    const s = state.current;
    const x = Math.min(s.max, index * (s.cardW + GAP));
    window.scrollTo({ top: s.start + x / SPEED, behavior: "instant" as ScrollBehavior });
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
                  onFocusCapture={() => revealCard(i)}
                  style={{ width: cardW }}
                  className="shrink-0 sm:h-[320px] 3xl:h-[360px]"
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
