export function generateSessionId(): string {
  return crypto.randomUUID();
}

export function trackEvent(
  sessionId: string,
  quizVersion: "quiz" | "quiz-v2",
  eventType: string,
  eventData: Record<string, unknown> = {},
  locale: string = "en"
): void {
  try {
    const payload = JSON.stringify({
      events: [
        {
          session_id: sessionId,
          quiz_version: quizVersion,
          event_type: eventType,
          event_data: eventData,
          locale,
        },
      ],
    });

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics", payload);
    } else {
      fetch("/api/analytics", {
        method: "POST",
        body: payload,
        keepalive: true,
        headers: { "Content-Type": "application/json" },
      }).catch(() => {});
    }
  } catch {
    // Silent fail — analytics should never break the quiz
  }
}
