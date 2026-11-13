import { FaCircleCheck, FaRegClock, FaShieldHalved, FaUserGroup } from "react-icons/fa6";
import serviceHero from "@/assets/images/service-hero.webp";
import ChooseTanbio from "@/components/sections/services/ChooseTanbio";
import DiagnosticServicesGrid from "@/components/sections/services/DiagnosticServicesGrid";
import Hero from "@/components/ui/Hero";
import Seo from "@/components/ui/Seo";
import { SERVICES } from "@/data/services";
import { SITE } from "@/lib/site";

const TITLE = "Diagnostic Services & Lab Tests in Thiruvarur | TanBio";
const DESCRIPTION =
  "Explore hematology, biochemistry, serology, hormone, microbiology, urine and cancer screening tests at TanBio BioMed Genomics Laboratory, Thiruvarur.";

export default function ServicesPage() {
  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        path="/services"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Diagnostic services at TanBio BioMed Genomics Laboratory",
          itemListElement: SERVICES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.title,
            url: `${SITE.url}/tests/${s.slug}`,
          })),
        }}
      />

      <Hero
        shape="fade"
        eyebrow="Our Services"
        title="Comprehensive Diagnostic"
        highlight="Solutions Under One Roof"
        description="From routine blood tests to advanced genomic analysis, we provide accurate, reliable and timely results for better healthcare."
        image={serviceHero}
        imageAlt="TANBIO diagnostic services"
        features={[
          { icon: <FaCircleCheck />, label: "Accurate", sub: "Results" },
          { icon: <FaRegClock />, label: "Quick", sub: "Turnaround" },
          { icon: <FaShieldHalved />, label: "Safe &", sub: "Reliable" },
          { icon: <FaUserGroup />, label: "Expert", sub: "Professionals" },
        ]}
      />

      <DiagnosticServicesGrid />
      <ChooseTanbio />
    </>
  );
}
