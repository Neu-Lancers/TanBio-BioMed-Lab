import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({ eyebrow, title, highlight, description, align = "center", className }: Props) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="heading">
        {title} {highlight && <span className="text-sky">{highlight}</span>}
      </h2>
      {description && <p className="mt-3 text-muted">{description}</p>}
    </div>
  );
}
