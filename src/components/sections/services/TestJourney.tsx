import { FaCalendarCheck, FaFileMedical, FaMicroscope, FaVial } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  { icon: <FaCalendarCheck />, title: "Book your test", text: "Call, WhatsApp or use the booking form. Tell us which tests you need." },
  { icon: <FaVial />, title: "Give your sample", text: "Visit the lab or request home collection. Quick, hygienic and comfortable." },
  { icon: <FaMicroscope />, title: "We analyse it", text: "Your sample is tested carefully and results are reviewed before release." },
  { icon: <FaFileMedical />, title: "Receive your report", text: "Get a clear report by email or WhatsApp, or collect a printed copy." },
];

export default function TestJourney() {
  return (
    <section className="section" id="journey">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="Your Journey" title="How Your Test" highlight="Works" description="Four simple steps from booking to report." />
        </Reveal>
        <ol className="relative mt-10 grid items-stretch gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 md:mt-12">
          <span
            className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent lg:block"
            aria-hidden="true"
          />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 110} className="relative text-center">
              <span className="relative z-[1] mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-white text-2xl text-brand shadow-glow">
                {s.icon}
              </span>
              <span className="mb-2 block font-mono text-[.7rem] font-semibold uppercase tracking-[.2em] text-brand/70">
                Step {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 text-lg">{s.title}</h3>
              <p className="mx-auto max-w-[16rem] text-sm">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
