import { FaPhone, FaWhatsapp } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { BOOK_MESSAGE, SITE, whatsappUrl } from "@/lib/site";

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-navy via-navy to-brand py-14 md:py-20" aria-label="Book your test">
      <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <Reveal className="container relative flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
        <div className="max-w-2xl">
          <h2 className="text-[clamp(1.5rem,1rem+1.8vw,2.5rem)] text-white">Book your test today</h2>
          <p className="mt-3 text-white/80">Accurate results, friendly service and home sample collection — reach us in a minute.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="light" href={whatsappUrl(BOOK_MESSAGE)} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp aria-hidden="true" /> WhatsApp Us
          </Button>
          <Button variant="outline" href={SITE.phoneHref} className="!border-white !text-white hover:!bg-white hover:!text-brand">
            <FaPhone aria-hidden="true" /> {SITE.phone}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
