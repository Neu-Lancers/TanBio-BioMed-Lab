import { Navigate, useParams } from "react-router-dom";
import OtherServices from "@/components/sections/services/OtherServices";
import { TestDetail, TestHero } from "@/components/sections/services/TestDetail";
import Seo from "@/components/ui/Seo";
import { getServiceBySlug } from "@/data/services";
import { SITE } from "@/lib/site";

export default function TestPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <Navigate to="/services" replace />;

  const path = `/tests/${service.slug}`;
  const description = `${service.title} at TanBio BioMed Genomics Laboratory, Thiruvarur — ${service.tests.length} tests with accurate, reliable reports. ${service.description}`.slice(0, 300);

  return (
    <>
      <Seo
        title={`${service.title} in Thiruvarur | TanBio BioMed Genomics Laboratory`}
        description={description}
        path={path}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: service.title,
            url: `${SITE.url}${path}`,
            description: service.description,
            about: { "@type": "MedicalTest", name: service.title },
            publisher: { "@id": `${SITE.url}/#organization` },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
              { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
              { "@type": "ListItem", position: 3, name: service.title, item: `${SITE.url}${path}` },
            ],
          },
        ]}
      />
      {/* key remounts on slug change so reveal/accordion state resets */}
      <div key={service.slug}>
        <TestHero service={service} />
        <TestDetail service={service} />
        <OtherServices currentId={service.id} />
      </div>
    </>
  );
}
