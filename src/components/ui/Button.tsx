import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[0.95rem] font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky active:translate-y-0";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white border-2 border-brand hover:bg-navy hover:border-navy hover:shadow-lift",
  outline: "bg-transparent text-brand border-2 border-brand hover:bg-brand hover:text-white hover:shadow-lift",
  light: "bg-white text-brand border-2 border-white hover:bg-sky-soft hover:shadow-lift",
};

type Common = { variant?: Variant; className?: string; children: ReactNode };
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined };
type AsRoute = Common & { to: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;
type AsAnchor = Common & { href: string; to?: undefined } & AnchorHTMLAttributes<HTMLAnchorElement>;

/** One button for everything: <Button to="/x"/> (router link), <Button href="…"/> (anchor) or <Button onClick/>. */
export default function Button(props: AsButton | AsRoute | AsAnchor) {
  const { variant = "primary", className, children, ...rest } = props;
  const cls = cn(base, variants[variant], className);

  if ("to" in rest && rest.to) {
    const { to, ...r } = rest as Omit<AsRoute, keyof Common>;
    return (
      <Link to={to} className={cls} {...r}>
        {children}
      </Link>
    );
  }
  if ("href" in rest && rest.href) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
