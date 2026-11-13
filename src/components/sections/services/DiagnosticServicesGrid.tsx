import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES } from "@/data/services";
import ServiceCard from "./ServiceCard";

export default function DiagnosticServicesGrid() {
  return (
    <section className="section" id="diagnosticservices">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Our Diagnostic Services"
            title="Tests for Every"
            highlight="Health Need"
            description="Seven specialised departments under one roof. Open any service to see every test it includes, why it matters and how to book."
          />
        </Reveal>
        <div className="mt-8 flex flex-wrap items-stretch justify-center gap-5 md:mt-10">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.id}
              service={s}
              delay={(i % 4) * 90}
              className="w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] xl:w-[calc((100%-3.75rem)/4)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
