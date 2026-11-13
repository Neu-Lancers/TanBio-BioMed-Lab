import Seo from "@/components/ui/Seo";
import { SITE } from "@/lib/site";
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
import VisitUs from "@/components/sections/home/VisitUs";
import CtaBand from "@/components/sections/home/CtaBand";

export default function HomePage() {
  return (
    <>
      <Seo
        title="TanBio BioMed Genomics Laboratory | Diagnostic Centre in Thiruvarur"
        description={SITE.description}
        path="/"
      />
      <HomeHero />
      <ServicesShowcase />
      <HealthConcerns />
      <PopularTests />
      <GenomicsSpotlight />
      <HealthPackages />
      <WhyChoose />
      <LabTechnology />
      <HowItWorks />
      <OurTeam />
      <Testimonials />
      <HealthTips />
      <FaqSection />
      <VisitUs />
      <CtaBand />
    </>
  );
}
