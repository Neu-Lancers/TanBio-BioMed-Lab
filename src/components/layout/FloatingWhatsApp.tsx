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
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-3xl text-white shadow-lift transition-transform duration-300 ease-out hover:scale-110 sm:bottom-6 sm:right-6 3xl:h-16 3xl:w-16"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.6s]" aria-hidden="true" />
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}
