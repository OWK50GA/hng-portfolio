"use client";

// ─── DesignDocsSection ───────────────────────────────────────────────────────

import { DesignDocModal } from "@/components/ui/DesignDocModal";
import { SectionCard } from "@/components/ui/SectionCard";
import type { DesignDoc } from "@/data/hng-projects";
import { useState } from "react";

interface DesignDocsSectionProps {
  docs: DesignDoc[];
}

function DesignDocCard({
  doc,
  onSeeMore,
}: {
  doc: DesignDoc;
  onSeeMore: () => void;
}) {
  return (
    <article className="rounded-lg border border-[var(--accent-amber)]/30 bg-[var(--bg-card-tint)] p-4 flex flex-col gap-2">
      {/* Concept badge */}
      <span className="self-start font-mono text-[10px] text-[var(--accent-amber)] border border-[var(--accent-amber)]/30 rounded px-1.5 py-0.5">
        {doc.concept}
      </span>

      {/* Title */}
      <h3 className="text-sm font-semibold text-[var(--text-primary)]">
        {doc.title}
      </h3>

      {/* Description — truncated */}
      <p className="text-sm text-[var(--text-secondary)] line-clamp-3 flex-1">
        {doc.description}
      </p>

      {/* Footer row: See more + View doc link */}
      <div className="mt-auto pt-2 flex items-center justify-between">
        <a
          href={doc.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-[var(--text-dim)] hover:text-[var(--accent-amber)] transition-colors"
        >
          View doc ↗
        </a>
        <button
          type="button"
          onClick={onSeeMore}
          className="font-mono text-xs text-[var(--accent-amber)] hover:text-[var(--text-primary)] transition-colors"
        >
          See more →
        </button>
      </div>
    </article>
  );
}

export function DesignDocsSection({ docs }: DesignDocsSectionProps) {
  const [activeDoc, setActiveDoc] = useState<DesignDoc | null>(null);

  return (
    <>
      <SectionCard
        accent="amber"
        heading="DESIGN DOCS"
        headingSize="lg"
        subtitle="RFCs and system design documents"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {docs.map((doc) => (
            <DesignDocCard
              key={doc.title}
              doc={doc}
              onSeeMore={() => setActiveDoc(doc)}
            />
          ))}
        </div>
      </SectionCard>

      {activeDoc && (
        <DesignDocModal doc={activeDoc} onClose={() => setActiveDoc(null)} />
      )}
    </>
  );
}

export default DesignDocsSection;
