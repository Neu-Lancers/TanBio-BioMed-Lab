// Post-build SEO step (runs after `vite build`):
//  1. writes a static HTML shell per route with its own <title>/description/canonical/OG tags,
//     so crawlers and social scrapers see page-specific metadata without running JS
//  2. generates sitemap.xml (including every /tests/:slug page)
// Keep ROUTES in sync with the <Seo/> props used in src/pages.
import fs from "node:fs";
import path from "node:path";

const SITE = "https://tanbiomedlab.com";
const BUILD = "build";
const today = new Date().toISOString().slice(0, 10);

const slugs = [...fs.readFileSync("src/data/services.ts", "utf8").matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  {
    path: "/about",
    title: "About TanBio | Genomics & Diagnostic Laboratory in Thiruvarur",
    description: "Learn about TanBio BioMed Genomics Laboratory — our mission, values and patient-first approach to accurate, reliable diagnostics in Thiruvarur.",
    priority: "0.8", changefreq: "monthly",
  },
  {
    path: "/services",
    title: "Diagnostic Services & Lab Tests in Thiruvarur | TanBio",
    description: "Explore hematology, biochemistry, serology, hormone, microbiology, urine and cancer screening tests at TanBio BioMed Genomics Laboratory, Thiruvarur.",
    priority: "0.9", changefreq: "weekly",
  },
  {
    path: "/contact",
    title: "Contact TanBio | Book a Test or Home Sample Collection, Thiruvarur",
    description: "Contact TanBio BioMed Genomics Laboratory in Naranamangalam, Thiruvarur. Call +91 73587 98182 or WhatsApp to book tests and home sample collection.",
    priority: "0.8", changefreq: "monthly",
  },
  ...slugs.map((s) => ({ path: `/tests/${s}`, priority: "0.7", changefreq: "monthly", generic: true })),
];

const template = fs.readFileSync(path.join(BUILD, "index.html"), "utf8");
const esc = (v) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

for (const r of ROUTES) {
  if (r.path === "/" || r.generic) continue; // home keeps index.html; test pages get their meta from <Seo/> at runtime
  const url = `${SITE}${r.path}`;
  const block = [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
  ].join("\n    ");
  const html = template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n    ${block}\n    <!--seo:end-->`);
  const dir = path.join(BUILD, r.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => `  <url>\n    <loc>${SITE}${r.path === "/" ? "/" : r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(BUILD, "sitemap.xml"), sitemap);
console.log(`prerender: ${ROUTES.length} routes, sitemap.xml written`);
