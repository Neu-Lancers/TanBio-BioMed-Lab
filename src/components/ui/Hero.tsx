import type { ReactNode } from "react";
import { FaHouseMedical, FaShieldHalved } from "react-icons/fa6";
import patternBg from "@/assets/images/home-pattern.webp";
import Tilt3D from "@/components/ui/Tilt3D";
import { cn } from "@/lib/cn";

export type HeroFeature = { icon: ReactNode; label: string; sub: string };

type Props = {
  /** Pill label above the heading (optional) */
  eyebrow?: string;
  /** Heading — `highlight` is rendered in brand blue on its own line */
  title: string;
  highlight?: string;
  description: string;
  image: string;
  imageAlt: string;
  features?: HeroFeature[];
  /** Buttons etc. */
  children?: ReactNode;
  /** home = full-viewport hero, page = standard inner-page hero */
  size?: "home" | "page";
  /** Corner treatment of the image panel on desktop */
  shape?: "curve" | "diagonal" | "fade";
  /** Slot rendered under the hero (e.g. stats bar) */
  footer?: ReactNode;
};

const shapeDesktop: Record<NonNullable<Props["shape"]>, string> = {
  curve: "lg:rounded-[2.5rem]",
  diagonal: "lg:rounded-[2.5rem_2.5rem_2.5rem_7rem]",
  fade: "lg:rounded-[2.5rem_7rem_2.5rem_2.5rem]",
};

/**
 * The ONE hero used on every page — identical height scale, type scale, spacing,
 * stacking breakpoint (lg) and entrance motion. Pages only vary content + panel corners.
 */
export default function Hero({
  eyebrow,
  title,
  highlight,
  description,
  image,
  imageAlt,
  features,
  children,
  size = "page",
  shape = "curve",
  footer,
}: Props) {
  const minH = size === "home" ? "lg:min-h-[var(--hero-h-home)]" : "lg:min-h-[var(--hero-h)]";

  return (
    <section className={cn("relative flex flex-col overflow-hidden lg:block", minH)}>
      {/* Brand-tinted backdrop: photo pattern + soft gradient + glow */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${patternBg})` }} aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-sky-soft/90 to-[#dfe8ff]/90" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-cyan-glow/15 blur-3xl" aria-hidden="true" />

      {/* Image panel — right on desktop (inset, large radius), stacked below the copy on tablet/mobile */}
      <div
        className={cn(
          "relative z-[2] order-2 mx-4 mb-6 h-[var(--hero-stack-img)] animate-fade-up [animation-delay:150ms]",
          "lg:absolute lg:inset-y-6 lg:right-6 lg:m-0 lg:h-auto lg:w-[47%] lg:animate-slide-right xl:right-8 2xl:right-[max(2rem,calc((100vw-1440px)/2+1rem))] 2xl:w-[44%]",
        )}
      >
        <div className={cn("absolute inset-0 overflow-hidden rounded-3xl bg-brand shadow-lift", shapeDesktop[shape])}>
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

        {/* Floating glass chips (depth) */}
        <Tilt3D className="absolute -bottom-3 left-3 z-[3] sm:left-6 lg:-left-8 lg:bottom-10" rest={{ x: 4, y: 8, z: 0 }} max={6}>
          <div className="flex animate-fade-up items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lift backdrop-blur-xl [animation-delay:700ms]">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white">
              <FaShieldHalved aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.88rem] font-bold text-navy">Reports delivered securely</span>
              <span className="block text-[0.74rem] text-muted">Email &amp; WhatsApp</span>
            </span>
          </div>
        </Tilt3D>
        <Tilt3D className="absolute right-3 top-3 z-[3] hidden sm:block lg:-right-3 lg:top-12" rest={{ x: -4, y: -8, z: 0 }} max={6}>
          <div className="flex animate-fade-up items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lift backdrop-blur-xl [animation-delay:850ms]">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-glow/90 text-navy">
              <FaHouseMedical aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.88rem] font-bold text-navy">Home sample collection</span>
              <span className="block text-[0.74rem] text-muted">At your doorstep</span>
            </span>
          </div>
        </Tilt3D>
      </div>

      {/* Copy */}
      <div className={cn("container relative z-[3] order-1 flex items-center py-10 text-center lg:min-h-[inherit] lg:py-16 lg:text-left", minH)}>
        <div className="mx-auto lg:mx-0 lg:w-1/2 lg:pr-12">
          {eyebrow && <span className="eyebrow animate-fade-up [animation-delay:100ms]">{eyebrow}</span>}
          <h1 className="animate-fade-up text-[clamp(2rem,1.2rem+2.8vw,3.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy [animation-delay:200ms]">
            {title}
            {highlight && (
              <>
                <br />
                <span className="heading-hl">{highlight}</span>
              </>
            )}
          </h1>
          <p className="mx-auto mb-8 mt-5 max-w-[34rem] animate-fade-up text-[clamp(1rem,.95rem+.25vw,1.15rem)] leading-relaxed text-muted [animation-delay:300ms] lg:mx-0 3xl:max-w-[40rem]">
            {description}
          </p>

          {features && features.length > 0 && (
            <ul
              className={cn(
                "mx-auto mb-9 grid max-w-[34rem] grid-cols-1 gap-3 xs:grid-cols-2 sm:gap-4 lg:mx-0 xl:max-w-[38rem]",
                features.length === 4 ? "xl:grid-cols-2" : "xl:grid-cols-3",
              )}
            >
              {features.slice(0, 4).map((f, i) => (
                <li
                  key={f.label}
                  style={{ animationDelay: `${400 + i * 90}ms` }}
                  className="group flex animate-fade-up items-center gap-3.5 rounded-2xl border border-line bg-white/85 px-4 py-3 text-left shadow-card backdrop-blur transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-xl text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    {f.icon}
                  </span>
                  <span className="min-w-0 leading-snug">
                    <span className="block text-[.95rem] font-bold text-navy">{f.label}</span>
                    <span className="block text-[.8rem] text-muted">{f.sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}

          {children && (
            <div className="flex animate-fade-up flex-col items-center gap-3 [animation-delay:700ms] sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              {children}
            </div>
          )}
        </div>
      </div>

      {footer && <div className="relative z-[4] order-3">{footer}</div>}
    </section>
  );
}
