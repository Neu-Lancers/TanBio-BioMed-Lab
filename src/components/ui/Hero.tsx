import type { ReactNode } from "react";
import { FaHouseMedical, FaShieldHalved } from "react-icons/fa6";
import patternBg from "@/assets/images/home-pattern.webp";
import Tilt3D from "@/components/ui/Tilt3D";
import BreadcrumbTrail, { type Crumb } from "@/components/ui/Breadcrumbs";

export type { Crumb };
export type HeroFeature = { icon: ReactNode; label: string; sub: string };

type Props = {
  /** Inline breadcrumb trail after Home (last item = current page) */
  breadcrumbs?: Crumb[];
  /** set false when the page already emits BreadcrumbList JSON-LD */
  breadcrumbSchema?: boolean;
  /** Pill label above the heading */
  eyebrow?: string;
  /** Heading — `highlight` is rendered in brand blue on its own line */
  title: string;
  highlight?: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Up to 3 feature cards (extra items are ignored so every hero has the same structure) */
  features?: HeroFeature[];
  /** Buttons (use Button variants primary / outline / light) */
  children?: ReactNode;
};

/**
 * THE hero — used unchanged on every page. One height token (--hero-h), one type scale,
 * one image panel (same size / radius / position), one feature-card row, one entrance sequence.
 * Pages only vary content. Stacks below lg (copy, then image at a fixed aspect ratio).
 */
export default function Hero({ breadcrumbs, breadcrumbSchema = true, eyebrow, title, highlight, description, image, imageAlt, features, children }: Props) {
  return (
    <section className="relative overflow-hidden lg:min-h-[var(--hero-h)]">
      {/* Brand-tinted backdrop */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${patternBg})` }} aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-sky-soft/90 to-[#dfe8ff]/90" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(52,227,240,.2),transparent)]" aria-hidden="true" />

      <div className="container relative z-[1] grid items-center gap-8 py-10 sm:py-12 lg:min-h-[var(--hero-h)] lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:py-10 xl:gap-14">
        {/* Copy */}
        <div className="mx-auto w-full max-w-[40rem] text-center lg:mx-0 lg:max-w-none lg:text-left">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <BreadcrumbTrail items={breadcrumbs} schema={breadcrumbSchema} className="mb-4 animate-fade-up [animation-delay:50ms]" />
          )}
          {eyebrow && !(breadcrumbs && breadcrumbs.length > 0) && <span className="eyebrow !text-small animate-fade-up [animation-delay:100ms]">{eyebrow}</span>}
          <h1 className="animate-fade-up text-display text-navy [animation-delay:200ms]">
            {title}
            {highlight && (
              <>
                <br />
                <span className="heading-hl">{highlight}</span>
              </>
            )}
          </h1>
          <p className="mx-auto mt-5 max-w-[38rem] animate-fade-up text-lead text-muted [animation-delay:300ms] lg:mx-0 3xl:max-w-[44rem]">
            {description}
          </p>

          {features && features.length > 0 && (
            <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {features.slice(0, 3).map((f, i) => (
                <li
                  key={f.label}
                  style={{ animationDelay: `${400 + i * 90}ms` }}
                  className="group flex animate-fade-up items-center gap-3 rounded-2xl border border-line bg-white/90 px-3.5 py-2.5 text-left sm:px-4 sm:py-3.5 shadow-card transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-lg sm:h-11 sm:w-11 sm:text-xl lg:max-xl:hidden text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    {f.icon}
                  </span>
                  <span className="min-w-0 leading-snug">
                    <span className="block text-body font-semibold text-navy">{f.label}</span>
                    <span className="block text-small text-muted">{f.sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}

          {children && (
            <div className="mt-8 flex animate-fade-up flex-col items-stretch gap-3 [animation-delay:700ms] sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
              {children}
            </div>
          )}
        </div>

        {/* Image panel — fixed aspect when stacked, fills the row at lg+ */}
        <div className="relative mx-auto w-full max-w-[40rem] animate-fade-up [animation-delay:150ms] lg:mx-0 lg:h-full lg:max-w-none lg:animate-slide-right">
          <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-brand shadow-lift sm:aspect-[2/1] lg:absolute lg:inset-0 lg:aspect-auto lg:rounded-[2.5rem]">
            <img
              src={image}
              alt={imageAlt}
              width={1600}
              height={1000}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent" aria-hidden="true" />
          </div>
          {/* keeps the panel's height when absolutely positioned at lg+ */}
          <div className="hidden lg:block lg:min-h-[22rem]" aria-hidden="true" />

          {/* Floating glass chips (depth) — always inside the panel so nothing overflows */}
          <Tilt3D className="absolute bottom-3 left-3 z-[3] hidden sm:bottom-5 sm:left-5 sm:block" rest={{ x: 4, y: 8, z: 0 }} max={6}>
            <div className="flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/90 px-3 py-2 shadow-lift sm:gap-3 sm:px-4 sm:py-3">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-sm text-white sm:h-10 sm:w-10 sm:text-base">
                <FaShieldHalved aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-small font-bold text-navy">Reports delivered securely</span>
                <span className="block text-caption text-muted">Email &amp; WhatsApp</span>
              </span>
            </div>
          </Tilt3D>
          <Tilt3D className="absolute right-3 top-3 z-[3] hidden sm:block lg:right-5 lg:top-5" rest={{ x: -4, y: -8, z: 0 }} max={6}>
            <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-lift">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-glow/90 text-navy">
                <FaHouseMedical aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-small font-bold text-navy">Home sample collection</span>
                <span className="block text-caption text-muted">At your doorstep</span>
              </span>
            </div>
          </Tilt3D>
        </div>
      </div>
    </section>
  );
}
