import type { BuildWithUsContent } from "../../content/about.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./BuildWithUs.module.css";

type Props = { content: BuildWithUsContent };

/** Closing call to action on lemon. */
export function BuildWithUs({ content }: Props) {
  return (
    <Section surface="lemon" pad="none" className={s.section}>
      <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
      <div className={s.actions}>
        {content.actions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            className={cx(p.button, action.variant === "ink" ? p.ink : p.ghost, p.lg)}
          >
            {action.label}
          </a>
        ))}
      </div>
    </Section>
  );
}
