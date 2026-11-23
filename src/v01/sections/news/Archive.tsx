"use client";

import { useMemo, useState } from "react";
import type { PostCard } from "../../content/news.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Archive.module.css";

type Props = {
  content: {
    headline: string;
    filterLabel: string;
    allLabel: string;
    loadMore: string;
    pageSize: number;
  };
  posts: PostCard[];
};

/** Order the design lists its filters in. Categories it does not know follow, A to Z. */
const KNOWN_ORDER = ["Announcement", "Spotlight", "Event", "Press"];

function orderedCategories(posts: PostCard[]): string[] {
  const found = Array.from(new Set(posts.map((post) => post.category)));
  const rank = (name: string) => {
    const at = KNOWN_ORDER.indexOf(name);
    return at === -1 ? KNOWN_ORDER.length : at;
  };
  return found.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
}

/** Every other post as a ruled list, with filter chips driven by the posts' own categories. */
export function Archive({ content, posts }: Props) {
  const [filter, setFilter] = useState<string | null>(null);
  const [visible, setVisible] = useState(content.pageSize);
  const categories = useMemo(() => orderedCategories(posts), [posts]);

  if (posts.length === 0) return null;

  const matching = filter === null ? posts : posts.filter((post) => post.category === filter);
  const shown = matching.slice(0, visible);

  function choose(next: string | null) {
    setFilter(next);
    setVisible(content.pageSize);
  }

  return (
    <Section id="archive" pad="md">
      <div className={s.head}>
        <h2 className={cx(p.display, s.headline)}>{content.headline}</h2>
        <div role="group" aria-label={content.filterLabel} className={s.filters}>
          {[null, ...categories].map((option) => (
            <button
              key={option ?? "all"}
              type="button"
              aria-pressed={filter === option}
              className={cx(p.mono, s.chip)}
              onClick={() => choose(option)}
            >
              {option ?? content.allLabel}
            </button>
          ))}
        </div>
      </div>

      <ul className={s.list}>
        {shown.map((post) => (
          <li key={post.slug}>
            <a href={post.href} className={s.row}>
              <span className={s.meta}>
                <time dateTime={post.dateTime}>{post.dateLabel}</time>
                <span className={s.category}>{post.category}</span>
              </span>
              <span className={cx(p.display, s.title)}>{post.title}</span>
              <Photo
                image={{ ...post.image, alt: "" }}
                sizes="(min-width: 700px) 160px, 96px"
                className={s.thumb}
              />
            </a>
          </li>
        ))}
      </ul>

      {matching.length > shown.length && (
        <div className={s.more}>
          <button
            type="button"
            className={cx(p.button, p.ghost, p.lg)}
            onClick={() => setVisible((count) => count + content.pageSize)}
          >
            {content.loadMore}
          </button>
        </div>
      )}
    </Section>
  );
}
