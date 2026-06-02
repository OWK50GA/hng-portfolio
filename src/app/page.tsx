// ─── Portfolio Page ──────────────────────────────────────────────────────────
// Req 1.1: render all six sections in vertical order
// Req 1.4: max-w-3xl centered with responsive padding
// Req 14.1: no "use client" directive — fully static

import { BackendSkillsSection } from "@/components/sections/BackendSkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { DesignDocsSection } from "@/components/sections/DesignDocsSection";
import { FeaturedDeepDiveSection } from "@/components/sections/FeaturedDeepDiveSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HngProjectsSection } from "@/components/sections/HngProjectsSection";
import { LearningReflectionSection } from "@/components/sections/LearningReflectionSection";
import { portfolioData } from "@/data/hng-projects";

export default function Page() {
  const { hero, projects, deepDive, skills, designDocs, reflections, contact } =
    portfolioData;

  return (
    <main className="min-h-screen bg-[var(--bg-base)] py-8 sm:py-12 lg:py-16">
      <div className="w-full space-y-6 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <HeroSection hero={hero} />
        <HngProjectsSection projects={projects} />
        <FeaturedDeepDiveSection deepDive={deepDive} />
        <DesignDocsSection docs={designDocs} />
        <BackendSkillsSection skills={skills} />
        <LearningReflectionSection reflections={reflections} />
        <ContactSection social={contact} />
      </div>
    </main>
  );
}
