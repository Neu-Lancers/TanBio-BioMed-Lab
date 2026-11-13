import { FaBullseye, FaClock, FaFlask, FaRegCalendarCheck, FaShieldHalved } from "react-icons/fa6";
import Hero, { type HeroFeature } from "@/components/ui/Hero";
import Button from "@/components/ui/Button";
import { useBooking } from "@/components/booking/BookingProvider";
import heroImg from "@/assets/images/home-hero.webp";

const features: HeroFeature[] = [
  { icon: <FaBullseye aria-hidden="true" />, label: "Accurate", sub: "Results" },
  { icon: <FaClock aria-hidden="true" />, label: "Quick", sub: "Turnaround" },
  { icon: <FaShieldHalved aria-hidden="true" />, label: "Safe &", sub: "Reliable" },
];

export default function HomeHero() {
  const { open } = useBooking();
  return (
    <Hero
      title="Accurate Results,"
      highlight="Better Health"
      description="TANBIO Biomed Genomics Laboratory provides advanced diagnostic services with precision, care and reliability."
      image={heroImg}
      imageAlt="Laboratory professional at TANBIO Biomed Genomics Laboratory"
      features={features}
    >
      <Button size="lg" arrow onClick={() => open()}>
        <FaRegCalendarCheck aria-hidden="true" /> Book Appointment
      </Button>
      <Button size="lg" to="/services" variant="outline">
        <FaFlask aria-hidden="true" /> Explore Tests
      </Button>
    </Hero>
  );
}
