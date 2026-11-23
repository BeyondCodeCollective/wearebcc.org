import type { ProgramRowContent } from "../../content/programs.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./ProgramList.module.css";

type Props = { ariaLabel: string; rows: ProgramRowContent[] };

/** One row per program, each phrased the way a learner would say it. The whole row links. */
export function ProgramList({ ariaLabel, rows }: Props) {
  return (
    <Section pad="none" ariaLabel={ariaLabel} className={s.section}>
      <ul className={s.list}>
        {rows.map((row) => (
          <li key={row.name}>
            <a href={row.cta.href} className={s.row}>
              <span className={cx(p.title, s.line)}>{row.line}</span>
              <span className={s.body}>
                <span className={s.nameRow}>
                  <span aria-hidden="true" className={cx(s.dot, s[row.dot])} />
                  <span className={s.name}>{row.name}</span>
                </span>
                <span className={s.summary}>{row.summary}</span>
                <span className={cx(p.mono, s.tags)}>{row.tags.join(" ")}</span>
              </span>
              <span className={cx(p.button, p.ink, p.md, s.cta)}>{row.cta.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
