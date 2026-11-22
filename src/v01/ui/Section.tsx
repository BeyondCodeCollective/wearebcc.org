import type { ReactNode } from "react";
import type { Surface } from "../content/types";
import { cx } from "../lib/cx";
import s from "./Section.module.css";

type Pad = "none" | "sm" | "md" | "default" | "lg";

const padClass: Record<Pad, string | undefined> = {
  none: undefined,
  sm: s.padSm,
  md: s.padMd,
  default: s.padDefault,
  lg: s.padLg,
};

type Props = {
  children: ReactNode;
  /** Background and text colors for everything inside. */
  surface?: Surface;
  as?: "section" | "div" | "header" | "footer";
  id?: string;
  /** Vertical padding step. */
  pad?: Pad;
  /** Drops the side gutters, for content that runs edge to edge. */
  flush?: boolean;
  rule?: "top" | "bottom-soft";
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
};

/**
 * Wraps every section of a v0.1 page. It sets the surface (which colors text,
 * rules, links and focus rings inside it) and the page gutters.
 */
export function Section({
  children,
  surface = "paper",
  as: Tag = "section",
  id,
  pad = "default",
  flush,
  rule,
  ariaLabel,
  ariaLabelledBy,
  className,
}: Props) {
  return (
    <Tag
      id={id}
      data-surface={surface}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cx(
        s.section,
        padClass[pad],
        flush && s.flush,
        rule === "top" && s.ruleTop,
        rule === "bottom-soft" && s.ruleBottomSoft,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
