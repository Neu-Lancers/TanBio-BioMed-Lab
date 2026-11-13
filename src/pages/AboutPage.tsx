import { FaHeartPulse, FaMicrochip, FaChartLine, FaUserNurse } from "react-icons/fa6";
import aboutHero from "@/assets/images/about-hero.webp";
import AboutIntro from "@/components/sections/about/AboutIntro";
import MissionVisionValues from "@/components/sections/about/MissionVisionValues";
import OurApproach from "@/components/sections/about/OurApproach";
import Hero from "@/components/ui/Hero";
import Seo from "@/components/ui/Seo";
import { SITE } from "@/lib/site";

const TITLE = "About TanBio | Genomics & Diagnostic Laboratory in Thiruvarur";
const DESCRIPTION =
  "Learn about TanBio BioMed Genomics Laboratory — our mission, values and patient-first approach to accurate, reliable diagnostics in Thiruvarur.";

export default function AboutPage() {
  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        path="/about"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: TITLE,
          url: `${SITE.url}/about`,
          about: { "@id": `${SITE.url}/#organization` },
        }}
      />

      <Hero
        shape="diagonal"
        eyebrow="About Us"
        title="About TANBIO"
        highlight="Biomed Genomics Laboratory"
        description="TANBIO Biomed Genomics Laboratory is committed to providing accurate, reliable and timely diagnostic services with advanced technology and a patient-first approach."
        image={aboutHero}
        imageAlt="Inside the TANBIO laboratory"
        features={[
          { icon: <FaMicrochip />, label: "Advanced", sub: "Technology" },
          { icon: <FaChartLine />, label: "Accurate", sub: "Results" },
          { icon: <FaUserNurse />, label: "Qualified", sub: "Professionals" },
          { icon: <FaHeartPulse />, label: "Patient", sub: "Focused" },
        ]}
      />

      <AboutIntro />
      <MissionVisionValues />
      <OurApproach />
    </>
  );
}
