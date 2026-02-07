import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { personalInfo } from "@/data/portfolioData";

export const ContactSection = () => {
  return (
    <section id="contact" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-heading">
          Get in <span className="gradient-text">Touch</span>
        </h2>
      </motion.div>

      <motion.div
        className="max-w-lg mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="glass-card text-center">
          <CardContent className="p-8">
            <p className="text-muted-foreground mb-6 leading-relaxed">
              I'm always open to discussing new research opportunities,
              collaborations, or interesting projects in AI and biomedical
              engineering. Feel free to reach out!
            </p>

            <Button variant="predict" size="lg" asChild className="mb-6">
              <a href={`mailto:${personalInfo.email}`}>
                <Mail className="h-4 w-4 mr-2" />
                Send an Email
              </a>
            </Button>

            <div className="flex items-center justify-center gap-4">
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
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};
