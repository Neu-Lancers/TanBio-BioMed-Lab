import type { CSSProperties } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaCircleCheck, FaClock, FaRegCalendarCheck, FaShieldHalved, FaUserCheck } from "react-icons/fa6";

import delivery from "@/assets/images/delivery3.webp";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useCarousel } from "@/hooks/useCarousel";
import { cn } from "@/lib/cn";
import { useBooking } from "@/components/booking/BookingProvider";
import { discountPercent, HEALTH_PACKAGES, type HealthPackage } from "@/data/packages";

const COLLECTION_FEATURES = [
  { icon: FaUserCheck, label: "Trained", sub: "Phlebotomists" },
  { icon: FaShieldHalved, label: "Safe & Hygienic", sub: "Collection" },
  { icon: FaClock, label: "On-time", sub: "Report Delivery" },
];


function PackageCard({ pkg }: { pkg: HealthPackage }) {
  const { open } = useBooking();
  const Icon = pkg.icon;
  return (
    <article
      className="card card-hover relative flex h-full flex-col overflow-hidden p-6 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[var(--accent)]"
      style={{ "--accent": pkg.iconColor } as CSSProperties}
    >
      {pkg.badge && (
        <span className="absolute right-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-[.7rem] font-bold uppercase tracking-wide text-white">
          {pkg.badge}
        </span>
      )}

      <header className="mb-4 flex items-center gap-3 pr-20 xs:pr-24">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 text-xl"
          style={{ color: pkg.iconColor, borderColor: pkg.iconColor }}
        >
          <Icon aria-hidden="true" />
        </span>
        <h3 className="text-base font-extrabold leading-snug">{pkg.title}</h3>
      </header>

      <div className="mb-4 border-b border-line pb-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-muted line-through">₹{pkg.originalPrice}</span>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">{discountPercent(pkg)}% OFF</span>
        </div>
        <div className="text-3xl font-extrabold" style={{ color: pkg.iconColor }}>
          ₹{pkg.price}
        </div>
      </div>

      <ul className="mb-6 flex-1 space-y-1.5 text-sm">
        {pkg.tests.map((t) => (
          <li key={t} className="flex items-start gap-2">
            <FaCircleCheck className="mt-1 shrink-0 text-[.8rem]" style={{ color: pkg.iconColor }} aria-hidden="true" />
            <span>{t}</span>
          </li>
        ))}
      </ul>

      <Button onClick={() => open({ preselect: pkg.title })} className="w-full">
        <FaRegCalendarCheck className="text-lg" aria-hidden="true" /> Book Now
      </Button>
    </article>
  );
}

export default function HealthPackages() {
  const { open } = useBooking();
  const { trackRef, active, canPrev, canNext, scrollPage, scrollTo } = useCarousel();

  const arrow =
    "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-brand shadow-card transition-all duration-300 ease-out hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-0 md:grid 3xl:h-14 3xl:w-14";

  return (
    <section id="packages" className="section bg-sky-soft/50" aria-label="Health packages">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Health Packages"
            title="Stay Healthy,"
            highlight="Stay Ahead"
            description="Choose from our curated health packages designed for every stage of life."
          />
        </Reveal>

        <Reveal delay={120} className="relative mt-10 md:px-6">
          <button type="button" className={cn(arrow, "left-0")} onClick={() => scrollPage(-1)} disabled={!canPrev} aria-label="Previous packages">
            <FaChevronLeft aria-hidden="true" />
          </button>

          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 py-3"
            role="list"
            aria-label="Health packages"
          >
            {HEALTH_PACKAGES.map((p) => (
              <div
                key={p.id}
                role="listitem"
                className="w-[86%] shrink-0 snap-start xs:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] 3xl:w-[calc(25%-18px)]"
              >
                <PackageCard pkg={p} />
              </div>
            ))}
          </div>

          <button type="button" className={cn(arrow, "right-0")} onClick={() => scrollPage(1)} disabled={!canNext} aria-label="Next packages">
            <FaChevronRight aria-hidden="true" />
          </button>
        </Reveal>

        {/* dots */}
        <div className="mt-4 flex flex-wrap justify-center gap-2" role="group" aria-label="Choose package">
          {HEALTH_PACKAGES.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to ${p.title}`}
              aria-current={active === i}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300 ease-out",
                active === i ? "w-7 bg-brand" : "w-2.5 bg-line hover:bg-sky",
              )}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button to="/services" variant="outline">
            View All Tests <FaArrowRight aria-hidden="true" />
          </Button>
        </div>

        {/* Home sample collection banner — one responsive layout, one image */}
        <Reveal delay={100} className="mt-14">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy to-brand p-6 text-white shadow-lift sm:p-8 lg:px-12 lg:py-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky/20 blur-2xl" aria-hidden="true" />
            <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
              <img
                src={delivery}
                alt="Home sample collection by a TanBio phlebotomist"
                width={900}
                height={900}
                loading="lazy"
                decoding="async"
                className="h-28 w-28 shrink-0 rounded-2xl bg-white/10 object-contain sm:h-36 sm:w-36 lg:h-40 lg:w-40 3xl:h-52 3xl:w-52"
              />

              <div className="max-w-md lg:flex-1">
                <h3 className="text-2xl font-extrabold text-white">Home Sample Collection</h3>
                <p className="mt-1 text-white/80">We collect samples from the comfort of your home.</p>
              </div>

              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 lg:flex-1 lg:justify-center">
                {COLLECTION_FEATURES.map(({ icon: Icon, label, sub }) => (
                  <li key={label} className="flex items-center gap-2.5 text-left">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-sky">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-sm font-bold">{label}</span>
                      <span className="block text-xs text-white/70">{sub}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <Button onClick={() => open({ preselect: "Home sample collection" })} variant="light" className="shrink-0">
                <FaRegCalendarCheck aria-hidden="true" /> Schedule Collection
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
