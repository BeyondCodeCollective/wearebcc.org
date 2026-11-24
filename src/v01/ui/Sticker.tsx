import Image from "next/image";
import type { StickerRef } from "../content/types";
import { cx } from "../lib/cx";
import s from "./Sticker.module.css";

type Props = {
  sticker: StickerRef;
  /** Sets the offsets, the width and where it hides. The section it sits in must be position: relative. */
  className?: string;
};

/** A decorative image laid over a section edge. Hidden from assistive tech and never catches clicks. */
export function Sticker({ sticker, className }: Props) {
  return (
    <Image
      src={sticker.src}
      alt=""
      aria-hidden="true"
      width={sticker.width}
      height={sticker.height}
      sizes="240px"
      className={cx(s.sticker, className)}
    />
  );
}
