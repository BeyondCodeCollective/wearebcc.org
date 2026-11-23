import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import LegacyPage from "./legacy-page";
import { ArticlePage } from "@/v01/pages/Article";
import { buildArticle } from "@/v01/content/article";
import { normalizeNews } from "@/lib/news";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;

  // v0.1: English gets the new page, built from src/v01. Spanish keeps the
  // current page in legacy-page.tsx, unchanged, until the new design has Spanish copy.
  if (locale === "en") {
    const messages = (await getMessages({ locale })) as { news?: { items?: unknown } };
    const raw = messages.news?.items;
    // Drafts resolve on their own URL (the layout decides what to serve), never in the lists.
    const post = normalizeNews(raw, { includeDrafts: true }).find((item) => item.slug === slug);
    if (!post) notFound();
    const others = normalizeNews(raw).filter((item) => item.slug !== slug);
    return <ArticlePage content={buildArticle(post, others)} />;
  }

  return <LegacyPage />;
}
