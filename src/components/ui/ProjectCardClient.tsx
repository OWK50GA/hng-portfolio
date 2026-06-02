"use client";

import type { HngProject } from "@/data/hng-projects";
import { useState } from "react";
import MetricRow from "./MetricRow";
import { ProjectModal } from "./ProjectModal";
import { TechBadge } from "./TechBadge";

interface ProjectCardClientProps {
  project: HngProject;
}

export function ProjectCardClient({ project }: ProjectCardClientProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
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

        <p className="text-sm text-[var(--text-secondary)] line-clamp-3">
          {project.summary}
        </p>

        {project.metrics !== undefined && project.metrics.length > 0 && (
          <MetricRow metrics={project.metrics} />
        )}

        {project.scoreNote && (
          <span className="font-mono text-xs text-[var(--text-dim)]">
            Score: {project.scoreNote}
          </span>
        )}

        {/* See more button */}
        <div className="mt-auto pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="font-mono text-xs text-[var(--accent-teal)] hover:text-[var(--text-primary)] transition-colors"
          >
            See more →
          </button>
        </div>
      </article>

      {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
    </>
  );
}

export default ProjectCardClient;
