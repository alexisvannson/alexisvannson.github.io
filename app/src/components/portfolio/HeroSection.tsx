import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/portfolioData";

const MolecularBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-30"
    viewBox="0 0 400 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
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
        transition={{ duration: 0.4, delay: node.delay, ease: "easeOut" }}
      />
    ))}
    <motion.circle
      cx="200"
      cy="100"
      r="8"
      fill="hsl(var(--primary))"
      initial={{ scale: 0 }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      opacity={0.6}
    />
  </svg>
);

export const HeroSection = () => {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 molecular-pattern" />
      <div className="absolute inset-0 pointer-events-none">
        <MolecularBackground />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-wide uppercase bg-primary-light text-primary rounded-full">
            AI/ML &amp; Biomedical Engineering
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {personalInfo.firstName}{" "}
          <span className="gradient-text">{personalInfo.lastName}</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button variant="predict" size="lg" onClick={scrollToProjects}>
            <ArrowDown className="h-4 w-4 mr-2" />
            View Projects
          </Button>
          <Button variant="soft" size="lg" asChild>
            <a href={personalInfo.resumeUrl} download>
              <Download className="h-4 w-4 mr-2" />
              Download CV
            </a>
          </Button>
        </motion.div>

        {/* Social icons */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors animated-underline"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors animated-underline"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors animated-underline"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
