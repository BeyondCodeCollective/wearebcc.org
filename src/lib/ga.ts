import { sendGAEvent } from "@next/third-parties/google";

// GA4 events that Google Ads imports as conversions. Keep names in sync with GA4 key events.
export type GAEvent = "newsletter_signup" | "donate_click" | "code_along_watch";

export function track(event: GAEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  sendGAEvent("event", event, params);
}
