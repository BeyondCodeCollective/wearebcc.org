import type { Metadata } from "next";
import Image from "next/image";

/**
 * The screen you hold up.
 *
 * Cristina opens this on her phone and turns it round; the other person scans
 * it with theirs. That is the whole job, so there is nothing else on the page
 * to compete with the code.
 *
 * Not on /links itself: almost everyone landing there has just scanned
 * something, and showing them a code for the page they are already on reads
 * as a mistake.
 */

export const metadata: Metadata = {
  title: "Scan to see our work — Beyond Code Collective",
  robots: { index: false, follow: false },
};

export default function ShareLinksPage() {
  return (
    <main className="flex h-[100dvh] flex-col items-center justify-center gap-5 overflow-hidden bg-cobalt px-6 py-8">
      {/* White plate behind the code: phone cameras want a quiet zone and hard
          contrast, and a code sitting directly on cobalt gives neither.
          The plate is capped against viewport height, not just width, so the
          code yields space to the text instead of pushing it off screen. */}
      <div className="w-full max-w-[min(20rem,52vh)] shrink bg-off-white p-4">
        <Image
          src="/images/links/qr.png"
          alt="QR code linking to wearebcc.org/links"
          width={780}
          height={780}
          priority
          unoptimized
          className="h-auto w-full"
        />
      </div>

      <p
        className="text-center font-mono text-2xl uppercase tracking-wider text-off-white"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        wearebcc.org/links
      </p>
      <p className="max-w-sm text-center text-lg leading-snug text-off-white">
        Point a camera at the code, or type the address. Turn your brightness up
        if it will not scan.
      </p>
    </main>
  );
}
