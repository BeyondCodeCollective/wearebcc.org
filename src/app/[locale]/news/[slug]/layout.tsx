import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { normalizeNews } from "@/lib/news";

const SITE_URL = "https://www.wearebcc.org";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const messages = (await getMessages({ locale })) as {
    news?: { items?: unknown };
  };
  const posts = normalizeNews(messages.news?.items);
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  const image = post.image.startsWith("http")
    ? post.image
    : `${SITE_URL}${post.image}`;

  return {
    title: `${post.title} | Beyond Code Collective`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/${locale}/news/${slug}`,
      siteName: "Beyond Code Collective",
      type: "article",
      publishedTime: post.date,
      images: [{ url: image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default function NewsArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
