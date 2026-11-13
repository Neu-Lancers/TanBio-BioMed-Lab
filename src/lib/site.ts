/** Single source of truth for business details, navigation and SEO defaults. */
export const SITE = {
  name: "TanBio BioMed Genomics Laboratory",
  shortName: "TanBio",
  url: "https://tanbiomedlab.com",
  tagline: "Accurate Results, Better Health",
  description:
    "TanBio BioMed Genomics Laboratory is a trusted diagnostic centre in Thiruvarur offering blood tests, biochemistry, microbiology, serology, hormone and cancer screening with home sample collection.",
  phone: "+91 73587 98182",
  phoneHref: "tel:+917358798182",
  whatsapp: "917358798182",
  email: "tanbiomedicalab@gmail.com",
  address: {
    street: "8/45 A, Pillaiyar Kovil Street, Naranamangalam",
    locality: "Thiruvarur",
    region: "Tamil Nadu",
    postalCode: "610103",
    country: "IN",
  },
  geo: { lat: 10.730744, lng: 79.631105 },
  mapsUrl: "https://www.google.com/maps?q=10.730744,79.631105",
  social: {
    instagram: "https://www.instagram.com/tanbio_r_and_d_solution",
    facebook: "https://www.facebook.com/share/1BjZ3V7yb4/",
  },
  hours: [
    {
      days: "Monday – Saturday",
      open: "7:00 AM",
      close: "7:00 PM",
      schema: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "07:00", closes: "19:00" },
    },
    {
      days: "Sunday",
      open: "7:00 AM",
      close: "1:00 PM",
      schema: { days: ["Sunday"], opens: "07:00", closes: "13:00" },
    },
  ],
} as const;

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Health Packages", to: "/#packages" },
  { label: "FAQ", to: "/#faq" },
  { label: "Contact Us", to: "/contact" },
] as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const BOOK_MESSAGE =
  "Hi, I'd like to book an appointment at TANBIO Biomed Genomics Laboratory. Please share the available slots.";
