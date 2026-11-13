import { FaClock, FaHouseMedical, FaLaptopMedical, FaShieldHalved } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const features = [
  { icon: <FaShieldHalved />, title: "Quality Focused", sub: "Careful processes from sample to report" },
  { icon: <FaClock />, title: "Quick & Accurate", sub: "Timely reports with high accuracy" },
  { icon: <FaLaptopMedical />, title: "Modern Equipment", sub: "Up-to-date technology and automated systems" },
  { icon: <FaHouseMedical />, title: "Home Sample Collection", sub: "Safe, hygienic collection at your doorstep" },
];

export default function ChooseTanbio() {
  return (
    <section className="section" id="whychoose">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="Why TanBio" title="Why Choose" highlight="TANBIO?" />
        </Reveal>

        <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-10">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 100} className="h-full">
                <div className="card card-hover flex h-full flex-col p-6 text-center">
                  <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-white text-2xl text-brand shadow-glow">{f.icon}</span>
                  <h3 className="mb-2 text-base">{f.title}</h3>
                  <p className="text-sm">{f.sub}</p>
                </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
