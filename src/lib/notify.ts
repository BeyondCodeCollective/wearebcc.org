import { Resend } from "resend";

/**
 * Tell a human when somebody writes in.
 *
 * Storing a contact message stopped us losing it, but stored is not read: a
 * legitimate enquiry could sit in the subscribers table for weeks. This sends
 * it to whoever is on CONTACT_NOTIFY_TO.
 *
 * Deliberately never throws. The submission is already saved in Postgres by
 * the time this runs, so a mail failure must not turn a captured lead into an
 * error for the visitor.
 */

/** Sources that are a person asking for something, rather than a list signup. */
const INQUIRY_SOURCES = new Set([
  "contact-modal",
  "partnerships",
  "hire-talent",
  "get-involved",
]);

export type Inquiry = {
  email: string;
  firstName: string;
  phone: string;
  company: string;
  segment: string;
  source: string;
  message: string;
};

/**
 * Newsletter signups would bury the real enquiries, so they are not notified.
 * A submission carrying a written message always is, whatever its source.
 */
export function shouldNotify(lead: Inquiry): boolean {
  return INQUIRY_SOURCES.has(lead.source) || lead.message.length > 0;
}

function recipients(): string[] {
  return (process.env.CONTACT_NOTIFY_TO || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function notifyInquiry(lead: Inquiry, subscriberId: number | null) {
  const to = recipients();
  const from = process.env.CONTACT_NOTIFY_FROM;

  if (!to.length || !from) {
    // Not configured is not an error: it just means nobody has been nominated
    // yet. Say so once, loudly enough to be findable.
    console.warn(
      `CONTACT_NOTIFY_SKIPPED source=${lead.source} reason=${
        !from ? "CONTACT_NOTIFY_FROM unset" : "CONTACT_NOTIFY_TO unset"
      } (the submission is still stored)`,
    );
    return;
  }
  // Own key on purpose. This site's RESEND_API_KEY belongs to an account whose
  // only verified domain is in.pulsepro.work, and its plan allows exactly one,
  // so it cannot send as wearebcc.org. Notifications therefore go out through
  // the LXP's Resend account, which already has mail.bccacademy.io verified.
  // Keeping it in a separate variable means the existing key and the quiz path
  // that uses it are left untouched.
  const apiKey = process.env.CONTACT_NOTIFY_RESEND_KEY || process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "CONTACT_NOTIFY_FAILED reason=no API key (set CONTACT_NOTIFY_RESEND_KEY)",
    );
    return;
  }

  const label = lead.source.replace(/-/g, " ");
  const lines = [
    ["Name", lead.firstName],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Company", lead.company],
    ["Interest", lead.segment],
    ["Source", lead.source],
  ].filter(([, v]) => v);

  const text = [
    `${lead.firstName || "Someone"} submitted the ${label} form on wearebcc.org.`,
    "",
    ...lines.map(([k, v]) => `${k}: ${v}`),
    "",
    lead.message ? `Message:\n${lead.message}` : "(No message included.)",
    "",
    subscriberId !== null ? `Stored as subscribers #${subscriberId}.` : "",
    "Reply directly to this email to answer them.",
  ]
    .filter((l) => l !== undefined)
    .join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      // So hitting reply goes to the person who wrote in, not to us.
      replyTo: lead.email,
      subject: `${label}: ${lead.firstName || lead.email}`,
      text,
    });
    if (error) {
      console.error(`CONTACT_NOTIFY_FAILED source=${lead.source}`, error);
      return;
    }
    console.log(
      `CONTACT_NOTIFY_SENT source=${lead.source} to=${to.length} recipient(s)`,
    );
  } catch (err) {
    console.error(`CONTACT_NOTIFY_FAILED source=${lead.source}`, err);
  }
}
