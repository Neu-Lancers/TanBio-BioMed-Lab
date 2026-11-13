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
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-8">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} delay={(i % 4) * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
