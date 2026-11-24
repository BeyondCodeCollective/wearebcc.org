"use client";

import { useEffect, useRef, useState } from "react";
import type { ImpactReportContent } from "../../content/impactReport";
import s from "./ReportFrame.module.css";

type Props = { content: ImpactReportContent["report"] };

const STYLE_ID = "site-frame";

/**
 * Inside the site the report drops its own logo and footer line, which the site
 * header and footer replace, and is as tall as its content, not as the window.
 */
const FRAME_CSS = `
html { overflow: hidden; }
[data-document-role="page"] { min-height: 0 !important; }
[data-document-role="page"] > header img,
[data-document-role="page"] > footer { display: none !important; }
`;

/** The static report, shown whole: the frame takes the height of the report, so only the page scrolls. */
export function ReportFrame({ content }: Props) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    let observer: ResizeObserver | undefined;
    let observed: HTMLElement | null = null;

    const measure = () => {
      const body = frame.contentDocument?.body;
      if (body && body.offsetHeight > 0) setHeight(body.offsetHeight);
    };

    // The report writes its own document after it loads, which drops what was
    // added to the first one: so this runs again until the report is the one styled.
    const sync = () => {
      const doc = frame.contentDocument;
      const view = frame.contentWindow as (Window & typeof globalThis) | null;
      if (!doc?.body || !doc.head || !view) return;
      if (!doc.getElementById(STYLE_ID)) {
        const style = doc.createElement("style");
        style.id = STYLE_ID;
        style.textContent = FRAME_CSS;
        doc.head.appendChild(style);
      }
      if (observed !== doc.body) {
        observer?.disconnect();
        observer = new view.ResizeObserver(measure);
        observer.observe(doc.body);
        observed = doc.body;
      }
      measure();
    };

    frame.addEventListener("load", sync);
    const timer = window.setInterval(sync, 500);
    sync();
    return () => {
      frame.removeEventListener("load", sync);
      window.clearInterval(timer);
      observer?.disconnect();
    };
  }, []);

  return (
    <iframe
      ref={ref}
      className={s.frame}
      src={content.src}
      title={content.title}
      style={height ? { height } : undefined}
    />
  );
}
