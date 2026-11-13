import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleRight, FaBolt, FaEnvelope, FaFacebookF, FaInstagram, FaLocationDot, FaPhone, FaRegClock, FaWhatsapp } from "react-icons/fa6";

import logo from "@/assets/images/Logo.webp";
import { useBooking } from "@/components/booking/BookingProvider";
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

const socials = [
  { label: "Instagram", href: SITE.social.instagram, Icon: FaInstagram, hover: "hover:bg-[#E1306C]" },
  { label: "Facebook", href: SITE.social.facebook, Icon: FaFacebookF, hover: "hover:bg-[#1877F2]" },
  { label: "WhatsApp", href: whatsappUrl(BOOK_MESSAGE), Icon: FaWhatsapp, hover: "hover:bg-[#25D366]" },
  { label: "Email", href: `mailto:${SITE.email}`, Icon: FaEnvelope, hover: "hover:bg-brand" },
];

const colTitle =
  "mb-3.5 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-white after:mt-2 after:block after:h-0.5 after:w-8 after:rounded after:bg-cyan-glow";
const linkCls = "group inline-flex items-center gap-1.5 py-[3px] text-sm text-white/70 transition-colors duration-300 hover:text-white";
const chev = <FaAngleRight aria-hidden="true" className="text-[0.7rem] text-cyan-glow transition-transform duration-300 group-hover:translate-x-1" />;

/* Subtle wave-line backdrop (as in the original footer) */
function WaveBg() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.18]" aria-hidden="true">
      <svg viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        {[80, 160, 240, 320, 400, 480].map((y, i) => (
          <path key={y} d={`M0 ${y} Q360 ${y - 28 + i * 4} 720 ${y} Q1080 ${y + 28 - i * 3} 1440 ${y}`} fill="none" stroke="#34E3F0" strokeWidth="1" opacity={0.6 - i * 0.08} />
        ))}
        {[120, 200, 280, 360, 440, 520].map((y, i) => (
          <path key={"b" + y} d={`M0 ${y} Q360 ${y + 20 - i * 3} 720 ${y} Q1080 ${y - 20 + i * 2} 1440 ${y}`} fill="none" stroke="#3B63E6" strokeWidth="0.8" opacity={0.5 - i * 0.06} />
        ))}
      </svg>
    </div>
  );
}

export default function Footer() {
  const [status, setStatus] = useState(getStatus);
  const { open: openBooking } = useBooking();

  useEffect(() => {
    const t = window.setInterval(() => setStatus(getStatus()), 60_000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <footer className="relative overflow-hidden bg-[#0d1f30] text-white/80">
      <WaveBg />

      <div className="container relative grid gap-x-8 gap-y-9 py-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.25fr] lg:py-12 3xl:py-16">
        {/* Brand + status */}
        <div>
          <Link to="/" aria-label={`${SITE.shortName} home`} className="inline-block rounded-2xl bg-white p-2.5">
            <img src={logo} alt={SITE.name} width={160} height={62} loading="lazy" decoding="async" className="h-12 w-auto" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            {SITE.name} delivers accurate, reliable and affordable diagnostic services with cutting-edge technology and the
            highest standards of ethical practice.
          </p>

          {/* Status badge — flips between Open/Closed and the next open/close time (bottom-to-top) */}
          <div
            role="status"
            aria-label={`${status.isOpen ? "Open now" : "Closed"}. ${status.label} ${status.time}`}
            className="mt-5 h-10 w-[13.5rem] [perspective:600px]"
          >
            <div className="relative h-full w-full animate-ft-flip [transform-style:preserve-3d] motion-reduce:animate-none">
              <div
                className={cn(
                  "absolute inset-0 flex items-center gap-2.5 rounded-full border px-4 [backface-visibility:hidden]",
                  status.isOpen ? "border-emerald-400/40 bg-emerald-400/10" : "border-rose-400/40 bg-rose-400/10",
                )}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", status.isOpen ? "bg-emerald-400" : "bg-rose-400")} />
                  <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", status.isOpen ? "bg-emerald-400" : "bg-rose-400")} />
                </span>
                <span className="text-sm font-semibold text-white">{status.isOpen ? "Open Now" : "Closed"}</span>
              </div>
              <div className="absolute inset-0 flex items-center gap-2.5 rounded-full border border-cyan-glow/30 bg-cyan-glow/10 px-4 [backface-visibility:hidden] [transform:rotateX(-180deg)_rotateY(180deg)]">
                <FaRegClock aria-hidden="true" className="text-cyan-glow" />
                <span className="flex flex-col leading-tight">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-wider text-white/60">{status.label}</span>
                  <span className="text-sm font-bold text-white">{status.time}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Quick links">
          <h2 className={colTitle}>Quick Links</h2>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className={linkCls}>
                  {chev}
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <button type="button" onClick={() => openBooking()} className={linkCls}>
                {chev}
                Book Appointment
              </button>
            </li>
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label="Our services">
          <h2 className={colTitle}>Our Services</h2>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/tests/${s.slug}`} className={linkCls}>
                  {chev}
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Find us */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className={colTitle}>Find Us</h2>
          <address className="space-y-3 text-sm not-italic">
            <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="flex gap-3 text-white/70 transition-colors hover:text-white">
              <FaLocationDot aria-hidden="true" className="mt-1 shrink-0 text-cyan-glow" />
              <span>
                {SITE.address.street},<br />
                {SITE.address.locality} – {SITE.address.postalCode}
              </span>
            </a>
            <a href={SITE.phoneHref} className="flex items-center gap-3 text-white/70 transition-colors hover:text-white">
              <FaPhone aria-hidden="true" className="shrink-0 text-cyan-glow" /> {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 break-all text-white/70 transition-colors hover:text-white">
              <FaEnvelope aria-hidden="true" className="shrink-0 text-cyan-glow" /> {SITE.email}
            </a>
          </address>
          <div className="mt-4 flex gap-2.5">
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

      <div className="relative border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-4 pr-4 text-center text-xs text-white/60 sm:flex-row sm:pr-24 sm:text-left">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2.5">
            <span className="whitespace-nowrap">Powered by</span>
            <a
              href="https://neulancers.com"
              target="_blank"
              rel="noreferrer"
              aria-label="NeuLancers"
              className="group relative inline-flex items-center gap-[7px] overflow-hidden rounded-full border border-[rgba(196,181,253,.35)] bg-[rgba(196,181,253,.12)] py-1.5 pl-2.5 pr-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,.22)] backdrop-blur-[14px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_18px_4px_rgba(167,139,250,.35),inset_0_1px_0_rgba(255,255,255,.28)]"
            >
              <span className="pointer-events-none absolute inset-0 animate-nl-shimmer rounded-[inherit] bg-[linear-gradient(105deg,transparent_30%,rgba(196,181,253,.22)_50%,transparent_70%)] bg-[length:200%_100%]" />
              <FaBolt aria-hidden="true" className="relative animate-nl-bolt text-xs text-[#a78bfa] [filter:drop-shadow(0_0_4px_#a78bfa)]" />
              <span className="relative whitespace-nowrap bg-gradient-to-r from-white to-[#a78bfa] bg-clip-text text-[13px] font-bold tracking-[0.04em] text-transparent">NeuLancers</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
