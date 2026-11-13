import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaPhone, FaXmark } from "react-icons/fa6";

import logo from "@/assets/images/Logo.webp";
import { useBooking } from "@/components/booking/BookingProvider";
import Button from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/cn";
import { scrollToElement, scrollToTop } from "@/lib/smoothScroll";

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
  const { open: openBooking } = useBooking();

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
      if ((p || "/") === pathname) {
        const el = document.getElementById(h);
        if (el) scrollToElement(el);
      }
    } else if (to === pathname) {
      scrollToTop(false);
    }
  };

  const linkCls = (active: boolean) =>
    cn(
      "relative rounded-full px-3.5 py-2 text-btn transition-colors duration-300 3xl:text-body",
      "after:absolute after:inset-x-3.5 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded after:bg-brand after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100",
      active ? "text-brand after:scale-x-100" : "text-ink/80 hover:text-brand",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-500",
        scrolled ? "border-line bg-white/85 shadow-[0_12px_30px_-18px_rgba(10,54,200,.25)]" : "border-transparent bg-white/70",
      )}
    >
      <nav aria-label="Primary" className="container flex h-[var(--nav-h)] items-center justify-between gap-4">
        <Link to="/" onClick={() => handleClick("/")} aria-label={`${SITE.shortName} home`} className="flex shrink-0 items-center">
          <img src={logo} alt={SITE.name} width={180} height={70} loading="eager" decoding="async" className="h-11 w-auto lg:h-12 3xl:h-[70px]" />
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                onClick={() => handleClick(l.to)}
                className={linkCls(isActive(l.to, pathname, hash))}
                aria-current={isActive(l.to, pathname, hash) ? "page" : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={SITE.phoneHref}
            className="group flex items-center gap-2.5 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 transition-all duration-300 hover:border-brand/40 hover:shadow-card"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-small text-white transition-transform duration-300 group-hover:scale-110 3xl:h-10 3xl:w-10">
              <FaPhone aria-hidden="true" />
            </span>
            <span className="hidden leading-tight xl:block">
              <span className="block text-caption font-medium uppercase tracking-wider text-muted">Call us</span>
              <span className="block text-small font-bold text-navy 3xl:text-body">{SITE.phone}</span>
            </span>
          </a>
          <Button variant="primary" arrow onClick={() => openBooking()} className="!px-5 !py-3">
            Book Appointment
          </Button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-lg text-navy transition-colors hover:bg-sky-soft lg:hidden"
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
          "grid overflow-hidden bg-white transition-[grid-template-rows,opacity] duration-500 ease-out lg:hidden",
          open ? "grid-rows-[1fr] border-t border-line opacity-100 shadow-lift" : "grid-rows-[0fr] opacity-0",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="container flex flex-col gap-1 py-4">
            {NAV_LINKS.map((l, i) => (
              <li
                key={l.label}
                style={{ transitionDelay: open ? `${i * 45}ms` : "0ms" }}
                className={cn("transition-all duration-500 ease-out", open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0")}
              >
                <Link
                  to={l.to}
                  onClick={() => handleClick(l.to)}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3.5 font-semibold transition-colors",
                    isActive(l.to, pathname, hash) ? "bg-sky-soft text-brand" : "text-ink hover:bg-sky-soft",
                  )}
                >
                  {l.label}
                  <span aria-hidden="true" className="text-brand/50">→</span>
                </Link>
              </li>
            ))}
            <li className="mt-3 flex flex-col gap-2.5 sm:flex-row">
              <Button href={SITE.phoneHref} variant="outline" className="flex-1">
                <FaPhone aria-hidden="true" /> {SITE.phone}
              </Button>
              <Button
                variant="primary"
                arrow
                className="flex-1"
                onClick={() => {
                  setOpen(false);
                  openBooking();
                }}
              >
                Book Appointment
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
