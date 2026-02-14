"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "./ui/section-label";
import { PILLARS } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="bg-off-white px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] leading-[0.9] text-true-black">
              BEYOND CODE
              <br />
              COLLECTIVE
            </h2>
          </motion.div>
          <SectionLabel number="01" className="text-grey-3 mt-2" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 max-w-3xl"
        >
          <p className="text-lg leading-relaxed text-charcoal sm:text-xl lg:text-2xl">
            Beyond Code Collective bridges the gap between inspiration,
            training, and employment in tech, connecting learners to educational
            content, opportunities to develop cutting-edge technologies, and
            avenues to launch careers.
          </p>
        </motion.div>

        {/* Three pillars */}
        <div className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              className="group border-t-4 border-electric-green pt-6"
            >
              <h3 className="font-heading text-xl leading-tight text-true-black lg:text-2xl">
                {pillar.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-grey-3 lg:text-base">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
