import type { SimplePageContent } from "./simple.types";
import { contactFacts, routes, siteFooter, siteHeader } from "./site";

/**
 * Volunteer, v0.1. NOT IN DESIGN: the design has no volunteer page, and the
 * Volunteer links opened a dated news post (run 6, 2026-11-27).
 * Every fact is from that post (volunteer-with-bcc) and from "There's a Seat for You".
 */

const PORTAL = "https://beyondcodecollectiveinc.my.salesforce-sites.com";

export const volunteer: SimplePageContent = {
  header: siteHeader({ current: "About", spanishHref: "/es/news/volunteer-with-bcc" }),
  footer: siteFooter(),
  hero: {
    breadcrumb: { ariaLabel: "Breadcrumb", home: { label: "Home", href: routes.home }, current: "Volunteer" },
    headline: ["Give", "an hour."],
    lede: "Beyond Code Collective runs on people who show up: mentors, instructors, event support, and everyone in between.",
  },
  actions: [
    { label: "Sign up to volunteer", href: `${PORTAL}/BCCVolunteersSignupFS`, external: true, variant: "ink" },
    { label: "Browse open roles", href: `${PORTAL}/BCCVolunteersJobListingFS`, external: true, variant: "ghost" },
  ],
  sections: [
    {
      headline: ["What you", "can do."],
      items: [
        {
          kind: "text",
          title: "Mentor",
          body: "Run a mock interview or host an informational interview. An hour of your working life is worth more to someone changing careers than you’d guess.",
        },
        { kind: "text", title: "Speak or teach", body: "Speak to a cohort, or join as an instructor." },
        { kind: "text", title: "Support an event", body: "Help out at a live session." },
      ],
    },
    {
      id: "portal",
      headline: ["The volunteer", "portal."],
      items: [
        {
          kind: "link",
          title: "New here?",
          body: "Start with the signup page to join our volunteer community.",
          link: { label: "Volunteer signup", href: `${PORTAL}/BCCVolunteersSignupFS`, external: true },
        },
        {
          kind: "link",
          title: "Find a role",
          body: "Browse the listings for a role that fits your skills and schedule.",
          link: { label: "Job listings", href: `${PORTAL}/BCCVolunteersJobListingFS`, external: true },
        },
        {
          kind: "link",
          title: "Log your time",
          body: "Report your hours after every session. They help us show funders and partners what this community does.",
          link: { label: "Report hours", href: `${PORTAL}/BCCVolunteersReportHours`, external: true },
        },
        {
          kind: "link",
          title: "Your record",
          body: "Look up your volunteer contact record.",
          link: { label: "Contact lookup", href: `${PORTAL}/BCCPersonalSiteContactLookup`, external: true },
        },
      ],
    },
    {
      headline: ["Not sure", "yet?"],
      items: [
        {
          kind: "link",
          title: "Ask us first",
          body: `Call ${contactFacts.phone.label} or write to ${contactFacts.email.label}.`,
          link: { label: "Contact us", href: routes.contact },
        },
        {
          kind: "link",
          title: "Bring a program to your group",
          body: "If your company, campus, league, community group or city wants a Beyond Code program or Center, we build it with you.",
          link: { label: "Partner with us", href: `${routes.partner}#contact` },
        },
      ],
    },
  ],
  closing: { headline: "Every hour helps us bring free tech education to more learners.", cta: { label: "See what we run", href: routes.homePrograms } },
};
