import type { CentersLocationsContent } from "../../content/centers.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Locations.module.css";

type Props = { content: CentersLocationsContent };

/** Every city as a huge word: solid where a Center is open, outlined where one is coming. */
export function Locations({ content }: Props) {
  return (
    <Section surface="ink" pad="lg" className={s.section}>
      <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
      <ul className={s.list}>
        {content.cities.map((city) => (
          <li key={city.name} className={s.row}>
            <span className={cx(p.title, s.city, city.status === "soon" && s.outline)}>{city.name}</span>
            <span className={cx(p.mono, s.pill, city.status === "open" ? s.open : s.soon)}>{city.statusLabel}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
