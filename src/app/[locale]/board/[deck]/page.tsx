"use client";

import { use, useEffect, useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PartnerGate } from "@/components/partner-gate";

const STORAGE_KEY = "bcc-board-unlocked";

/**
 * Board-only viewer for a quarterly board report deck. The deck is a static
 * build under /decks/board/<deck>/, which the middleware only serves with the
 * board cookie. Edits made in the deck's edit mode are saved via
 * /api/board-edits and applied on load.
 */
export default function BoardReport({ params }: { params: Promise<{ deck: string }> }) {
  const { deck } = use(params);
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
          endpoint="/api/board-gate"
          storageKey={STORAGE_KEY}
          namespace="boardGate"
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-true-black">
      <iframe
        src={`/decks/board/${encodeURIComponent(deck)}/index.html`}
        title="Beyond Code Collective Board Report"
        className="h-full w-full flex-1 border-0"
        allow="autoplay; fullscreen; clipboard-write"
      />
    </div>
  );
}
