"use client";

import { useId, useState } from "react";
import type { AudienceKey, PartnerPageContent } from "../../content/partner.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./WhoFor.module.css";

type Props = { content: PartnerPageContent["who"] };

/** Pick who you are; the photo and the pitch beneath change to match. */
export function WhoFor({ content }: Props) {
  const uid = useId();
  const [selected, setSelected] = useState<AudienceKey>(content.initial);
  const current = content.audiences.find((audience) => audience.key === selected) ?? content.audiences[0];

  return (
    <Section id="who" surface="paper-warm" pad="lg">
      <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>

      <div role="group" aria-label={content.groupLabel} className={s.pills}>
        {content.audiences.map((audience) => (
          <button
            key={audience.key}
            type="button"
            aria-pressed={audience.key === selected}
            aria-controls={`${uid}-panel`}
            className={s.pill}
            onClick={() => setSelected(audience.key)}
          >
            {audience.label}
          </button>
        ))}
      </div>

      <div id={`${uid}-panel`} className={cx(s.stage, !current.image && s.textOnly)} aria-live="polite">
        {current.image && (
          <Photo
            key={current.key}
            image={current.image}
            sizes="(min-width: 900px) 46vw, 100vw"
            className={s.photo}
          />
        )}
        <div className={s.panel} data-surface="ink">
          <p className={cx(p.display, s.head)}>{current.head}</p>
          <p className={s.body}>{current.body}</p>
          <div>
            <a href={current.cta.href} className={cx(p.button, s.cta)}>
              {current.cta.label}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
