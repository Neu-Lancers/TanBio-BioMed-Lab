import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import contactGirl from "@/assets/images/contact-girl.webp";
import contactPattern from "@/assets/images/contact-pattern1.webp";
import Reveal from "@/components/ui/Reveal";
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

const inputCls =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-sky focus:outline-none focus:ring-4 focus:ring-sky/20 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-100";

export default function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});

  /* Name: letters/spaces only. Phone: digits only, max 10 (same input rules as before). */
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

  const field = (id: Field, label: string, props: { type?: string; inputMode?: "numeric"; autoComplete?: string } = {}) => (
    <div>
      <label htmlFor={`cf-${id}`} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}*
      </label>
      <input
        id={`cf-${id}`}
        value={values[id]}
        onChange={onChange(id)}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `cf-${id}-err` : undefined}
        className={inputCls}
        {...props}
      />
      {errors[id] && (
        <p id={`cf-${id}-err`} role="alert" className="mt-1 text-sm text-red-600">
          {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <section className="section relative overflow-hidden" id="contact-form">
      <img src={contactPattern} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" />
      <div className="container">
        <Reveal className="card grid overflow-hidden bg-white/95 backdrop-blur md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
          <div className="hidden items-end justify-center bg-sky-soft md:flex">
            <img src={contactGirl} alt="Lab technician ready to help" width={800} height={1000} loading="lazy" decoding="async" className="max-h-[34rem] w-auto object-contain" />
          </div>

          <div className="p-6 sm:p-10">
            <h2 className="heading">Send Us a Message</h2>
            <p className="mb-6 mt-2">Have a question or need to book a service? We are here to help.</p>

            <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
              {field("name", "Full Name", { autoComplete: "name" })}
              {field("phone", "Phone Number", { type: "tel", inputMode: "numeric", autoComplete: "tel-national" })}
              {field("email", "Email Address", { type: "email", autoComplete: "email" })}
              {field("subject", "Subject")}
              <div className="sm:col-span-2">
                <label htmlFor="cf-message" className="mb-1.5 block text-sm font-semibold text-navy">
                  Your Message*
                </label>
                <textarea
                  id="cf-message"
                  rows={4}
                  value={values.message}
                  onChange={onChange("message")}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "cf-message-err" : undefined}
                  className={cn(inputCls, "resize-y")}
                />
                {errors.message && (
                  <p id="cf-message-err" role="alert" className="mt-1 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3 font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-navy hover:shadow-lift"
                >
                  Send via WhatsApp <FaWhatsapp aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
