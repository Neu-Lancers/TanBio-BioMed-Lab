import { FaAward } from "react-icons/fa6";
import Avatar from "@/components/ui/Avatar";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { TEAM } from "@/data/team";

export default function OurTeam() {
  return (
    <section className="section bg-sky-soft/60" id="ourteam">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Our Team"
            title="Meet Our"
            highlight="Experts"
            description="Experienced specialists behind every accurate report."
          />
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 3xl:gap-8">
          {TEAM.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 110} className="card card-hover group flex flex-col items-center p-7 text-center">
              <span className="relative mb-5">
                <span
                  className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-sky/60 to-brand/40 opacity-70 blur-[2px] transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <Avatar name={m.name} photo={m.photo} className="relative h-24 w-24 border-4 border-white text-2xl shadow-card" />
              </span>
              <h3 className="text-lg">{m.name}</h3>
              <p className="mt-1 text-[.82rem] font-medium">{m.qualification}</p>
              <span className="mt-3 rounded-full bg-brand/10 px-3 py-1 text-[.78rem] font-semibold text-brand">{m.role}</span>
              <p className="mt-4 inline-flex w-full items-center justify-center gap-2 border-t border-line pt-4 text-[.82rem] font-semibold text-navy">
                <FaAward className="text-sky" aria-hidden="true" />
                Experience: {m.experience}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
