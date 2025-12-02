import { motion } from "framer-motion";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import type { GeneData } from "./GeneTable";

interface VolcanoPlotProps {
  data: GeneData[];
}

export const VolcanoPlot = ({ data }: VolcanoPlotProps) => {
  // Transform data for volcano plot
  const plotData = data.map((gene) => ({
    ...gene,
    negLogP: -Math.log10(gene.pValue),
    x: gene.score,
  }));

  const significanceThreshold = -Math.log10(0.05);
  const foldChangeThreshold = 0.5;

  const getPointColor = (gene: typeof plotData[0]) => {
    if (gene.negLogP < significanceThreshold) return "hsl(var(--neutral-gene))";
    if (Math.abs(gene.x) < foldChangeThreshold) return "hsl(var(--neutral-gene))";
    return gene.x > 0 ? "hsl(var(--upregulated))" : "hsl(var(--downregulated))";
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card/95 backdrop-blur-sm border rounded-lg px-3 py-2 shadow-elevated">
          <p className="font-mono font-medium text-sm">{data.symbol}</p>
          <div className="space-y-0.5 text-xs">
            <p>
              <span className="text-muted-foreground">Score: </span>
              <span className={data.direction === "up" ? "text-upregulated" : data.direction === "down" ? "text-downregulated" : ""}>
                {data.score > 0 ? "+" : ""}{data.score.toFixed(3)}
              </span>
            </p>
            <p>
              <span className="text-muted-foreground">P-value: </span>
              <span>{data.pValue.toExponential(2)}</span>
            </p>
            <p>
              <span className="text-muted-foreground">-log₁₀(p): </span>
              <span>{data.negLogP.toFixed(2)}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-foreground">
            Volcano Plot
          </h3>
          <p className="text-xs text-muted-foreground">
            Statistical significance vs. expression change magnitude
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-upregulated" />
            Significant Up
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-downregulated" />
            Significant Down
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-neutral-gene" />
            Not Significant
          </span>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
            />
            <XAxis
              type="number"
              dataKey="x"
              name="Score"
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              label={{
                value: "Impact Score",
                position: "bottom",
                offset: 0,
                fontSize: 11,
                fill: "hsl(var(--muted-foreground))",
              }}
            />
            <YAxis
              type="number"
              dataKey="negLogP"
              name="-log₁₀(p)"
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              label={{
                value: "-log₁₀(p-value)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fontSize: 11,
                fill: "hsl(var(--muted-foreground))",
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Significance threshold line */}
            <ReferenceLine
              y={significanceThreshold}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="5 5"
              strokeOpacity={0.5}
            />
            
            {/* Fold change threshold lines */}
            <ReferenceLine
              x={foldChangeThreshold}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="5 5"
              strokeOpacity={0.5}
            />
            <ReferenceLine
              x={-foldChangeThreshold}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="5 5"
              strokeOpacity={0.5}
            />

            <Scatter data={plotData} fill="hsl(var(--primary))">
              {plotData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getPointColor(entry)}
                  fillOpacity={0.7}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Threshold info */}
      <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
        <span>Significance threshold: p &lt; 0.05</span>
        <span>|</span>
        <span>Effect threshold: |score| &gt; {foldChangeThreshold}</span>
      </div>
    </motion.div>
  );
};
