"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CaretDown, List, X } from "@phosphor-icons/react";
import type { LanguageLink, LinkRef, NavItem } from "../content/types";
import { cx } from "../lib/cx";
import p from "./primitives.module.css";
import s from "./MobileMenu.module.css";

type Props = {
  label: string;
  navLabel: string;
  nav: NavItem[];
  languages: LanguageLink[];
  quickLinks?: LinkRef[];
};

/** The primary nav on small screens: a button that opens a panel under the header. */
export function MobileMenu({ label, navLabel, nav, languages, quickLinks }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        ref={toggle}
        type="button"
        className={cx(p.mono, s.toggle)}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{label}</span>
        {open ? <X size={16} weight="bold" aria-hidden="true" /> : <List size={16} weight="bold" aria-hidden="true" />}
      </button>

      <div
        id={panelId}
        className={s.panel}
        hidden={!open}
        // Following any link closes the panel, so an in-page jump is not left covered.
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        {quickLinks && (
          <ul className={cx(p.mono, s.quick)}>
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={s.quickLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        <nav aria-label={navLabel}>
          <ul className={s.list}>
            {nav.map((item) => (
              <li key={item.label} className={s.entry}>
                {item.children ? (
                  <details className={s.group}>
                    <summary className={cx(p.title, s.heading)}>
                      {item.label}
                      <CaretDown size={18} weight="bold" aria-hidden="true" className={s.caret} />
                    </summary>
                    <ul className={s.children}>
                      {item.children.map((child) => (
                        <li key={child.title}>
                          <a href={child.href} className={s.child}>
                            <span className={cx(p.display, s.childTitle)}>{child.title}</span>
                            <span className={s.childText}>{child.description}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <a href={item.href} className={cx(p.title, s.heading)}>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className={cx(p.mono, s.languages)}>
          {languages.map((language) => (
            <a
              key={language.code}
              href={language.href}
              lang={language.lang}
              hrefLang={language.current ? undefined : language.lang}
              aria-current={language.current ? "true" : undefined}
              className={s.language}
            >
              {language.code}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}