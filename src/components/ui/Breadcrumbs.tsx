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
};

/** Slim breadcrumb bar shown between the navbar and the hero, with matching structured data. */
export default function Breadcrumbs({ items, schema = true }: Props) {
  const trail: Crumb[] = [{ label: "Home", to: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.to ? { item: `${SITE.url}${c.to === "/" ? "/" : c.to}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="border-b border-line/70 bg-white">
      {schema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>
      )}
      <ol className="container flex flex-wrap items-center gap-x-2 gap-y-1 py-3 text-small">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <Fragment key={c.label + i}>
              <li className="flex items-center">
                {last || !c.to ? (
                  <span aria-current="page" className="font-semibold text-brand">
                    {c.label}
                  </span>
                ) : (
                  <Link to={c.to} className="inline-flex items-center gap-1.5 text-muted transition-colors duration-200 hover:text-brand">
                    {i === 0 && <FaHouse aria-hidden="true" className="text-[0.85em]" />}
                    {c.label}
                  </Link>
                )}
              </li>
              {!last && (
                <li aria-hidden="true" className="flex items-center text-muted/50">
                  <FaChevronRight className="text-[0.6rem]" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
