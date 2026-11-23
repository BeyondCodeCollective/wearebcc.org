"use client";

import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import type { BeyondTheGameStoryContent } from "../../content/beyondTheGame.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Story.module.css";

type Props = { content: BeyondTheGameStoryContent; id?: string };

/** One learner's before and after, with a picker once there is more than one story. */
export function Story({ content, id }: Props) {
  const [key, setKey] = useState(content.learners[0]?.key);
  const learner = content.learners.find((item) => item.key === key) ?? content.learners[0];
  if (!learner) return null;

  return (
    <Section id={id} surface="paper" pad="none" className={s.section}>
      <div className={s.layout}>
        <div key={learner.key} className={s.card}>
          <div className={cx(s.cell, s.then)}>
            <span className={cx(p.mono, s.cellLabel)}>{content.thenLabel}</span>
            <span className={cx(p.display, s.cellValue)}>{learner.then}</span>
          </div>
          <div className={cx(s.cell, s.now)}>
            <span className={cx(p.mono, s.cellLabel)}>{content.nowLabel}</span>
            <span className={cx(p.display, s.cellValue)}>{learner.now}</span>
          </div>
          <Photo image={learner.image} sizes="(min-width: 900px) 40vw, 100vw" className={s.photo} />
        </div>

        <div className={s.text}>
          {content.learners.length > 1 && (
            <div role="group" aria-label={content.groupLabel} className={s.tabs}>
              {content.learners.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={s.tab}
                  aria-pressed={item.key === learner.key}
                  onClick={() => setKey(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
          {learner.quote && <blockquote className={cx(p.display, s.quote)}>“{learner.quote}”</blockquote>}
          <p className={s.story}>
            <strong>{learner.name}</strong> {learner.text}
          </p>
          <a href={learner.link.href} className={p.arrowLink}>
            {learner.link.label}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </Section>
  );
}
