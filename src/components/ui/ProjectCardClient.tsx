"use client";

import { useState } from "react";
import type { HngProject } from "@/data/hng-projects";
import { GitHubIcon } from "./icons/GitHubIcon";
import MetricRow from "./MetricRow";
import { ProjectModal } from "./ProjectModal";
import { TechBadge } from "./TechBadge";

// Simple external link icon (no extra dependency)
function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" />
    </svg>
  );
}

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

        {/* Footer: links left, See more right */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          {/* GitHub + optional live link */}
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-dim)] hover:text-[var(--accent-teal)] transition-colors"
              aria-label={`${project.title} GitHub repository`}
            >
              <GitHubIcon />
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--text-dim)] hover:text-[var(--accent-teal)] transition-colors"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLinkIcon />
                live
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="font-mono text-xs text-[var(--accent-teal)] hover:text-[var(--text-primary)] transition-colors"
          >
            See more →
          </button>
        </div>
      </article>

      {open && (
        <ProjectModal project={project} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

export default ProjectCardClient;
