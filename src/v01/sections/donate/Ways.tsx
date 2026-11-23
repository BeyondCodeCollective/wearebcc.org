import { ArrowRight, Minus, Plus } from "@phosphor-icons/react/dist/ssr";
import type { DonatePageContent, WayParagraph } from "../../content/donate.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Ways.module.css";

type Props = { content: DonatePageContent["ways"] };

function Paragraph({ paragraph }: { paragraph: WayParagraph }) {
  if ("lines" in paragraph) {
    return (
      <p>
        {paragraph.lines.map((line, index) => (
          <span key={line}>
            {line}
            {index < paragraph.lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  }
  return (
    <p>
      {paragraph.text.map((part) =>
        typeof part === "string" ? (
          part
        ) : (
          <a key={part.href} href={part.href}>
            {part.label}
          </a>
        ),
      )}
    </p>
  );
}

/** Other ways to give: two links out, three rows that open in place. */
export function Ways({ content }: Props) {
  return (
    <Section surface="paper-warm" pad="lg">
      <div className={s.layout}>
        <h2 className={cx(p.display, s.headline)}>
          {content.headline.map((line, index) => (
            <span key={line}>
              {line}
              {index < content.headline.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <ul className={s.list}>
          {content.items.map((item) =>
            item.kind === "link" ? (
              <li key={item.title} className={cx(s.row, s.linkRow)}>
                <h3 className={cx(p.display, s.title)}>{item.title}</h3>
                <p className={s.note}>{item.body}</p>
                <a href={item.link.href} className={p.arrowLink}>
                  {item.link.label}
                  <ArrowRight size={16} weight="regular" aria-hidden="true" />
                </a>
              </li>
            ) : (
              <li key={item.title} className={s.row}>
                <details className={s.details}>
                  <summary className={s.summary}>
                    <span className={cx(p.display, s.title)}>{item.title}</span>
                    <Plus size={26} weight="regular" aria-hidden="true" className={s.plus} />
                    <Minus size={26} weight="regular" aria-hidden="true" className={s.minus} />
                  </summary>
                  <div className={s.panel}>
                    {item.paragraphs.map((paragraph, index) => (
                      <Paragraph key={index} paragraph={paragraph} />
                    ))}
                  </div>
                </details>
              </li>
            ),
          )}
        </ul>
      </div>
    </Section>
  );
}
