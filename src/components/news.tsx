"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { normalizeNews } from "@/lib/news";
import { NewsCard } from "./news-card";

export function News() {
  const t = useTranslations("news");
  const posts = normalizeNews(t.raw("items")).slice(0, 3);

  // Don't render an empty section if there are no updates yet.
  if (posts.length === 0) return null;

  return (
    <section id="news" className="bg-off-white px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-mono text-xs tracking-wider text-cobalt"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t("label")}
            </p>
            <h2 className="mt-3 font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[0.9] text-true-black">
              {t("headline1")}
              <br />
              {t("headline2")}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-grey-3">
              {t("subheading")}
            </p>
          </motion.div>

          <Link
            href="/news"
            className="group inline-flex shrink-0 items-center gap-2 self-start border-2 border-true-black px-5 py-3 font-mono text-xs uppercase tracking-wider text-true-black transition-colors hover:bg-true-black hover:text-off-white sm:self-auto"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("viewAll")}
            <ArrowRight
              size={14}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <NewsCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
