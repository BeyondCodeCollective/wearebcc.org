"use client";

import { ArrowRight } from "@phosphor-icons/react";
import type { NextUpContent } from "../content/types";
import { cx } from "../lib/cx";
import { isUpcoming } from "../lib/time";
import { useNow } from "../lib/useNow";
import p from "../ui/primitives.module.css";
import { Section } from "../ui/Section";
import s from "./NextUp.module.css";

type Props = {
  content: NextUpContent;
  /** Time the page was rendered, in epoch ms. The browser's clock takes over after load. */
  now: number;
};

/** One-line bar for the next live session. Removes itself once that session has started. */
export function NextUp({ content, now }: Props) {
  const current = useNow(now);
  if (!isUpcoming(content, current)) return null;

  return (
    <Section as="div" surface="cobalt" pad="none" flush>
      <a href={content.cta.href} className={s.bar}>
        <span className={p.mono}>{content.label}</span>
        <span className={cx(p.title, s.text)}>{content.text}</span>
        <span className={cx(p.mono, s.cta)}>
          {content.cta.label}
          <ArrowRight size={16} weight="bold" aria-hidden="true" />
        </span>
      </a>
    </Section>
  );
}
