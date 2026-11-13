import { cn } from "@/lib/cn";

const initials = (name: string) =>
  name
    .replace(/^(Dr|Ms|Mr|Mrs)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

/** Photo if provided, otherwise a brand-gradient circle with initials (no third-party images). */
export default function Avatar({ name, photo, className }: { name: string; photo?: string; className?: string }) {
  if (photo) {
    return <img src={photo} alt={name} width={96} height={96} loading="lazy" decoding="async" className={cn("rounded-full object-cover", className)} />;
  }
  return (
    <span aria-hidden="true" className={cn("grid place-items-center rounded-full bg-gradient-to-br from-brand to-sky font-bold text-white", className)}>
      {initials(name)}
    </span>
  );
}
