import type { PageChrome } from "./types";

/** Content for the CodeAlong page. Its sections take these types as props and nothing else. */
export type CodeAlongPageContent = PageChrome & {
  // One field per design section, in page order.
};
