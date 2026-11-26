import type { EventsPageContent, SessionEvent } from "./events.types";
import { home } from "./home";
import { stickers } from "./stickers";
import { routes, siteFooter, siteHeader } from "./site";

/**
 * Events, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-Events-u237.dc.html.
 */

const IMG = "/images/v01";
const to = routes;

/**
 * Start times, time zones and hide times are the Home page's, matched by id,
 * so the two pages can never disagree. NOT CONFIRMED.
 */
const homeEvents = home.events.events;
function timing(id: string) {
  const match = homeEvents.find((event) => event.id === id);
  if (!match) throw new Error(`Events: no Home event with id ${id}`);
  const { startsAt, timeZone, timeTbd, hideAfter, tags } = match;
  return { startsAt, timeZone, timeTbd, hideAfter, tags };
}

const sessions: SessionEvent[] = [
  {
    id: "older-adult-ai-lab-2026-12-02",
    ...timing("older-adult-ai-lab-2026-12-02"),
    title: "Older Adult AI Lab",
    description: "A friendly, hands-on start with AI for older adults.",
    meta: ["[In person]", "[New York]"],
    image: { src: `${IMG}/headphones.jpg`, alt: "", position: "center 42%" },
    signup: { label: "Save my free seat", href: to.signup },
    flyer: { tone: "green", tilt: 1.5, text: "A friendly, hands-on start with AI for older adults." },
  },
  {
    id: "dialogues-2026-12-04",
    ...timing("dialogues-2026-12-04"),
    title: "Beyond Code Dialogues",
    description: "We interview the builders, multi-hyphenates, and thinkers shaping our world.",
    descriptionTail: {
      lead: "Up next",
      rest: ": Dr. Brian Boyd, Executive Director, Frank Porter Graham Institute at University of North Carolina-Chapel Hill.",
    },
    meta: ["[Streamed on LinkedIn]", "[Virtual]", "[Open to the public]"],
    image: { src: `${IMG}/dialogues-boyd.jpg`, alt: "Dr. Brian Boyd", position: "center 20%" },
    signup: { label: "Save my free seat", href: to.signup },
    flyer: {
      tone: "cobalt",
      tilt: -1.5,
      text: "We interview the builders, multi-hyphenates, and thinkers shaping our world.",
    },
  },
  {
    id: "beyond-lab-2026-12-08",
    ...timing("beyond-lab-2026-12-08"),
    title: "Beyond Lab",
    description: "A live online workshop on AI and entrepreneurship.",
    meta: ["[Virtual]", "[Open to the public]"],
    image: { src: `${IMG}/labs.jpg`, alt: "", position: "center 20%" },
    signup: { label: "Save my free seat", href: to.signup },
    flyer: { tone: "lemon", tilt: 2, text: "A live online workshop on AI and entrepreneurship." },
  },
  {
    id: "beyond-ready-lab-2026-12-14",
    ...timing("beyond-ready-lab-2026-12-14"),
    title: "Beyond Ready Lab",
    // The design's list row has a typo ("progrmam"), corrected here.
    description:
      "A live online lab for learners really to gain applied AI skills and learn about the Beyond Ready program.",
    meta: ["[Virtual]", "[12:00 PM ET]"],
    image: { src: `${IMG}/field-ready.jpg`, alt: "", position: "center 25%" },
    signup: { label: "Save my free seat", href: to.signup },
    flyer: {
      tone: "crimson",
      tilt: -2,
      text: "A live online lab for Beyond Ready. [Topic to confirm]",
      hidden: "Flyer text still carries the design note [Topic to confirm].",
    },
  },
  {
    id: "beyond-lab-2027-01-12",
    ...timing("beyond-lab-2027-01-12"),
    title: "Beyond Lab",
    description: "A live online workshop on AI and entrepreneurship.",
    meta: ["[Virtual]", "[6:00–7:30 PM ET]"],
    image: { src: `${IMG}/labs.jpg`, alt: "", position: "center 20%" },
    signup: { label: "Save my free seat", href: to.signup },
    flyer: { tone: "peach", tilt: 1.5, text: "A live online workshop on AI and entrepreneurship." },
  },
  {
    id: "beyond-ready-2027-01",
    ...timing("beyond-ready-2027-01"),
    title: "Beyond Ready",
    description: "Eight weeks to learn to work with AI in the job you already have.",
    // The design says only "Starts Jan".
    dateLabel: { eyebrow: "Starts", value: "Jan" },
    meta: ["[8 weeks]", "[Any role]"],
    image: { src: `${IMG}/field-ready.jpg`, alt: "", position: "center 25%" },
    signup: { label: "Join the waitlist", href: to.beyondReady },
    flyer: {
      tone: "cobalt",
      tilt: -1.5,
      text: "Eight weeks to learn to work with AI in the job you already have.",
    },
  },
];

