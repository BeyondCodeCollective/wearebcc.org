"use client";

import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import type { BeyondReadyRolesContent } from "../../content/beyondReady.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import g from "./grid.module.css";
import s from "./RolePicker.module.css";

type Props = { content: BeyondReadyRolesContent; id?: string };

/** Pick a field, see the problem people bring from it and what they could build. */
export function RolePicker({ content, id }: Props) {
  const [key, setKey] = useState(content.roles[0].key);
  const current = content.roles.find((role) => role.key === key) ?? content.roles[0];

  return (
    <Section id={id} surface="paper" pad="none" rule="top" className={s.section}>
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

      <div role="group" aria-label={content.groupLabel} className={s.roles}>
        {content.roles.map((role) => (
          <button
            key={role.key}
            type="button"
            className={s.role}
            aria-pressed={role.key === key}
            onClick={() => setKey(role.key)}
          >
            {role.label}
          </button>
        ))}
      </div>

      <div key={current.key} className={s.result} aria-live="polite">
        <div className={s.cell}>
          <span className={cx(p.mono, s.cellLabel)}>{content.problemLabel}</span>
          <p className={cx(p.display, s.cellText)}>{current.problem}</p>
        </div>
        <div className={s.arrow} aria-hidden="true">
          <ArrowRight size={32} weight="regular" />
        </div>
        <div className={cx(s.cell, s.build, g.gridDark)} data-surface="cobalt">
          <span className={cx(p.mono, s.cellLabel, s.buildLabel)}>{content.buildLabel}</span>
          <p className={cx(p.display, s.cellText)}>{current.build}</p>
        </div>
      </div>
    </Section>
  );
}
