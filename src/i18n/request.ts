import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { getContentOverrides } from "@/lib/content-db";

/**
 * Union two news-item arrays by slug. DB (admin-edited) items win for slugs
 * present in both; repo-only slugs are appended so posts shipped in the JSON
 * files still appear even after the news namespace has been snapshotted into
 * the admin DB. Deleting a repo-shipped post therefore requires removing it
 * from the JSON, not just the admin panel.
 */
function mergeNewsItems(baseItems: unknown, overrideItems: unknown): unknown {
  if (!Array.isArray(baseItems) || !Array.isArray(overrideItems)) {
    return overrideItems;
  }
  const overrideSlugs = new Set(
    overrideItems.map((i) => (i as { slug?: string })?.slug).filter(Boolean)
  );
  const repoOnly = baseItems.filter(
    (i) => !overrideSlugs.has((i as { slug?: string })?.slug)
  );
  return [...overrideItems, ...repoOnly];
}

/** Deep-merge override on top of base. Arrays are replaced wholesale,
 * except news.items which is unioned by slug (see mergeNewsItems). */
function deepMerge(
  base: Record<string, unknown>,
  override: Record<string, unknown>
): Record<string, unknown> {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    const baseVal = base[key];
    const overrideVal = override[key];
    if (
      overrideVal !== null &&
      typeof overrideVal === "object" &&
      !Array.isArray(overrideVal) &&
      typeof baseVal === "object" &&
      baseVal !== null &&
      !Array.isArray(baseVal)
    ) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as Record<string, unknown>
      );
    } else {
      result[key] = overrideVal;
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "en" | "es")) {
    locale = routing.defaultLocale;
  }

  const [common, landing, quiz, quizV2] = await Promise.all([
    import(`../messages/${locale}/common.json`).then((m) => m.default),
    import(`../messages/${locale}/landing.json`).then((m) => m.default),
    import(`../messages/${locale}/quiz.json`).then((m) => m.default),
    import(`../messages/${locale}/quiz-v2.json`).then((m) => m.default),
  ]);

  // Fetch DB overrides — returns {} on failure (site falls back to JSON files)
  const overrides = await getContentOverrides(locale);

  // Deep-merge overrides into landing.json namespaces, then common.json namespaces (forge, atg)
  const mergedCommon = { ...common } as Record<string, unknown>;
  const mergedLanding = { ...landing } as Record<string, unknown>;
  for (const ns of Object.keys(overrides)) {
    if (mergedLanding[ns] && typeof mergedLanding[ns] === "object") {
      const base = mergedLanding[ns] as Record<string, unknown>;
      const merged = deepMerge(base, overrides[ns] as Record<string, unknown>);
      if (ns === "news" && "items" in merged) {
        merged.items = mergeNewsItems(base.items, merged.items);
      }
      mergedLanding[ns] = merged;
    } else if (mergedCommon[ns] && typeof mergedCommon[ns] === "object") {
      mergedCommon[ns] = deepMerge(
        mergedCommon[ns] as Record<string, unknown>,
        overrides[ns] as Record<string, unknown>
      );
    }
  }

  return {
    locale,
    messages: {
      ...mergedCommon,
      ...mergedLanding,
      ...quiz,
      ...quizV2,
    },
  };
});
