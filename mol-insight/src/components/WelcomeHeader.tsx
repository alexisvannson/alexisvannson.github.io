import { motion } from "framer-motion";

const MolecularAnimation = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-30"
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Animated connection lines */}
      <motion.path
        d="M50 100 L120 60 L200 80 L280 50 L350 90"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M80 150 L150 130 L220 150 L300 120 L370 140"
        stroke="hsl(var(--accent))"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
      />
      
      {/* Animated nodes */}
      {[
        { cx: 50, cy: 100, delay: 0 },
        { cx: 120, cy: 60, delay: 0.1 },
        { cx: 200, cy: 80, delay: 0.2 },
        { cx: 280, cy: 50, delay: 0.3 },
        { cx: 350, cy: 90, delay: 0.4 },
        { cx: 80, cy: 150, delay: 0.5 },
        { cx: 150, cy: 130, delay: 0.6 },
        { cx: 220, cy: 150, delay: 0.7 },
        { cx: 300, cy: 120, delay: 0.8 },
        { cx: 370, cy: 140, delay: 0.9 },
      ].map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r="4"
          fill="hsl(var(--primary))"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{
            duration: 0.4,
            delay: node.delay,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Pulsing center node */}
      <motion.circle
        cx="200"
        cy="100"
        r="8"
        fill="hsl(var(--primary))"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        opacity={0.6}
      />
    </svg>
  );
};

export const WelcomeHeader = () => {
  return (
    <motion.header
      className="relative py-16 md:py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 molecular-pattern" />
      
      {/* Molecular animation */}
      <div className="absolute inset-0 pointer-events-none">
        <MolecularAnimation />
      </div>
      
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-wide uppercase bg-primary-light text-primary rounded-full">
            Predictive Biology Tool
          </span>
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Molecular Impact{" "}
          <span className="gradient-text">Explorer</span>
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Predicting gene-expression signatures from chemical structure.
          <br />
          <span className="text-base opacity-80">
            Powered by embedding-based molecular representations and machine learning.
          </span>
        </motion.p>
      </div>
    </motion.header>
  );
};
