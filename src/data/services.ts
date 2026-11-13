import type { IconType } from "react-icons";
import { FaBacterium, FaDna, FaDroplet, FaFlask, FaMicroscope, FaRibbon, FaVirus } from "react-icons/fa6";

import hematologyImg from "@/assets/images/hematology.webp";
import urineImg from "@/assets/images/urine-analysis.webp";
import biochemistryImg from "@/assets/images/biochemistry.webp";
import serologyImg from "@/assets/images/serology.webp";
import hormoneImg from "@/assets/images/hormone-tests.webp";
import microbiologyImg from "@/assets/images/microbiology.webp";
import cancerImg from "@/assets/images/cancer-analysis.webp";

export interface LabTest {
  name: string;
  detail: string;
}

export interface Service {
  id: number;
  slug: string;
  /** one-line summary used on cards */
  short: string;
  icon: IconType;
  iconColor: string;
  iconBg: string;
  title: string;
  image: string;
  description: string;
  why: string;
  tests: LabTest[];
}


export const SERVICES: Service[] = [
  {
    id: 1,
    slug: "hematology-tests",
    short: "Complete blood count, ESR, platelet analysis and blood disorder screening.",
    icon: FaDroplet,
    iconColor: "#e53935",
    iconBg: "rgba(229,57,53,0.10)",
    title: "Hematology Tests",
    image: hematologyImg,
    description:
      "Comprehensive analysis of blood components to detect infections, anaemia, clotting disorders, and other haematological conditions with high precision.",
    why: "Blood tests are the first line of investigation for most health concerns. Haematology panels help your doctor understand your overall health, screen for disease, and monitor treatment.",
    tests: [
      {
        name: "Complete Blood Count (CBC)",
        detail: "Measures red blood cells, white blood cells, haemoglobin, haematocrit, and platelets — the most common screening test ordered.",
      },
      {
        name: "ESR – Erythrocyte Sedimentation Rate",
        detail: "Detects inflammation in the body; elevated ESR can indicate infection, autoimmune disease, or malignancy.",
      },
      {
        name: "Peripheral Smear Examination",
        detail: "Microscopic evaluation of blood cells to identify abnormal shapes and types, aiding diagnosis of anaemia and blood cancers.",
      },
      {
        name: "Hemoglobin (Hb)",
        detail: "Measures the oxygen-carrying protein in red blood cells; low levels indicate anaemia, high levels may indicate dehydration or polycythaemia.",
      },
      {
        name: "RBC Count, PCV, MCV, MCH, MCHC",
        detail: "Red cell indices that classify and define the type of anaemia and guide treatment decisions.",
      },
      {
        name: "WBC Count & Differential Count (DLC)",
        detail: "Evaluates immune health by counting different white blood cell types — neutrophils, lymphocytes, monocytes, eosinophils, and basophils.",
      },
      {
        name: "Platelet Count",
        detail: "Assesses bleeding and clotting risk. Low counts (thrombocytopenia) can cause excessive bleeding; high counts may indicate inflammation.",
      },
      {
        name: "Bleeding Time (BT) / Clotting Time (CT)",
        detail: "Measures primary haemostasis and overall coagulation function — essential before surgical procedures.",
      },
      {
        name: "Reticulocyte Count",
        detail: "Counts immature red blood cells to assess bone marrow activity and the body's response to anaemia treatment.",
      },
    ],
  },
  {
    id: 2,
    slug: "urine-analysis",
    short: "Routine urine examination, infection detection and kidney health assessment.",
    icon: FaFlask,
    iconColor: "#f59e0b",
    iconBg: "rgba(245,158,11,0.10)",
    title: "Urine Analysis",
    image: urineImg,
    description:
      "Detailed examination of urine samples to evaluate kidney function, detect infections, metabolic disorders, and urinary tract conditions accurately.",
    why: "Urine is a window into your metabolic and kidney health. Routine urine analysis can detect conditions early — often before symptoms appear.",
    tests: [
      {
        name: "Routine Urine Examination (R/E)",
        detail: "Evaluates physical, chemical, and microscopic properties of urine — colour, clarity, pH, specific gravity, protein, glucose, and cells.",
      },
      {
        name: "Urine Microscopy",
        detail: "Microscopic examination for casts, crystals, bacteria, and cellular elements that indicate kidney disease or infection.",
      },
      {
        name: "Urine Culture & Sensitivity",
        detail: "Identifies bacteria causing urinary tract infection and determines which antibiotics are effective for targeted treatment.",
      },
      {
        name: "Urine Protein / Sugar / Ketone",
        detail: "Screens for diabetes (sugar), kidney damage (protein), and metabolic imbalances (ketones) in a single dipstick panel.",
      },
      {
        name: "Microalbuminuria",
        detail: "Detects very small amounts of albumin in urine — an early and sensitive marker of diabetic nephropathy and cardiovascular risk.",
      },
      {
        name: "24 Hours Urine Protein",
        detail: "Quantifies total protein excreted over 24 hours to assess the severity of kidney disease and monitor treatment response.",
      },
      {
        name: "Pregnancy Test (Urine)",
        detail: "Rapid detection of hCG hormone in urine to confirm or exclude pregnancy as early as the first day of a missed period.",
      },
    ],
  },
  {
    id: 3,
    slug: "biochemistry-tests",
    short: "Blood sugar, liver function, kidney function and lipid profile evaluation.",
    icon: FaMicroscope,
    iconColor: "#10b981",
    iconBg: "rgba(16,185,129,0.10)",
    title: "Biochemistry Tests",
    image: biochemistryImg,
    description:
      "Advanced biochemical profiling to assess organ function, metabolic health, and detect conditions like diabetes, liver and kidney disease.",
    why: "Biochemistry panels reveal how your organs are functioning at a molecular level, enabling early intervention for silent conditions like diabetes, dyslipidaemia, and organ disease.",
    tests: [
      {
        name: "Blood Sugar (Fasting / Postprandial / Random)",
        detail: "Monitors glucose levels to diagnose and manage diabetes mellitus and prediabetes across fasting and post-meal states.",
      },
      {
        name: "HbA1c",
        detail: "Reflects average blood sugar over 2–3 months — the gold-standard test for long-term diabetes control and diagnosis.",
      },
      {
        name: "Lipid Profile (Total Cholesterol, HDL, LDL, VLDL, Triglycerides)",
        detail: "Comprehensive cardiovascular risk assessment measuring all cholesterol fractions and triglycerides in a single panel.",
      },
      {
        name: "Liver Function Test (LFT)",
        detail: "Evaluates liver enzymes (SGOT, SGPT, ALP), bilirubin, and proteins to detect liver damage, hepatitis, and fatty liver.",
      },
      {
        name: "Kidney Function Test (RFT)",
        detail: "Measures creatinine, urea, and uric acid to assess glomerular filtration and diagnose chronic or acute kidney disease.",
      },
      {
        name: "Serum Uric Acid",
        detail: "Elevated levels indicate gout risk; also used to monitor patients on chemotherapy or with kidney stones.",
      },
      {
        name: "Serum Electrolytes (Sodium, Potassium, Chloride)",
        detail: "Critical minerals that regulate fluid balance, nerve conduction, and heart rhythm — imbalances can be life-threatening.",
      },
      {
        name: "Calcium, Phosphorus",
        detail: "Assesses bone metabolism, parathyroid function, and kidney health; essential for monitoring osteoporosis treatment.",
      },
      {
        name: "Total Protein, Albumin, Globulin, A/G Ratio",
        detail: "Evaluates nutritional status and liver synthetic function; abnormal ratios point to liver or kidney disease.",
      },
      {
        name: "Bilirubin (Total, Direct, Indirect)",
        detail: "Detects jaundice and differentiates its cause — pre-hepatic, hepatic, or post-hepatic (obstructive) jaundice.",
      },
      {
        name: "Amylase",
        detail: "Enzyme elevated in acute pancreatitis, salivary gland disease, and certain abdominal emergencies.",
      },
      {
        name: "C-Reactive Protein (CRP)",
        detail: "Sensitive marker of systemic inflammation and infection; used to monitor disease activity and antibiotic response.",
      },
    ],
  },
  {
    id: 4,
    slug: "serology-tests",
    short: "Dengue, HIV, Hepatitis, Typhoid and other infectious disease screening.",
    icon: FaVirus,
    iconColor: "#8b5cf6",
    iconBg: "rgba(139,92,246,0.10)",
    title: "Serology Tests",
    image: serologyImg,
    description:
      "Immunological testing to identify antibodies and antigens, enabling diagnosis of infectious diseases, autoimmune conditions, and viral infections.",
    why: "Serological tests detect the immune system's response to pathogens, providing rapid and accurate diagnosis of infections that may not be visible under a microscope.",
    tests: [
      {
        name: "Widal Test",
        detail: "Detects antibodies against Salmonella typhi — used in the diagnosis of typhoid fever in endemic regions.",
      },
      {
        name: "Typhidot / Typhidot M",
        detail: "Rapid immunochromatographic test for IgM and IgG antibodies to Salmonella typhi, with high sensitivity in acute typhoid.",
      },
      {
        name: "Dengue NS1 Antigen / Dengue IgG & IgM",
        detail: "NS1 detects dengue early (days 1–5); IgM and IgG antibodies confirm infection and differentiate primary from secondary dengue.",
      },
      {
        name: "Malaria (MP) Antigen",
        detail: "Rapid antigen test for Plasmodium falciparum and Plasmodium vivax — delivers results within 15 minutes.",
      },
      {
        name: "Hepatitis B (HBsAg)",
        detail: "Surface antigen test for Hepatitis B — the first marker to appear after infection and the basis for all HBV screening.",
      },
      {
        name: "Hepatitis C (Anti HCV)",
        detail: "Detects antibodies against Hepatitis C virus; reactive results are confirmed with viral load testing (HCV RNA).",
      },
      {
        name: "HIV 1 & 2 (Rapid / ELISA)",
        detail: "Screens for HIV antibodies and p24 antigen; ELISA provides high sensitivity while rapid tests deliver point-of-care results.",
      },
      {
        name: "VDRL / RPR",
        detail: "Non-treponemal tests for syphilis screening; positive results are confirmed with specific treponemal tests.",
      },
      {
        name: "ASO Titre",
        detail: "Anti-streptolysin O titre detects recent Group A Streptococcus infection — elevated in rheumatic fever and post-streptococcal glomerulonephritis.",
      },
      {
        name: "RA Factor",
        detail: "Rheumatoid factor test aids in diagnosing rheumatoid arthritis and other autoimmune conditions involving joint inflammation.",
      },
    ],
  },
  {
    id: 5,
    slug: "hormone-tests",
    short: "Thyroid profile, reproductive hormones, Vitamin D and Vitamin B12 testing.",
    icon: FaDna,
    iconColor: "#0A4D9C",
    iconBg: "rgba(10,77,156,0.10)",
    title: "Hormone Tests",
    image: hormoneImg,
    description:
      "Precise hormonal assays to evaluate thyroid, reproductive, adrenal, and metabolic hormones for accurate endocrine health assessment.",
    why: "Hormones regulate every system in the body. Even small imbalances cause wide-ranging symptoms — fatigue, weight changes, infertility, mood disorders, and more.",
    tests: [
      {
        name: "Thyroid Profile (T3, T4, TSH)",
        detail: "Complete thyroid evaluation — TSH is the most sensitive screening test; T3 and T4 assess thyroid hormone production and conversion.",
      },
      {
        name: "Free T3, Free T4",
        detail: "Measures unbound (biologically active) thyroid hormones — more accurate than total T3/T4, especially in pregnancy and thyroid disease.",
      },
      {
        name: "Beta HCG (Quantitative)",
        detail: "Quantifies pregnancy hormone for early pregnancy confirmation, ectopic pregnancy evaluation, and monitoring miscarriage or molar pregnancy.",
      },
      {
        name: "FSH, LH",
        detail: "Follicle-stimulating and luteinising hormones assess ovarian reserve, ovulation, testicular function, and hypothalamic-pituitary axis integrity.",
      },
      {
        name: "Prolactin",
        detail: "Elevated prolactin causes irregular periods, infertility, and galactorrhoea — this test screens for prolactinoma and medication side effects.",
      },
      {
        name: "Testosterone",
        detail: "Evaluates male hypogonadism, PCOS in women, infertility, low libido, and adrenal disorders.",
      },
      {
        name: "Progesterone",
        detail: "Confirms ovulation, evaluates luteal phase defects, and monitors early pregnancy viability and IVF outcomes.",
      },
      {
        name: "Cortisol",
        detail: "Measures the primary stress hormone — used to diagnose Cushing's syndrome, Addison's disease, and adrenal insufficiency.",
      },
      {
        name: "Vitamin D (25 OH)",
        detail: "Evaluates vitamin D status — deficiency is widespread and linked to bone disease, immune dysfunction, and metabolic disorders.",
      },
      {
        name: "Vitamin B12",
        detail: "Identifies B12 deficiency, which causes megaloblastic anaemia, neuropathy, and cognitive impairment, particularly in vegetarians and elderly patients.",
      },
    ],
  },
  {
    id: 6,
    slug: "microbiology-tests",
    short: "Culture and sensitivity studies for bacterial, fungal and viral infections.",
    icon: FaBacterium,
    iconColor: "#f97316",
    iconBg: "rgba(249,115,22,0.10)",
    title: "Microbiology Tests",
    image: microbiologyImg,
    description:
      "Microbiological investigation to identify causative organisms in infections and determine effective antibiotic treatment strategies.",
    why: "Identifying the exact pathogen responsible for an infection allows targeted antibiotic therapy, reduces treatment failure, and helps combat antibiotic resistance.",
    tests: [
      {
        name: "Gram Stain",
        detail: "Rapid microscopic technique that classifies bacteria as Gram-positive or Gram-negative, guiding immediate empirical antibiotic selection.",
      },
      {
        name: "Sputum for AFB",
        detail: "Acid-fast bacilli smear to detect Mycobacterium tuberculosis — an essential first step in TB diagnosis and treatment initiation.",
      },
      {
        name: "Culture & Sensitivity (Pus, Urine, Sputum, etc.)",
        detail: "Grows the infecting organism on culture media and tests it against a panel of antibiotics to identify the most effective treatment.",
      },
      {
        name: "Throat Swab",
        detail: "Culture of throat secretions to identify bacterial (especially Group A Strep) or fungal causes of pharyngitis and tonsillitis.",
      },
      {
        name: "ANA (IIFA)",
        detail: "Anti-nuclear antibody test by indirect immunofluorescence — a broad screen for systemic autoimmune diseases including lupus and mixed connective tissue disease.",
      },
      {
        name: "Stool Routine Examination",
        detail: "Identifies parasites, ova, cysts, blood, and mucus in stool — essential for diagnosing gastroenteritis and parasitic infestations.",
      },
      {
        name: "Stool Occult Blood",
        detail: "Detects hidden blood in stool — an important screening test for colorectal cancer and gastrointestinal bleeding.",
      },
      {
        name: "Semen Analysis",
        detail: "Comprehensive evaluation of sperm count, motility, morphology, and volume for male fertility assessment.",
      },
      {
        name: "COVID-19 Antigen / Antibody",
        detail: "Rapid antigen test for active infection; antibody test indicates past infection or vaccine response.",
      },
      {
        name: "Allergy Profile (Food / Inhalant)",
        detail: "Identifies specific IgE-mediated allergic sensitivities to common food allergens and environmental inhalants.",
      },
      {
        name: "Blood Culture",
        detail: "Detects bacteria or fungi in the bloodstream — the definitive test for bacteraemia and septicaemia.",
      },
      {
        name: "HBSAg (Rapid / ELISA)",
        detail: "Point-of-care and laboratory-based Hepatitis B surface antigen detection for screening and confirmation.",
      },
      {
        name: "Antibiotic Sensitivity Testing",
        detail: "Determines the minimum inhibitory concentration of antibiotics against an isolated pathogen to guide optimal treatment dosing.",
      },
    ],
  },
  {
    id: 7,
    slug: "cancer-analysis",
    short: "Tumor marker analysis including PSA, AFP, CA-125 and other diagnostics.",
    icon: FaRibbon,
    iconColor: "#ec4899",
    iconBg: "rgba(236,72,153,0.10)",
    title: "Cancer Analysis",
    image: cancerImg,
    description:
      "Specialised tumour marker testing and cancer screening panels to aid in early detection, diagnosis, and monitoring of various cancers.",
    why: "Tumour markers in blood help detect cancer early when it is most treatable, monitor treatment effectiveness, and identify recurrence after therapy.",
    tests: [
      {
        name: "CBC",
        detail: "Complete Blood Count screens for blood cancers (leukaemia, lymphoma) and anaemia caused by malignancy or chemotherapy side effects.",
      },
      {
        name: "PSA Test",
        detail: "Prostate-specific antigen — the primary screening test for prostate cancer in men, with serial values guiding biopsy decisions.",
      },
      {
        name: "CA-125",
        detail: "Cancer antigen 125 is elevated in ovarian cancer; also used to monitor treatment response and detect recurrence.",
      },
      {
        name: "AFP Test",
        detail: "Alpha-fetoprotein is a marker for hepatocellular carcinoma and germ cell tumours of the ovary and testis.",
      },
      {
        name: "LFT and KFT",
        detail: "Liver and kidney function panels assess organ health before, during, and after chemotherapy and radiotherapy.",
      },
      {
        name: "PCR",
        detail: "Polymerase chain reaction identifies cancer-causing viral DNA (e.g., HPV, EBV) and detects minimal residual disease in blood cancers.",
      },
      {
        name: "Urine Cytology",
        detail: "Microscopic examination of cells shed in urine to detect transitional cell carcinoma of the bladder and urinary tract.",
      },
      {
        name: "Tumor Marker Tests",
        detail: "A broad panel including CEA (colorectal), CA 19-9 (pancreatic), and CA 15-3 (breast) for multi-organ cancer screening and monitoring.",
      },
    ],
  },
];


export const getServiceBySlug = (slug?: string) => SERVICES.find((s) => s.slug === slug);
