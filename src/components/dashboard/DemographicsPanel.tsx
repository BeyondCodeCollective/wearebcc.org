"use client";

interface DemoItem {
  group?: string;
  locale?: string;
  count: number;
  percentage: number;
}

function BarRow({ label, count, percentage, color }: { label: string; count: number; percentage: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <p
        className="text-xs text-[#646464] w-20 shrink-0 text-right uppercase"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </p>
      <div className="flex-1 h-7 bg-white/5 relative overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%` }}
        />
        <span
          className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-off-white/70"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {count} ({percentage}%)
        </span>
      </div>
    </div>
  );
}

const AGE_LABELS: Record<string, string> = {
  under18: "Youth (7-17)",
  "18plus": "Adult (18+)",
};

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  es: "Spanish",
};

export default function DemographicsPanel({
  ageGroups,
  locales,
}: {
  ageGroups: DemoItem[];
  locales: DemoItem[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <p
          className="text-xs uppercase tracking-widest text-[#646464] mb-3"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Age Group
        </p>
        <div className="space-y-2">
          {ageGroups.map((item) => (
            <BarRow
              key={item.group}
              label={AGE_LABELS[item.group || ""] || item.group || ""}
              count={item.count}
              percentage={item.percentage}
              color="bg-cobalt"
            />
          ))}
        </div>
      </div>
      <div>
        <p
          className="text-xs uppercase tracking-widest text-[#646464] mb-3"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Language
        </p>
        <div className="space-y-2">
          {locales.map((item) => (
            <BarRow
              key={item.locale}
              label={LOCALE_LABELS[item.locale || ""] || item.locale || ""}
              count={item.count}
              percentage={item.percentage}
              color="bg-electric-green"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
