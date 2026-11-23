"use client";

import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import type { BeyondTheGameStagesContent } from "../../content/beyondTheGame.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import d from "./deep.module.css";
import s from "./StagePicker.module.css";

type Props = { content: BeyondTheGameStagesContent; id?: string };

/** Pick where you are in the move out of sport, see where to start. */
export function StagePicker({ content, id }: Props) {
  const [key, setKey] = useState(content.stages[0].key);
  const current = content.stages.find((stage) => stage.key === key) ?? content.stages[0];

  return (
    <Section id={id} surface="paper" pad="none" className={s.section}>
      <div className={s.head}>
        <h2 className={cx(p.display, s.headline)}>
          {content.headline.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </h2>
        <p className={s.intro}>{content.intro}</p>
      </div>

      <div role="group" aria-label={content.groupLabel} className={s.stages}>
        {content.stages.map((stage) => (
          <button
            key={stage.key}
            type="button"
            className={s.stage}
            aria-pressed={stage.key === key}
            onClick={() => setKey(stage.key)}
          >
            {stage.label}
          </button>
        ))}
      </div>

      <div key={current.key} className={s.result} aria-live="polite">
        <div className={s.answer}>
          <p className={cx(p.display, s.answerHead)}>{current.head}</p>
          <p className={s.answerBody}>{current.body}</p>
        </div>
        <div className={cx(s.start, d.deep)} data-surface="forest">
          <span className={cx(p.mono, s.startLabel)}>{content.startLabel}</span>
          <p className={cx(p.display, s.startText)}>{current.start}</p>
          <a href={content.cta.href} className={p.arrowLink}>
            {content.cta.label}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </Section>
  );
}
