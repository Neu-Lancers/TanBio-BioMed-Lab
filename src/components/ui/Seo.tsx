import { Helmet } from "react-helmet-async";
import { SITE } from "@/lib/site";

type Props = {
  title: string;
  description: string;
  path: string; // e.g. "/about"
  image?: string; // absolute or site-relative
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

/** Per-route <head>: title, description, canonical, Open Graph, Twitter, JSON-LD. */
export default function Seo({ title, description, path, image = "/og-image.jpg", noindex, jsonLd }: Props) {
  const url = `${SITE.url}${path}`;
  const img = image.startsWith("http") ? image : `${SITE.url}${image}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_IN" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
