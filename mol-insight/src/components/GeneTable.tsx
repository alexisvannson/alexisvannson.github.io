import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface GeneData {
  id: string;
  symbol: string;
  score: number;
  direction: "up" | "down" | "neutral";
  pValue: number;
  category: string;
}

interface GeneTableProps {
  data: GeneData[];
}

type SortKey = "symbol" | "score";
type SortDirection = "asc" | "desc";

export const GeneTable = ({ data }: GeneTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [filterDirection, setFilterDirection] = useState<"all" | "up" | "down">("all");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (gene) =>
          gene.symbol.toLowerCase().includes(query) ||
          gene.id.toLowerCase().includes(query) ||
          gene.category.toLowerCase().includes(query)
      );
    }

    // Filter by direction
    if (filterDirection !== "all") {
      result = result.filter((gene) => gene.direction === filterDirection);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortKey) {
        case "symbol":
          comparison = a.symbol.localeCompare(b.symbol);
          break;
        case "score":
          comparison = Math.abs(a.score) - Math.abs(b.score);
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return result;
  }, [data, searchQuery, sortKey, sortDirection, filterDirection]);

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) {
      return <ArrowUpDown className="w-3 h-3 opacity-40" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-3 h-3" />
    ) : (
      <ArrowDown className="w-3 h-3" />
    );
  };

  const DirectionBadge = ({ direction, score }: { direction: string; score: number }) => {
    const colors = {
      up: "bg-upregulated/10 text-upregulated border-upregulated/20",
      down: "bg-downregulated/10 text-downregulated border-downregulated/20",
      neutral: "bg-muted text-muted-foreground border-border",
    };

    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border",
          colors[direction as keyof typeof colors]
        )}
      >
        {direction === "up" && <ArrowUp className="w-3 h-3" />}
        {direction === "down" && <ArrowDown className="w-3 h-3" />}
        {score > 0 ? "+" : ""}{score.toFixed(2)}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search genes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="inline-flex bg-muted rounded-lg p-0.5">
            {(["all", "up", "down"] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => setFilterDirection(dir)}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-all",
                  filterDirection === dir
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {dir === "all" ? "All" : dir === "up" ? "↑ Up" : "↓ Down"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("symbol")}
              >
                <div className="flex items-center gap-2">
                  Gene Symbol
                  <SortIcon column="symbol" />
                </div>
              </TableHead>
              <TableHead>Gene ID</TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("score")}
              >
                <div className="flex items-center gap-2">
                  Impact Score
                  <SortIcon column="score" />
                </div>
              </TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.slice(0, 20).map((gene, index) => (
              <motion.tr
                key={gene.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                className="border-b last:border-b-0 hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium font-mono text-sm">
                  {gene.symbol}
                </TableCell>
                <TableCell className="text-muted-foreground font-mono text-xs">
                  {gene.id}
                </TableCell>
                <TableCell>
                  <DirectionBadge direction={gene.direction} score={gene.score} />
                </TableCell>
                <TableCell>
                  <span className="px-2 py-0.5 text-xs bg-muted rounded-full">
                    {gene.category}
                  </span>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
        
        {filteredAndSortedData.length > 20 && (
          <div className="px-4 py-3 bg-muted/30 text-center text-sm text-muted-foreground border-t">
            Showing 20 of {filteredAndSortedData.length} genes
          </div>
        )}
      </div>
    </motion.div>
  );
};
