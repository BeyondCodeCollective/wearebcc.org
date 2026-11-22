"use client";

import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import type { EventsContent, EventTag } from "../content/types";
import { cx } from "../lib/cx";
import { dayLabel, isUpcoming } from "../lib/time";
import { useNow } from "../lib/useNow";
import { Photo } from "../ui/Photo";
import p from "../ui/primitives.module.css";
import { Section } from "../ui/Section";
import s from "./Events.module.css";

type Props = {
  content: EventsContent;
  id?: string;
  /** Time the page was rendered, in epoch ms. The browser's clock takes over after load. */
  now: number;
};

type Filter = "all" | EventTag;

/**
 * Upcoming events with filter chips. An event leaves the list once it has
 * started, and never shows while its content marks it hidden.
 */
export function Events({ content, id, now }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const current = useNow(now);

  const upcoming = content.events.filter((event) => !event.hidden && isUpcoming(event, current));
  const shown = filter === "all" ? upcoming : upcoming.filter((event) => event.tags.includes(filter));

  return (
    <Section id={id} surface="paper-warm">
      <div className={s.head}>
        <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
        <div role="group" aria-label={content.filterLabel} className={s.filters}>
          {content.filters.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={filter === option.id}
              className={cx(p.mono, s.chip)}
              onClick={() => setFilter(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <p className={cx(p.mono, s.note)}>{content.note}</p>

      <div className={s.list}>
        {shown.map((event) => {
          const label = event.dateLabel ?? dayLabel(event);
          return (
            <article key={event.id} className={s.row}>
              <div className={s.date}>
                <p className={cx(p.mono, s.eyebrow)}>{label.eyebrow}</p>
                <p className={cx(p.display, s.day)}>
                  <time dateTime={event.timeTbd ? event.startsAt.slice(0, 10) : event.startsAt}>{label.value}</time>
                </p>
              </div>
              {event.image && (
                <Photo image={event.image} sizes="72px" className={s.thumb} />
              )}
              <div className={s.body}>
                <h3 className={s.title}>{event.title}</h3>
                <p className={s.text}>{event.description}</p>
              </div>
              <p className={cx(p.mono, s.tags)}>
                {event.meta.map((tag) => (
                  <span key={tag} className={s.tag}>
                    {tag}
                  </span>
                ))}
              </p>
              <a href={event.signup.href} className={cx(p.button, p.ghost, p.fine, s.cta)}>
                {event.signup.label}
              </a>
            </article>
          );
        })}

        {shown.length === 0 && (
          <div className={s.empty}>
            <p className={s.emptyText}>{content.empty.text}</p>
            {filter !== "all" && (
              <button type="button" className={cx(p.button, p.ghost, p.fine)} onClick={() => setFilter("all")}>
                {content.empty.reset}
              </button>
            )}
          </div>
        )}
      </div>

      <a href={content.calendar.href} className={cx(p.arrowLink, s.calendar)}>
        {content.calendar.label}
        <ArrowRight size={16} weight="bold" aria-hidden="true" />
      </a>
    </Section>
  );
}
