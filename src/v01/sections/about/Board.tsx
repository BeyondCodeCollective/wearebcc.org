import type { BoardContent } from "../../content/about.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Board.module.css";

type Props = { content: BoardContent };

/** Board members on forest: name and role. */
export function Board({ content }: Props) {
  return (
    <Section id={content.id} surface="forest" pad="none" className={s.section}>
      <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
      <ul className={s.list}>
        {content.members.map((member) => (
          <li key={member.name} className={s.member}>
            <span className={cx(p.display, s.name)}>{member.name}</span>
            <span className={cx(p.mono, s.role)}>{member.role}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
