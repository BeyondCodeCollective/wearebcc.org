import type { ArticlePageContent } from "../content/article.types";
import { PageShell } from "../ui/PageShell";
import { Section } from "../ui/Section";

type Props = { content: ArticlePageContent };

/** Article, v0.1. Sections in the order of the design. All copy comes in as content. */
export function ArticlePage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer}>
      <Section>
        <h1>Article</h1>
      </Section>
    </PageShell>
  );
}
