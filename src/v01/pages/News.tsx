import type { NewsPageContent } from "../content/news.types";
import { PageShell } from "../ui/PageShell";
import { Section } from "../ui/Section";

type Props = { content: NewsPageContent };

/** News, v0.1. Sections in the order of the design. All copy comes in as content. */
export function NewsPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer}>
      <Section>
        <h1>News</h1>
      </Section>
    </PageShell>
  );
}
