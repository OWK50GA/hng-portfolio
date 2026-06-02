// ─── TechBadge ───────────────────────────────────────────────────────────────
// Req 6.2: renders label in monospace badge with correct classes

interface TechBadgeProps {
  label: string;
}

export function TechBadge({ label }: TechBadgeProps) {
  return (
    <span className="rounded border border-[var(--accent-teal)]/20 px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-dim)]">
      {label}
    </span>
  );
}

export default TechBadge;
