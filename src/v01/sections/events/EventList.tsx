"use client";

import { useState } from "react";
import type { EventListContent, SessionEvent } from "../../content/events.types";
import type { EventTag } from "../../content/types";
import { cx } from "../../lib/cx";
import { dayLabel, isUpcoming } from "../../lib/time";
import { useNow } from "../../lib/useNow";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { EventRow } from "./EventRow";
import s from "./EventList.module.css";
import l from "./RowList.module.css";

type Props = { content: EventListContent; sessions: SessionEvent[]; now: number };

type Filter = "all" | EventTag;

/** Upcoming sessions as rows, with filter chips. A row leaves once its session starts. */
export function EventList({ content, sessions, now }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const current = useNow(now);

  const upcoming = sessions.filter((event) => !event.hidden && isUpcoming(event, current));
  const shown = filter === "all" ? upcoming : upcoming.filter((event) => event.tags.includes(filter));

  return (
    <Section id="list" surface="paper-warm" pad="none" className={s.section}>
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

      <div className={cx(l.list, s.list)}>
        {shown.map((event) => (
          <EventRow
            key={event.id}
            label={event.dateLabel ?? dayLabel(event)}
            dateTime={event.dateLabel ? undefined : event.timeTbd ? event.startsAt.slice(0, 10) : event.startsAt}
            title={event.title}
            description={event.description}
            descriptionTail={event.descriptionTail}
            meta={event.meta}
            image={event.image}
            cta={event.signup}
          />
        ))}
        {shown.length === 0 && (
          <div className={s.empty}>
            <p className={s.emptyText}>{content.empty.text}</p>
            {filter !== "all" && (
              <button type="button" className={cx(p.button, p.ghost, p.md, p.fine)} onClick={() => setFilter("all")}>
                {content.empty.reset}
              </button>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
