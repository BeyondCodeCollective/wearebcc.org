import { newsParagraphs, type NewsPost } from "@/lib/news";
import type { ArticleLink, ArticlePageContent } from "./article.types";
import { postCard } from "./newsPosts";
import { routes, siteFooter, siteHeader } from "./site";

const SITE_URL = "https://www.wearebcc.org";

/**
 * Article, v0.1. One template, filled from a real post. Every fixed word and
 * link lives here. Copy is taken exactly from docs/design/v0-1/S-Article-lnqw.dc.html.
 *
 * Hidden from the design: the pull quote (a placeholder, and posts have no
 * quote field), the "[Sport · years played]" line, the "Video PLAYER" headline of
 * the second variant (its card is built, and shows for posts that carry a video). NOT IN DESIGN: "Link copied", the post's own link list.
 * The closing card's photo and the corner stamp are /_blob files that could not
 * be retrieved, so the card has no photo yet.
 */
export function buildArticle(post: NewsPost, others: NewsPost[]): ArticlePageContent {
  const words = (post.body || "").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  const url = `${SITE_URL}/en/news/${post.slug}`;

  const links: ArticleLink[] = (post.links ?? []).map((link) => ({
    label: link.label,
    description: link.description,
    href: link.url,
    external: true,
  }));
  if (post.linkUrl) {
    links.push({
      label: post.linkLabel || post.linkUrl,
      href: post.linkUrl,
      external: /^https?:/i.test(post.linkUrl),
    });
  }

  return {
    header: siteHeader({ spanishHref: `/es/news/${post.slug}` }),
    footer: siteFooter(),
    breadcrumb: {
      label: "Breadcrumb",
      items: [
        { label: "Home", href: routes.home },
        { label: "News", href: routes.news },
        { label: post.category },
      ],
    },
    post: {
      ...postCard(post),
      readTime: `${minutes} min read`,
      author: post.author,
      paragraphs: newsParagraphs(post.body),
      links,
    },
    share: {
      label: "Share",
      linkedin: {
        label: "LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      },
      // Instagram has no share URL: it points at the organization's profile.
      instagram: { label: "Instagram", href: "https://www.instagram.com/beyondcodecollective" },
      copy: { label: "Copy link", copied: "Link copied", url },
    },
    video: post.video && {
      src: post.video.src,
      poster: post.video.poster,
      headline: post.video.headline,
      body: post.video.body,
      // NOT IN DESIGN: the play button's words and the Instagram link. The design's card
      // links to a program page; this one follows the post's sign-off, "Join us on socials".
      play: {
        label: post.video.duration ? `Play video · ${post.video.duration}` : "Play video",
        ariaLabel: `Play video: ${post.video.body}`,
      },
      cta: { label: "Follow along on Instagram", href: "https://www.instagram.com/beyondcodecollective" },
    },
    closing: {
      headline: ["Your next chapter", "starts here."],
      body: "Join a free live Beyond Lab or a Beyond Code Dialogues conversation, and see what you can build next.",
      cta: { label: "See upcoming events", href: routes.events },
      // MISSING FILE: /_blob photo (the Future Cod3rs camp image), 360px tall.
      image: undefined,
    },
    more: { headline: "Keep reading.", posts: others.slice(0, 3).map(postCard) },
  };
}
