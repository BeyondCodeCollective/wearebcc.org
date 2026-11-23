import type { PageChrome } from "./types";

/** Content for the BeyondTheGame page. Its sections take these types as props and nothing else. */
export type BeyondTheGamePageContent = PageChrome & {
  // One field per design section, in page order.
};
