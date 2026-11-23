import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./NextSteps.module.css";

type Props = { headline: string; steps: { title: string; body: string }[] };

/** Three beats after signing up, set left, centre and right on wide screens. */
export function NextSteps({ headline, steps }: Props) {
  return (
    <Section pad="lg">
      <h2 className={cx(p.display, s.headline)}>{headline}</h2>
      <ol className={s.steps}>
        {steps.map((step) => (
          <li key={step.title} className={s.step}>
            <h3 className={cx(p.display, s.title)}>{step.title}</h3>
            <p className={s.body}>{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
