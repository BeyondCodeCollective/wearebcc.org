"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AUDIENCE_SEGMENTS } from "@/lib/constants";

interface NewsletterContextType {
  openNewsletter: () => void;
  closeNewsletter: () => void;
}

const NewsletterContext = createContext<NewsletterContextType>({
  openNewsletter: () => {},
  closeNewsletter: () => {},
});

export function useNewsletter() {
  return useContext(NewsletterContext);
}

export function NewsletterProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [segment, setSegment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const openNewsletter = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeNewsletter = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
    // Reset form after close animation
    setTimeout(() => {
      setEmail("");
      setSegment("");
      setSubmitted(false);
      setError("");
    }, 300);
  }, []);

  // Auto-close after success
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(closeNewsletter, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted, closeNewsletter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          segment,
          source: "newsletter-modal",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <NewsletterContext.Provider value={{ openNewsletter, closeNewsletter }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-true-black/95 px-6"
          >
            {/* Close button */}
            <button
              onClick={closeNewsletter}
              className="absolute top-4 right-4 flex items-center gap-2 font-mono text-xs tracking-wider text-off-white/60 transition-colors hover:text-off-white lg:top-6 lg:right-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              CLOSE
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="stroke-current"
              >
                <path
                  d="M4 4L12 12M12 4L4 12"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="w-full max-w-md"
            >
              {submitted ? (
                <div className="bg-electric-green p-8 text-center">
                  <p className="font-heading text-3xl text-true-black">
                    YOU&apos;RE IN.
                  </p>
                  <p className="mt-2 text-true-black/70">
                    We&apos;ll be in touch. The future is all of ours.
                  </p>
                </div>
              ) : (
                <>
                  <p
                    className="mb-6 font-mono text-xs tracking-wider text-electric-green"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    [ JOIN THE COMMUNITY ]
                  </p>
                  <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[0.85] text-off-white">
                    STAY IN
                    <br />
                    THE LOOP.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-grey-3 lg:text-base">
                    Get updates on initiatives, events, and opportunities from
                    Beyond Code Collective.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-8 flex flex-col gap-3"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white placeholder:text-off-white/30 focus:border-electric-green focus:outline-none disabled:opacity-50"
                    />
                    <select
                      value={segment}
                      onChange={(e) => setSegment(e.target.value)}
                      disabled={loading}
                      className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white focus:border-electric-green focus:outline-none appearance-none disabled:opacity-50"
                    >
                      <option value="" className="bg-true-black">
                        I am a... (optional)
                      </option>
                      {AUDIENCE_SEGMENTS.map((seg) => (
                        <option key={seg} value={seg} className="bg-true-black">
                          {seg}
                        </option>
                      ))}
                    </select>
                    {error && (
                      <p className="text-orange font-mono text-xs">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-electric-green px-6 py-3 font-mono text-sm tracking-wider uppercase text-true-black transition-colors hover:bg-electric-green/80 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {loading ? "Joining..." : "Join The Community \u2192"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </NewsletterContext.Provider>
  );
}
