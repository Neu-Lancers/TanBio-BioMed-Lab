import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaLocationDot, FaQuoteLeft, FaStar } from "react-icons/fa6";
import Avatar from "@/components/ui/Avatar";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { TESTIMONIALS, type Testimonial } from "@/data/testimonials";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const INTERVAL = 5000;
const MOVE_MS = 750;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function Stars({ n, className, dim = "text-white/25" }: { n: number; className?: string; dim?: string }) {
  return (
    <span className={cn("flex gap-1", className)} role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} aria-hidden="true" className={i < n ? "text-amber-400" : dim} />
      ))}
    </span>
  );
}

type Snapshot = { items: Map<number, DOMRect> };

/**
 * Big LEFT card + queue of reviewer cards on the right. Every few seconds the first queued card
 * flies (FLIP: translate + scale + fade) into the big card, the others slide up, and the previous
 * big review re-enters at the bottom of the queue — looping forever. Transform/opacity only.
 */
export default function Testimonials() {
  const reduced = useReducedMotion();
  const ids = TESTIMONIALS.map((t) => t.id);
  const [order, setOrder] = useState<number[]>(ids);
  const [paused, setPaused] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<number, HTMLElement>());
  const snapshot = useRef<Snapshot | null>(null);

  const byId = (id: number): Testimonial => TESTIMONIALS.find((t) => t.id === id)!;
  const activeId = order[0];
  const autoplay = !reduced && !paused && order.length > 1;

  /** Bring `target` (default: next in queue) to the big card. */
  const advance = useCallback(
    (target?: number) => {
      if (order.length < 2) return;
      const targetId = target ?? order[1];
      if (targetId === order[0]) return;
      const idx = order.indexOf(targetId);
      const next = [...order.slice(idx), ...order.slice(0, idx)];

      if (!reduced) {
        const wrap = wrapRef.current;
        const big = bigRef.current;
        const el = itemRefs.current.get(targetId);
        // 1) remember where every queued card is right now (for FLIP)
        const items = new Map<number, DOMRect>();
        itemRefs.current.forEach((node, id) => items.set(id, node.getBoundingClientRect()));
        snapshot.current = { items };

        // 2) fly a clone of the chosen card into the big panel
        if (wrap && big && el) {
          const w = wrap.getBoundingClientRect();
          const from = el.getBoundingClientRect();
          const to = big.getBoundingClientRect();
          const ghost = el.cloneNode(true) as HTMLElement;
          ghost.removeAttribute("id");
          ghost.setAttribute("aria-hidden", "true");
          ghost.tabIndex = -1;
          Object.assign(ghost.style, {
            position: "absolute",
            left: `${from.left - w.left}px`,
            top: `${from.top - w.top}px`,
            width: `${from.width}px`,
            height: `${from.height}px`,
            margin: "0",
            zIndex: "20",
            pointerEvents: "none",
            transformOrigin: "top left",
          });
          wrap.appendChild(ghost);
          const dx = to.left - from.left;
          const dy = to.top - from.top;
          const anim = ghost.animate(
            [
              { transform: "translate(0,0) scale(1,1)", opacity: 1, offset: 0 },
              { opacity: 0.85, offset: 0.55 },
              { transform: `translate(${dx}px,${dy}px) scale(${to.width / from.width},${to.height / from.height})`, opacity: 0, offset: 1 },
            ],
            { duration: MOVE_MS, easing: EASE, fill: "forwards" },
          );
          anim.onfinish = anim.oncancel = () => ghost.remove();
        }
      }
      setOrder(next);
    },
    [order, reduced],
  );

  const back = useCallback(() => {
    if (order.length < 2) return;
    snapshot.current = null;
    setOrder([order[order.length - 1], ...order.slice(0, -1)]);
  }, [order]);

  /* FLIP the queue after the order changes: cards slide up, the newcomer rises in at the bottom */
  useLayoutEffect(() => {
    const snap = snapshot.current;
    if (!snap) return;
    snapshot.current = null;
    order.slice(1).forEach((id) => {
      const el = itemRefs.current.get(id);
      if (!el) return;
      const prev = snap.items.get(id);
      const now = el.getBoundingClientRect();
      if (prev) {
        const dx = prev.left - now.left;
        const dy = prev.top - now.top;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          el.animate([{ transform: `translate(${dx}px,${dy}px)` }, { transform: "translate(0,0)" }], { duration: MOVE_MS, easing: EASE });
        }
      } else {
        el.animate(
          [
            { opacity: 0, transform: "translateY(40px) scale(.96)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          { duration: MOVE_MS, delay: 200, easing: EASE, fill: "backwards" },
        );
      }
    });
  }, [order]);

  /* autoplay loop */
  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(() => advance(), INTERVAL);
    return () => window.clearTimeout(t);
  }, [autoplay, advance]);

  const pos = ids.indexOf(activeId) + 1;

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="Testimonials" title="What Our" highlight="Patients Say" description="Real experiences from the people we serve." />
        </Reveal>

        <Reveal delay={100} className="mt-8 md:mt-10">
          <div
            ref={wrapRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Patient testimonials"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="relative grid items-stretch gap-4 lg:grid-cols-[1.5fr_1fr] lg:gap-6 3xl:gap-8"
          >
            {/* BIG card */}
            <div
              ref={bigRef}
              className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl bg-brand p-6 text-white shadow-lift sm:p-9"
            >
              <span className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-glow/20 blur-3xl" aria-hidden="true" />
              <FaQuoteLeft aria-hidden="true" className="absolute right-6 top-6 text-[6rem] text-white/10 sm:right-9 sm:text-[8rem]" />

              <div className="relative grid flex-1" aria-live="polite" aria-atomic="true">
                {TESTIMONIALS.map((t) => {
                  const on = t.id === activeId;
                  return (
                    <figure
                      key={t.id}
                      aria-hidden={!on}
                      className={cn(
                        "col-start-1 row-start-1 flex flex-col justify-between motion-reduce:transition-none",
                        on
                          ? "translate-x-0 scale-100 opacity-100 transition-all duration-700 ease-out [transition-delay:260ms] motion-reduce:[transition-delay:0ms]"
                          : "pointer-events-none -translate-x-6 scale-[.98] opacity-0 transition-all duration-500 ease-in",
                      )}
                    >
                      <Stars n={t.rating} className="mb-5 text-lg" />
                      <blockquote className="text-[clamp(1.2rem,1rem+1vw,1.9rem)] font-semibold leading-snug tracking-tight text-white">
                        “{t.review}”
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-4">
                        <Avatar name={t.name} photo={t.photo} className="h-14 w-14 border-2 border-white/60 !bg-white/15 text-lg" />
                        <span className="leading-tight">
                          <span className="block text-lg font-bold">{t.name}</span>
                          <span className="mt-1 flex items-center gap-1.5 text-sm text-white/75">
                            <FaLocationDot aria-hidden="true" className="text-cyan-glow" /> {t.location}
                          </span>
                        </span>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>

              <div className="relative mt-6 flex items-center justify-between gap-4">
                <span className="font-mono text-sm tracking-widest text-white/70">
                  {String(pos).padStart(2, "0")} / {String(ids.length).padStart(2, "0")}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={back}
                    aria-label="Previous testimonial"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/40 text-white transition-all duration-300 hover:-translate-x-0.5 hover:bg-white hover:text-brand"
                  >
                    <FaArrowLeft aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => advance()}
                    aria-label="Next testimonial"
                    className="grid h-11 w-11 place-items-center rounded-full bg-white text-brand transition-all duration-300 hover:translate-x-0.5 hover:bg-cyan-glow hover:text-navy"
                  >
                    <FaArrowRight aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* autoplay progress */}
              <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/15" aria-hidden="true">
                <span
                  key={`${activeId}-${autoplay}`}
                  className="block h-full origin-left bg-cyan-glow"
                  style={{
                    transform: autoplay ? undefined : "scaleX(0)",
                    animation: autoplay ? `tbProgress ${INTERVAL}ms linear forwards` : undefined,
                  }}
                />
              </span>
            </div>

            {/* QUEUE — equal-height compact cards */}
            <ul className="grid auto-rows-fr gap-4 lg:gap-6">
              {order.slice(1).map((id) => {
                const t = byId(id);
                return (
                  <li key={id} className="flex">
                    <button
                      type="button"
                      ref={(el) => {
                        if (el) itemRefs.current.set(id, el);
                        else itemRefs.current.delete(id);
                      }}
                      onClick={() => advance(id)}
                      aria-label={`Show review from ${t.name}`}
                      className="card card-hover flex w-full flex-col gap-3 p-5 text-left will-change-transform"
                    >
                      <span className="flex items-center gap-3">
                        <Avatar name={t.name} photo={t.photo} className="h-11 w-11 shrink-0 text-base" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-bold text-navy">{t.name}</span>
                          <span className="block truncate text-sm text-muted">{t.location}</span>
                        </span>
                        <Stars n={t.rating} className="text-xs" dim="text-line" />
                      </span>
                      <span className="line-clamp-3 block text-[.88rem] leading-snug text-muted">“{t.review}”</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
      <style>{`@keyframes tbProgress{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </section>
  );
}
