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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[11px] uppercase tracking-wider text-black/40 mb-4"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {children}
    </p>
  );
}

export default function DashboardShell() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [range, setRange] = useState("30d");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);

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
      <div className="min-h-screen bg-off-white flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-xs">
          <div className="flex items-center gap-2.5 mb-8">
            <Lock size={18} weight="bold" className="text-cobalt" />
            <h1 className="font-heading text-xl text-true-black uppercase tracking-tight">
              BCC Dashboard
            </h1>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-white text-true-black px-4 py-3 text-sm rounded-lg border border-black/10 focus:border-cobalt focus:outline-none placeholder:text-black/30"
            style={{ fontFamily: "var(--font-mono)" }}
          />
          {authError && (
            <p className="text-[#D32F2F] text-xs mt-2" style={{ fontFamily: "var(--font-mono)" }}>
              Invalid password
            </p>
          )}
          <button
            type="submit"
            className="mt-4 w-full bg-cobalt text-off-white py-3 text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-cobalt/90 transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white text-true-black">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <h1 className="font-heading text-3xl uppercase tracking-tight">
            Quiz Dashboard
          </h1>
          <TimeRangeSelector selected={range} onChange={setRange} />
        </div>

        {loading && !data && (
          <p className="text-sm text-black/30" style={{ fontFamily: "var(--font-mono)" }}>
            Loading...
          </p>
        )}

        {data && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <MetricCard label="Quiz Starts" value={data.totalStarts} />
              <MetricCard label="Completions" value={data.totalCompletions} />
              <MetricCard label="Completion Rate" value={data.completionRate} suffix="%" accent="green" />
              <MetricCard label="Leads Captured" value={data.totalLeads} accent="green" />
              <MetricCard label="Lead Capture Rate" value={data.leadCaptureRate} suffix="%" />
              <MetricCard label="Leads Skipped" value={data.totalSkips} accent="orange" />
              <MetricCard label="Email Leads" value={data.emailLeads} />
            </div>

            {/* Funnel + Engagement */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2 bg-white rounded-lg border border-black/5 p-5">
                <SectionLabel>Funnel</SectionLabel>
                <FunnelChart steps={data.funnel} />
              </div>
              <div className="bg-white rounded-lg border border-black/5 p-5">
                <SectionLabel>Engagement</SectionLabel>
                <EngagementPanel data={data.engagement} />
              </div>
            </div>

            {/* Personality + Demographics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg border border-black/5 p-5">
                <SectionLabel>Personality Results</SectionLabel>
                {data.personalities.length > 0 ? (
                  <PersonalityBreakdown data={data.personalities} />
                ) : (
                  <p className="text-sm text-black/30" style={{ fontFamily: "var(--font-mono)" }}>
                    No completed quizzes yet
                  </p>
                )}
              </div>
              <div className="bg-white rounded-lg border border-black/5 p-5">
                <SectionLabel>Demographics</SectionLabel>
                <DemographicsPanel
                  ageGroups={data.demographics.ageGroups}
                  locales={data.demographics.locales}
                />
              </div>
            </div>

            {/* Daily Activity */}
            <div className="bg-white rounded-lg border border-black/5 p-5">
              <SectionLabel>Daily Activity</SectionLabel>
              <TimeseriesChart data={data.timeseries} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
