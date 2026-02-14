"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShuffleText } from "./ui/shuffle-text";

const COMMUNITY_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=500&fit=crop",
    alt: "People collaborating on tech project",
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=500&fit=crop",
    alt: "Team working together",
  },
  {
    src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=500&fit=crop",
    alt: "Person coding on laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=500&fit=crop",
    alt: "Group learning session",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop",
    alt: "Workshop in progress",
  },
  {
    src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=500&fit=crop",
    alt: "Young people in tech",
  },
  {
    src: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=400&h=500&fit=crop",
    alt: "Working on computer",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen bg-true-black px-6 pt-32 pb-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Main headline + featured photo */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-end">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-[clamp(4rem,12vw,10rem)] leading-[0.85] text-off-white"
            >
              <ShuffleText text="EVERYONE" delay={200} />
              <br />
              <ShuffleText text="BUILDS." delay={600} />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8"
            >
              <p
                className="text-electric-green font-mono text-sm tracking-wider"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                // BEYOND CODE COLLECTIVE //
              </p>
              <p
                className="mt-1 text-grey-3 font-mono text-xs tracking-wider"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                &lt; FOR THE FUTURE &gt;
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mt-8 max-w-md text-lg leading-relaxed text-grey-2"
            >
              Beyond Code Collective provides human-powered resources for a
              tech-driven world. Building intergenerational equity in the
              technologies of today and tomorrow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="mt-8 flex gap-4 flex-wrap"
            >
              <a
                href="#initiatives"
                className="bg-electric-green px-8 py-4 font-mono text-sm tracking-wider uppercase text-true-black transition-colors hover:bg-electric-green/80"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Explore Initiatives
              </a>
              <a
                href="#get-involved"
                className="border-2 border-off-white px-8 py-4 font-mono text-sm tracking-wider uppercase text-off-white transition-colors hover:bg-off-white/10"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Join Us
              </a>
            </motion.div>
          </div>

          {/* Featured photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[3/4] max-h-[500px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&h=800&fit=crop"
                alt="Community members collaborating"
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </motion.div>
        </div>

        {/* Success stories thumbnail row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-16"
        >
          <p
            className="mb-4 text-electric-green font-mono text-xs tracking-wider"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            OUR COMMUNITY
          </p>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {COMMUNITY_PHOTOS.map((photo, i) => (
              <div
                key={i}
                className="relative h-20 w-20 flex-shrink-0 overflow-hidden opacity-60 transition-opacity hover:opacity-100"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                <span
                  className="absolute bottom-1 left-1 text-off-white font-mono text-[10px]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  [{String(i + 1).padStart(2, "0")}]
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
