import { FaBullseye, FaCircleCheck, FaEye, FaGem } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const values = ["Accuracy & Reliability", "Compassion & Care", "Integrity & Transparency", "Innovation & Excellence"];

export default function MissionVisionValues() {
  const cards = [
    {
      icon: <FaBullseye />,
      tag: "01 · Mission",
      title: "Our Mission",
      body: (
        <p>
          To provide accurate, reliable and affordable diagnostic services using advanced technology while maintaining the highest
          standards of quality and ethical practice.
        </p>
      ),
    },
    {
      icon: <FaEye />,
      tag: "02 · Vision",
      title: "Our Vision",
      body: (
        <p>
          To be a diagnostic laboratory recognised for excellence, innovation and its contribution to better healthcare for every
          individual.
        </p>
      ),
    },
    {
      icon: <FaGem />,
      tag: "03 · Values",
      title: "Our Values",
      body: (
        <ul className="space-y-2">
          {values.map((v) => (
            <li key={v} className="flex items-center gap-2.5">
              <FaCircleCheck className="shrink-0 text-brand" aria-hidden="true" />
              {v}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section className="section bg-sky-soft/70" id="mission">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="What Drives Us" title="Purpose, Direction &" highlight="Principles" />
        </Reveal>
        <div className="mt-8 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-10">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 120} className={cn("h-full", i === 2 && "sm:col-span-2 lg:col-span-1")}>
                <div className="card card-hover relative flex h-full flex-col overflow-hidden p-7">
                  <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/5" aria-hidden="true" />
                  <span className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-brand text-2xl text-white shadow-[0_12px_24px_-10px_rgba(10,54,200,.7)]">{c.icon}</span>
                  <span className="mb-2 block font-mono text-caption font-semibold uppercase tracking-[.2em] text-brand/70">{c.tag}</span>
                  <h3 className="mb-3 text-h3">{c.title}</h3>
                  <div className="text-body leading-relaxed">{c.body}</div>
                </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
