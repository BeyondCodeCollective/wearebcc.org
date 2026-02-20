"use client";

interface MetricCardProps {
  label: string;
  value: number | string;
  suffix?: string;
  accent?: "default" | "green" | "orange";
}

export default function MetricCard({ label, value, suffix = "", accent = "default" }: MetricCardProps) {
  const valueClass = {
    default: "text-true-black",
    green: "text-cobalt",
    orange: "text-[#D32F2F]",
  }[accent];

  return (
    <div className="bg-white rounded-lg border border-black/5 px-5 py-4">
      <p
        className="text-[11px] uppercase tracking-wider text-black/40 mb-1"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </p>
      <p className={`text-3xl font-heading tracking-tight ${valueClass}`}>
        {value}
        {suffix && <span className="text-lg ml-0.5 text-black/30">{suffix}</span>}
      </p>
    </div>
  );
}
