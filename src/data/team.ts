export interface TeamMember {
  id: number;
  name: string;
  qualification: string;
  role: string;
  experience: string;
  /** Optional portrait — drop a real photo here when available; initials are shown otherwise */
  photo?: string;
}

export const TEAM: TeamMember[] = [
  { id: 1, name: "Dr. Ramesh Kumar", qualification: "MBBS, MD (Pathology)", role: "Consultant Pathologist", experience: "15+ Years" },
  { id: 2, name: "Dr. Priya Lakshmi", qualification: "MBBS, MD (Microbiology)", role: "Consultant Microbiologist", experience: "12+ Years" },
  { id: 3, name: "Dr. Arvind Raja", qualification: "M.Sc., Ph.D (Biochemistry)", role: "Consultant Biochemist", experience: "10+ Years" },
  { id: 4, name: "Ms. Kavitha S.", qualification: "M.Sc., Genetic Counseling", role: "Genetic Counselor", experience: "8+ Years" },
];
