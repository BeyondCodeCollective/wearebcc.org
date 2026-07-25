import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const mailchimp = require("@mailchimp/mailchimp_marketing");
import crypto from "crypto";
import { sql } from "@vercel/postgres";
import { ensureTables } from "@/lib/db";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Strip non-digits and ensure E.164 format (+1 prefix for US numbers) */
function formatPhoneE164(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("1") && digits.length === 11) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  // Already has country code or non-US — prefix with + if missing
  return digits.startsWith("+") ? digits : `+${digits}`;
}

function initMailchimp() {
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX) {
    throw new Error("MAILCHIMP_API_KEY and MAILCHIMP_SERVER_PREFIX are required");
  }
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
  });
}

function subscriberHash(email: string): string {
  return crypto.createHash("md5").update(email).digest("hex");
}

type Lead = {
  email: string;
  firstName: string;
  phone: string;
  company: string;
  segment: string;
  source: string;
  /** Free text from the contact modal. Mailchimp has no merge field for it. */
  message: string;
};

/**
 * Write the lead down before anything else can fail.
 *
 * This is the whole point of the file: Mailchimp used to be the only place a
 * submission ever existed, so when its API key was revoked in May 2026 every
 * form on the site failed silently for ~2 months and those people were gone.
 * Postgres is the system of record now; Mailchimp is a sync target.
 */
async function persistLead(lead: Lead): Promise<number | null> {
  try {
    await ensureTables();
    const { rows } = await sql`
      INSERT INTO subscribers (email, first_name, phone, company, segment, source, message)
      VALUES (${lead.email}, ${lead.firstName || null}, ${lead.phone || null},
              ${lead.company || null}, ${lead.segment || null}, ${lead.source},
              ${lead.message || null})
      RETURNING id
    `;
    return rows[0].id as number;
  } catch (err) {
    // Both stores are now failing. Log the address itself so the lead is at
    // least recoverable from the log, which is the last line of defence.
    console.error(
      `LEAD_CAPTURE_FAILED source=${lead.source} email=${lead.email} name=${lead.firstName}`,
      err,
    );
    return null;
  }
}

async function markSynced(id: number | null, error?: string) {
  if (id === null) return;
  try {
    if (error) {
      await sql`UPDATE subscribers SET sync_error = ${error.slice(0, 2000)} WHERE id = ${id}`;
    } else {
      await sql`
        UPDATE subscribers
        SET synced_to_mailchimp = TRUE, synced_at = NOW(), sync_error = NULL
        WHERE id = ${id}
      `;
    }
  } catch (err) {
    console.error("subscribers sync-state update failed", err);
  }
}

/**
 * Tell a broken integration apart from a user's typo.
 *
 * These used to be indistinguishable: every failure returned the same generic
 * message, so a total outage looked exactly like someone mistyping an email
 * and nothing ever surfaced it.
 */
function classify(error: unknown): "auth" | "config" | "member_exists" | "other" {
  const e = error as {
    status?: number;
    message?: string;
    response?: { body?: { detail?: string; title?: string } };
  };
  if (e?.message?.includes("MAILCHIMP_API_KEY")) return "config";
  const detail = (e?.response?.body?.detail || "").toLowerCase();
  if (e?.status === 400 && detail.includes("member exists")) return "member_exists";
  if (e?.status === 401 || e?.status === 403) return "auth";
  return "other";
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { firstName, email, phone, segment, source, company, message } = body as Record<
    string,
    string | undefined
  >;

  const hasEmail = !!email && typeof email === "string" && EMAIL_REGEX.test(email.trim());
  const hasPhone = !!phone && typeof phone === "string" && phone.trim().length >= 10;

  if (!hasEmail && !hasPhone) {
    return NextResponse.json({ error: "Email or phone is required" }, { status: 400 });
  }
  if (!source || typeof source !== "string") {
    return NextResponse.json({ error: "Source is required" }, { status: 400 });
  }

  // Mailchimp requires an email — use a placeholder for phone-only leads
  const cleanEmail = hasEmail
    ? email!.trim().toLowerCase()
    : `phone-${phone!.trim().replace(/\D/g, "")}@placeholder.wearebcc.org`;

  const lead: Lead = {
    email: cleanEmail,
    firstName: typeof firstName === "string" ? firstName.trim() : "",
    phone: typeof phone === "string" && phone.trim() ? formatPhoneE164(phone.trim()) : "",
    company: typeof company === "string" ? company.trim() : "",
    segment: typeof segment === "string" ? segment : "",
    source,
    message: typeof message === "string" ? message.trim() : "",
  };

  // 1. Capture first. Never depends on a third party being up.
  const leadId = await persistLead(lead);

  // Somebody wrote to us and is expecting a reply. Until these are surfaced in
  // the admin or emailed out, the log is the only way anyone sees them.
  if (lead.message) {
    console.log(
      `CONTACT_MESSAGE source=${lead.source} from=${lead.firstName} <${lead.email}> ` +
        `stored=${leadId !== null ? `subscribers#${leadId}` : "LOG ONLY"}\n${lead.message}`,
    );
  }

  // 2. Then sync to Mailchimp. A failure here is ours to retry, not the
  //    visitor's to re-submit — they already gave us their address.
  try {
    initMailchimp();
    await mailchimp.lists.setListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      subscriberHash(cleanEmail),
      {
        email_address: cleanEmail,
        status: "subscribed",
        merge_fields: {
          FNAME: lead.firstName,
          PHONE: lead.phone,
          SOURCE: lead.source,
          SEGMENT: lead.segment,
          ...(lead.company ? { COMPANY: lead.company } : {}),
        },
      },
    );
    await markSynced(leadId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const kind = classify(error);

    if (kind === "member_exists") {
      await markSynced(leadId);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (kind === "auth" || kind === "config") {
      // Loud and specific: this is a broken deployment, not a bad input, and
      // it will keep failing for every visitor until someone rotates the key.
      console.error(
        `MAILCHIMP_CREDENTIALS_INVALID kind=${kind} — every subscribe request is failing. ` +
          `Rotate MAILCHIMP_API_KEY and confirm MAILCHIMP_SERVER_PREFIX matches its suffix. ` +
          `Leads are still being captured in the subscribers table.`,
        error,
      );
    } else {
      console.error(`MAILCHIMP_SYNC_FAILED source=${lead.source}`, error);
    }

    await markSynced(leadId, `${kind}: ${(error as Error)?.message ?? "unknown"}`);

    // We have the person. Only tell them something broke if we truly lost them.
    if (leadId !== null) {
      return NextResponse.json({ success: true, pendingSync: true }, { status: 200 });
    }
    return NextResponse.json(
      { error: "Failed to process subscription. Please try again." },
      { status: 500 },
    );
  }
}
