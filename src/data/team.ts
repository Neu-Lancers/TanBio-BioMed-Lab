export interface TeamMember {
  id: number;
  name: string;
  qualification: string;
  role: string;
  /** Optional portrait — drop a real photo here when available; initials are shown otherwise */
  photo?: string;
}

export const TEAM_ORG = {
  name: "TANBIO R and D Solution",
  incubator: "Periyar Technology Business Incubator (PTBI)",
  location: "Vallam Thanjavur – 613 403",
} as const;

/** First entry is the featured leader card. */
export const TEAM: TeamMember[] = [
  { id: 1, name: "Dr. Purushothaman Balakrishnan", qualification: "M.Tech., Ph.D.,", role: "CEO & Scientist" },
  { id: 2, name: "Dr. N. Suganthi Purushothaman", qualification: "M.Sc., Ph.D.,", role: "Scientist" },
  { id: 3, name: "Et. Prasanna Srinivasan Ramalingam", qualification: "M.Tech.,", role: "Research Associate" },
  { id: 4, name: "Et. Muralidharan Chinnadurai", qualification: "B.Tech.,", role: "Research Associate" },
];
