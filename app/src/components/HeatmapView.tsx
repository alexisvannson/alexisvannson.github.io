import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { GeneData } from "./GeneTable";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

interface HeatmapViewProps {
  data: GeneData[];
}

// Biological meanings of each category
const CATEGORY_EXPLANATIONS: Record<string, { description: string; interpretation: string; plainLanguage: string }> = {
  "Tumor Suppressor": {
    description: "Genes that normally prevent uncontrolled cell growth and division",
    plainLanguage: "Think of these as the body's natural 'brakes' on cell growth. Healthy cells have built-in stop signals that prevent them from multiplying too quickly. When these genes work properly, they help prevent cancer by stopping damaged cells from dividing.",
    interpretation: "When increased (upregulated): The compound may help restore these protective brakes, which is generally good. When decreased (downregulated): The protective mechanisms are weakened, which could be concerning."
  },
  "Oncogene": {
    description: "Genes that promote cell proliferation and survival when overactive",
    plainLanguage: "These are like the 'gas pedals' of cell growth. In normal amounts they help cells grow and divide when needed, but when overactive (as in cancer), they drive uncontrolled growth. These genes are the opposite of tumor suppressors.",
    interpretation: "When decreased (downregulated): The compound slows down growth signals, which is beneficial for fighting cancer. When increased (upregulated): Growth signals are amplified, which could be problematic."
  },
  "Receptor Tyrosine Kinase": {
    description: "Cell surface receptors that trigger growth and survival signaling cascades",
    plainLanguage: "Imagine these as 'doorbell buttons' on the cell surface. When pressed by the right signal molecule (like a growth factor), they trigger a chain reaction inside the cell that tells it to grow, divide, or survive. Cancer cells often have too many of these or they're stuck in the 'on' position.",
    interpretation: "Changes here show that the compound affects major growth signal pathways. This helps us understand whether the compound is blocking growth signals (potentially anti-cancer) or activating them."
  },
  "Signal Transduction": {
    description: "Proteins that relay signals from cell surface to nucleus, controlling growth and survival",
    plainLanguage: "These are the 'messenger systems' inside cells. When a signal hits the cell surface, these proteins pass the message along like a relay race, eventually reaching the cell's control center (nucleus) where genes are turned on or off. It's how cells communicate instructions throughout their interior.",
    interpretation: "Changes reveal which communication pathways are being influenced by the compound. This helps explain how the compound produces its effects—by interfering with or enhancing specific message chains."
  },
  "Cell Cycle": {
    description: "Regulators of cell division checkpoints and progression",
    plainLanguage: "Cells go through distinct phases before dividing: growing, copying their DNA, and splitting in two. This category includes the 'checkpoint guards' that ensure each step is completed correctly before proceeding. They prevent damaged cells from dividing and making copies of their mistakes.",
    interpretation: "Changes show effects on how fast cells divide. Increasing 'stop' signals or decreasing 'go' signals suggests the compound slows down cell division, which is desirable for cancer treatment."
  },
  "Apoptosis": {
    description: "Genes controlling programmed cell death",
    plainLanguage: "Apoptosis is the cell's self-destruct mechanism—a controlled way for damaged or unnecessary cells to die without harming surrounding tissue. It's like a planned demolition versus an explosion. Cancer cells often disable this process to survive when they should die.",
    interpretation: "When pro-death genes increase or anti-death genes decrease: The compound is pushing cancer cells toward self-destruction, which is a key goal of many cancer therapies. The opposite pattern would be concerning."
  },
  "Inflammation": {
    description: "Regulators of inflammatory responses and immune activation",
    plainLanguage: "Inflammation is the body's response to injury or threats—redness, swelling, and immune cell recruitment. While acute inflammation helps healing, chronic inflammation can promote cancer growth and spread. This category includes genes that control inflammatory molecules and immune cell behavior.",
    interpretation: "Changes reveal whether the compound affects inflammation levels. This could indicate immune system stimulation (potentially good for fighting cancer), immune suppression (potential side effect), or effects on the tumor's inflammatory environment."
  },
  "Cytokine": {
    description: "Signaling molecules mediating immune responses and cell-cell communication",
    plainLanguage: "Cytokines are chemical 'text messages' that immune cells and other cells use to coordinate with each other. They can summon immune cells to a location, activate or calm immune responses, and influence whether cells grow or die. The tumor environment is full of these signals that can either help or hinder cancer growth.",
    interpretation: "Changes show effects on immune cell coordination and the tumor's cellular neighborhood. This is important for understanding whether the compound recruits immune cells to attack the tumor or changes the signals that tumors use to protect themselves."
  },
  "Angiogenesis": {
    description: "Factors controlling new blood vessel formation",
    plainLanguage: "Angiogenesis is the growth of new blood vessels. Tumors need blood vessels to deliver oxygen and nutrients as they grow, so they send out signals to trigger new vessel formation. Without a blood supply, tumors can't grow beyond tiny sizes. Blocking angiogenesis is like cutting off a tumor's food supply.",
    interpretation: "When decreased (downregulated): The compound may have anti-angiogenic effects, starving the tumor by blocking its blood supply—a valuable anti-cancer property. When increased: May indicate wound healing effects or vascular changes."
  },
  "Hypoxia Response": {
    description: "Genes activated under low oxygen conditions, common in tumors",
    plainLanguage: "As tumors grow rapidly, their centers often lack oxygen (hypoxia). Instead of dying, cancer cells activate special survival programs that help them adapt to low oxygen, become more aggressive, and resist treatments. These genes are part of that adaptation system.",
    interpretation: "Changes reveal effects on the tumor's oxygen-survival mechanisms. Decreasing these genes may make tumors more vulnerable to treatment by preventing their adaptation to harsh, low-oxygen conditions."
  },
  "Metabolism": {
    description: "Enzymes and regulators of cellular energy production and biosynthesis",
    plainLanguage: "Metabolism is how cells convert nutrients into energy and building blocks. Cancer cells often reprogram their metabolism to grow faster—like switching from efficient energy production to rapid fuel consumption. They're essentially burning through resources differently than normal cells.",
    interpretation: "Changes indicate the compound affects how cells process energy and nutrients. This may reveal vulnerabilities in cancer-specific metabolic patterns that could be exploited therapeutically."
  },
  "Oxidative Stress": {
    description: "Protective mechanisms against reactive oxygen species",
    plainLanguage: "Cells naturally produce reactive oxygen molecules (like hydrogen peroxide) during normal metabolism, similar to exhaust from an engine. Too much causes oxidative stress, damaging proteins and DNA. Cells have antioxidant systems to neutralize these. Interestingly, cancer cells often have high oxidative stress but also strong defenses.",
    interpretation: "Changes affect the balance between oxidative damage and antioxidant protection. Increasing stress beyond what cancer cells can handle can kill them, while reducing defenses may sensitize them to other treatments."
  },
  "Drug Metabolism": {
    description: "Enzymes that chemically modify drugs, affecting their activity and clearance",
    plainLanguage: "These enzymes act as the body's chemical modification system, breaking down drugs and converting them to forms that can be eliminated. It's like a recycling center that processes and neutralizes foreign substances. The liver is especially rich in these enzymes.",
    interpretation: "When increased (upregulated): The compound may be broken down faster, potentially reducing its effectiveness or duration. When decreased: The compound or other drugs may remain active longer, which could increase effects or toxicity."
  },
  "Drug Transport": {
    description: "Proteins that move drugs across cell membranes",
    plainLanguage: "These are molecular 'pumps' and 'doors' that control what enters and exits cells. Some actively pump drugs out (efflux transporters), while others help them get in. Cancer cells often increase efflux pumps to expel chemotherapy drugs, which is one way they develop resistance.",
    interpretation: "When efflux pumps increase: May indicate emerging drug resistance as cells pump drugs out. When decreased: Drugs may accumulate more effectively inside cells, potentially improving treatment but also affecting toxicity."
  },
  "Housekeeping": {
    description: "Constitutively expressed genes maintaining basic cellular functions",
    plainLanguage: "These genes are like the essential utilities of a cell—they perform basic maintenance tasks needed for survival: protein production, waste cleanup, DNA repair, energy production. They're called 'housekeeping' because they keep the cellular house in order, and they're active in virtually all cells all the time.",
    interpretation: "Large changes here may signal general cellular stress or toxicity rather than specific therapeutic effects. These genes should typically remain stable—dramatic changes suggest the compound might be affecting basic cell survival."
  },
  "Cytoskeleton": {
    description: "Structural proteins forming the cell's internal scaffold",
    plainLanguage: "The cytoskeleton is like the cell's internal skeleton and muscle system combined—a network of protein fibers that give cells their shape, help them move, transport cargo internally, and pull chromosomes apart during division. Cancer cells often alter their cytoskeleton to become more mobile and invasive.",
    interpretation: "Changes affect cell structure, movement, and division mechanics. This is relevant for understanding effects on cancer cell migration (spread to other tissues) and how effectively they can divide."
  },
  "Epithelial-Mesenchymal Transition": {
    description: "Process allowing epithelial cells to become migratory and invasive",
    plainLanguage: "EMT is a transformation process where stationary, organized epithelial cells (like skin cells) change into mesenchymal cells that can move freely and invade tissues. Normally important for wound healing and development, cancer cells hijack this process to become mobile and metastasize (spread) to distant organs.",
    interpretation: "When mesenchymal markers decrease (downregulated): Suggests the compound inhibits this transformation, potentially preventing cancer spread—a highly desirable anti-cancer effect. When increased: May indicate cells are becoming more invasive."
  },
  "Unknown": {
    description: "Genes without established functional category",
    plainLanguage: "Our understanding of gene function is still incomplete. These genes haven't been definitively assigned to a specific biological category yet, though they may still have important roles we don't fully understand.",
    interpretation: "Further investigation needed to understand biological significance. Changes here may be relevant but require additional research to interpret."
  }
};

