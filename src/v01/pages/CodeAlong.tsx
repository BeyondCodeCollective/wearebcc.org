import type { CodeAlongPageContent } from "../content/codeAlong.types";
import { AboutShow } from "../sections/codeAlong/AboutShow";
import { BeFirst } from "../sections/codeAlong/BeFirst";
import { Episodes } from "../sections/codeAlong/Episodes";
import { Hero } from "../sections/codeAlong/Hero";
import { Hosts } from "../sections/codeAlong/Hosts";
import { NowStreaming } from "../sections/codeAlong/NowStreaming";
import { Stat } from "../sections/codeAlong/Stat";
import { Teach } from "../sections/codeAlong/Teach";
import { PageShell } from "../ui/PageShell";
import s from "./CodeAlong.module.css";

type Props = { content: CodeAlongPageContent };

/** CodeAlong, v0.1. Sections in the order of the design. All copy comes in as content. */
export function CodeAlongPage({ content }: Props) {
  return (
    <PageShell header={content.header} footer={content.footer} className={s.page}>
      <Hero content={content.hero} />
      <NowStreaming content={content.streaming} />
      <Stat content={content.stat} />
      <Episodes content={content.episodes} />
      <AboutShow content={content.about} />
      <Hosts content={content.hosts} />
      <Teach content={content.teach} />
      <BeFirst content={content.beFirst} />
    </PageShell>
  );
}
