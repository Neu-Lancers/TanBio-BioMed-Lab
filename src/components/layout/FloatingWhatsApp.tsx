import { FaWhatsapp } from "react-icons/fa6";
import { whatsappUrl } from "@/lib/site";

const MESSAGE =
  "Hello TANBIO Biomed Genomics Laboratory, I would like to know more about your laboratory services and test booking.";

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl(MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-0 rounded-full bg-[#25D366] pl-0 text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,.7)] ring-4 ring-white/70 transition-all duration-500 ease-out hover:-translate-y-1 hover:gap-2 hover:pr-5 sm:bottom-6 sm:right-6 3xl:h-16"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/35 [animation-duration:2.8s]" aria-hidden="true" />
      <span className="grid h-14 w-14 place-items-center text-3xl 3xl:h-16 3xl:w-16">
        <FaWhatsapp aria-hidden="true" />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-500 ease-out group-hover:max-w-[8rem] group-hover:opacity-100 max-lg:hidden">
        Chat with us
      </span>
    </a>
  );
}
