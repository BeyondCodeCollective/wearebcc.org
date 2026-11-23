import type { NewsPageContent } from "../content/news.types";
import { Archive } from "../sections/news/Archive";
import { Featured } from "../sections/news/Featured";
import { Newsletter } from "../sections/news/Newsletter";
import { Press } from "../sections/news/Press";
import { PageShell } from "../ui/PageShell";
import s from "./News.module.css";

type Props = { content: NewsPageContent };

/** News, v0.1. Sections in the order of the design. All copy comes in as content. */
export function NewsPage({ content }: Props) {
  const [featured, ...rest] = content.posts;
  return (
    <PageShell header={content.header} footer={content.footer} className={s.page}>
      <Featured breadcrumb={content.breadcrumb} cta={content.featured.cta} post={featured} />
      <Archive content={content.archive} posts={rest} />
      <Press content={content.press} />
      <Newsletter content={content.newsletter} />
    </PageShell>
  );
}
