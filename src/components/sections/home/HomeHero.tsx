import { FaBullseye, FaClock, FaFlask, FaShieldHalved, FaWhatsapp } from "react-icons/fa6";
import Hero, { type HeroFeature } from "@/components/ui/Hero";
import Button from "@/components/ui/Button";
import heroImg from "@/assets/images/home-hero.webp";
import { BOOK_MESSAGE, whatsappUrl } from "@/lib/site";
import StatsBar from "./StatsBar";

const features: HeroFeature[] = [
  { icon: <FaBullseye aria-hidden="true" />, label: "Accurate", sub: "Results" },
  { icon: <FaClock aria-hidden="true" />, label: "Quick", sub: "Turnaround" },
  { icon: <FaShieldHalved aria-hidden="true" />, label: "Safe &", sub: "Reliable" },
];

export default function HomeHero() {
  return (
    <Hero
      size="home"
      shape="curve"
      title="Accurate Results,"
      highlight="Better Health"
      description="TANBIO Biomed Genomics Laboratory provides advanced diagnostic services with precision, care and reliability."
      image={heroImg}
      imageAlt="Laboratory professional at TANBIO Biomed Genomics Laboratory"
      features={features}
      footer={<StatsBar />}
    >
      <Button href={whatsappUrl(BOOK_MESSAGE)} target="_blank" rel="noopener noreferrer">
        <FaWhatsapp aria-hidden="true" /> Book Appointment
      </Button>
      <Button to="/services" variant="outline">
        <FaFlask aria-hidden="true" /> Explore Tests
      </Button>
    </Hero>
  );
}
