import type { PageChrome } from "./types";

/** Content for the Article page. Its sections take these types as props and nothing else. */
export type ArticlePageContent = PageChrome & {
  // One field per design section, in page order.
};
