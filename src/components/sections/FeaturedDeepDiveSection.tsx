"use client";

// ─── FeaturedDeepDiveSection ──────────────────────────────────────────────────

import MetricRow from "@/components/ui/MetricRow";
import { SectionCard } from "@/components/ui/SectionCard";
import { DeepDiveModal, type DeepDivePanel } from "@/components/ui/DeepDiveModal";
import type { DeepDive } from "@/data/hng-projects";
import { useState } from "react";

interface FeaturedDeepDiveSectionProps {
  deepDive: DeepDive;
}

// Reusable sub-box with a "See more →" trigger
function DeepDiveBox({
  label,
  onSeeMore,
  children,
}: {
  label: string;
  onSeeMore: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--fill-teal)] rounded p-4 flex flex-col gap-2">
      <p className="font-mono text-xs text-[var(--accent-teal)] uppercase tracking-widest opacity-70">
        {label}
      </p>
      <div className="flex-1">{children}</div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSeeMore}
          className="font-mono text-xs text-[var(--accent-teal)] hover:text-[var(--text-primary)] transition-colors"
        >
          See more →
        </button>
      </div>
    </div>
  );
}

export function FeaturedDeepDiveSection({
  deepDive,
}: FeaturedDeepDiveSectionProps) {
  const [activePanel, setActivePanel] = useState<DeepDivePanel | null>(null);

  return (
    <>
      <SectionCard
        accent="teal-dim"
        heading="FEATURED PROJECT DEEP DIVE"
        headingSize="lg"
        subtitle={deepDive.sectionTitle}
      >
        {/* Row 1: problem + whatChanged */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DeepDiveBox
            label="The problem"
            onSeeMore={() => setActivePanel("problem")}
          >
            <p className="text-sm text-[var(--text-secondary)] line-clamp-4">
              {deepDive.problem}
            </p>
          </DeepDiveBox>

          <DeepDiveBox
            label="What changed"
            onSeeMore={() => setActivePanel("whatChanged")}
          >
            <p className="text-sm text-[var(--text-secondary)] line-clamp-4">
              {deepDive.whatChanged}
            </p>
          </DeepDiveBox>
        </div>

        {/* Row 2: metrics + key challenge & solution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <DeepDiveBox
            label="Before / after"
            onSeeMore={() => setActivePanel("metrics")}
          >
            <MetricRow metrics={deepDive.metrics} />
          </DeepDiveBox>

          <DeepDiveBox
            label="Key challenge & solution"
            onSeeMore={() => setActivePanel("challenge")}
          >
            <p className="text-sm text-[var(--text-secondary)] line-clamp-3">
              {deepDive.keyChallenge}
            </p>
          </DeepDiveBox>
        </div>
      </SectionCard>

      {activePanel && (
        <DeepDiveModal
          deepDive={deepDive}
          panel={activePanel}
          onClose={() => setActivePanel(null)}
        />
      )}
    </>
  );
}

export default FeaturedDeepDiveSection;
