import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { WelcomeHeader } from "@/components/WelcomeHeader";
import { InputCard } from "@/components/InputCard";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { ResultsSection } from "@/components/ResultsSection";
import { simulatePrediction } from "@/lib/mockData";
import type { GeneData } from "@/components/GeneTable";
import { toast } from "@/hooks/use-toast";

const MolInsightPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GeneData[] | null>(null);
  const [moleculeName, setMoleculeName] = useState("");

  const handleSubmit = async (input: string, mode: "smiles" | "drug") => {
    setIsLoading(true);
    setResults(null);
    setMoleculeName(mode === "drug" ? input : `Molecule (${input.slice(0, 20)}...)`);

    try {
      const data = await simulatePrediction(input);
      setResults(data);

      const upCount = data.filter((g) => g.direction === "up").length;
      const downCount = data.filter((g) => g.direction === "down").length;

      toast({
        title: "Prediction Complete",
        description: `Found ${upCount} upregulated and ${downCount} downregulated genes.`,
      });
    } catch (error) {
      toast({
        title: "Prediction Failed",
        description: "An error occurred while generating predictions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Molecular Impact Explorer | Alexis Vannson</title>
        <meta
          name="description"
          content="Predict how small-molecule drugs influence gene expression using AI-powered molecular analysis. Enter a SMILES string or drug name to explore gene-expression signatures."
        />
      </Helmet>

      <main className="container mx-auto px-4 pb-8">
        {/* Breadcrumb */}
        <div className="pt-6 pb-2">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>

        {/* Welcome Header */}
        <WelcomeHeader />

        {/* Input Section */}
        <section className="mb-12">
          <InputCard onSubmit={handleSubmit} isLoading={isLoading} />
        </section>

        {/* Loading / Results */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.section
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-12"
            >
              <LoadingAnimation />
            </motion.section>
          )}

          {!isLoading && results && (
            <motion.section
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-12"
            >
              <ResultsSection data={results} moleculeName={moleculeName} />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Empty state encouragement */}
        {!isLoading && !results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">
              Enter a molecule above to see predicted gene expression changes.
            </p>
          </motion.div>
        )}
      </main>
    </>
  );
};

export default MolInsightPage;
