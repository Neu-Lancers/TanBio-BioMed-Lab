import { useState, type CSSProperties } from "react";
import { FaCircleCheck, FaClock, FaRegCalendarCheck, FaShieldHalved, FaUserCheck } from "react-icons/fa6";

import delivery from "@/assets/images/delivery3.webp";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
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
        <span className="absolute right-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-caption font-bold uppercase tracking-wide text-white">
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
        <h3 className="text-body font-extrabold leading-snug">{pkg.title}</h3>
      </header>

      <div className="mb-4 border-b border-line pb-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-small text-muted line-through">₹{pkg.originalPrice}</span>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-caption font-bold text-emerald-700">{discountPercent(pkg)}% OFF</span>
        </div>
        <div className="text-3xl font-extrabold" style={{ color: pkg.iconColor }}>
          ₹{pkg.price}
        </div>
      </div>

      <ul className="mb-6 flex-1 space-y-1.5 text-small">
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

const INITIAL = 6;

export default function HealthPackages() {
  const { open } = useBooking();
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? HEALTH_PACKAGES : HEALTH_PACKAGES.slice(0, INITIAL);

  return (
    <section id="packages" className="section bg-white" aria-label="Health packages">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Health Packages"
            title="Stay Healthy,"
            highlight="Stay Ahead"
            description="Choose from our curated health packages designed for every stage of life."
          />
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {list.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 3) * 90} className="h-full min-w-0">
              <PackageCard pkg={p} />
            </Reveal>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {HEALTH_PACKAGES.length > INITIAL && (
            <Button variant="outline" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}>
              {showAll ? "Show fewer packages" : `Show all ${HEALTH_PACKAGES.length} packages`}
            </Button>
          )}
          <Button to="/services" variant="dark" arrow>
            View All Tests
          </Button>
        </div>

        {/* Home sample collection banner — one responsive layout, one image */}
        <Reveal delay={100} className="mt-10">
          <div className="relative overflow-hidden rounded-[2rem] bg-brand p-6 text-white shadow-lift sm:p-8 lg:px-12 lg:py-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(52,227,240,.3),transparent)]" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,.14),transparent)]" aria-hidden="true" />
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
                <h3 className="text-h3 text-white">Home Sample Collection</h3>
                <p className="mt-1 text-white/80">We collect samples from the comfort of your home.</p>
              </div>

              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 lg:flex-1 lg:justify-center">
                {COLLECTION_FEATURES.map(({ icon: Icon, label, sub }) => (
                  <li key={label} className="flex items-center gap-2.5 text-left">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-cyan-glow">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-small font-bold">{label}</span>
                      <span className="block text-caption text-white/70">{sub}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <Button onClick={() => open({ preselect: "Home sample collection" })} variant="light" arrow className="shrink-0">
                <FaRegCalendarCheck aria-hidden="true" /> Schedule Collection
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
