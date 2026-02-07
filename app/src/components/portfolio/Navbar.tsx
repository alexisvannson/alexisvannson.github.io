import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "@/hooks/use-active-section";
import { personalInfo } from "@/data/portfolioData";

const NAV_LINKS = [
  { label: "About", href: "about" },
  { label: "Experience", href: "experience" },
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Contact", href: "contact" },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection();
  const isHome = location.pathname === "/";

  const handleNavClick = (sectionId: string) => {
    if (isHome) {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${sectionId}`);
    }
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          {personalInfo.firstName}{" "}
          <span className="gradient-text">{personalInfo.lastName}</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`px-3 py-2 text-sm rounded-md transition-colors animated-underline ${
                activeSection === link.href && isHome
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}

          <ThemeToggle />

          <Button variant="soft" size="sm" asChild className="ml-2">
            <a href={personalInfo.resumeUrl} download>
              <Download className="h-4 w-4 mr-1" />
              Resume
            </a>
          </Button>
        </div>

        {/* Mobile menu */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex flex-col gap-2 mt-8">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                      activeSection === link.href && isHome
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <Button variant="soft" size="sm" asChild className="mt-4 mx-4">
                  <a href={personalInfo.resumeUrl} download>
                    <Download className="h-4 w-4 mr-1" />
                    Resume
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
