import imgCBC from "@/assets/images/Cbc.webp";
import imgThyroid from "@/assets/images/Thyroid Profile.webp";
import imgLipid from "@/assets/images/Lipid Profile.webp";
import imgVitaminD from "@/assets/images/Vitamin D.webp";
import imgHbA1c from "@/assets/images/HbA1c.webp";
import imgPSA from "@/assets/images/PSA.webp";

export interface PopularTest {
  img: string;
  name: string;
  subtitle: string;
  sample: string;
  reportTime: string;
  hoverDetail: string;
}

export const POPULAR_TESTS: PopularTest[] = [
  {
    img: imgCBC,
    name: "CBC",
    subtitle: "Complete Blood Count",
    sample: "Blood",
    reportTime: "24 hrs",
    hoverDetail: "Measures RBC, WBC, Platelets and Haemoglobin levels to screen for anaemia, infection and more.",
  },
  {
    img: imgHbA1c,
    name: "HbA1c",
    subtitle: "Glycosylated Haemoglobin",
    sample: "Blood",
    reportTime: "24 hrs",
    hoverDetail: "Reflects average blood glucose over 2–3 months — key test for diabetes diagnosis and monitoring.",
  },
  {
    img: imgThyroid,
    name: "Thyroid Profile",
    subtitle: "T3 · T4 · TSH",
    sample: "Blood",
    reportTime: "24 hrs",
    hoverDetail: "Evaluates thyroid gland function — detects hypothyroidism, hyperthyroidism and related disorders.",
  },
  {
    img: imgLipid,
    name: "Lipid Profile",
    subtitle: "Cholesterol · HDL · LDL · TG",
    sample: "Serum",
    reportTime: "24 hrs",
    hoverDetail: "Assesses cardiovascular risk by measuring total cholesterol, good & bad fats, and triglycerides.",
  },
  {
    img: imgVitaminD,
    name: "Vitamin D (25 OH)",
    subtitle: "Vitamin D Status",
    sample: "Blood",
    reportTime: "24 hrs",
    hoverDetail: "Detects Vitamin D deficiency linked to bone health, immunity, muscle function and mood.",
  },
  {
    img: imgPSA,
    name: "PSA Test",
    subtitle: "Prostate Specific Antigen",
    sample: "Blood",
    reportTime: "24 hrs",
    hoverDetail: "Screens for prostate issues including benign enlargement, inflammation and prostate cancer.",
  },
];
