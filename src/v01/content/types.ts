/** Types for v0.1 page content. Sections take these as props and nothing else. */

export type Surface =
  | "paper"
  | "paper-warm"
  | "ink"
  | "navy"
  | "cobalt"
  | "lemon"
  | "forest"
  | "crimson"
  | "peach";

export type ImageRef = {
  src: string;
  /** Empty string marks a decorative image. */
  alt: string;
  /** CSS object-position: the focal point the design set for this crop. */
  position?: string;
};

export type LogoRef = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Cap on rendered height, in px, so logos of different shapes look even. */
  maxHeight: number;
};

export type LinkRef = {
  label: string;
  href: string;
  /** True for links that leave the site. */
  external?: boolean;
};

export type NavChild = { title: string; description: string; href: string };

export type NavItem = {
  label: string;
  href: string;
  /** True on the page this item leads to. */
  current?: boolean;
  children?: NavChild[];
};

export type LanguageLink = {
  code: string;
  lang: string;
  href: string;
  current?: boolean;
};

export type HeaderContent = {
  strip: string[];
  logo: { src: string; width: number; height: number };
  homeLabel: string;
  homeHref: string;
  navLabel: string;
  menuLabel: string;
  nav: NavItem[];
  languages: LanguageLink[];
  cta: LinkRef;
};

/** How a form reaches the server. Kept as data so the block has no fixed URL. */
export type SubscribeConfig = { endpoint: string; source: string };

export type FormMessages = { success: string; successBody: string; error: string };

export type HeroContent = {
  headline: { text: string; highlight?: boolean }[];
  lede: string;
  form: {
    label: string;
    placeholder: string;
    submit: string;
    helper: string;
    subscribe: SubscribeConfig;
    messages: FormMessages;
  };
  cta: LinkRef;
  image?: ImageRef;
};

/** Anything that should disappear from the page after a point in time. */
export type Timed = {
  /** ISO 8601 start with offset, for example 2026-12-14T12:00:00-05:00. */
  startsAt: string;
  /** IANA time zone the date is shown in. */
  timeZone: string;
  /** True when only the day is known. The item then stays up until that day ends. */
  timeTbd?: boolean;
  /** Overrides the hide time, for items with no single start (a course intake). */
  hideAfter?: string;
};

export type NextUpContent = Timed & {
  label: string;
  text: string;
  cta: LinkRef;
};

export type AboutContent = {
  headline: string;
  headlineHighlight: string;
  /** A small label over the body. Home leaves it out. */
  label?: string;
  body: string;
  link: LinkRef;
  image?: ImageRef;
};

export type PathCard = {
  /** One entry per line of the poster headline. */
  title: string[];
  /** Sets the headline in the surface highlight color. */
  titleHighlight?: boolean;
  cta: string;
  href: string;
  surface: Surface;
  image?: ImageRef;
};

export type PathsContent = { headline: string; lede: string; cards: PathCard[] };

export type EventTag = "virtual" | "in-person" | "linkedin-live" | "open" | "invite-only";

export type HomeEvent = Timed & {
  id: string;
  title: string;
  description: string;
  /** Machine tags: what the filter chips match on. */
  tags: EventTag[];
  /** The bracketed labels shown on the row, exactly as designed. */
  meta: string[];
  /** Replaces the weekday and date drawn from startsAt. */
  dateLabel?: { eyebrow: string; value: string };
  image?: ImageRef;
  /** Sign-up link for this event. */
  signup: LinkRef;
  /** Set to keep the event off the page. Say why. */
  hidden?: string;
};

export type EventsContent = {
  headline: string;
  note: string;
  filterLabel: string;
  filters: { id: "all" | EventTag; label: string }[];
  events: HomeEvent[];
  empty: { text: string; reset: string };
  calendar: LinkRef;
};

export type ProgramTag = { label: string; hideAfter?: string };

export type Program = {
  title: string;
  description: string;
  tags: ProgramTag[];
  cta: LinkRef;
  image?: ImageRef;
};

export type ProgramsContent = {
  headline: string;
  promise: { title: string; note: string; body: string };
  programs: Program[];
  more: { label: string; links: LinkRef[] };
};

export type ImpactContent = {
  headline: string;
  stats: { value: string; text: string }[];
  quote: { label: string; text: string; attribution: string; link: LinkRef; image?: ImageRef };
};

export type FilmContent = {
  headline: string;
  body: string;
  label: string;
  play: { label: string; href: string };
  /** Still frame for the film. Without it the play button sits with the copy. */
  poster?: ImageRef;
};

export type PartnersStripContent = { label: string; ariaLabel: string; logos: LogoRef[] };

export type PartnerCtaContent = {
  headline: string;
  columns: { label: string; title: string; body: string; cta: LinkRef; image?: ImageRef }[];
};

export type SignupContent = {
  ariaLabel: string;
  sentence: {
    intro: string;
    name: { label: string; placeholder: string };
    want: string;
    interest: { label: string; options: string[] };
    place: string;
    city: { label: string; placeholder: string };
    /** Punctuation that closes the first sentence. Stays attached to the city field. */
    cityEnd: string;
    write: string;
    language: { label: string; options: string[] };
    at: string;
    email: { label: string; placeholder: string };
    end: string;
  };
  submit: string;
  note: string;
  subscribe: SubscribeConfig;
  messages: FormMessages;
  /** Decorative sticker that overlaps the footer. */
  sticker?: ImageRef;
};

export type FooterContent = {
  logo: { src: string; alt: string; width: number; height: number };
  tagline: string;
  navLabel: string;
  columns: { title: string; links: LinkRef[] }[];
  legal: string[];
};

/** What every v0.1 page carries besides its own sections. */
export type PageChrome = {
  header: HeaderContent;
  footer: FooterContent;
};

export type HomeContent = {
  header: HeaderContent;
  hero: HeroContent;
  nextUp: NextUpContent;
  about: AboutContent;
  paths: PathsContent;
  events: EventsContent;
  programs: ProgramsContent;
  impact: ImpactContent;
  film: FilmContent;
  partners: PartnersStripContent;
  partnerCta: PartnerCtaContent;
  signup: SignupContent;
  footer: FooterContent;
};
