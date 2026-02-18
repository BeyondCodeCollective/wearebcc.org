"use client";

import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "@/i18n/navigation";

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
  const router = useRouter();

  const openQuiz = useCallback(
    (email?: string) => {
      router.push("/quiz");
    },
    [router]
  );

  const closeQuiz = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <QuizContext.Provider value={{ openQuiz, closeQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}
