import type { CentersQuoteContent } from "../../content/centers.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Quote.module.css";

type Props = { content: CentersQuoteContent };

/** One learner in her own words. */
export function Quote({ content }: Props) {
  return (
    <Section surface="paper-warm" pad="lg" className={s.section}>
      <figure className={s.figure}>
        <Photo image={content.image} sizes="(min-width: 900px) 340px, 90vw" className={s.portrait} />
        <div className={s.words}>
          <blockquote className={cx(p.display, s.quote)}>{content.text}</blockquote>
          <figcaption className={cx(p.mono, s.caption)}>{content.attribution}</figcaption>
        </div>
      </figure>
    </Section>
  );
}
