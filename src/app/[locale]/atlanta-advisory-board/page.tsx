"use client";

import { useEffect, useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PartnerGate } from "@/components/partner-gate";

const STORAGE_KEY = "bcc-partner-portal-unlocked";
const DECK = "/decks/atlanta-local-advisory-board.html";

export default function AtlantaAdvisoryBoardPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(STORAGE_KEY) === "1");
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen bg-off-white">
        <Nav variant="light" />
        <div className="min-h-[70vh]" />
        <Footer />
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-off-white">
        <Nav variant="light" />
        <PartnerGate
          onUnlock={() => setUnlocked(true)}
          endpoint="/api/partner-gate"
          storageKey={STORAGE_KEY}
          namespace="partnerGate"
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-true-black">
      <div className="flex items-center justify-between gap-4 px-5 py-3">
        <span
          className="font-mono text-sm uppercase tracking-wider text-off-white/90"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Atlanta Local Advisory Board
        </span>
      </div>
      <iframe
        src={DECK}
        title="Atlanta Local Advisory Board"
        className="w-full flex-1 border-0"
      />
    </div>
  );
}
