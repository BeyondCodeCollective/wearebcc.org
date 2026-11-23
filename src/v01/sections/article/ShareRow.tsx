"use client";

import { useState } from "react";
import type { ArticlePageContent } from "../../content/article.types";
import s from "./ShareRow.module.css";

type Props = { content: ArticlePageContent["share"] };

/** Share links, plus a button that copies the article's address. */
export function ShareRow({ content }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(content.copy.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={s.row}>
      <span>{content.label}</span>
      <a href={content.linkedin.href} target="_blank" rel="noopener" className={s.link}>
        {content.linkedin.label}
      </a>
      <a href={content.instagram.href} target="_blank" rel="noopener" className={s.link}>
        {content.instagram.label}
      </a>
      <button type="button" className={s.link} onClick={copy}>
        {content.copy.label}
      </button>
      <span role="status" aria-live="polite" className={s.status}>
        {copied ? content.copy.copied : ""}
      </span>
    </div>
  );
}