export const events: EventsPageContent = {
  header: siteHeader({ current: "Events" }),
  footer: siteFooter({
    extraLinks: [
      { label: "YouTube", href: "https://www.youtube.com/@BeyondCodeCollective", external: true },
    ],
  }),
  hero: {
    breadcrumbLabel: "Breadcrumb",
    breadcrumb: [{ label: "Home", href: to.home }, { label: "Events" }],
    headline: "JOIN A SESSION.",
    lede: "Pick one (or two!) and save your spot.",
    note: "Always no cost to you, thanks to our partners.",
    boardLabel: "Upcoming sessions, pinned like flyers on a board",
  },
  sessions,
  list: {
    sticker: stickers.arrows,
    filterLabel: "Filter events",
    filters: home.events.filters,
    // NOT IN DESIGN: the design has no empty state. Reused from Home.
    empty: home.events.empty,
  },
  archive: {
    headline: "SOME PAST HIGHLIGHTS.",
    events: [
      {
        id: "dialogues-morey-2026-11-09",
        title: "Beyond Code Dialogues with Dr. José Morey",
        description: "A highlight from our conversation series.",
        meta: ["[Dialogues]", "[LinkedIn]"],
        dateLabel: { eyebrow: "Mon", value: "Nov 9" },
        image: { src: `${IMG}/dialogues-host.jpg`, alt: "", position: "center" },
        cta: {
          label: "Tune in",
          href: "https://www.linkedin.com/posts/beyondcodedialogues-healthtech-aiinhealthcare-ugcPost-7521236925752438786-30st/",
          external: true,
        },
      },
      {
        id: "music-lab-2026-11-19",
        title: "Beyond the Music Lab",
        description: "A lab for musicians. [Descriptor to confirm]",
        meta: ["[Musicians]", "[Virtual]"],
        dateLabel: { eyebrow: "Thu", value: "Nov 19" },
        image: { src: `${IMG}/studio-desk.jpg`, alt: "" },
        cta: { label: "Read the story", href: to.news },
        hidden: "Description still carries the design note [Descriptor to confirm].",
      },
      {
        id: "future-cod3rs-camp-2026-06",
        title: "Future Cod3rs Camp",
        description:
          "A 2-week summer camp for youth ages 10 to 14 in Puerto Rico, delivered with Holberton Coding School.",
        meta: ["[Youth 10–14]", "[Puerto Rico]", "[2 weeks]"],
        dateLabel: { eyebrow: "Summer '26", value: "June" },
        // The design shows a "[Photo]" stand-in here: left empty.
        image: undefined,
        cta: { label: "Read the story", href: to.news },
      },
      {
        id: "beyond-the-game-launch-2026-04",
        title: "Beyond the Game Launch",
        description: "The first cohort begins, with its first group of athletes growing their tech skills.",
        meta: ["[Athletes]", "[First cohort]"],
        dateLabel: { eyebrow: "Spring '26", value: "April" },
        // The design shows a "[Photo]" stand-in here: left empty.
        image: undefined,
        cta: { label: "Read the story", href: to.news },
      },
    ],
  },
  neverMiss: {
    headline: ["Never miss", "a session."],
    label: "Email address",
    placeholder: "you@example.com",
    submit: "Sign up",
    subscribe: { endpoint: "/api/subscribe", source: "events-v01" },
    // NOT IN DESIGN: the design has no success or error state. Reused from Home.
    messages: home.hero.form.messages,
  },
};