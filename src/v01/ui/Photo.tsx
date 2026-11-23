import Image from "next/image";
import type { ImageRef } from "../content/types";
import { cx } from "../lib/cx";
import p from "./primitives.module.css";

type Props = {
  image: ImageRef;
  /** Rendered width at each breakpoint, so the browser picks the right file. */
  sizes: string;
  /** Adds the 10% black wash the design lays over large photos. */
  shade?: boolean;
  priority?: boolean;
  /** Sets the frame's size. The photo fills whatever box this gives it. */
  className?: string;
};

export function Photo({ image, sizes, shade, priority, className }: Props) {
  // Photos uploaded with a news post live on another host, which the image
  // optimizer is not set up to fetch. Those load directly, as the old pages do.
  const remote = /^https?:\/\//.test(image.src);

  return (
    <div className={cx(p.photo, shade && p.shade, className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={remote}
        style={{ objectPosition: image.position }}
      />
    </div>
  );
}
