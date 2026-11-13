import { FaBullseye, FaCircleCheck, FaEye, FaGem } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";

const values = ["Accuracy & Reliability", "Compassion & Care", "Integrity & Transparency", "Innovation & Excellence"];

export default function MissionVisionValues() {
  const cards = [
    {
      icon: <FaBullseye />,
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
      title: "Our Values",
      body: (
        <ul className="space-y-1.5">
          {values.map((v) => (
            <li key={v} className="flex items-center gap-2">
              <FaCircleCheck className="shrink-0 text-sky" aria-hidden="true" />
              {v}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section className="section bg-sky-soft/60" id="mission">
      <div className="container grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 120} className="card card-hover p-7 text-center md:text-left">
            <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-brand text-2xl text-white md:mx-0">{c.icon}</span>
            <h3 className="mb-2 text-lg uppercase tracking-wide">{c.title}</h3>
            <div className="text-[.95rem]">{c.body}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
