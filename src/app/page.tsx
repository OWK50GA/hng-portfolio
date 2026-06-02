// ─── Portfolio Page ───────────────────────────────────────────────────────────

import { BackendSkillsSection } from "@/components/sections/BackendSkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { DesignDocsSection } from "@/components/sections/DesignDocsSection";
import { FeaturedDeepDiveSection } from "@/components/sections/FeaturedDeepDiveSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HngProjectsSection } from "@/components/sections/HngProjectsSection";
import { LearningReflectionSection } from "@/components/sections/LearningReflectionSection";
import { SectionNav } from "@/components/SectionNav";
import { portfolioData } from "@/data/hng-projects";

export default function Page() {
  const { hero, projects, deepDive, skills, designDocs, reflections, contact } =
    portfolioData;

  return (
    <main className="min-h-screen bg-[var(--bg-base)] py-8 sm:py-12 lg:py-16">
      <div className="w-full space-y-6 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">

        {/* Hero — no section id needed, it's the top */}
        <HeroSection hero={hero} />

        {/* Section navigation bar */}
        <SectionNav />

        <section id="projects">
          <HngProjectsSection projects={projects} />
        </section>

        <section id="deep-dive">
          <FeaturedDeepDiveSection deepDive={deepDive} />
        </section>

        <section id="design-docs">
          <DesignDocsSection docs={designDocs} />
        </section>

        <section id="skills">
          <BackendSkillsSection skills={skills} />
        </section>

        <section id="reflections">
          <LearningReflectionSection reflections={reflections} />
        </section>

        <section id="contact">
          <ContactSection social={contact} />
        </section>

      </div>
    </main>
  );
}
