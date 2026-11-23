import type { TeachContent } from "../../content/codeAlong.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Badge, CtaButton, Marked } from "./parts";
import s from "./Teach.module.css";
import t from "./tone.module.css";

type Props = { content: TeachContent };

/** The hand-over pitch for schools and partners. */
export function Teach({ content }: Props) {
  return (
    <Section surface="paper" className={t.cream}>
      <div className={s.stack}>
        <Badge>{content.badge}</Badge>
        <h2 className={cx(p.display, s.headline)}>
          <Marked parts={content.headline} />
        </h2>
        <p className={s.lede}>{content.lede}</p>
        <div className={s.cta}>
          <CtaButton link={content.cta} kind="outline" />
        </div>
      </div>
    </Section>
  );
}
