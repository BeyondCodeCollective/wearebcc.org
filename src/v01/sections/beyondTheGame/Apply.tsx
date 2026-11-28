import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { BeyondTheGameApplyContent } from "../../content/beyondTheGame.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import d from "./deep.module.css";
import s from "./Apply.module.css";

type Props = { content: BeyondTheGameApplyContent; id?: string };

/** The apply card on cobalt, then the line for teams that want to sponsor a cohort. */
export function Apply({ content, id }: Props) {
  const { cta } = content.aside;

  return (
    <Section id={id} surface="cobalt" pad="none" className={cx(s.section, d.deep)}>
      <div className={s.card}>
        <div className={s.main} data-surface="lemon">
          <h2 className={cx(p.display, s.headline)}>
            {content.headline.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p className={s.body}>{content.body}</p>
        </div>
        <div className={s.aside} data-surface="ink">
          <span className={cx(p.display, s.asideTitle)}>{content.aside.title}</span>
          <span className={cx(p.mono, s.meta)}>{content.aside.meta}</span>
          <a
            href={cta.href}
            className={cx(p.button, s.lemon, p.lg)}
            {...(cta.external ? { target: "_blank", rel: "noopener" } : {})}
          >
            {cta.label}
          </a>
        </div>
      </div>

      <div className={s.sponsor}>
        <p className={s.sponsorText}>
          <strong>{content.sponsor.strong}</strong>
          {content.sponsor.rest}
        </p>
        <a href={content.sponsor.link.href} className={cx(p.button, p.cream, p.md)}>
          {content.sponsor.link.label}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
}
