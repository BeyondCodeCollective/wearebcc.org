import type { BeyondReadySkillsContent } from "../../content/beyondReady.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import g from "./grid.module.css";
import s from "./Skills.module.css";

type Props = { content: BeyondReadySkillsContent; id?: string };

/** The five skills as a list, beside a loop diagram of the same five. */
export function Skills({ content, id }: Props) {
  return (
    <Section id={id} surface="paper" pad="none" className={cx(s.section, g.grid)}>
      <div className={s.layout}>
        <div className={s.text}>
          <h2 className={cx(p.display, s.headline)}>
            {content.headline.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p className={s.intro}>{content.intro}</p>
          <dl className={s.list}>
            {content.skills.map((skill) => (
              <div key={skill.name} className={s.skill}>
                <dt className={cx(p.title, s.name)}>{skill.name}</dt>
                <dd className={s.body}>{skill.body}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={s.loopWrap}>
          <div role="img" aria-label={content.loopLabel} className={s.loop}>
            <svg aria-hidden="true" viewBox="0 0 580 580" className={s.ring}>
              <circle cx="290" cy="290" r="200" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 10" strokeLinecap="round" />
              <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M355.3 107.1 L364.9 104.6 L359.8 96.0" />
                <path d="M484.1 295.6 L489.5 304.0 L496.1 296.4" />
                <path d="M344.7 476.3 L338.4 484.1 L347.6 487.9" />
                <path d="M129.7 399.6 L120.4 396.0 L119.5 405.9" />
                <path d="M136.2 171.4 L136.8 161.4 L127.1 163.7" />
              </g>
            </svg>
            <div className={cx(p.display, s.center)}>{content.centerLabel}</div>
            {content.skills.map((skill, index) => (
              <div key={skill.name} className={cx(p.display, s.node, s[`node${index}`])}>
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
