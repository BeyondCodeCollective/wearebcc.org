import Image from "next/image";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import type { HeaderContent } from "../content/types";
import { cx } from "../lib/cx";
import { MobileMenu } from "../ui/MobileMenu";
import p from "../ui/primitives.module.css";
import s from "./Header.module.css";

type Props = { content: HeaderContent };

/**
 * Site header for v0.1 pages: utility strip, then the bar with logo, primary
 * nav, language and sign-up. The strip scrolls away; the bar stays in view.
 */
export function Header({ content }: Props) {
  return (
    <>
      <div className={cx(p.mono, s.strip)} data-surface="paper">
        {content.strip.map((line, index) => (
          <p key={line} className={index > 0 ? s.stripExtra : undefined}>
            {line}
          </p>
        ))}
      </div>

      <header className={s.header} data-surface="paper">
      <div className={s.bar}>
        <a href={content.homeHref} aria-label={content.homeLabel} className={s.logo}>
          <Image
            src={content.logo.src}
            alt=""
            width={content.logo.width}
            height={content.logo.height}
            unoptimized
            priority
            className={s.logoImg}
          />
        </a>

        <nav aria-label={content.navLabel} className={cx(p.mono, s.nav)}>
          <ul className={s.navList}>
            {content.nav.map((item) => (
              <li key={item.label} className={s.item}>
                <a href={item.href} className={s.link}
                  aria-haspopup={item.children ? "true" : undefined}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.label}
                  {item.children && <CaretDown size={12} weight="bold" aria-hidden="true" className={s.caret} />}
                </a>
                {item.children && (
                  <ul className={s.menu}>
                    {item.children.map((child) => (
                      <li key={child.title}>
                        <a href={child.href} className={s.menuLink}>
                          <span className={cx(p.display, s.menuTitle)}>{child.title}</span>
                          <span className={s.menuText}>{child.description}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.actions}>
          <div className={cx(p.mono, s.languages)}>
            {content.languages.map((language, index) => (
              <span key={language.code}>
                {index > 0 && (
                  <span aria-hidden="true" className={s.divider}>
                    |
                  </span>
                )}
                <a
                  href={language.href}
                  lang={language.lang}
                  hrefLang={language.current ? undefined : language.lang}
                  aria-current={language.current ? "true" : undefined}
                  className={s.language}
                >
                  {language.code}
                </a>
              </span>
            ))}
          </div>
          <a href={content.cta.href} className={cx(p.button, p.ink, s.cta)}>
            {content.cta.label}
          </a>
          <div className={s.mobile}>
            <MobileMenu
              label={content.menuLabel}
              navLabel={content.navLabel}
              nav={content.nav}
              languages={content.languages}
              quickLinks={content.quickLinks}
            />
          </div>
        </div>
      </div>
      </header>
    </>
  );
}