"use client";

import { useState } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Faq.module.css";

export type FaqItem = {
  question: string;
  /** A question with no answer yet shows as a plain row that does not open. */
  answer?: string;
  /** Opens with the page. */
  open?: boolean;
};

export type FaqContent = {
  headline: string;
  items: FaqItem[];
};

type Props = { content: FaqContent; id?: string };

/** Questions and answers. Each answered question opens and closes on its own. */
export function Faq({ content, id }: Props) {
  const [open, setOpen] = useState<Set<number>>(
    () => new Set(content.items.flatMap((item, index) => (item.open && item.answer ? [index] : []))),
  );

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <Section id={id} surface="paper" pad="none" className={s.section}>
      <div className={s.layout}>
        <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
        <ul className={s.list}>
          {content.items.map((item, index) => {
            const isOpen = open.has(index);
            const answerId = `${id ?? "faq"}-answer-${index}`;
            return (
              <li key={item.question} className={s.item}>
                {item.answer ? (
                  <>
                    <button
                      type="button"
                      className={cx(p.title, s.question, s.toggle)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => toggle(index)}
                    >
                      {item.question}
                      {isOpen ? <Minus size={22} aria-hidden="true" /> : <Plus size={22} aria-hidden="true" />}
                    </button>
                    <p id={answerId} className={s.answer} hidden={!isOpen}>
                      {item.answer}
                    </p>
                  </>
                ) : (
                  <p className={cx(p.title, s.question)}>{item.question}</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
