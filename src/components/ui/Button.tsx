import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "outline" | "light" | "ghost-light";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[0.95rem] font-semibold leading-none transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-[0_10px_24px_-10px_rgba(10,54,200,.7)] hover:bg-brand-dark hover:shadow-lift",
  dark: "bg-[#2b2f3a] text-white hover:bg-navy hover:shadow-[0_18px_34px_-14px_rgba(11,22,51,.6)]",
  outline: "border-2 border-brand/25 bg-white text-brand hover:border-brand hover:bg-brand hover:text-white",
  light: "bg-white text-brand hover:bg-sky-soft hover:shadow-lift",
  "ghost-light": "border border-white/50 bg-white/5 text-white backdrop-blur hover:bg-white hover:text-brand",
};

type Common = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  /** show the trailing → arrow that nudges on hover */
  arrow?: boolean;
};
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined };
type AsRoute = Common & { to: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;
type AsAnchor = Common & { href: string; to?: undefined } & AnchorHTMLAttributes<HTMLAnchorElement>;

/** One button for everything: <Button to="/x"/> (router link), <Button href="…"/> (anchor) or <Button onClick/>. */
export default function Button(props: AsButton | AsRoute | AsAnchor) {
  const { variant = "primary", className, children, arrow, ...rest } = props;
  const cls = cn(base, variants[variant], className);
  const content = (
    <>
      {children}
      {arrow && <FaArrowRight aria-hidden="true" className="text-[0.8em] transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );

  if ("to" in rest && rest.to) {
    const { to, ...r } = rest as Omit<AsRoute, keyof Common>;
    return (
      <Link to={to} className={cls} {...r}>
        {content}
      </Link>
    );
  }
  if ("href" in rest && rest.href) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
