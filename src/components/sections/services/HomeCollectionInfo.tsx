import { FaClock, FaHouseMedical, FaPhone, FaShieldHalved, FaUserNurse } from "react-icons/fa6";
import { useBooking } from "@/components/booking/BookingProvider";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE, whatsappUrl } from "@/lib/site";

const perks = [
  { icon: <FaUserNurse />, title: "Trained staff", text: "Samples collected by trained professionals." },
  { icon: <FaShieldHalved />, title: "Safe & hygienic", text: "Sterile, single-use collection materials." },
  { icon: <FaClock />, title: "At your time", text: "Choose a time slot that suits your day." },
];

export default function HomeCollectionInfo() {
  const { open } = useBooking();
  return (
    <section className="section bg-sky-soft/70" id="home-collection">
      <div className="container grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Home Sample Collection"
            title="Prefer to Stay Home?"
            highlight="We Come to You"
            description="Request a visit and our team will collect your sample at your doorstep, then deliver your report digitally."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button arrow onClick={() => open()}>
              Schedule Collection
            </Button>
            <Button
              variant="outline"
              href={whatsappUrl("Hi, I'd like to schedule a home sample collection. Please share the available slots.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </Button>
          </div>
          <a href={SITE.phoneHref} className="mt-5 inline-flex items-center gap-2 font-semibold text-brand">
            <FaPhone aria-hidden="true" /> {SITE.phone}
          </a>
        </Reveal>

        <Reveal delay={120}>
          <div className="card p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-2xl text-white">
                <FaHouseMedical aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-caption font-semibold uppercase tracking-[.2em] text-brand/70">Working hours</p>
                <ul className="mt-1 space-y-0.5 text-body">
                  {SITE.hours.map((h) => (
                    <li key={h.days}>
                      <span className="font-bold text-navy">{h.days}:</span> {h.open} – {h.close}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <ul className="grid items-stretch gap-4 sm:grid-cols-3">
              {perks.map((p) => (
                <li key={p.title} className="rounded-2xl bg-sky-soft/80 p-4">
                  <span className="mb-2 block text-xl text-brand" aria-hidden="true">
                    {p.icon}
                  </span>
                  <h3 className="mb-1 text-small">{p.title}</h3>
                  <p className="text-small leading-snug">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
