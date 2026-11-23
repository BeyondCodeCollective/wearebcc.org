import type { BeyondReadyWhyContent } from "../../content/beyondReady.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import g from "./grid.module.css";
import s from "./Why.module.css";

type Props = { content: BeyondReadyWhyContent; id?: string };

/** The case for learning this now, on cobalt grid paper. */
export function Why({ content, id }: Props) {
  return (
    <Section id={id} surface="cobalt" pad="none" className={cx(s.section, g.gridDark)}>
      <div className={s.text}>
        <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
        <p className={cx(p.display, s.claim)}>
          {content.claim.before}
          <span className={s.accent}>{content.claim.highlight}</span>
        </p>
        <p className={s.body}>{content.body}</p>
      </div>
    </Section>
  );
}
