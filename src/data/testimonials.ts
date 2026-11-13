export interface Testimonial {
  id: number;
  name: string;
  location: string;
  review: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Optional photo — initials are shown otherwise */
  photo?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Ramesh Kumar",
    location: "Chennai",
    review: "Excellent lab with accurate reports and very quick service. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Lakshmi",
    location: "Coimbatore",
    review: "Very professional staff and hygienic collection process. Reports were delivered on time.",
    rating: 5,
  },
  {
    id: 3,
    name: "Suresh Babu",
    location: "Tirupur",
    review: "Affordable pricing with no compromise on quality. The home collection service is amazing.",
    rating: 5,
  },
];
