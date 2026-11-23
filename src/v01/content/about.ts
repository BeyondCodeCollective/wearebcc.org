import type { AboutPageContent } from "./about.types";
import { routes, siteFooter, siteHeader } from "./site";

const IMG = "/images/v01";

/**
 * About, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-About-yep3.dc.html.
 *
 * Copy kept as the design has it, for the team to confirm:
 * - "ORPORATE DEVELOPMENT" (Kenya Lloyd's role) looks like a missing "C".
 * - "Linda Ackha-Mensah" may be a misspelling of "Ackah" (her LinkedIn URL says ackah).
 */
export const about: AboutPageContent = {
  header: siteHeader({ current: "About" }),
  footer: siteFooter(),

  hero: {
    breadcrumb: { homeLabel: "Home", homeHref: routes.home, current: "About" },
    headline: ["Pull up a chair.", "There’s room", "for everyone."],
    lede: "Beyond Code Collective is where grandparents, parents, teens and career-changers learn side by side. Free, in person and online, and always with people who have your back.",
    mission: {
      label: "Our mission:",
      body: "build intergenerational access in the technologies of today and tomorrow.",
    },
    link: { label: "Meet the team", href: "#team" },
    photos: [
      { src: `${IMG}/smiling-group.jpg`, alt: "Three generations laughing together" },
      { src: `${IMG}/cathy.jpg`, alt: "A smiling woman in pink", position: "center 15%" },
      { src: `${IMG}/about-hero-pair.jpg`, alt: "Two colleagues looking at a laptop together" },
      {
        src: `${IMG}/about-study-table.jpg`,
        alt: "Two women studying together at an outdoor table",
        position: "center 20%",
      },
    ],
  },

  // HIDDEN, design note: the play button and "Watch · [length TBC]" label, and the "#" video link.
  founder: {
    ariaLabel: "A message from our founder",
    label: "[ In her words ]",
    aside: "A message from our founder",
    image: {
      src: `${IMG}/voice-cristina.jpg`,
      alt: "Cristina Mancini speaking at a Beyond Code event",
      position: "center 30%",
    },
    quote: "“It's people, not tech, who build the future.”",
    name: "Cristina Mancini",
    role: "Founder & CEO",
  },

  whatWeDo: {
    headline: ["What", "we do."],
    lede: "Three jobs. Every program does at least one.",
    cards: [
      {
        surface: "cobalt",
        image: { src: `${IMG}/wwd-class.jpg`, alt: "Learners in a Beyond Code class", position: "center 40%" },
        title: "Demystify AI",
        number: "[ 01 ]",
        body: "Free, hands-on sessions so anyone can use AI with confidence.",
        links: [
          { label: "Beyond Labs", href: routes.events },
          { label: "Code Along Beyond", href: routes.codeAlong },
        ],
      },
      {
        surface: "lemon",
        image: {
          src: `${IMG}/wwd-builder.jpg`,
          alt: "A young builder holding up a robot he made",
          position: "center 30%",
        },
        title: "Build on-ramps",
        number: "[ 02 ]",
        body: "Clear paths from curiosity to a career.",
        links: [
          { label: "Beyond Ready", href: routes.beyondReady },
          { label: "Beyond Centers", href: routes.centers },
        ],
      },
      {
        surface: "forest",
        image: {
          src: `${IMG}/about-group-laptops.jpg`,
          alt: "Three people laughing together around a table with laptops",
          position: "center 35%",
        },
        title: "Close the gap",
        number: "[ 03 ]",
        body: "Certifications, employer partners, and support into work.",
        links: [
          { label: "Beyond the Game", href: routes.beyondTheGame },
          { label: "Hire & partner", href: routes.partner },
        ],
      },
    ],
  },

  whyHere: {
    label: "[ Why we’re here ]",
    statement: {
      before: "We teach people how to",
      highlight: "think",
      after: "with AI, not simply how to use it.",
    },
    columns: [
      {
        title: "The problem",
        body: "Technology is reshaping nearly every industry, and powerful tools are reaching people faster than the knowledge, context and support needed to use them well. AI is one of those tools, not the whole story.",
      },
      {
        title: "What we built",
        body: "Free programs, live sessions and community for every generation, in person and online, with lifelong access as technology keeps changing. Learning is stronger together, and trust is built through place and relationships.",
      },
    ],
    image: {
      src: `${IMG}/about-why-here.jpg`,
      alt: "Two women smiling at a table in a Beyond Code room",
      position: "42% center",
    },
    badge: { title: "Free to learners", note: "Thanks to our partners" },
  },

  team: {
    id: "team",
    headline: "The team.",
    listLabel: "The team, pinned like flyers on a board",
    // The design shows no slide buttons, only their logic. These two labels are new, for screen readers.
    prevLabel: "Show previous team members",
    nextLabel: "Show more team members",
    members: [
    {
      name: "Cristina Mancini",
      role: "Founder & CEO",
      href: "https://www.linkedin.com/in/crisbmancini/",
      linkLabel: "Cristina Mancini on LinkedIn",
      image: { src: `${IMG}/team-cristina-headshot.jpg`, alt: "Cristina Mancini", position: "center 15%" },
      tone: "peach-warm",
      tilt: -2,
    },
    {
      name: "Mica Le John",
      role: "Executive Director",
      href: "https://www.linkedin.com/in/micalejohn/",
      linkLabel: "Mica Le John on LinkedIn",
      image: { src: `${IMG}/team-mica.jpg`, alt: "Mica Le John", position: "center 20%" },
      tone: "lemon",
      tilt: 1.5,
    },
    {
      name: "Ramon Clemente",
      role: "BEYOND THE GAME",
      href: "https://www.linkedin.com/in/ramonclemente1/",
      linkLabel: "Ramon Clemente on LinkedIn",
      image: { src: `${IMG}/ramon.jpg`, alt: "Ramon Clemente", position: "center 20%" },
      tone: "forest",
      tilt: -1.5,
    },
    {
      name: "Jihan Johnston-McGlotten",
      role: "CENTERS, ATL",
      href: "https://www.linkedin.com/in/jihanj/",
      linkLabel: "Jihan Johnston-McGlotten on LinkedIn",
      image: { src: `${IMG}/team-jihan.jpg`, alt: "Jihan Johnston-McGlotten", position: "center 15%" },
      tone: "cream",
      tilt: 2,
    },
    {
      name: "Chris Fogelman",
      role: "FINANCE & OPERATIONS",
      href: "https://www.linkedin.com/in/chrisfogelman/",
      linkLabel: "Chris Fogelman on LinkedIn",
      image: { src: `${IMG}/team-chris.jpg`, alt: "Chris Fogelman", position: "center 25%" },
      tone: "crimson",
      tilt: -2,
    },
    {
      name: "Fonz Morris",
      role: "PRODUCT",
      href: "https://www.linkedin.com/in/fonzmorris/",
      linkLabel: "Fonz Morris on LinkedIn",
      image: { src: `${IMG}/team-fonz.jpg`, alt: "Fonz Morris", position: "center 20%" },
      tone: "peach-warm",
      tilt: 1.5,
    },
    {
      name: "Kenya Lloyd",
      role: "ORPORATE DEVELOPMENT",
      href: "https://www.linkedin.com/in/kenya-lloyd-mba-99b5903/",
      linkLabel: "Kenya Lloyd on LinkedIn",
      image: { src: `${IMG}/team-kenya.jpg`, alt: "Kenya Lloyd", position: "center 20%" },
      tone: "lemon",
      tilt: -1.5,
    },
    {
      name: "Devin Cooper",
      role: "PROGRAMS ENABLEMENT",
      href: "https://www.linkedin.com/in/devncooper/",
      linkLabel: "Devin Cooper on LinkedIn",
      image: { src: `${IMG}/team-devin.jpg`, alt: "Devin Cooper", position: "center 25%" },
      tone: "forest",
      tilt: 2,
    },
    {
      name: "Danielle Dougherty",
      role: "INSTITUTIONAL GRANTS",
      href: "https://www.linkedin.com/in/danielledougherty/",
      linkLabel: "Danielle Dougherty on LinkedIn",
      image: { src: `${IMG}/team-danielle.jpg`, alt: "Danielle Dougherty", position: "center 20%" },
      tone: "cream",
      tilt: -2,
    },
    {
      name: "Ryan Fawkes",
      role: "DATA SYSTEMS, REPORTING & ENABLEMENT",
      href: "https://www.linkedin.com/in/ryanfawkes/",
      linkLabel: "Ryan Fawkes on LinkedIn",
      image: { src: `${IMG}/team-ryan.jpg`, alt: "Ryan Fawkes", position: "center 20%" },
      tone: "crimson",
      tilt: 1.5,
    },
    {
      name: "Linda Ackha-Mensah",
      role: "Ecosystem Fellow",
      href: "https://www.linkedin.com/in/linda-ackah-mensah/",
      linkLabel: "Linda Ackha-Mensah on LinkedIn",
      image: { src: `${IMG}/team-linda.jpg`, alt: "Linda Ackha-Mensah", position: "center 20%" },
      tone: "peach-warm",
      tilt: -1.5,
    },
    {
      name: "Tanesha Fuller",
      role: "Data & Impact Fellow",
      href: "https://www.linkedin.com/in/tanesha-fuller-125661222/",
      linkLabel: "Tanesha Fuller on LinkedIn",
      image: { src: `${IMG}/team-tanesha.jpg`, alt: "Tanesha Fuller", position: "center 20%" },
      tone: "lemon",
      tilt: 2,
    },
    ],
  },

  board: {
    id: "board",
    headline: "Board of directors.",
    members: [
      { name: "Mashea Ashton", role: "Founder & Chief Executive Officer, Digital Pioneers Academy" },
      { name: "John Herbert", role: "CIO & EVP, Enterprise and Media Technology, Fox Corporation" },
      { name: "Lisa Serwin", role: "Corporate Executive and Entrepreneur" },
      { name: "Neeracha Taychakhoonavudh", role: "Chief Customer Experience Officer, Udemy" },
    ],
  },

  council: {
    headline: "Tech Futures National Council.",
    lede: "Advisors from industry, community and academia who help shape what we do and how we do it.",
    members: [
      { name: "Darrell Booker", affiliation: "Seven and Grace" },
      { name: "Jennifer Clark", affiliation: "YouTube" },
      { name: "Sofía De Jesus", affiliation: "UT Austin" },
      { name: "Christopher Douglas", affiliation: "Xbox" },
      { name: "Stephanie Herrera", affiliation: "Tech Strategy" },
      { name: "Mark Stephen Meadows", affiliation: "NASA" },
      { name: "Brandon Middleton", affiliation: "Replit" },
      { name: "Dr. José Morey", affiliation: "Ad Astra Media" },
      { name: "Max Murphy", affiliation: "AI Technologist" },
    ],
  },

  // The design's "#" download link points at the six-month report already in /public.
  report: {
    id: "report",
    coverTop: "Beyond Code Collective · 2026",
    coverTitle: ["There’s a", "seat for you."],
    coverBottom: "Six-month report",
    headline: "The report.",
    paragraphs: ["The first six months.", "Who came through the door, what they built, and what we learned."],
    cta: { label: "Download the report", href: "/impact-report.html", external: true },
  },

  build: {
    headline: "Build with us.",
    actions: [
      { label: "Sign up", href: routes.signup, variant: "ink" },
      { label: "Hire & partner", href: routes.partner, variant: "ghost" },
    ],
  },
};
