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
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

// playwright-core is vendored next to this skill, so there is no install step.
// Fall back to a system copy, then explain if neither is there.
let chromium;
try {
  ({ chromium } = await import('playwright-core'));
} catch {
  try {
    ({ chromium } = await import(join(HERE, '..', 'node_modules', 'playwright-core', 'index.mjs')));
  } catch {
    console.error('playwright-core not found. From the skill folder run:  npm install playwright-core');
    process.exit(2);
  }
}

// Any Chromium build works; we never download one, we drive an installed browser.
const CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
].filter(Boolean);
const CHROME = CANDIDATES.find(p => existsSync(p));

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
let cssFail = false;

if (!CHROME) {
  console.error('No Chromium-based browser found. Install Chrome, or set CHROME_PATH to a browser binary.');
  console.error('Looked in:\n  ' + CANDIDATES.join('\n  '));
  process.exit(2);
}

// An unbalanced brace makes the CSS parser discard everything after it, which
// looks exactly like "my rule didn't apply". Cheap to check, silent to miss.
{
  const src = readFileSync(file, 'utf8');
  const blocks = [...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)];
  blocks.forEach((m, i) => {
    const css = m[1];
    const open = (css.match(/\{/g) || []).length;
    const close = (css.match(/\}/g) || []).length;
    if (open !== close) {
      console.log(`FAIL  style block ${i + 1}: ${open} { vs ${close} } — everything after the`);
      console.log('        imbalance is discarded by the parser.');
      cssFail = true;
    }
  });
}

let fail = 0;
let modeFail = false;
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
    const deck = document.querySelector('.deck');
    const out = { docW: de.scrollWidth, innerW: window.innerWidth, slides: [], hidden: 0, edges: [], clipped: [],
      snap: deck ? getComputedStyle(deck).scrollSnapType : 'none',
      bodyOverflow: getComputedStyle(document.body).overflowY };
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
      // scrollWidth only sees overflow to the RIGHT. Content pushed off the LEFT
      // edge is clipped with no scrollbar and no measurement, so look for it.
      s.querySelectorAll('*').forEach(e => {
        const b = e.getBoundingClientRect();
        if (b.width > 8 && b.height > 4 && b.left < sr.left - 2 && getComputedStyle(e).position !== 'fixed') {
          out.clipped.push(`slide ${i + 1}: ${e.tagName.toLowerCase()}.${(e.className || '').toString().split(' ')[0]} starts ${Math.round(sr.left - b.left)}px off the left edge`);
        }
      });
    });
    return out;
  });

  // A deck must stop being a deck below 820. If it is still a nested scroll
  // container with snap on a phone, no amount of styling makes it read right.
  if (mobile && (r.snap !== 'none' || r.bodyOverflow === 'hidden')) {
    modeFail = true;
    console.log(`FAIL  ${name.padEnd(10)} still in projector mode on a phone`);
    console.log(`        .deck snap=${r.snap}  body overflow=${r.bodyOverflow}`);
    console.log('        fix:  node scripts/ensure-mobile.mjs <deck.html>');
  }

  const bad = r.docW > r.innerW || r.slides.length;
  if (bad) fail++;
  console.log(`${bad ? 'FAIL' : 'ok  '}  ${name.padEnd(10)} doc ${r.docW}/${r.innerW}`);
  r.slides.forEach(s => console.log(`        ${s}`));
  if (r.hidden) { fail++; console.log(`        ${r.hidden} .reveal element(s) never became visible`); }
  // gutter check is mobile-only; desktop layouts are legitimately multi-column
  if (mobile) r.edges.forEach(e => console.log(`        gutter: ${e}`));
  if (mobile && r.clipped.length) {
    fail++;
    [...new Set(r.clipped)].slice(0, 6).forEach(c => console.log(`        clipped: ${c}`));
  }

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
if (modeFail) fail++;
if (cssFail) fail++;
console.log(fail
  ? `\n${fail} problem(s).` + (modeFail ? '\nThis deck has no mobile document mode. That is the big one.' : '')
  : '\nNo overflow, no collapsed reveals, gutters consistent, mobile mode present, CSS balanced.');
console.log('This is not a design review. Open the screenshots and look at them.');
process.exit(fail ? 1 : 0);
