"use client";

import { useState, useEffect, useCallback } from "react";
import MetricCard from "./MetricCard";
import FunnelChart from "./FunnelChart";
import PersonalityBreakdown from "./PersonalityBreakdown";
import DemographicsPanel from "./DemographicsPanel";
import TimeseriesChart from "./TimeseriesChart";
import EngagementPanel from "./EngagementPanel";
import TimeRangeSelector from "./TimeRangeSelector";
import { Lock } from "@phosphor-icons/react";

interface DashboardData {
  totalStarts: number;
  totalCompletions: number;
  completionRate: number;
  totalLeads: number;
  totalSkips: number;
  leadCaptureRate: number;
  emailLeads: number;
  funnel: { step: string; count: number; percentage: number }[];
  personalities: { key: string; count: number; percentage: number }[];
  demographics: {
    ageGroups: { group: string; count: number; percentage: number }[];
    locales: { locale: string; count: number; percentage: number }[];
  };
  engagement: {
    chatUsageRate: number;
    avgChatMessages: number;
    ctaClickRate: number;
    emailSendRate: number;
  };
  timeseries: { date: string; starts: number; completions: number; leads: number }[];
}

export default function DashboardShell() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [range, setRange] = useState("30d");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);

  // Check sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("bcc-dash-pw");
    if (saved) {
      setPassword(saved);
      setAuthenticated(true);
    }
  }, []);

  const fetchData = useCallback(async (pw: string, timeRange: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics/dashboard?password=${encodeURIComponent(pw)}&range=${timeRange}`);
      if (res.status === 401) {
        setAuthenticated(false);
        setAuthError(true);
        sessionStorage.removeItem("bcc-dash-pw");
        return;
      }
      const json = await res.json();
      setData(json);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on auth or range change
  useEffect(() => {
    if (authenticated && password) {
      fetchData(password, range);
    }
  }, [authenticated, password, range, fetchData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(false);
    sessionStorage.setItem("bcc-dash-pw", password);
    setAuthenticated(true);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-true-black flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={20} weight="bold" className="text-cobalt" />
            <h1 className="font-heading text-2xl text-off-white uppercase tracking-tight">
              BCC Dashboard
            </h1>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full bg-[#2F2F2F] text-off-white px-4 py-3 text-sm border border-white/10 focus:border-cobalt focus:outline-none"
            style={{ fontFamily: "var(--font-mono)" }}
          />
          {authError && (
            <p className="text-[#FF4C00] text-xs mt-2" style={{ fontFamily: "var(--font-mono)" }}>
              Invalid password
            </p>
          )}
          <button
            type="submit"
            className="mt-3 w-full bg-cobalt text-off-white py-3 text-sm font-bold uppercase tracking-wider hover:bg-cobalt/90 transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-true-black text-off-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <p
              className="text-xs uppercase tracking-widest text-[#646464] mb-1"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              [ BCC Analytics ]
            </p>
            <h1 className="font-heading text-3xl md:text-4xl uppercase tracking-tight">
              Quiz Dashboard
            </h1>
          </div>
          <TimeRangeSelector selected={range} onChange={setRange} />
        </div>

        {loading && !data && (
          <p className="text-sm text-[#646464]" style={{ fontFamily: "var(--font-mono)" }}>
            Loading...
          </p>
        )}

        {data && (
          <div className="space-y-10">
            {/* KPI Cards */}
            <section>
              <p
                className="text-xs uppercase tracking-widest text-[#646464] mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                [01] Key Metrics
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <MetricCard label="Quiz Starts" value={data.totalStarts} />
                <MetricCard label="Completions" value={data.totalCompletions} />
                <MetricCard label="Completion Rate" value={data.completionRate} suffix="%" accent="green" />
                <MetricCard label="Leads Captured" value={data.totalLeads} accent="green" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                <MetricCard label="Lead Capture Rate" value={data.leadCaptureRate} suffix="%" />
                <MetricCard label="Leads Skipped" value={data.totalSkips} accent="orange" />
                <MetricCard label="Email Leads" value={data.emailLeads} />
              </div>
            </section>

            {/* Funnel */}
            <section>
              <p
                className="text-xs uppercase tracking-widest text-[#646464] mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                [02] Funnel
              </p>
              <div className="bg-[#2F2F2F] border border-white/5 p-5">
                <FunnelChart steps={data.funnel} />
              </div>
            </section>

            {/* Personality Breakdown */}
            <section>
              <p
                className="text-xs uppercase tracking-widest text-[#646464] mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                [03] Personality Results
              </p>
              <div className="bg-[#2F2F2F] border border-white/5 p-5">
                {data.personalities.length > 0 ? (
                  <PersonalityBreakdown data={data.personalities} />
                ) : (
                  <p className="text-sm text-[#646464]" style={{ fontFamily: "var(--font-mono)" }}>
                    No completed quizzes yet
                  </p>
                )}
              </div>
            </section>

            {/* Demographics */}
            <section>
              <p
                className="text-xs uppercase tracking-widest text-[#646464] mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                [04] Demographics
              </p>
              <div className="bg-[#2F2F2F] border border-white/5 p-5">
                <DemographicsPanel
                  ageGroups={data.demographics.ageGroups}
                  locales={data.demographics.locales}
                />
              </div>
            </section>

            {/* Timeseries */}
            <section>
              <p
                className="text-xs uppercase tracking-widest text-[#646464] mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                [05] Daily Activity
              </p>
              <div className="bg-[#2F2F2F] border border-white/5 p-5">
                <TimeseriesChart data={data.timeseries} />
              </div>
            </section>

            {/* Engagement */}
            <section>
              <p
                className="text-xs uppercase tracking-widest text-[#646464] mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                [06] Engagement
              </p>
              <div className="bg-[#2F2F2F] border border-white/5 p-5">
                <EngagementPanel data={data.engagement} />
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
