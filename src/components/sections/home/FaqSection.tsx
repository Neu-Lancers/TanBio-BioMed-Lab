import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaChevronDown } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";

const hoursText = SITE.hours.map((h) => `${h.days}: ${h.open} – ${h.close}`).join("; ");

export const faqs = [
  {
    q: "How do I book a test at TanBio?",
    a: `You can book instantly on WhatsApp (${SITE.phone}), call us, or walk in during working hours. Tell us the tests you need and we will confirm a suitable time.`,
  },
  {
    q: "Do I need to fast before my blood test?",
    a: "Some tests, such as fasting blood sugar and lipid profile, need 8–12 hours of fasting (water is fine). Others do not. Message us with your test list and we will tell you exactly how to prepare.",
  },
  {
    q: "Do you offer home sample collection?",
    a: "Yes. You can request home sample collection through WhatsApp or phone. Share your address and preferred time and our team will arrange the visit.",
  },
  {
    q: "How long does it take to get my reports?",
    a: "Most routine reports are ready the same day. Specialised tests such as cultures and molecular tests take longer — we will tell you the expected time when you book.",
  },
  {
    q: "What are your working hours?",
    a: `${hoursText}.`,
  },
  {
    q: "Which types of tests are available?",
    a: "We offer hematology, urine analysis, biochemistry, serology, hormone tests, microbiology and cancer screening. Browse the Services page for the complete list of tests in each category.",
  },
  {
    q: "Where is the laboratory located?",
    a: `${SITE.address.street}, ${SITE.address.locality} – ${SITE.address.postalCode}, ${SITE.address.region}. Find us on Google Maps from the Contact page.`,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section bg-sky-soft" aria-labelledby="faq-title">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="container max-w-4xl">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked" highlight="Questions" description="Quick answers about booking, preparation and reports." />

        <div className="mt-8 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 50} className={cn("card overflow-hidden !rounded-2xl", open === i && "!border-brand/30 shadow-lift")}>
                <h3 className="text-base">
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-navy transition-colors hover:text-brand md:px-6 md:py-5"
                  >
                    {f.q}
                    <FaChevronDown aria-hidden="true" className={cn("shrink-0 text-brand transition-transform duration-300", isOpen && "rotate-180")} />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm md:px-6 md:text-base">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
