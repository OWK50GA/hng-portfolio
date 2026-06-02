"use client";

import { useEffect } from "react";
import type { DesignDoc } from "@/data/hng-projects";

interface DesignDocModalProps {
  doc: DesignDoc;
  onClose: () => void;
}

export function DesignDocModal({ doc, onClose }: DesignDocModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

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
      aria-label={doc.title}
      open
    >
      <div
        role="document"
        className="relative w-[50vw] h-[50vh] overflow-y-auto rounded-xl border border-[var(--accent-amber)]/50 bg-[var(--bg-card)] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 font-mono text-xs text-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Concept badge */}
        <span className="inline-block font-mono text-xs text-[var(--accent-amber)] border border-[var(--accent-amber)]/30 rounded px-2 py-0.5 mb-3">
          {doc.concept}
        </span>

        {/* Title */}
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 pr-6">
          {doc.title}
        </h2>

        {/* Full description */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
          {doc.description}
        </p>

        {/* Link */}
        <a
          href={doc.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent-amber)] hover:text-[var(--text-primary)] transition-colors border border-[var(--accent-amber)]/30 rounded px-3 py-1.5"
        >
          View document →
        </a>
      </div>
    </dialog>
  );
}

export default DesignDocModal;
