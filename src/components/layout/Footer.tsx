import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleRight, FaClock, FaEnvelope, FaFacebookF, FaInstagram, FaLocationDot, FaPhone, FaWhatsapp } from "react-icons/fa6";

import logo from "@/assets/images/Logo.webp";
import { SERVICES } from "@/data/services";
import { BOOK_MESSAGE, NAV_LINKS, SITE, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/cn";

/* 0 = Sunday … 6 = Saturday, built from SITE.hours so there is one source of truth */
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const fmt = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
};
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const schedule = DAY_NAMES.map((d) => {
  const h = SITE.hours.find((x) => (x.schema.days as readonly string[]).includes(d))!;
  return { open: h.schema.opens, close: h.schema.closes };
});

function getStatus() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = schedule[day];
  const isOpen = mins >= toMin(today.open) && mins < toMin(today.close);
  if (isOpen) return { isOpen, label: "Closes at", time: fmt(today.close) };
  if (mins < toMin(today.open)) return { isOpen, label: "Opens today", time: fmt(today.open) };
  return { isOpen, label: day === 6 ? "Opens Sunday" : "Opens tomorrow", time: fmt(schedule[(day + 1) % 7].open) };
}

const FOOTER_LINKS = [...NAV_LINKS.filter((l) => l.label !== "FAQ"), { label: "FAQ", to: "/#faq" }];

const socials = [
  { label: "Instagram", href: SITE.social.instagram, Icon: FaInstagram, hover: "hover:bg-[#E1306C]" },
  { label: "Facebook", href: SITE.social.facebook, Icon: FaFacebookF, hover: "hover:bg-[#1877F2]" },
  { label: "WhatsApp", href: whatsappUrl(BOOK_MESSAGE), Icon: FaWhatsapp, hover: "hover:bg-[#25D366]" },
  { label: "Email", href: `mailto:${SITE.email}`, Icon: FaEnvelope, hover: "hover:bg-sky" },
];

const colTitle = "mb-4 text-sm font-bold uppercase tracking-[0.14em] text-white after:mt-2 after:block after:h-0.5 after:w-8 after:rounded after:bg-sky";
const linkCls = "group inline-flex items-center gap-1.5 py-1 text-sm text-white/70 transition-colors duration-300 hover:text-sky";

export default function Footer() {
  const [status, setStatus] = useState(getStatus);

  useEffect(() => {
    const t = window.setInterval(() => setStatus(getStatus()), 60_000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 3xl:py-20">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" aria-label={`${SITE.shortName} home`} className="inline-block rounded-lg bg-white p-2.5">
            <img src={logo} alt={SITE.name} width={160} height={62} loading="lazy" decoding="async" className="h-12 w-auto" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            {SITE.name} delivers accurate, reliable and affordable diagnostic services with advanced technology and the
            highest standards of ethical practice.
          </p>
          <div
            role="status"
            className={cn(
              "mt-5 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm",
              status.isOpen ? "border-emerald-400/40 bg-emerald-400/10" : "border-rose-400/40 bg-rose-400/10",
            )}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", status.isOpen ? "bg-emerald-400" : "bg-rose-400")} />
              <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", status.isOpen ? "bg-emerald-400" : "bg-rose-400")} />
            </span>
            <span className="font-semibold text-white">{status.isOpen ? "Open now" : "Closed"}</span>
            <span className="flex items-center gap-1.5 text-white/60">
              <FaClock aria-hidden="true" className="text-xs" /> {status.label} {status.time}
            </span>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Quick links">
          <h2 className={colTitle}>Quick Links</h2>
          <ul>
            {FOOTER_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className={linkCls}>
                  <FaAngleRight aria-hidden="true" className="text-sky transition-transform duration-300 group-hover:translate-x-1" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label="Our services">
          <h2 className={colTitle}>Our Services</h2>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/tests/${s.slug}`} className={linkCls}>
                  <FaAngleRight aria-hidden="true" className="text-sky transition-transform duration-300 group-hover:translate-x-1" />
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Find us */}
        <div>
          <h2 className={colTitle}>Find Us</h2>
          <address className="space-y-3 text-sm not-italic">
            <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="flex gap-3 text-white/70 transition-colors hover:text-sky">
              <FaLocationDot aria-hidden="true" className="mt-1 shrink-0 text-sky" />
              <span>
                {SITE.address.street},<br />
                {SITE.address.locality} – {SITE.address.postalCode}
              </span>
            </a>
            <a href={SITE.phoneHref} className="flex items-center gap-3 text-white/70 transition-colors hover:text-sky">
              <FaPhone aria-hidden="true" className="shrink-0 text-sky" /> {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 break-all text-white/70 transition-colors hover:text-sky">
              <FaEnvelope aria-hidden="true" className="shrink-0 text-sky" /> {SITE.email}
            </a>
          </address>
          <div className="mt-5 flex gap-2.5">
            {socials.map(({ label, href, Icon, hover }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className={cn("grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1", hover)}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-white/60 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>
            Powered by{" "}
            <a href="https://neulancers.com" target="_blank" rel="noreferrer" className="font-semibold text-sky transition-colors hover:text-white">
              NeuLancers
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
