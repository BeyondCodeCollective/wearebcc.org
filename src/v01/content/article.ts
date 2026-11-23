import type { ArticlePageContent } from "./article.types";
import { siteFooter, siteHeader } from "./site";

/**
 * Article, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Article-lnqw.dc.html.
 */
export const article: ArticlePageContent = {
  header: siteHeader(),
  footer: siteFooter(),
};
