import type { BeyondReadyPageContent } from "./beyondReady.types";
import { routes, siteFooter, siteHeader } from "./site";

/**
 * BeyondReady, v0.1. Every word and link on the page lives here.
 * Copy is taken exactly from docs/design/v0-1/S-BeyondReady-nflv.dc.html.
 */
export const beyondReady: BeyondReadyPageContent = {
  header: siteHeader({ current: "Programs", spanishHref: "/es/field-ready" }),
  footer: siteFooter(),

  hero: {
    breadcrumb: {
      links: [
        { label: "Home", href: routes.home },
        { label: "Programs", href: routes.programs },
      ],
      current: "Beyond Ready",
    },
    cover: {
      brand: "Beyond Code Collective",
      cohort: "Cohort 01",
      title: ["Beyond", "Ready"],
      facts: [
        { label: "Length", value: "8 weeks" },
        { label: "Time", value: "3+ hrs / week" },
        { label: "Cost", value: "Free" },
        { label: "Who", value: "Any role" },
        { label: "Pods", value: "5 people" },
        { label: "Starts", value: "January" },
      ],
    },
    claim: { before: "Learn to work with AI in ", highlight: "the job you already have." },
    lede: "Eight free weeks, supported by our partners and funders. You bring a real task from your work. You leave having built one thing that makes it better, and knowing how to judge what AI hands you.",
    primary: { label: "Join the waitlist", href: "#join" },
    secondary: { label: "Try it on your role", href: "#roles" },
    image: {
      src: "/images/v01/field-ready.jpg",
      alt: "Two women seated at a small table, looking at a laptop together",
      position: "center 25%",
    },
  },

  roles: {
    headline: ["Bring your", "own field."],
    intro: "Pick a field to see the kind of problem people bring and what they could build. Examples, not a fixed syllabus.",
    groupLabel: "Pick a field",
    problemLabel: "The problem you bring",
    buildLabel: "What you could build",
    roles: [
      {
        key: "marketing",
        label: "Marketing",
        problem: "Writing every campaign brief from scratch.",
        build: "A brief helper that drafts from your past campaigns, for you to edit.",
      },
      {
        key: "finance",
        label: "Finance",
        problem: "Hours spent reconciling the same monthly report.",
        build: "A checklist assistant that flags the lines that don’t match.",
      },
      {
        key: "operations",
        label: "Operations",
        problem: "Scheduling that lives in five spreadsheets.",
        build: "One shared view that pulls them together and spots clashes.",
      },
      {
        key: "education",
        label: "Education",
        problem: "Writing different versions of the same lesson.",
        build: "A tool that adapts one lesson for different reading levels.",
      },
      {
        key: "healthcare",
        label: "Healthcare",
        problem: "Patients asking the same intake questions.",
        build: "A plain-language guide to the intake process, checked by staff.",
      },
      {
        key: "shifter",
        label: "Changing careers",
        problem: "Not sure which skills carry over.",
        build: "A portfolio piece that shows a new employer what you can do.",
      },
    ],
  },

  skills: {
    headline: ["Five skills.", "One way", "of working."],
    intro: "The tools are the vehicle. You practice these skills every week, and they stay with you when the tools change.",
    skills: [
      {
        name: "Think critically",
        body: "An LLM is predictive. It makes an educated guess and does not think. Validate, don’t trust. When the stakes are real, one agent does the work and a second checks it.",
      },
      {
        name: "Set it up",
        body: "Choose the voice you want back. Choose the platform that fits the task and say why. Know the boundary on safety, web access, approvals, and training data.",
      },
      {
        name: "Listen deeply",
        body: "Interview before you build. Hear the problem underneath the stated one, in the other person’s words.",
      },
      {
        name: "Communicate",
        body: "With yourself and the AI, inside your org where your expertise is the value, and outside it through storytelling, research, and presentation.",
      },
      {
        name: "Judge and defend",
        body: "Know what good looks like before you test. Iterate on evidence. Know how to call it done, and explain it to anyone.",
      },
    ],
    centerLabel: "Every week, on your own project",
    loopLabel:
      "A loop of five skills practiced every week on your own project: think critically, set it up, listen deeply, communicate, judge and defend",
  },

  week: {
    headline: ["A week in", "the program."],
    intro: "About three hours a week, around your job. One sample week shown. Exact days to confirm.",
    days: [
      { day: "Mon", card: { title: "Live kickoff", note: "60 min · pick a time slot", tone: "cobalt" } },
      { day: "Tue", card: { title: "Self-guided unit", note: "Worked examples", tone: "paper" } },
      { day: "Wed", card: { title: "Your pod", note: "5 peers, side by side", tone: "ink" } },
      { day: "Thu", card: { title: "Office hours", note: "Optional · 60 min", tone: "lemon" } },
      { day: "Fri", card: { title: "Self-guided unit", note: "Build on your project", tone: "paper" } },
      { day: "Sat", off: "Off" },
      { day: "Sun", off: "Off" },
    ],
    closing: "After week eight, you join the Beyond community of graduates who keep building together.",
  },

  why: {
    headline: "Why now.",
    claim: { before: "More than half of job posts asking for AI skills are ", highlight: "outside IT." },
    body: "Roles that ask for AI skills pay about 28% more, and generative AI postings outside tech are up about 800% since 2022. Your field is already changing.",
  },

  faq: {
    headline: "Questions.",
    items: [
      {
        question: "What does it cost?",
        answer: "Nothing. Beyond Ready is free to learners, supported by our partners and funders.",
        open: true,
      },
      { question: "Do I need a tech background?" },
      { question: "How much time does it take?" },
      { question: "Do I get a certificate?" },
    ],
  },

  join: {
    headline: "Are you ready?",
    body: ["Join the waitlist in under one minute.", "We email you when enrollment opens."],
    aside: {
      lines: ["First cohort.", "Free seats."],
      cta: { label: "Join the waitlist", href: routes.signup },
    },
    bring: {
      headline: "BRING BEYOND READY TO YOUR PEOPLE.",
      items: [
        {
          title: "Employers",
          body: "A version built for your team, its problems, and timeline.",
          link: { label: "Talk to us", href: routes.partner },
        },
        {
          title: "Workforce boards",
          body: "Adapted to your region’s learners and jobs. Already tested in Georgia.",
          link: { label: "Talk to us", href: routes.partner },
        },
        {
          title: "Schools",
          body: "A cohort for your students, complementary to what's on campus.",
          link: { label: "Talk to us", href: routes.partner },
        },
      ],
    },
  },
};
