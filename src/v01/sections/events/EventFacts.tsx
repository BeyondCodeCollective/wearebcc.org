import type { EventFact } from "../../content/types";
import { cx } from "../../lib/cx";
import s from "./EventFacts.module.css";

type Props = { facts: EventFact[]; className?: string };

/** When, where and who it is for, in plain sentence case under an event. */
export function EventFacts({ facts, className }: Props) {
  return (
    <dl className={cx(s.facts, className)}>
      {facts.map((fact) => (
        <div key={fact.label} className={s.fact}>
          <dt className={s.label}>{fact.label}</dt>
          <dd className={s.value}>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