export const HeatmapView = ({ data }: HeatmapViewProps) => {
  const [showExplanations, setShowExplanations] = useState(false);
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

      {/* Category Explanations Section */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <button
          onClick={() => setShowExplanations(!showExplanations)}
          className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-medium text-foreground">
              Understanding Category Meanings
            </h3>
          </div>
          {showExplanations ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {showExplanations && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t"
          >
            <div className="p-4 space-y-4">
              <div className="space-y-3 mb-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Each category represents a distinct biological function. Understanding these helps interpret how the compound affects cellular processes and its potential therapeutic implications.
                </p>

                <div className="rounded-lg bg-primary/10 border border-primary/20 p-3 space-y-2">
                  <p className="text-xs font-medium text-foreground">Key Terms:</p>
                  <div className="grid gap-2">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-upregulated">Upregulated</span> (green/positive): A gene is being produced at higher levels than normal—the cell is making more of this protein.
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-downregulated">Downregulated</span> (red/negative): A gene is being produced at lower levels than normal—the cell is making less of this protein.
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground">Genes</span>: Instructions in our DNA that tell cells how to make specific proteins. Proteins do the actual work in cells.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {Array.from(categories.keys()).map((category) => {
                  const explanation = CATEGORY_EXPLANATIONS[category];
                  if (!explanation) return null;

                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-lg bg-muted/50 p-4 space-y-3"
                    >
                      <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                        {category}
                      </h4>
                      <div className="space-y-2.5">
                        <div className="space-y-1.5">
                          <p className="text-xs font-medium text-primary">In Plain Language:</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {explanation.plainLanguage}
                          </p>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-xs font-medium text-foreground">Technical Definition:</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {explanation.description}
                          </p>
                        </div>
                        <div className="space-y-1.5 pt-1 border-t border-border/50">
                          <p className="text-xs font-medium text-foreground">How to Interpret Changes:</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {explanation.interpretation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
