import type { Metric } from "@/data/hng-projects";

interface MetricRowProps {
  metrics: Metric[];
}

export default function MetricRow({ metrics }: MetricRowProps) {
  return (
    <p className="font-mono text-[0.8rem] text-[var(--text-primary)]">
      {metrics.map((m, i) => (
        <span key={m.label}>
          {i > 0 && <span className="mx-1.5 text-[var(--text-dim)]">·</span>}
          {m.label}: {m.before} → {m.after}
        </span>
      ))}
    </p>
  );
}
