import { FaBuilding, FaLocationDot } from "react-icons/fa6";
import Avatar from "@/components/ui/Avatar";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt3D from "@/components/ui/Tilt3D";
import { TEAM, TEAM_ORG, type TeamMember } from "@/data/team";

function OrgLine({ light }: { light?: boolean }) {
  return (
    <p className={`flex items-start gap-2 text-left text-[.78rem] leading-snug ${light ? "text-white/80" : "text-muted"}`}>
      <FaLocationDot aria-hidden="true" className={`mt-0.5 shrink-0 ${light ? "text-cyan-glow" : "text-brand"}`} />
      <span>
        <span className={`block font-semibold ${light ? "text-white" : "text-navy"}`}>{TEAM_ORG.name}</span>
        {TEAM_ORG.incubator}, {TEAM_ORG.location}
      </span>
    </p>
  );
}

function Leader({ m }: { m: TeamMember }) {
  return (
    <Tilt3D max={5} rest={{ x: 0, y: 0 }} className="h-full">
      <article className="relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl bg-brand p-7 text-white shadow-lift sm:flex-row sm:items-center sm:gap-10 sm:p-10">
        <span className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-glow/20 blur-3xl" aria-hidden="true" />
        <span className="relative shrink-0">
          <span className="absolute -inset-2 rounded-full bg-gradient-to-br from-cyan-glow to-white/30 opacity-80 blur-sm" aria-hidden="true" />
          <Avatar name={m.name} photo={m.photo} className="relative h-28 w-28 border-4 border-white !bg-none bg-navy text-3xl shadow-card sm:h-32 sm:w-32" />
        </span>
        <div className="relative min-w-0">
          <span className="mb-3 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 font-mono text-[.68rem] font-semibold uppercase tracking-[.18em]">
            {m.role}
          </span>
          <h3 className="text-[clamp(1.35rem,1rem+1vw,1.9rem)] font-extrabold leading-tight text-white">{m.name}</h3>
          <p className="mt-1 font-mono text-sm text-cyan-glow">{m.qualification}</p>
          <span className="divider-glow my-4" aria-hidden="true" />
          <OrgLine light />
        </div>
      </article>
    </Tilt3D>
  );
}

function Member({ m }: { m: TeamMember }) {
  return (
    <Tilt3D max={7} rest={{ x: 0, y: 0 }} className="h-full">
      <article className="card card-hover group flex h-full flex-col p-6">
        <div className="flex items-center gap-4">
          <span className="relative shrink-0">
            <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-cyan-glow/70 to-brand/40 opacity-70 blur-[2px] transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
            <Avatar name={m.name} photo={m.photo} className="relative h-16 w-16 border-[3px] border-white text-lg shadow-card" />
          </span>
          <div className="min-w-0">
            <h3 className="text-[1.02rem] font-extrabold leading-snug">{m.name}</h3>
            <p className="font-mono text-[.78rem] text-brand">{m.qualification}</p>
          </div>
        </div>
        <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-sky-soft px-3 py-1 text-[.78rem] font-semibold text-brand">
          <FaBuilding aria-hidden="true" /> {m.role}
        </span>
        <span className="my-4 h-px w-full bg-line" aria-hidden="true" />
        <div className="mt-auto">
          <OrgLine />
        </div>
      </article>
    </Tilt3D>
  );
}

export default function OurTeam() {
  const [leader, ...rest] = TEAM;
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

        <Reveal className="mt-12">{leader && <Leader m={leader} />}</Reveal>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 3xl:gap-8">
          {rest.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 100} className={i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <Member m={m} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
