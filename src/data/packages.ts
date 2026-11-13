import type { IconType } from "react-icons";
import {
  FaCrown,
  FaDroplet,
  FaFlask,
  FaHeartPulse,
  FaListCheck,
  FaNotesMedical,
  FaSun,
  FaUserGroup,
  FaVenus,
} from "react-icons/fa6";

export interface HealthPackage {
  id: number;
  icon: IconType;
  iconColor: string;
  title: string;
  badge?: string;
  originalPrice: number;
  price: number;
  tests: string[];
}

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 1,
    icon: FaHeartPulse,
    iconColor: "#2563eb",
    title: "Lipid Profile Basic",
    originalPrice: 400,
    price: 280,
    tests: [
      "Total Cholesterol",
      "Triglycerides",
      "HDL Cholesterol",
      "LDL Cholesterol",
      "VLDL Cholesterol",
      "CHOL/HDL Ratio",
      "LDL/HDL Ratio",
    ],
  },
  {
    id: 2,
    icon: FaNotesMedical,
    iconColor: "#0891b2",
    title: "Thyroid Detection Package",
    originalPrice: 350,
    price: 245,
    tests: ["T3", "T4", "TSH"],
  },
  {
    id: 3,
    icon: FaDroplet,
    iconColor: "#dc2626",
    title: "Joint & Inflammation Panel",
    originalPrice: 750,
    price: 525,
    tests: ["Complete Blood Cell Count", "RA Factor", "CRP", "Uric Acid"],
  },
  {
    id: 4,
    icon: FaFlask,
    iconColor: "#16a34a",
    title: "Liver & Kidney Panel",
    originalPrice: 900,
    price: 630,
    tests: ["LFT (Liver Function Test)", "RFT (Renal Function Test)"],
  },
  {
    id: 5,
    icon: FaSun,
    iconColor: "#f59e0b",
    title: "Vitamin-D & Bone Health",
    originalPrice: 1350,
    price: 945,
    tests: ["Vitamin-D", "Calcium", "Phosphorus", "Alkaline Phosphate"],
  },
  {
    id: 6,
    icon: FaListCheck,
    iconColor: "#9333ea",
    title: "Comprehensive Metabolic Package",
    originalPrice: 1250,
    price: 875,
    tests: [
      "Complete Blood Cell Count",
      "Blood Sugar (F)",
      "Blood Sugar (PP)",
      "Uric Acid",
      "Calcium",
      "Phosphorus",
      "Lipid Profile",
      "Creatinine",
    ],
  },
  {
    id: 7,
    icon: FaVenus,
    iconColor: "#db2777",
    title: "Women's Hormone & Wellness Package",
    originalPrice: 2050,
    price: 1435,
    tests: [
      "Blood Sugar (F)",
      "Blood Sugar (PP)",
      "LH",
      "FSH",
      "Prolactin",
      "Thyroid Function Test",
      "Complete Blood Cell Count",
      "Urine Routine Examination",
    ],
  },
  {
    id: 8,
    icon: FaUserGroup,
    iconColor: "#ea580c",
    title: "Family Health Package",
    originalPrice: 1800,
    price: 1260,
    tests: [
      "Complete Blood Cell Count",
      "Blood Sugar (F)",
      "Blood Sugar (PP)",
      "Lipid Profile",
      "LFT",
      "RFT",
      "Urine Routine Examination",
    ],
  },
  {
    id: 9,
    icon: FaCrown,
    iconColor: "#b45309",
    title: "Complete Body Checkup Package",
    badge: "Most Popular",
    originalPrice: 2150,
    price: 1505,
    tests: [
      "Complete Blood Cell Count",
      "Blood Sugar (F)",
      "Blood Sugar (PP)",
      "Lipid Profile",
      "LFT",
      "RFT",
      "Thyroid Function Test",
      "Urine Routine Examination",
    ],
  },
];

export const discountPercent = (p: Pick<HealthPackage, "originalPrice" | "price">) =>
  Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
