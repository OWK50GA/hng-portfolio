"use client";

import { useEffect } from "react";
import type { DeepDive } from "@/data/hng-projects";

// Panels now match the fields that exist on DeepDive
export type DeepDivePanel = "background" | "problem" | "whatChanged";

interface DeepDiveModalProps {
  deepDive: DeepDive;
  panel: DeepDivePanel;
  onClose: () => void;
}

const PANEL_TITLES: Record<DeepDivePanel, string> = {
  background: "Background",
  problem: "The Problem",
  whatChanged: "What Changed",
};

export function DeepDiveModal({
  deepDive,
  panel,
  onClose,
}: DeepDiveModalProps) {
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
      aria-label={PANEL_TITLES[panel]}
      open
    >
      <div
        role="document"
        className="relative w-[50vw] h-[50vh] overflow-y-auto rounded-xl border border-[var(--accent-teal)]/50 bg-[var(--bg-card)] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 font-mono text-xs text-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        <span className="font-mono text-xs text-[var(--accent-teal)] mb-3 block">
          Stage {deepDive.stageRef} — {deepDive.sectionTitle}
        </span>

        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
          {PANEL_TITLES[panel]}
        </h2>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
          {deepDive[panel]}
        </p>
      </div>
    </dialog>
  );
}

export default DeepDiveModal;
