import LegacyPage from "./legacy-page";
import { ArticlePage } from "@/v01/pages/Article";
import { article } from "@/v01/content/article";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;

  // v0.1: English gets the new page, built from src/v01. Spanish keeps the
  // current page in legacy-page.tsx, unchanged, until the new design has Spanish copy.
  if (locale === "en") return <ArticlePage content={article} />;

  return <LegacyPage />;
}
