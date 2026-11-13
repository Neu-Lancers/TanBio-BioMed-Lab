import { FaCalendarCheck, FaHeadset, FaShieldHalved } from "react-icons/fa6";
import contactImg from "@/assets/images/contact-tanbio.webp";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactInfoCards from "@/components/sections/contact/ContactInfoCards";
import LocationMap from "@/components/sections/contact/LocationMap";
import FaqSection from "@/components/sections/home/FaqSection";
import Hero from "@/components/ui/Hero";
import Seo from "@/components/ui/Seo";
import StatTiles from "@/components/ui/StatTiles";
import { SITE } from "@/lib/site";

const TITLE = "Contact TanBio | Book a Test or Home Sample Collection, Thiruvarur";
const DESCRIPTION =
  "Contact TanBio BioMed Genomics Laboratory in Naranamangalam, Thiruvarur. Call +91 73587 98182 or WhatsApp to book tests and home sample collection.";

export default function ContactPage() {
  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        path="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: TITLE,
          url: `${SITE.url}/contact`,
          about: { "@id": `${SITE.url}/#organization` },
        }}
      />
      <Hero
        breadcrumbs={[{ label: "Contact Us" }]}
        eyebrow="Contact Us"
        title="We Are Here"
        highlight="To Help You"
        description="Have questions or need assistance? Reach out to us. We are here to provide you with the best diagnostic experience."
        image={contactImg}
        imageAlt="TANBIO Biomed Genomics Laboratory building"
        features={[
          { icon: <FaHeadset />, label: "Quick Support", sub: "Always ready to help" },
          { icon: <FaShieldHalved />, label: "Trusted Care", sub: "Reliable results" },
          { icon: <FaCalendarCheck />, label: "Easy Booking", sub: "Call or WhatsApp" },
        ]}
      />

      <ContactInfoCards />

      <StatTiles
        title="We're Here When You Need Us"
        stats={[
          { value: 7, label: "Days a Week" },
          { value: 12, label: "Hours Open Mon–Sat" },
          { value: 150, suffix: "+", label: "Diagnostic Tests" },
          { value: 24, label: "Hr Email Reply" },
        ]}
      />

      <LocationMap />
      <ContactForm />
      {/* FaqSection renders its own FAQPage JSON-LD */}
      <FaqSection />
    </>
  );
}
