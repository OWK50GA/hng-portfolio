// ─── ProjectCard ─────────────────────────────────────────────────────────────
// Req 5.1: renders MetricRow if and only if metrics is defined and non-empty
// Req 5.2: does NOT render MetricRow when metrics is undefined or empty
// Req 5.3: renders stage, title, description, all tech labels as TechBadge
// Req 5.4: renders scoreNote in Geist Mono beneath description when defined

import type { HngProject } from "@/data/hng-projects";
import MetricRow from "./MetricRow";
import { TechBadge } from "./TechBadge";

interface ProjectCardProps {
  project: HngProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-lg border border-[var(--accent-teal)]/30 bg-[var(--bg-card-tint)] p-4 flex flex-col gap-2">
      <header>
        <span className="font-mono text-xs text-[var(--text-dim)]">
          Stage {project.stage}
        </span>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tech.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
      </header>

      <h3 className="text-sm font-semibold text-[var(--text-primary)]">
        {project.title}
      </h3>

      <p className="text-sm text-[var(--text-secondary)]">
        {project.description}
      </p>

      {project.metrics !== undefined && project.metrics.length > 0 && (
        <MetricRow metrics={project.metrics} />
      )}

      {project.scoreNote && (
        <span className="font-mono text-xs text-[var(--text-dim)]">
          Score: {project.scoreNote}
        </span>
      )}
    </article>
  );
}

export default ProjectCard;
