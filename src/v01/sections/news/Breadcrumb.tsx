import { Fragment } from "react";
import type { BreadcrumbContent } from "../../content/news.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import s from "./Breadcrumb.module.css";

type Props = { content: BreadcrumbContent };

/** Home / News / Category trail. The last item is the current page. */
export function Breadcrumb({ content }: Props) {
  return (
    <nav aria-label={content.label} className={cx(p.mono, s.trail)}>
      {content.items.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 && " / "}
          {item.href ? (
            <a href={item.href}>{item.label}</a>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
