"use client";

import { useRef, useState } from "react";
import { Play } from "@phosphor-icons/react";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import s from "./VideoCard.module.css";

type Props = { src: string; poster: string; play: { label: string; ariaLabel: string } };

/**
 * A vertical film behind its still. Nothing but the still loads until the
 * reader presses play; from then on the browser's own controls take over.
 */
export function VideoPlayer({ src, poster, play }: Props) {
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
    <div className={s.frame}>
      <video
        ref={video}
        className={s.video}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        controls={started}
        tabIndex={started ? 0 : -1}
        aria-label={play.ariaLabel.replace(/^Play video: /, "")}
        onPlay={() => setStarted(true)}
      />
      {!started && (
        <button type="button" className={s.start} onClick={start} aria-label={play.ariaLabel}>
          <span className={cx(p.mono, s.cue)}>
            <Play aria-hidden="true" size={16} weight="fill" />
            {play.label}
          </span>
        </button>
      )}
    </div>
  );
}
