import Image from "next/image";
import type { CSSProperties } from "react";
import type { PartnersStripContent } from "../content/types";
import { cx } from "../lib/cx";
import p from "../ui/primitives.module.css";
import { Section } from "../ui/Section";
import s from "./PartnersStrip.module.css";

type Props = { content: PartnersStripContent };

/**
 * Partner logos as a slow ticker. The track holds the list twice and slides left
 * by exactly one list, so the loop point is seamless. The second copy is hidden
 * from assistive tech. With reduced motion the track stops and shows one wrapped row.
 */
export function PartnersStrip({ content }: Props) {
  return (
    <Section pad="none" rule="bottom-soft" ariaLabel={content.ariaLabel}>
      <div className={s.strip}>
        <p className={cx(p.mono, s.label)}>{content.label}</p>
        <div className={s.viewport}>
          <div className={s.track}>
            {[false, true].map((copy) => (
              <ul key={copy ? "copy" : "list"} className={cx(s.logos, copy && s.copy)} aria-hidden={copy || undefined}>
                {content.logos.map((logo) => (
                  <li key={logo.src} className={s.logo}>
                    <Image
                      src={logo.src}
                      alt={copy ? "" : logo.alt}
                      width={logo.width}
                      height={logo.height}
                      sizes="160px"
                      className={s.image}
                      style={{ "--logo-h": `${logo.maxHeight}px` } as CSSProperties}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
