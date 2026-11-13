import { useCallback, useEffect, useRef, useState } from "react";
import { FaCheck, FaFileMedical, FaHouseMedical, FaMicroscope, FaWhatsapp } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const STEPS = [
  { icon: FaWhatsapp, title: "Book Your Test", text: "Message us on WhatsApp or call the lab and tell us which tests you need. We confirm a suitable time and share any preparation instructions." },
  { icon: FaHouseMedical, title: "Sample Collection", text: "Visit the lab or request home sample collection at a time that suits you. Our trained team handles every sample with care." },
  { icon: FaMicroscope, title: "Lab Analysis", text: "Your sample is processed carefully by our laboratory team using modern, regularly calibrated equipment." },
  { icon: FaFileMedical, title: "Get Your Reports", text: "Receive your reports promptly by email or WhatsApp, ready to share with your doctor." },
];

const N = STEPS.length;
const VH_PER_STEP = 0.55; // scroll distance per step, in viewport heights

const navHeight = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 72;

export default function HowItWorks() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);
  const geo = useRef({ pin: 72, travel: 0 });

  const [active, setActive] = useState(0);
  const [stageH, setStageH] = useState(0);
  const [pinTop, setPinTop] = useState(72);
  const [travel, setTravel] = useState(0);
  const activeRef = useRef(0);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const h = stage.offsetHeight;
    const pin = Math.max(navHeight(), Math.round((window.innerHeight - h) / 2));
    const t = Math.round(N * VH_PER_STEP * window.innerHeight);
    geo.current = { pin, travel: t };
    setStageH(h);
    setPinTop(pin);
    setTravel(t);
  }, []);

  useEffect(() => {
    if (reduced) return;
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, reduced]);

  /* scroll → progress (Lenis already smooths scrolling, so no extra easing here) */
  useEffect(() => {
    if (reduced) return;
    const frame = () => {
      raf.current = 0;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const { pin, travel: t } = geo.current;
      const start = wrap.getBoundingClientRect().top + window.scrollY - pin;
      const p = Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, t)));
      const idx = Math.min(N - 1, Math.floor(p * N));
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${Math.min(1, (p * N) / (N - 1))})`;
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }
    };
    const kick = () => {
      if (!raf.current) raf.current = requestAnimationFrame(frame);
    };
    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [reduced, travel, pinTop]);

  const heading = (
    <SectionHeading eyebrow="How It Works" title="Simple Steps to" highlight="Your Results" description="From booking to reports — scroll to follow each step." />
  );

  /* reduced motion: everything visible, no pinning */
  if (reduced) {
    return (
      <section id="how-it-works" className="section bg-sky-soft" aria-labelledby="how-title">
        <div className="container">
          {heading}
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="card flex h-full flex-col p-6">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-lg text-white">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg">
                  {i + 1}. {title}
                </h3>
                <p className="mt-2 text-sm">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  const Active = STEPS[active];

  return (
    <section id="how-it-works" className="relative bg-sky-soft" aria-label="How it works">
      {/* runway = stage + (steps × 55vh) of scrolling that drives the steps */}
      <div ref={wrapRef} style={{ height: stageH + travel }} className="relative">
        <div ref={stageRef} style={{ top: pinTop }} className="sticky py-8 md:py-10">
          <div className="container">
            <Reveal>{heading}</Reveal>

            {/* stepper */}
            <div className="relative mx-auto mt-8 max-w-3xl md:mt-10">
              <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-7 h-1 -translate-y-1/2 rounded-full bg-brand/15 md:top-8" />
              <span
                ref={fillRef}
                aria-hidden="true"
                style={{ transform: "scaleX(0)" }}
                className="absolute left-[12.5%] right-[12.5%] top-7 h-1 origin-left -translate-y-1/2 rounded-full bg-gradient-to-r from-brand to-cyan-glow will-change-transform md:top-8"
              />
              <ol className="relative grid grid-cols-4">
                {STEPS.map(({ icon: Icon, title }, i) => {
                  const done = i < active;
                  const on = i === active;
                  return (
                    <li key={title} className="flex flex-col items-center text-center">
                      <span
                        className={cn(
                          "relative grid h-14 w-14 place-items-center rounded-full text-xl ring-8 ring-sky-soft transition-all duration-500 ease-out md:h-16 md:w-16 md:text-2xl",
                          on && "scale-110 bg-brand text-white shadow-glow",
                          done && "bg-brand text-white",
                          !on && !done && "bg-white text-brand/40 shadow-card",
                        )}
                      >
                        {done ? <FaCheck aria-hidden="true" /> : <Icon aria-hidden="true" />}
                      </span>
                      <span
                        className={cn(
                          "mt-3 hidden text-sm font-bold transition-colors duration-500 sm:block md:text-base",
                          on || done ? "text-navy" : "text-navy/40",
                        )}
                      >
                        {title}
                      </span>
                      <span className={cn("mt-2 text-[0.7rem] font-bold transition-colors duration-500 sm:hidden", on || done ? "text-navy" : "text-navy/40")}>
                        {i + 1}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* detail cards — stacked in one grid cell so the box height never jumps */}
            <div className="mx-auto mt-8 grid max-w-3xl md:mt-10" aria-live="polite">
              {STEPS.map(({ icon: Icon, title, text }, i) => (
                <article
                  key={title}
                  aria-hidden={i !== active}
                  className={cn(
                    "card col-start-1 row-start-1 flex items-center gap-5 p-6 transition-all duration-700 ease-out md:gap-7 md:p-8",
                    i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
                  )}
                >
                  <span className="hidden h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand text-3xl text-white shadow-lift xs:grid md:h-20 md:w-20">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                      Step {i + 1} of {N}
                    </p>
                    <h3 className="mt-1 text-xl md:text-2xl">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed md:text-base">{text}</p>
                  </div>
                </article>
              ))}
            </div>
            <span className="sr-only">Current step: {Active.title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
