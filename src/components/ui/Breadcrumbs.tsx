import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaChevronRight, FaHouse } from "react-icons/fa6";
import { SITE } from "@/lib/site";

export type Crumb = { label: string; to?: string };

type Props = {
  /** Trail AFTER Home; the last item is the current page (no link) */
  items: Crumb[];
  /** emit BreadcrumbList JSON-LD (turn off if the page already adds its own) */
  schema?: boolean;
  className?: string;
};

/** Compact inline breadcrumb pill (rendered inside the hero) with matching structured data. */
export default function BreadcrumbTrail({ items, schema = true, className = "" }: Props) {
  const trail: Crumb[] = [{ label: "Home", to: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.to ? { item: `${SITE.url}${c.to}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={className}>
      {schema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>
      )}
      <ol className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-line bg-white/90 px-4 py-1.5 text-small shadow-[0_1px_0_rgba(11,22,51,.04)] lg:justify-start">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <Fragment key={c.label + i}>
              <li className="flex min-w-0 items-center">
                {last || !c.to ? (
                  <span aria-current="page" className="truncate font-semibold text-brand">
                    {c.label}
                  </span>
                ) : (
                  <Link to={c.to} className="inline-flex items-center gap-1.5 text-muted transition-colors duration-200 hover:text-brand">
                    {i === 0 ? <FaHouse aria-label="Home" className="text-[0.9em]" /> : c.label}
                  </Link>
                )}
              </li>
              {!last && (
                <li aria-hidden="true" className="flex items-center text-muted/40">
                  <FaChevronRight className="text-[0.55rem]" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
