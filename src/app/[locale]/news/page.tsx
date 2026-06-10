"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsCard } from "@/components/news-card";
import { normalizeNews } from "@/lib/news";

export default function NewsIndex() {
  const t = useTranslations("news");
  const posts = normalizeNews(t.raw("items"));

  return (
    <div className="min-h-screen bg-off-white">
      <Nav variant="light" />

      {/* Header */}
      <section className="px-6 pt-36 pb-12 lg:px-8 lg:pt-44 lg:pb-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-mono text-xs tracking-wider text-cobalt"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("label")}
            </p>
            <h1 className="mt-3 font-heading text-[clamp(2.5rem,8vw,6rem)] leading-[0.85] text-true-black">
              {t("headline1")}
              <br />
              {t("headline2")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-grey-3">
              {t("subheading")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-28 lg:px-8 lg:pb-36">
        <div className="mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <p
              className="font-mono text-sm tracking-wider text-grey-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("emptyState")}
            </p>
          ) : (
            <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <NewsCard key={post.slug} post={post} index={i % 3} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
