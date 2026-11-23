import type { AboutPageContent } from "../content/about.types";
import { PageShell } from "../ui/PageShell";
import { Section } from "../ui/Section";

type Props = { content: AboutPageContent };

/** About, v0.1. Sections in the order of the design. All copy comes in as content. */
export function AboutPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer}>
      <Section>
        <h1>About</h1>
      </Section>
    </PageShell>
  );
}
