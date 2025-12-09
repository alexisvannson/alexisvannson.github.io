import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { WelcomeHeader } from "@/components/WelcomeHeader";
import { InputCard } from "@/components/InputCard";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { ResultsSection } from "@/components/ResultsSection";
import { Footer } from "@/components/Footer";
import { simulatePrediction } from "@/lib/mockData";
import type { GeneData } from "@/components/GeneTable";
import { toast } from "@/hooks/use-toast";

const Index = () => {
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
        <title>Molecular Impact Explorer | Predict Gene Expression Signatures</title>
        <meta 
          name="description" 
          content="Predict how small-molecule drugs influence gene expression using AI-powered molecular analysis. Enter a SMILES string or drug name to explore gene-expression signatures."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-hero">
        <main className="container mx-auto px-4 pb-8">
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

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
