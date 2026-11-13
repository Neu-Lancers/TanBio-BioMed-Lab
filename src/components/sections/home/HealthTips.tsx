import { useState } from "react";
import { FaChevronDown, FaRegClock } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type Tip = { category: string; title: string; summary: string; minutes: number; body: string[] };

const TIPS: Tip[] = [
  {
    category: "Preparation",
    title: "How to prepare for a fasting blood test",
    summary: "A few simple steps help your results reflect your true levels.",
    minutes: 2,
    body: [
      "Fasting usually means no food or drinks except plain water for 8–12 hours before sampling. Follow the timing your doctor or the lab advises for your specific test.",
      "Drink water as normal — staying hydrated makes sample collection easier. Avoid tea, coffee, juices and chewing gum during the fast.",
      "Do not stop regular medicines unless your doctor tells you to. Mention any medicines or supplements you take when you visit.",
    ],
  },
  {
    category: "Prevention",
    title: "Why annual health checkups matter",
    summary: "Many conditions develop quietly — routine screening helps catch them early.",
    minutes: 2,
    body: [
      "Conditions such as diabetes, high cholesterol and thyroid imbalance often show no early symptoms. A routine checkup can reveal changes before they cause problems.",
      "Keeping your reports from year to year helps your doctor spot trends, not just single readings.",
      "Which tests suit you depends on your age, family history and lifestyle — your doctor can guide you on that.",
    ],
  },
  {
    category: "Understanding Results",
    title: "Understanding your thyroid profile",
    summary: "What T3, T4 and TSH tell your doctor about your thyroid.",
    minutes: 3,
    body: [
      "The thyroid gland helps regulate energy and metabolism. A thyroid profile usually measures TSH, T3 and T4 together.",
      "TSH comes from the pituitary gland and signals how hard the thyroid is being asked to work. T3 and T4 are the hormones the thyroid itself produces.",
      "Reference ranges can vary between laboratories, so always discuss your results with your doctor rather than interpreting a single number on its own.",
    ],
  },
];

function TipCard({ tip, index }: { tip: Tip; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `tip-panel-${index}`;
  return (
    <article className="card card-hover flex h-full flex-col p-7 sm:p-8">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="rounded-full border border-brand/15 bg-sky-soft px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand">{tip.category}</span>
        <span className="inline-flex items-center gap-1.5 text-muted">
          <FaRegClock aria-hidden="true" /> {tip.minutes} min read
        </span>
      </div>
      <h3 className="mt-5 text-xl font-extrabold leading-snug">{tip.title}</h3>
      <p className="mt-2 text-sm">{tip.summary}</p>

      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 pt-4 text-sm">
            {tip.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="rounded-lg bg-sky-soft/70 p-3 text-xs text-navy">
              This is general information, not medical advice. Please consult your doctor for guidance on your health.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-brand transition-colors hover:text-navy"
      >
        {open ? "Show less" : "Read more"}
        <FaChevronDown className={cn("transition-transform duration-500 ease-out", open && "rotate-180")} aria-hidden="true" />
      </button>
    </article>
  );
}

export default function HealthTips() {
  return (
    <section id="health-tips" className="section bg-white" aria-label="Health tips">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Health Tips"
            title="Helpful reads for a"
            highlight="healthier you"
            description="Short, practical guides from our lab team to help you get the most from your tests."
          />
        </Reveal>
        <div className="mt-12 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TIPS.map((tip, i) => (
            <Reveal key={tip.title} delay={i * 80}>
              <TipCard tip={tip} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
