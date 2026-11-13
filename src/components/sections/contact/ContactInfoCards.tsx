import type { ReactNode } from "react";
import { FaEnvelope, FaFileLines, FaPhone, FaWhatsapp } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import { SITE, whatsappUrl } from "@/lib/site";

const EMAIL_SUBJECT = "Enquiry - TANBIO Biomed Genomics Laboratory";

/* Phones/tablets open the native mail app; desktops (often with no mail client) open Gmail compose. */
function isMobileDevice() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini|BlackBerry|webOS/i.test(navigator.userAgent);
}

function emailLink() {
  const subject = encodeURIComponent(EMAIL_SUBJECT);
  return isMobileDevice()
    ? { href: `mailto:${SITE.email}?subject=${subject}`, external: false }
    : { href: `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE.email}&su=${subject}`, external: true };
}

type Card = { icon: ReactNode; tone: string; title: string; primary: string; secondary: string; href: string; external: boolean };

export default function ContactInfoCards() {
  const mail = emailLink();
  const cards: Card[] = [
    { icon: <FaPhone />, tone: "bg-brand", title: "Call Us", primary: SITE.phone, secondary: "We are just a call away", href: SITE.phoneHref, external: false },
    {
      icon: <FaWhatsapp />,
      tone: "bg-[#25D366]",
      title: "WhatsApp",
      primary: SITE.phone,
      secondary: "Chat with us on WhatsApp",
      href: whatsappUrl("Hi, I'd like to get in touch with TANBIO Biomed Genomics Laboratory."),
      external: true,
    },
    { icon: <FaEnvelope />, tone: "bg-brand", title: "Email Us", primary: SITE.email, secondary: "We reply within 24 hours", href: mail.href, external: mail.external },
    {
      icon: <FaFileLines />,
      tone: "bg-brand",
      title: "Report Delivery",
      primary: "Via Email / WhatsApp",
      secondary: "Printed reports available",
      href: whatsappUrl("Hi, I'd like an update on my report delivery status."),
      external: true,
    },
  ];

  return (
    <section className="section pb-6 md:pb-8" id="contact-info">
      <div className="container grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 90} className="h-full">
            <a
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={`${c.title}: ${c.primary}`}
              className="card card-hover flex h-full items-center gap-4 p-5 text-inherit hover:text-inherit"
            >
              <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-full text-xl text-white ${c.tone}`}>{c.icon}</span>
              <span className="min-w-0">
                <span className="block text-sm font-bold uppercase tracking-wide text-navy">{c.title}</span>
                <span className="block break-words font-semibold text-ink">{c.primary}</span>
                <span className="block text-sm">{c.secondary}</span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
