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
  /** The six month report inside the site frame. Kept under /en so the visitor never leaves the English site. */
  impactReport: "/en/impact-report",
  events: "/en/events", // S-Events
  signup: "/en/sign-up", // S-Signup
  story: "/en/about", // S-About
  team: "/en/about#team", // S-About, where the link is about people
  /** Hidden for now (Mica, 2026-11-23): the route sends people to the impact report. */
  impact: "/en/impact", // S-Impact
  news: "/en/news", // S-News
  partner: "/en/partners", // S-Partner
  donate: "/en/donate", // S-Donate
  beyondReady: "/en/field-ready", // S-BeyondReady
  centers: "/en/beyond-code-centers", // S-Centers
  beyondTheGame: "/en/beyond-the-game", // S-BeyondTheGame
  codeAlong: "/en/code-along", // S-CodeAlong
  // NOT IN DESIGN: three doors visitors asked for and could not find (run 6, 2026-11-27).
  volunteer: "/en/volunteer",
  contact: "/en/contact",
  beyondTheMusic: "/en/beyond-the-music",
  spanish: "/es",
} as const;

/**
 * Sign-up that remembers what the visitor picked: an event id from Home or
 * Events, or one of the program keys in content/signupContext.ts.
 */
export const signupFor = (key: string) => `${routes.signup}?for=${key}`;

/** How to reach the team. One copy, used by the footer, Contact and the forms. */
export const contactFacts = {
  phone: { label: "510-398-0880", href: "tel:+15103980880" },
  email: { label: "info@wearebcc.org", href: "mailto:info@wearebcc.org" },
  address: ["1714 Franklin Street, Suite 100", "Oakland, CA 94612"],
  nonprofit: "501(c)(3) nonprofit · EIN 39-4554736",
} as const;

/** S-Article: one news post. */
export const articleRoute = (slug: string) => `/en/news/${slug}`;

/** The primary nav items a page can mark as current. */
export type NavKey = "Programs" | "Events" | "Impact" | "About" | "Hire & partner" | "Donate";

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
          { title: "Beyond Centers", description: "Learn in person, every generation", href: routes.centers },
          { title: "Beyond the Game", description: "For athletes moving into tech", href: routes.beyondTheGame },
          { title: "Beyond the Music", description: "For artists and music professionals", href: routes.beyondTheMusic },
          { title: "Code Along Beyond", description: "Free video lessons on YouTube", href: routes.codeAlong },
        ],
      },
      { label: "Events", href: routes.events },
      { label: "Impact", href: routes.impactReport },
      {
        label: "About",
        href: routes.story,
        children: [
          { title: "Our story", description: "Why we exist and what we do", href: routes.story },
          { title: "Team", description: "The people behind Beyond Code", href: routes.team },
          { title: "Impact", description: "Results so far", href: routes.impactReport },
          { title: "News", description: "Stories, updates and press", href: routes.news },
          { title: "Volunteer", description: "Mentor, teach or help at an event", href: routes.volunteer },
          { title: "Contact", description: "Phone, email and mailing address", href: routes.contact },
        ],
      },
      // NOT IN DESIGN: a plain link. Its menu items nearly all led to this one page (Mica, 2026-11-23).
      { label: "Hire & partner", href: routes.partner },
    ],
    languages: [
      { code: "EN", lang: "en", href: routes.top, current: true },
      { code: "ES", lang: "es", href: opts.spanishHref ?? routes.spanish },
    ],
    cta: { label: "Sign up", href: routes.signup },
    // NOT IN DESIGN: visitors read the small Donate link in the yellow bar as decoration (run 6, 2026-11-27).
    donate: { label: "Donate", href: routes.donate, current: opts.current === "Donate" },
    campaign: "Who’s coding your future?",
    languagesLabel: "Language",
    // NOT IN DESIGN: phone visitors could not find these behind Menu (reruns, 2026-11-25 and 2026-11-27).
    quickLinks: [
      { label: "Donate", href: routes.donate },
      { label: "Volunteer", href: routes.volunteer },
      { label: "News", href: routes.news },
      { label: "Contact", href: routes.contact },
    ],
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
      // NOT IN DESIGN: Programs and the Support column were added after visitors missed Donate, Hire and Contact here (rerun, 2026-11-25).
      {
        title: "Explore",
        links: [
          { label: "Programs", href: routes.homePrograms },
          { label: "Events", href: routes.events },
          { label: "Impact report", href: routes.impactReport },
          { label: "News", href: routes.news },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Donate", href: routes.donate },
          { label: "Hire & partner", href: routes.partner },
          { label: "Volunteer", href: routes.volunteer },
          { label: "Contact us", href: routes.contact },
        ],
      },
      {
        title: "Beyond",
        links: [
          { label: "About", href: routes.story },
          { label: "Team", href: routes.team },
          { label: "Instagram", href: "https://www.instagram.com/beyondcodecollective", external: true },
          { label: "LinkedIn", href: "https://www.linkedin.com/company/beyond-code-collective", external: true },
        ],
      },
    ],
    // NOT IN DESIGN: phone, email, address and EIN were only inside the partner form and on Donate (run 6, 2026-11-27).
    contact: {
      title: "Contact",
      phone: contactFacts.phone,
      email: contactFacts.email,
      address: [...contactFacts.address],
    },
    legal: ["© 2026 Beyond Code Collective", contactFacts.nonprofit],
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