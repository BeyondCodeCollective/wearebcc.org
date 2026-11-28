import type { SimplePageContent } from "./simple.types";
import { contactFacts, routes, siteFooter, siteHeader } from "./site";

/**
 * Contact, v0.1. NOT IN DESIGN: "Contact us" opened the employer form, and the
 * phone number and address were only on that page (run 6, 2026-11-27).
 * Every address and number here is already published elsewhere on the site.
 */
export const contact: SimplePageContent = {
  header: siteHeader({ current: "About" }),
  footer: siteFooter(),
  hero: {
    breadcrumb: { ariaLabel: "Breadcrumb", home: { label: "Home", href: routes.home }, current: "Contact" },
    headline: ["Talk", "to us."],
    lede: "Call or write. Pick the row that sounds like your question.",
  },
  actions: [
    { label: `Call ${contactFacts.phone.label}`, href: contactFacts.phone.href, variant: "ink" },
    { label: "Email us", href: contactFacts.email.href, variant: "ghost" },
  ],
  sections: [
    {
      headline: ["Who to", "write to."],
      items: [
        {
          kind: "link",
          title: "Learners and families",
          body: "Programs, sessions, sign-ups and anything you can’t find here.",
          link: contactFacts.email,
        },
        {
          kind: "link",
          title: "Partners and employers",
          body: "Hire graduates, bring a program to your people, or host a Center.",
          link: { label: "partnerships@wearebcc.org", href: "mailto:partnerships@wearebcc.org" },
        },
        {
          kind: "link",
          title: "Donors and funders",
          body: "Sponsorships, stock gifts, donor-advised funds and employer matching.",
          link: { label: "fundraising@wearebcc.org", href: "mailto:fundraising@wearebcc.org" },
        },
        {
          kind: "link",
          title: "Press",
          body: "Media questions go to our general inbox. The one-pager is on the News page.",
          link: contactFacts.email,
        },
        {
          kind: "link",
          title: "Volunteers",
          body: "Mentors, instructors and event support sign up through the volunteer portal.",
          link: { label: "Volunteer", href: routes.volunteer },
        },
      ],
    },
    {
      headline: ["Phone", "and post."],
      items: [
        { kind: "link", title: "Phone", body: contactFacts.phone.label, link: { label: "Call us", href: contactFacts.phone.href } },
        { kind: "text", title: "Office", body: `Beyond Code Collective, ${contactFacts.address.join(", ")}` },
        {
          kind: "link",
          title: "Sending a check?",
          body: "Checks go to a different address. It is on the Donate page.",
          link: { label: "Ways to give", href: `${routes.donate}#ways` },
        },
      ],
    },
  ],
  closing: { headline: "Want a program or a Center where you are?", cta: { label: "Partner with us", href: `${routes.partner}#contact` } },
};
