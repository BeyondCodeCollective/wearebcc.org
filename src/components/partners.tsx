"use client";

import { motion } from "framer-motion";

const EMPLOYER_LOGOS = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "Salesforce",
  "IBM",
  "Adobe",
];

export function Partners() {
  return (
    <section className="bg-off-white px-6 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="font-mono text-xs tracking-wider uppercase text-grey-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Where Tech Careers Are Being Built
          </p>

          {/* Scrolling employer logos */}
          <div className="mt-6 relative overflow-hidden">
            <div className="flex animate-scroll gap-16 whitespace-nowrap">
              {[...EMPLOYER_LOGOS, ...EMPLOYER_LOGOS].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="text-2xl font-bold tracking-wider text-grey-2 uppercase flex-shrink-0"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
