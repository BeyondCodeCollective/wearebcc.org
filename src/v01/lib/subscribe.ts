import type { SubscribeConfig } from "../content/types";

export type SubscribeFields = {
  email: string;
  firstName?: string;
  /** What the person wants to do. Stored as the subscriber's segment. */
  segment?: string;
  city?: string;
  language?: string;
  /** Honeypot. People never fill it in: the server drops anything that does. */
  website?: string;
};

/** Posts one sign-up. Resolves true when the server accepted it. */
export async function subscribe(config: SubscribeConfig, fields: SubscribeFields): Promise<boolean> {
  try {
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, source: config.source }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
