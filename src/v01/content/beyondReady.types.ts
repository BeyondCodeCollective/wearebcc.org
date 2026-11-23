import type { PageChrome } from "./types";

/** Content for the BeyondReady page. Its sections take these types as props and nothing else. */
export type BeyondReadyPageContent = PageChrome & {
  // One field per design section, in page order.
};
