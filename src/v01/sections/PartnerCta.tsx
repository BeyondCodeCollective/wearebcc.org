import type { PartnerCtaContent } from "../content/types";
import { cx } from "../lib/cx";
import { Photo } from "../ui/Photo";
import p from "../ui/primitives.module.css";
import { Section } from "../ui/Section";
import s from "./PartnerCta.module.css";

type Props = { content: PartnerCtaContent; id?: string };

/** Three asks on crimson: hire, partner, fund. */
export function PartnerCta({ content, id }: Props) {
  const anyPhoto = content.columns.some((column) => column.image);

  return (
    <Section id={id} surface="crimson">
      <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>

      <div className={s.columns}>
        {content.columns.map((column) => (
          <div key={column.title} className={s.column}>
            {column.image ? (
              <Photo
                image={column.image}
                sizes="(min-width: 900px) 32vw, 100vw"
                className={s.photo}
              />
            ) : (
              anyPhoto && <div className={s.photoSlot} aria-hidden="true" />
            )}
            <p className={cx(p.mono, s.label)}>{column.label}</p>
            <h3 className={cx(p.title, s.title)}>{column.title}</h3>
            <p className={s.body}>{column.body}</p>
            <a href={column.cta.href} className={cx(p.button, p.cream, p.md)}>
              {column.cta.label}
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}
