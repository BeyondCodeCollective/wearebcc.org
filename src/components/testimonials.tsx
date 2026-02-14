"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionLabel } from "./ui/section-label";

const TESTIMONIALS = [
  {
    quote:
      "Beyond Code gave me the confidence to transition from teaching into tech. The community made all the difference — I never felt like I was starting over alone.",
    name: "Angela C.",
    role: "Career Changer",
    location: "Atlanta, GA",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote:
      "As a parent, I wanted my kids to have access to real tech skills — not just games. Beyond Code's intergenerational approach means we learn together as a family.",
    name: "Marcus T.",
    role: "Parent & Learner",
    location: "Miami, FL",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote:
      "After retiring from professional sports, I had no idea where to start. After The Game gave me a real plan, real skills, and a real second career in tech.",
    name: "David R.",
    role: "After The Game Alum",
    location: "Los Angeles, CA",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  },
  {
    quote:
      "The Forge hub in my neighborhood changed everything. I went from scrolling job boards to building websites in three months. Now I freelance full-time.",
    name: "Priya K.",
    role: "Forge Graduate",
    location: "Chicago, IL",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  const prev = () =>
    setCurrent(
      (c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="bg-off-white px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[0.9] text-true-black">
              SUCCESS STORIES
            </h2>
            <p
              className="mt-2 font-mono text-xs tracking-wider text-grey-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              WHY LEARNERS CHOOSE BEYOND CODE
            </p>
          </motion.div>
          <SectionLabel number="03" className="text-grey-3 mt-2" />
        </div>

        {/* Testimonial card */}
        <div className="mt-12">
          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="grid gap-8 lg:grid-cols-3 lg:gap-12"
              >
                {/* Quote */}
                <div className="lg:col-span-2">
                  <blockquote className="text-2xl leading-relaxed text-true-black lg:text-3xl">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Person */}
                <div className="flex flex-col items-start gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <p
                      className="font-mono text-sm tracking-wider text-true-black"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      // {testimonial.name.toUpperCase()} //
                    </p>
                    <p className="mt-1 text-sm text-grey-3">
                      {testimonial.role}
                    </p>
                    <p
                      className="mt-0.5 font-mono text-xs tracking-wider text-grey-3"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      &lt; {testimonial.location.toUpperCase()} &gt;
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center border-2 border-true-black text-true-black transition-colors hover:bg-true-black hover:text-off-white"
              aria-label="Previous testimonial"
            >
              &larr;
            </button>
            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center border-2 border-true-black text-true-black transition-colors hover:bg-true-black hover:text-off-white"
              aria-label="Next testimonial"
            >
              &rarr;
            </button>
            <span
              className="ml-4 font-mono text-xs tracking-wider text-grey-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              [{String(current + 1).padStart(2, "0")}] OF [
              {String(TESTIMONIALS.length).padStart(2, "0")}]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
