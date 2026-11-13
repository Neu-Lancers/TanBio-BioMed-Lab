import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Reveal from "@/components/ui/Reveal";
import type { Service } from "@/data/services";

type Props = { service: Service; delay?: number; compact?: boolean };

/** Whole-card link to /tests/:slug. `compact` = image + title only (used for "other services"). */
export default function ServiceCard({ service: s, delay = 0, compact }: Props) {
  const Icon = s.icon;
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to={`/tests/${s.slug}`}
        className="card card-hover group flex h-full flex-col overflow-hidden p-3 text-inherit hover:text-inherit"
        aria-label={`${s.title} - view tests`}
      >
        <div className="relative mb-4 overflow-hidden rounded-[1.25rem]">
          <img
            src={s.image}
            alt={s.title}
            width={600}
            height={400}
            loading="lazy"
            decoding="async"
            className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute right-3 top-3 rounded-full border border-brand/15 bg-white/95 px-3 py-1 font-mono text-[.68rem] font-semibold uppercase tracking-[.16em] text-brand shadow-card">
            {s.tests.length} tests
          </span>
        </div>
        <div className="flex flex-1 flex-col px-3 pb-3">
          <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl text-xl" style={{ background: s.iconBg, color: s.iconColor }}>
            <Icon aria-hidden="true" />
          </span>
          <h3 className="text-[1.1rem] leading-snug">{s.title}</h3>
          {!compact && <p className="mt-2 line-clamp-2 text-sm">{s.short}</p>}
          {!compact && (
            <ul className="mb-4 mt-3 space-y-1.5 text-sm">
              {s.tests.slice(0, 3).map((t) => (
                <li key={t.name} className="flex items-start gap-2">
                  <FaCheck className="mt-1 shrink-0 text-xs text-brand" aria-hidden="true" />
                  <span className="line-clamp-1">{t.name}</span>
                </li>
              ))}
            </ul>
          )}
          <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#2b2f3a] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 group-hover:bg-brand group-hover:shadow-lift">
            View Tests <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
