import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Props = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  /** buttons / links under the copy */
  children?: ReactNode;
  /** floating 3D element that overflows the image's bottom-right edge (e.g. <ReportMockup/>) */
  floating?: ReactNode;
  /** flip: copy on the left, image on the right */
  reverse?: boolean;
  className?: string;
};

/**
 * Split banner: rounded photo on one side, royal-blue panel on the other, with an optional
 * floating 3D mockup that breaks out of the frame (overflows the bottom edge).
 */
export default function FeatureBanner({ image, imageAlt, title, description, children, floating, reverse, className }: Props) {
  return (
    <Reveal className={cn("container", className)}>
      <div className={cn("relative grid items-stretch lg:grid-cols-[1.35fr_1fr]", floating ? "pb-24 lg:pb-16" : "")}>
        {/* photo */}
        <div
          className={cn(
            "relative z-[1] min-h-[260px] overflow-hidden rounded-t-[2rem] lg:min-h-[360px] lg:rounded-l-[2rem] lg:rounded-tr-none",
            reverse && "lg:order-2 lg:rounded-l-none lg:rounded-r-[2rem]",
          )}
        >
          <img src={image} alt={imageAlt} loading="lazy" decoding="async" width={1400} height={800} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-navy/30 via-transparent to-transparent" aria-hidden="true" />
        </div>

        {/* blue panel */}
        <div
          className={cn(
            "relative z-[0] flex flex-col justify-center rounded-b-[2rem] bg-brand px-7 py-10 text-white sm:px-10 lg:rounded-b-none lg:rounded-r-[2rem] lg:px-12 lg:pl-24",
            reverse && "lg:order-1 lg:rounded-l-[2rem] lg:rounded-r-none lg:pl-12 lg:pr-24",
          )}
        >
          <h3 className="text-[clamp(1.6rem,1.1rem+1.8vw,2.7rem)] font-extrabold leading-[1.1] tracking-tight text-white">{title}</h3>
          <span className="divider-glow my-5" aria-hidden="true" />
          <p className="max-w-md text-[1.02rem] leading-relaxed text-white/80">{description}</p>
          {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
        </div>

        {/* floating 3D piece */}
        {floating && (
          <div
            className={cn(
              "pointer-events-none absolute bottom-0 z-[2] w-[78%] max-w-[560px] sm:w-[62%] lg:w-[46%]",
              reverse ? "right-[6%] lg:right-[8%]" : "left-[10%] sm:left-[16%] lg:left-[30%]",
            )}
          >
            {floating}
          </div>
        )}
      </div>
    </Reveal>
  );
}
