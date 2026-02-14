"use client";

import { motion } from "framer-motion";

export function SectionLabel({
  number,
  className = "",
}: {
  number: string;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`font-mono text-sm tracking-wider ${className}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      [{number}]
    </motion.span>
  );
}
