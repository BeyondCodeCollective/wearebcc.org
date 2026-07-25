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
import { useTranslations } from "next-intl";

interface OpenContactOptions {
  /** Mailchimp SEGMENT tag so we can tell what the enquiry was about. */
  segment?: string;
  /** Pre-filled message text (the visitor can still edit it). */
  prefillMessage?: string;
}

interface ContactContextType {
  openContact: (options?: OpenContactOptions) => void;
  closeContact: () => void;
}

const ContactContext = createContext<ContactContextType>({
  openContact: () => {},
  closeContact: () => {},
});

export function useContact() {
  return useContext(ContactContext);
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  // Honeypot: hidden from people, filled in by bots. See /api/subscribe.
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [segment, setSegment] = useState("Contact Form");

  const tc = useTranslations("contact");
  const tf = useTranslations("form");

  const openContact = useCallback((options?: OpenContactOptions) => {
    setSegment(options?.segment ?? "Contact Form");
    if (options?.prefillMessage) setMessage(options.prefillMessage);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeContact = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => {
      setFirstName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
      setError("");
    }, 300);
  }, []);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(closeContact, 2500);
      return () => clearTimeout(timer);
    }
  }, [submitted, closeContact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          message: message.trim(),
          segment,
          source: "contact-modal",
          website,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : tf("somethingWentWrong")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContext.Provider value={{ openContact, closeContact }}>
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
            <button
              onClick={closeContact}
              className="absolute top-4 right-4 flex items-center gap-2 font-mono text-xs tracking-wider text-off-white/60 transition-colors hover:text-off-white lg:top-6 lg:right-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {tc("close")}
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
                    {tc("thanks")}
                  </p>
                  <p className="mt-2 text-true-black/70">
                    {tc("wellReachOut")}
                  </p>
                </div>
              ) : (
                <>
                  <p
                    className="mb-6 font-mono text-xs tracking-wider text-electric-green"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {tc("label")}
                  </p>
                  <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[0.85] text-off-white">
                    {tc("headline1")}
                    <br />
                    {tc("headline2")}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-off-white/60 lg:text-base">
                    {tc("description")}
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-8 flex flex-col gap-3"
                  >
                    {/* Honeypot input: hidden from people, filled in by bots. */}
                    <input
                      type="text"
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
                    />
                    <input
                      type="text"
                      required
                      placeholder={tf("firstName")}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={loading}
                      className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white placeholder:text-off-white/30 focus:border-electric-green focus:outline-none disabled:opacity-50"
                    />
                    <input
                      type="email"
                      required
                      placeholder={tf("email")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="w-full border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white placeholder:text-off-white/30 focus:border-electric-green focus:outline-none disabled:opacity-50"
                    />
                    <textarea
                      required
                      placeholder={tc("message")}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={loading}
                      rows={4}
                      className="w-full resize-none border border-off-white/20 bg-off-white/5 px-4 py-3 text-off-white placeholder:text-off-white/30 focus:border-electric-green focus:outline-none disabled:opacity-50"
                    />
                    {error && (
                      <p className="text-orange font-mono text-xs">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-electric-green px-6 py-3 font-mono text-sm tracking-wider uppercase text-true-black transition-colors hover:bg-electric-green/80 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {loading ? tc("submitting") : tc("send")}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ContactContext.Provider>
  );
}
