import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { personalInfo } from "@/data/portfolioData";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-muted/30">
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-semibold text-foreground">
            {personalInfo.firstName} {personalInfo.lastName}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            AI/ML &amp; Biomedical Engineering
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors animated-underline"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors animated-underline"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-muted-foreground hover:text-foreground transition-colors animated-underline"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {personalInfo.firstName}{" "}
        {personalInfo.lastName}. All rights reserved.
      </div>
    </div>
  </footer>
);

export const PortfolioLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
