import type { CouncilContent } from "../../content/about.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Council.module.css";

type Props = { content: CouncilContent };

/** The advisory council as a run of names with their affiliations. */
export function Council({ content }: Props) {
  return (
    <Section pad="none" className={s.section}>
      <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
      <p className={s.lede}>{content.lede}</p>
      <ul className={s.list}>
        {content.members.map((member) => (
          <li key={member.name} className={cx(p.display, s.member)}>
            {member.name} <span className={s.affiliation}>{member.affiliation}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
