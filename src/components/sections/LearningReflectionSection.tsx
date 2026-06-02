// ─── LearningReflectionSection ───────────────────────────────────────────────
// Req 12.1: each entry rendered as a <p> element
// Req 12.2: inline StagePill before paragraph when stageRef is defined
// Req 12.3: amber SectionAccent (only section with amber)

import { SectionCard } from "@/components/ui/SectionCard";
import { StagePill } from "@/components/ui/StagePill";
import type { ReflectionEntry } from "@/data/hng-projects";

interface LearningReflectionSectionProps {
  reflections: ReflectionEntry[];
}

export function LearningReflectionSection({
  reflections,
}: LearningReflectionSectionProps) {
  return (
    <SectionCard
      accent="amber"
      heading="LEARNING REFLECTION"
      subtitle="specific and honest"
    >
      <div className="space-y-4">
        {reflections.map((entry) => (
          <div key={entry.text.slice(0, 50)}>
            {entry.stageRef && (
              <span className="inline-block mb-1.5">
                <StagePill
                  stage={entry.stageRef}
                  label={`Stage ${entry.stageRef}`}
                />
              </span>
            )}
            <p className="text-sm text-[var(--text-secondary)]">{entry.text}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export default LearningReflectionSection;
