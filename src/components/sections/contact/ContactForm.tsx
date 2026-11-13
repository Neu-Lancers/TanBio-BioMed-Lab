import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { FaRegEnvelope, FaRegMessage, FaRegUser, FaTag, FaWhatsapp } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

import contactGirl from "@/assets/images/contact-girl.webp";
import contactPattern from "@/assets/images/contact-pattern1.webp";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/cn";
import { whatsappUrl } from "@/lib/site";

type Field = "name" | "phone" | "email" | "subject" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { name: "", phone: "", email: "", subject: "", message: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Full name is required.";
  if (!v.phone.trim()) e.phone = "Phone number is required.";
  else if (v.phone.length !== 10) e.phone = "Enter a valid 10-digit phone number.";
  if (!v.email.trim()) e.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email address.";
  if (!v.subject.trim()) e.subject = "Subject is required.";
  if (!v.message.trim()) e.message = "Message is required.";
  return e;
}

/* Frosted-glass pill used for every field (the original contact-form look) */
const glass =
  "group flex items-center rounded-full border-[1.5px] border-white/35 bg-white/20 shadow-[0_4px_18px_rgba(0,0,0,0.10)] backdrop-blur-[14px] transition-all duration-300 focus-within:border-white/70 focus-within:bg-white/25 focus-within:shadow-[0_0_0_3px_rgba(255,255,255,0.15),0_6px_24px_rgba(0,0,0,0.14)]";
const inputBase =
  "w-full flex-1 bg-transparent py-[13px] pl-5 text-small font-medium text-white placeholder:font-normal placeholder:text-white/60 focus:outline-none [&:-webkit-autofill]:[-webkit-text-fill-color:#fff]";
const iconCls = "w-[46px] min-w-[46px] shrink-0 text-center text-small text-white/65 transition-colors duration-300 group-focus-within:text-white";

export default function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const { ref: leftRef, inView } = useInView<HTMLDivElement>(0);

  /* Name: letters/spaces only. Phone: digits only, max 10 (same input rules as the original). */
  const onChange = (field: Field) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (field === "name" && !/^[A-Za-z\s]*$/.test(value)) return;
    if (field === "phone" && !/^\d{0,10}$/.test(value)) return;
    setValues((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = (Object.keys(found) as Field[])[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    const text =
      `*New Contact Form Submission*\n\n` +
      `*Full Name:* ${values.name}\n*Phone Number:* ${values.phone}\n*Email Address:* ${values.email}\n` +
      `*Subject:* ${values.subject}\n*Message:* ${values.message}`;
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
    setValues(EMPTY);
    setErrors({});
  };

  const wrap = (id: Field, icon: ReactNode, control: ReactNode, textarea = false) => (
    <div>
      <div className={cn(glass, textarea && "items-start rounded-[18px]", errors[id] && "!border-[#ff8a8a]")}>
        {control}
        <span aria-hidden="true" className={cn(iconCls, textarea && "pt-4")}>
          {icon}
        </span>
      </div>
      {errors[id] && (
        <p id={`cf-${id}-err`} role="alert" className="mx-1 mt-1.5 text-caption text-[#ffe1e1]">
          {errors[id]}
        </p>
      )}
    </div>
  );

  const input = (id: Field, label: string, icon: ReactNode, props: { type?: string; inputMode?: "numeric"; autoComplete?: string } = {}) =>
    wrap(
      id,
      icon,
      <>
        <label htmlFor={`cf-${id}`} className="sr-only">
          {label}
        </label>
        <input
          id={`cf-${id}`}
          value={values[id]}
          onChange={onChange(id)}
          placeholder={`${label}*`}
          aria-invalid={!!errors[id]}
          aria-describedby={errors[id] ? `cf-${id}-err` : undefined}
          className={inputBase}
          {...props}
        />
      </>,
    );

  const girl = (cls: string) => <img src={contactGirl} alt="Lab technician ready to help" width={800} height={1000} loading="lazy" decoding="async" className={cls} />;

  return (
    <section id="contact-form" className="relative mx-2.5 my-4 overflow-hidden rounded-3xl sm:mx-3 sm:my-5 md:mx-4 lg:mx-5 lg:rounded-[2.5rem]">
      <img src={contactPattern} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand/70 via-brand/50 to-brand-light/40 mix-blend-multiply" aria-hidden="true" />

      <div className="relative z-[1] grid md:min-h-[30rem] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] 3xl:min-h-[36rem]">
        {/* Left: girl slides in from the left, filling the column height */}
        <div ref={leftRef} className="relative hidden items-end justify-center overflow-hidden md:flex">
          {girl(
            cn(
              "h-full w-[125%] max-w-none object-contain object-bottom drop-shadow-[4px_0_20px_rgba(0,0,0,0.22)] transition-[transform,opacity] duration-[1500ms] ease-out will-change-transform",
              inView ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0",
            ),
          )}
        </div>

        {/* Right: form */}
        <div className="flex flex-col justify-center px-4 pb-10 pt-8 sm:px-6 md:py-11 md:pl-7 md:pr-10 lg:pl-9 lg:pr-[52px]">
          <h2 className="text-center text-h2 text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.22)] md:text-left">
            Contact Us
          </h2>
          <p className="mb-5 mt-2 text-center text-small leading-relaxed text-white/85 md:text-left">
            Have a question or need to book a service? We&apos;re here to help.
          </p>

          {/* Mobile: girl between title and form */}
          <div className="mb-6 flex justify-center md:hidden">{girl("h-auto w-full max-w-[17rem] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]")}</div>

          <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {input("name", "Full Name", <FaRegUser />, { autoComplete: "name" })}
            {input("phone", "Phone Number", <FaPhoneAlt />, { type: "tel", inputMode: "numeric", autoComplete: "tel-national" })}
            {input("email", "Email Address", <FaRegEnvelope />, { type: "email", autoComplete: "email" })}
            {input("subject", "Subject", <FaTag />)}
            <div className="sm:col-span-2">
              {wrap(
                "message",
                <FaRegMessage />,
                <>
                  <label htmlFor="cf-message" className="sr-only">
                    Your Message
                  </label>
                  <textarea
                    id="cf-message"
                    rows={4}
                    value={values.message}
                    onChange={onChange("message")}
                    placeholder="Your Message*"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "cf-message-err" : undefined}
                    className={cn(inputBase, "resize-none py-3.5 leading-relaxed")}
                  />
                </>,
                true,
              )}
            </div>
            <div className="mt-1 flex justify-center sm:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-white px-10 py-3 text-btn tracking-wide text-[#0A36C8] shadow-[0_6px_24px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#0A36C8] hover:bg-[#0A36C8] hover:text-white hover:shadow-[0_10px_32px_rgba(10,54,200,0.45)] focus-visible:-translate-y-0.5 focus-visible:border-[#0A36C8] focus-visible:bg-[#0A36C8] focus-visible:text-white active:translate-y-0 sm:px-14"
              >
                Send via WhatsApp <FaWhatsapp aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
