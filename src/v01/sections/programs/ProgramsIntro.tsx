import type { ProgramsIntroContent } from "../../content/programs.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Breadcrumb } from "./Breadcrumb";
import s from "./ProgramsIntro.module.css";

type Props = { content: ProgramsIntroContent };

/** Page title with the free-to-learners promise beside it. */
export function ProgramsIntro({ content }: Props) {
  return (
    <Section id="top" pad="none" className={s.intro}>
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
          <p className={s.lede}>{content.lede}</p>
          <p className={cx(p.title, s.promiseTitle)}>{content.promise.title}</p>
          <p className={cx(p.mono, s.promiseNote)}>{content.promise.note}</p>
        </div>
      </div>
    </Section>
  );
}
