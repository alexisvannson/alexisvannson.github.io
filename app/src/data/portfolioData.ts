import {
  Brain,
  HeartPulse,
  Code2,
  Globe,
  Wrench,
} from "lucide-react";

export const personalInfo = {
  firstName: "Alexis",
  lastName: "Vannson",
  tagline:
    "AI/ML engineer with a biomedical focus — building intelligent systems that bridge machine learning and life sciences.",
  email: "alexis.vannson@example.com",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/alexisvannson",
    linkedin: "https://linkedin.com/in/alexisvannson",
  },
};

export const aboutData = {
  bio: "I'm a graduate student in AI & Machine Learning with a specialization in biomedical engineering. My research sits at the intersection of deep learning and drug discovery, where I develop models that predict how small molecules affect gene expression. I'm passionate about leveraging computational tools to accelerate scientific discovery and improve human health.",
  education: "MSc Artificial Intelligence — Biomedical Engineering focus",
  researchInterests:
    "Gene-expression prediction, molecular embeddings, computational drug discovery",
  currentFocus:
    "Developing embedding-based models for predicting transcriptomic signatures from chemical structure",
};

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  tech: string[];
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "ML Research Intern",
    organization: "Biotech Research Lab",
    period: "Jun 2025 — Present",
    description:
      "Developing deep-learning models to predict gene-expression signatures from molecular embeddings. Built data pipelines processing LINCS L1000 datasets and trained multi-output regression models achieving state-of-the-art performance.",
    tech: ["PyTorch", "Transformers", "scikit-learn", "Pandas", "AWS"],
  },
  {
    id: "exp-2",
    role: "Data Science Teaching Assistant",
    organization: "University AI Department",
    period: "Sep 2024 — May 2025",
    description:
      "Assisted 120+ students in machine learning and data science courses. Created supplementary Jupyter notebooks covering neural networks, dimensionality reduction, and model evaluation.",
    tech: ["Python", "Jupyter", "NumPy", "Matplotlib", "LaTeX"],
  },
  {
    id: "exp-3",
    role: "Software Engineering Intern",
    organization: "HealthTech Startup",
    period: "Jun 2024 — Aug 2024",
    description:
      "Built full-stack features for a clinical data platform. Implemented REST APIs for patient data ingestion and developed interactive dashboards for healthcare analytics.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
  },
];

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  status: "live" | "in-progress" | "completed";
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    slug: "mol-insight",
    title: "Molecular Impact Explorer",
    description:
      "AI-powered tool that predicts gene-expression signatures from chemical structure using embedding-based models and machine learning.",
    longDescription:
      "Molecular Impact Explorer is a web application that predicts how small-molecule drugs influence gene expression. Users enter a SMILES string or drug name and receive predicted transcriptomic signatures. The tool is built on embedding-based molecular representations combined with multi-output regression models trained on LINCS L1000 data.",
    tech: ["React", "TypeScript", "Python", "PyTorch", "LINCS L1000", "Tailwind CSS"],
    status: "live",
    featured: true,
    liveUrl: "/projects/mol-insight",
    githubUrl: "https://github.com/alexisvannson/mol-insight",
  },
  {
    slug: "bio-embeddings",
    title: "Bio-Embeddings Toolkit",
    description:
      "Python library for generating and analyzing molecular embeddings for drug discovery applications.",
    longDescription:
      "A modular Python library that provides unified APIs for generating molecular embeddings from SMILES strings using multiple pre-trained models. Includes utilities for similarity search, clustering, and visualization of chemical space.",
    tech: ["Python", "RDKit", "scikit-learn", "UMAP", "Streamlit"],
    status: "in-progress",
    featured: false,
    githubUrl: "https://github.com/alexisvannson/bio-embeddings",
  },
  {
    slug: "clinical-nlp",
    title: "Clinical Notes NLP",
    description:
      "NLP pipeline for extracting structured medical information from unstructured clinical notes.",
    longDescription:
      "An end-to-end NLP pipeline that processes clinical notes to extract entities such as diagnoses, medications, and procedures. Uses fine-tuned BioBERT models with a custom annotation scheme tailored for French-language clinical documents.",
    tech: ["Python", "Hugging Face", "spaCy", "FastAPI", "Docker"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com/alexisvannson/clinical-nlp",
  },
];

export interface SkillCategory {
  name: string;
  icon: typeof Brain;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Machine Learning",
    icon: Brain,
    skills: ["PyTorch", "TensorFlow", "scikit-learn", "Transformers", "XGBoost", "MLflow"],
  },
  {
    name: "Biomedical",
    icon: HeartPulse,
    skills: ["LINCS L1000", "RDKit", "BioPython", "Gene Expression", "Drug Discovery", "SMILES"],
  },
  {
    name: "Programming",
    icon: Code2,
    skills: ["Python", "TypeScript", "R", "SQL", "Bash", "C++"],
  },
  {
    name: "Web Development",
    icon: Globe,
    skills: ["React", "Next.js", "Tailwind CSS", "Node.js", "FastAPI", "REST APIs"],
  },
  {
    name: "Tools & Infra",
    icon: Wrench,
    skills: ["Docker", "Git", "AWS", "Linux", "Jupyter", "PostgreSQL"],
  },
];
