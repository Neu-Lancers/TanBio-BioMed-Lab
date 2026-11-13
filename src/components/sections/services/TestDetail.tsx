import { useState } from "react";
import { FaArrowLeft, FaChevronDown, FaClock, FaHouseMedical, FaPhoneVolume, FaVial } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useBooking } from "@/components/booking/BookingProvider";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Service } from "@/data/services";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";

/** Dark image hero for a single service */
export function TestHero({ service: s }: { service: Service }) {
  const Icon = s.icon;
  const chips = [
    { icon: <FaVial />, text: `${s.tests.length} Tests Available` },
    { icon: <FaHouseMedical />, text: "Home Sample Collection" },
    { icon: <FaClock />, text: "Timely, Accurate Reports" },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <img
        src={s.image}
        alt=""
        aria-hidden="true"
        width={1200}
        height={800}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-navy-deep/30" aria-hidden="true" />
      <div className="container py-12 lg:py-20 3xl:py-28">
        <Link
          to="/services"
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:-translate-x-1 hover:bg-white/20 hover:text-white"
        >
          <FaArrowLeft aria-hidden="true" /> All Services
        </Link>
        <div className="max-w-2xl animate-fade-up">
          <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white/15 text-2xl" aria-hidden="true">
            <Icon />
          </span>
          <h1 className="mb-3 text-[clamp(1.75rem,1.1rem+2.2vw,3rem)] leading-tight text-white">{s.title}</h1>
          <p className="mb-6 text-white/85">{s.description}</p>
          <ul className="flex flex-wrap gap-3">
            {chips.map((c) => (
              <li key={c.text} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
                <span className="text-cyan-glow" aria-hidden="true">{c.icon}</span>
                {c.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Summary card + expandable list of every test */
export function TestDetail({ service: s }: { service: Service }) {
  const { open: openBooking } = useBooking();
  const [open, setOpen] = useState<number | null>(0);
  const Icon = s.icon;

  return (
    <section className="section" id="tests">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="What We Test" title="Detailed Tests Under" highlight={s.title} description={s.why} />
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <Reveal className="card overflow-hidden lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
            <div className="relative">
              <img src={s.image} alt={s.title} width={800} height={500} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-sm font-bold text-navy shadow-card">
                <span style={{ color: s.iconColor }} aria-hidden="true"><Icon /></span>
                {s.title}
              </span>
            </div>
            <div className="space-y-4 p-6">
              <p className="text-sm">{s.description}</p>
              <p className="text-sm font-semibold text-navy">{s.tests.length} tests available</p>
              <Button variant="dark" arrow className="w-full" onClick={() => openBooking({ preselect: s.slug })}>
                Book This Test
              </Button>
              <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 font-semibold text-brand">
                <FaPhoneVolume aria-hidden="true" /> {SITE.phone}
              </a>
            </div>
          </Reveal>

          <ol className="space-y-3">
            {s.tests.map((t, i) => {
              const isOpen = open === i;
              return (
                <Reveal as="li" key={t.name} delay={Math.min(i, 6) * 50}>
                  <div className={cn("card overflow-hidden", isOpen && "!border-brand/40 shadow-lift")}>
                    <h3 className="text-base">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`test-panel-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center gap-3 p-4 text-left"
                      >
                        <span
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl font-mono text-sm font-bold"
                          style={{ background: s.iconBg, color: s.iconColor }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 font-bold text-navy">{t.name}</span>
                        <FaChevronDown className={cn("shrink-0 text-brand transition-transform duration-300", isOpen && "rotate-180")} aria-hidden="true" />
                      </button>
                    </h3>
                    <div
                      id={`test-panel-${i}`}
                      className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                    >
                      <div className="overflow-hidden">
                        <p className="px-4 pb-4 pl-[3.75rem] text-sm">{t.detail}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
