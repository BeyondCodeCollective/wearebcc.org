import type { NewsPost } from "@/lib/news";
import { articleRoute } from "./site";
import type { PostCard } from "./news.types";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-10-08" becomes "Oct 8, 2026". Anything that is not a date is shown as it came. */
export function shortDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? iso : dateFormat.format(d);
}

/** Shapes a real post for the v0.1 pages. */
export function postCard(post: NewsPost): PostCard {
  return {
    slug: post.slug,
    href: articleRoute(post.slug),
    dateTime: post.date,
    dateLabel: shortDate(post.date),
    category: post.category,
    title: post.title,
    excerpt: post.excerpt,
    image: { src: post.image, alt: post.imageAlt ?? "", position: post.imagePosition },
  };
}
