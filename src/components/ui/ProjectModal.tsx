"use client";

import type { HngProject } from "@/data/hng-projects";
import { useEffect } from "react";
import MetricRow from "./MetricRow";
import { TechBadge } from "./TechBadge";

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
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      {/* Modal panel — 50vw × 50vh, centred */}
      <div
        className="relative w-[50vw] h-[50vh] overflow-y-auto rounded-xl border border-[var(--accent-teal)]/50 bg-[var(--bg-card)] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
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
          <div className="mt-auto pt-4 border-t border-[var(--border-neutral)]">
            <span className="font-mono text-xs text-[var(--text-dim)]">
              Score: {project.scoreNote}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectModal;
