"use client";

import type { DeepDive } from "@/data/hng-projects";
import { useEffect } from "react";
import MetricRow from "./MetricRow";

export type DeepDivePanel = "problem" | "whatChanged" | "metrics" | "challenge";

interface DeepDiveModalProps {
  deepDive: DeepDive;
  panel: DeepDivePanel;
  onClose: () => void;
}

const PANEL_TITLES: Record<DeepDivePanel, string> = {
  problem: "The Problem",
  whatChanged: "What Changed",
  metrics: "Before / After",
  challenge: "Key Challenge & Solution",
};

export function DeepDiveModal({ deepDive, panel, onClose }: DeepDiveModalProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock background scroll
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
      {/* Modal panel — 50vw × 50vh */}
      <div
        className="relative w-[50vw] h-[50vh] overflow-y-auto rounded-xl border border-[var(--accent-teal)]/50 bg-[var(--bg-card)] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
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

        {/* Stage ref pill */}
        <span className="font-mono text-xs text-[var(--accent-teal)] mb-3 block">
          Stage {deepDive.stageRef} — {deepDive.sectionTitle}
        </span>

        {/* Panel title */}
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
          {PANEL_TITLES[panel]}
        </h2>

        {/* Panel content */}
        {panel === "problem" && (
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {deepDive.problem}
          </p>
        )}

        {panel === "whatChanged" && (
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {deepDive.whatChanged}
          </p>
        )}

        {panel === "metrics" && (
          <div className="space-y-4">
            <div className="bg-[var(--fill-teal)] rounded p-4">
              <MetricRow metrics={deepDive.metrics} />
            </div>
            <p className="font-mono text-xs text-[var(--text-dim)]">
              These numbers were measured against a real PostgreSQL dataset during Stage {deepDive.stageRef}.
            </p>
          </div>
        )}

        {panel === "challenge" && (
          <div className="space-y-5">
            <div>
              <p className="font-mono text-xs text-[var(--accent-teal)] uppercase tracking-widest opacity-70 mb-2">
                The challenge
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {deepDive.keyChallenge}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--accent-teal)] uppercase tracking-widest opacity-70 mb-2">
                The solution
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {deepDive.solution}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeepDiveModal;
