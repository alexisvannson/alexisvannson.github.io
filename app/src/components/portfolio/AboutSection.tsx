import { motion } from "framer-motion";
import { aboutData, personalInfo } from "@/data/portfolioData";

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

      <div className="max-w-3xl mx-auto">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center gap-5 mb-6">
            <img
              src="/alex2.jpeg"
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary/30 shrink-0"
            />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {personalInfo.firstName} {personalInfo.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">
                AI, Data &amp; Management Sciences — CentraleSupélec x Essec
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {aboutData.bio}
          </p>
        </motion.div>

        {/* Highlights grid */}
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
          {aboutData.highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.35, delay: 0.1 * (i + 1) }}
              className="flex flex-col gap-0.5"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                {item.label}
              </span>
              <span className="text-sm text-muted-foreground">
                {item.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
