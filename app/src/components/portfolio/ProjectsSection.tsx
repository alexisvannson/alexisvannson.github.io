import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/portfolioData";

const statusColors: Record<string, string> = {
  live: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30",
  "in-progress":
    "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
  completed: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30",
};

export const ProjectsSection = () => {
  return (
    <section id="projects" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-heading">
          <span className="gradient-text">Projects</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.1 * i }}
          >
            <Card
              className={`glass-card h-full flex flex-col ${
                project.featured
                  ? "ring-2 ring-primary/30"
                  : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="outline"
                    className={statusColors[project.status]}
                  >
                    {project.status === "live"
                      ? "Live Demo"
                      : project.status === "in-progress"
                      ? "In Progress"
                      : "Completed"}
                  </Badge>
                  {project.featured && (
                    <Badge variant="default" className="text-xs">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{project.title}</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col flex-1">
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {project.liveUrl && project.liveUrl.startsWith("http") ? (
                    <Button variant="soft" size="sm" asChild>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                        Blog Post
                      </a>
                    </Button>
                  ) : project.liveUrl ? (
                    <Button variant="soft" size="sm" asChild>
                      <Link to={project.liveUrl}>
                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                        Live Demo
                      </Link>
                    </Button>
                  ) : null}
                  {project.githubUrl && (
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-3.5 w-3.5 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                  {!project.liveUrl && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/projects/${project.slug}`}>
                        Details
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
