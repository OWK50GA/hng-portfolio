// ─── FeaturedDeepDiveSection ─────────────────────────────────────────────────
// Req 10.1: renders problem, whatChanged, all metrics, keyChallenge, solution
// Req 10.2: teal-dim SectionAccent
// Req 10.3: problem and whatChanged each in bg-[var(--fill-teal)] rounded p-4 sub-box

import MetricRow from "@/components/ui/MetricRow";
import { SectionCard } from "@/components/ui/SectionCard";
import type { DeepDive } from "@/data/hng-projects";

interface FeaturedDeepDiveSectionProps {
  deepDive: DeepDive;
}

export function FeaturedDeepDiveSection({
  deepDive,
}: FeaturedDeepDiveSectionProps) {
  return (
    <SectionCard
      accent="teal-dim"
      heading="FEATURED DEEP DIVE"
      subtitle={deepDive.sectionTitle}
    >
      {/* Row 1: problem + whatChanged */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[var(--fill-teal)] rounded p-4">
          <p className="font-mono text-xs text-[var(--accent-teal)] uppercase tracking-widest opacity-70 mb-2">
            The problem
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            {deepDive.problem}
          </p>
        </div>
        <div className="bg-[var(--fill-teal)] rounded p-4">
          <p className="font-mono text-xs text-[var(--accent-teal)] uppercase tracking-widest opacity-70 mb-2">
            What changed
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            {deepDive.whatChanged}
          </p>
        </div>
      </div>

      {/* Row 2: metrics + key challenge & solution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="bg-[var(--fill-teal)] rounded p-4">
          <p className="font-mono text-xs text-[var(--accent-teal)] uppercase tracking-widest opacity-70 mb-2">
            Before / after
          </p>
          <MetricRow metrics={deepDive.metrics} />
        </div>
        <div className="bg-[var(--fill-teal)] rounded p-4">
          <p className="font-mono text-xs text-[var(--accent-teal)] uppercase tracking-widest opacity-70 mb-2">
            Key challenge
          </p>
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            {deepDive.keyChallenge}
          </p>
          <p className="font-mono text-xs text-[var(--accent-teal)] uppercase tracking-widest opacity-70 mb-2">
            Solution
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            {deepDive.solution}
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

export default FeaturedDeepDiveSection;
