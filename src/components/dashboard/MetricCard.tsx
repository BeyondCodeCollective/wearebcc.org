"use client";

interface MetricCardProps {
  label: string;
  value: number | string;
  suffix?: string;
  accent?: "cobalt" | "green" | "orange";
}

export default function MetricCard({ label, value, suffix = "", accent = "cobalt" }: MetricCardProps) {
  const accentClass = {
    cobalt: "text-cobalt",
    green: "text-electric-green",
    orange: "text-[#FF4C00]",
  }[accent];

  return (
    <div className="bg-[#2F2F2F] border border-white/5 p-5">
      <p
        className="text-xs uppercase tracking-widest text-[#646464] mb-2"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </p>
      <p className={`text-4xl md:text-5xl font-heading tracking-tight ${accentClass}`}>
        {value}
        {suffix && <span className="text-xl ml-1">{suffix}</span>}
      </p>
    </div>
  );
}
