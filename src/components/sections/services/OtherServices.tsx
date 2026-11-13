import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES } from "@/data/services";
import ServiceCard from "./ServiceCard";

export default function OtherServices({ currentId }: { currentId: number }) {
  const others = SERVICES.filter((s) => s.id !== currentId);
  return (
    <section className="section bg-sky-soft/60">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="Explore More" title="Other Diagnostic" highlight="Services" />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {others.map((s, i) => (
            <ServiceCard key={s.id} service={s} compact delay={(i % 3) * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
