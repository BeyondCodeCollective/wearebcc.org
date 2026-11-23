import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { NewsPressContent } from "../../content/news.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Press.module.css";

type Props = { content: NewsPressContent };

/** Press resources on ink: a ruled list of what to download or who to write to. */
export function Press({ content }: Props) {
  return (
    <Section id="press" surface="ink" pad="lg">
      <div className={s.layout}>
        <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
        <ul className={s.list}>
          {content.rows.map((row) => (
            <li key={row.title} className={s.row}>
              <span className={cx(p.title, s.title)}>{row.title}</span>
              <span className={s.body}>{row.body}</span>
              <a
                href={row.cta.href}
                className={cx(p.arrowLink, s.link)}
                {...(row.cta.external ? { target: "_blank", rel: "noopener" } : {})}
              >
                {row.cta.label} <ArrowRight aria-hidden="true" size={16} weight="regular" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
