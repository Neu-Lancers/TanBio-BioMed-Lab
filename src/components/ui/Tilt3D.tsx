import { useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** max tilt in degrees (default 9) */
  max?: number;
  /** resting rotation so the element already looks 3D before hover */
  rest?: { x?: number; y?: number; z?: number };
  style?: CSSProperties;
};

/**
 * Pointer-driven 3D tilt (perspective + rotateX/Y). Pure transform, rAF-throttled,
 * disabled for touch / reduced-motion. Children can use `translate-z-*` via inline style.
 */
export default function Tilt3D({ children, className, max = 9, rest = { x: 6, y: -12, z: 0 }, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const base = `rotateX(${rest.x ?? 0}deg) rotateY(${rest.y ?? 0}deg) rotateZ(${rest.z ?? 0}deg)`;

  const apply = (t: string) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      if (ref.current) ref.current.style.transform = t;
    });
  };

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    apply(`rotateX(${(rest.x ?? 0) - py * max}deg) rotateY(${(rest.y ?? 0) + px * max * 1.4}deg) rotateZ(${rest.z ?? 0}deg) translateZ(14px)`);
  };

  return (
    <div className={cn("[perspective:1400px]", className)} onPointerMove={onMove} onPointerLeave={() => apply(base)}>
      <div
        ref={ref}
        className="transition-transform duration-500 ease-out [transform-style:preserve-3d] will-change-transform motion-reduce:!transform-none"
        style={{ transform: base, ...style }}
      >
        {children}
      </div>
    </div>
  );
}
