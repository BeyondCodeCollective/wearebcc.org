import type { ProgramsPageContent } from "../content/programs.types";
import { ProgramList } from "../sections/programs/ProgramList";
import { ProgramsIntro } from "../sections/programs/ProgramsIntro";
import { StillUnsure } from "../sections/programs/StillUnsure";
import { PageShell } from "../ui/PageShell";
import s from "./Programs.module.css";

type Props = { content: ProgramsPageContent };

/** Programs, v0.1. Sections in the order of the design. All copy comes in as content. */
export function ProgramsPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer} className={s.page}>
      <ProgramsIntro content={content.intro} />
      <ProgramList ariaLabel={content.programs.ariaLabel} rows={content.programs.rows} />
      <StillUnsure content={content.unsure} />
    </PageShell>
  );
}
