import { FaCircleCheck, FaRegClock, FaShieldHalved } from "react-icons/fa6";
import chooseImg from "@/assets/images/choose-image.webp";
import serviceHero from "@/assets/images/service-hero.webp";
import { useBooking } from "@/components/booking/BookingProvider";
import ChooseTanbio from "@/components/sections/services/ChooseTanbio";
import DiagnosticServicesGrid from "@/components/sections/services/DiagnosticServicesGrid";
import HomeCollectionInfo from "@/components/sections/services/HomeCollectionInfo";
import SamplePrep from "@/components/sections/services/SamplePrep";
import TestJourney from "@/components/sections/services/TestJourney";
import TestsFaq from "@/components/sections/services/TestsFaq";
import Button from "@/components/ui/Button";
import FeatureBanner from "@/components/ui/FeatureBanner";
import Hero from "@/components/ui/Hero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ReportMockup from "@/components/ui/ReportMockup";
import Seo from "@/components/ui/Seo";
import StatTiles from "@/components/ui/StatTiles";
import { SERVICES } from "@/data/services";
import { SITE } from "@/lib/site";

const TITLE = "Diagnostic Services & Lab Tests in Thiruvarur | TanBio";
const DESCRIPTION =
  "Explore hematology, biochemistry, serology, hormone, microbiology, urine and cancer screening tests at TanBio BioMed Genomics Laboratory, Thiruvarur.";

export default function ServicesPage() {
  const { open } = useBooking();
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

      <Breadcrumbs items={[{ label: "Services" }]} />
      <Hero
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
        ]}
      />

      <DiagnosticServicesGrid />

      <StatTiles
        title="Everything Under One Roof"
        stats={[
          { value: 7, label: "Specialised Departments" },
          { value: 150, suffix: "+", label: "Diagnostic Tests" },
          { value: 7, label: "Days a Week" },
          { value: 10, suffix: "+", label: "Years of Excellence" },
        ]}
      />

      <TestJourney />

      <section className="section pt-0">
        <FeatureBanner
          image={chooseImg}
          imageAlt="Laboratory professional reviewing results"
          title="Clear Reports You Can Share With Your Doctor"
          description="Easy-to-read results delivered by email or WhatsApp, so your doctor has the information needed to guide your care."
          floating={<ReportMockup />}
        >
          <Button variant="light" arrow onClick={() => open()}>
            Book a Test
          </Button>
          <Button variant="ghost-light" to="/contact">
            Talk to Us
          </Button>
        </FeatureBanner>
      </section>

      <SamplePrep />
      <HomeCollectionInfo />
      <TestsFaq />
      <ChooseTanbio />
    </>
  );
}
