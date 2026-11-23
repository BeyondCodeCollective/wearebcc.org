import type { ArticlePageContent } from "../content/article.types";
import { Body } from "../sections/article/Body";
import { ClosingCard } from "../sections/article/ClosingCard";
import { Hero } from "../sections/article/Hero";
import { KeepReading } from "../sections/article/KeepReading";
import { ReadingProgress } from "../sections/article/ReadingProgress";
import { VideoCard } from "../sections/article/VideoCard";
import { PageShell } from "../ui/PageShell";
import s from "./Article.module.css";

type Props = { content: ArticlePageContent };

/** Article, v0.1: one template, filled from a real news post. */
export function ArticlePage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer} className={s.page}>
      <ReadingProgress />
      <Hero breadcrumb={content.breadcrumb} post={content.post} />
      <Body post={content.post} share={content.share} />
      {content.video ? <VideoCard content={content.video} /> : <ClosingCard content={content.closing} />}
      <KeepReading content={content.more} />
    </PageShell>
  );
}
