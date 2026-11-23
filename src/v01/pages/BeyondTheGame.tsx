import type { BeyondTheGamePageContent } from "../content/beyondTheGame.types";
import { PageShell } from "../ui/PageShell";
import { Section } from "../ui/Section";

type Props = { content: BeyondTheGamePageContent };

/** BeyondTheGame, v0.1. Sections in the order of the design. All copy comes in as content. */
export function BeyondTheGamePage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer}>
      <Section>
        <h1>BeyondTheGame</h1>
      </Section>
    </PageShell>
  );
}
