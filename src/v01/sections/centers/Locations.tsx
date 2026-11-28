import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { CentersLocationsContent } from "../../content/centers.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Locations.module.css";

type Props = { content: CentersLocationsContent };

/** Every city as a huge word, solid where a Center is open, with what is known about it underneath. */
export function Locations({ content }: Props) {
  return (
    <Section surface="ink" pad="lg" className={s.section}>
      <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
      <ul className={s.list}>
        {content.cities.map((city) => (
          <li key={city.name} className={s.row}>
            <span className={cx(p.title, s.city, city.status === "soon" && s.outline)}>{city.name}</span>
            <span className={cx(p.mono, s.pill, city.status === "open" ? s.open : s.soon)}>{city.statusLabel}</span>
            <p className={s.detail}>{city.detail}</p>
            <a href={city.link.href} className={cx(p.arrowLink, s.link)}>
              {city.link.label}
              <ArrowRight weight="bold" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
      <p className={s.elsewhere}>
        {content.elsewhere.map((part) =>
          typeof part === "string" ? (
            part
          ) : (
            <a key={part.href} href={part.href}>
              {part.label}
            </a>
          ),
        )}
      </p>
    </Section>
  );
}
