import type { ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number; // ms
  className?: string;
};

/** Scroll-reveal wrapper: GPU-only fade/slide, runs once, respects reduced motion (see index.css). */
export default function Reveal({ children, as: Tag = "div", delay = 0, className }: Props) {
  const { ref, inView } = useInView();
  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", inView && "reveal-in", className)}
    >
      {children}
    </Tag>
  );
}
