import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { SignupPageContent } from "../../content/signup.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Tiles.module.css";

type Props = { tiles: SignupPageContent["tiles"] };

/** Two full-colour doors for visitors who are here for something else. */
export function Tiles({ tiles }: Props) {
  return (
    <Section pad="none" className={s.wrap}>
      <div className={s.grid}>
        {tiles.map((tile) => (
          <a key={tile.link.href} href={tile.link.href} data-surface={tile.surface} className={s.tile}>
            <span className={cx(p.display, s.headline)}>
              {tile.lines.map((line, index) => (
                <span key={line} className={s.line}>
                  {line}
                  {index < tile.lines.length - 1 && <br />}
                </span>
              ))}
            </span>
            <span className={cx(p.arrowLink, s.link)}>
              {tile.link.label}
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
