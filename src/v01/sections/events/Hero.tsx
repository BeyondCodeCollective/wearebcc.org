import { Fragment } from "react";
import type { EventsHeroContent, SessionEvent } from "../../content/events.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Flyers } from "./Flyers";
import s from "./Hero.module.css";

type Props = { content: EventsHeroContent; sessions: SessionEvent[]; now: number };

/** Page opener: breadcrumb, the one h1, a line of help and the flyer board. */
export function Hero({ content, sessions, now }: Props) {
  return (
    <Section id="top" surface="paper-warm" pad="sm">
      <div className={s.stack}>
        <nav aria-label={content.breadcrumbLabel} className={cx(p.mono, s.trail)}>
          {content.breadcrumb.map((item, index) => (
            <Fragment key={item.label}>
              {index > 0 && " / "}
              {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
            </Fragment>
          ))}
        </nav>
        <h1 className={cx(p.display, s.headline)}>{content.headline}</h1>
        <p className={s.lede}>{content.lede}</p>
        <p className={s.note}>{content.note}</p>
        <Flyers sessions={sessions} label={content.boardLabel} now={now} />
      </div>
    </Section>
  );
}
