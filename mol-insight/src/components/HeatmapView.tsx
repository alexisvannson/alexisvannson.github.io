import { useMemo } from "react";
import { motion } from "framer-motion";
import type { GeneData } from "./GeneTable";
import { cn } from "@/lib/utils";

interface HeatmapViewProps {
  data: GeneData[];
}

export const HeatmapView = ({ data }: HeatmapViewProps) => {
  // Sort data by score for a more organized heatmap
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.score - a.score).slice(0, 100);
  }, [data]);

  const maxScore = Math.max(...sortedData.map((g) => Math.abs(g.score)));

  const getColor = (score: number) => {
    const intensity = Math.abs(score) / maxScore;
    if (score > 0) {
      // Green gradient for upregulated
      return `hsl(145, ${50 + intensity * 30}%, ${70 - intensity * 35}%)`;
    } else {
      // Red gradient for downregulated
      return `hsl(350, ${50 + intensity * 30}%, ${70 - intensity * 35}%)`;
    }
  };

  // Group by category for organization
  const categories = useMemo(() => {
    const cats = new Map<string, GeneData[]>();
    sortedData.forEach((gene) => {
      const existing = cats.get(gene.category) || [];
      cats.set(gene.category, [...existing, gene]);
    });
    return cats;
  }, [sortedData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-foreground">
            Expression Signature Heatmap
          </h3>
          <p className="text-xs text-muted-foreground">
            Top 100 genes organized by predicted impact magnitude
          </p>
        </div>
        
        {/* Color scale legend */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Down</span>
          <div className="flex h-3 rounded-full overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-full"
                style={{
                  backgroundColor: getColor(-maxScore + (i * 2 * maxScore) / 9),
                }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">Up</span>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-4 overflow-x-auto">
        <div className="space-y-4">
          {Array.from(categories.entries()).map(([category, genes]) => (
            <div key={category} className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {category}
              </h4>
              <div className="flex flex-wrap gap-1">
                {genes.map((gene, idx) => (
                  <motion.div
                    key={gene.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.01 }}
                    className={cn(
                      "group relative cursor-pointer",
                      "w-8 h-8 rounded-md transition-all duration-200",
                      "hover:z-10 hover:scale-125 hover:shadow-elevated"
                    )}
                    style={{ backgroundColor: getColor(gene.score) }}
                    title={`${gene.symbol}: ${gene.score > 0 ? "+" : ""}${gene.score.toFixed(3)}`}
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                      <span className="font-mono font-medium">{gene.symbol}</span>
                      <span className="ml-1 opacity-80">
                        {gene.score > 0 ? "+" : ""}{gene.score.toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-upregulated/10 border border-upregulated/20 p-3 text-center">
          <p className="text-2xl font-semibold text-upregulated">
            {sortedData.filter((g) => g.direction === "up").length}
          </p>
          <p className="text-xs text-muted-foreground">Upregulated</p>
        </div>
        <div className="rounded-lg bg-muted p-3 text-center">
          <p className="text-2xl font-semibold text-foreground">
            {sortedData.filter((g) => g.direction === "neutral").length}
          </p>
          <p className="text-xs text-muted-foreground">Neutral</p>
        </div>
        <div className="rounded-lg bg-downregulated/10 border border-downregulated/20 p-3 text-center">
          <p className="text-2xl font-semibold text-downregulated">
            {sortedData.filter((g) => g.direction === "down").length}
          </p>
          <p className="text-xs text-muted-foreground">Downregulated</p>
        </div>
      </div>
    </motion.div>
  );
};
