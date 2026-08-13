#!/usr/bin/env node
/**
 * Give a deck the mobile document mode, idempotently.
 *
 *   node ensure-mobile.mjs deck.html          # inject if missing
 *   node ensure-mobile.mjs deck.html --check  # exit 1 if missing, change nothing
 *
 * Below 820px a deck stops being a deck: the page scrolls, sections size to
 * their content, snap is off, and the projector chrome is hidden. See
 * references/architecture.md for why a fixed-viewport slide model and a phone
 * are incompatible.
 *
 * The block is appended LAST in the stylesheet on purpose. Many of these rules
 * tie on specificity with the desktop rules they must beat, and ties are broken
 * by source order.
 *
 * This installs the universal base only. Per-component mobile rules (a grid
 * that must stack, media that should go full bleed) still belong in the deck,
 * appended after this block. Run verify.mjs afterwards — it will find what is
 * left.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const MARK = 'BEGIN MOBILE DOCUMENT MODE';

const BLOCK = `
/* ===========================================================================
   ${MARK} — keep this LAST in the stylesheet.
   Below 820 a deck is a document, not a deck. Several rules here tie on
   specificity with the desktop rules above; source order is what makes them
   win, so nothing may be appended after this except per-deck component fixes.
   =========================================================================== */
@media (max-width:820px){
  :root{--g:22px;--sp:1.5rem;--sp-lg:2.4rem}

  /* the page scrolls, not a box inside it */
  html,body{height:auto;overflow:visible}
  .deck{height:auto;min-height:0;overflow:visible;scroll-snap-type:none}
  .slide.slide{height:auto;min-height:0;aspect-ratio:auto;overflow:visible;
    scroll-snap-align:none;
    display:flex;flex-direction:column;justify-content:flex-start;
    padding:var(--sp-lg) var(--g)}
  .slide.slide+.slide{border-top:3px solid rgba(128,128,128,.28)}

  /* projector chrome is a projector affordance */
  .dots,.deckfoot{display:none}

  /* one gutter, one rhythm */
  .slide.slide>*+*{margin-top:var(--sp)}
  .slide.slide>*{max-width:100%;margin-left:0;margin-right:0}
  .sq,.parrow,.bracket,.bezel{display:none!important}

  /* wayfinding from markup the deck already has: the per-slide foot becomes a
     header. Number only — if the label repeats the kicker every slide prints
     its title twice. */
  .foot{display:flex;order:-1;background:none;padding:0;
    margin:0 0 calc(var(--sp) * .6);gap:.8rem;align-items:baseline;
    font-family:var(--mono,ui-monospace,monospace);font-weight:700;
    text-transform:uppercase;font-size:.8125rem;letter-spacing:.14em}
  .foot span:first-child{display:none}
  .foot span:last-child{margin-left:0;opacity:.85}
  .deck>.slide:first-child .foot{display:none}
}
/* END MOBILE DOCUMENT MODE */
`;

const file = process.argv[2];
const checkOnly = process.argv.includes('--check');
if (!file) {
  console.error('usage: node ensure-mobile.mjs path/to/deck.html [--check]');
  process.exit(2);
}

let html;
try { html = readFileSync(file, 'utf8'); }
catch { console.error(`not found: ${file}`); process.exit(2); }

if (html.includes(MARK)) {
  console.log('already has mobile document mode.');
  process.exit(0);
}

// A deck may already have it hand-written. Detect the two rules that define it
// rather than the marker, so we never install a second copy.
const handRolled = /\.deck\s*\{[^}]*scroll-snap-type\s*:\s*none/.test(html)
  && /html\s*,\s*body\s*\{[^}]*overflow\s*:\s*visible/.test(html);
if (handRolled) {
  console.log('mobile document mode already present (hand-written).');
  process.exit(0);
}

if (checkOnly) {
  console.error(`MISSING mobile document mode: ${file}`);
  console.error('fix:  node ensure-mobile.mjs ' + file);
  process.exit(1);
}

const close = html.lastIndexOf('</style>');
if (close === -1) {
  console.error('no </style> found — cannot place the block. Is this a deck?');
  process.exit(2);
}

writeFileSync(file, html.slice(0, close) + BLOCK + html.slice(close));
console.log('installed mobile document mode (appended last in the stylesheet).');
console.log('now run: node scripts/verify.mjs ' + file);
console.log('per-component fixes (grids that must stack, media that should go');
console.log('full bleed) go AFTER this block, not before it.');
