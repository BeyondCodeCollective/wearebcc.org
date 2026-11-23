import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { BeyondReadyJoinContent } from "../../content/beyondReady.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import g from "./grid.module.css";
import s from "./Join.module.css";

type Props = { content: BeyondReadyJoinContent; id?: string };

/** The waitlist call to action, then the three ways to bring the program to a group. */
export function Join({ content, id }: Props) {
  return (
    <Section id={id} surface="paper" pad="none" rule="top" className={cx(s.section, g.grid)}>
      <div className={s.card}>
        <div className={cx(s.main, g.gridDark)} data-surface="cobalt">
          <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
          <div className={s.body}>
            {content.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <div className={s.aside} data-surface="lemon">
          <p className={cx(p.display, s.asideText)}>
            {content.aside.lines.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
          <a href={content.aside.cta.href} className={cx(p.button, p.ink, p.lg)}>
            {content.aside.cta.label}
          </a>
        </div>
      </div>

      <div className={s.bring}>
        <h2 className={cx(p.display, s.bringHeadline)}>{content.bring.headline}</h2>
        <ul className={s.items}>
          {content.bring.items.map((item) => (
            <li key={item.title} className={s.item}>
              <h3 className={cx(p.display, s.itemTitle)}>{item.title}</h3>
              <p className={s.itemBody}>{item.body}</p>
              <a href={item.link.href} className={p.arrowLink}>
                {item.link.label}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
