import { FaCircleCheck, FaFileMedical, FaFlask, FaVial } from "react-icons/fa6";
import Tilt3D from "@/components/ui/Tilt3D";
import { cn } from "@/lib/cn";

type Row = { test: string; value: string; unit: string; status: "Normal" | "Review" };

/** Generic demo values — illustrative only, not real patient data. */
const ROWS: Row[] = [
  { test: "Hemoglobin", value: "13.8", unit: "g/dL", status: "Normal" },
  { test: "Fasting Glucose", value: "92", unit: "mg/dL", status: "Normal" },
  { test: "TSH", value: "2.4", unit: "µIU/mL", status: "Normal" },
  { test: "Vitamin D", value: "28", unit: "ng/mL", status: "Review" },
];

const SIDEBAR = [
  { icon: FaFileMedical, label: "Reports", active: true },
  { icon: FaFlask, label: "Tests" },
  { icon: FaVial, label: "Samples" },
];

/**
 * Self-contained "lab report dashboard" card built in HTML/CSS (no image). Tilts in 3D with the
 * pointer, with two floating chips at different depths. Safe to reuse on any page.
 */
export default function ReportMockup({ className }: { className?: string }) {
  return (
    <Tilt3D className={cn("pointer-events-auto w-full", className)} rest={{ x: 7, y: -14, z: 1.5 }} max={8}>
      <div className="relative [transform-style:preserve-3d]">
      <style>{`@keyframes rm-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}`}</style>
      <div
        aria-hidden="true"
        className="relative overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_40px_70px_-30px_rgba(6,11,26,.55)]"
      >
        {/* window chrome */}
        <div className="flex items-center gap-1.5 border-b border-line bg-sky-soft/70 px-3.5 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6159]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c940]" />
          <span className="ml-3 hidden h-4 flex-1 rounded-full bg-white/90 sm:block" />
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-white sm:ml-3">
            <FaCircleCheck /> Report ready
          </span>
        </div>

        <div className="grid grid-cols-[3.4rem_1fr] sm:grid-cols-[6.5rem_1fr]">
          {/* sidebar */}
          <div className="space-y-1.5 border-r border-line bg-white p-2 sm:p-3">
            <p className="mb-2 hidden font-extrabold leading-none text-navy sm:block">
              <span className="text-[0.8rem]">Tan</span>
              <span className="text-[0.8rem] text-brand">Bio</span>
            </p>
            {SIDEBAR.map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg px-1.5 py-2 text-[0.62rem] font-semibold sm:justify-start sm:px-2.5",
                  active ? "bg-brand text-white shadow-[0_8px_16px_-8px_rgba(10,54,200,.8)]" : "text-muted",
                )}
              >
                <Icon className="text-[0.8rem]" />
                <span className="hidden sm:inline">{label}</span>
              </div>
            ))}
          </div>

          {/* main */}
          <div className="min-w-0 p-3 sm:p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.55rem] font-semibold uppercase tracking-widest text-muted">Sample report</p>
                <p className="text-[0.85rem] font-extrabold leading-tight text-navy sm:text-[0.95rem]">Complete Health Panel</p>
              </div>
              {/* sparkline */}
              <svg viewBox="0 0 90 32" className="h-8 w-[5.5rem] shrink-0" fill="none">
                <defs>
                  <linearGradient id="rm-spark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#0A36C8" stopOpacity=".25" />
                    <stop offset="1" stopColor="#0A36C8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M2 24 L16 18 L28 22 L42 10 L56 15 L70 6 L88 9 L88 32 L2 32 Z" fill="url(#rm-spark)" />
                <path d="M2 24 L16 18 L28 22 L42 10 L56 15 L70 6 L88 9" stroke="#0A36C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="88" cy="9" r="2.6" fill="#34E3F0" stroke="#0A36C8" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="overflow-hidden rounded-xl border border-line">
              <div className="grid grid-cols-[1.2fr_1fr_auto] gap-2 bg-sky-soft/70 px-3 py-1.5 text-[0.52rem] font-bold uppercase tracking-wider text-muted">
                <span>Test</span>
                <span>Result</span>
                <span className="w-14 text-right">Status</span>
              </div>
              {ROWS.map((r) => (
                <div key={r.test} className="grid grid-cols-[1.2fr_1fr_auto] items-center gap-2 border-t border-line px-3 py-2 text-[0.66rem] text-navy">
                  <span className="truncate font-semibold">{r.test}</span>
                  <span className="truncate text-muted">
                    <b className="font-bold text-navy">{r.value}</b> {r.unit}
                  </span>
                  <span
                    className={cn(
                      "w-14 rounded-full px-2 py-0.5 text-center text-[0.55rem] font-bold",
                      r.status === "Normal" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700",
                    )}
                  >
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* gloss */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/40" />
      </div>

      {/* floating chips (depth) */}
      <span aria-hidden="true" style={{ transform: "translateZ(60px)" }} className="absolute -right-3 -top-4 sm:-right-6">
        <span style={{ animation: "rm-float 5s ease-in-out infinite" }} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.62rem] font-bold text-brand shadow-glow">
          <FaCircleCheck className="text-emerald-500" /> Verified
        </span>
      </span>
      <span aria-hidden="true" style={{ transform: "translateZ(80px)" }} className="absolute -bottom-4 -left-3 sm:-left-6">
        <span style={{ animation: "rm-float 6s ease-in-out -2s infinite" }} className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-[0.62rem] font-bold text-white shadow-lift">
          <FaFileMedical /> PDF · Email · WhatsApp
        </span>
      </span>
      </div>
    </Tilt3D>
  );
}
