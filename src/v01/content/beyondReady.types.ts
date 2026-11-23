import type { FaqContent } from "../sections/beyondShared/Faq";
import type { ImageRef, LinkRef, PageChrome } from "./types";

export type BeyondReadyHeroContent = {
  breadcrumb: { links: LinkRef[]; current: string };
  cover: {
    brand: string;
    cohort: string;
    /** One word per line. */
    title: string[];
    facts: { label: string; value: string }[];
  };
  claim: { before: string; highlight: string };
  lede: string;
  primary: LinkRef;
  secondary: LinkRef;
  image: ImageRef;
};

export type RoleOption = {
  key: string;
  label: string;
  problem: string;
  build: string;
};

export type BeyondReadyRolesContent = {
  headline: string[];
  intro: string;
  groupLabel: string;
  problemLabel: string;
  buildLabel: string;
  roles: RoleOption[];
};

export type BeyondReadySkillsContent = {
  headline: string[];
  intro: string;
  skills: { name: string; body: string }[];
  centerLabel: string;
  /** Spoken description of the loop diagram. */
  loopLabel: string;
};

export type WeekCardTone = "cobalt" | "paper" | "ink" | "lemon";

export type BeyondReadyWeekContent = {
  headline: string[];
  intro: string;
  days: { day: string; card?: { title: string; note: string; tone: WeekCardTone }; off?: string }[];
  closing: string;
};

export type BeyondReadyWhyContent = {
  headline: string;
  claim: { before: string; highlight: string };
  body: string;
};

export type BeyondReadyJoinContent = {
  headline: string;
  body: string[];
  aside: { lines: string[]; cta: LinkRef };
  bring: {
    headline: string;
    items: { title: string; body: string; link: LinkRef }[];
  };
};

/** Content for the BeyondReady page. Its sections take these types as props and nothing else. */
export type BeyondReadyPageContent = PageChrome & {
  hero: BeyondReadyHeroContent;
  roles: BeyondReadyRolesContent;
  skills: BeyondReadySkillsContent;
  week: BeyondReadyWeekContent;
  why: BeyondReadyWhyContent;
  faq: FaqContent;
  join: BeyondReadyJoinContent;
};
