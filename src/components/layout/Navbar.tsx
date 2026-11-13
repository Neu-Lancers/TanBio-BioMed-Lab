import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaPhone, FaWhatsapp, FaXmark } from "react-icons/fa6";

import logo from "@/assets/images/Logo.webp";
import { BOOK_MESSAGE, NAV_LINKS, SITE, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/cn";

function isActive(to: string, pathname: string, hash: string) {
  if (to.includes("#")) {
    const [p, h] = to.split("#");
    return pathname === (p || "/") && hash === `#${h}`;
  }
  if (to === "/") return pathname === "/" && !hash;
  return pathname.startsWith(to);
}

export default function Navbar() {
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Same-page hash links: ScrollManager only reacts to location changes, so scroll directly. */
  const handleClick = (to: string) => {
    setOpen(false);
    if (to.includes("#")) {
      const [p, h] = to.split("#");
      if ((p || "/") === pathname) document.getElementById(h)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (to === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const linkCls = (active: boolean) =>
    cn(
      "relative rounded-md px-3 py-2 text-[0.95rem] font-semibold transition-colors duration-300 3xl:text-base",
      "after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded after:bg-sky after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100",
      active ? "text-brand after:scale-x-100" : "text-ink hover:text-brand",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md transition-shadow duration-300",
        scrolled ? "border-line shadow-card" : "border-transparent",
      )}
    >
      <nav aria-label="Primary" className="container flex h-[var(--nav-h)] items-center justify-between gap-4">
        <Link to="/" onClick={() => handleClick("/")} aria-label={`${SITE.shortName} home`} className="flex shrink-0 items-center">
          <img src={logo} alt={SITE.name} width={180} height={70} loading="eager" decoding="async" className="h-11 w-auto lg:h-12 3xl:h-[70px]" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <Link to={l.to} onClick={() => handleClick(l.to)} className={linkCls(isActive(l.to, pathname, hash))} aria-current={isActive(l.to, pathname, hash) ? "page" : undefined}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={SITE.phoneHref} className="group flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-sky-soft text-brand transition-transform duration-300 group-hover:scale-110 3xl:h-11 3xl:w-11">
              <FaPhone aria-hidden="true" />
            </span>
            <span className="hidden leading-tight xl:block">
              <span className="block text-xs text-muted">Call us</span>
              <span className="block text-[0.95rem] font-bold text-navy 3xl:text-base">{SITE.phone}</span>
            </span>
          </a>
          <a
            href={whatsappUrl(BOOK_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-[0.95rem] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy hover:shadow-lift"
          >
            <FaWhatsapp aria-hidden="true" /> Book Appointment
          </a>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-xl text-navy transition-colors hover:bg-sky-soft lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "grid overflow-hidden border-line bg-white transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden",
          open ? "grid-rows-[1fr] border-t opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="container flex flex-col gap-1 py-3">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  onClick={() => handleClick(l.to)}
                  className={cn(
                    "block rounded-lg px-3 py-3 font-semibold transition-colors",
                    isActive(l.to, pathname, hash) ? "bg-sky-soft text-brand" : "text-ink hover:bg-sky-soft",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex flex-col gap-2 sm:flex-row">
              <a href={SITE.phoneHref} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-brand px-4 py-2.5 font-semibold text-brand">
                <FaPhone aria-hidden="true" /> {SITE.phone}
              </a>
              <a
                href={whatsappUrl(BOOK_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 font-semibold text-white"
              >
                <FaWhatsapp aria-hidden="true" /> Book Appointment
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
