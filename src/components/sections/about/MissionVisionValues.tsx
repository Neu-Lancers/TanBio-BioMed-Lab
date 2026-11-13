import { FaBullseye, FaCircleCheck, FaEye, FaGem } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt3D from "@/components/ui/Tilt3D";

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
        <div className="mt-12 grid gap-6 md:grid-cols-3 3xl:gap-8">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 120} className="h-full">
              <Tilt3D max={6} rest={{ x: 0, y: 0 }} className="h-full">
                <div className="card card-hover relative h-full overflow-hidden p-8">
                  <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/5" aria-hidden="true" />
                  <span className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-brand text-2xl text-white shadow-[0_12px_24px_-10px_rgba(10,54,200,.7)]">{c.icon}</span>
                  <span className="mb-2 block font-mono text-[.7rem] font-semibold uppercase tracking-[.2em] text-brand/70">{c.tag}</span>
                  <h3 className="mb-3 text-xl">{c.title}</h3>
                  <div className="text-[.95rem] leading-relaxed">{c.body}</div>
                </div>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
