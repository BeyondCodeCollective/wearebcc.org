import Image from "next/image";
import type { FooterContent } from "../content/types";
import { cx } from "../lib/cx";
import p from "../ui/primitives.module.css";
import { Section } from "../ui/Section";
import s from "./Footer.module.css";

type Props = { content: FooterContent };

/** Site footer for v0.1 pages: brand line, link columns, how to reach us, legal bar. */
export function Footer({ content }: Props) {
  return (
    <Section as="footer" pad="none">
      <div className={s.inner}>
        <div className={s.top}>
          <div className={s.brand}>
            <Image
              src={content.logo.src}
              alt={content.logo.alt}
              width={content.logo.width}
              height={content.logo.height}
              unoptimized
              className={s.logo}
            />
            <p className={s.tagline}>{content.tagline}</p>
          </div>

          <nav aria-label={content.navLabel} className={s.nav}>
            {content.columns.map((column) => (
              <div key={column.title}>
                <h2 className={cx(p.mono, s.heading)}>{column.title}</h2>
                <ul className={s.links}>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={s.link}
                        {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <address className={s.contact}>
            <h2 className={cx(p.mono, s.heading)}>{content.contact.title}</h2>
            <a href={content.contact.phone.href} className={s.contactLink}>
              {content.contact.phone.label}
            </a>
            <a href={content.contact.email.href} className={s.contactLink}>
              {content.contact.email.label}
            </a>
            <p className={s.address}>
              {content.contact.address.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < content.contact.address.length - 1 && <br />}
                </span>
              ))}
            </p>
          </address>
        </div>

        <div className={cx(p.mono, s.legal)}>
          {content.legal.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
