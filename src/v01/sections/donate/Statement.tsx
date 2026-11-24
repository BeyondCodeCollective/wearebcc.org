import type { DonatePageContent } from "../../content/donate.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Sticker } from "../../ui/Sticker";
import s from "./Statement.module.css";

type Props = { content: DonatePageContent["statement"] };

/** One big sentence on lemon, with the numbers picked out in colour. */
export function Statement({ content }: Props) {
  return (
    <Section surface="lemon" pad="lg" className={s.section}>
      <Sticker sticker={content.sticker} className={s.sticker} />
      <p className={cx(p.display, s.statement)}>
        {content.segments.map((segment) =>
          segment.tone ? (
            <span key={segment.text} className={s[segment.tone]}>
              {segment.text}
            </span>
          ) : (
            segment.text
          ),
        )}
      </p>
    </Section>
  );
}
