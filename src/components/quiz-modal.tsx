"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUIZ_BASE_URL = "https://bcc-guidance-quiz.vercel.app";

interface QuizContextType {
  openQuiz: (email?: string) => void;
  closeQuiz: () => void;
}

const QuizContext = createContext<QuizContextType>({
  openQuiz: () => {},
  closeQuiz: () => {},
});

export function useQuiz() {
  return useContext(QuizContext);
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [quizUrl, setQuizUrl] = useState(QUIZ_BASE_URL);

  const openQuiz = useCallback((email?: string) => {
    const url = new URL(QUIZ_BASE_URL);
    if (email) {
      url.searchParams.set("email", email);
    }
    setQuizUrl(url.toString());
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeQuiz = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  return (
    <QuizContext.Provider value={{ openQuiz, closeQuiz }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col bg-true-black"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-off-white/10 px-4 py-3 lg:px-6">
              <p
                className="font-mono text-xs tracking-wider text-electric-green"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                [ CAREER GUIDANCE QUIZ ]
              </p>
              <button
                onClick={closeQuiz}
                className="flex items-center gap-2 font-mono text-xs tracking-wider text-off-white/60 transition-colors hover:text-off-white"
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
            </div>

            {/* Quiz iframe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="flex-1"
            >
              <iframe
                src={quizUrl}
                title="BCC Career Guidance Quiz"
                className="h-full w-full border-0"
                allow="clipboard-write"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </QuizContext.Provider>
  );
}
