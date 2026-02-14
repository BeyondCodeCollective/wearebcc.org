import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Audience } from "@/components/audience";
import { Stats } from "@/components/stats";
import { Initiatives } from "@/components/initiatives";
import { Testimonials } from "@/components/testimonials";
import { Founder } from "@/components/founder";
import { Resources } from "@/components/resources";
import { CTABridge } from "@/components/cta-bridge";
import { GetInvolved } from "@/components/get-involved";
import { Footer } from "@/components/footer";
import { QuizProvider } from "@/components/quiz-modal";
import { NewsletterProvider } from "@/components/newsletter-modal";

export default function Home() {
  return (
    <QuizProvider>
      <NewsletterProvider>
        <Nav />
        <main>
          <Hero />
          <About />
          <Audience />
          <Stats />
          <Initiatives />
          <Testimonials />
          <Founder />
          <Resources />
          <CTABridge />
          <GetInvolved />
        </main>
        <Footer />
      </NewsletterProvider>
    </QuizProvider>
  );
}
