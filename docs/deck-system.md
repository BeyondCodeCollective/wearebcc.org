# Deck system

How we build presentation decks: one HTML file, two rendering modes, two brand
skins. Two working decks in this repo are the reference implementations.

| Deck | Source | Live | Brand |
| --- | --- | --- | --- |
| Rancho Cordova partner deck | `public/decks/rancho-cordova.html` | `/en/rancho-cordova` (partner gate) | BCC: cobalt / electric green |
| Theo × Tech keynote | `public/keynote/theo-tech.html` | `/en/theo-tech` (public) | BGC: Essential Orange |

Both are single self-contained HTML files. Fonts, photography, logos and QR
codes are base64-embedded, so they render with no network at all. That matters:
conference wifi fails, and a deck that needs a CDN is a deck that can fail in
the room.

---

## 1. Why HTML and not Keynote or Google Slides

- One file, one link. No export step, no "which version is this".
- It is responsive, so the same artefact works on a projector and on a phone.
- It is diffable and reviewable in git.
- Type, colour and layout come from a real design system rather than whatever
  the template offered.

The cost is that you are writing CSS, not dragging boxes. The rest of this
document is what we learned paying that cost.

---

## 2. The two-mode architecture

**A fixed-viewport slide model and a phone are incompatible.** Do not try to
make one layout serve both. Ship two modes and switch at a breakpoint.

### Projector mode (above 820px)

```css
.deck  { height:100dvh; overflow-y:auto; scroll-snap-type:y mandatory }
.slide { height:100dvh; scroll-snap-align:start; display:flex;
         flex-direction:column; justify-content:center }
```

Full-viewport slides, scroll snap, a fixed footer bar fed from the active
slide, and dot navigation down the right edge.

### Document mode (820px and below)

```css
html,body { height:auto; overflow:visible }
.deck     { height:auto; overflow:visible; scroll-snap-type:none }
.slide    { height:auto; min-height:0; scroll-snap-align:none }
.dots, .deckfoot { display:none }
```

The page becomes an ordinary scrolling document. Sections size to their
content. One scrollbar.

**This is the single most important thing in this document.** Before we did it,
the phone build was `body{overflow:hidden}` wrapping a nested scroll container
with mandatory snap, and every section forced to `min-height:100svh`. You were
scrolling a box inside a locked page, snap fighting your thumb, short sections
padded out to a screen of empty colour. Horizontal overflow measured zero the
whole time. What felt broken was the scrolling itself.

---

## 3. The four mobile rules

Mobile is a designed layer, not a squeezed desktop. When it looks "jumbled",
measure the left edge of every block — on one slide we found **eleven different
left edges**.

1. **One gutter.** Every block starts on the same left edge. Media is the only
   thing allowed to break it, and only by going fully edge to edge.
2. **One rhythm.** Vertical space comes from a single `--sp` variable.
   Components do not invent their own margins.
3. **One scale.** Type sizes are fixed for mobile rather than clamped per
   component, so a heading is the same size on every section.
4. **No desktop chrome.** Corner brackets, device bezels, decorative negative
   offsets and outline frames are projector jewellery. On a phone they are just
   things that fail to line up.

Diagnostic worth keeping:

```js
// every element's left edge relative to its slide. More than 2-3 distinct
// values per slide means the gutter is broken.
document.querySelectorAll('.slide').forEach((s,i)=>{
  const sr=s.getBoundingClientRect(), L={};
  s.querySelectorAll('h1,h2,p,figure,.card').forEach(e=>{
    const r=e.getBoundingClientRect();
    if(r.width>8) L[Math.round(r.left-sr.left)]=1;
  });
  console.log('S'+(i+1), Object.keys(L).sort((a,b)=>a-b).join(', '));
});
```

---

## 4. The CSS gotcha that will bite you

**Mobile overrides must be the last block in the stylesheet.**

Many mobile rules tie on specificity with the desktop rules they need to beat
(`.lxp .row` vs `.lxp .row`). When specificity ties, **source order decides**.
A mobile block placed higher in the file silently loses.

This broke two slides twice before we understood it. Symptoms: a device frame
collapsing to 19px wide with its images at 7px; hub diagram nodes stacking on
top of each other.

Related: when a rule is re-enabled by a higher-specificity selector
(`.slide.on .net2 .n-left` at 0,3,0), your reset has to match that weight, not
just come later.

And when inserting CSS programmatically, anchor on a **unique** selector.
Anchoring on `.og{color:var(--org)}` matched `.cthread .og{...}` first and
produced a descendant selector that never fired.

---

## 5. Projector legibility

Decks get projected into rooms where people sit at the back.

- **14px is the absolute floor.** Nothing renders below it, anywhere.
- For a keynote, the real floor is higher: body copy 21–24px at 1920, sub-points
  21px, labels 19px.
- If a sub-paragraph is too small to read, **delete it and keep the title.**
  Three titles at 48px beat three titles with unreadable copy underneath.
- iOS inflates text in narrow blocks unless you set
  `-webkit-text-size-adjust:100%`. Without it, a clean emulator can still be a
  broken phone.
- Give short viewports their own rules. `@media (min-width:821px) and
  (max-height:820px)` catches 1280×720 projectors, which are still common.

---

## 6. Contrast, measured not eyeballed

Run the numbers before shipping a colour pair.

