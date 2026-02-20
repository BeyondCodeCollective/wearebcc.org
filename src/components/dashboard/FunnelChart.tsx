"use client";

interface FunnelStep {
  step: string;
  count: number;
  percentage: number;
}

const STEP_LABELS: Record<string, string> = {
  quiz_started: "Quiz Started",
  lead_captured: "Lead Captured",
  lead_skipped: "Lead Skipped",
  question_answered: "Questions Answered",
  quiz_completed: "Quiz Completed",
  results_viewed: "Results Viewed",
  results_email_sent: "Email Sent",
  chat_started: "Chat Started",
  chat_message: "Chat Messages",
  cta_clicked: "CTA Clicked",
  quiz_restarted: "Quiz Restarted",
};

export default function FunnelChart({ steps }: { steps: FunnelStep[] }) {
  const maxCount = Math.max(...steps.map((s) => s.count), 1);

  return (
    <div className="space-y-3">
      {steps.map((step) => (
        <div key={step.step} className="flex items-center gap-3">
          <p
            className="text-xs text-[#646464] w-36 shrink-0 text-right"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {STEP_LABELS[step.step] || step.step}
          </p>
          <div className="flex-1 h-7 bg-white/5 relative overflow-hidden">
            <div
              className="h-full bg-cobalt transition-all duration-500"
              style={{ width: `${(step.count / maxCount) * 100}%` }}
            />
            <span
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-off-white/70"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {step.count}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
