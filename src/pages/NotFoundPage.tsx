import Button from "@/components/ui/Button";
import Seo from "@/components/ui/Seo";

export default function NotFoundPage() {
  return (
    <section className="section grid min-h-[60vh] place-items-center bg-sky-soft/60">
      <Seo title="Page not found | TanBio BioMed Genomics Laboratory" description="The page you are looking for does not exist." path="/404" noindex />
      <div className="container text-center">
        <p className="text-7xl font-extrabold text-sky 3xl:text-8xl">404</p>
        <h1 className="mt-2 text-2xl md:text-3xl">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md">The page you requested may have moved or no longer exists. Let&rsquo;s get you back on track.</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to="/">Go to Home</Button>
          <Button to="/services" variant="outline">View Services</Button>
          <Button to="/contact" variant="outline">Contact Us</Button>
        </div>
      </div>
    </section>
  );
}
