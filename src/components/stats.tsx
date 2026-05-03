"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: string;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseInt(value);
    if (isNaN(numericValue)) {
      setDisplay(value);
      return;
    }

    let current = 0;
    const target = numericValue;
    const duration = 1500;
    const steps = 30;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplay(String(target));
        clearInterval(timer);
      } else {
        setDisplay(String(Math.floor(current)));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  const t = useTranslations("stats");

  const items: { value: string; suffix: string; prefix?: string; label: string }[] = [];
  let idx = 0;
  while (t.has(`items.${idx}.value`)) {
    items.push({
      value: t(`items.${idx}.value`),
      suffix: t(`items.${idx}.suffix`),
      label: t(`items.${idx}.label`),
    });
    idx++;
  }

  return (
    <section className="bg-true-black px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-wider uppercase text-electric-green"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {t("label")}
        </motion.p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="border-t-2 border-electric-green pt-6"
            >
              <p className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-none text-off-white">
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-3 text-sm leading-relaxed text-off-white/60">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
