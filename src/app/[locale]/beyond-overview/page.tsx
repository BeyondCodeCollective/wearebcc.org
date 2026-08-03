"use client";

import { useEffect, useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PartnerGate } from "@/components/partner-gate";

/**
 * Password-gated viewer for the Beyond Code overview.
 *
 * The point of a page rather than a PDF attachment: the file can be replaced
 * and everyone holding the link sees the new version. A PDF, once sent, cannot
 * be pulled back.
 *
 * Its own gate, separate from the partner decks. This goes to a wider
 * audience, so unlocking it must not also unlock /decks/.
 */

const OVERVIEW_STORAGE_KEY = "bcc-overview-unlocked";
const PDF = "/overview/beyond-code-overview.pdf";

export default function BeyondOverviewPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(OVERVIEW_STORAGE_KEY) === "1");
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
          endpoint="/api/overview-gate"
          storageKey={OVERVIEW_STORAGE_KEY}
          namespace="overviewGate"
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-true-black">
      {/* Download sits above the viewer because iOS Safari will not render a
          PDF inside an iframe: on a phone this link is the only way in. */}
      <div className="flex items-center justify-between gap-4 px-5 py-3">
        <span
          className="font-mono text-sm uppercase tracking-wider text-off-white/90"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Beyond Code Overview
        </span>
        <a
          href={PDF}
          download
          className="shrink-0 bg-electric-green px-4 py-2 font-mono text-sm uppercase tracking-wider text-true-black"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Download
        </a>
      </div>
      <iframe
        src={PDF}
        title="Beyond Code Overview"
        className="w-full flex-1 border-0"
      />
    </div>
  );
}
