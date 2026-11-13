import { useCallback, useEffect, useId, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";
import { FaClipboardList, FaWhatsapp, FaXmark } from "react-icons/fa6";

import bookImg from "@/assets/images/contact-girl.webp";
import patternBg from "@/assets/images/home-pattern.webp";
import { SERVICES } from "@/data/services";
import { cn } from "@/lib/cn";
import { whatsappUrl } from "@/lib/site";

type Props = {
  open: boolean;
  onClose: () => void;
  /** service slug / service title / exact test name to bring into focus */
  preselect?: string;
};

type Values = { name: string; phone: string; age: string; gender: string; date: string };
type Errors = Partial<Record<keyof Values | "tests", string>>;

const EMPTY: Values = { name: "", phone: "", age: "", gender: "", date: "" };
const EXIT_MS = 220;

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const inputCls =
  "w-full rounded-xl border border-navy/20 bg-white px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-muted/60 transition focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/20 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-100";
const labelCls = "mb-1.5 block text-[0.82rem] font-bold text-navy";

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function BookingModal({ open, onClose, preselect }: Props) {
  const uid = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  /** `render` keeps the DOM mounted while the exit transition plays; `shown` drives the transition. */
  const [render, setRender] = useState(open);
  const [shown, setShown] = useState(false);

  const [values, setValues] = useState<Values>(EMPTY);
  const [selected, setSelected] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const today = useMemo(todayISO, []);

  /* ── resolve `preselect` to a category (scroll into view) or a single test (pre-check) ── */
  const target = useMemo(() => {
    if (!preselect) return null;
    const q = preselect.trim().toLowerCase();
    const svc = SERVICES.find((s) => s.slug === q || s.title.toLowerCase() === q);
    if (svc) return { serviceId: svc.id, test: null as string | null };
    for (const s of SERVICES) {
      const t = s.tests.find((x) => x.name.toLowerCase() === q);
      if (t) return { serviceId: s.id, test: t.name };
    }
    return null;
  }, [preselect]);

  /* ── open / close lifecycle ── */
  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      setRender(true);
      if (target?.test) setSelected((p) => (p.includes(target.test!) ? p : [...p, target.test!]));
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      document.documentElement.classList.add("lenis-stopped");
      document.body.style.overflow = "hidden";
      const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus({ preventScroll: true }), 120);
      const scrollTimer = window.setTimeout(() => {
        if (target) document.getElementById(`${uid}-cat-${target.serviceId}`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }, 320);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(focusTimer);
        window.clearTimeout(scrollTimer);
      };
    }
    setShown(false);
    document.documentElement.classList.remove("lenis-stopped");
    document.body.style.overflow = "";
    const t = window.setTimeout(() => {
      setRender(false);
      returnFocusRef.current?.focus?.({ preventScroll: true });
    }, EXIT_MS);
    return () => window.clearTimeout(t);
  }, [open, target, uid]);

  /* never leave the page locked if unmounted while open */
  useEffect(
    () => () => {
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    },
    [],
  );

  const reset = useCallback(() => {
    setValues(EMPTY);
    setSelected([]);
    setErrors({});
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  /* ── keyboard: Esc closes, Tab stays inside the dialog ── */
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      handleClose();
      return;
    }
    if (e.key !== "Tab") return;
    const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!nodes?.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  /* ── field handlers (same input rules as the original form) ── */
  const clearError = (k: keyof Errors) => setErrors((p) => (p[k] ? { ...p, [k]: undefined } : p));
  const set = (k: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const v = e.target.value;
    if (k === "name" && !/^[A-Za-z\s]*$/.test(v)) return;
    if (k === "phone" && !/^\d{0,10}$/.test(v)) return;
    if (k === "age" && !/^\d{0,3}$/.test(v)) return;
    setValues((p) => ({ ...p, [k]: v }));
    clearError(k);
  };
  const toggle = (name: string) => {
    setSelected((p) => (p.includes(name) ? p.filter((t) => t !== name) : [...p, name]));
    clearError("tests");
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Patient name is required.";
    if (!values.phone.trim()) e.phone = "Phone number is required.";
    else if (values.phone.length !== 10) e.phone = "Enter a valid 10-digit phone number.";
    if (!values.age.trim()) e.age = "Age is required.";
    else if (Number(values.age) <= 0 || Number(values.age) > 120) e.age = "Enter a valid age.";
    if (!values.gender) e.gender = "Please select a gender.";
    if (!values.date) e.date = "Please select a preferred date.";
    if (!selected.length) e.tests = "Please select at least one test.";
    return e;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    const firstKey = (Object.keys(found) as Array<keyof Errors>)[0];
    if (firstKey) {
      document.getElementById(`${uid}-${firstKey}`)?.focus();
      return;
    }
    const message =
      `*New Test Booking Request*\n\n` +
      `*Patient Name:* ${values.name}\n*Phone Number:* ${values.phone}\n*Age:* ${values.age}\n` +
      `*Gender:* ${values.gender}\n*Preferred Date:* ${values.date}\n\n` +
      `*Tests Required:*\n${selected.map((t) => `- ${t}`).join("\n")}`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    handleClose();
  };

  if (!render) return null;

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} role="alert" className="mt-1 text-xs text-red-600">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof Errors) => ({
    id: `${uid}-${k}`,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
  });

  return (
    <div
      data-lenis-prevent
      onKeyDown={onKeyDown}
      className={cn(
        "fixed inset-0 z-[100] flex items-stretch justify-center bg-ink/60 backdrop-blur-sm transition-opacity duration-200 ease-out md:items-center md:p-6",
        shown ? "opacity-100" : "opacity-0",
      )}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-title`}
        style={{ backgroundImage: `url(${patternBg})` }}
        className={cn(
          "relative flex w-full max-w-[1100px] flex-col overflow-y-auto bg-cover bg-center shadow-lift transition-[opacity,transform] duration-300 ease-out",
          "max-md:h-[100dvh] md:h-[min(85vh,820px)] md:flex-row md:overflow-hidden md:rounded-3xl 3xl:max-w-[1280px]",
          shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[0.96] opacity-0",
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-white/90" aria-hidden="true" />

        {/* Left image (md+) / short banner (mobile) */}
        <div className="relative order-2 h-40 shrink-0 overflow-hidden bg-sky-soft md:order-none md:h-auto md:w-[38%] lg:w-[36%]">
          <img src={bookImg} alt="" width={800} height={1000} decoding="async" className="h-full w-full object-cover object-top" />
        </div>

        {/* Right panel — on mobile its children join the column flow (like the original) */}
        <div className="relative z-[1] flex min-w-0 flex-1 flex-col max-md:contents">
          <header className="order-1 md:order-none flex shrink-0 items-center justify-between gap-3 border-b border-navy/10 bg-white/95 px-5 py-4 max-md:sticky max-md:top-0 max-md:z-10 md:px-6">
            <h2 id={`${uid}-title`} className="flex items-center gap-2.5 text-[clamp(1rem,.9rem+.5vw,1.25rem)] font-extrabold text-navy">
              <FaClipboardList aria-hidden="true" className="text-brand" />
              Book Your Test
            </h2>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close booking form"
              className="grid h-9 w-9 place-items-center rounded-full text-xl text-navy transition-colors duration-200 hover:bg-sky-soft hover:text-brand"
            >
              <FaXmark aria-hidden="true" />
            </button>
          </header>

          <div data-lenis-prevent className="relative z-[1] order-3 min-h-0 flex-1 p-4 md:order-none md:overflow-y-auto md:p-6">
            <form id={`${uid}-form`} noValidate onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-6">
              <div className="md:col-span-3">
                <label htmlFor={`${uid}-name`} className={labelCls}>
                  Patient Name
                </label>
                <input {...a11y("name")} ref={firstFieldRef} type="text" autoComplete="name" placeholder="Enter patient name" value={values.name} onChange={set("name")} className={inputCls} />
                {err("name")}
              </div>
              <div className="md:col-span-3">
                <label htmlFor={`${uid}-phone`} className={labelCls}>
                  Phone Number
                </label>
                <input {...a11y("phone")} type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="Enter 10-digit phone number" value={values.phone} onChange={set("phone")} className={inputCls} />
                {err("phone")}
              </div>
              <div className="md:col-span-2">
                <label htmlFor={`${uid}-age`} className={labelCls}>
                  Age
                </label>
                <input {...a11y("age")} type="text" inputMode="numeric" placeholder="Enter age" value={values.age} onChange={set("age")} className={inputCls} />
                {err("age")}
              </div>
              <div className="md:col-span-2">
                <label htmlFor={`${uid}-gender`} className={labelCls}>
                  Gender
                </label>
                <select {...a11y("gender")} value={values.gender} onChange={set("gender")} className={inputCls}>
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                {err("gender")}
              </div>
              <div className="md:col-span-2">
                <label htmlFor={`${uid}-date`} className={labelCls}>
                  Preferred Date
                </label>
                <input {...a11y("date")} type="date" min={today} value={values.date} onChange={set("date")} className={inputCls} />
                {err("date")}
              </div>

              <fieldset className="min-w-0 md:col-span-6">
                <legend id={`${uid}-tests-legend`} className={labelCls}>
                  Select Tests <span className="font-normal text-muted">(you can select multiple{selected.length ? ` · ${selected.length} selected` : ""})</span>
                </legend>
                <div
                  id={`${uid}-tests`}
                  tabIndex={-1}
                  data-lenis-prevent
                  aria-describedby={errors.tests ? `${uid}-tests-err` : undefined}
                  className={cn(
                    "max-h-[17rem] space-y-5 overflow-y-auto rounded-2xl border bg-white p-4 outline-none max-sm:max-h-[14rem] max-sm:p-3",
                    errors.tests ? "border-red-500" : "border-navy/20",
                  )}
                >
                  {SERVICES.map((svc) => {
                    const Icon = svc.icon;
                    const highlighted = target?.serviceId === svc.id;
                    return (
                      <div key={svc.id} id={`${uid}-cat-${svc.id}`} className={cn("rounded-xl transition-colors duration-500", highlighted && "bg-sky-soft/70 p-2 -m-2")}>
                        <p className="mb-2 flex items-center gap-2 text-[0.82rem] font-bold text-navy">
                          <Icon aria-hidden="true" style={{ color: svc.iconColor }} />
                          {svc.title}
                        </p>
                        <div className="grid gap-x-3 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
                          {svc.tests.map((t, i) => {
                            const cid = `${uid}-t-${svc.id}-${i}`;
                            return (
                              <label key={cid} htmlFor={cid} className="flex cursor-pointer items-start gap-2 rounded-md py-0.5 text-[0.78rem] leading-snug text-muted transition-colors hover:text-navy">
                                <input
                                  id={cid}
                                  type="checkbox"
                                  checked={selected.includes(t.name)}
                                  onChange={() => toggle(t.name)}
                                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-navy/30 accent-brand"
                                />
                                <span>{t.name}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {errors.tests && (
                  <p id={`${uid}-tests-err`} role="alert" className="mt-1.5 text-xs text-red-600">
                    {errors.tests}
                  </p>
                )}
              </fieldset>
            </form>
          </div>

          <footer className="order-4 shrink-0 border-t border-navy/10 bg-white/95 px-5 py-3.5 max-md:sticky max-md:bottom-0 max-md:z-10 md:order-none md:px-6 md:text-right">
            <button
              type="submit"
              form={`${uid}-form`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-10 py-3 font-bold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#1ebc59] hover:shadow-lift active:translate-y-0 md:w-auto"
            >
              <FaWhatsapp aria-hidden="true" className="text-lg" />
              Book Now
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
