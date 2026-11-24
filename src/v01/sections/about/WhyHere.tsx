import type { WhyHereContent } from "../../content/about.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Sticker } from "../../ui/Sticker";
import s from "./WhyHere.module.css";

type Props = { content: WhyHereContent };

/** The statement with one highlighted word, then the problem and what we built. */
export function WhyHere({ content }: Props) {
  const { statement } = content;

  return (
    <Section surface="paper-warm" pad="none" className={s.section}>
      <Sticker sticker={content.sticker} className={s.sticker} />
      <h2 className={cx(p.mono, s.label)}>{content.label}</h2>
      <p className={cx(p.display, s.statement)}>
        {statement.before} <span className={s.highlight}>{statement.highlight}</span> {statement.after}
      </p>

      <div className={s.columns}>
        {content.columns.map((column) => (
          <div key={column.title} className={s.column}>
            <h3 className={cx(p.display, s.title)}>{column.title}</h3>
            <p className={s.body}>{column.body}</p>
          </div>
        ))}

        <div className={s.figure}>
          <Photo image={content.image} sizes="(min-width: 900px) 34vw, 100vw" className={s.photo} />
          <div className={s.badge} data-surface="cobalt">
            <span className={cx(p.display, s.badgeTitle)}>{content.badge.title}</span>
            <span className={cx(p.mono, s.badgeNote)}>{content.badge.note}</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
