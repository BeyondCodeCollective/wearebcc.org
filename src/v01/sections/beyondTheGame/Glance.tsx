"use client";

import type { BeyondTheGameGlanceContent } from "../../content/beyondTheGame.types";
import { cx } from "../../lib/cx";
import { isUpcoming } from "../../lib/time";
import { useNow } from "../../lib/useNow";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Glance.module.css";

type Props = {
  content: BeyondTheGameGlanceContent;
  /** Time the page was rendered, in epoch ms. The browser's clock takes over after load. */
  now: number;
};

/** The lemon strip of program facts. A dated fact leaves once its date has started. */
export function Glance({ content, now }: Props) {
  const current = useNow(now);
  const items = content.items.filter((item) => !item.when || isUpcoming(item.when, current));

  return (
    <Section surface="lemon" pad="none" ariaLabel={content.label} className={s.section}>
      <ul className={s.list}>
        {items.map((item) => (
          <li key={item.label} className={s.item}>
            <span className={cx(p.mono, s.label)}>{item.label}</span>
            <span className={cx(p.display, s.value)}>{item.value}</span>
            {item.note && <span className={cx(p.mono, s.note)}>{item.note}</span>}
          </li>
        ))}
      </ul>
    </Section>
  );
}
