import type { GeneData } from "@/components/GeneTable";

const geneSymbols = [
  "TP53", "BRCA1", "EGFR", "KRAS", "MYC", "PTEN", "AKT1", "PIK3CA", "BRAF", "NRAS",
  "CDKN2A", "RB1", "ATM", "ERBB2", "CDK4", "MDM2", "JAK2", "STAT3", "MAPK1", "RAF1",
  "MTOR", "NOTCH1", "WNT1", "CTNNB1", "APC", "SMAD4", "TGFβ1", "VEGFA", "FLT1", "KDR",
  "PDGFRA", "FGFR1", "IGF1R", "MET", "ALK", "ROS1", "RET", "NTRK1", "KIT", "FLT3",
  "ABL1", "SRC", "BTK", "BCL2", "BAX", "CASP3", "CASP9", "APAF1", "XIAP", "SURVIVIN",
  "NFκB1", "RELA", "IκBα", "TNFα", "IL6", "IL1β", "CXCL8", "CCL2", "IFNG", "IL10",
  "HIF1A", "EPAS1", "VHL", "LDHA", "PKM2", "HK2", "GLUT1", "G6PD", "FASN", "ACC1",
  "SREBP1", "PPARγ", "LXRα", "AMPK", "SIRT1", "PGC1α", "NRF2", "KEAP1", "HO1", "NQO1",
  "CYP1A1", "CYP3A4", "UGT1A1", "GSTP1", "ABCB1", "ABCG2", "SLC22A1", "SLC2A1", "SLCO1B1", "SLCO1B3",
  "GAPDH", "ACTB", "TUBB", "TUBA1A", "GFAP", "VIM", "CDH1", "CDH2", "SNAI1", "ZEB1"
];

const categories = [
  "Tumor Suppressor", "Oncogene", "Cell Cycle", "Apoptosis", "Metabolism",
  "Signal Transduction", "Transcription Factor", "Cytokine", "Drug Target", "Housekeeping"
];

export const generateMockPrediction = (input: string): GeneData[] => {
  // Use input to seed some variation
  const seed = input.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  return geneSymbols.map((symbol, index) => {
    // Create pseudo-random but deterministic values based on input
    const pseudoRandom = Math.sin(seed + index * 0.1) * 10000;
    const normalizedRandom = (pseudoRandom - Math.floor(pseudoRandom));
    
    // Generate score between -2 and 2
    const score = (normalizedRandom - 0.5) * 4;
    
    // Determine direction
    let direction: "up" | "down" | "neutral";
    if (score > 0.3) direction = "up";
    else if (score < -0.3) direction = "down";
    else direction = "neutral";
    
    // Generate p-value (smaller for larger absolute scores)
    const pValue = Math.pow(10, -Math.abs(score) * 3 - normalizedRandom * 2);
    
    return {
      id: `ENSG${String(10000 + index).padStart(11, "0")}`,
      symbol,
      score: Number(score.toFixed(4)),
      direction,
      pValue: Math.max(pValue, 1e-15),
      category: categories[index % categories.length],
    };
  });
};

// Simulate API delay
export const simulatePrediction = async (input: string): Promise<GeneData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000));
  return generateMockPrediction(input);
};
