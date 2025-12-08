import type { GeneData } from "@/components/GeneTable";
import mockPredictions from "@/lib/precomputed_predictions_050.json";

// Mapping from SMILES strings to drug names
const SMILES_TO_DRUG_NAME: Record<string, string> = {
  "CCN(CC)CCNc1ccc(cc1)C(=O)Nc2ccc(cc2)NC3=NC=CC(=N3)N": "10-DEBC",
  "CC(C)Cc1ccc(C(C)=O)cc1": "ASA-404",
  "Cn1cnc2c1c(=O)n(C)c(=O)n2C": "AS-703026",
};

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

export const convertMockJsonToGeneData = (
  compound: string
): GeneData[] => {
  // Convert SMILES to drug name if it's in our mapping
  const drugName = SMILES_TO_DRUG_NAME[compound] || compound;

  const results = mockPredictions[drugName];
  if (!results) {
    throw new Error(`No mock prediction found for compound: ${drugName}`);
  }

  return geneSymbols.map((symbol, index) => {
    const rawScore = results[index] ?? 0;

    // direction:
    let direction: "up" | "down" | "neutral" = "neutral";
    if (rawScore > 0.3) direction = "up";
    else if (rawScore < -0.3) direction = "down";

    // p-value — mock logic, adjust if needed
    const pValue = Math.max(
      Math.pow(10, -Math.abs(rawScore) * 3),
      1e-15
    );

    return {
      id: `ENSG${String(10000 + index).padStart(11, "0")}`,
      symbol,
      score: Number(rawScore.toFixed(4)),
      direction,
      pValue,
      category: categories[index % categories.length]
    };
  });
};

export const simulatePrediction = async (compound: string): Promise<GeneData[]> => {
  await new Promise((r) => setTimeout(r, 1500));
  return convertMockJsonToGeneData(compound);
};


