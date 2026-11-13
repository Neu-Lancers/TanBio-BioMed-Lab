import aboutGirl from "@/assets/images/about-girl.webp";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AboutIntro() {
  return (
    <section className="section" id="about">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative">
            <span className="absolute -bottom-3 -left-3 h-full w-full rounded-2xl border-2 border-sky/40" aria-hidden="true" />
            <img
              src={aboutGirl}
              alt="Laboratory scientist at work"
              width={800}
              height={900}
              loading="lazy"
              decoding="async"
              className="relative aspect-[4/4.5] w-full rounded-2xl object-cover shadow-lift"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading align="left" eyebrow="Our Story" title="Delivering Excellence in" highlight="Diagnostics" />
          </Reveal>
          <Reveal delay={100} className="mt-5 space-y-4">
            <p>
              Established with a vision to improve diagnostic healthcare in our community, TANBIO Biomed Genomics Laboratory is
              built around accurate, dependable medical testing.
            </p>
            <p>
              We combine modern equipment, quality systems and skilled professionals to deliver precise results that help doctors
              treat better and patients live healthier lives.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
