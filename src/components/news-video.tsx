"use client";

import { useRef, useState } from "react";
import { Play } from "@phosphor-icons/react";

interface NewsVideoProps {
  src: string;
  /** The still shown before the film plays. */
  poster: string;
  /** What the film is, for screen readers. */
  title: string;
  /** The play button's words, for example "Play video". */
  playLabel: string;
  /** Running time as shown, for example "0:47". */
  duration?: string;
}

/**
 * A vertical (9:16) film behind its still. Nothing but the still loads until
 * the reader presses play; from then on the browser's own controls take over.
 */
export function NewsVideo({ src, poster, title, playLabel, duration }: NewsVideoProps) {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function start() {
    const el = video.current;
    if (!el) return;
    setStarted(true);
    // The play button is about to leave the page: hand focus to the film.
    el.focus();
    void el.play().catch(() => {
      // Playback was refused. The controls are showing, so the reader can press play there.
    });
  }

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden bg-true-black">
      <video
        ref={video}
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        preload="none"
        playsInline
        controls={started}
        tabIndex={started ? 0 : -1}
        aria-label={title}
        onPlay={() => setStarted(true)}
      />
      {!started && (
        <button
          type="button"
          onClick={start}
          aria-label={`${playLabel}: ${title}`}
          className="group absolute inset-0 flex cursor-pointer items-end justify-start p-4"
        >
          <span
            className="inline-flex items-center gap-2 bg-cobalt px-5 py-3.5 font-mono text-xs uppercase tracking-wider text-off-white transition-colors duration-300 group-hover:bg-true-black"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Play size={14} weight="fill" aria-hidden="true" />
            {duration ? `${playLabel} · ${duration}` : playLabel}
          </span>
        </button>
      )}
    </div>
  );
}
