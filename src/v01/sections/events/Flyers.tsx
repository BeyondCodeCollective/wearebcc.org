"use client";

import type { CSSProperties } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import type { SessionEvent } from "../../content/events.types";
import { cx } from "../../lib/cx";
import { dayLabel, isUpcoming } from "../../lib/time";
import { useNow } from "../../lib/useNow";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { EventFacts } from "./EventFacts";
import s from "./Flyers.module.css";

/** Three flyers fit a desktop row without one hanging off the edge. */
const BOARD_SIZE = 3;

type Props = { sessions: SessionEvent[]; label: string; now: number };

/** The board: upcoming sessions pinned as crooked flyers. A flyer leaves once its session starts. */
export function Flyers({ sessions, label, now }: Props) {
  const current = useNow(now);
  // The board is a short "next up" strip. The list below it is the full calendar.
  const shown = sessions.filter((event) => !event.flyer.hidden && isUpcoming(event, current)).slice(0, BOARD_SIZE);

  return (
    <div className={s.wrap}>
    <div role="group" aria-label={label} className={s.board} tabIndex={0}>
      <div className={s.track}>
        {shown.map((event) => {
          const day = event.dateLabel ?? dayLabel(event);
          return (
            <article
              key={event.id}
              className={cx(s.fly, s[event.flyer.tone])}
              style={{ "--tilt": `${event.flyer.tilt}deg` } as CSSProperties}
            >
              {event.image && <Photo image={event.image} sizes="300px" className={s.photo} />}
              <p className={s.dd}>
                <span className={cx(p.mono, s.wd)}>{day.eyebrow}</span>
                <span className={cx(p.display, s.dt)}>{day.value}</span>
              </p>
              <h3 className={cx(p.display, s.title)}>{event.title}</h3>
              <p className={s.text}>{event.flyer.text}</p>
              {event.facts ? (
                <EventFacts facts={event.facts} className={s.facts} />
              ) : (
                <p className={cx(p.mono, s.tg)}>{event.meta.join(" ")}</p>
              )}
              <a href={event.signup.href} className={cx(p.button, p.md, p.fine, s.cta)}>
                {event.signup.label}
              </a>
            </article>
          );
        })}
      </div>
    </div>
      {shown.length > 1 && (
        <p className={cx(p.mono, s.hint)} aria-hidden="true">
          Swipe <ArrowRight size={14} weight="bold" />
        </p>
      )}
    </div>
  );
}