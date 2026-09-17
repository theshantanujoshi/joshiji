import { ScrambleText } from "@/components/ScrambleText";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "A selection of recent open-source work and personal projects by Shantanu Joshi.",
  alternates: {
    canonical: "/projects",
  },
};

export default function Projects() {
  const projects = [
    {
      title: "Quanticore",
      description: "A production-grade machine learning pipeline for quantitative credit risk, featuring dynamic FICO bucketing and incremental XGBoost learning.",
      tech: ["Machine Learning", "Python", "XGBoost", "Risk Analytics"],
      link: "https://github.com/theshantanujoshi/quanticore",
      github: "https://github.com/theshantanujoshi/quanticore"
    },
    {
      title: "Aether",
      description: "A privacy-first personal activity intelligence system that turns fragmented local digital exhaust into a searchable, narrative daily recap using local-first collection and AI synthesis.",
      tech: ["FastAPI", "React", "Vector DB", "RocketRide"],
      link: "https://github.com/theshantanujoshi/aether",
      github: "https://github.com/theshantanujoshi/aether"
    },

    {
      title: "Codelore",
      description: "A visual tool mapping codebase architectures using interactive 3D graphs of code dependencies and function calls.",
      tech: ["3D Graphs", "Architecture", "Visualization"],
      link: "https://github.com/theshantanujoshi/codelore",
      github: "https://github.com/theshantanujoshi/codelore"
    },
    {
      title: "Holocron",
      description: "A 3D Star Wars database featuring interactive Aurebesh translation ciphers.",
      tech: ["Next.js", "React Three Fiber", "3D"],
      link: "https://github.com/theshantanujoshi/holocron",
      github: "https://github.com/theshantanujoshi/holocron"
    }
  ];

  return (
    <div className="readme-container">
      <h1>Projects</h1>
      <p className="mb-8">A selection of my recent open-source work and personal projects.</p>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, i) => (
          <div key={i} className="readme-card group hover:border-[var(--color-accent)] transition-colors">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="cursor-target inline-flex items-center gap-1 no-underline mb-2 group/link">
              <h3 className="text-xl font-bold font-mono text-[var(--color-foreground)] m-0 border-0 pb-0 group-hover/link:text-[var(--color-accent)] transition-colors">
                <ScrambleText text={project.title} />
              </h3>
              <span className="text-[var(--color-muted-foreground)] group-hover/link:text-[var(--color-accent)] transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 ml-1">↗</span>
            </a>
            <p className="mb-4 text-[var(--color-muted-foreground)]">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-xs px-2 py-1 bg-[var(--color-muted)] rounded text-[var(--color-muted-foreground)] font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
