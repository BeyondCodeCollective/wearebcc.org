import type { StatContent } from "../../content/codeAlong.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Badge } from "./parts";
import s from "./Stat.module.css";
import t from "./tone.module.css";

type Props = { content: StatContent };

/** One big number on navy. */
export function Stat({ content }: Props) {
  return (
    <Section surface="navy" pad="lg" className={t.night}>
      <div className={s.stack}>
        <Badge>{content.badge}</Badge>
        <p className={cx(p.display, s.value)}>{content.value}</p>
        <p className={cx(p.display, s.caption)}>{content.caption}</p>
      </div>
    </Section>
  );
}
