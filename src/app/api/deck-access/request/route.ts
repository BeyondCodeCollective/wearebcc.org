import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { Resend } from "resend";
import { ensureTables } from "@/lib/db";
import {
  CODE_TTL_MS,
  EMAIL_REGEX,
  generateCode,
  hashCode,
  normalizeEmail,
} from "@/lib/deck-access";

/** Codes a single address may request per window, to stop mailbox flooding. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function codeEmail(code: string, locale: string) {
  const isES = locale === "es";
  const minutes = Math.round(CODE_TTL_MS / 60000);
  return {
    subject: isES
      ? `${code} es tu código de acceso de BCC`
      : `${code} is your BCC access code`,
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;color:#111">
        <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#666;margin:0 0 24px">
          ${isES ? "Acceso para socios" : "Partner access"}
        </p>
        <p style="font-size:16px;line-height:1.6;margin:0 0 24px">
          ${
            isES
              ? "Usa este código para abrir la presentación de socios de Beyond Code Collective."
              : "Use this code to open the Beyond Code Collective partner deck."
          }
        </p>
        <p style="font-size:40px;font-weight:700;letter-spacing:.18em;margin:0 0 24px">${code}</p>
        <p style="font-size:14px;line-height:1.6;color:#666;margin:0 0 8px">
          ${
            isES
              ? `El código vence en ${minutes} minutos.`
              : `The code expires in ${minutes} minutes.`
          }
        </p>
        <p style="font-size:14px;line-height:1.6;color:#666;margin:0">
          ${
            isES
              ? "Si no pediste este código, puedes ignorar este correo."
              : "If you did not request this code, you can ignore this email."
          }
        </p>
      </div>
    `,
  };
}

export async function POST(request: Request) {
  let email = "";
  let locale = "en";
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? normalizeEmail(body.email) : "";
    locale = body?.locale === "es" ? "es" : "en";
  } catch {
    // fall through, handled by the validation below
  }

  if (!EMAIL_REGEX.test(email) || email.length > 320) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    console.error("deck-access/request: Resend is not configured");
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }
  if (!process.env.DECK_SESSION_SECRET) {
    console.error("deck-access/request: DECK_SESSION_SECRET is not set");
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  try {
    await ensureTables();

    const since = new Date(Date.now() - RATE_WINDOW_MS).toISOString();
    const { rows: recent } = await sql`
      SELECT COUNT(*)::int AS n FROM deck_access_codes
      WHERE email = ${email} AND created_at > ${since}
    `;
    if ((recent[0]?.n ?? 0) >= RATE_LIMIT) {
      // Deliberately the same shape as success: do not tell a prober whether
      // an address is being rate limited.
      return NextResponse.json({ ok: true });
    }

    const code = generateCode();
    const codeHash = await hashCode(email, code);
    const expiresAt = new Date(Date.now() + CODE_TTL_MS).toISOString();

    // Any earlier live code for this address stops working, so a forwarded
    // old email cannot be replayed.
    await sql`
      UPDATE deck_access_codes SET consumed_at = NOW()
      WHERE email = ${email} AND consumed_at IS NULL
    `;
    await sql`
      INSERT INTO deck_access_codes (email, code_hash, expires_at)
      VALUES (${email}, ${codeHash}, ${expiresAt})
    `;

    const { subject, html } = codeEmail(code, locale);
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      subject,
      html,
    });
    if (error) {
      console.error("deck-access/request: Resend error", JSON.stringify(error));
      return NextResponse.json(
        {
          ok: false,
          error: "send_failed",
          // Surfaced outside production only, so a misconfigured sender is
          // diagnosable on a preview without leaking provider detail publicly.
          ...(process.env.VERCEL_ENV !== "production"
            ? { detail: `${error.name}: ${error.message}` }
            : {}),
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("deck-access/request failed", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
