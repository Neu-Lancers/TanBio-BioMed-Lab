import { FaChevronLeft, FaChevronRight, FaDroplet, FaRegCalendarCheck, FaRegClock } from "react-icons/fa6";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useCarousel } from "@/hooks/useCarousel";
import { cn } from "@/lib/cn";
import { useBooking } from "@/components/booking/BookingProvider";
import { POPULAR_TESTS, type PopularTest } from "@/data/popularTests";

function TestCard({ test }: { test: PopularTest }) {
  const { open } = useBooking();
  return (
    <article className="group card card-hover relative h-full overflow-hidden !rounded-3xl focus-within:-translate-y-1.5 focus-within:shadow-lift">
      {/* FRONT */}
      <div className="flex h-full flex-col transition-opacity duration-500 ease-out group-hover:opacity-0 group-focus-within:opacity-0">
        <div className="relative aspect-[3/2] overflow-hidden">
          <img
            src={test.img}
            alt={`${test.name} – ${test.subtitle}`}
            width={800}
            height={533}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 to-transparent" aria-hidden="true" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-extrabold leading-tight">{test.name}</h3>
          <p className="mt-0.5 text-sm text-muted">{test.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/10 bg-sky-soft px-3 py-1.5">
              <FaDroplet className="text-brand" aria-hidden="true" />
              <span className="text-muted">Sample:</span>
              <span className="font-bold text-navy">{test.sample}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/10 bg-sky-soft px-3 py-1.5">
              <FaRegClock className="text-brand" aria-hidden="true" />
              <span className="text-muted">Report:</span>
              <span className="font-bold text-navy">{test.reportTime}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => open({ preselect: test.name })}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#2b2f3a] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-brand hover:shadow-lift"
          >
            <FaRegCalendarCheck className="text-lg" aria-hidden="true" /> Book Test
          </button>
        </div>
      </div>

      {/* BACK — revealed on hover / keyboard focus */}
      <div className="pointer-events-none absolute inset-0 flex translate-y-3 flex-col justify-center bg-gradient-to-br from-brand-dark to-brand p-6 text-center text-white opacity-0 transition-all duration-500 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <h3 className="text-xl font-extrabold text-white">{test.name}</h3>
        <p className="text-sm text-white/75">{test.subtitle}</p>
        <div className="divider-glow mx-auto my-4" />
        <p className="text-sm leading-relaxed text-white/90">{test.hoverDetail}</p>
        <button
          type="button"
          onClick={() => open({ preselect: test.name })}
          className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand transition-transform duration-300 ease-out hover:-translate-y-0.5"
        >
          <FaRegCalendarCheck className="text-lg" aria-hidden="true" /> Book Now
        </button>
      </div>
    </article>
  );
}

export default function PopularTests() {
  const { trackRef, canPrev, canNext, scrollPage } = useCarousel();

  const arrow =
    "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-brand shadow-card transition-all duration-300 ease-out hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-0 md:grid 3xl:h-14 3xl:w-14";

  return (
    <section id="popular-tests" className="section bg-sky-soft" aria-label="Popular tests">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Popular Tests"
            title="Most Booked"
            highlight="Diagnostic Tests"
            description="Trusted diagnostic tests performed with precision, accuracy and quick turnaround times to support better healthcare decisions."
          />
        </Reveal>

        <Reveal delay={120} className="relative mt-10 md:px-6">
          <button type="button" className={cn(arrow, "left-0")} onClick={() => scrollPage(-1)} disabled={!canPrev} aria-label="Previous tests">
            <FaChevronLeft aria-hidden="true" />
          </button>

          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 py-3"
            role="list"
            aria-label="Popular tests"
          >
            {POPULAR_TESTS.map((t) => (
              <div
                key={t.name}
                role="listitem"
                className="w-[82%] shrink-0 snap-start xs:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] 3xl:w-[calc(25%-18px)]"
              >
                <TestCard test={t} />
              </div>
            ))}
          </div>

          <button type="button" className={cn(arrow, "right-0")} onClick={() => scrollPage(1)} disabled={!canNext} aria-label="Next tests">
            <FaChevronRight aria-hidden="true" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
