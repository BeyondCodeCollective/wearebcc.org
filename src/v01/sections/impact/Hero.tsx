import type { ImpactHeroContent } from "../../content/impact.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Hero.module.css";

type Props = { content: ImpactHeroContent };

/** Big three-line headline with the lede beside it. */
export function Hero({ content }: Props) {
  const { breadcrumb } = content;

  return (
    <Section pad="none" className={s.hero}>
      <nav aria-label="Breadcrumb" className={cx(p.mono, s.crumb)}>
        <a href={breadcrumb.homeHref}>{breadcrumb.homeLabel}</a> / {breadcrumb.current}
      </nav>
      <div className={s.row}>
        <h1 className={cx(p.display, s.headline)}>
          {content.headline.map((line) => (
            <span key={line.text} className={cx(s.line, line.accent && s.accent)}>
              {line.text}
            </span>
          ))}
        </h1>
        <p className={s.lede}>{content.lede}</p>
      </div>
    </Section>
  );
}
