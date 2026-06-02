"use client";

import { useEffect } from "react";
import type { HngProject } from "@/data/hng-projects";
import { GitHubIcon } from "./icons/GitHubIcon";
import MetricRow from "./MetricRow";
import { TechBadge } from "./TechBadge";

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

interface ProjectModalProps {
  project: HngProject;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent background scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <dialog
      className="fixed inset-0 z-50 m-0 flex h-full w-full max-w-full items-center justify-center bg-black/60 backdrop-blur-sm p-0 border-0"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      aria-label={`${project.title} details`}
      open
    >
      <div
        role="document"
        className="relative w-[50vw] h-[50vh] overflow-y-auto rounded-xl border border-[var(--accent-teal)]/50 bg-[var(--bg-card)] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 font-mono text-xs text-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Stage + tech badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="font-mono text-xs text-[var(--accent-teal)]">
            Stage {project.stage}
          </span>
          {project.tech.map((t) => (
            <TechBadge key={t} label={t} />
          ))}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          {project.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-4">
            <p className="font-mono text-xs text-[var(--accent-teal)] uppercase tracking-widest opacity-70 mb-2">
              Performance
            </p>
            <div className="bg-[var(--fill-teal)] rounded p-3">
              <MetricRow metrics={project.metrics} />
            </div>
          </div>
        )}

        {/* Score note */}
        {project.scoreNote && (
          <div className="pt-4 border-t border-[var(--border-neutral)]">
            <span className="font-mono text-xs text-[var(--text-dim)]">
              Score: {project.scoreNote}
            </span>
          </div>
        )}

        {/* Links */}
        <div className="mt-4 pt-4 border-t border-[var(--border-neutral)] flex items-center gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-dim)] hover:text-[var(--accent-teal)] transition-colors"
          >
            <GitHubIcon />
            GitHub
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-dim)] hover:text-[var(--accent-teal)] transition-colors"
            >
              <ExternalLinkIcon />
              Live demo
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
}

export default ProjectModal;
