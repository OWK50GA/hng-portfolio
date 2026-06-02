import type React from "react";
import type { SectionAccent } from "@/data/hng-projects";

// ─── Accent class resolver ────────────────────────────────────────────────────

export function accentClasses(accent: SectionAccent): {
  border: string;
  labelColor: string;
} {
  const map: Record<SectionAccent, { border: string; labelColor: string }> = {
    teal: {
      border: "border-[var(--accent-teal)]",
      labelColor: "text-[var(--accent-teal)]",
    },
    "teal-dim": {
      border: "border-[var(--accent-teal)]/60",
      labelColor: "text-[var(--accent-teal)]",
    },
    amber: {
      border: "border-[var(--accent-amber)]",
      labelColor: "text-[var(--accent-amber)]",
    },
    neutral: {
      border: "border-[var(--border-neutral)]",
      labelColor: "text-[var(--text-dim)]",
    },
  };
  return map[accent];
}

// ─── Component ───────────────────────────────────────────────────────────────

interface SectionCardProps {
  accent: SectionAccent;
  heading: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({
  accent,
  heading,
  subtitle,
  children,
  className,
}: SectionCardProps) {
  const { border, labelColor } = accentClasses(accent);

  return (
    <div
      className={[
        "rounded-xl border bg-[var(--bg-card)] p-5 sm:p-6",
        border,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Label bar */}
      <div className="mb-4 flex items-center gap-2">
        <span
          className={`font-mono uppercase tracking-widest text-xs opacity-70 ${labelColor}`}
        >
          {heading}
        </span>
        {subtitle && (
          <>
            <span className="font-mono text-xs opacity-40 text-[var(--text-dim)]">
              ·
            </span>
            <span className="font-mono text-xs opacity-70 text-[var(--text-dim)]">
              {subtitle}
            </span>
          </>
        )}
      </div>

      {/* Card body */}
      {children}
    </div>
  );
}

export default SectionCard;
