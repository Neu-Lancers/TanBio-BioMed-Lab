import { Link } from "react-router-dom";
import { FaArrowRight, FaCircleCheck } from "react-icons/fa6";
import { useBooking } from "@/components/booking/BookingProvider";
import type { Service } from "@/data/services";

/** Horizontal rectangle card: image left (~40%), content right. Stacks (image on top) below sm. */
export default function ServiceRectCard({ svc }: { svc: Service }) {
  const Icon = svc.icon;
  const { open } = useBooking();
  const samples = svc.tests.slice(0, 3);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-lift sm:flex-row">
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
        <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/25 to-transparent" />
      </Link>

      {/* content */}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5 3xl:p-6">
        <div className="flex items-center gap-3">
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg"
            style={{ background: svc.iconBg, color: svc.iconColor }}
          >
            <Icon aria-hidden="true" />
          </span>
          <h3 className="text-base font-extrabold leading-snug md:text-lg">{svc.title}</h3>
        </div>

        <p className="mt-2.5 line-clamp-2 text-[.82rem] leading-relaxed md:text-sm">{svc.short}</p>

        <ul className="mt-3 space-y-1.5">
          {samples.map((t) => (
            <li key={t.name} className="flex items-start gap-2 text-xs font-medium text-navy">
              <FaCircleCheck aria-hidden="true" className="mt-0.5 shrink-0 text-sky" />
              <span className="line-clamp-1">{t.name}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <Link
            to={`/tests/${svc.slug}`}
            draggable={false}
            className="inline-flex items-center gap-2 text-sm font-bold text-brand transition-all duration-300 hover:gap-3 focus-visible:outline-sky"
          >
            View Tests <FaArrowRight aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => open({ preselect: svc.slug })}
            className="rounded-md px-2 py-1 text-xs font-semibold text-muted underline-offset-4 transition-colors duration-300 hover:text-brand hover:underline focus-visible:outline-sky"
          >
            Book
          </button>
        </div>
      </div>
    </article>
  );
}
