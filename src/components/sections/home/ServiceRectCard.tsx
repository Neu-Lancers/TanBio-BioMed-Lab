import { Link } from "react-router-dom";
import { FaArrowRight, FaCircleCheck } from "react-icons/fa6";
import { useBooking } from "@/components/booking/BookingProvider";
import type { Service } from "@/data/services";

/** "Hematology Tests" → ["Hematology", "Tests"] so the last word can carry the brand colour */
function splitTitle(title: string): [string, string] {
  const i = title.lastIndexOf(" ");
  return i === -1 ? [title, ""] : [title.slice(0, i), title.slice(i + 1)];
}

/** Horizontal rectangle card: image left (~40%), content right. Stacks (image on top) below sm. */
export default function ServiceRectCard({ svc }: { svc: Service }) {
  const Icon = svc.icon;
  const { open } = useBooking();
  const samples = svc.tests.slice(0, 3);
  const [first, last] = splitTitle(svc.title);
  const tag = first.split(" ")[0].toUpperCase();

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white shadow-card transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-lift sm:flex-row">
      {/* image */}
      <Link
        to={`/tests/${svc.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        draggable={false}
        className="relative block h-36 shrink-0 overflow-hidden bg-sky-soft sm:h-auto sm:w-[40%]"
      >
        <img
          src={svc.image}
          alt=""
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/30 to-transparent" />
        <span
          className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-xl bg-white text-lg shadow-card"
          style={{ color: svc.iconColor }}
        >
          <Icon aria-hidden="true" />
        </span>
      </Link>

      {/* content */}
      <div className="relative flex min-w-0 flex-1 flex-col p-5 sm:p-6 3xl:p-7">
        <span className="absolute right-4 top-4 hidden rounded-full border border-brand/15 bg-sky-soft px-2.5 py-1 font-mono text-caption font-semibold tracking-[0.14em] text-brand sm:inline-block">
          {tag}
        </span>

        <h3 className="pr-0 text-h3 text-navy sm:pr-24">
          {first} {last && <span className="heading-hl">{last}</span>}
        </h3>
        <span className="divider-glow my-3" aria-hidden="true" />

        <p className="line-clamp-2 text-small leading-relaxed md:text-small">{svc.short}</p>

        <ul className="mt-3 space-y-1.5">
          {samples.map((t) => (
            <li key={t.name} className="flex items-start gap-2 text-caption font-medium text-navy">
              <FaCircleCheck aria-hidden="true" className="mt-0.5 shrink-0 text-brand/70" />
              <span className="line-clamp-1">{t.name}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <Link
            to={`/tests/${svc.slug}`}
            draggable={false}
            className="group/btn inline-flex items-center gap-2 rounded-full bg-sky-soft px-5 py-2.5 text-small font-semibold text-brand ring-1 ring-inset ring-brand/15 transition-all duration-300 hover:bg-brand hover:text-white hover:shadow-lift focus-visible:outline-brand"
          >
            View Tests <FaArrowRight aria-hidden="true" className="text-[.75em] transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
          <button
            type="button"
            onClick={() => open({ preselect: svc.slug })}
            className="rounded-md px-2 py-1 text-caption font-semibold text-muted underline-offset-4 transition-colors duration-300 hover:text-brand hover:underline focus-visible:outline-brand"
          >
            Book
          </button>
        </div>
      </div>
    </article>
  );
}
