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

  // ─── Partner deck identity ──────────────────────────────────────
  // One row per person who has ever verified an email against the decks.
  await sql`
    CREATE TABLE IF NOT EXISTS deck_viewers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(320) UNIQUE NOT NULL,
      first_seen_at TIMESTAMPTZ DEFAULT NOW(),
      last_seen_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  // Short-lived one-time codes. Stored hashed: a leak of this table must not
  // hand out deck access.
  await sql`
    CREATE TABLE IF NOT EXISTS deck_access_codes (
      id SERIAL PRIMARY KEY,
      email VARCHAR(320) NOT NULL,
      code_hash VARCHAR(64) NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      consumed_at TIMESTAMPTZ,
      attempts INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_deck_codes_email ON deck_access_codes(email)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_deck_codes_created ON deck_access_codes(created_at)`;

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
}
