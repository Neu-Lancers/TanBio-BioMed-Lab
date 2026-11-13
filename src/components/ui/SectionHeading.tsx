import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: string;
  highlight?: string;
  /** put the highlighted words before the title ("AI Products for…" style) */
  highlightFirst?: boolean;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  highlightFirst,
  description,
  align = "center",
  tone = "dark",
  className,
}: Props) {
  const hl = highlight && <span className={tone === "light" ? "text-cyan-glow" : "heading-hl"}>{highlight}</span>;
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <span className={cn("eyebrow", tone === "light" && "!border-white/25 !bg-white/10 !text-white")}>{eyebrow}</span>
      <h2 className={cn("heading", tone === "light" && "!text-white")}>
        {highlightFirst && hl} {title} {!highlightFirst && hl}
      </h2>
      {description && <p className={cn("mt-4 text-[1.02rem] leading-relaxed", tone === "light" ? "text-white/80" : "text-muted")}>{description}</p>}
    </div>
  );
}
