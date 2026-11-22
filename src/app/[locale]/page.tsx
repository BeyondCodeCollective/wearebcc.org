import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Audience } from "@/components/audience";
import { Stats } from "@/components/stats";
import { Initiatives } from "@/components/initiatives";
import { Testimonials } from "@/components/testimonials";

import { Resources } from "@/components/resources";
import { News } from "@/components/news";
import { CTABridge } from "@/components/cta-bridge";
import { HireTalent } from "@/components/hire-talent";
import { GetInvolved } from "@/components/get-involved";
import { Footer } from "@/components/footer";
import { QuizProvider } from "@/components/quiz-modal";
import { NewsletterProvider } from "@/components/newsletter-modal";
import { PartnershipsProvider } from "@/components/partnerships-modal";
import { Home as HomeV01 } from "@/v01/pages/Home";
import { home as homeV01 } from "@/v01/content/home";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(locale, "") };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // v0.1: English gets the new Home, built from src/v01. Spanish keeps the
  // current Home below, unchanged, until the new design has Spanish copy.
  if (locale === "en") return <HomeV01 content={homeV01} />;

  return (
    <QuizProvider>
      <NewsletterProvider>
      <PartnershipsProvider>
        <Nav />
        <main>
          <Hero />
          <About />
          <Stats />
          <Testimonials />
          <Audience />
          <Initiatives />
          <Resources />
          <News />
          <CTABridge />
          <HireTalent />
          <GetInvolved />
        </main>
        <Footer />
      </PartnershipsProvider>
      </NewsletterProvider>
    </QuizProvider>
  );
}
