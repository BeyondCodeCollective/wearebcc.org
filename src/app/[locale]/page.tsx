import { AnnouncementBanner } from "@/components/announcement-banner";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Audience } from "@/components/audience";
import { Stats } from "@/components/stats";
import { AIPrinciples } from "@/components/ai-principles";
import { Initiatives } from "@/components/initiatives";
import { WhereWereBuilding } from "@/components/where-were-building";
import { Testimonials } from "@/components/testimonials";

import { Resources } from "@/components/resources";
import { CTABridge } from "@/components/cta-bridge";
import { HireTalent } from "@/components/hire-talent";
import { GetInvolved } from "@/components/get-involved";
import { Footer } from "@/components/footer";
import { QuizProvider } from "@/components/quiz-modal";
import { NewsletterProvider } from "@/components/newsletter-modal";
import { PartnershipsProvider } from "@/components/partnerships-modal";
import { ContactProvider } from "@/components/contact-modal";

export default function Home() {
  return (
    <QuizProvider>
      <NewsletterProvider>
      <PartnershipsProvider>
      <ContactProvider>
        <AnnouncementBanner />
        <Nav />
        <main>
          <Hero />
          <About />
          <Stats />
          <Testimonials />
          <AIPrinciples />
          <Audience />
          <Initiatives />
          <WhereWereBuilding />
          <Resources />
          <CTABridge />
          <HireTalent />
          <GetInvolved />
        </main>
        <Footer />
      </ContactProvider>
      </PartnershipsProvider>
      </NewsletterProvider>
    </QuizProvider>
  );
}
