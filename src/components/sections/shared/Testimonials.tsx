import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaLocationDot, FaQuoteLeft, FaStar } from "react-icons/fa6";
import Avatar from "@/components/ui/Avatar";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/data/testimonials";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const INTERVAL = 6000;
const arrow =
  "grid h-10 w-10 place-items-center rounded-full border-2 border-brand text-brand transition-all duration-300 hover:bg-brand hover:text-white";

export default function Testimonials() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = TESTIMONIALS.length;

  const go = useCallback((i: number) => setActive(((i % n) + n) % n), [n]);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), INTERVAL);
    return () => window.clearInterval(id);
  }, [reduced, paused, n, active]);

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="Testimonials" title="What Our" highlight="Patients Say" description="Real experiences from the people we serve." />
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-12 max-w-3xl 3xl:max-w-4xl">
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Patient testimonials"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="card relative overflow-hidden px-6 py-10 text-center sm:px-14 sm:py-12">
              <FaQuoteLeft className="absolute left-6 top-6 text-5xl text-sky/15 sm:text-7xl" aria-hidden="true" />
              <div className="grid">
                {TESTIMONIALS.map((t, i) => (
                  <figure
                    key={t.id}
                    aria-hidden={i !== active}
                    className={cn(
                      "col-start-1 row-start-1 flex flex-col items-center transition-all duration-700 ease-out",
                      i === active ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-6 opacity-0",
                    )}
                  >
                    <Avatar name={t.name} photo={t.photo} className="h-16 w-16 text-xl shadow-card" />
                    <div className="mt-4 flex gap-1 text-amber-400" role="img" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <FaStar key={s} className={s < t.rating ? "" : "text-line"} aria-hidden="true" />
                      ))}
                    </div>
                    <blockquote className="mt-5 max-w-xl text-[1.05rem] font-medium leading-relaxed text-navy sm:text-lg">
                      &ldquo;{t.review}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6">
                      <span className="block font-extrabold text-navy">{t.name}</span>
                      <span className="mt-0.5 inline-flex items-center gap-1.5 text-sm">
                        <FaLocationDot className="text-sky" aria-hidden="true" />
                        {t.location}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button type="button" onClick={() => go(active - 1)} aria-label="Previous testimonial" className={arrow}>
                <FaArrowLeft aria-hidden="true" />
              </button>
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === active}
                    className={cn("h-2.5 rounded-full transition-all duration-500 ease-out", i === active ? "w-8 bg-brand" : "w-2.5 bg-brand/25 hover:bg-brand/50")}
                  />
                ))}
              </div>
              <button type="button" onClick={() => go(active + 1)} aria-label="Next testimonial" className={arrow}>
                <FaArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
