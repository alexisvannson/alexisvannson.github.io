import { motion } from "framer-motion";
import { Github, BookOpen, FileText, Mail, ExternalLink } from "lucide-react";

export const Footer = () => {
  const links = [
    {
      label: "Documentation",
      href: "#",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      label: "Methods",
      href: "#",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      label: "Model Card",
      href: "#",
      icon: <ExternalLink className="w-4 h-4" />,
    },
    {
      label: "GitHub",
      href: "#",
      icon: <Github className="w-4 h-4" />,
    },
    {
      label: "Contact",
      href: "#",
      icon: <Mail className="w-4 h-4" />,
    },
  ];

  return (
    <motion.footer
      className="mt-24 border-t bg-muted/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Molecular Impact Explorer
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Predicting gene-expression signatures from chemical structure using 
              embedding-based models and machine learning.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200 animated-underline"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            Built with care for the scientific community.
          </p>
          <div className="flex items-center gap-4">
            <span>Inspired by LINCS L1000</span>
            <span>•</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
