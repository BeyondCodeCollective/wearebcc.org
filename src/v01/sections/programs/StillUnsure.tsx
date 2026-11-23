import type { ProgramsStillUnsureContent } from "../../content/programs.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./StillUnsure.module.css";

type Props = { content: ProgramsStillUnsureContent };

/** A last way in for someone who has not found their line. */
export function StillUnsure({ content }: Props) {
  return (
    <Section surface="lemon" pad="md">
      <div className={s.inner}>
        <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
        <a href={content.cta.href} className={cx(p.button, p.ink, p.lg)}>
          {content.cta.label}
        </a>
      </div>
    </Section>
  );
}
