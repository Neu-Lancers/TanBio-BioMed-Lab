import { FaClock, FaHouseMedical, FaLaptopMedical, FaShieldHalved, FaWhatsapp } from "react-icons/fa6";
import chooseImg from "@/assets/images/choose-image.webp";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { whatsappUrl } from "@/lib/site";

const features = [
  { icon: <FaShieldHalved />, title: "Quality Focused", sub: "Careful processes from sample to report" },
  { icon: <FaClock />, title: "Quick & Accurate", sub: "Timely reports with high accuracy" },
  { icon: <FaLaptopMedical />, title: "Modern Equipment", sub: "Up-to-date technology and automated systems" },
  { icon: <FaHouseMedical />, title: "Home Sample Collection", sub: "Safe, hygienic collection at your doorstep" },
];

export default function ChooseTanbio() {
  return (
    <section className="section bg-sky-soft/60" id="whychoose">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="Why TanBio" title="Why Choose" highlight="TANBIO?" />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 100} className="card card-hover p-6 text-center">
              <span className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full border-2 border-sky text-2xl text-sky">{f.icon}</span>
              <h3 className="mb-1 text-base">{f.title}</h3>
              <p className="text-sm">{f.sub}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 overflow-hidden rounded-2xl bg-navy text-white shadow-lift">
          <div className="grid items-center lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_auto]">
            <img
              src={chooseImg}
              alt=""
              aria-hidden="true"
              width={1000}
              height={600}
              loading="lazy"
              decoding="async"
              className="hidden h-full max-h-56 w-full object-cover lg:block"
            />
            <div className="p-7 text-center lg:text-left">
              <h3 className="mb-1 text-2xl text-white">Need a Test Done?</h3>
              <p className="text-white/80">Book your test or schedule a home collection in just a few clicks.</p>
            </div>
            <div className="flex flex-col gap-3 p-7 pt-0 sm:flex-row lg:flex-col lg:p-7">
              <Button
                variant="light"
                href={whatsappUrl("Hi, I'd like to book a test at TANBIO Biomed Genomics Laboratory. Please share the available slots.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp aria-hidden="true" /> Book a Test Now
              </Button>
              <Button
                variant="outline"
                className="!border-white !text-white hover:!bg-white hover:!text-navy"
                href={whatsappUrl("Hi, I'd like to schedule a home sample collection. Please share the available slots.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaHouseMedical aria-hidden="true" /> Schedule Collection
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
