import Seo from "@/components/ui/Seo";
import Button from "@/components/ui/Button";
import FeatureBanner from "@/components/ui/FeatureBanner";
import ReportMockup from "@/components/ui/ReportMockup";
import StatTiles, { type Stat } from "@/components/ui/StatTiles";
import { useBooking } from "@/components/booking/BookingProvider";
import { SITE } from "@/lib/site";
import bannerImg from "@/assets/images/microbiology.webp";
import HomeHero from "@/components/sections/home/HomeHero";
import ServicesShowcase from "@/components/sections/home/ServicesShowcase";
import HealthConcerns from "@/components/sections/home/HealthConcerns";
import PopularTests from "@/components/sections/home/PopularTests";
import GenomicsSpotlight from "@/components/sections/home/GenomicsSpotlight";
import HealthPackages from "@/components/sections/home/HealthPackages";
import WhyChoose from "@/components/sections/home/WhyChoose";
import LabTechnology from "@/components/sections/home/LabTechnology";
import HowItWorks from "@/components/sections/home/HowItWorks";
import OurTeam from "@/components/sections/shared/OurTeam";
import Testimonials from "@/components/sections/shared/Testimonials";
import HealthTips from "@/components/sections/home/HealthTips";
import FaqSection from "@/components/sections/home/FaqSection";

const STATS: Stat[] = [
  { value: 5000, suffix: "+", label: "Happy Patients" },
  { value: 150, suffix: "+", label: "Diagnostic Tests" },
  { value: 10, suffix: "+", label: "Years of Excellence" },
  { value: 7, label: "Specialised Departments" },
  { value: 7, label: "Days a Week" },
];

export default function HomePage() {
  const { open } = useBooking();
  return (
    <>
      <Seo
        title="TanBio BioMed Genomics Laboratory | Diagnostic Centre in Thiruvarur"
        description={SITE.description}
        path="/"
      />
      <HomeHero />
      <ServicesShowcase />
      <StatTiles title="Trusted. Every Day." stats={STATS} />
      <HealthConcerns />
      <PopularTests />

      {/* Split banner with the floating 3D report mockup */}
      <section className="bg-white py-10 md:py-14 3xl:py-20" aria-label="Digital reports">
        <FeatureBanner
          image={bannerImg}
          imageAlt="Culture plate being examined in the microbiology laboratory"
          title="Beyond Reports Into Insight"
          description="Precise analysis and clear digital reports you can share with your doctor in a tap — so every result turns into a confident next step."
          floating={<ReportMockup />}
        >
          <Button variant="dark" arrow onClick={() => open()}>
            Book a test
          </Button>
          <Button to="/services" variant="ghost-light">
            View services
          </Button>
        </FeatureBanner>
      </section>

      <GenomicsSpotlight />
      <HealthPackages />
      <WhyChoose />
      <LabTechnology />
      <HowItWorks />
      <OurTeam />
      <Testimonials />
      <HealthTips />
      <FaqSection />
    </>
  );
}
