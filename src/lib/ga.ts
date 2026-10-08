// Events pushed to the GTM dataLayer. GTM (GTM-NKQG6SRG, loaded in the root layout) owns GA4 and
// Google Ads tags; the site no longer loads GA4 directly. Keep names in sync with the GTM triggers.
export type GAEvent =
  | "newsletter_signup"
  | "program_interest"
  | "contact_submit"
  | "partner_inquiry"
  | "hire_talent_inquiry"
  | "partner_gate_unlock"
  | "quiz_email_submit"
  | "quiz_complete"
  | "donate_click"
  | "code_along_watch";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: GAEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
