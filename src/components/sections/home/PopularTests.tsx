import { FaDroplet, FaRegCalendarCheck, FaRegClock } from "react-icons/fa6";
import Button from "@/components/ui/Button";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
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
          <h3 className="text-h4 font-extrabold leading-tight">{test.name}</h3>
          <p className="mt-0.5 text-small text-muted">{test.subtitle}</p>
          <div className="mb-5 mt-4 flex flex-wrap gap-2 text-caption">
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
          <Button variant="primary" className="mt-auto w-full" onClick={() => open({ preselect: test.name })}>
            <FaRegCalendarCheck aria-hidden="true" /> Book Test
          </Button>
        </div>
      </div>

      {/* BACK — revealed on hover / keyboard focus */}
      <div className="pointer-events-none absolute inset-0 flex translate-y-3 flex-col justify-center bg-gradient-to-br from-brand-dark to-brand p-6 text-center text-white opacity-0 transition-all duration-500 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <h3 className="text-h3 text-white">{test.name}</h3>
        <p className="text-small text-white/75">{test.subtitle}</p>
        <div className="divider-glow mx-auto my-4" />
        <p className="text-small leading-relaxed text-white/90">{test.hoverDetail}</p>
        <button
          type="button"
          onClick={() => open({ preselect: test.name })}
          className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-small font-semibold text-brand transition-transform duration-300 ease-out hover:-translate-y-0.5"
        >
          <FaRegCalendarCheck className="text-lg" aria-hidden="true" /> Book Now
        </button>
      </div>
    </article>
  );
}

export default function PopularTests() {
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

        <ul className="mt-8 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {POPULAR_TESTS.map((t, i) => (
            <Reveal as="li" key={t.name} delay={(i % 3) * 90} className="h-full">
              <TestCard test={t} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
