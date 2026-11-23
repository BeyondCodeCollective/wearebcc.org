import type { PageChrome } from "./types";

/** Content for the About page. Its sections take these types as props and nothing else. */
export type AboutPageContent = PageChrome & {
  // One field per design section, in page order.
};
