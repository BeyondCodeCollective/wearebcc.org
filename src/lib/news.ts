export interface NewsPost {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  body: string;
  linkUrl?: string;
  linkLabel?: string;
}

/**
 * Normalize the raw `news.items` array from the i18n messages.
 * Drops malformed entries and sorts newest-first by ISO date so the
 * display order is predictable regardless of how staff arrange them in admin.
 */
export function normalizeNews(raw: unknown): NewsPost[] {
  if (!Array.isArray(raw)) return [];
  return (raw as Partial<NewsPost>[])
    .filter((p): p is NewsPost => !!p && !!p.slug && !!p.title)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Split a post body into paragraphs on blank lines. */
export function newsParagraphs(body: string): string[] {
  return (body || "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Format an ISO (YYYY-MM-DD) date for display in the active locale. */
export function formatNewsDate(date: string, locale: string): string {
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}
