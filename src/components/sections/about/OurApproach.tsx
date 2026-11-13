import { FaClipboardCheck, FaFileMedical, FaSliders, FaVial } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  { icon: <FaVial />, title: "Sample Integrity", text: "Hygienic collection, correct labelling and careful handling from the moment a sample is taken." },
  { icon: <FaSliders />, title: "Calibrated Equipment", text: "Regularly maintained and calibrated analysers and instruments for consistent, repeatable results." },
  { icon: <FaClipboardCheck />, title: "Verified Results", text: "Every result is reviewed by trained professionals before it is released." },
  { icon: <FaFileMedical />, title: "Clear Reports", text: "Easy-to-read reports delivered promptly by email, WhatsApp or print." },
];

export default function OurApproach() {
  return (
    <section className="section" id="approach">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Our Approach"
            title="How We Ensure"
            highlight="Reliable Results"
            description="A simple, careful process from sample to report."
          />
        </Reveal>
        <ol className="mt-10 grid grid-cols-1 items-stretch gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4 md:mt-12">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 110} className="card card-hover relative flex h-full flex-col items-center p-6 pt-9 text-center">
              <span className="absolute -top-4 left-1/2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-brand text-small font-bold text-white shadow-card ring-4 ring-white">
                {i + 1}
              </span>
              <span className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-sky-soft text-2xl text-brand">{s.icon}</span>
              <h3 className="mb-2 text-body">{s.title}</h3>
              <p className="text-small">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
