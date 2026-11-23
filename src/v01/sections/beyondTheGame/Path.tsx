import type { BeyondTheGamePathContent } from "../../content/beyondTheGame.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import d from "./deep.module.css";
import s from "./Path.module.css";

type Props = { content: BeyondTheGamePathContent; id?: string };

/** The four steps, along a wavy lemon route on wide screens and a numbered list on narrow ones. */
export function Path({ content, id }: Props) {
  const lastIndex = content.steps.length - 1;

  return (
    <Section id={id} surface="forest" pad="none" className={cx(s.section, d.deep)}>
      <div className={s.head}>
        <h2 className={cx(p.display, s.headline)}>
          {content.headline.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </h2>
        <p className={s.intro}>{content.intro}</p>
      </div>

      <div className={s.route}>
        <svg viewBox="0 0 1060 240" role="img" aria-label={content.diagramLabel} className={s.svg}>
          <path d="M110 120 C 220 30, 290 30, 390 120 S 570 210, 670 120 S 850 30, 950 120" className={s.line} />
          {content.steps.map((step, index) => {
            const x = 110 + index * 280;
            const upcoming = index === lastIndex && step.upcoming;
            return (
              <g key={step.kicker}>
                <circle cx={x} cy="120" r="26" className={upcoming ? s.dotUpcoming : s.dot} />
                <text x={x} y="133" textAnchor="middle" fontSize="36" className={upcoming ? s.numUpcoming : s.num}>
                  {index + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <ol className={s.steps}>
        {content.steps.map((step, index) => (
          <li key={step.kicker} className={cx(s.step, step.upcoming && s.upcoming)}>
            <span className={cx(p.display, s.badge, step.upcoming && s.badgeUpcoming)} aria-hidden="true">
              {index + 1}
            </span>
            <div className={s.stepText}>
              <span className={cx(p.display, s.kicker)}>{step.kicker}</span>
              <h3 className={cx(p.display, s.title)}>{step.title}</h3>
              <p className={s.body}>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
