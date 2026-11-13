import { FaDna, FaMicroscope, FaUserDoctor } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { useBooking } from "@/components/booking/BookingProvider";
import img from "@/assets/images/cancer-analysis.webp";

const POINTS = [
  { icon: FaMicroscope, title: "Look beyond routine tests", text: "Molecular methods study DNA and RNA to detect infections and conditions at a finer level." },
  { icon: FaDna, title: "Insight that supports decisions", text: "Genomic findings can help your doctor understand risk and choose the right follow-up." },
  { icon: FaUserDoctor, title: "Guided by your doctor", text: "We deliver clear reports — your physician helps you interpret them for your situation." },
];

export default function GenomicsSpotlight() {
  const { open } = useBooking();
  return (
    <section id="genomics" className="section overflow-hidden bg-sky-soft" aria-labelledby="genomics-title">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-last lg:order-first">
          <div aria-hidden="true" className="absolute -left-4 -top-4 h-full w-full rounded-3xl border-2 border-brand/25 sm:-left-6 sm:-top-6" />
          <div className="relative overflow-hidden rounded-3xl shadow-lift">
            <img
              src={img}
              alt="Magnified view of cells under analysis"
              width={1000}
              height={750}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-navy/40 via-transparent to-transparent" />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <span className="eyebrow">Genomics</span>
          <h2 id="genomics-title" className="heading">
            Where diagnostics meets <span className="heading-hl">genomics</span>
          </h2>
          <p className="mt-4 max-w-xl">
            Modern healthcare is moving from &quot;what is wrong&quot; to &quot;why it is happening&quot;. Molecular and genomic
            diagnostics study the building blocks of life — and give clinicians more detail to work with.
          </p>

          <ul className="mt-8 space-y-5">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-xl text-brand shadow-card">
                  <Icon aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-bold text-navy">{title}</span>
                  <span className="block text-sm">{text}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button arrow onClick={() => open({ preselect: "Genomic / molecular diagnostics enquiry" })}>Talk to our team</Button>
            <Button to="/about" variant="dark">
              About the lab
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
