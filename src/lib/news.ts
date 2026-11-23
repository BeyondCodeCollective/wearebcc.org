export interface NewsPost {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  body: string;
  /** Bylined author. Omitted for posts written as the organization. */
  author?: string;
  /**
   * Unpublished. Kept out of every listing and the sitemap, and served
   * noindex, but the URL still resolves so the piece can be shared for
   * review before it goes live.
   */
  draft?: boolean;
  linkUrl?: string;
  linkLabel?: string;
  links?: { label: string; url: string; description?: string }[];
  imagePosition?: string;
  /**
   * A short film that goes with the post. The v0.1 Article page plays it in
   * the card under the story. Files live in /public.
   */
  video?: {
    src: string;
    /** The still shown before the film plays. */
    poster: string;
    /** Two lines; the second is set in the highlight color. */
    headline: string[];
    body: string;
    /** Running time as shown, for example "0:47". */
    duration?: string;
  };
}

/**
 * Normalize the raw `news.items` array from the i18n messages.
 * Drops malformed entries and sorts newest-first by ISO date so the
 * display order is predictable regardless of how staff arrange them in admin.
 *
 * Drafts are excluded by default, so a new listing surface cannot leak one by
 * forgetting to filter. Pass `includeDrafts` only where a draft must resolve:
 * the article route itself, which serves it noindex for review.
 */
export function normalizeNews(
  raw: unknown,
  { includeDrafts = false }: { includeDrafts?: boolean } = {},
): NewsPost[] {
  if (!Array.isArray(raw)) return [];
  return (raw as Partial<NewsPost>[])
    .filter((p): p is NewsPost => !!p && !!p.slug && !!p.title)
    .filter((p) => includeDrafts || !p.draft)
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

/** A run of paragraph text, or a link inside it. */
export type NewsInline = string | { label: string; href: string };

/**
 * Split a paragraph into text and links. A link is written [label](url) in
 * the post body, where the url is https://, http:// or a path on this site.
 */
export function newsInline(paragraph: string): NewsInline[] {
  const parts: NewsInline[] = [];
  const link = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g;
  let last = 0;
  for (const match of paragraph.matchAll(link)) {
    if (match.index > last) parts.push(paragraph.slice(last, match.index));
    parts.push({ label: match[1], href: match[2] });
    last = match.index + match[0].length;
  }
  if (last < paragraph.length) parts.push(paragraph.slice(last));
  return parts;
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
