import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ProgramsContent } from "../content/types";
import { cx } from "../lib/cx";
import { Photo } from "../ui/Photo";
import p from "../ui/primitives.module.css";
import { Section } from "../ui/Section";
import s from "./Programs.module.css";

type Props = {
  content: ProgramsContent;
  id?: string;
  /** Time the page was rendered, in epoch ms. Tags with a hideAfter before it are dropped. */
  now: number;
};

/** The three core programs as rows, plus a line of links to the rest. */
export function Programs({ content, id, now }: Props) {
  return (
    <Section id={id} rule="top">
      <div className={s.head}>
        <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
        <a href={content.all.href} className={p.arrowLink}>
          {content.all.label}
          <ArrowRight size={16} weight="bold" aria-hidden="true" />
        </a>
      </div>

      <div className={s.promise}>
        <p className={cx(p.title, s.promiseTitle)}>{content.promise.title}</p>
        <p className={cx(p.mono, s.promiseNote)}>{content.promise.note}</p>
        <p className={s.promiseBody}>{content.promise.body}</p>
      </div>

      <div className={s.list}>
        {content.programs.map((program) => (
          <article key={program.title} className={s.row}>
            {program.image && (
              <Photo
                image={program.image}
                sizes="(min-width: 700px) 240px, 100vw"
                className={s.photo}
              />
            )}
            <div className={s.body}>
              <h3 className={cx(p.display, s.title)}>{program.title}</h3>
              <p className={s.text}>{program.description}</p>
            </div>
            <ul className={cx(p.mono, s.tags)}>
              {program.tags
                .filter((tag) => !tag.hideAfter || now < Date.parse(tag.hideAfter))
                .map((tag) => (
                  <li key={tag.label}>{tag.label}</li>
                ))}
            </ul>
            <a
              href={program.cta.href}
              className={cx(p.button, p.ink, p.md, s.cta)}
              {...(program.cta.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              {program.cta.label}
            </a>
          </article>
        ))}

        <div className={s.more}>
          <p className={p.mono}>{content.more.label}</p>
          <p className={cx(p.title, s.moreLinks)}>
            {content.more.links.map((link, index) => (
              <span key={link.label}>
                {index > 0 && (
                  <span aria-hidden="true" className={s.slash}>
                    {" / "}
                  </span>
                )}
                <a href={link.href} className={s.moreLink}>
                  {link.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </Section>
  );
}
