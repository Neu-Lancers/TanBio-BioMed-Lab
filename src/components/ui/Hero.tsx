import type { ReactNode } from "react";
import patternBg from "@/assets/images/home-pattern.webp";
import { cn } from "@/lib/cn";

export type HeroFeature = { icon: ReactNode; label: string; sub: string };

type Props = {
  /** Small uppercase label above the heading (optional) */
  eyebrow?: string;
  /** Heading lines — `highlight` is rendered in the accent colour on its own line */
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
  /** Image panel shape on desktop */
  shape?: "curve" | "diagonal" | "fade";
  /** Slot rendered under the hero (e.g. stats bar) */
  footer?: ReactNode;
};

const shapeDesktop: Record<NonNullable<Props["shape"]>, string> = {
  curve: "lg:rounded-tl-[60%_100%] lg:border-l-4 lg:border-t-4 lg:border-sky",
  diagonal: "lg:[clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)]",
  fade: "",
};

/**
 * The ONE hero used on every page — identical height scale, type scale, spacing,
 * stacking breakpoint (lg) and entrance motion. Pages only vary content + panel shape.
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
  return (
    <section
      className={cn(
        "relative flex flex-col overflow-hidden bg-cover bg-center lg:block",
        size === "home" ? "lg:min-h-[var(--hero-h-home)]" : "lg:min-h-[var(--hero-h)]",
      )}
      style={{ backgroundImage: `url(${patternBg})` }}
    >
      <div className="absolute inset-0 bg-white/70" aria-hidden="true" />

      {/* Image panel — right on desktop, stacked below the copy on tablet/mobile */}
      <div
        className={cn(
          "relative z-[2] order-2 mx-4 mb-4 h-[var(--hero-stack-img)] overflow-hidden rounded-t-[50%_30%] bg-brand animate-fade-up [animation-delay:150ms]",
          "lg:absolute lg:inset-y-0 lg:right-0 lg:m-0 lg:h-auto lg:w-1/2 lg:rounded-none lg:animate-slide-right 2xl:w-[48%]",
          shapeDesktop[shape],
        )}
      >
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
        {shape === "fade" && (
          <div
            className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-white via-white/55 to-transparent lg:w-3/5 lg:block"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Copy */}
      <div
        className={cn(
          "container relative z-[3] order-1 flex items-center py-10 text-center lg:min-h-[inherit] lg:py-16 lg:text-left",
          size === "home" ? "lg:min-h-[var(--hero-h-home)]" : "lg:min-h-[var(--hero-h)]",
        )}
      >
        <div className="mx-auto lg:mx-0 lg:w-1/2 lg:pr-10">
          {eyebrow && <span className="eyebrow animate-fade-up [animation-delay:100ms]">{eyebrow}</span>}
          <h1 className="animate-fade-up text-[clamp(1.5rem,1rem+1.6vw,2.4rem)] font-extrabold uppercase leading-snug tracking-tight [animation-delay:200ms]">
            {title}
            {highlight && (
              <>
                <br />
                <span className="text-sky">{highlight}</span>
              </>
            )}
          </h1>
          <p className="mx-auto mb-6 mt-3.5 max-w-[34rem] animate-fade-up text-[clamp(.95rem,.9rem+.2vw,1.1rem)] [animation-delay:300ms] lg:mx-0 3xl:max-w-[40rem]">
            {description}
          </p>

          {features && (
            <ul className="mb-6 flex animate-fade-up flex-wrap justify-center gap-x-6 gap-y-4 [animation-delay:400ms] lg:justify-start">
              {features.map((f) => (
                <li key={f.label} className="flex items-center gap-2.5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-xl text-brand">{f.icon}</span>
                  <span className="text-left leading-tight">
                    <span className="block text-[.82rem] font-bold text-navy">{f.label}</span>
                    <span className="block text-[.72rem] text-muted">{f.sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}

          {children && (
            <div className="flex animate-fade-up flex-col items-center gap-3 [animation-delay:500ms] sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              {children}
            </div>
          )}
        </div>
      </div>

      {footer && <div className="relative z-[4] order-3">{footer}</div>}
    </section>
  );
}
