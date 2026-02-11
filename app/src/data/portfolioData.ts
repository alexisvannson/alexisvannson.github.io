import {
  Brain,
  Code2,
  Wrench,
} from "lucide-react";

export const personalInfo = {
  firstName: "Alexis",
  lastName: "Vannson",
  tagline:
    "AI student working on machine learning applications in biomedicine",
  nationality: "French & Austrian",
  email: "vannson.alexis@gmail.com",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/alexisvannson",
    linkedin: "https://linkedin.com/in/alexisvannson",
  },
};

export const aboutData = {
  bio: "I study AI, Data and Management Sciences at CentraleSupélec and Essec Business School — a dual engineering and business program in Paris. I've interned as a software engineer building LLM-powered products, as a data scientist working on large-scale prediction models, and as a research assistant benchmarking deep learning architectures for computer vision. Outside of work, I build projects in medical imaging, graph neural networks, and computational drug discovery.",
  highlights: [
    {
      label: "Education",
      value: "BSc in AI, Data & Management Sciences — CentraleSupélec x Essec (2023–2027)",
    },
    {
      label: "Nationality",
      value: "French & Austrian",
    },
    {
      label: "Languages",
      value: "French, German (Native) · English (Fluent) · Spanish, Dutch (Basic)",
    },
    {
      label: "Interests",
      value: "Computer Vision · Medical Imaging · LLM Applications · Drug Discovery",
    },
  ],
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
    role: "Software Engineering Intern",
    organization: "Polyfact",
    period: "May 2025 — Aug 2025",
    description:
      "Built and shipped LLM-powered features with TypeScript, LangGraph, and OpenAI APIs, increasing the profile base by 40% and enabling real-time search over a Supabase/PostgreSQL backend. Engineered automated web scraping pipelines across 10+ French government ministries using Puppeteer, and reverse-engineered government APIs to integrate real-time political data into existing infrastructure.",
    tech: ["TypeScript", "LangGraph", "OpenAI API", "Supabase", "PostgreSQL", "Puppeteer"],
  },
  {
    id: "exp-2",
    role: "Research Intern",
    organization: "CentraleSupélec",
    period: "Mar 2024 — Jun 2024",
    description:
      "Conducted comparative performance analysis of 4+ ML architectures (MLPs, CNNs, U-Nets, GNNs) for computer vision tasks. Optimized graph-based data preprocessing using KNN clustering to connect superpixels, achieving a 35% reduction in processing time and boosting model accuracy by up to 7%. Trained and evaluated models on multiple datasets (10,000+ samples).",
    tech: ["PyTorch", "Scikit-learn", "NumPy", "Pandas", "OpenCV"],
  },
  {
    id: "exp-3",
    role: "Data Science Intern",
    organization: "Emeria Technologies",
    period: "Apr 2024",
    description:
      "Performed feature engineering to isolate high-confidence data subsets from 2 million unprocessed invoices per year. Developed a Random Forest model using Scikit-learn, analyzing 138,000+ records to identify key features, boosting contract number prediction accuracy to 85% and reducing misclassification by 4%.",
    tech: ["Python", "Scikit-learn", "Pandas", "Random Forest"],
  },
  {
    id: "exp-4",
    role: "AI Practitioner",
    organization: "Automatants",
    period: "Sep 2023 — Jun 2024",
    description:
      "Explored and implemented various AI models including CNNs, ResNets, and Autoencoders through hands-on lab sessions and hackathons. Worked on pneumonia detection, deepfake identification, image denoising, and audio classification using PyTorch.",
    tech: ["PyTorch", "CNNs", "ResNets", "Autoencoders"],
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
    title: "Mol-Insight",
    description:
      "A data pipeline to predict cellular responses using a machine learning approach. Predicts gene-expression signatures from chemical structure using embedding-based models.",
    longDescription:
      "Mol-Insight is a machine learning pipeline that predicts how small-molecule drugs influence gene expression at the cellular level. It combines molecular embeddings with multi-output regression models trained on LINCS L1000 data to predict transcriptomic signatures from chemical structures.",
    tech: ["Python", "PyTorch", "Jupyter Notebook", "Scikit-learn", "Pandas"],
    status: "live",
    featured: true,
    liveUrl: "/projects/mol-insight",
    githubUrl: "https://github.com/alexisvannson/mol-insight",
  },
  {
    slug: "graphnet-classifier",
    title: "GraphNet Classifier",
    description:
      "Research project exploring how representing images as graphs improves the spatial understanding of deep learning models for image classification.",
    longDescription:
      "A research project investigating Graph Neural Networks for image classification. By representing images as graphs, the model captures spatial relationships between regions more effectively than traditional grid-based approaches. Includes a companion blog post detailing the methodology and results.",
    tech: ["Python", "PyTorch", "GNN", "Computer Vision", "Deep Learning"],
    status: "completed",
    featured: false,
    liveUrl: "https://alexisvannson.hashnode.dev/applying-graph-neural-networks-for-better-image-classification",
    githubUrl: "https://github.com/alexisvannson/GraphNet_Classifier",
  },
  {
    slug: "computer-vision",
    title: "Computer Vision Models",
    description:
      "Modular implementation of image classification architectures: MLP, CNN, ResNet, SeNet, and Vision Transformer (ViT).",
    longDescription:
      "A comprehensive image classification project with modular implementations of multiple deep learning architectures — MLP, CNN, ResNet, SeNet, and Vision Transformer (ViT). Each model is implemented from scratch to compare performance and understand architectural trade-offs.",
    tech: ["Python", "PyTorch", "Jupyter Notebook", "CNN", "ResNet", "ViT"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com/alexisvannson/computer-vision",
  },
  {
    slug: "vessel-segmentation",
    title: "Vessel Segmentation",
    description:
      "Retina blood vessel segmentation using U-Net architectures for medical image analysis.",
    longDescription:
      "A medical imaging project that applies U-Net architectures to segment blood vessels in retinal images. The model identifies vessel structures to assist in diagnosing retinal diseases, demonstrating the application of deep learning in healthcare.",
    tech: ["Python", "PyTorch", "U-Net", "Medical Imaging", "OpenCV"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com/alexisvannson/VesselSegmentation",
  },
];

export interface SkillCategory {
  name: string;
  icon: typeof Brain;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Data Science & ML",
    icon: Brain,
    skills: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "NLTK", "NumPy", "Pandas", "PySpark", "OpenCV"],
  },
  {
    name: "Programming",
    icon: Code2,
    skills: ["Python", "TypeScript", "C", "MySQL", "JavaScript", "Svelte", "HTML/CSS"],
  },
  {
    name: "Tools & Frameworks",
    icon: Wrench,
    skills: ["Git", "Postman", "Docker", "Shell scripting", "UNIX/Linux", "Node.js", "Deno", "Supabase", "LangChain"],
  },
];
