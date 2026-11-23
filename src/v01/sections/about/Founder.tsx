import type { FounderContent } from "../../content/about.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Founder.module.css";

type Props = { content: FounderContent };

/** A founder quote over a full-width photo. */
export function Founder({ content }: Props) {
  return (
    <Section ariaLabel={content.ariaLabel} pad="none" className={s.section}>
      <div className={s.head}>
        <span className={cx(p.mono, s.label)}>{content.label}</span>
        <span className={cx(p.mono, s.aside)}>{content.aside}</span>
      </div>

      <Section as="div" surface="ink" pad="none" flush className={s.card}>
        <div className={s.bg}>
          <Photo image={content.image} sizes="(min-width: 1500px) 1360px, 100vw" className={s.fill} />
        </div>
        <div className={s.scrim} aria-hidden="true" />
        <figure className={s.body}>
          <blockquote className={cx(p.display, s.quote)}>{content.quote}</blockquote>
          <figcaption className={s.caption}>
            <span className={cx(p.title, s.name)}>{content.name}</span>
            <span className={cx(p.mono, s.role)}>{content.role}</span>
          </figcaption>
        </figure>
      </Section>
    </Section>
  );
}
