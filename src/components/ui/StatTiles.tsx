import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

export type Stat = {
  /** numeric part, animated */
  value: number;
  /** text after the number, e.g. "+" or " hrs" */
  suffix?: string;
  /** small unit shown after the number (e.g. "Billion") */
  unit?: string;
  label: string;
  /** decimals to show while counting (default 0) */
  decimals?: number;
};

function Count({ to, decimals = 0, run }: { to: number; decimals?: number; run: boolean }) {
  const reduced = useReducedMotion();
  const [v, setV] = useState(reduced ? to : 0);
  const raf = useRef(0);
  useEffect(() => {
    if (!run) return;
    if (reduced) {
      setV(to);
      return;
    }
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setV(to * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [run, to, reduced]);
  return <>{v.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</>;
}

type Props = {
  title?: string;
  stats: Stat[];
  className?: string;
};

/**
 * Full-width royal-blue band with a heading and white metric tiles that have a cyan glow border
 * (the "metrics" block). Counts up once when scrolled into view.
 */
export default function StatTiles({ title, stats, className }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  return (
    <section ref={ref} className={cn("relative overflow-hidden bg-brand py-14 md:py-16 3xl:py-20", className)}>
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-glow/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <div className="container relative">
        {title && <h2 className="mb-9 text-center text-[clamp(1.5rem,1rem+1.8vw,2.4rem)] font-extrabold tracking-tight text-white">{title}</h2>}
        <ul className={cn("grid gap-4 md:gap-5", stats.length >= 5 ? "grid-cols-2 lg:grid-cols-5" : "grid-cols-2 lg:grid-cols-4")}>
          {stats.map((s, i) => (
            <li
              key={s.label}
              style={{ transitionDelay: `${i * 90}ms` }}
              className={cn(
                "rounded-3xl bg-white px-4 py-6 text-center shadow-glow transition-all duration-700 ease-out hover:-translate-y-1.5",
                stats.length % 2 === 1 && i === stats.length - 1 && "col-span-2 lg:col-span-1",
                inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
            >
              <p className="text-[clamp(1.6rem,1.1rem+1.6vw,2.6rem)] font-extrabold leading-none tracking-tight text-brand">
                <Count to={s.value} decimals={s.decimals} run={inView} />
                {s.suffix}
                {s.unit && <span className="ml-1.5 text-[0.4em] font-semibold">{s.unit}</span>}
              </p>
              <p className="mt-2.5 text-[0.85rem] font-medium text-brand/80">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
