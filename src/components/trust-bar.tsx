"use client";

import { motion } from "framer-motion";
import { EMPLOYER_LOGOS } from "./ui/brand-logos";

// Grey logos served locally (white SVGs with CSS opacity)

export function TrustBar() {
  return (
    <section className="border-b border-grey-2/50 bg-off-white px-6 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] tracking-wider uppercase text-grey-3"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Where Tech Careers Are Being Built
        </motion.p>

        <div className="mt-4 relative overflow-hidden">
          <div className="flex animate-scroll items-center gap-16 whitespace-nowrap">
            {[...EMPLOYER_LOGOS, ...EMPLOYER_LOGOS].map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex-shrink-0"
              >
                <img
                  src={`/images/logos/${logo.slug}.svg`}
                  alt={logo.name}
                  className="h-7 w-auto opacity-30 transition-opacity hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
