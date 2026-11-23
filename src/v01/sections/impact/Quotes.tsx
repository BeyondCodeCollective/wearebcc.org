"use client";

import { useRef, useState } from "react";
import type { QuotesContent } from "../../content/impact.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Quotes.module.css";

type Props = { content: QuotesContent };

/**
 * Learner quotes on cobalt. Slides move sideways. With more than one quote a radio group of
 * dots picks the slide, and the arrow keys move between them. A single quote shows no dots.
 */
export function Quotes({ content }: Props) {
  const [index, setIndex] = useState(0);
  const dots = useRef<(HTMLButtonElement | null)[]>([]);
  const count = content.slides.length;

  function choose(next: number) {
    const wrapped = (next + count) % count;
    setIndex(wrapped);
    dots.current[wrapped]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      choose(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      choose(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      choose(0);
    } else if (event.key === "End") {
      event.preventDefault();
      choose(count - 1);
    }
  }

  return (
    <Section surface="cobalt" pad="none" ariaLabel={content.groupLabel} className={s.section}>
      <div className={s.group}>
        <div className={s.view}>
          <div
            className={s.track}
            style={{ transform: `translateX(-${index * 100}%)` }}
            aria-live="polite"
          >
            {content.slides.map((slide, i) => (
              <figure key={slide.quote} className={s.slide} aria-hidden={i !== index}>
                <blockquote className={cx(p.display, s.quote)}>{slide.quote}</blockquote>
                <figcaption className={s.caption}>{slide.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        {count > 1 && (
          <div role="radiogroup" aria-label={content.dotsLabel} className={s.dots} onKeyDown={onKeyDown}>
            {content.slides.map((slide, i) => (
              <button
                key={slide.quote}
                ref={(el) => {
                  dots.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={i === index}
                aria-label={`${content.dotLabel} ${i + 1}`}
                tabIndex={i === index ? 0 : -1}
                className={s.dot}
                onClick={() => setIndex(i)}
              >
                <span className={s.mark} />
              </button>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
