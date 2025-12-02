import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Image, Info, Table2, BarChart3, Grid3X3, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GeneTable, type GeneData } from "./GeneTable";
import { ExpressionBarChart } from "./ExpressionBarChart";
import { HeatmapView } from "./HeatmapView";
import { VolcanoPlot } from "./VolcanoPlot";
import { cn } from "@/lib/utils";

interface ResultsSectionProps {
  data: GeneData[];
  moleculeName: string;
}

type ViewMode = "table" | "bar" | "heatmap" | "volcano";

export const ResultsSection = ({ data, moleculeName }: ResultsSectionProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [showExplanation, setShowExplanation] = useState(false);

  const upCount = data.filter((g) => g.direction === "up").length;
  const downCount = data.filter((g) => g.direction === "down").length;

  const handleExportCSV = () => {
    const headers = ["Gene Symbol", "Gene ID", "Impact Score", "Direction", "P-Value", "Category"];
    const rows = data.map((gene) => [
      gene.symbol,
      gene.id,
      gene.score.toString(),
      gene.direction,
      gene.pValue.toString(),
      gene.category,
    ]);
    
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${moleculeName.replace(/\s+/g, "_")}_gene_expression.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const views: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: "table", label: "Table", icon: <Table2 className="w-4 h-4" /> },
    { id: "bar", label: "Bar Chart", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "heatmap", label: "Heatmap", icon: <Grid3X3 className="w-4 h-4" /> },
    { id: "volcano", label: "Volcano", icon: <TrendingUp className="w-4 h-4" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto space-y-6"
    >
      {/* Results Header */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-1">
              Prediction Results
            </h2>
            <p className="text-muted-foreground">
              Here's how <span className="font-medium text-foreground">{moleculeName}</span> is predicted to influence gene expression.
            </p>
          </div>
          
          {/* Summary badges */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-upregulated/10 text-upregulated rounded-full text-sm font-medium">
              <span>↑</span>
              <span>{upCount} up</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-downregulated/10 text-downregulated rounded-full text-sm font-medium">
              <span>↓</span>
              <span>{downCount} down</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Controls & Export */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* View Toggle */}
        <div className="inline-flex bg-muted rounded-xl p-1">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setViewMode(view.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                viewMode === view.id
                  ? "bg-card text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {view.icon}
              <span className="hidden sm:inline">{view.label}</span>
            </button>
          ))}
        </div>

        {/* Export & Info */}
        <div className="flex items-center gap-2">
          <Button
            variant="soft"
            size="sm"
            onClick={() => setShowExplanation(!showExplanation)}
          >
            <Info className="w-4 h-4" />
            <span className="hidden sm:inline">Explain</span>
          </Button>
          <Button variant="soft" size="sm" onClick={handleExportCSV}>
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">CSV</span>
          </Button>
          <Button variant="soft" size="sm">
            <Image className="w-4 h-4" />
            <span className="hidden sm:inline">PNG</span>
          </Button>
        </div>
      </div>

      {/* Explanation Panel */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl bg-primary-light border border-primary/20 p-4">
              <h3 className="text-sm font-medium text-foreground mb-2">
                About These Predictions
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These predictions are generated by an embedding-based molecular representation model 
                combined with a random forest regressor trained on LINCS L1000 gene expression data. 
                The impact scores represent predicted changes in gene expression levels (positive = upregulation, 
                negative = downregulation). P-values indicate statistical confidence. Results should be 
                validated experimentally for clinical applications.
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span>Model confidence: High</span>
                <span>•</span>
                <span>Training data: LINCS L1000</span>
                <span>•</span>
                <span>Genes analyzed: {data.length}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visualization Area */}
      <div className="glass-card rounded-2xl p-6">
        <AnimatePresence mode="wait">
          {viewMode === "table" && (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <GeneTable data={data} />
            </motion.div>
          )}
          
          {viewMode === "bar" && (
            <motion.div
              key="bar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ExpressionBarChart data={data} />
            </motion.div>
          )}
          
          {viewMode === "heatmap" && (
            <motion.div
              key="heatmap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HeatmapView data={data} />
            </motion.div>
          )}
          
          {viewMode === "volcano" && (
            <motion.div
              key="volcano"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <VolcanoPlot data={data} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
