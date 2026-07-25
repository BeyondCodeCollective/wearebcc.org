import { sql } from "@vercel/postgres";

export async function ensureTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS quiz_events (
      id SERIAL PRIMARY KEY,
      session_id VARCHAR(36) NOT NULL,
      quiz_version VARCHAR(10) NOT NULL,
      event_type VARCHAR(50) NOT NULL,
      event_data JSONB DEFAULT '{}',
      locale VARCHAR(5) DEFAULT 'en',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS quiz_completions (
      id SERIAL PRIMARY KEY,
      session_id VARCHAR(36) UNIQUE NOT NULL,
      quiz_version VARCHAR(10) NOT NULL,
      age_group VARCHAR(10) NOT NULL,
      personality_result VARCHAR(20) NOT NULL,
      locale VARCHAR(5) DEFAULT 'en',
      lead_captured BOOLEAN DEFAULT FALSE,
      lead_type VARCHAR(10),
      email_sent BOOLEAN DEFAULT FALSE,
      chat_used BOOLEAN DEFAULT FALSE,
      chat_messages INTEGER DEFAULT 0,
      cta_clicked BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_events_session ON quiz_events(session_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_events_type ON quiz_events(event_type)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_events_created ON quiz_events(created_at)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_completions_created ON quiz_completions(created_at)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_completions_personality ON quiz_completions(personality_result)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_completions_age ON quiz_completions(age_group)`;

  await sql`
    CREATE TABLE IF NOT EXISTS site_content (
      id SERIAL PRIMARY KEY,
      locale VARCHAR(5) NOT NULL,
      namespace VARCHAR(50) NOT NULL,
      content JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_site_content_locale_ns ON site_content(locale, namespace)`;

  // ─── Lead capture ───────────────────────────────────────────────
  // Every form submission is written here BEFORE Mailchimp is called, so a
  // Mailchimp outage costs us a sync, not the person. Append-only on purpose:
  // one row per submission, never updated in place except to record sync
  // state. A dead API key cost roughly two months of signups in 2026 because
  // Mailchimp was the only place this data ever existed.
  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(320) NOT NULL,
      first_name VARCHAR(200),
      phone VARCHAR(32),
      company VARCHAR(200),
      segment VARCHAR(200),
      source VARCHAR(100) NOT NULL,
      synced_to_mailchimp BOOLEAN DEFAULT FALSE,
      sync_error TEXT,
      synced_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  // The contact modal collects a written message. Mailchimp has no merge field
  // that can hold one, so Postgres is the only place it can live.
  await sql`ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS message TEXT`;
  await sql`CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email)`;
  // Contact messages are the rows a human actually needs to read.
  await sql`CREATE INDEX IF NOT EXISTS idx_subscribers_messages ON subscribers(created_at) WHERE message IS NOT NULL`;
  await sql`CREATE INDEX IF NOT EXISTS idx_subscribers_created ON subscribers(created_at)`;
  // Partial index: the backfill only ever asks for the unsynced rows.
  await sql`CREATE INDEX IF NOT EXISTS idx_subscribers_unsynced ON subscribers(created_at) WHERE synced_to_mailchimp = FALSE`;
}
