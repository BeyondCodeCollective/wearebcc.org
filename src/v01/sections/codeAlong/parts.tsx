import { ArrowRight, Play } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import type { ImageRef, LinkRef } from "../../content/types";
import type { MarkedText } from "../../content/codeAlong.types";
import { cx } from "../../lib/cx";
import { Photo } from "../../ui/Photo";
import p from "../../ui/primitives.module.css";
import s from "./parts.module.css";

export function Badge({ children, tone }: { children: ReactNode; tone?: "navy" | "mint" }) {
  return (
    <span className={cx(p.mono, s.badge, tone === "navy" && s.badgeNavy, tone === "mint" && s.badgeMint)}>
      {children}
    </span>
  );
}

export function Marked({ parts }: { parts: MarkedText }) {
  return (
    <>
      {parts.map((part) =>
        part.mark ? (
          <span key={part.text} className={s.mark}>
            {part.text}
          </span>
        ) : (
          <span key={part.text}>{part.text}</span>
        ),
      )}
    </>
  );
}

type ButtonProps = { link: LinkRef; kind: "solid" | "outline"; arrow?: boolean };

export function CtaButton({ link, kind, arrow }: ButtonProps) {
  return (
    <a
      href={link.href}
      className={cx(p.button, s.cta, kind === "solid" ? s.solid : s.outline)}
      {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
    >
      {link.label}
      {arrow && <ArrowRight size={16} weight="bold" aria-hidden="true" />}
    </a>
  );
}

type FrameProps = {
  image: ImageRef;
  sizes: string;
  shadow: "sky" | "lemon";
  /** A class that sets the photo's height. */
  photoClass: string;
  priority?: boolean;
  play?: boolean;
  children?: ReactNode;
};

/** A photo with a flat color block offset behind it, and optionally a play button. */
export function Frame({ image, sizes, shadow, photoClass, priority, play, children }: FrameProps) {
  return (
    <div className={cx(s.frame, shadow === "sky" ? s.shadowSky : s.shadowLemon)}>
      <Photo image={image} sizes={sizes} priority={priority} className={cx(s.photo, photoClass)} />
      {play && (
        <span className={s.play} aria-hidden="true">
          <Play size={26} weight="fill" />
        </span>
      )}
      {children}
    </div>
  );
}

export { s as parts };
