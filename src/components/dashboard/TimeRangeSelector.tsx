"use client";

const RANGES = [
  { value: "today", label: "Today" },
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "all", label: "All Time" },
] as const;

type Range = (typeof RANGES)[number]["value"];

export default function TimeRangeSelector({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (range: Range) => void;
}) {
  return (
    <div className="flex gap-1 bg-white/5 p-1">
      {RANGES.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(range.value)}
          className={`px-3 py-1.5 text-xs transition-colors ${
            selected === range.value
              ? "bg-cobalt text-off-white"
              : "text-[#646464] hover:text-off-white"
          }`}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
