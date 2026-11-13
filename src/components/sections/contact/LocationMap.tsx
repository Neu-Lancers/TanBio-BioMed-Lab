import { FaClock, FaLocationDot } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/site";

export default function LocationMap() {
  const a = SITE.address;
  return (
    <section className="section pt-6 md:pt-8" id="location">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow="Visit Us" title="Find Us" highlight="Here" />
        </Reveal>

        <Reveal className="card mt-8 grid overflow-hidden !rounded-[2rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="space-y-6 p-6 sm:p-8">
            <div className="flex gap-3">
              <FaLocationDot className="mt-1 shrink-0 text-xl text-brand" aria-hidden="true" />
              <address className="not-italic">
                <p className="mb-1 font-bold text-navy">TANBIO Biomed Genomics Laboratory</p>
                {a.street}, {a.locality} - {a.postalCode}, {a.region}
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block font-semibold">
                  Get directions
                </a>
              </address>
            </div>
            <div className="flex gap-3">
              <FaClock className="mt-1 shrink-0 text-xl text-brand" aria-hidden="true" />
              <div>
                <p className="mb-1 font-bold text-navy">Opening Hours</p>
                <ul className="space-y-1 text-small">
                  {SITE.hours.map((h) => (
                    <li key={h.days}>
                      <span className="font-semibold text-ink">{h.days}:</span> {h.open} - {h.close}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <iframe
            title="TANBIO Biomed Genomics Laboratory location on Google Maps"
            src={`https://maps.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=15&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-72 w-full border-0 sm:h-96 lg:h-full lg:min-h-[24rem]"
          />
        </Reveal>
      </div>
    </section>
  );
}
