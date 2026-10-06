import type { Metadata } from "next";

const OG_IMAGE = "https://www.wearebcc.org/images/community-og-v2.jpg";

const COPY = {
  en: {
    title: "Who's Coding Your Future? Give | Beyond Code Collective",
    description:
      "Every seat in a Beyond Code room is free. A 17-year-old and a 71-year-old learn AI at the same table. Your gift holds the next seat.",
    ogTitle: "Who's Coding Your Future?",
    imageAlt: "A Beyond Code Collective community event",
  },
  es: {
    title: "¿Quién programa tu futuro? Dona | Beyond Code Collective",
    description:
      "Cada asiento en un salón de Beyond Code es gratis. Una persona de 17 años y otra de 71 aprenden IA en la misma mesa. Tu donación guarda el siguiente asiento.",
    ogTitle: "¿Quién programa tu futuro?",
    imageAlt: "Un evento comunitario de Beyond Code Collective",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = locale === "es" ? COPY.es : COPY.en;
  const path = `/${locale === "es" ? "es" : "en"}/donate`;
  const url = `https://www.wearebcc.org${path}`;

  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: url,
      languages: {
        en: "https://www.wearebcc.org/en/donate",
        es: "https://www.wearebcc.org/es/donate",
      },
    },
    openGraph: {
      title: c.ogTitle,
      description: c.description,
      url,
      siteName: "Beyond Code Collective",
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: c.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.ogTitle,
      description: c.description,
      images: [OG_IMAGE],
    },
  };
}

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
