import type { BeyondReadyWeekContent } from "../../content/beyondReady.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Week.module.css";

type Props = { content: BeyondReadyWeekContent; id?: string };

/** One sample week: five working days and the weekend off. */
export function Week({ content, id }: Props) {
  return (
    <Section id={id} surface="paper" pad="none" className={s.section}>
      <div className={s.head}>
        <h2 className={cx(p.display, s.headline)}>
          {content.headline.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </h2>
        <p className={s.intro}>{content.intro}</p>
      </div>

      <ol className={s.week}>
        {content.days.map((day) => (
          <li key={day.day} className={s.day}>
            <span className={cx(p.mono, s.dayName)}>{day.day}</span>
            {day.card ? (
              <div className={cx(s.card, s[day.card.tone])}>
                <span className={cx(p.display, s.cardTitle)}>{day.card.title}</span>
                <span className={s.cardNote}>{day.card.note}</span>
              </div>
            ) : (
              <span className={s.off}>{day.off}</span>
            )}
          </li>
        ))}
      </ol>

      <p className={s.closing}>{content.closing}</p>
    </Section>
  );
}
