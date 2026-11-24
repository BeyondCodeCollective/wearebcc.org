import type { PartnerPageContent } from "./partner.types";
import { routes, siteFooter, siteHeader } from "./site";

const IMG = "/images/v01";

/**
 * Partner (Hire & partner), v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Partner-7sg4.dc.html.
 *
 * Not from the design: the Send button. The design has no backend for the contact
 * form, so Send opens the visitor's mail app with the fields filled in, addressed to
 * the partnerships address the design prints.
 * MISSING FILE (/_blob/ in the design): the decorative sticker on the contact section.
 */
export const partner: PartnerPageContent = {
  header: siteHeader({ current: "Hire & partner" }),
  footer: siteFooter(),

  hero: {
    breadcrumb: {
      ariaLabel: "Breadcrumb",
      home: { label: "Home", href: routes.home },
      current: "Hire & partner",
    },
    headline: ["Build", "with us."],
    lede: "Hire our graduates, bring a program to your people, or fund the next cohort.",
  },

  company: {
    headline: "In good company.",
    promise: { title: "Free to learners", note: "Thanks to our partners" },
    logos: [
      { src: `${IMG}/logos/take-two.png`, alt: "Take-Two Interactive", width: 500, height: 420, maxHeight: 56 },
      { src: `${IMG}/logos/zapier.png`, alt: "Zapier", width: 800, height: 221, maxHeight: 40 },
      { src: `${IMG}/logos/nextera.png`, alt: "NextEra Energy", width: 224, height: 103, maxHeight: 56 },
      { src: `${IMG}/logos/nba-foundation.png`, alt: "NBA Foundation", width: 800, height: 382, maxHeight: 52 },
      { src: `${IMG}/logos/atdc.png`, alt: "Georgia Tech ATDC", width: 379, height: 181, maxHeight: 56 },
      { src: `${IMG}/logos/waymo.png`, alt: "Waymo", width: 766, height: 413, maxHeight: 52 },
      { src: `${IMG}/logos/serpentine.png`, alt: "Serpentine Galleries", width: 1074, height: 228, maxHeight: 40 },
      { src: `${IMG}/logos/ibm.png`, alt: "IBM", width: 467, height: 179, maxHeight: 40 },
      {
        src: `${IMG}/logos/worksource-georgia.png`,
        alt: "Atlanta Regional Workforce Board, WorkSource Georgia",
        width: 300,
        height: 238,
        maxHeight: 64,
      },
    ],
  },

  who: {
    headline: "I’m…",
    groupLabel: "Who you are",
    initial: "employer",
    audiences: [
      {
        key: "employer",
        label: "HIRING",
        head: "Hire our graduates.",
        body: "Connect with multi-hyphenate, highly skilled people who know how to build and iterate with AI.",
        // NOT IN DESIGN as a destination: the design links every CTA to the in-page contact form.
        cta: { label: "Talk to our talent team", href: "#contact" },
        image: { src: `${IMG}/hire.jpg`, alt: "", position: "center 30%" },
      },
      {
        key: "team",
        label: "UPSKILLING A TEAM",
        head: "Build a Beyond Ready for your team.",
        body: "Bring Beyond Ready to your own staff, so your team can learn to build and work with AI in their roles using your company's context.",
        cta: { label: "Talk to us about your team", href: "#contact" },
        image: { src: `${IMG}/partner.jpg`, alt: "", position: "center 30%" },
      },
      {
        key: "board",
        label: "A WORKFORCE AGENCY",
        head: "Localize it for your region.",
        body: "Adapt Beyond Ready to your learners and your local labor market, and run it alongside us. Together we can explore registered apprenticeships, from AI to cybersecurity, and build toward your state’s workforce requirements.",
        cta: { label: "Talk to us", href: "#contact" },
        image: {
          src: `${IMG}/partner-agency.jpg`,
          alt: "A smiling man in a pinstripe suit greeting a woman across a desk",
          position: "center 30%",
        },
      },
      {
        key: "campus",
        label: "A college or school",
        head: "Bring a program or a center to your school.",
        body: "Picture Code Along Beyond on offer for an after school club, or a Beyond Center on your college campus where the neighborhood walks in too.  We start by listening, then build alongside your team, shaping the work with your students, your faculty and the community around you, so it belongs to the people it is for.",
        cta: { label: "Talk to us about your school", href: "#contact" },
        image: { src: `${IMG}/partner-school.jpg`, alt: "", position: "center 30%" },
      },
      {
        key: "funder",
        label: "A funder",
        head: "Keep every seat free.",
        body: "Fund a cohort, a Center residency, or a season, so builders can focus on creating the future.",
        cta: { label: "Fund a program", href: "#contact" },
        image: { src: `${IMG}/circle-looking-up.jpg`, alt: "", position: "center 30%" },
      },
    ],
  },

  contact: {
    id: "contact",
    headline: ["Tell us what", "you need."],
    intro: [
      "We route it to the right person. Or email ",
      { label: "partnerships@wearebcc.org", href: "mailto:partnerships@wearebcc.org" },
      " or call ",
      { label: "510-398-0880", href: "tel:+15103980880" },
      ".",
    ],
    address: ["Beyond Code Collective", "1714 Franklin Street, Suite 100", "Oakland, CA 94612"],
    form: {
      ariaLabel: "Contact the partnerships team",
      name: { id: "p-name", name: "name", label: "Name" },
      organization: { id: "p-org", name: "organization", label: "Organization" },
      email: { id: "p-email", name: "email", label: "Work email", placeholder: "you@company.com" },
      want: {
        id: "p-want",
        name: "want",
        label: "I want to…",
        options: ["Hire graduates", "Bring a program to my community", "Sponsor a program", "Ask a press question"],
      },
      message: { id: "p-msg", name: "message", label: "Message" },
      submit: "Send",
      subscribe: { endpoint: "/api/subscribe", source: "partner-v01" },
      // NOT IN DESIGN: the design shows no sent or failed state for this form.
      messages: {
        success: "Message sent.",
        successBody: "The partnerships team will reply by email.",
        error: "Something went wrong. Please try again, or email partnerships@wearebcc.org.",
      },
    },
  },
};
