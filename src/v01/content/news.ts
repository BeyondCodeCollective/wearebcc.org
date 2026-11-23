import type { NewsPageContent } from "./news.types";
import { siteFooter, siteHeader } from "./site";

/**
 * News, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-News-cy75.dc.html.
 */
export const news: NewsPageContent = {
  header: siteHeader({ spanishHref: "/es/news" }),
  footer: siteFooter(),
};
