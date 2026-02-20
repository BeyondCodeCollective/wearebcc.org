"use client";

interface PersonalityData {
  key: string;
  count: number;
  percentage: number;
}

const PERSONALITY_LABELS: Record<string, string> = {
  fixer: "The Fixer",
  architect: "The Architect",
  connector: "The Connector",
  creator: "The Creator",
  builder: "The Builder",
  maker: "The Maker",
  strategist: "The Strategist",
  guardian: "The Guardian",
  analyst: "The Detective",
  healer: "The Healer",
  educator: "The Guide",
  advocate: "The Advocate",
};

export default function PersonalityBreakdown({ data }: { data: PersonalityData[] }) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="space-y-2.5">
      {data.map((item, i) => (
        <div key={item.key} className="flex items-center gap-3">
          <p
            className="text-xs text-[#646464] w-28 shrink-0 text-right"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {PERSONALITY_LABELS[item.key] || item.key}
          </p>
          <div className="flex-1 h-6 bg-white/5 relative overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${i === 0 ? "bg-electric-green" : "bg-cobalt"}`}
              style={{ width: `${(item.count / maxCount) * 100}%` }}
            />
            <span
              className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs ${i === 0 ? "text-true-black" : "text-off-white/70"}`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {item.count} ({item.percentage}%)
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
