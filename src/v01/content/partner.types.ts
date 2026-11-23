import type { FormMessages, ImageRef, LinkRef, LogoRef, PageChrome, SubscribeConfig } from "./types";

export type AudienceKey = "employer" | "team" | "board" | "campus" | "funder";

/** Text with links in it. */
export type RichText = (string | LinkRef)[];

export type Audience = {
  key: AudienceKey;
  /** The pill that picks this audience. */
  label: string;
  head: string;
  body: string;
  cta: LinkRef;
  /** Absent when the design's photo could not be retrieved. The text then fills the row. */
  image?: ImageRef;
};

export type ContactField = { id: string; name: string; label: string; placeholder?: string };

/** Content for the Partner page. Its sections take these types as props and nothing else. */
export type PartnerPageContent = PageChrome & {
  hero: {
    breadcrumb: { home: LinkRef; current: string; ariaLabel: string };
    /** One entry per line. The last line is set in the accent colour. */
    headline: string[];
    lede: string;
  };
  company: {
    headline: string;
    promise: { title: string; note: string };
    logos: LogoRef[];
  };
  who: {
    headline: string;
    groupLabel: string;
    audiences: Audience[];
    /** The audience selected on load. */
    initial: AudienceKey;
  };
  contact: {
    id: string;
    headline: string[];
    intro: RichText;
    address: string[];
    form: {
      ariaLabel: string;
      name: ContactField;
      organization: ContactField;
      email: ContactField;
      want: { id: string; name: string; label: string; options: string[] };
      message: ContactField;
      submit: string;
      /** Where the inquiry posts. The server stores it, tells the team and adds the contact to Mailchimp. */
      subscribe: SubscribeConfig;
      messages: FormMessages;
    };
  };
};
