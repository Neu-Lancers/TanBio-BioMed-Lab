import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const items = [
  {
    q: "Can I take medicines before a blood test?",
    a: "In most cases yes, but some tests are affected by certain medicines or supplements. Tell us what you take and follow your doctor's advice.",
  },
  {
    q: "Is water allowed during fasting?",
    a: "Yes. Plain water is generally fine and helps with sample collection. Avoid tea, coffee, juices and food until your sample is taken.",
  },
  {
    q: "Do I need a doctor's prescription?",
    a: "Many routine tests can be booked directly. For specialised tests your doctor's request helps us choose the right panel for you.",
  },
  {
    q: "How should I collect a urine sample?",
    a: "Use the sterile container we provide, collect a clean mid-stream sample, close it tightly and bring it to the lab soon after collection.",
  },
  {
    q: "When will my report be ready?",
    a: "Most routine reports are ready the same day. Cultures and molecular tests take longer — we will share the expected time when you book.",
  },
  {
    q: "How will I receive my report?",
    a: "Reports can be sent by email or WhatsApp, and printed copies are available at the lab.",
  },
];

export default function TestsFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section" id="test-faq">
      <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Test FAQs"
            title="Questions about"
            highlight="your tests"
            description="Short, practical answers before you visit. Still unsure? Message us and we will help."
          />
        </Reveal>
        <div className="space-y-3">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className={cn("card overflow-hidden", isOpen && "!border-brand/40 shadow-lift")}>
                  <h3 className="text-body">
                    <button
                      type="button"
                      id={`tfaq-btn-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`tfaq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-bold text-navy"
                    >
                      {f.q}
                      <span
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-soft text-caption text-brand transition-all duration-300",
                          isOpen && "rotate-45 bg-brand text-white",
                        )}
                      >
                        <FaPlus aria-hidden="true" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`tfaq-panel-${i}`}
                    role="region"
                    aria-labelledby={`tfaq-btn-${i}`}
                    className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-body">{f.a}</p>
                    </div>
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
