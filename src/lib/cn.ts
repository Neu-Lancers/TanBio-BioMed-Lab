/** Tiny className joiner (no dependency). */
export const cn = (...v: Array<string | false | null | undefined>) => v.filter(Boolean).join(" ");
