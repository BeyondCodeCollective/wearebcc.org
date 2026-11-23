import type { CentersBringContent } from "../../content/centers.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./BringCenter.module.css";

type Props = { content: CentersBringContent };

/** Closing ask for partners who want a Center in their city. */
export function BringCenter({ content }: Props) {
  return (
    <Section pad="md" rule="top">
      <div className={s.inner}>
        <h3 className={cx(p.title, s.headline)}>{content.headline}</h3>
        <a href={content.cta.href} className={cx(p.button, p.ghost, p.lg)}>
          {content.cta.label}
        </a>
      </div>
    </Section>
  );
}
