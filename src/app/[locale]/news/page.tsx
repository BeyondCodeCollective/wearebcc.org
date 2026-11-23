import { getMessages } from "next-intl/server";
import LegacyPage from "./legacy-page";
import { NewsPage } from "@/v01/pages/News";
import { buildNews } from "@/v01/content/news";
import { normalizeNews } from "@/lib/news";

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;

  // v0.1: English gets the new page, built from src/v01. Spanish keeps the
  // current page in legacy-page.tsx, unchanged, until the new design has Spanish copy.
  if (locale === "en") {
    const messages = (await getMessages({ locale })) as { news?: { items?: unknown } };
    // Drafts stay out of the listing: normalizeNews drops them unless asked.
    const posts = normalizeNews(messages.news?.items);
    return <NewsPage content={buildNews(posts)} />;
  }

  return <LegacyPage />;
}
