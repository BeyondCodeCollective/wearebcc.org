"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "@phosphor-icons/react";

export default function AfterTheGame() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          segment: interest ? `ATG - ${interest}` : "ATG - General",
          source: "after-the-game-landing",
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to subscribe");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-true-black">
      {/* Back to BCC */}
      <div className="px-6 py-4 lg:px-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-off-white/50 transition-colors hover:text-off-white"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <ArrowLeft size={14} weight="bold" />
          WEAREBCC.ORG
        </a>
      </div>

      {/* Hero */}
      <section className="px-6 pt-12 pb-16 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-electric-green animate-pulse" />
              <span
                className="font-mono text-xs tracking-wider text-electric-green"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                NEXT COHORT: SUMMER 2026
              </span>
            </div>
            <Image
              src="/images/atg/atg-logo-white.png"
              alt="After The Game"
              width={400}
              height={80}
              className="mx-auto h-12 w-auto sm:h-16 lg:h-20"
              priority
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mx-auto mt-4 font-mono text-xs tracking-wider text-electric-green"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            A BEYOND CODE COLLECTIVE INITIATIVE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mx-auto mt-8 max-w-3xl font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[0.9] text-off-white"
          >
            YOUR CAREER AFTER
            <br />
            <span className="text-electric-green">THE FINAL WHISTLE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-off-white/70 sm:text-lg"
          >
            A national, cohort-based workforce program for transitioning or
            recently-retired professional and NCAA student-athletes. Explicitly
            designed for those who are not long-term earners and need structured
            support to design and enter a second career.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mx-auto mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="#signup"
              className="bg-cobalt px-8 py-4 font-mono text-sm tracking-wider uppercase text-off-white transition-colors hover:bg-cobalt/80"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              JOIN THE WAITLIST &rarr;
            </a>
          </motion.div>
        </div>
      </section>

      {/* Video + text */}
      <section className="px-6 pb-16 lg:px-8 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-12"
        >
          <div>
            <p
              className="font-mono text-xs tracking-wider text-electric-green"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              HEAR FROM OUR COMMUNITY
            </p>
            <h2 className="mt-4 font-heading text-[clamp(1.75rem,4vw,2.5rem)] leading-[0.9] text-off-white">
              REAL STORIES,
              <br />
              REAL IMPACT
            </h2>
            <p className="mt-4 text-base leading-relaxed text-off-white/60">
              Hear directly from athletes who are building their next chapter
              through After The Game. The transition doesn&apos;t have to be a
              solo journey.
            </p>
          </div>
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden bg-charcoal">
            <video
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            >
              <source src="/videos/atg-testimonial.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </section>

      {/* What to expect */}
      <section className="border-t border-off-white/10 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-mono text-xs tracking-wider text-electric-green"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              WHAT TO EXPECT
            </p>
            <h2 className="mt-4 font-heading text-[clamp(1.75rem,4vw,3rem)] leading-[0.9] text-off-white">
              BUILT FOR ATHLETES,
              <br />
              NOT THE TECH INDUSTRY
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Cohort-Based",
                description:
                  "Learn alongside fellow athletes who understand the transition. No solo online courses — real accountability, real peers.",
              },
              {
                title: "Career Design",
                description:
                  "Not just job skills — a structured path to discover, plan, and launch your second career with wraparound support.",
              },
              {
                title: "Live Instruction",
                description:
                  "Technical leads teaching live classes, not pre-recorded videos. Real questions, real feedback, real progress.",
              },
              {
                title: "Job Placement",
                description:
                  "From corporate readiness to interview prep to direct employer connections. We don't stop at the certificate.",
              },
              {
                title: "Digital Skills",
                description:
                  "Bridge the digital skill divide with practical tech training — from digital fluency to data, automation, and AI.",
              },
              {
                title: "National Reach",
                description:
                  "Designed to serve athletes across the country. Your city, your schedule, your next chapter.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="border border-off-white/10 border-l-cobalt border-l-2 p-6"
              >
                <h3 className="font-heading text-lg text-off-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-off-white/60">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup form */}
      <section
        id="signup"
        className="border-t border-off-white/10 px-6 py-16 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {submitted ? (
              <div className="bg-electric-green p-8">
                <p className="font-heading text-3xl text-true-black">
                  YOU&apos;RE IN
                </p>
                <p className="mt-2 text-true-black/70">
                  We&apos;ll be in touch when enrollment opens.
                </p>
              </div>
            ) : (
              <>
                <p
                  className="font-mono text-xs tracking-wider text-cobalt"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  SUMMER 2026 WAITLIST
                </p>
                <h2 className="mt-4 font-heading text-[clamp(1.75rem,4vw,2.5rem)] leading-[0.9] text-off-white">
                  JOIN THE NEXT
                  <br />
                  <span className="text-cobalt">COHORT</span>
                </h2>
                <p className="mt-4 text-sm text-off-white/60">
                  The next cohort starts summer 2026. Sign up now to reserve
                  your spot and get updates on enrollment.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 flex flex-col gap-3 text-left"
                >
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={loading}
                    className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white placeholder:text-off-white/30 focus:border-cobalt focus:outline-none disabled:opacity-50"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white placeholder:text-off-white/30 focus:border-cobalt focus:outline-none disabled:opacity-50"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                    className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white placeholder:text-off-white/30 focus:border-cobalt focus:outline-none disabled:opacity-50"
                  />
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    disabled={loading}
                    className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white focus:border-cobalt focus:outline-none appearance-none disabled:opacity-50"
                  >
                    <option value="" className="bg-true-black">
                      I want to... (select one)
                    </option>
                    <option value="Join" className="bg-true-black">
                      Join the program
                    </option>
                    <option value="Volunteer" className="bg-true-black">
                      Volunteer
                    </option>
                    <option value="Support" className="bg-true-black">
                      Support / Sponsor
                    </option>
                  </select>
                  {error && (
                    <p className="font-mono text-xs text-orange">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-cobalt px-6 py-3 font-mono text-sm tracking-wider uppercase text-off-white transition-colors hover:bg-cobalt/80 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {loading ? "JOINING..." : "JOIN THE WAITLIST"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-off-white/10 px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <a
            href="/"
            className="font-mono text-xs tracking-wider text-off-white/40 transition-colors hover:text-off-white"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            WEAREBCC.ORG
          </a>
          <p
            className="font-mono text-xs tracking-wider text-off-white/30"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            &copy; {new Date().getFullYear()} BEYOND CODE COLLECTIVE
          </p>
        </div>
      </footer>
    </div>
  );
}
