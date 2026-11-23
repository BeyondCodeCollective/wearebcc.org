import LegacyPage from "./legacy-page";
import { DonatePage } from "@/v01/pages/Donate";
import { donate } from "@/v01/content/donate";

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;

  // v0.1: English gets the new page, built from src/v01. Spanish keeps the
  // current page in legacy-page.tsx, unchanged, until the new design has Spanish copy.
  if (locale === "en") return <DonatePage content={donate} />;

  return <LegacyPage />;
}
