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
  /** floating 3D element (e.g. <ReportMockup/>). lg+: breaks out of the frame. Below lg: sits in flow, overlapping only the photo's lower edge. */
  floating?: ReactNode;
  /** flip: copy on the left, image on the right (lg+) */
  reverse?: boolean;
  className?: string;
};

/**
 * Split banner: rounded photo + royal-blue copy panel, with an optional floating 3D mockup.
 * - lg+: photo | panel side by side, mockup overflows the photo's bottom edge without covering copy.
 * - < lg: photo, then the blue panel; the mockup is centred in normal flow, overlapping just the
 *   photo's bottom edge (never the text), so nothing is clipped or overflows at any width.
 */
export default function FeatureBanner({ image, imageAlt, title, description, children, floating, reverse, className }: Props) {
  return (
    <Reveal className={cn("container", className)}>
      <div className={cn("relative grid items-stretch lg:grid-cols-[1.35fr_1fr]", floating ? "lg:pb-16" : "")}>
        {/* photo */}
        <div
          className={cn(
            "relative z-[1] aspect-[16/10] overflow-hidden rounded-t-[2rem] sm:aspect-[2/1] lg:aspect-auto lg:min-h-[380px] lg:rounded-l-[2rem] lg:rounded-tr-none",
            reverse && "lg:order-2 lg:rounded-l-none lg:rounded-r-[2rem]",
          )}
        >
          <img src={image} alt={imageAlt} loading="lazy" decoding="async" width={1400} height={800} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-navy/30 via-transparent to-transparent" aria-hidden="true" />
        </div>

        {/* blue panel (no z-index here so the in-flow mockup can overlap the photo edge) */}
        <div
          className={cn(
            "relative flex flex-col justify-center rounded-b-[2rem] bg-brand px-6 pb-9 pt-8 text-white sm:px-10 sm:pb-10 lg:rounded-b-none lg:rounded-r-[2rem] lg:py-12 lg:pl-20 lg:pr-12",
            reverse && "lg:order-1 lg:rounded-l-[2rem] lg:rounded-r-none lg:pl-12 lg:pr-20",
          )}
        >
          {/* < lg: mockup in flow */}
          {floating && (
            <div className="relative z-[2] mx-auto -mt-[18%] mb-7 w-[min(100%,28rem)] sm:-mt-[12%] sm:mb-8 lg:hidden">{floating}</div>
          )}

          <h3 className="text-h2 text-white">{title}</h3>
          <span className="divider-glow my-5" aria-hidden="true" />
          <p className="max-w-md text-lead text-white/80">{description}</p>
          {children && <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{children}</div>}
        </div>

        {/* lg+: floating 3D piece that breaks out of the frame */}
        {floating && (
          <div
            className={cn(
              "pointer-events-none absolute bottom-0 z-[2] hidden w-[36%] max-w-[600px] lg:block",
              reverse ? "right-[23%]" : "left-[23%]",
            )}
          >
            {floating}
          </div>
        )}
      </div>
    </Reveal>
  );
}
