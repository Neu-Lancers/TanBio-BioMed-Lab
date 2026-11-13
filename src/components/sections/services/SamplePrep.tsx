import { FaDroplet, FaFlask, FaPersonWalking, FaUtensils, FaVial } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const guide = [
  {
    icon: <FaDroplet />,
    tag: "Blood",
    title: "Blood samples",
    points: [
      "Used for blood counts, sugar, lipid, liver, kidney, thyroid and more",
      "A small sample is drawn from a vein by trained staff",
      "Some tests need fasting — we tell you when you book",
    ],
  },
  {
    icon: <FaFlask />,
    tag: "Urine",
    title: "Urine samples",
    points: [
      "Collect a clean mid-stream sample in the sterile container provided",
      "A fresh morning sample is usually preferred",
      "Deliver it to the lab promptly after collection",
    ],
  },
  {
    icon: <FaVial />,
    tag: "Culture",
    title: "Swab & culture samples",
    points: [
      "Used to identify infections and check antibiotic sensitivity",
      "Ideally collected before starting antibiotics, if your doctor agrees",
      "Culture reports take longer than routine tests",
    ],
  },
];

const fasting = [
  {
    icon: <FaUtensils />,
    title: "Fasting tests",
    text: "Typically 8–12 hours without food or drinks other than water — for example fasting blood sugar and lipid profile.",
  },
  {
    icon: <FaPersonWalking />,
    title: "Non-fasting tests",
    text: "Most routine tests such as blood count, thyroid and vitamin levels can usually be done at any time of day.",
  },
];

export default function SamplePrep() {
  return (
    <section className="section bg-sky-soft/70" id="sample-guide">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Preparation Guide"
            title="Sample Types &"
            highlight="How to Prepare"
            description="A simple guide so your sample reaches us in the right condition. Always follow your doctor's advice for your specific tests."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3 3xl:gap-8">
          {guide.map((g, i) => (
            <Reveal key={g.title} delay={i * 110} className="h-full">
              <article className="card card-hover h-full p-7">
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-xl text-white">{g.icon}</span>
                  <span className="rounded-full border border-brand/15 bg-white px-3 py-1 font-mono text-[.68rem] font-semibold uppercase tracking-[.16em] text-brand">
                    {g.tag}
                  </span>
                </div>
                <h3 className="mb-3 text-lg">{g.title}</h3>
                <ul className="space-y-2.5 text-[.92rem]">
                  {g.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 3xl:gap-8">
          {fasting.map((f, i) => (
            <Reveal key={f.title} delay={i * 110}>
              <div className="flex gap-4 rounded-3xl border border-brand/15 bg-white p-6 shadow-card">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky-soft text-xl text-brand">{f.icon}</span>
                <div>
                  <h3 className="mb-1 text-base">{f.title}</h3>
                  <p className="text-[.92rem]">{f.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
