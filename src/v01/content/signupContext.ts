import { home } from "./home";
import { signup } from "./signup";
import type { SignupPageContent } from "./signup.types";
import type { EventFact, SignupContext } from "./types";
import { dayLabel, isUpcoming } from "../lib/time";

/**
 * Sign-up links can name what they are for: /en/sign-up?for=<key>.
 * The key is a Home event id or one of the program keys below. The page then
 * says which session or program the person is signing up for, puts it first in
 * the "I want to" list, and tags the sign-up with the key so the team can see it.
 *
 * NOT IN DESIGN. Every fact here comes from the Home events and the program pages.
 */

type Entry = { context: SignupContext; headline: string; choice: string };

const EVENT_NOTE =
  "Add your name and email and we will send you the details for this session, including anything still to be confirmed.";

const beyondReadyFacts: EventFact[] =
  home.events.events.find((event) => event.id === "beyond-ready-2027-01")?.facts ?? [];

const programs: Record<string, Entry> = {
  "beyond-ready": {
    headline: "Join the waitlist.",
    choice: "join the Beyond Ready waitlist",
    context: {
      label: "You’re joining the waitlist for",
      title: "Beyond Ready",
      facts: beyondReadyFacts,
      note: "Add your name and email and we will write to you when the January cohort opens.",
    },
  },
  "beyond-the-music": {
    headline: "Get on the list.",
    choice: "hear about the next Beyond the Music cohort",
    context: {
      label: "You’re asking about",
      title: "Beyond the Music",
      facts: [
        { label: "For", value: "Artists, creatives and executives in entertainment" },
        { label: "Starts", value: "Next cohort dates to be announced" },
        { label: "Cost", value: "Free" },
      ],
      note: "Add your name and email and we will write to you when the next cohort opens.",
    },
  },
};

function eventEntry(key: string, now: number): Entry | undefined {
  const event = home.events.events.find((item) => item.id === key);
  if (!event || !event.facts || !isUpcoming(event, now)) return undefined;
  const programEntry = key === "beyond-ready-2027-01" ? programs["beyond-ready"] : undefined;
  if (programEntry) return programEntry;
  const day = dayLabel(event);
  return {
    headline: "Save your seat.",
    choice: `attend the ${event.title} on ${day.value}`,
    context: {
      label: "You’re saving a seat for",
      title: event.title,
      when: `${day.eyebrow}, ${day.value}`,
      facts: event.facts,
      note: EVENT_NOTE,
    },
  };
}

/** A key is safe to store as a source tag when it is one we issued. */
function entryFor(key: string | undefined, now: number): { key: string; entry: Entry } | undefined {
  if (!key) return undefined;
  const entry = programs[key] ?? eventEntry(key, now);
  return entry ? { key, entry } : undefined;
}

/** The Sign up page content, with the session or program named when the link carried one. */
export function signupContentFor(key: string | undefined, now: number): SignupPageContent {
  // "volunteer" has no block to show: it only moves that choice to the top of the list.
  if (key === "volunteer") {
    const options = signup.form.fields.interest.options;
    return {
      ...signup,
      form: {
        ...signup.form,
        fields: {
          ...signup.form.fields,
          interest: {
            ...signup.form.fields.interest,
            options: ["volunteer", ...options.filter((option) => option !== "volunteer")],
          },
        },
        subscribe: { ...signup.form.subscribe, source: `${signup.form.subscribe.source}-volunteer` },
      },
    };
  }

  const found = entryFor(key, now);
  if (!found) return signup;
  const { entry } = found;
  return {
    ...signup,
    form: {
      ...signup.form,
      headline: entry.headline,
      context: entry.context,
      fields: {
        ...signup.form.fields,
        interest: {
          ...signup.form.fields.interest,
          options: [entry.choice, ...signup.form.fields.interest.options],
        },
      },
      subscribe: { ...signup.form.subscribe, source: `${signup.form.subscribe.source}-${found.key}` },
    },
  };
}
