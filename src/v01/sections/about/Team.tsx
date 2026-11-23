"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useRef } from "react";
import type { TeamContent, TeamTone } from "../../content/about.types";
import type { Surface } from "../../content/types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Team.module.css";

type Props = { content: TeamContent };

const surfaceFor: Record<TeamTone, Surface> = {
  "peach-warm": "paper",
  lemon: "lemon",
  forest: "forest",
  cream: "paper",
  crimson: "crimson",
};

/** Flyers pinned on a board: a sideways row of tilted cards, each linking to LinkedIn. */
export function Team({ content }: Props) {
  const row = useRef<HTMLUListElement>(null);

  function slide(direction: 1 | -1) {
    const el = row.current;
    if (!el) return;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    const step = el.clientWidth * 0.9;

    if (direction === 1) {
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + step, behavior });
    } else {
      const atStart = el.scrollLeft <= 4;
      el.scrollTo({ left: atStart ? el.scrollWidth : el.scrollLeft - step, behavior });
    }
  }

  return (
    <Section id={content.id} surface="cobalt" pad="none" className={s.section}>
      <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>

      <ul ref={row} aria-label={content.listLabel} className={s.row}>
        {content.members.map((member) => (
          <li
            key={member.name}
            className={s.fly}
            style={{ "--tilt": `${member.tilt}deg` } as React.CSSProperties}
          >
            <Section
              as="div"
              surface={surfaceFor[member.tone]}
              pad="none"
              flush
              className={cx(s.card, member.tone === "peach-warm" && s.peachWarm)}
            >
              <a
                href={member.href}
                target="_blank"
                rel="noopener"
                aria-label={member.linkLabel}
                className={s.link}
              >
                <Photo image={member.image} sizes="260px" className={s.photo} />
                <span className={cx(p.title, s.name)}>{member.name}</span>
                <span className={cx(p.mono, s.role)}>{member.role}</span>
              </a>
            </Section>
          </li>
        ))}
      </ul>

      <div className={s.controls}>
        <button type="button" className={s.arrow} onClick={() => slide(-1)} aria-label={content.prevLabel}>
          <ArrowLeft size={20} weight="bold" aria-hidden="true" />
        </button>
        <button type="button" className={s.arrow} onClick={() => slide(1)} aria-label={content.nextLabel}>
          <ArrowRight size={20} weight="bold" aria-hidden="true" />
        </button>
      </div>
    </Section>
  );
}
