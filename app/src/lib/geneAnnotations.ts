/**
 * Biological annotations for genes used in gene expression prediction
 *
 * Categories are based on established biological functions from:
 * - Gene Ontology (GO)
 * - MSigDB Hallmark gene sets
 * - KEGG/Reactome pathways
 * - Cancer Gene Census
 */

export interface GeneAnnotation {
  symbol: string;
  category: string;
  fullName: string;
  description: string;
}

export const GENE_ANNOTATIONS: Record<string, GeneAnnotation> = {
  // Tumor Suppressors
  "TP53": {
    symbol: "TP53",
    category: "Tumor Suppressor",
    fullName: "Tumor Protein P53",
    description: "Guardian of the genome; regulates cell cycle arrest, apoptosis, and DNA repair"
  },
  "BRCA1": {
    symbol: "BRCA1",
    category: "Tumor Suppressor",
    fullName: "Breast Cancer Type 1 Susceptibility Protein",
    description: "DNA damage repair; mutated in hereditary breast/ovarian cancer"
  },
  "PTEN": {
    symbol: "PTEN",
    category: "Tumor Suppressor",
    fullName: "Phosphatase and Tensin Homolog",
    description: "Negative regulator of PI3K/AKT pathway; frequently lost in cancer"
  },
  "CDKN2A": {
    symbol: "CDKN2A",
    category: "Tumor Suppressor",
    fullName: "Cyclin Dependent Kinase Inhibitor 2A",
    description: "Cell cycle inhibitor; encodes p16INK4a and p14ARF tumor suppressors"
  },
  "RB1": {
    symbol: "RB1",
    category: "Tumor Suppressor",
    fullName: "Retinoblastoma 1",
    description: "Cell cycle gatekeeper; controls G1-S transition"
  },
  "ATM": {
    symbol: "ATM",
    category: "Tumor Suppressor",
    fullName: "Ataxia Telangiectasia Mutated",
    description: "DNA damage response kinase; activates cell cycle checkpoints"
  },
  "APC": {
    symbol: "APC",
    category: "Tumor Suppressor",
    fullName: "Adenomatous Polyposis Coli",
    description: "Negative regulator of WNT signaling; frequently mutated in colorectal cancer"
  },
  "VHL": {
    symbol: "VHL",
    category: "Tumor Suppressor",
    fullName: "Von Hippel-Lindau",
    description: "Targets HIF for degradation; mutated in renal cell carcinoma"
  },
  "SMAD4": {
    symbol: "SMAD4",
    category: "Tumor Suppressor",
    fullName: "SMAD Family Member 4",
    description: "TGF-beta signaling mediator; lost in pancreatic cancer"
  },

  // Oncogenes
  "MYC": {
    symbol: "MYC",
    category: "Oncogene",
    fullName: "MYC Proto-Oncogene",
    description: "Master transcription factor; drives cell proliferation and metabolism"
  },
  "KRAS": {
    symbol: "KRAS",
    category: "Oncogene",
    fullName: "KRAS Proto-Oncogene, GTPase",
    description: "Most frequently mutated oncogene; drives MAPK and PI3K signaling"
  },
  "NRAS": {
    symbol: "NRAS",
    category: "Oncogene",
    fullName: "NRAS Proto-Oncogene, GTPase",
    description: "RAS family member; activates growth signaling pathways"
  },
  "BRAF": {
    symbol: "BRAF",
    category: "Oncogene",
    fullName: "B-Raf Proto-Oncogene",
    description: "Serine/threonine kinase in MAPK pathway; V600E mutation in melanoma"
  },
  "MDM2": {
    symbol: "MDM2",
    category: "Oncogene",
    fullName: "MDM2 Proto-Oncogene",
    description: "Negative regulator of p53; amplified in sarcomas"
  },
  "SRC": {
    symbol: "SRC",
    category: "Oncogene",
    fullName: "SRC Proto-Oncogene",
    description: "Non-receptor tyrosine kinase; regulates cell growth and motility"
  },
  "RAF1": {
    symbol: "RAF1",
    category: "Oncogene",
    fullName: "Raf-1 Proto-Oncogene",
    description: "MAPK pathway kinase; mediates RAS signaling"
  },

  // Receptor Tyrosine Kinases
  "EGFR": {
    symbol: "EGFR",
    category: "Receptor Tyrosine Kinase",
    fullName: "Epidermal Growth Factor Receptor",
    description: "RTK driving proliferation; mutated/amplified in lung cancer and glioblastoma"
  },
  "ERBB2": {
    symbol: "ERBB2",
    category: "Receptor Tyrosine Kinase",
    fullName: "Erb-B2 Receptor Tyrosine Kinase 2",
    description: "HER2; amplified in breast cancer; target of trastuzumab"
  },
  "FGFR1": {
    symbol: "FGFR1",
    category: "Receptor Tyrosine Kinase",
    fullName: "Fibroblast Growth Factor Receptor 1",
    description: "RTK for FGF signaling; amplified in squamous cell carcinomas"
  },
  "IGF1R": {
    symbol: "IGF1R",
    category: "Receptor Tyrosine Kinase",
    fullName: "Insulin Like Growth Factor 1 Receptor",
    description: "Promotes cell growth and survival; implicated in cancer metabolism"
  },
  "MET": {
    symbol: "MET",
    category: "Receptor Tyrosine Kinase",
    fullName: "MET Proto-Oncogene",
    description: "Hepatocyte growth factor receptor; drives invasion and metastasis"
  },
  "ALK": {
    symbol: "ALK",
    category: "Receptor Tyrosine Kinase",
    fullName: "ALK Receptor Tyrosine Kinase",
    description: "Fusion oncogene in lung cancer; target of crizotinib"
  },
  "ROS1": {
    symbol: "ROS1",
    category: "Receptor Tyrosine Kinase",
    fullName: "ROS Proto-Oncogene 1",
    description: "RTK with fusions in lung cancer; similar to ALK"
  },
  "RET": {
    symbol: "RET",
    category: "Receptor Tyrosine Kinase",
    fullName: "RET Proto-Oncogene",
    description: "RTK with fusions in thyroid and lung cancer"
  },
  "NTRK1": {
    symbol: "NTRK1",
    category: "Receptor Tyrosine Kinase",
    fullName: "Neurotrophic Receptor Tyrosine Kinase 1",
    description: "TRK family; fusions found across many cancer types"
  },
  "KIT": {
    symbol: "KIT",
    category: "Receptor Tyrosine Kinase",
    fullName: "KIT Proto-Oncogene",
    description: "Stem cell factor receptor; mutated in GIST and melanoma"
  },
  "FLT3": {
    symbol: "FLT3",
    category: "Receptor Tyrosine Kinase",
    fullName: "Fms Related Receptor Tyrosine Kinase 3",
    description: "Hematopoietic RTK; mutated in AML"
  },
  "FLT1": {
    symbol: "FLT1",
    category: "Angiogenesis",
    fullName: "Fms Related Receptor Tyrosine Kinase 1",
    description: "VEGFR1; mediates angiogenesis and vascular permeability"
  },
  "KDR": {
    symbol: "KDR",
    category: "Angiogenesis",
    fullName: "Kinase Insert Domain Receptor",
    description: "VEGFR2; primary mediator of VEGF-induced angiogenesis"
  },
  "PDGFRA": {
    symbol: "PDGFRA",
    category: "Receptor Tyrosine Kinase",
    fullName: "Platelet Derived Growth Factor Receptor Alpha",
    description: "RTK for PDGF; mutated in GIST and gliomas"
  },

  // Signal Transduction
  "AKT1": {
    symbol: "AKT1",
    category: "Signal Transduction",
    fullName: "AKT Serine/Threonine Kinase 1",
    description: "Central node in PI3K pathway; promotes survival and growth"
  },
  "PIK3CA": {
    symbol: "PIK3CA",
    category: "Signal Transduction",
    fullName: "Phosphatidylinositol-4,5-Bisphosphate 3-Kinase Catalytic Subunit Alpha",
    description: "Most frequently mutated kinase; activates AKT signaling"
  },
  "JAK2": {
    symbol: "JAK2",
    category: "Signal Transduction",
    fullName: "Janus Kinase 2",
    description: "Cytokine receptor kinase; V617F mutation in myeloproliferative disorders"
  },
  "STAT3": {
    symbol: "STAT3",
    category: "Signal Transduction",
    fullName: "Signal Transducer and Activator of Transcription 3",
    description: "Transcription factor activated by cytokines; promotes cancer progression"
  },
  "MAPK1": {
    symbol: "MAPK1",
    category: "Signal Transduction",
    fullName: "Mitogen-Activated Protein Kinase 1",
    description: "ERK2; terminal kinase in MAPK pathway driving proliferation"
  },
  "MTOR": {
    symbol: "MTOR",
    category: "Signal Transduction",
    fullName: "Mechanistic Target of Rapamycin Kinase",
    description: "Master regulator of cell growth, metabolism, and autophagy"
  },
  "NOTCH1": {
    symbol: "NOTCH1",
    category: "Signal Transduction",
    fullName: "Notch Receptor 1",
    description: "Cell fate determination; mutated in T-ALL"
  },
  "WNT1": {
    symbol: "WNT1",
    category: "Signal Transduction",
    fullName: "Wnt Family Member 1",
    description: "Secreted ligand activating canonical WNT pathway"
  },
  "CTNNB1": {
    symbol: "CTNNB1",
    category: "Signal Transduction",
    fullName: "Catenin Beta 1",
    description: "Beta-catenin; mediator of WNT signaling; mutated in colorectal cancer"
  },
  "ABL1": {
    symbol: "ABL1",
    category: "Signal Transduction",
    fullName: "ABL Proto-Oncogene 1",
    description: "Non-receptor tyrosine kinase; BCR-ABL fusion in CML"
  },
  "BTK": {
    symbol: "BTK",
    category: "Signal Transduction",
    fullName: "Bruton Tyrosine Kinase",
    description: "B-cell receptor signaling; target in B-cell malignancies"
  },

  // Cell Cycle Regulators
  "CDK4": {
    symbol: "CDK4",
    category: "Cell Cycle",
    fullName: "Cyclin Dependent Kinase 4",
    description: "G1-S transition kinase; amplified in melanoma and sarcoma"
  },

  // Apoptosis
  "BCL2": {
    symbol: "BCL2",
    category: "Apoptosis",
    fullName: "BCL2 Apoptosis Regulator",
    description: "Anti-apoptotic protein; overexpressed in follicular lymphoma"
  },
  "BAX": {
    symbol: "BAX",
    category: "Apoptosis",
    fullName: "BCL2 Associated X",
    description: "Pro-apoptotic protein; forms mitochondrial pores"
  },
  "CASP3": {
    symbol: "CASP3",
    category: "Apoptosis",
    fullName: "Caspase 3",
    description: "Executioner caspase; cleaves cellular substrates during apoptosis"
  },
  "CASP9": {
    symbol: "CASP9",
    category: "Apoptosis",
    fullName: "Caspase 9",
    description: "Initiator caspase in intrinsic apoptosis pathway"
  },
  "APAF1": {
    symbol: "APAF1",
    category: "Apoptosis",
    fullName: "Apoptotic Peptidase Activating Factor 1",
    description: "Forms apoptosome complex activating caspase-9"
  },
  "XIAP": {
    symbol: "XIAP",
    category: "Apoptosis",
    fullName: "X-Linked Inhibitor of Apoptosis",
    description: "Inhibits caspases; prevents apoptosis"
  },
  "SURVIVIN": {
    symbol: "SURVIVIN",
    category: "Apoptosis",
    fullName: "Baculoviral IAP Repeat Containing 5",
    description: "BIRC5; inhibits apoptosis; overexpressed in cancer"
  },

  // Inflammation & Immune Response
  "NFκB1": {
    symbol: "NFκB1",
    category: "Inflammation",
    fullName: "Nuclear Factor Kappa B Subunit 1",
    description: "Transcription factor driving inflammatory and survival genes"
  },
  "RELA": {
    symbol: "RELA",
    category: "Inflammation",
    fullName: "RELA Proto-Oncogene, NF-kB Subunit",
    description: "p65 subunit of NF-κB; mediates inflammatory responses"
  },
  "IκBα": {
    symbol: "IκBα",
    category: "Inflammation",
    fullName: "NFKB Inhibitor Alpha",
    description: "NFKBIA; inhibits NF-κB by sequestering it in cytoplasm"
  },
  "TNFα": {
    symbol: "TNFα",
    category: "Cytokine",
    fullName: "Tumor Necrosis Factor",
    description: "Pro-inflammatory cytokine; induces apoptosis and inflammation"
  },
  "IL6": {
    symbol: "IL6",
    category: "Cytokine",
    fullName: "Interleukin 6",
    description: "Pleiotropic cytokine; activates JAK/STAT; promotes tumor growth"
  },
  "IL1β": {
    symbol: "IL1β",
    category: "Cytokine",
    fullName: "Interleukin 1 Beta",
    description: "Pro-inflammatory cytokine; drives inflammatory responses"
  },
  "CXCL8": {
    symbol: "CXCL8",
    category: "Cytokine",
    fullName: "C-X-C Motif Chemokine Ligand 8",
    description: "IL-8; neutrophil chemoattractant; promotes angiogenesis"
  },
  "CCL2": {
    symbol: "CCL2",
    category: "Cytokine",
    fullName: "C-C Motif Chemokine Ligand 2",
    description: "MCP-1; recruits monocytes and macrophages to tumors"
  },
  "IFNG": {
    symbol: "IFNG",
    category: "Cytokine",
    fullName: "Interferon Gamma",
    description: "Type II interferon; activates immune responses and antitumor immunity"
  },
  "IL10": {
    symbol: "IL10",
    category: "Cytokine",
    fullName: "Interleukin 10",
    description: "Anti-inflammatory cytokine; immunosuppressive in tumor microenvironment"
  },

  // Angiogenesis
  "VEGFA": {
    symbol: "VEGFA",
    category: "Angiogenesis",
    fullName: "Vascular Endothelial Growth Factor A",
    description: "Key angiogenic factor; target of bevacizumab"
  },
  "TGFβ1": {
    symbol: "TGFβ1",
    category: "Signal Transduction",
    fullName: "Transforming Growth Factor Beta 1",
    description: "Pleiotropic cytokine; tumor suppressor or promoter depending on context"
  },

  // Hypoxia Response
  "HIF1A": {
    symbol: "HIF1A",
    category: "Hypoxia Response",
    fullName: "Hypoxia Inducible Factor 1 Subunit Alpha",
    description: "Master regulator of oxygen homeostasis; drives glycolysis and angiogenesis"
  },
  "EPAS1": {
    symbol: "EPAS1",
    category: "Hypoxia Response",
    fullName: "Endothelial PAS Domain Protein 1",
    description: "HIF2A; transcription factor responding to hypoxia"
  },

  // Metabolism
  "LDHA": {
    symbol: "LDHA",
    category: "Metabolism",
    fullName: "Lactate Dehydrogenase A",
    description: "Converts pyruvate to lactate; enables Warburg effect"
  },
  "PKM2": {
    symbol: "PKM2",
    category: "Metabolism",
    fullName: "Pyruvate Kinase M2",
    description: "Rate-limiting glycolytic enzyme; cancer-specific isoform"
  },
  "HK2": {
    symbol: "HK2",
    category: "Metabolism",
    fullName: "Hexokinase 2",
    description: "First step of glycolysis; elevated in cancer"
  },
  "GLUT1": {
    symbol: "GLUT1",
    category: "Metabolism",
    fullName: "Solute Carrier Family 2 Member 1",
    description: "SLC2A1; glucose transporter; upregulated in cancer"
  },
  "G6PD": {
    symbol: "G6PD",
    category: "Metabolism",
    fullName: "Glucose-6-Phosphate Dehydrogenase",
    description: "Rate-limiting enzyme in pentose phosphate pathway; generates NADPH"
  },
  "FASN": {
    symbol: "FASN",
    category: "Metabolism",
    fullName: "Fatty Acid Synthase",
    description: "De novo lipogenesis enzyme; elevated in cancer"
  },
  "ACC1": {
    symbol: "ACC1",
    category: "Metabolism",
    fullName: "Acetyl-CoA Carboxylase Alpha",
    description: "ACACA; rate-limiting enzyme in fatty acid synthesis"
  },
  "SREBP1": {
    symbol: "SREBP1",
    category: "Metabolism",
    fullName: "Sterol Regulatory Element Binding Transcription Factor 1",
    description: "SREBF1; master regulator of lipid biosynthesis"
  },
  "PPARγ": {
    symbol: "PPARγ",
    category: "Metabolism",
    fullName: "Peroxisome Proliferator Activated Receptor Gamma",
    description: "PPARG; nuclear receptor regulating glucose and lipid metabolism"
  },
  "LXRα": {
    symbol: "LXRα",
    category: "Metabolism",
    fullName: "Liver X Receptor Alpha",
    description: "NR1H3; nuclear receptor regulating cholesterol homeostasis"
  },
  "AMPK": {
    symbol: "AMPK",
    category: "Metabolism",
    fullName: "AMP-Activated Protein Kinase",
    description: "PRKAA1; energy sensor; inhibits anabolic processes during stress"
  },
  "SIRT1": {
    symbol: "SIRT1",
    category: "Metabolism",
    fullName: "Sirtuin 1",
    description: "NAD-dependent deacetylase; regulates metabolism and longevity"
  },
  "PGC1α": {
    symbol: "PGC1α",
    category: "Metabolism",
    fullName: "PPARG Coactivator 1 Alpha",
    description: "PPARGC1A; master regulator of mitochondrial biogenesis"
  },

  // Oxidative Stress & Detoxification
  "NRF2": {
    symbol: "NRF2",
    category: "Oxidative Stress",
    fullName: "Nuclear Factor, Erythroid 2 Like 2",
    description: "NFE2L2; master regulator of antioxidant response"
  },
  "KEAP1": {
    symbol: "KEAP1",
    category: "Oxidative Stress",
    fullName: "Kelch Like ECH Associated Protein 1",
    description: "Negative regulator of NRF2; mutated in lung cancer"
  },
  "HO1": {
    symbol: "HO1",
    category: "Oxidative Stress",
    fullName: "Heme Oxygenase 1",
    description: "HMOX1; cytoprotective enzyme induced by oxidative stress"
  },
  "NQO1": {
    symbol: "NQO1",
    category: "Oxidative Stress",
    fullName: "NAD(P)H Quinone Dehydrogenase 1",
    description: "Detoxification enzyme; reduces quinones"
  },
  "CYP1A1": {
    symbol: "CYP1A1",
    category: "Drug Metabolism",
    fullName: "Cytochrome P450 Family 1 Subfamily A Member 1",
    description: "Phase I drug metabolizing enzyme; activates procarcinogens"
  },
  "CYP3A4": {
    symbol: "CYP3A4",
    category: "Drug Metabolism",
    fullName: "Cytochrome P450 Family 3 Subfamily A Member 4",
    description: "Major drug metabolizing enzyme; metabolizes 50% of drugs"
  },
  "UGT1A1": {
    symbol: "UGT1A1",
    category: "Drug Metabolism",
    fullName: "UDP Glucuronosyltransferase Family 1 Member A1",
    description: "Phase II enzyme; glucuronidates drugs and bilirubin"
  },
  "GSTP1": {
    symbol: "GSTP1",
    category: "Drug Metabolism",
    fullName: "Glutathione S-Transferase Pi 1",
    description: "Detoxification enzyme; conjugates glutathione to xenobiotics"
  },

  // Drug Transporters
  "ABCB1": {
    symbol: "ABCB1",
    category: "Drug Transport",
    fullName: "ATP Binding Cassette Subfamily B Member 1",
    description: "P-glycoprotein; multidrug resistance transporter"
  },
  "ABCG2": {
    symbol: "ABCG2",
    category: "Drug Transport",
    fullName: "ATP Binding Cassette Subfamily G Member 2",
    description: "BCRP; efflux transporter causing drug resistance"
  },
  "SLC22A1": {
    symbol: "SLC22A1",
    category: "Drug Transport",
    fullName: "Solute Carrier Family 22 Member 1",
    description: "OCT1; organic cation transporter for metformin"
  },
  "SLC2A1": {
    symbol: "SLC2A1",
    category: "Metabolism",
    fullName: "Solute Carrier Family 2 Member 1",
    description: "GLUT1; glucose transporter"
  },
  "SLCO1B1": {
    symbol: "SLCO1B1",
    category: "Drug Transport",
    fullName: "Solute Carrier Organic Anion Transporter Family Member 1B1",
    description: "OATP1B1; hepatic uptake transporter for statins"
  },
  "SLCO1B3": {
    symbol: "SLCO1B3",
    category: "Drug Transport",
    fullName: "Solute Carrier Organic Anion Transporter Family Member 1B3",
    description: "OATP1B3; hepatic uptake transporter"
  },

  // Structural/Cytoskeleton
  "GAPDH": {
    symbol: "GAPDH",
    category: "Housekeeping",
    fullName: "Glyceraldehyde-3-Phosphate Dehydrogenase",
    description: "Glycolytic enzyme; widely used as loading control"
  },
  "ACTB": {
    symbol: "ACTB",
    category: "Housekeeping",
    fullName: "Actin Beta",
    description: "Beta-actin; cytoskeletal protein; loading control"
  },
  "TUBB": {
    symbol: "TUBB",
    category: "Housekeeping",
    fullName: "Tubulin Beta Class I",
    description: "Microtubule component; target of taxanes"
  },
  "TUBA1A": {
    symbol: "TUBA1A",
    category: "Housekeeping",
    fullName: "Tubulin Alpha 1a",
    description: "Alpha-tubulin; microtubule component"
  },
  "GFAP": {
    symbol: "GFAP",
    category: "Cytoskeleton",
    fullName: "Glial Fibrillary Acidic Protein",
    description: "Intermediate filament; marker of astrocytes and gliomas"
  },
  "VIM": {
    symbol: "VIM",
    category: "Cytoskeleton",
    fullName: "Vimentin",
    description: "Intermediate filament; marker of mesenchymal cells and EMT"
  },

  // Cell Adhesion & EMT
  "CDH1": {
    symbol: "CDH1",
    category: "Epithelial-Mesenchymal Transition",
    fullName: "Cadherin 1",
    description: "E-cadherin; epithelial adhesion molecule; lost during EMT"
  },
  "CDH2": {
    symbol: "CDH2",
    category: "Epithelial-Mesenchymal Transition",
    fullName: "Cadherin 2",
    description: "N-cadherin; mesenchymal adhesion molecule; gained during EMT"
  },
  "SNAI1": {
    symbol: "SNAI1",
    category: "Epithelial-Mesenchymal Transition",
    fullName: "Snail Family Transcriptional Repressor 1",
    description: "SNAIL; transcription factor driving EMT and metastasis"
  },
  "ZEB1": {
    symbol: "ZEB1",
    category: "Epithelial-Mesenchymal Transition",
    fullName: "Zinc Finger E-Box Binding Homeobox 1",
    description: "Transcription factor promoting EMT and stemness"
  }
};

/**
 * Get all unique categories
 */
export const getAllCategories = (): string[] => {
  const categories = new Set(
    Object.values(GENE_ANNOTATIONS).map(ann => ann.category)
  );
  return Array.from(categories).sort();
};

/**
 * Get annotation for a gene symbol
 */
export const getGeneAnnotation = (symbol: string): GeneAnnotation | undefined => {
  return GENE_ANNOTATIONS[symbol];
};

/**
 * Get all genes in a specific category
 */
export const getGenesByCategory = (category: string): GeneAnnotation[] => {
  return Object.values(GENE_ANNOTATIONS).filter(
    ann => ann.category === category
  );
};
