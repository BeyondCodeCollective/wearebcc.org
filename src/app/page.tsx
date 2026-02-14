import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { About } from "@/components/about";
import { Stats } from "@/components/stats";
import { Initiatives } from "@/components/initiatives";
import { Testimonials } from "@/components/testimonials";
import { Founder } from "@/components/founder";
import { Partners } from "@/components/partners";
import { CTABridge } from "@/components/cta-bridge";
import { GetInvolved } from "@/components/get-involved";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Stats />
        <Initiatives />
        <Testimonials />
        <Founder />
        <Partners />
        <CTABridge />
        <GetInvolved />
      </main>
      <Footer />
    </>
  );
}
