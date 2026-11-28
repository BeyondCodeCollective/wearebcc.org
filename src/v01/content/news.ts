import type { NewsPost } from "@/lib/news";
import type { NewsPageContent } from "./news.types";
import { postCard } from "./newsPosts";
import { routes, siteFooter, siteHeader } from "./site";

/**
 * News, v0.1. Every fixed word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-News-cy75.dc.html.
 * The posts themselves are real data and come in from the news messages.
 *
 * NOT IN DESIGN: the form success and error lines (borrowed from the existing site).
 * Hidden from the design: the "Press kit" row, whose text is a placeholder
 * ("[Logos, photos, boilerplate. To assemble.]").
 */
export function buildNews(posts: NewsPost[]): NewsPageContent {
  return {
    header: siteHeader({ spanishHref: "/es/news" }),
    footer: siteFooter(),
    breadcrumb: {
      label: "Breadcrumb",
      items: [{ label: "Home", href: routes.home }, { label: "News" }],
    },
    featured: { cta: "Read the story" },
    archive: {
      headline: "Everything else.",
      filterLabel: "Filter by type",
      allLabel: "All",
      loadMore: "Load more",
      pageSize: 5,
    },
    press: {
      headline: "For press.",
      rows: [
        {
          title: "One-pager",
          body: "Mission, programs, and how to get involved.",
          // The one-pager PDF already published on the site.
          cta: { label: "Download", href: "/resources/Beyond-Code-Collective-One-Pager.pdf", external: true },
        },
        {
          title: "Media questions",
          body: "info@wearebcc.org",
          cta: { label: "Email us", href: "mailto:info@wearebcc.org" },
        },
        // NOT IN DESIGN: the phone number and office address lived only in the partners form (run 6, 2026-11-27).
        {
          title: "Phone and address",
          body: "Every way to reach us, on one page.",
          cta: { label: "Contact us", href: routes.contact },
        },
      ],
    },
    newsletter: {
      headline: ["Get news in", "your inbox."],
      label: "Email address",
      placeholder: "you@example.com",
      submit: "Sign up",
      subscribe: { endpoint: "/api/subscribe", source: "news-v01" },
      messages: {
        success: "You're on the list.",
        successBody: "We'll be in touch as cohorts and Labs open up.",
        error: "Something went wrong. Please try again.",
      },
    },
    posts: posts.map(postCard),
  };
}
