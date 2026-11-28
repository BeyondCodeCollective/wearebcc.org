import type { CentersPageContent } from "./centers.types";
import { stickers } from "./stickers";
import { routes, siteFooter, siteHeader } from "./site";

const IMG = "/images/v01";

/**
 * Centers, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Centers-e17q.dc.html.
 */
export const centers: CentersPageContent = {
  header: siteHeader({ spanishHref: "/es/beyond-code-centers" }),
  footer: siteFooter(),
  hero: {
    sticker: stickers.globe,
    breadcrumb: [
      { label: "Home", href: routes.home },
      { label: "Programs", href: routes.homePrograms },
      { label: "Beyond Centers" },
    ],
    headline: [{ text: "One room." }, { text: "Every generation.", highlight: true }],
    lede: "Beyond Centers are free, in-person hubs where an 8-year-old and his grandmother learn about tech at the same table.",
    primary: { label: "See upcoming sessions", href: routes.events },
    secondary: { label: "Join a Center", href: "#join" },
    // NOT IN DESIGN: churches and city staff could not find how to host (rerun, 2026-11-26).
    host: { label: "Host a Center", href: `${routes.partner}#contact` },
  },
  locations: {
    headline: "Where we are.",
    // NOT IN DESIGN: the design lists city names only. Visitors could not tell where to go or when
    // (21 of 200, 2026-11-27). The Atlanta host is from the Centers launch post. Its street address,
    // days and hours are not in the repo, so the row says they are being confirmed.
    cities: [
      {
        name: "Atlanta",
        status: "open",
        statusLabel: "Open",
        detail:
          "Hosted at North Star AI Labs, inside Georgia Tech’s Advanced Technology Development Center (ATDC). We are confirming this season’s days, hours and street address. Tell us you want to come and we will send them.",
        link: { label: "Get Atlanta dates", href: "#join" },
      },
      {
        name: "Los Angeles",
        status: "soon",
        statusLabel: "Soon",
        detail: "Not open yet. The opening date is still to be announced.",
        link: { label: "Tell me when it opens", href: "#join" },
      },
      {
        name: "New York",
        status: "soon",
        statusLabel: "Soon",
        detail:
          "Not open yet. The opening date is still to be announced. Until then we hold sessions in New York with Hudson Guild.",
        link: { label: "See New York sessions", href: routes.events },
      },
    ],
    elsewhere: [
      "Not near a Center? ",
      { label: "Live sessions", href: routes.events },
      " and ",
      { label: "Code Along Beyond", href: routes.codeAlong },
      " are online and free.",
    ],
  },
  inside: {
    headline: ["What happens", "inside."],
    promise: { title: "Free to learners", note: "Thanks to our partners" },
    stripsLabel: "What happens inside a Center",
    strips: [
      {
        title: "Lunch and Learn",
        text: "One-time sessions on AI, data, and everyday tools.",
        image: { src: `${IMG}/centers-lunch-learn.jpg`, alt: "Four people smiling and talking around a cafe table", position: "38% center" },
      },
      {
        title: "Cohorts",
        text: "Longer courses with an instructor and a project.",
        image: {
          src: `${IMG}/centers-cohorts-2.jpg`,
          alt: "A group of nine people posing together, two holding certificates of completion and one holding up a laptop",
          position: "33% center",
        },
        zoom: 1.27,
      },
      {
        title: "Families",
        text: "Caregivers and kids build side by side.",
        image: { src: `${IMG}/centers-families.jpg`, alt: "A father and his young son looking at a laptop together", position: "center 30%" },
      },
      {
        title: "Teens",
        text: "A weekly space to learn and build with peers.",
        image: {
          src: `${IMG}/centers-teens.jpg`,
          alt: "Five teens standing together in a school hallway, holding notebooks and bags",
          position: "center 40%",
        },
      },
    ],
  },
  stats: {
    stats: [
      { value: "100%", text: "of Atlanta learners taught what they learned to someone else.", surface: "cobalt" },
      { value: "80%", text: "feel more confident with technology. The other 20% already did.", surface: "lemon" },
    ],
  },
  quote: {
    // The design gives this portrait the alt text "[Placeholder portrait]", which is a note, so it is left empty.
    image: { src: `${IMG}/cathy.jpg`, alt: "", position: "center 25%" },
    // The design sets this in capitals. Sentence case reads faster at this length.
    text: "“This helped me understand technology in a more approachable way. It was inspiring to learn together, ask questions freely, and grow our confidence with tech as a community.”",
    attribution: "Cathy, ai fundamentals for Wisdom learners",
  },
  join: {
    id: "join",
    sticker: stickers.loop,
    headline: ["Pull up", "a chair."],
    body: "Tell us what you’re looking for and we’ll send dates near you.",
    email: { label: "Email address", placeholder: "you@example.com" },
    want: { label: "I want to…", options: ["Attend programming", "Volunteer", "Partner or sponsor", "Enroll my child"] },
    zip: { label: "ZIP code", placeholder: "Enter your ZIP code" },
    submit: "Sign up",
    subscribe: { endpoint: "/api/subscribe", source: "centers-v01" },
    // Not in the design: the same wording Home uses for its forms.
    messages: {
      success: "You're on the list.",
      successBody: "We'll be in touch as cohorts and Labs open up.",
      error: "Something went wrong. Please try again.",
    },
  },
  bring: { headline: "Bring a Center to your city.", cta: { label: "Partner with us", href: routes.partner } },
};
