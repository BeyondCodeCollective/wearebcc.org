"use client";

import { motion } from "framer-motion";
import { PARTNERS } from "@/lib/constants";

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
          Supported By
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-3"
        >
          {PARTNERS.map((name) => (
            <span
              key={name}
              className="text-sm font-bold tracking-wider text-grey-3/40 uppercase transition-colors hover:text-true-black lg:text-base"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
