"use client";

import type { DeepDive } from "@/data/hng-projects";
import { useEffect } from "react";

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

export function DeepDiveModal({ deepDive, panel, onClose }: DeepDiveModalProps) {
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={PANEL_TITLES[panel]}
    >
      <div
        className="relative w-[50vw] h-[50vh] overflow-y-auto rounded-xl border border-[var(--accent-teal)]/50 bg-[var(--bg-card)] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
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
    </div>
  );
}

export default DeepDiveModal;
