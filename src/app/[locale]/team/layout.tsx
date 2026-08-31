import type { Metadata } from "next";
import { FOUNDER } from "@/lib/constants";

const BASE = "https://www.wearebcc.org";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs
      ? "Cristina Mancini y el equipo — Beyond Code Collective"
      : "Cristina Mancini & Team — Beyond Code Collective",
    description: isEs
      ? "Conoce a Cristina Mancini, fundadora y CEO de Beyond Code Collective (BCC), y al equipo de liderazgo que construye oportunidad intergeneracional en tecnología."
      : "Meet Cristina Mancini, Founder & CEO of Beyond Code Collective (BCC), and the leadership team building intergenerational opportunity in tech.",
    alternates: {
      canonical: `${BASE}/${locale}/team`,
      languages: {
        en: `${BASE}/en/team`,
        es: `${BASE}/es/team`,
      },
    },
    openGraph: {
      title: isEs
        ? "Cristina Mancini y el equipo — Beyond Code Collective"
        : "Cristina Mancini & Team — Beyond Code Collective",
      url: `${BASE}/${locale}/team`,
      images: [
        {
          url: `${BASE}${FOUNDER.image}`,
          alt: `${FOUNDER.name}, ${FOUNDER.title}, Beyond Code Collective`,
        },
      ],
    },
  };
}

// Person schema: what lets Google connect "Cristina Mancini" the query to
// this page, her photo, and BCC the organization.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: FOUNDER.name,
  jobTitle: FOUNDER.title,
  image: `${BASE}${FOUNDER.image}`,
  description: FOUNDER.bio,
  url: `${BASE}/en/team`,
  worksFor: {
    "@type": "Organization",
    name: "Beyond Code Collective",
    alternateName: "BCC",
    url: BASE,
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {children}
    </>
  );
}
