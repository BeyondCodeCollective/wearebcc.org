import type { AboutShowContent } from "../../content/codeAlong.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import { Badge, CtaButton, Marked } from "./parts";
import s from "./AboutShow.module.css";
import t from "./tone.module.css";

type Props = { content: AboutShowContent };

/** What the show is, beside a sample of the code it teaches. */
export function AboutShow({ content }: Props) {
  return (
    <Section surface="paper" className={t.mint}>
      <div className={s.grid}>
        <div className={s.copy}>
          <Badge>{content.badge}</Badge>
          <h2 className={cx(p.display, s.headline)}>
            <Marked parts={content.headline} />
          </h2>
          {content.body.map((paragraph) => (
            <p key={paragraph} className={s.body}>
              {paragraph}
            </p>
          ))}
          <CtaButton link={content.cta} kind="solid" arrow />
        </div>
        <pre className={s.code} tabIndex={0} aria-label={content.codeLabel}>
          <code>
            {content.code.map((line, index) => (
              <span key={index}>
                {line.map((token) => (
                  <span key={token.text} className={token.kind ? s[token.kind] : undefined}>
                    {token.text}
                  </span>
                ))}
                {index < content.code.length - 1 && "\n"}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </Section>
  );
}
