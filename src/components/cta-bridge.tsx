"use client";

import { motion } from "framer-motion";

export function CTABridge() {
  return (
    <section className="bg-dark-cobalt px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl text-center">
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
            READY TO GET STARTED?
          </p>
          <h2 className="mt-4 font-heading text-[clamp(2.5rem,7vw,5rem)] leading-[0.85] text-off-white">
            THE FUTURE IS
            <br />
            ALL OF OURS.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-off-white/70">
            Whether you&apos;re starting out or leveling up, there&apos;s a
            place for you at Beyond Code. Join a community that&apos;s building
            tomorrow, today.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#get-involved"
              className="bg-electric-green px-10 py-4 font-mono text-sm tracking-wider uppercase text-true-black transition-colors hover:bg-electric-green/80"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Join The Community
            </a>
            <a
              href="#initiatives"
              className="border-2 border-off-white px-10 py-4 font-mono text-sm tracking-wider uppercase text-off-white transition-colors hover:bg-off-white/10"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Explore Initiatives
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
