import { DONATE_CAMPAIGN } from "@/lib/constants";
import type { DonatePageContent } from "./donate.types";
import { stickers } from "./stickers";
import { articleRoute, routes, siteFooter, siteHeader } from "./site";

const IMG = "/images/v01";

/**
 * Donate, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Donate-wdd7.dc.html.
 *
 * Hidden from the design (notes and stand-ins, not copy):
 * - the drawn Donorbox form mock-up and its caption "[The live Donorbox form embeds here...]":
 *   the live Donorbox widget takes its place, as on the current site;
 * - the sticky note "WHAT VIDEO?!" under the film.
 * Not from the design: the Donorbox campaign (from lib/constants, as on the current site).
 */
export const donate: DonatePageContent = {
  header: siteHeader({ current: "Hire & partner" }),
  footer: siteFooter(),

  give: {
    breadcrumb: {
      ariaLabel: "Breadcrumb",
      home: { label: "Home", href: routes.home },
      current: "Donate",
    },
    headline: ["Hold", "a seat."],
    tagline: "Free means somebody held that seat before the person who sat in it arrived.",
    body: ["Every seat in a Beyond Code room is free for learners.", "Your gift holds the next one."],
    trust:
      "Beyond Code Collective is a 501(c)(3) nonprofit. EIN 39-4554736. Gifts are tax-deductible to the extent allowed by law.",
    // NOT IN DESIGN: the design links to "#". This is the page the current site falls back to.
    fallback: {
      label: "Prefer Donorbox? Give there",
      href: `https://donorbox.org/${DONATE_CAMPAIGN}`,
      external: true,
    },
    donorbox: {
      campaign: DONATE_CAMPAIGN,
      scriptSrc: "https://donorbox.org/widgets.js",
      ariaLabel: "Donation form",
    },
  },

  statement: {
    sticker: stickers.loop,
    segments: [
      { text: "our community's support has already held " },
      { text: "510+ learners", tone: "cobalt" },
      { text: " in eight months. " },
      { text: "100%", tone: "forest" },
      { text: " of Beyond Centers learners passed their learnings on to someone else." },
    ],
  },

  video: {
    href: "https://www.youtube.com/watch?v=-JEj-7AS7Kc",
    ariaLabel: "Play the film on YouTube",
    image: { src: `${IMG}/video-thumb.jpg`, alt: "The Beyond Code cohort together", position: "center" },
    headline: ["See who", "you’re funding."],
    label: "Watch on YouTube",
  },

  ways: {
    headline: ["Other ways", "to give."],
    items: [
      {
        kind: "link",
        title: "Sponsor a program",
        body: "A cohort, a Center, or a season.",
        link: { label: "Partner with us", href: routes.partner },
      },
      {
        kind: "link",
        title: "Volunteer",
        body: "Tell us how you want to help. We follow up by email.",
        link: { label: "Volunteer", href: articleRoute("volunteer-with-bcc") },
      },
      {
        kind: "details",
        title: "Give by check or stock",
        paragraphs: [
          { text: ["Write a check made payable to Beyond Code Collective and send it to:"] },
          { lines: ["Beyond Code Collective", "P.O. Box 930958", "Atlanta, GA 31193-0958"] },
          {
            text: [
              "To give stock instead, email ",
              { label: "fundraising@wearebcc.org", href: "mailto:fundraising@wearebcc.org" },
              " for more information.",
            ],
          },
        ],
      },
      {
        kind: "details",
        title: "Donor-advised fund",
        paragraphs: [{ text: ["Send a gift from your fund: Beyond Code Collective, Tax ID 39-4554736."] }],
      },
      {
        kind: "details",
        title: "Employer match",
        paragraphs: [
          {
            text: [
              "Many employers match their employees’ gifts. Ask your HR team or check your company’s giving portal to find out whether yours does, and use Beyond Code Collective and Tax ID Number, 39-4554736, when you submit the request.",
            ],
          },
        ],
      },
    ],
  },

  questions: {
    headline: "Questions.",
    items: [
      {
        question: "Is my gift tax-deductible?",
        answer: "Yes, to the extent allowed by law. Beyond Code Collective is a 501(c)(3) nonprofit.",
      },
    ],
  },
};