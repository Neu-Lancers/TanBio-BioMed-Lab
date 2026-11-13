import { FaAward, FaCircleCheck, FaClockRotateLeft, FaHouseMedical, FaIndianRupeeSign, FaMicroscope } from "react-icons/fa6";

import microscope from "@/assets/images/microscope.webp";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const REASONS = [
  "Strict Quality Control",
  "Advanced Technology",
  "Experienced Pathologists",
  "Affordable Pricing",
  "Quick & Accurate Reports",
  "Patient-Centric Approach",
];

const BENEFITS = [
  { icon: FaClockRotateLeft, title: "24-hour Reports", text: "Most routine results are ready within a day." },
  { icon: FaHouseMedical, title: "Home Collection", text: "Hygienic sample pickup at your doorstep." },
  { icon: FaIndianRupeeSign, title: "Transparent Pricing", text: "Clear package rates with no hidden charges." },
  { icon: FaMicroscope, title: "Modern Equipment", text: "Precise analysis on up-to-date technology." },
];

export default function WhyChoose() {
  return (
    <section className="section bg-sky-soft" aria-label="Why choose TanBio">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Why Choose TanBio?"
            title="Diagnostics You Can"
            highlight="Trust"
            description="Accuracy, speed and care at every step — from sample collection to your final report."
          />
        </Reveal>

        <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-2 3xl:gap-10">
          {/* Reasons card */}
          <Reveal className="relative isolate min-h-[22rem] overflow-hidden rounded-[2rem] bg-brand shadow-lift">
            <img
              src={microscope}
              alt=""
              width={1000}
              height={1498}
              loading="lazy"
              decoding="async"
              className="absolute inset-y-0 right-0 -z-10 h-full w-3/5 object-cover object-center opacity-70"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand via-brand/90 to-transparent" aria-hidden="true" />
            <div className="p-7 sm:p-10">
              <span className="eyebrow !border-white/25 !bg-white/10 !text-white">Our Promise</span>
              <ul className="space-y-3.5">
                {REASONS.map((r) => (
                  <li key={r} className="flex items-center gap-3 text-base font-semibold text-white sm:text-lg">
                    <FaCircleCheck className="shrink-0 text-cyan-glow" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/85">
                <FaAward className="text-cyan-glow" aria-hidden="true" /> Care-first diagnostics in Thiruvarur
              </p>
            </div>
          </Reveal>

          {/* Benefits grid */}
          <div className="grid auto-rows-fr gap-4 xs:grid-cols-2">
            {BENEFITS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 90} className="card card-hover group flex h-full flex-col p-6">
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-xl text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="text-base font-extrabold">{title}</h3>
                <p className="mt-1.5 text-sm">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
