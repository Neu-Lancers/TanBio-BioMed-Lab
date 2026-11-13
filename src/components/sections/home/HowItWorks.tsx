import { FaFileMedical, FaHouseMedical, FaMicroscope, FaWhatsapp } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const STEPS = [
  { icon: FaWhatsapp, title: "Book Your Test", text: "Message us on WhatsApp or call the lab and tell us which tests you need." },
  { icon: FaHouseMedical, title: "Sample Collection", text: "Visit the lab or request home sample collection at a time that suits you." },
  { icon: FaMicroscope, title: "Lab Analysis", text: "Your sample is processed carefully by our laboratory team using modern equipment." },
  { icon: FaFileMedical, title: "Get Your Reports", text: "Receive your reports promptly so you can share them with your doctor." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-sky-soft" aria-labelledby="how-title">
      <div className="container">
        <SectionHeading eyebrow="How It Works" title="Simple Steps to" highlight="Your Results" description="From booking to reports, we keep the process quick and stress-free." />

        <ol className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* connecting line (desktop) */}
          <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-0.5 bg-gradient-to-r from-brand/10 via-brand/50 to-brand/10 lg:block" />
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 120} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 grid h-16 w-16 place-items-center rounded-full bg-brand text-2xl text-white shadow-lift ring-8 ring-sky-soft">
                <Icon aria-hidden="true" />
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-cyan-glow text-xs font-bold text-navy">{i + 1}</span>
              </span>
              <h3 className="mt-5 text-lg">{title}</h3>
              <p className="mt-2 max-w-[16rem] text-sm md:text-base">{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
