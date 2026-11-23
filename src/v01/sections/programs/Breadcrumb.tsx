import type { BreadcrumbItem } from "../../content/programs.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import s from "./Breadcrumb.module.css";

type Props = { items: BreadcrumbItem[] };

/** Trail back to Home. The last item is the current page and is not a link. */
export function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className={cx(p.mono, s.trail)}>
      {items.map((item, index) => (
        <span key={item.label}>
          {index > 0 && " / "}
          {item.href ? (
            <a href={item.href} className={s.link}>
              {item.label}
            </a>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
