import type { CSSProperties } from "react";
import type { NetworkContent } from "../../content/impact.types";
import { cx } from "../../lib/cx";
import p from "../../ui/primitives.module.css";
import { Section } from "../../ui/Section";
import s from "./Network.module.css";

type Props = { content: NetworkContent };

/* The drawing's own coordinates, in the 1400 by 680 box the design used. */
const W = 1400;
const H = 680;
const HUB = { x: 700, y: 330 };
const PASSED = { x: 930, y: 130 };
const REACH = { x: 470, y: 545 };

const SPOKES: [number, number][] = [
  [930, 130], [470, 545], [875, 330], [760, 494], [640, 494],
  [525, 330], [557, 230], [640, 166], [760, 166], [864, 270],
];
const DOTTED: [number, number, number, number][] = [
  [640, 166, 760, 166],
  [525, 330, 557, 230],
];
const BRANCHES: [number, number, number, number][] = [
  [930, 130, 850, 45], [930, 130, 985, 40], [930, 130, 1030, 125],
  [470, 545, 390, 470], [470, 545, 405, 610], [470, 545, 520, 640], [470, 545, 585, 595],
];
const NODES: [number, number][] = [
  [875, 330], [760, 494], [640, 494], [525, 330], [557, 230], [640, 166], [760, 166], [864, 270],
];
const TWIGS: [number, number][] = [
  [850, 45], [985, 40], [1030, 125], [390, 470], [405, 610], [520, 640], [585, 595],
];

const at = (c: { x: number; y: number }): CSSProperties =>
  ({ left: `${(c.x / W) * 100}%`, top: `${(c.y / H) * 100}%` }) as CSSProperties;

/** 510+ learners at the center of a drawn network, with three captions around it. */
export function Network({ content }: Props) {
  const toneClass = { cobalt: s.cobalt, forest: s.forest, ink: s.ink };

  return (
    <Section pad="none" className={s.section}>
      <div role="group" aria-label={content.ariaLabel} className={s.figure}>
        <div className={s.stage}>
          <div className={s.art}>
            <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} className={s.svg}>
              <g className={s.line}>
                {SPOKES.map(([x, y]) => (
                  <line key={`s${x}-${y}`} x1={HUB.x} y1={HUB.y} x2={x} y2={y} />
                ))}
                {DOTTED.map(([x1, y1, x2, y2]) => (
                  <line key={`d${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray="3 7" />
                ))}
                {BRANCHES.map(([x1, y1, x2, y2]) => (
                  <line key={`b${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />
                ))}
              </g>
              <circle className={s.hub} cx={HUB.x} cy={HUB.y} r={125} />
              <circle className={s.passedDot} cx={PASSED.x} cy={PASSED.y} r={82} />
              <circle className={s.reachDot} cx={REACH.x} cy={REACH.y} r={82} />
              <g className={s.node}>
                {NODES.map(([x, y]) => (
                  <circle key={`n${x}-${y}`} cx={x} cy={y} r={13} />
                ))}
                {TWIGS.map(([x, y]) => (
                  <circle key={`t${x}-${y}`} cx={x} cy={y} r={11} />
                ))}
              </g>
            </svg>

            <p className={cx(p.display, s.label, s.hubLabel)} style={at(HUB)}>
              <span className={s.hubValue}>{content.hub.value}</span>
              {content.hub.label}
            </p>
            <p className={cx(p.display, s.label, s.passedLabel)} style={at(PASSED)}>
              <span className={s.passedValue}>{content.passed.value}</span>
              {content.passed.label}
            </p>
            <p className={cx(p.display, s.label, s.reachLabel)} style={at(REACH)}>
              <span className={s.reachValue}>{content.reach.value}</span>
              {content.reach.label}
            </p>
          </div>
        </div>

        <ul className={s.captions}>
          {content.captions.map((caption, i) => (
            <li key={caption.title} className={cx(s.caption, s[`caption${i + 1}` as "caption1"], toneClass[caption.tone])}>
              <h2 className={cx(p.display, s.captionTitle)}>{caption.title}</h2>
              <p className={s.captionBody}>{caption.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
