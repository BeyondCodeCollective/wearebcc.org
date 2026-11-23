import type { FooterContent, HeaderContent, LinkRef } from "./types";

/**
 * What every v0.1 page shares: the route map, the header and the footer.
 * Copy is taken exactly from the designs in docs/design/v0-1, where the header
 * and footer are the same on every page.
 */

const IMG = "/images/v01";

/**
 * Where each design page lives on this site. The designs link to each other
 * as S-<Name>.dc.html: the comment on each line names that file.
 * English only: Spanish keeps the current pages.
 */
export const routes = {
  home: "/en", // S-Home
  top: "#top",
  /** The all-programs page is gone: programs now means the programs section of Home. */
  homePrograms: "/en#programs", // S-Home, programs section
  /** Static page served by a middleware rewrite: plain same-site link, no locale prefix. */
  impactReport: "/impact-report",
  events: "/en/events", // S-Events
  signup: "/en/sign-up", // S-Signup
  story: "/en/about", // S-About
  team: "/en/about#team", // S-About, where the link is about people
  impact: "/en/impact", // S-Impact
  news: "/en/news", // S-News
  partner: "/en/partners", // S-Partner
  donate: "/en/donate", // S-Donate
  beyondReady: "/en/field-ready", // S-BeyondReady
  centers: "/en/beyond-code-centers", // S-Centers
  beyondTheGame: "/en/beyond-the-game", // S-BeyondTheGame
  codeAlong: "/en/code-along", // S-CodeAlong
  spanish: "/es",
} as const;

/** S-Article: one news post. */
export const articleRoute = (slug: string) => `/en/news/${slug}`;

/** The primary nav items a page can mark as current. */
export type NavKey = "Programs" | "Events" | "Impact" | "About" | "Hire & partner";

type HeaderOptions = {
  /** The nav item this page sits under, underlined in the header. */
  current?: NavKey;
  /** Where the logo goes. Home passes "#top". */
  homeHref?: string;
  /** The Spanish version of this page, when one exists. Defaults to the Spanish Home. */
  spanishHref?: string;
};

export function siteHeader(opts: HeaderOptions = {}): HeaderContent {
  const header: HeaderContent = {
    strip: [
      "Beyond Code Collective™ · Human-powered resources for a tech-driven world",
      "Free programs · Live sessions · Community",
    ],
    logo: { src: `${IMG}/bcc-logo-horizontal.svg`, width: 1047, height: 84 },
    homeLabel: "Beyond Code Collective, home",
    homeHref: opts.homeHref ?? routes.home,
    navLabel: "Primary",
    menuLabel: "Menu",
    nav: [
      {
        label: "Programs",
        href: routes.homePrograms,
        children: [
          { title: "Beyond Ready", description: "8 weeks to work with AI in any role", href: routes.beyondReady },
          { title: "Beyond Labs", description: "One free live workshop, one topic", href: routes.events },
          { title: "Beyond Centers", description: "Learn in person, every generation", href: routes.centers },
          { title: "Beyond the Game", description: "For athletes moving into tech", href: routes.beyondTheGame },
          { title: "Code Along Beyond", description: "Free video lessons on YouTube", href: routes.codeAlong },
        ],
      },
      { label: "Events", href: routes.events },
      { label: "Impact", href: routes.impact },
      {
        label: "About",
        href: routes.story,
        children: [
          { title: "Our story", description: "Why we exist and what we do", href: routes.story },
          { title: "Team", description: "The people behind Beyond Code", href: routes.team },
          { title: "Impact", description: "Results so far", href: routes.impact },
          { title: "News", description: "Stories and updates", href: routes.news },
        ],
      },
      {
        label: "Hire & partner",
        href: routes.partner,
        children: [
          { title: "Hire graduates", description: "Meet builders ready for work", href: routes.partner },
          { title: "Bring a program", description: "Run Beyond Ready for your people", href: routes.partner },
          { title: "Fund the work", description: "Keep every seat free", href: routes.donate },
          { title: "Contact us", description: "Tell us what you need", href: routes.partner },
        ],
      },
    ],
    languages: [
      { code: "EN", lang: "en", href: routes.top, current: true },
      { code: "ES", lang: "es", href: opts.spanishHref ?? routes.spanish },
    ],
    cta: { label: "Sign up", href: routes.signup },
  };
  if (!opts.current) return header;
  return {
    ...header,
    nav: header.nav.map((item) => (item.label === opts.current ? { ...item, current: true } : item)),
  };
}

type FooterOptions = {
  /** Links a page's design adds to the end of the last column. */
  extraLinks?: LinkRef[];
};

export function siteFooter(opts: FooterOptions = {}): FooterContent {
  const footer: FooterContent = {
    logo: { src: `${IMG}/bcc-logo-horizontal.svg`, alt: "Beyond Code Collective", width: 1047, height: 84 },
    tagline: "Human-powered resources for a tech-driven world.",
    navLabel: "Footer",
    columns: [
      {
        title: "Explore",
        links: [
          { label: "Events", href: routes.events },
          { label: "Impact report", href: routes.impactReport },
          { label: "News", href: routes.news },
        ],
      },
      {
        title: "Beyond",
        links: [
          { label: "About", href: routes.story },
          { label: "Team", href: routes.team },
          { label: "Contact", href: routes.partner },
          { label: "Instagram", href: "https://www.instagram.com/beyondcodecollective", external: true },
        ],
      },
    ],
    legal: ["© 2026 Beyond Code Collective", "[wearebcc.org]"],
  };
  if (!opts.extraLinks?.length) return footer;
  const last = footer.columns.length - 1;
  return {
    ...footer,
    columns: footer.columns.map((column, index) =>
      index === last ? { ...column, links: [...column.links, ...opts.extraLinks!] } : column,
    ),
  };
}
