import { siteFooter, siteHeader } from "./site";
import type { FooterContent, HeaderContent } from "./types";

export type ImpactReportContent = {
  header: HeaderContent;
  footer: FooterContent;
  report: { src: string; title: string };
};

/**
 * The six month impact report. NOT IN DESIGN: the report is a static page of its
 * own (public/impact-report.html). This puts it inside the site header and footer,
 * so a reader can go on to the rest of the site (Mica, 2026-11-23).
 */
export const impactReport: ImpactReportContent = {
  header: siteHeader({ current: "Impact" }),
  footer: siteFooter(),
  report: { src: "/impact-report.html", title: "Six month impact report, fall 2026" },
};
