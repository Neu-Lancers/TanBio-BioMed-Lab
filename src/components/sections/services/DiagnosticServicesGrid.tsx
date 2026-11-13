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
            title="Tests Across Every"
            highlight="Specialty"
            description="Choose a service to see every test included."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} delay={(i % 4) * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
