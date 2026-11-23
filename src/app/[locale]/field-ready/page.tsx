import LegacyPage from "./legacy-page";
import { BeyondReadyPage } from "@/v01/pages/BeyondReady";
import { beyondReady } from "@/v01/content/beyondReady";

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;

  // v0.1: English gets the new page, built from src/v01. Spanish keeps the
  // current page in legacy-page.tsx, unchanged, until the new design has Spanish copy.
  if (locale === "en") return <BeyondReadyPage content={beyondReady} />;

  return <LegacyPage />;
}
