import type { FaqContent } from "../sections/beyondShared/Faq";
import type { ImageRef, LinkRef, PageChrome, Timed } from "./types";

export type BeyondTheGameHeroContent = {
  breadcrumb: { links: LinkRef[]; current: string };
  badge: string;
  /** Lines of the white part of the headline, then the lemon part. */
  headline: { lines: string[]; accent: string };
  lede: { strong: string; rest: string };
  primary: LinkRef;
  secondary: LinkRef;
  /** The two captions under the before and after photos. A photo is left out until one exists. */
  then: { caption: string; image?: ImageRef };
  next: { caption: string; accent: string; image?: ImageRef };
};

export type GlanceItem = {
  label: string;
  value: string;
  note?: string;
  /** Hides the item once this has started. */
  when?: Timed;
};

export type BeyondTheGameGlanceContent = {
  label: string;
  items: GlanceItem[];
};

export type TransitionStage = {
  key: string;
  label: string;
  head: string;
  body: string;
  start: string;
};

export type BeyondTheGameStagesContent = {
  headline: string[];
  intro: string;
  groupLabel: string;
  startLabel: string;
  cta: LinkRef;
  stages: TransitionStage[];
};

export type PathStep = {
  kicker: string;
  title: string;
  body: string;
  /** A step that has not opened yet shows dimmed. */
  upcoming?: boolean;
};

export type BeyondTheGamePathContent = {
  headline: string[];
  intro: string;
  /** Spoken description of the wavy path diagram. */
  diagramLabel: string;
  steps: PathStep[];
};

export type LearnerStory = {
  key: string;
  label: string;
  then: string;
  now: string;
  image: ImageRef;
  quote?: string;
  name: string;
  text: string;
  link: LinkRef;
};

export type BeyondTheGameStoryContent = {
  groupLabel: string;
  thenLabel: string;
  nowLabel: string;
  learners: LearnerStory[];
};

export type BeyondTheGameTeamContent = {
  headline: string[];
  intro: string;
  people: { name: string; role: string; bio: string; image: ImageRef }[];
};

export type BeyondTheGameApplyContent = {
  headline: string[];
  body: string;
  aside: { title: string; meta: string; cta: LinkRef };
  sponsor: { strong: string; rest: string; link: LinkRef };
};

/** Content for the BeyondTheGame page. Its sections take these types as props and nothing else. */
export type BeyondTheGamePageContent = PageChrome & {
  hero: BeyondTheGameHeroContent;
  glance: BeyondTheGameGlanceContent;
  stages: BeyondTheGameStagesContent;
  path: BeyondTheGamePathContent;
  story: BeyondTheGameStoryContent;
  team: BeyondTheGameTeamContent;
  faq: FaqContent;
  apply: BeyondTheGameApplyContent;
};
