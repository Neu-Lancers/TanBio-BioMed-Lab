import { FaClipboardCheck, FaFileLines, FaGaugeHigh, FaVialCircleCheck } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const ITEMS = [
  { icon: FaVialCircleCheck, title: "Sample integrity", text: "Careful collection, labelling and handling so your sample reaches analysis in the right condition." },
  { icon: FaGaugeHigh, title: "Calibrated analysers", text: "Modern equipment that is regularly checked so measurements stay consistent." },
  { icon: FaClipboardCheck, title: "Double-checked results", text: "Results are reviewed before release to reduce the chance of errors." },
  { icon: FaFileLines, title: "Clear digital reports", text: "Easy-to-read reports you can share with your doctor straight away." },
];

export default function LabTechnology() {
  return (
    <section id="technology" className="section bg-sky-soft/50" aria-label="Quality and technology">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Quality In Every Step"
            title="Technology and care behind"
            highlight="every report"
            description="Reliable results come from a careful process — from the moment you walk in to the moment you receive your report."
          />
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 80}>
              <article className="card card-hover group relative h-full overflow-hidden p-7">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-4 select-none text-[6.5rem] font-extrabold leading-none text-brand/[.06] transition-all duration-700 ease-out group-hover:-translate-y-1 group-hover:text-sky/20"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-brand text-2xl text-white transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-3">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="relative text-lg font-extrabold">{title}</h3>
                <p className="relative mt-2 text-sm">{text}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
