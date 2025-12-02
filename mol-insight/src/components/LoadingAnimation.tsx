import { motion } from "framer-motion";

export const LoadingAnimation = () => {
  const nodes = [
    { x: 100, y: 80, delay: 0 },
    { x: 180, y: 40, delay: 0.1 },
    { x: 260, y: 70, delay: 0.2 },
    { x: 200, y: 120, delay: 0.15 },
    { x: 140, y: 130, delay: 0.25 },
    { x: 240, y: 140, delay: 0.3 },
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 0, to: 3 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 },
  ];

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-80 h-48 mb-8">
        <svg
          className="w-full h-full"
          viewBox="0 0 320 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Connection lines */}
          {connections.map((conn, i) => (
            <motion.line
              key={i}
              x1={nodes[conn.from].x}
              y1={nodes[conn.from].y}
              x2={nodes[conn.to].x}
              y2={nodes[conn.to].y}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1],
                opacity: [0, 0.6, 0.3],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />
          ))}

          {/* Molecular nodes */}
          {nodes.map((node, i) => (
            <motion.g key={i}>
              {/* Glow effect */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="12"
                fill="hsl(var(--primary-glow))"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: node.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Main node */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="6"
                fill="hsl(var(--primary))"
                initial={{ scale: 0 }}
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 1.5,
                  delay: node.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.g>
          ))}

          {/* Gene expression waves */}
          <motion.path
            d="M40 160 Q 80 140, 120 160 T 200 160 T 280 160"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-medium text-foreground mb-2">
          Analyzing Molecular Impact
        </h3>
        <p className="text-sm text-muted-foreground">
          Computing gene expression predictions...
        </p>
      </motion.div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
