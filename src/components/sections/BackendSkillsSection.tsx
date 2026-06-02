// ─── BackendSkillsSection ────────────────────────────────────────────────────
// Req 11.1: renders each group's category, stageRefs as StagePill, skills as TechBadge
// Req 11.2: neutral SectionAccent

import { SectionCard } from "@/components/ui/SectionCard";
import { StagePill } from "@/components/ui/StagePill";
import { TechBadge } from "@/components/ui/TechBadge";
import type { SkillGroup } from "@/data/hng-projects";

interface BackendSkillsSectionProps {
  skills: SkillGroup[];
}

export function BackendSkillsSection({ skills }: BackendSkillsSectionProps) {
  return (
    <SectionCard
      accent="neutral"
      heading="BACKEND SKILLS"
      subtitle="each backed by a stage"
    >
      <div className="space-y-4">
        {skills.map((group) => (
          <div key={group.category}>
            {/* Category name + stage ref pills on same line */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wide">
                {group.category}
              </span>
              {group.stageRefs.map((ref) => (
                <StagePill key={ref} stage={ref} label="" />
              ))}
            </div>
            {/* Skill badges */}
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <TechBadge key={skill} label={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export default BackendSkillsSection;
