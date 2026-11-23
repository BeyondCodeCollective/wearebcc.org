import type { ImageRef } from "../../content/types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import s from "./EventRow.module.css";

type Props = {
  label: { eyebrow: string; value: string };
  /** Machine-readable date for the label, when the day is a real one. */
  dateTime?: string;
  title: string;
  description: string;
  descriptionTail?: { lead: string; rest: string };
  meta: string[];
  image?: ImageRef;
  cta: { label: string; href: string; external?: boolean };
  /** Fixed-width button, as the archive rows have. */
  fixedCta?: boolean;
};

/** One row of a dated list: date, thumbnail, words, tags and one button. */
export function EventRow({ label, dateTime, title, description, descriptionTail, meta, image, cta, fixedCta }: Props) {
  const value = dateTime ? <time dateTime={dateTime}>{label.value}</time> : label.value;
  return (
    <article className={s.row}>
      <div className={s.date}>
        <p className={cx(p.mono, s.eyebrow)}>{label.eyebrow}</p>
        <p className={cx(p.display, s.day)}>{value}</p>
      </div>
      {image && <Photo image={image} sizes="96px" className={s.thumb} />}
      <div className={s.body}>
        <h3 className={s.title}>{title}</h3>
        <p className={s.text}>
          {description}
          {descriptionTail && (
            <>
              {" "}
              <u>{descriptionTail.lead}</u>
              {descriptionTail.rest}
            </>
          )}
        </p>
      </div>
      <p className={cx(p.mono, s.tags)}>
        {meta.map((tag) => (
          <span key={tag} className={s.tag}>
            {tag}
          </span>
        ))}
      </p>
      <a
        href={cta.href}
        className={cx(p.button, p.ghost, p.md, p.fine, s.cta, fixedCta && s.fixed)}
        {...(cta.external ? { target: "_blank", rel: "noopener" } : {})}
      >
        {cta.label}
      </a>
    </article>
  );
}
