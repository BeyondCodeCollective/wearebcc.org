import type { StickerRef } from "./types";

const DIR = "/images/v01/stickers";

/** The design's decorative stickers. Width and height are each file's own pixel size. */
export const stickers = {
  arrows: { src: `${DIR}/arrows.png`, width: 587, height: 373 },
  bolt: { src: `${DIR}/bolt.png`, width: 263, height: 433 },
  brackets: { src: `${DIR}/brackets.png`, width: 255, height: 231 },
  globe: { src: `${DIR}/everyone-builds-globe.png`, width: 443, height: 443 },
  loop: { src: `${DIR}/everyone-builds-loop.png`, width: 237, height: 312 },
  infiniteOptions: { src: `${DIR}/infinite-options.png`, width: 370, height: 368 },
} satisfies Record<string, StickerRef>;
