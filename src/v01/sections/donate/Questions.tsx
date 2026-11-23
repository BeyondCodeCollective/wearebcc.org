"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import type { DonatePageContent } from "../../content/donate.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Questions.module.css";

type Props = { content: DonatePageContent["questions"] };

/** Questions and answers. The first one starts open, as in the design. */
export function Questions({ content }: Props) {
  const uid = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  function toggle(index: number) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <Section pad="lg">
      <div className={s.layout}>
        <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
        <ul className={s.list}>
          {content.items.map((item, index) => {
            const isOpen = open.has(index);
            const panel = `${uid}-${index}`;
            return (
              <li key={item.question} className={s.item}>
                <h3 className={s.heading}>
                  <button
                    type="button"
                    className={cx(p.display, s.question)}
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => toggle(index)}
                  >
                    {item.question}
                    {isOpen ? (
                      <Minus size={22} weight="regular" aria-hidden="true" />
                    ) : (
                      <Plus size={22} weight="regular" aria-hidden="true" />
                    )}
                  </button>
                </h3>
                <p id={panel} hidden={!isOpen} className={s.answer}>
                  {item.answer}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
