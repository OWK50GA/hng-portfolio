// ─── FeaturedDeepDiveSection ──────────────────────────────────────────────────

import { SectionCard } from "@/components/ui/SectionCard";
import type { DeepDive } from "@/data/hng-projects";

interface FeaturedDeepDiveSectionProps {
  deepDive: DeepDive;
}

function Block({ label, content }: { label: string; content: string }) {
  return (
    <div className="space-y-2">
      <p className="font-mono text-xs text-[var(--accent-teal)] uppercase tracking-widest opacity-70">
        {label}
      </p>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
        {content}
      </p>
    </div>
  );
}

export function FeaturedDeepDiveSection({ deepDive }: FeaturedDeepDiveSectionProps) {
  return (
    <SectionCard
      accent="teal-dim"
      heading="FEATURED PROJECT DEEP DIVE"
      headingSize="lg"
      subtitle={deepDive.sectionTitle}
    >
      <div className="space-y-6 divide-y divide-[var(--border-neutral)]">
        <Block label="Background" content={deepDive.background} />
        <div className="pt-6">
          <Block label="The problem" content={deepDive.problem} />
        </div>
        <div className="pt-6">
          <Block label="What changed" content={deepDive.whatChanged} />
        </div>
      </div>
    </SectionCard>
  );
}

export default FeaturedDeepDiveSection;
