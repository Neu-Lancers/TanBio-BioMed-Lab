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
 * Self-contained "lab report dashboard" built in HTML/CSS (no image).
 * FLUID: everything is sized in `em`, and the root font-size is 1/36 of the container width
 * (container query units), so the whole card scales proportionally at any width — no clipped or
 * wrapped text on small screens. Tilts in 3D with the pointer; two floating chips add depth.
 */
export default function ReportMockup({ className }: { className?: string }) {
  return (
    <div className={cn("w-full [container-type:inline-size]", className)}>
      <Tilt3D rest={{ x: 7, y: -14, z: 1.5 }} max={8}>
        <div className="relative [transform-style:preserve-3d]" style={{ fontSize: "clamp(6.5px, calc(100cqw / 36), 15px)" }}>
          <style>{`@keyframes rm-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-.55em)}}`}</style>
          <div
            aria-hidden="true"
            className="relative overflow-hidden rounded-[1.1em] border border-white/70 bg-white shadow-[0_40px_70px_-30px_rgba(6,11,26,.55)]"
          >
            {/* window chrome */}
            <div className="flex items-center gap-[0.45em] border-b border-line bg-sky-soft/70 px-[1em] py-[0.7em]">
              <span className="h-[0.7em] w-[0.7em] rounded-full bg-[#ff6159]" />
              <span className="h-[0.7em] w-[0.7em] rounded-full bg-[#ffbd2e]" />
              <span className="h-[0.7em] w-[0.7em] rounded-full bg-[#28c940]" />
              <span className="ml-[0.8em] h-[1.1em] flex-1 rounded-full bg-white/90" />
              <span className="ml-auto inline-flex items-center gap-[0.3em] rounded-full bg-brand px-[0.8em] py-[0.25em] text-[0.62em] font-bold uppercase tracking-wider text-white">
                <FaCircleCheck /> Report ready
              </span>
            </div>

            <div className="grid grid-cols-[6em_1fr]">
              {/* sidebar */}
              <div className="space-y-[0.4em] border-r border-line bg-white p-[0.7em]">
                <p className="mb-[0.6em] font-extrabold leading-none text-navy">
                  <span className="text-[1em]">Tan</span>
                  <span className="text-[1em] text-brand">Bio</span>
                </p>
                {SIDEBAR.map(({ icon: Icon, label, active }) => (
                  <div
                    key={label}
                    className={cn(
                      "flex items-center gap-[0.5em] rounded-[0.6em] px-[0.6em] py-[0.55em] text-[0.8em] font-semibold",
                      active ? "bg-brand text-white shadow-[0_8px_16px_-8px_rgba(10,54,200,.8)]" : "text-muted",
                    )}
                  >
                    <Icon />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* main */}
              <div className="min-w-0 p-[1em]">
                <div className="mb-[0.8em] flex items-start justify-between gap-[0.8em]">
                  <div>
                    <p className="text-[0.62em] font-semibold uppercase tracking-widest text-muted">Sample report</p>
                    <p className="text-[1.15em] font-extrabold leading-tight text-navy">Complete Health Panel</p>
                  </div>
                  <svg viewBox="0 0 90 32" className="h-[2.4em] w-[6.5em] shrink-0" fill="none">
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

                <div className="overflow-hidden rounded-[0.7em] border border-line">
                  <div className="grid grid-cols-[1.2fr_1fr_5em] gap-[0.5em] bg-sky-soft/70 px-[0.8em] py-[0.45em] text-[0.62em] font-bold uppercase tracking-wider text-muted">
                    <span>Test</span>
                    <span>Result</span>
                    <span className="text-right">Status</span>
                  </div>
                  {ROWS.map((r) => (
                    <div key={r.test} className="grid grid-cols-[1.2fr_1fr_5em] items-center gap-[0.5em] border-t border-line px-[0.8em] py-[0.55em] text-[0.8em] text-navy">
                      <span className="truncate font-semibold">{r.test}</span>
                      <span className="truncate text-muted">
                        <b className="font-bold text-navy">{r.value}</b> {r.unit}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-[0.4em] py-[0.2em] text-center text-[0.8em] font-bold",
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

          {/* floating chips (depth) — kept within ~0.6em of the card so they never cause overflow */}
          <span aria-hidden="true" style={{ transform: "translateZ(60px)" }} className="absolute -top-[1em] right-[0.6em]">
            <span style={{ animation: "rm-float 5s ease-in-out infinite" }} className="inline-flex items-center gap-[0.4em] rounded-full bg-white px-[0.9em] py-[0.45em] text-[0.8em] font-bold text-brand shadow-glow">
              <FaCircleCheck className="text-emerald-500" /> Verified
            </span>
          </span>
          <span aria-hidden="true" style={{ transform: "translateZ(80px)" }} className="absolute -bottom-[1em] left-[0.6em]">
            <span style={{ animation: "rm-float 6s ease-in-out -2s infinite" }} className="inline-flex items-center gap-[0.4em] rounded-[0.8em] bg-brand px-[0.9em] py-[0.55em] text-[0.8em] font-bold text-white shadow-lift">
              <FaFileMedical /> PDF · Email · WhatsApp
            </span>
          </span>
        </div>
      </Tilt3D>
    </div>
  );
}
