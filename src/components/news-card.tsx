"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatNewsDate, type NewsPost } from "@/lib/news";

/**
 * Editorial card for a single news post. Used on the homepage section
 * and the full /news index. The whole card links to the post detail page.
 */
export function NewsCard({ post, index = 0 }: { post: NewsPost; index?: number }) {
  const locale = useLocale();
  const t = useTranslations("news");

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className="group flex flex-col"
    >
      <Link href={`/news/${post.slug}`} className="flex h-full flex-col">
        {/* Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-grey-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.imageAlt || post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: post.imagePosition || "center" }}
          />
          <span
            className="absolute left-3 top-3 bg-true-black/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-electric-green backdrop-blur-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {post.category}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col pt-5">
          <p
            className="font-mono text-[11px] uppercase tracking-wider text-grey-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {formatNewsDate(post.date, locale)}
          </p>
          <h3 className="mt-2 font-heading text-2xl leading-[0.95] text-true-black transition-colors group-hover:text-cobalt">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-grey-3">
            {post.excerpt}
          </p>
          <span
            className="mt-4 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-cobalt"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {t("readMore")}
            <ArrowUpRight
              size={14}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
