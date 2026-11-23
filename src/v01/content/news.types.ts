import type { PageChrome } from "./types";

/** Content for the News page. Its sections take these types as props and nothing else. */
export type NewsPageContent = PageChrome & {
  // One field per design section, in page order.
};
