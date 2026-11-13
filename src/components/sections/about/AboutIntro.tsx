import { FaCircleCheck, FaLocationDot } from "react-icons/fa6";
import aboutGirl from "@/assets/images/about-girl.webp";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const highlights = ["Modern, well-maintained equipment", "Skilled laboratory professionals", "Accurate, dependable reports", "Patient-first, friendly service"];

export default function AboutIntro() {
  return (
    <section className="section" id="about">
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16 3xl:gap-24">
        {/* Image: fixed aspect so it never out-grows the copy */}
        <Reveal className="mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative pb-4 pl-4 sm:pb-5 sm:pl-5">
            <span className="absolute bottom-0 left-0 right-6 top-6 rounded-3xl border-2 border-brand/25" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-3xl shadow-lift">
              <img
                src={aboutGirl}
                alt="Laboratory scientist at work"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover object-top transition-transform duration-[1200ms] ease-out hover:scale-105 lg:max-h-[460px] 3xl:max-h-[560px]"
              />
            </div>
            <div className="absolute -bottom-1 right-3 flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-lift sm:right-0 sm:translate-x-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
                <FaLocationDot aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-bold text-navy">Thiruvarur</span>
                <span className="block text-xs text-muted">Tamil Nadu</span>
              </span>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading align="left" eyebrow="Our Story" title="Delivering Excellence in" highlight="Diagnostics" />
          </Reveal>
          <Reveal delay={100} className="mt-5 space-y-4">
            <p>
              Established with a vision to improve diagnostic healthcare in our community, TANBIO Biomed Genomics Laboratory is built
              around accurate, dependable medical testing.
            </p>
            <p>
              We combine modern equipment, quality systems and skilled professionals to deliver precise results that help doctors treat
              better and patients live healthier lives.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <ul className="mt-7 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-[.95rem] font-medium text-navy">
                  <FaCircleCheck className="mt-1 shrink-0 text-brand" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button to="/services" arrow>Explore Our Services</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
