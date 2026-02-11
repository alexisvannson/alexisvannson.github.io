import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/portfolioData";

const statusLabels: Record<string, string> = {
  live: "Live",
  "in-progress": "In Progress",
  completed: "Completed",
};

const statusColors: Record<string, string> = {
  live: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30",
  "in-progress":
    "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
  completed: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30",
};

const ProjectCaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-semibold mb-4">Project not found</h1>
        <p className="text-muted-foreground mb-6">
          The project you're looking for doesn't exist.
        </p>
        <Button variant="soft" asChild>
          <Link to="/#projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      {/* Back link */}
      <Link
        to="/#projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground">
            {project.title}
          </h1>
          <Badge variant="outline" className={statusColors[project.status]}>
            {statusLabels[project.status]}
          </Badge>
        </div>

        <p className="text-muted-foreground mb-6">{project.description}</p>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mb-10">
          {project.liveUrl && (
            <Button variant="predict" asChild>
              <Link to={project.liveUrl}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="soft" asChild>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                Source Code
              </a>
            </Button>
          )}
        </div>

        {/* Long description */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-foreground">
            About this project
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        {/* Tech stack */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-foreground">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCaseStudy;
