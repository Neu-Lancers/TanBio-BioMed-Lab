import Seo from "@/components/ui/Seo";
import { SITE } from "@/lib/site";
import HomeHero from "@/components/sections/home/HomeHero";
import ServicesShowcase from "@/components/sections/home/ServicesShowcase";
import PopularTests from "@/components/sections/home/PopularTests";
import HealthPackages from "@/components/sections/home/HealthPackages";
import WhyChoose from "@/components/sections/home/WhyChoose";
import HowItWorks from "@/components/sections/home/HowItWorks";
import FaqSection from "@/components/sections/home/FaqSection";
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
      <PopularTests />
      <HealthPackages />
      <WhyChoose />
      <HowItWorks />
      <FaqSection />
      <CtaBand />
    </>
  );
}
