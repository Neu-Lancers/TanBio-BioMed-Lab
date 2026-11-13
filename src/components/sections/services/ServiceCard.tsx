import { FaArrowRight, FaCheck } from "react-icons/fa6";
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
        className="card card-hover group flex h-full flex-col overflow-hidden p-4 text-inherit hover:text-inherit"
        aria-label={`${s.title} - view tests`}
      >
        <div className="mb-3 flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xl" style={{ background: s.iconBg, color: s.iconColor }}>
            <Icon aria-hidden="true" />
          </span>
          <h3 className="text-base leading-snug">{s.title}</h3>
        </div>
        <div className="mb-3 overflow-hidden rounded-xl">
          <img
            src={s.image}
            alt={s.title}
            width={600}
            height={400}
            loading="lazy"
            decoding="async"
            className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        {!compact && (
          <ul className="mb-4 space-y-1.5 text-sm">
            {s.tests.slice(0, 5).map((t) => (
              <li key={t.name} className="flex items-start gap-2">
                <FaCheck className="mt-1 shrink-0 text-xs text-sky" aria-hidden="true" />
                <span>{t.name}</span>
              </li>
            ))}
          </ul>
        )}
        <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition-colors group-hover:bg-brand group-hover:text-white">
          View Tests <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </Link>
    </Reveal>
  );
}
