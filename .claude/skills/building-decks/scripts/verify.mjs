#!/usr/bin/env node
/**
 * Deck verification. Measures what a script can measure.
 *
 *   node verify.mjs deck.html            checks only
 *   node verify.mjs deck.html --shots    also writes /tmp/deckshots/NN.png
 *
 * A clean run does NOT mean the deck is good. It means nothing overflows and
 * nothing collapsed. Open the screenshots and look at them before saying a
 * deck is done.
 */
import { chromium } from 'playwright-core';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const CHROME = process.env.CHROME_PATH
  || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const VIEWPORTS = [
  ['desktop',   1920, 1080],
  ['laptop',    1440,  900],
  ['laptop-sm', 1280,  720],   // common projector, short viewport
  ['projector', 1024,  768],
  ['tablet',     820, 1180],   // the mode boundary
  ['tablet-l',  1180,  820],
  ['phone',      390,  844],
  ['phone-sm',   360,  640],
];

const file = process.argv[2];
const wantShots = process.argv.includes('--shots');
if (!file) { console.error('usage: node verify.mjs path/to/deck.html [--shots]'); process.exit(2); }
if (!existsSync(file)) { console.error(`not found: ${file}`); process.exit(2); }
const url = 'file://' + resolve(file);

if (!existsSync(CHROME)) {
  console.error(`Chrome not found at ${CHROME}. Set CHROME_PATH to your browser binary.`);
  process.exit(2);
}

let fail = 0;
const browser = await chromium.launch({ executablePath: CHROME });

for (const [name, width, height] of VIEWPORTS) {
  const mobile = width <= 820;
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
    isMobile: mobile,
    hasTouch: mobile,
  });
  const page = await ctx.newPage();
  await page.goto(url);
  await page.waitForTimeout(900);
  // force every slide "seen" so reveal animations settle and nothing is hidden
  await page.evaluate(() => document.querySelectorAll('.slide').forEach(s => s.classList.add('on')));
  await page.waitForTimeout(1400);

  const r = await page.evaluate(() => {
    const de = document.documentElement;
    const out = { docW: de.scrollWidth, innerW: window.innerWidth, slides: [], hidden: 0, edges: [] };
    document.querySelectorAll('.reveal').forEach(e => {
      if (parseFloat(getComputedStyle(e).opacity) < 0.9) out.hidden++;
    });
    document.querySelectorAll('.slide').forEach((s, i) => {
      const v = s.scrollHeight - s.clientHeight;
      const h = s.scrollWidth - s.clientWidth;
      if (v > 2 || h > 2) out.slides.push(`slide ${i + 1}: vert +${v} horiz +${h}`);
      // distinct left edges. More than 3 per slide means the gutter is broken.
      const sr = s.getBoundingClientRect(), L = new Set();
      s.querySelectorAll('h1,h2,h3,p,figure,ul,ol,.card,.stat').forEach(e => {
        const b = e.getBoundingClientRect();
        if (b.width > 8 && b.height > 4) L.add(Math.round(b.left - sr.left));
      });
      if (L.size > 3) out.edges.push(`slide ${i + 1}: ${L.size} left edges (${[...L].sort((a, b) => a - b).join(', ')})`);
    });
    return out;
  });

  const bad = r.docW > r.innerW || r.slides.length;
  if (bad) fail++;
  console.log(`${bad ? 'FAIL' : 'ok  '}  ${name.padEnd(10)} doc ${r.docW}/${r.innerW}`);
  r.slides.forEach(s => console.log(`        ${s}`));
  if (r.hidden) { fail++; console.log(`        ${r.hidden} .reveal element(s) never became visible`); }
  // gutter check is mobile-only; desktop layouts are legitimately multi-column
  if (mobile) r.edges.forEach(e => console.log(`        gutter: ${e}`));

  if (wantShots && name === 'desktop') {
    mkdirSync('/tmp/deckshots', { recursive: true });
    const n = await page.evaluate(() => document.querySelectorAll('.slide').length);
    for (let i = 0; i < n; i++) {
      await page.evaluate(i => document.querySelectorAll('.slide')[i].scrollIntoView(), i);
      await page.waitForTimeout(700);
      await page.screenshot({ path: `/tmp/deckshots/${String(i + 1).padStart(2, '0')}.png` });
    }
    console.log(`        wrote ${n} screenshots to /tmp/deckshots/`);
  }
  await ctx.close();
}

await browser.close();
console.log(fail
  ? `\n${fail} viewport(s) with problems.`
  : '\nNo overflow, no collapsed reveals, gutters consistent.');
console.log('This is not a design review. Open the screenshots and look at them.');
process.exit(fail ? 1 : 0);
