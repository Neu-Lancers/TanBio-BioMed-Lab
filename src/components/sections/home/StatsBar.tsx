import { useEffect, useState } from "react";
import { FaAward, FaClock, FaUsers, FaVials } from "react-icons/fa6";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STATS = [
  { icon: FaUsers, num: 5000, suffix: "+", label: "Happy Patients" },
  { icon: FaVials, num: 150, suffix: "+", label: "Diagnostic Tests" },
  { icon: FaAward, num: 10, suffix: "+", label: "Years of Excellence" },
  { icon: FaClock, num: 24, suffix: " hrs", label: "Quick Report Delivery" },
];

function Counter({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3)))); // ease-out cubic
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, reduced]);

  return (
    <span className="tabular-nums">
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <div ref={ref} className="border-t border-line bg-white/90 backdrop-blur">
      <div className="container grid grid-cols-2 gap-y-6 py-6 lg:grid-cols-4 3xl:py-8">
        {STATS.map(({ icon: Icon, num, suffix, label }) => (
          <div key={label} className="flex items-center justify-center gap-3 lg:justify-start">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 text-lg text-brand">
              <Icon aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <div className="text-xl font-extrabold text-navy md:text-2xl">
                <Counter target={num} suffix={suffix} started={inView} />
              </div>
              <div className="text-xs text-muted md:text-sm">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
