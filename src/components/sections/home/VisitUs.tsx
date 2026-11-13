import { FaClock, FaLocationDot, FaPhone, FaRoute, FaWhatsapp } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { BOOK_MESSAGE, SITE, whatsappUrl } from "@/lib/site";

const MAP_SRC = `https://maps.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=15&output=embed`;

export default function VisitUs() {
  const { street, locality, region, postalCode } = SITE.address;
  return (
    <section id="visit" className="section bg-white" aria-label="Visit us">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Visit Us"
            title="Find the lab in"
            highlight="Thiruvarur"
            description="Walk in during opening hours or call ahead — we are happy to help."
          />
        </Reveal>

        <Reveal className="card mt-12 grid overflow-hidden lg:grid-cols-5" delay={80}>
          <div className="flex flex-col justify-center gap-7 p-7 sm:p-9 lg:col-span-2">
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky-soft text-xl text-brand">
                <FaLocationDot aria-hidden="true" />
              </span>
              <address className="not-italic">
                <span className="block font-bold text-navy">{SITE.name}</span>
                <span className="block text-sm">
                  {street}, {locality} – {postalCode}, {region}
                </span>
              </address>
            </div>
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky-soft text-xl text-brand">
                <FaClock aria-hidden="true" />
              </span>
              <div>
                <span className="block font-bold text-navy">Opening hours</span>
                <ul className="mt-1 space-y-0.5 text-sm">
                  {SITE.hours.map((h) => (
                    <li key={h.days}>
                      <span className="font-semibold text-navy">{h.days}:</span> {h.open} – {h.close}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={SITE.phoneHref}>
                <FaPhone aria-hidden="true" /> Call
              </Button>
              <Button href={whatsappUrl(BOOK_MESSAGE)} target="_blank" rel="noopener noreferrer" variant="outline">
                <FaWhatsapp aria-hidden="true" /> WhatsApp
              </Button>
              <Button href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" variant="outline">
                <FaRoute aria-hidden="true" /> Directions
              </Button>
            </div>
          </div>
          <div className="min-h-[300px] bg-sky-soft lg:col-span-3 lg:min-h-[420px]">
            <iframe
              title="Map showing the location of TanBio BioMed Genomics Laboratory"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[300px] w-full border-0 lg:min-h-[420px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
