import type { EventTag, HomeEvent, ImageRef, LinkRef, StickerRef } from "./types";
import type { PageChrome, SubscribeConfig, FormMessages } from "./types";

export type FlyerTone = "green" | "cobalt" | "lemon" | "crimson" | "peach";

/** One session. It appears as a flyer, a list row, or both. Times come from the Home content. */
export type SessionEvent = HomeEvent & {
  /** The flyer on the board. */
  flyer: {
    tone: FlyerTone;
    /** Degrees, as the design pins each flyer a little crooked. */
    tilt: number;
    text: string;
    /** Set to keep the flyer off the board. Say why. */
    hidden?: string;
  };
  /** Text after the description, with a lead-in the design underlines. */
  descriptionTail?: { lead: string; rest: string };
};

export type BreadcrumbItem = { label: string; href?: string };

export type EventsHeroContent = {
  breadcrumbLabel: string;
  breadcrumb: BreadcrumbItem[];
  headline: string;
  lede: string;
  note: string;
  boardLabel: string;
};

export type EventListContent = {
  filterLabel: string;
  filters: { id: "all" | EventTag; label: string }[];
  empty: { text: string; reset: string };
  sticker: StickerRef;
};

export type PastEvent = {
  id: string;
  title: string;
  description: string;
  meta: string[];
  dateLabel: { eyebrow: string; value: string };
  image?: ImageRef;
  cta: LinkRef;
  /** Set to keep the row off the page. Say why. */
  hidden?: string;
};

export type ArchiveContent = {
  headline: string;
  events: PastEvent[];
};

export type NeverMissContent = {
  headline: string[];
  label: string;
  placeholder: string;
  submit: string;
  subscribe: SubscribeConfig;
  messages: FormMessages;
};

/** Content for the Events page. Its sections take these types as props and nothing else. */
export type EventsPageContent = PageChrome & {
  hero: EventsHeroContent;
  sessions: SessionEvent[];
  list: EventListContent;
  archive: ArchiveContent;
  neverMiss: NeverMissContent;
};