| Pair | Ratio | Verdict |
| --- | --- | --- |
| Black on Essential Orange `#FF9400` | 9.49:1 | AAA |
| **White on Essential Orange** | **2.21:1** | **fails, even large** |
| White on Cursor Black | 21:1 | AAA |
| Debug Yellow on Cursor Black | 17.7:1 | AAA |
| Cobalt on white (BCC) | 5.6:1 | AA |

White on orange looks fine in a mockup and fails in a room. The fix that keeps
the two-tone headline: put the accent line in a **black fiber** with orange type
on top. That is 9.49:1 and framing type with a fiber is what the BGC guide
prescribes anyway.

```css
.s-org .hl{ background:var(--blk); color:var(--org);
            padding:.03em .16em .05em; box-decoration-break:clone }
```

Use one span per line, not one span across a `<br>`, or you get a single ragged
box wrapping both lines.

---

## 7. Verification

A passing script is not a verified design. **Both are required.**

```bash
node vp.js      # overflow at 8 viewports: 1920, 1440, 1280, 1024, 820, 1180, 390, 360
```

Then **open a screenshot and look at it.** Every visual claim needs an image you
actually read. "No overflow" says nothing about whether a layout is legible,
balanced, or collapsed.

Checks worth automating:

- `documentElement.scrollWidth === innerWidth` at 390px
- no section with more than ~110px of dead space
- every `.reveal` reaching full opacity
- count-up numbers landing on their real values, not caught mid-animation
- **QR codes decoded back out of the rendered screenshot**, not trusted from
  generation:

```python
import cv2
data,_,_ = cv2.QRCodeDetector().detectAndDecode(cv2.imread('slide.png'))
assert data == 'https://donorbox.org/blackgirlscode'
```

---

## 8. Brand skins

### BCC — Beyond Code Collective

```css
--blue:#1D59FF; --yellow:#E5F701; --white:#fff; --black:#000;
--head:'Special Gothic Condensed One'; --body:'Goga'; --mono:'Apercu Mono';
```

Rules: blue / yellow / white only. No black as a large surface. No em dashes in
copy. Alternating blue and white slide grounds for rhythm.

### BGC — Black Girls CODE

```css
--org:#FF9400;  /* Essential Orange — primary, most applications */
--urg:#FF4C00;  --yl:#FFF000;  --ll:#AD9DF3;  --tl:#00F1A6;
--pc:#FFB769;   --gr:#00B931;  --pk:#FF0041;  --ep:#FF69C2;
--bl:#BCD5FE;   --mg:#FF009D;  --blk:#000000; --wht:#FFFFFF;
--head:'Patika'; --body:'Goga'; --mono:'ApercuMono';
```

Note the two brand PDFs disagree slightly (`#FF9200` vs `#FF9400`). We use the
One Sheet values; confirm which is canonical before the next deck.

**Signature graphic — Fibers, Threads, Quilts.** This is what makes a deck read
as BGC rather than generic. Fibers are simple shapes; Threads are repeating rows
of fibers or code glyphs; Quilts are multiple threads on orange. Built in CSS:

```html
<div class="thread"><i class="t0"></i><i class="t1"></i>…</div>
```

Restraint matters: using all thirteen palette colours on one slide reads as
mess. Two accents plus black and white per slide.

---

## 9. Reusable components

Both decks share these. Copy them.

- `.gal` — rotating image gallery. N panes, 8s each, staggered
  `animation-delay`. Pane one gets its own keyframes so it opens **opaque** and
  the slide is never blank on arrival. Gate on `.slide.on` so the cycle starts
  when the slide is reached, not at page load, or a presenter arrives
  mid-rotation. Honour `prefers-reduced-motion`.
- `.imgsplit` — half copy, half full-bleed image. Stacks on mobile.
- `.hero` — giant headline, minimal furniture. The highest-impact slide type.
- Solid cell + 1px gap as the rule. Works on any ground and stops the page grid
  showing through type.
- Section wayfinding from existing markup: the per-slide `.foot` gets
  `order:-1` on mobile and becomes a header. **Show only the number** — if the
  footer label repeats the kicker you print every title twice.

---

## 10. Content rules learned the hard way

- **Never show three different numbers for the same claim.** We had 100%, 87%
  and 75% for completion. Pick one, define it once, and put the denominator in
  the speaker notes.
- **A count beats a percentage when the count is small.** "66 of 66" reads as
  honest; "100%" reads as marketing and invites the question.
- **Do not print a number that names a shortfall nobody asked about.** 84%
  attendance printed also says 16% did not show up. Say it out loud instead.
- **Cite per claim, not per slide.** One citation covering two numbers from
  different sources is a false citation.
- **Verify every face.** A mock we were handed had five of seven people wrong,
  including two sitting legislators. Never place a named person's photo without
  confirming it.
- Long bios do not fit. Either cut for the slide and put the full text in the
  speaker note, or go three columns on a narrower portrait.

---

## 11. Working practice

- Edit the repo copy, not a copy in Downloads. Two out-of-sync copies silently
  reverted a large commit once; the giveaway was a diffstat that mirrored the
  commit before it (196/102 then 102/196).
- Speaker notes live in the deck (`.note`), hidden by default. They travel with
  the file and are the right place for denominators, citations, permissions
  warnings and anything cut from a slide for space.
- Decks under `/decks/` are partner-gated by middleware. Public talks belong
  somewhere else — `/keynote/` is not matched by the gate.
