// ─── StagePill ───────────────────────────────────────────────────────────────
// Req 6.1: renders "Stage {stage} — {label}" in compact pill style

import type { HngProject } from "@/data/hng-projects";

interface StagePillProps {
  stage: string;
  label: string;
}

export function StagePill({ stage, label }: StagePillProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-teal)]/20 bg-[var(--bg-card)] px-2.5 py-1 font-mono text-xs text-[var(--text-dim)]">
      Stage {stage} {label ? - label: ""}
    </span>
  );
}

// ─── partitionProjects ────────────────────────────────────────────────────────
// Req 4.1: depth === "full" → cards, depth === "pill" → pills
// Req 4.2: cards.length + pills.length === projects.length (no loss)

export function partitionProjects(projects: HngProject[]): {
  cards: HngProject[];
  pills: HngProject[];
} {
  return {
    cards: projects.filter((p) => p.depth === "full"),
    pills: projects.filter((p) => p.depth === "pill"),
  };
}

export default StagePill;
