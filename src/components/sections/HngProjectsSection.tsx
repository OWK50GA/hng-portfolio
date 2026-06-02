// ─── HngProjectsSection ──────────────────────────────────────────────────────
// Req 9.1: full-depth in responsive grid, pill-depth in flex-wrap pill row
// Req 9.2: teal SectionAccent
// Req 9.3: 6 ProjectCards + 5 StagePills from static data

import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { partitionProjects, StagePill } from "@/components/ui/StagePill";
import type { HngProject } from "@/data/hng-projects";

interface HngProjectsSectionProps {
  projects: HngProject[];
}

export function HngProjectsSection({ projects }: HngProjectsSectionProps) {
  const { cards, pills } = partitionProjects(projects);

  return (
    <SectionCard
      accent="teal"
      heading="HNG PROJECTS"
      subtitle="one card per stage, sorted by stage"
    >
      {/* Full-depth project cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((project) => (
          <ProjectCard key={project.stage} project={project} />
        ))}
      </div>

      {/* Compact pill stages */}
      {pills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {pills.map((project) => (
            <StagePill
              key={project.stage}
              stage={project.stage}
              label={project.title}
            />
          ))}
        </div>
      )}
    </SectionCard>
  );
}

export default HngProjectsSection;
