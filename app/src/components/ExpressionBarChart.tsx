import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import type { GeneData } from "./GeneTable";

interface ExpressionBarChartProps {
  data: GeneData[];
}

export const ExpressionBarChart = ({ data }: ExpressionBarChartProps) => {
  // Get top 10 up and top 10 down regulated genes
  const topUp = [...data]
    .filter((g) => g.direction === "up")
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const topDown = [...data]
    .filter((g) => g.direction === "down")
    .sort((a, b) => a.score - b.score)
    .slice(0, 10);

  const chartData = [...topDown.reverse(), ...topUp].map((gene) => ({
    symbol: gene.symbol,
    score: gene.score,
    direction: gene.direction,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card/95 backdrop-blur-sm border rounded-lg px-3 py-2 shadow-elevated">
          <p className="font-mono font-medium text-sm">{data.symbol}</p>
          <p className="text-sm">
            <span className="text-muted-foreground">Score: </span>
            <span
              className={
                data.direction === "up" ? "text-upregulated" : "text-downregulated"
              }
            >
              {data.score > 0 ? "+" : ""}
              {data.score.toFixed(3)}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-foreground">
            Top Regulated Genes
          </h3>
          <p className="text-xs text-muted-foreground">
            Top 10 up- and down-regulated genes by impact score
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-upregulated" />
            Upregulated
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-downregulated" />
            Downregulated
          </span>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 60, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="hsl(var(--border))"
            />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => value.toFixed(1)}
            />
            <YAxis
              type="category"
              dataKey="symbol"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--foreground))", fontFamily: "monospace" }}
              width={55}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted) / 0.3)" }} />
            <ReferenceLine x={0} stroke="hsl(var(--border))" strokeWidth={2} />
            <Bar
              dataKey="score"
              radius={[0, 4, 4, 0]}
              maxBarSize={24}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.direction === "up"
                      ? "hsl(var(--upregulated))"
                      : "hsl(var(--downregulated))"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
