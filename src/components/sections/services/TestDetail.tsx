import { useState } from "react";
import { FaChevronDown, FaPhoneVolume } from "react-icons/fa6";
import { useBooking } from "@/components/booking/BookingProvider";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Service } from "@/data/services";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";

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

        <div className="mt-8 grid items-start gap-6 md:mt-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
          <Reveal className="card overflow-hidden lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
            <div className="relative">
              <img src={s.image} alt={s.title} width={800} height={500} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-small font-bold text-navy shadow-card">
                <span style={{ color: s.iconColor }} aria-hidden="true"><Icon /></span>
                {s.title}
              </span>
            </div>
            <div className="space-y-4 p-6">
              <p className="text-small">{s.description}</p>
              <p className="text-small font-semibold text-navy">{s.tests.length} tests available</p>
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
                    <h3 className="text-body">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`test-panel-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center gap-3 p-4 text-left"
                      >
                        <span
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl font-mono text-small font-bold"
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
                        <p className="px-4 pb-4 pl-[3.75rem] text-small">{t.detail}</p>
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
