import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaLocationDot, FaQuoteLeft, FaStar } from "react-icons/fa6";
import Avatar from "@/components/ui/Avatar";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/data/testimonials";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const INTERVAL = 6000;

function Stars({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cn("flex gap-1", className)} role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} aria-hidden="true" className={i < n ? "text-amber-400" : "text-white/25"} />
      ))}
    </span>
  );
}

export default function Testimonials() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const n = TESTIMONIALS.length;

  const go = useCallback((i: number) => setActive(((i % n) + n) % n), [n]);
  const autoplay = !reduced && !paused;

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % n), INTERVAL);
    return () => window.clearTimeout(id);
  }, [autoplay, n, active]);

  const onKey = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (((active + dir) % n) + n) % n;
    go(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="Testimonials" title="What Our" highlight="Patients Say" description="Real experiences from the people we serve." />
        </Reveal>

        <Reveal
          delay={100}
          className="mt-12 grid gap-5 lg:grid-cols-[1.5fr_1fr] 3xl:gap-8"
        >
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Patient testimonials"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="contents"
          >
            {/* Featured quote */}
            <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl bg-brand p-7 text-white shadow-lift sm:p-10">
              <span className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-glow/20 blur-3xl" aria-hidden="true" />
              <FaQuoteLeft aria-hidden="true" className="absolute right-6 top-6 text-[6rem] text-white/10 sm:right-10 sm:text-[8rem]" />

              <div className="relative grid" aria-live={paused ? "polite" : "off"}>
                {TESTIMONIALS.map((t, i) => (
                  <figure
                    key={t.id}
                    id={`testimonial-panel-${i}`}
                    role="tabpanel"
                    aria-labelledby={`testimonial-tab-${i}`}
                    aria-hidden={i !== active}
                    className={cn(
                      "col-start-1 row-start-1 flex flex-col justify-between transition-all duration-700 ease-out motion-reduce:transition-none",
                      i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
                    )}
                  >
                    <Stars n={t.rating} className="mb-6 text-lg" />
                    <blockquote className="text-[clamp(1.25rem,1rem+1.1vw,2rem)] font-semibold leading-snug tracking-tight text-white">
                      “{t.review}”
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-4">
                      <Avatar name={t.name} photo={t.photo} className="h-14 w-14 border-2 border-white/60 !bg-white/15 text-lg" />
                      <span className="leading-tight">
                        <span className="block text-lg font-bold">{t.name}</span>
                        <span className="mt-1 flex items-center gap-1.5 text-sm text-white/75">
                          <FaLocationDot aria-hidden="true" className="text-cyan-glow" /> {t.location}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="relative mt-8 flex items-center justify-between gap-4">
                <span className="font-mono text-sm tracking-widest text-white/70">
                  {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(active - 1)}
                    aria-label="Previous testimonial"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/40 text-white transition-all duration-300 hover:-translate-x-0.5 hover:bg-white hover:text-brand"
                  >
                    <FaArrowLeft aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(active + 1)}
                    aria-label="Next testimonial"
                    className="grid h-11 w-11 place-items-center rounded-full bg-white text-brand transition-all duration-300 hover:translate-x-0.5 hover:bg-cyan-glow hover:text-navy"
                  >
                    <FaArrowRight aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Reviewer selector */}
            <div
              role="tablist"
              aria-label="Choose a testimonial"
              aria-orientation="vertical"
              onKeyDown={onKey}
              className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {TESTIMONIALS.map((t, i) => {
                const on = i === active;
                return (
                  <button
                    key={t.id}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`testimonial-tab-${i}`}
                    aria-selected={on}
                    aria-controls={`testimonial-panel-${i}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => go(i)}
                    className={cn(
                      "relative min-w-[16rem] shrink-0 snap-start overflow-hidden rounded-2xl border bg-white p-4 text-left transition-all duration-500 ease-out lg:min-w-0 lg:flex-1",
                      on ? "border-transparent shadow-glow" : "border-line shadow-card hover:-translate-y-0.5 hover:border-brand/30",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <Avatar name={t.name} photo={t.photo} className="h-12 w-12 shrink-0 text-base" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-bold text-navy">{t.name}</span>
                        <span className="block truncate text-sm text-muted">{t.location}</span>
                      </span>
                      <Stars n={t.rating} className="hidden text-xs sm:flex [&>svg:not(.text-amber-400)]:text-line" />
                    </span>
                    <span className="mt-3 line-clamp-2 block text-[.85rem] leading-snug text-muted">{t.review}</span>
                    {/* autoplay progress */}
                    <span className="absolute inset-x-0 bottom-0 h-[3px] bg-line/70" aria-hidden="true">
                      {on && (
                        <span
                          key={`${active}-${autoplay}`}
                          className="block h-full origin-left bg-brand"
                          style={{
                            transform: autoplay ? undefined : "scaleX(1)",
                            animation: autoplay ? `tbProgress ${INTERVAL}ms linear forwards` : undefined,
                          }}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`@keyframes tbProgress{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </section>
  );
}
