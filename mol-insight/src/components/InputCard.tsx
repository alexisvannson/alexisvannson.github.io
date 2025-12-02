import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FlaskConical, HelpCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type InputMode = "smiles" | "drug";

interface InputCardProps {
  onSubmit: (input: string, mode: InputMode) => void;
  isLoading: boolean;
}

export const InputCard = ({ onSubmit, isLoading }: InputCardProps) => {
  const [mode, setMode] = useState<InputMode>("smiles");
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue.trim(), mode);
    }
  };

  const placeholders = {
    smiles: "CC(=O)Oc1ccccc1C(=O)O",
    drug: "Aspirin",
  };

  const examples = {
    smiles: [
      { name: "Aspirin", value: "CC(=O)Oc1ccccc1C(=O)O" },
      { name: "Ibuprofen", value: "CC(C)Cc1ccc(C(C)C(=O)O)cc1" },
      { name: "Caffeine", value: "Cn1cnc2c1c(=O)n(C)c(=O)n2C" },
    ],
    drug: [
      { name: "Aspirin", value: "Aspirin" },
      { name: "Metformin", value: "Metformin" },
      { name: "Imatinib", value: "Imatinib" },
    ],
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="glass-card rounded-2xl p-6 md:p-8">
        {/* Mode Toggle */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="inline-flex bg-muted rounded-xl p-1">
            <button
              type="button"
              onClick={() => setMode("smiles")}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                mode === "smiles"
                  ? "bg-card text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <FlaskConical className="inline-block w-4 h-4 mr-2" />
              SMILES Input
            </button>
            <button
              type="button"
              onClick={() => setMode("drug")}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                mode === "drug"
                  ? "bg-card text-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Search className="inline-block w-4 h-4 mr-2" />
              Drug Name
            </button>
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <HelpCircle className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p className="text-sm">
                {mode === "smiles" 
                  ? "Enter a SMILES (Simplified Molecular Input Line Entry System) string representing the chemical structure."
                  : "Enter a known drug or compound name. We'll look up its structure automatically."}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={placeholders[mode]}
                  className={cn(
                    "h-14 text-base px-5 rounded-xl border-2 border-transparent",
                    "bg-background/80 focus:bg-background",
                    "focus:border-primary/30 focus:ring-4 focus:ring-primary/10",
                    "transition-all duration-200",
                    mode === "smiles" && "font-mono text-sm"
                  )}
                  disabled={isLoading}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick Examples */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Try:</span>
            {examples[mode].map((example) => (
              <button
                key={example.value}
                type="button"
                onClick={() => setInputValue(example.value)}
                className={cn(
                  "px-3 py-1 text-xs rounded-full transition-all duration-200",
                  "bg-muted hover:bg-primary-light text-muted-foreground hover:text-primary",
                  "border border-transparent hover:border-primary/20"
                )}
              >
                {example.name}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="predict"
            size="xl"
            className="w-full"
            disabled={!inputValue.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Predict Impact
              </>
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};
