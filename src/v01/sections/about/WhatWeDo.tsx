import type { WhatWeDoContent } from "../../content/about.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./WhatWeDo.module.css";

type Props = { content: WhatWeDoContent };

/** Three jobs, three colored cards. A swipeable row on phones. */
export function WhatWeDo({ content }: Props) {
  return (
    <Section pad="none" className={s.section}>
      <div className={s.grid}>
        <div className={s.intro}>
          <h2 className={cx(p.display, s.headline)}>
            {content.headline.map((line) => (
              <span key={line} className={s.line}>
                {line}
              </span>
            ))}
          </h2>
          <p className={s.lede}>{content.lede}</p>
        </div>

        <ul className={s.rail}>
          {content.cards.map((card) => (
            <li key={card.title} className={s.item}>
              <Section as="div" surface={card.surface} pad="none" flush className={s.card}>
                <Photo image={card.image} sizes="(min-width: 900px) 24vw, 80vw" className={s.photo} />
                <div className={s.body}>
                  <div className={s.titleRow}>
                    <h3 className={cx(p.display, s.title)}>{card.title}</h3>
                    <span className={cx(p.mono, s.number)}>{card.number}</span>
                  </div>
                  <p className={s.text}>{card.body}</p>
                  <div className={s.chips}>
                    {card.links.map((link) => (
                      <a key={link.label} href={link.href} className={cx(p.mono, s.chip)}>
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </Section>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
