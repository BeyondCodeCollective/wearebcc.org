"use client";

import { useEffect, useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  PartnerGate,
  PARTNER_GATE_STORAGE_KEY,
} from "@/components/partner-gate";

/**
 * Partner-only viewer for the platform section of the funding engine deck.
 * The deck itself is a self-contained HTML file under /decks/, which the
 * middleware only serves when the partner-gate cookie is present.
 */
export default function PlatformDeck() {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(PARTNER_GATE_STORAGE_KEY) === "1");
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
        <PartnerGate onUnlock={() => setUnlocked(true)} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-charcoal">
      <iframe
        src="/decks/platform.html"
        title="Beyond Code Collective — Platform section"
        className="h-full w-full flex-1 border-0"
      />
    </div>
  );
}
