import { FaClock, FaHouseMedical, FaVial } from "react-icons/fa6";
import { Navigate, useParams } from "react-router-dom";
import { useBooking } from "@/components/booking/BookingProvider";
import OtherServices from "@/components/sections/services/OtherServices";
import { TestDetail } from "@/components/sections/services/TestDetail";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Seo from "@/components/ui/Seo";
import { getServiceBySlug } from "@/data/services";
import { SITE } from "@/lib/site";

export default function TestPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  const { open } = useBooking();

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
        <Breadcrumbs schema={false} items={[{ label: "Services", to: "/services" }, { label: service.title }]} />
        <Hero
          eyebrow="Diagnostic Service"
          title={service.title}
          description={service.description}
          image={service.image}
          imageAlt={service.title}
          features={[
            { icon: <FaVial />, label: `${service.tests.length} Tests`, sub: "Available" },
            { icon: <FaHouseMedical />, label: "Home Collection", sub: "At your doorstep" },
            { icon: <FaClock />, label: "Timely Reports", sub: "Accurate results" },
          ]}
        >
          <Button arrow onClick={() => open({ preselect: service.slug })}>
            Book This Test
          </Button>
          <Button to="/services" variant="outline">
            All Services
          </Button>
        </Hero>
        <TestDetail service={service} />
        <OtherServices currentId={service.id} />
      </div>
    </>
  );
}
