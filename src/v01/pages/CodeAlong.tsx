import type { CodeAlongPageContent } from "../content/codeAlong.types";
import { PageShell } from "../ui/PageShell";
import { Section } from "../ui/Section";

type Props = { content: CodeAlongPageContent };

/** CodeAlong, v0.1. Sections in the order of the design. All copy comes in as content. */
export function CodeAlongPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer}>
      <Section>
        <h1>CodeAlong</h1>
      </Section>
    </PageShell>
  );
}
