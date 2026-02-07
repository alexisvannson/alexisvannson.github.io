import { motion } from "framer-motion";
import { GraduationCap, Microscope, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { aboutData, personalInfo } from "@/data/portfolioData";

const highlights = [
  {
    icon: GraduationCap,
    label: "Education",
    value: aboutData.education,
  },
  {
    icon: Microscope,
    label: "Research Interests",
    value: aboutData.researchInterests,
  },
  {
    icon: Target,
    label: "Current Focus",
    value: aboutData.currentFocus,
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-heading">
          About <span className="gradient-text">Me</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-3xl font-semibold text-primary float">
              {personalInfo.firstName[0]}
              {personalInfo.lastName[0]}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {personalInfo.firstName} {personalInfo.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">
                AI/ML &amp; Biomedical Engineering
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">{aboutData.bio}</p>
        </motion.div>

        {/* Highlight cards */}
        <div className="flex flex-col gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.15 * (i + 1) }}
            >
              <Card className="glass-card">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
