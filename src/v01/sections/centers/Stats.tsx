import type { CentersStatsContent } from "../../content/centers.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Stats.module.css";

type Props = { content: CentersStatsContent };

/** Two results from Atlanta, set as blocks of colour. */
export function Stats({ content }: Props) {
  return (
    <Section pad="none">
      <ul className={s.grid}>
        {content.stats.map((stat) => (
          <li key={stat.value}>
            <Section as="div" surface={stat.surface} flush pad="none" className={s.block}>
              <span className={cx(p.title, s.value)}>{stat.value}</span>
              <span className={cx(p.title, s.text)}>{stat.text}</span>
            </Section>
          </li>
        ))}
      </ul>
    </Section>
  );
}
