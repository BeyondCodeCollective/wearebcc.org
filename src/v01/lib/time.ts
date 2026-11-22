import type { Timed } from "../content/types";

const DAY_MS = 24 * 60 * 60 * 1000;

/** The moment an item should leave the page, in epoch ms. */
export function visibleUntil(item: Timed): number {
  if (item.hideAfter) return Date.parse(item.hideAfter);
  const start = Date.parse(item.startsAt);
  // Day known, time not: keep it up until that day is over.
  return item.timeTbd ? start + DAY_MS : start;
}

export function isUpcoming(item: Timed, now: number): boolean {
  return now < visibleUntil(item);
}

/**
 * Weekday and date for an event row, for example { eyebrow: "Wed", value: "Dec 2" }.
 * Fixed locale and an explicit time zone, so server and browser always agree.
 */
export function dayLabel(item: Timed): { eyebrow: string; value: string } {
  const date = new Date(item.startsAt);
  const eyebrow = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: item.timeZone }).format(date);
  const value = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: item.timeZone,
  }).format(date);
  return { eyebrow, value };
}
