import type { PageChrome } from "./types";

/** Content for the Impact page. Its sections take these types as props and nothing else. */
export type ImpactPageContent = PageChrome & {
  // One field per design section, in page order.
};
