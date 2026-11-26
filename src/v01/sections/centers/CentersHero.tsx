import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { CentersHeroContent } from "../../content/centers.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Sticker } from "../../ui/Sticker";
import { Breadcrumb } from "../programs/Breadcrumb";
import s from "./CentersHero.module.css";

type Props = { content: CentersHeroContent };

/** Page title on forest, with the two ways in. The globe badge sits above the lede, in flow, so it never covers text. */
export function CentersHero({ content }: Props) {
  return (
    <Section id="top" surface="forest" pad="none" className={s.hero}>
      <Breadcrumb items={content.breadcrumb} />
      <div className={s.head}>
        <h1 className={cx(p.display, s.headline)}>
          {content.headline.map((line) => (
            <span key={line.text} className={cx(s.line, line.highlight && s.highlight)}>
              {line.text}
            </span>
          ))}
        </h1>
        <div className={s.aside}>
          <Sticker sticker={content.sticker} className={s.sticker} />
          <p className={s.lede}>{content.lede}</p>
          <div className={s.actions}>
            <a href={content.primary.href} className={cx(p.button, s.lemon, p.lg)}>
              {content.primary.label}
            </a>
            {content.host && (
              <a href={content.host.href} className={cx(p.button, p.ghost, p.lg)}>
                {content.host.label}
              </a>
            )}
            <a href={content.secondary.href} className={p.arrowLink}>
              {content.secondary.label}
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
