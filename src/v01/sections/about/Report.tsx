import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { ReportContent } from "../../content/about.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Sticker } from "../../ui/Sticker";
import s from "./Report.module.css";

type Props = { content: ReportContent };

/** A tilted report cover beside the pitch and the download button. Used on About and Impact. */
export function Report({ content }: Props) {
  const { cta } = content;

  return (
    <Section id={content.id} pad="none" className={s.section}>
      {content.sticker && <Sticker sticker={content.sticker} className={s.sticker} />}
      <div className={s.grid}>
        <div className={s.cover} data-surface="cobalt" aria-hidden="true">
          <span className={s.coverSmall}>{content.coverTop}</span>
          <span className={cx(p.display, s.coverTitle)}>
            {content.coverTitle.map((line) => (
              <span key={line} className={s.line}>
                {line}
              </span>
            ))}
          </span>
          <span className={s.coverSmall}>{content.coverBottom}</span>
        </div>

        <div className={s.text}>
          <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
          <div className={cx(s.copy, content.spaced && s.spaced)}>
            {content.paragraphs.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className={s.actions}>
            <a
              href={cta.href}
              className={cx(p.button, p.ink, p.lg)}
              {...(cta.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              {cta.label}
            </a>
            {content.also && (
              <a
                href={content.also.href}
                className={p.arrowLink}
                {...(content.also.external ? { target: "_blank", rel: "noopener" } : {})}
              >
                {content.also.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
