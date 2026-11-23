import type { LinkRef } from "../../content/types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Breadcrumb.module.css";

type Props = { home: LinkRef; current: string; ariaLabel: string };

/** Home / Sign up, on the same peach ground as the form below it. */
export function Breadcrumb({ home, current, ariaLabel }: Props) {
  return (
    <Section surface="peach" pad="none">
      {/* NOT IN DESIGN: the page's one h1. The design's headline is the sign-up sentence, which is a form. */}
      <h1 className={p.srOnly}>{current}</h1>
      <nav aria-label={ariaLabel} className={cx(p.mono, s.crumb)}>
        <a href={home.href}>{home.label}</a> / <span aria-current="page">{current}</span>
      </nav>
    </Section>
  );
}
