import type { SignupPageContent } from "../content/signup.types";
import { Signup } from "../sections/Signup";
import { Breadcrumb } from "../sections/signup/Breadcrumb";
import { NextSteps } from "../sections/signup/NextSteps";
import { Tiles } from "../sections/signup/Tiles";
import { PageShell } from "../ui/PageShell";

type Props = { content: SignupPageContent };

/** Signup, v0.1. Sections in the order of the design. All copy comes in as content. */
export function SignupPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer}>
      <Breadcrumb {...content.breadcrumb} />
      <Signup content={content.form} heading="h1" />
      <NextSteps headline={content.next.headline} steps={content.next.steps} />
      <Tiles tiles={content.tiles} />
    </PageShell>
  );
}
