import type { ArchiveContent } from "../../content/events.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { EventRow } from "./EventRow";
import s from "./Archive.module.css";
import l from "./RowList.module.css";

type Props = { content: ArchiveContent };

/** Past highlights, as dated rows that link to the story. */
export function Archive({ content }: Props) {
  return (
    <Section id="archive" pad="none" className={s.section}>
      <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
      <p className={s.note}>{content.note}</p>
      <div className={cx(l.list, s.list)}>
        {content.events
          .filter((event) => !event.hidden)
          .map((event) => (
            <EventRow
              key={event.id}
              label={event.dateLabel}
              title={event.title}
              description={event.description}
              meta={event.meta}
              status={content.status}
              image={event.image}
              cta={event.cta}
              fixedCta
            />
          ))}
      </div>
    </Section>
  );
}
