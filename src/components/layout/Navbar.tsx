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
      "relative rounded-full px-3 py-2 text-[0.8125rem] font-medium transition-colors duration-300 xl:px-3.5 3xl:text-body",
      "after:absolute after:inset-x-3 after:bottom-1 xl:after:inset-x-3.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded after:bg-brand after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100",
      active ? "text-brand after:scale-x-100" : "text-ink/80 hover:text-brand",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white/95 transition-[box-shadow,border-color] duration-300",
        scrolled ? "border-line shadow-[0_10px_28px_-20px_rgba(10,54,200,.35)]" : "border-line/60",
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

        <div className="flex items-center gap-2.5 xl:gap-4">
          {/* xl+: plain phone link; below xl: round icon button */}
          <a href={SITE.phoneHref} aria-label={`Call us on ${SITE.phone}`} className="group hidden items-center gap-2.5 xl:flex">
            <FaPhone aria-hidden="true" className="text-lg text-brand transition-transform duration-300 group-hover:rotate-12" />
            <span className="leading-tight">
              <span className="block text-caption font-medium uppercase tracking-wider text-muted">Call us</span>
              <span className="block text-small font-bold text-navy transition-colors group-hover:text-brand">{SITE.phone}</span>
            </span>
          </a>
          <a
            href={SITE.phoneHref}
            aria-label={`Call us on ${SITE.phone}`}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-base text-brand transition-colors hover:bg-sky-soft xl:hidden"
          >
            <FaPhone aria-hidden="true" />
          </a>
          <Button variant="primary" onClick={() => openBooking()} className="hidden !h-11 !px-6 !py-0 shadow-[0_6px_16px_-8px_rgba(10,54,200,.55)] lg:inline-flex">
            Book Appointment
          </Button>
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
        </div>
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
                    "flex items-center justify-between rounded-2xl px-4 py-3 text-small font-semibold transition-colors",
                    isActive(l.to, pathname, hash) ? "bg-sky-soft text-brand" : "text-ink hover:bg-sky-soft",
                  )}
                >
                  {l.label}
                  <span aria-hidden="true" className="text-brand/50">→</span>
                </Link>
              </li>
            ))}
            <li className="mt-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
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
