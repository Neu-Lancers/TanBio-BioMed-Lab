import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES, type Service } from "@/data/services";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const GAP = 24; // px between cards (gap-6)

/** Cards visible at once: 2.5 on tablet/desktop, ~1.2 on phones. */
function visibleCards(w: number) {
  return w >= 640 ? 2.5 : 1.2;
}

function ServiceCard({ svc, style }: { svc: Service; style?: React.CSSProperties }) {
  const Icon = svc.icon;
  return (
    <Link
      to={`/tests/${svc.slug}`}
      style={style}
      draggable={false}
      className="card card-hover group flex h-full shrink-0 flex-col overflow-hidden focus-visible:outline-sky"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-sky-soft">
        <img
          src={svc.image}
          alt={svc.title}
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span
          className="absolute bottom-3 left-4 grid h-12 w-12 place-items-center rounded-xl text-xl shadow-card backdrop-blur"
          style={{ background: "#fff", color: svc.iconColor }}
        >
          <Icon aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-lg font-extrabold md:text-xl">{svc.title}</h3>
        <p className="mt-2 flex-1 text-sm md:text-base">{svc.short}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand transition-all duration-300 group-hover:gap-3">
          View Tests <FaArrowRight aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default function ServicesShowcase() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null); // tall scroll runway
  const viewportRef = useRef<HTMLDivElement>(null); // clips the track
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  const [cardW, setCardW] = useState(360);
  const [runway, setRunway] = useState(0); // px of horizontal travel
  const [active, setActive] = useState(1);

  const state = useRef({ target: 0, current: 0, max: 0, raf: 0, lastActive: 1 });

  /* ── measure: card width, horizontal travel, runway height ───────────── */
  const measure = useCallback(() => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track) return;
    const cs = getComputedStyle(vp);
    const inner = vp.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const n = visibleCards(window.innerWidth);
    // n cards + (ceil(n)-1) gaps fill the visible width exactly → 2.5 cards (with the 3rd peeking) per view
    setCardW(Math.max(240, (inner - GAP * Math.floor(n)) / n));
    const travel = Math.max(0, SERVICES.length * ((inner - GAP * Math.floor(n)) / n) + GAP * (SERVICES.length - 1) - inner);
    state.current.max = travel;
    setRunway(travel);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, cardW]);

  /* ── scroll → progress → transform (rAF, lerp-smoothed) ──────────────── */
  const progressFromScroll = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return 0;
    const top = wrap.getBoundingClientRect().top + window.scrollY;
    const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 72;
    const start = top - navH;
    const p = (window.scrollY - start) / Math.max(1, state.current.max);
    return Math.min(1, Math.max(0, p));
  }, []);

  useEffect(() => {
    if (reduced) return;
    const s = state.current;

    const frame = () => {
      s.current += (s.target - s.current) * 0.14;
      if (Math.abs(s.target - s.current) < 0.15) s.current = s.target;
      const x = s.current * s.max;
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${-x}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${s.current})`;
      const idx = Math.min(SERVICES.length, Math.max(1, Math.round(s.current * (SERVICES.length - 1)) + 1));
      if (idx !== s.lastActive) {
        s.lastActive = idx;
        setActive(idx);
      }
      s.raf = s.current === s.target ? 0 : requestAnimationFrame(frame);
    };
    const kick = () => {
      s.target = progressFromScroll();
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
  }, [reduced, runway, progressFromScroll]);

  /* ── prev / next / keyboard → scroll the page to the matching position ─ */
  const goTo = (n: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 72;
    const start = wrap.getBoundingClientRect().top + window.scrollY - navH;
    const p = (Math.min(SERVICES.length, Math.max(1, n)) - 1) / (SERVICES.length - 1);
    window.scrollTo({ top: start + p * state.current.max, behavior: "smooth" });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  const cardStyle = { width: cardW } as const;

  /* ── reduced motion: plain native snap row, no pinning ───────────────── */
  if (reduced) {
    return (
      <section id="services" className="section bg-sky-soft/60" aria-labelledby="services-title">
        <div className="container">
          <SectionHeading eyebrow="Our Services" title="Comprehensive Diagnostic" highlight="Solutions" description="Seven specialised diagnostic departments under one roof." />
        </div>
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 sm:px-8">
          {SERVICES.map((svc) => (
            <div key={svc.id} className="w-[82%] shrink-0 snap-start sm:w-[40%]">
              <ServiceCard svc={svc} style={{ width: "100%" }} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-sky-soft/60">
      {/* tall runway: its height is the scroll distance that drives the horizontal travel */}
      <div ref={wrapRef} style={{ height: `calc(${runway}px + 100svh - var(--nav-h))` }} className="relative">
        <div className="sticky top-[var(--nav-h)] flex h-[calc(100svh-var(--nav-h))] min-h-[520px] flex-col justify-center gap-6 py-6 md:gap-8 3xl:gap-12">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
            <div id="services-title" className="text-center md:text-left">
              <SectionHeading
                align="left"
                className="!mx-0 !text-center md:!text-left"
                eyebrow="Our Services"
                title="Comprehensive Diagnostic"
                highlight="Solutions"
                description="Seven specialised departments — keep scrolling to explore them all."
              />
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <span className="text-sm font-bold tabular-nums text-navy" aria-live="polite">
                {String(active).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
              </span>
              {[
                { label: "Previous service", icon: FaArrowLeft, to: active - 1, off: active === 1 },
                { label: "Next service", icon: FaArrowRight, to: active + 1, off: active === SERVICES.length },
              ].map(({ label, icon: I, to, off }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  disabled={off}
                  onClick={() => goTo(to)}
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-full border-2 border-brand text-brand transition-all duration-300 hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand",
                  )}
                >
                  <I aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div
            ref={viewportRef}
            className="container w-full overflow-hidden py-4 outline-none"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Diagnostic services"
            onKeyDown={onKey}
          >
            <div
              ref={trackRef}
              className="flex items-stretch will-change-transform"
              style={{ gap: GAP, transform: "translate3d(0,0,0)" }}
            >
              {SERVICES.map((svc) => (
                <ServiceCard key={svc.id} svc={svc} style={cardStyle} />
              ))}
            </div>
          </div>

          <div className="container">
            <div className="h-1 w-full overflow-hidden rounded-full bg-brand/15" aria-hidden="true">
              <span ref={barRef} className="block h-full origin-left rounded-full bg-sky will-change-transform" style={{ transform: "scaleX(0)" }} />
            </div>
            <p className="mt-2 text-center text-xs font-semibold tabular-nums text-navy md:hidden">
              {String(active).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
