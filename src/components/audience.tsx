"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const PERSONAS = [
  {
    title: "For The Future",
    description:
      "Building skills and knowledge to develop interests and inform future life decisions.",
    quote:
      "I want to learn a new skill and build a career path in a field or industry that helps me prepare for the future.",
    segments: ["7-17 Learners", "18+ Learners"],
    photo: "/images/community/community-01.jpg",
    alt: "Young people learning tech together",
  },
  {
    title: "Understanding Our World",
    description:
      "Improving knowledge to make sense of an ever-changing world.",
    quote:
      "I want to be informed so I can better understand how technology will impact me and the ones I care about.",
    segments: ["Parents & Family", "Older Adults"],
    photo: "/images/community/community-02.jpg",
    alt: "Family members engaging with technology",
  },
  {
    title: "Changing Direction",
    description:
      "Learning specific skills to change or upgrade careers, or improve prospects.",
    quote:
      "I want to learn the skills that are most desired by employers so I can develop a clear pathway into an evolved or new technology role.",
    segments: ["Career Upgraders", "Career Pivoters", "18+ Learners"],
    photo: "/images/community/community-03.jpg",
    alt: "Professional transitioning into tech",
  },
  {
    title: "Making A Difference",
    description:
      "Contributing to a better future via funds, partnerships, or otherwise.",
    quote:
      "I want to help fuel the next generation of technologists by offering the resources I or my organization have at our disposal.",
    segments: ["Partners & Donors", "Community Leaders", "Press"],
    photo: "/images/community/community-04.jpg",
    alt: "Community leaders and partners collaborating",
  },
];

export function Audience() {
  return (
    <section className="bg-off-white px-6 pb-24 lg:px-8 lg:pb-32">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-wider uppercase text-grey-3"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Who We Serve
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-4 font-heading text-[clamp(1.5rem,4vw,2.5rem)] leading-[0.9] text-true-black"
        >
          EVERYONE HAS A REASON
          <br />
          TO BE HERE.
        </motion.h3>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PERSONAS.map((persona, i) => (
            <motion.div
              key={persona.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              className="group border-l-2 border-cobalt pl-4"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={persona.photo}
                  alt={persona.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>

              <h4 className="mt-4 font-heading text-lg leading-tight text-true-black lg:text-xl">
                {persona.title}
              </h4>

              <p className="mt-2 text-sm leading-relaxed text-charcoal">
                {persona.description}
              </p>

              <p className="mt-3 text-xs italic leading-relaxed text-grey-3">
                &ldquo;{persona.quote}&rdquo;
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {persona.segments.map((seg) => (
                  <span
                    key={seg}
                    className="bg-cobalt/8 px-2 py-1 font-mono text-[10px] tracking-wider uppercase text-cobalt"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {seg}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
