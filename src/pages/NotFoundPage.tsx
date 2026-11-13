import Button from "@/components/ui/Button";
import Seo from "@/components/ui/Seo";

export default function NotFoundPage() {
  return (
    <section className="section relative grid min-h-[65vh] place-items-center overflow-hidden bg-gradient-to-br from-white via-sky-soft to-[#dfe8ff]">
      <Seo title="Page not found | TanBio BioMed Genomics Laboratory" description="The page you are looking for does not exist." path="/404" noindex />
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-cyan-glow/20 blur-3xl" aria-hidden="true" />
      <div className="container relative text-center">
        <span className="eyebrow">Error 404</span>
        <p className="bg-gradient-to-b from-brand to-brand-light bg-clip-text text-[clamp(5rem,3rem+10vw,10rem)] font-extrabold leading-none tracking-tighter text-transparent">404</p>
        <h1 className="mt-2 text-h2">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md">The page you requested may have moved or no longer exists. Let&rsquo;s get you back on track.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button to="/" arrow>Go to Home</Button>
          <Button to="/services" variant="outline">View Services</Button>
          <Button to="/contact" variant="outline">Contact Us</Button>
        </div>
      </div>
    </section>
  );
}
