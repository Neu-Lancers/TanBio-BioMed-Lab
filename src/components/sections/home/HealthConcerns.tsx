import type { IconType } from "react-icons";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBacterium, FaDna, FaDroplet, FaFlask, FaHeartPulse, FaRibbon, FaSun, FaVirus } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

type Concern = { icon: IconType; title: string; text: string; to: string; color: string; bg: string };

const CONCERNS: Concern[] = [
  { icon: FaDroplet, title: "Diabetes", text: "Blood sugar, HbA1c and related screening.", to: "/tests/biochemistry-tests", color: "#e53935", bg: "rgba(229,57,53,.10)" },
  { icon: FaDna, title: "Thyroid", text: "T3, T4 and TSH to check thyroid function.", to: "/tests/hormone-tests", color: "#7c3aed", bg: "rgba(124,58,237,.10)" },
  { icon: FaHeartPulse, title: "Heart & Cholesterol", text: "Lipid profile and cardiovascular risk markers.", to: "/tests/biochemistry-tests", color: "#ef4444", bg: "rgba(239,68,68,.10)" },
  { icon: FaFlask, title: "Liver & Kidney", text: "Function panels and urine examination.", to: "/tests/urine-analysis", color: "#f59e0b", bg: "rgba(245,158,11,.12)" },
  { icon: FaSun, title: "Vitamin Deficiency", text: "Vitamin D, B12 and other nutrition markers.", to: "/tests/hormone-tests", color: "#0ea5e9", bg: "rgba(14,165,233,.12)" },
  { icon: FaVirus, title: "Fever & Infection", text: "Blood counts and serology for common infections.", to: "/tests/serology-tests", color: "#8b5cf6", bg: "rgba(139,92,246,.10)" },
  { icon: FaBacterium, title: "Fertility & Hormones", text: "Reproductive hormone and semen analysis.", to: "/tests/hormone-tests", color: "#ec4899", bg: "rgba(236,72,153,.10)" },
  { icon: FaRibbon, title: "Cancer Screening", text: "Tumour marker panels for early screening.", to: "/tests/cancer-analysis", color: "#db2777", bg: "rgba(219,39,119,.10)" },
];

export default function HealthConcerns() {
  return (
    <section id="health-concerns" className="section bg-white" aria-label="Health concerns">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Find Your Test"
            title="Find the right test for your"
            highlight="health concern"
            description="Not sure where to start? Pick what you want to check and we will show the relevant tests."
          />
        </Reveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {CONCERNS.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal as="li" key={c.title} delay={(i % 4) * 70} className="h-full">
                <Link to={c.to} className="card card-hover group relative flex h-full flex-col overflow-hidden p-6 focus-visible:outline-brand before:absolute before:inset-x-0 before:bottom-0 before:h-1 before:origin-left before:scale-x-0 before:bg-gradient-to-r before:from-brand before:to-cyan-glow before:transition-transform before:duration-500 hover:before:scale-x-100">
                  <span
                    className="mb-5 grid h-14 w-14 place-items-center rounded-2xl text-2xl transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110"
                    style={{ background: c.bg, color: c.color }}
                  >
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-extrabold">{c.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm">{c.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand transition-all duration-300 group-hover:gap-3">
                    View tests <FaArrowRight aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
