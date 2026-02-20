"use client";

interface TimeseriesPoint {
  date: string;
  starts: number;
  completions: number;
  leads: number;
}

export default function TimeseriesChart({ data }: { data: TimeseriesPoint[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-[#646464]" style={{ fontFamily: "var(--font-mono)" }}>
        No data yet
      </p>
    );
  }

  const maxVal = Math.max(...data.flatMap((d) => [d.starts, d.completions, d.leads]), 1);

  return (
    <div className="overflow-x-auto">
      <div className="flex items-end gap-1 min-w-fit" style={{ minHeight: 160 }}>
        {data.map((point) => (
          <div key={point.date} className="flex flex-col items-center gap-1 w-12">
            <div className="flex items-end gap-[2px]" style={{ height: 120 }}>
              <div
                className="w-3 bg-cobalt/80 transition-all duration-300"
                style={{ height: `${(point.starts / maxVal) * 100}%` }}
                title={`Starts: ${point.starts}`}
              />
              <div
                className="w-3 bg-electric-green/80 transition-all duration-300"
                style={{ height: `${(point.completions / maxVal) * 100}%` }}
                title={`Completions: ${point.completions}`}
              />
              <div
                className="w-3 bg-[#FF4C00]/80 transition-all duration-300"
                style={{ height: `${(point.leads / maxVal) * 100}%` }}
                title={`Leads: ${point.leads}`}
              />
            </div>
            <p
              className="text-[9px] text-[#646464] whitespace-nowrap"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {new Date(point.date).toLocaleDateString("en", { month: "short", day: "numeric" })}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        <span className="flex items-center gap-1.5 text-xs text-[#646464]" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="w-3 h-3 bg-cobalt/80 inline-block" /> Starts
        </span>
        <span className="flex items-center gap-1.5 text-xs text-[#646464]" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="w-3 h-3 bg-electric-green/80 inline-block" /> Completions
        </span>
        <span className="flex items-center gap-1.5 text-xs text-[#646464]" style={{ fontFamily: "var(--font-mono)" }}>
          <span className="w-3 h-3 bg-[#FF4C00]/80 inline-block" /> Leads
        </span>
      </div>
    </div>
  );
}
