import { FaLocationDot } from "react-icons/fa6";
import Avatar from "@/components/ui/Avatar";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { TEAM, TEAM_ORG, type TeamMember } from "@/data/team";

/** Every member uses this exact card — identical structure and height. */
function Member({ m }: { m: TeamMember }) {
  return (
    <article className="card card-hover group flex h-full flex-col items-center p-6 text-center">
      <span className="relative">
        <span
          className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-cyan-glow/70 to-brand/40 opacity-70 blur-[3px] transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
        <Avatar name={m.name} photo={m.photo} className="relative h-20 w-20 border-4 border-white text-xl shadow-card" />
      </span>

      <h3 className="mt-5 text-h4 font-extrabold leading-snug">{m.name}</h3>
      <p className="mt-1 font-mono text-caption text-brand">{m.qualification}</p>

      <span className="mt-4 inline-flex rounded-full bg-sky-soft px-3.5 py-1 text-caption font-semibold text-brand">{m.role}</span>

      <span className="mb-5 mt-auto h-px w-full bg-line" aria-hidden="true" />

      <p className="mt-0 flex items-start gap-2 text-left text-caption leading-snug text-muted">
        <FaLocationDot aria-hidden="true" className="mt-0.5 shrink-0 text-brand" />
        <span>
          <span className="block font-semibold text-navy">{TEAM_ORG.name}</span>
          {TEAM_ORG.incubator}, {TEAM_ORG.location}
        </span>
      </p>
    </article>
  );
}

export default function OurTeam() {
  return (
    <section className="section bg-sky-soft/70" id="ourteam">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Our Team"
            title="Meet the Scientists behind"
            highlight="TanBio"
            description="Research-driven people building accurate, dependable diagnostics."
          />
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4 md:mt-10 3xl:gap-8">
          {TEAM.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 90} className="h-full">
              <Member m={m} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
