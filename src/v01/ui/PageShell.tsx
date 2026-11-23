import "../tokens.css";
import type { ReactNode } from "react";
import type { FooterContent, HeaderContent } from "../content/types";
import { cx } from "../lib/cx";
import { Footer } from "../sections/Footer";
import { Header } from "../sections/Header";
import s from "./PageShell.module.css";

type Props = {
  header: HeaderContent;
  footer: FooterContent;
  /** The page's sections, in the order of its design. */
  children: ReactNode;
  /** A page's own root class, for the fluid display sizes only it uses. */
  className?: string;
};

/**
 * The frame every v0.1 page sits in: the token scope, the site header, the
 * main landmark and the site footer. It also clears the site-wide donate bar.
 */
export function PageShell({ header, footer, children, className }: Props) {
  return (
    <div id="top" className={cx("v01", s.page, className)} data-surface="paper">
      <Header content={header} />
      <main>{children}</main>
      <Footer content={footer} />
    </div>
  );
}
