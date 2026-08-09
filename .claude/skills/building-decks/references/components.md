# Deck components

Copy these. Both reference decks use them. Every one has a mobile behaviour that
must be declared in the last block of the stylesheet.

## Contents

1. Hero slide — the highest-impact type
2. Image split — half copy, half image
3. Rotating gallery
4. Cards — solid cell plus gap as the rule
5. Big number plus points
6. Quote with headshot
7. Stat row
8. Decorative rules

---

## 1. Hero slide

The single most effective slide type. Giant headline, minimal furniture, one
supporting line. Use it for openers, turns, and the close.

```html
<section class="slide s-blk hero">
  <span class="kick">The choice in front of us</span>
  <h1>The tools will not decide<br>who we become.<br><span class="acc">Our choices will.</span></h1>
  <p class="byline">One supporting beat, in mono, not a paragraph.</p>
  <div class="closer pushdown">The tagline, pushed to the foot.</div>
</section>
```

```css
.hero h1{ font-size:clamp(2.6rem,6.6vw,6.6rem); line-height:.98 }
.slide.hero > * + *{ margin-top:clamp(.8rem,2.2vh,1.5rem) }
.closer.pushdown,.rule-line.pushdown{ margin-top:auto }  /* sends it to the foot */
```

**Four blocks maximum.** A closing slide that grew to six (kicker, headline,
paragraph, three-column row, tagline, accents) read as busy. Cutting the
three-column row fixed it, because that row repeated the call to action the
previous slide already made.

---

## 2. Image split

```html
<div class="imgsplit">
  <div class="tx"> ...copy... </div>
  <figure class="figfull">
    <img alt="Meaningful description" src="data:image/jpeg;base64,...">
    <figcaption class="figcap">Caption in mono</figcaption>
  </figure>
</div>
```

```css
.imgsplit{ display:grid; grid-template-columns:1.05fr .95fr;
           gap:clamp(1.2rem,3vw,3rem); align-items:stretch; flex:1 1 auto; min-height:0 }
.figfull { margin:0; position:relative; overflow:hidden; border-radius:16px; min-height:0 }
.figfull img{ width:100%; height:100%; object-fit:cover; display:block }
.figcap  { position:absolute; left:0; right:0; bottom:0; padding:1.6em 1em .8em;
           background:linear-gradient(to top,rgba(0,0,0,.8),rgba(0,0,0,0)); color:#fff }

@media (max-width:820px){
  .imgsplit{ display:flex!important; flex-direction:column; gap:var(--sp) }
  .figfull { aspect-ratio:16/10 }
}
```

`min-height:0` on both the grid and the figure is required, or the image will
refuse to shrink inside a flex column.

**Pick images that argue the slide.** A classroom photo on a slide about
historical continuity says "the future" and works against the copy. An
intergenerational group around one device says "every generation".

---

## 3. Rotating gallery

N panes, one visible at a time, 8s each.

```html
<div class="frame gal">
  <div class="pane q1"><img alt="..." src="..."><div class="cap">Label · <i>detail</i></div></div>
  <div class="pane q2">...</div>
  <div class="pane q3">...</div>
</div>
```

```css
.gal{ position:relative; overflow:hidden; border-radius:16px; min-height:0 }
.gal .pane{ position:absolute; inset:0; opacity:0;
            animation:gal3 24s ease-in-out infinite; animation-play-state:paused }
.slide.on .gal .pane{ animation-play-state:running }   /* gate on arrival */
.gal .q1{ animation-name:gal3a; animation-delay:0s; opacity:1 }
.gal .q2{ animation-delay:8s }
.gal .q3{ animation-delay:16s }

@keyframes gal3 { 0%{opacity:0} 2%{opacity:1} 31%{opacity:1} 33%{opacity:0} 100%{opacity:0} }
@keyframes gal3a{ 0%{opacity:1} 31%{opacity:1} 33%{opacity:0} 96%{opacity:0} 100%{opacity:1} }
@media (prefers-reduced-motion:reduce){ .gal .pane{animation:none} .gal .q1{opacity:1} }
```

Two non-obvious requirements, both learned the hard way:

- **Gate on `.slide.on`.** Running from page load means a presenter who scrolls
  down arrives mid-rotation on whatever pane the timer happened to reach.
- **Pane one needs its own keyframes** starting at `opacity:1` and fading back in
  at the seam. With the shared keyframes it opens on a blank frame for the first
  2% of the cycle.

For N panes: cycle = N x 8s, delay = index x 8s, and the visible window is
`(8/cycle)*100`% minus the crossfade.

Mobile: the panes are absolutely positioned, so the **frame** must carry the
full-bleed width, not the image.

---

## 4. Cards — solid cell plus gap as the rule

Works on any ground and stops a page-grid background showing through type.

```css
.row  { display:grid; grid-template-columns:repeat(3,minmax(0,1fr));
        gap:1px; background:rgba(0,0,0,.14) }   /* the gap draws the rule */
.card { background:#fff; padding:clamp(.5rem,1.1vh,.85rem) clamp(.6rem,1.2vw,1.1rem) }
```

If the number of cards may not fill the tracks, use borders instead of a gap
grid — an empty track in a gap grid renders as a block of the rule colour:

```css
.row  { gap:0; background:#fff }
.card + .card{ border-left:1px solid rgba(0,0,0,.14) }
```

Mobile: one card per row, and the divider moves from `border-left` to
`border-top`.

---

## 5. Big number plus points

```html
<div class="split">
  <div class="bignum"><div class="n">34%</div><p>What it measures.</p><div class="tag">Source</div></div>
  <div class="pts">
    <div class="p"><b>Point title</b><p>Supporting copy.</p></div>
  </div>
</div>
```

```css
.split{ display:grid; grid-template-columns:.8fr 1.2fr; gap:clamp(1.2rem,3.4vw,3.2rem);
        align-items:start }
.bignum .n{ font-size:clamp(2.6rem,5.6vw,5rem); line-height:.9 }
.pts .p b{ font-size:clamp(1.25rem,1.9vw,2.1rem); display:block }
```

**Titles-only variant.** When the supporting copy is too small to read from the
back, delete it rather than shrinking it:

```css
.pts.titles{ gap:clamp(1.1rem,3.2vh,2.2rem); justify-content:center }
.pts.titles .p b{ font-size:clamp(1.5rem,2.5vw,3rem); line-height:1.05; margin:0 }
```

---

## 6. Quote with headshot

Give a quote its own row at the foot of the slide, behind a rule, with the
speaker's face. Never float an attribution under a dense block.

```css
.quoterow{ display:flex; align-items:center; gap:clamp(.9rem,2vw,1.8rem);
           margin-top:clamp(1rem,2.6vh,1.8rem); padding-top:clamp(.8rem,2vh,1.2rem);
           border-top:3px solid currentColor }
.hs { width:clamp(84px,9vw,150px); aspect-ratio:1/1; border-radius:50%; overflow:hidden }
.hs img{ width:100%; height:100%; object-fit:cover }
```

Crop headshots **square, biased up** so the eyes sit centred in the circular
mask. Applies to every portrait on a deck: match eyelines across a row or the
set looks unfinished.

---

## 7. Stat row

```css
.stat4{ display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(.7rem,1.6vw,1.3rem) }
.st   { padding:clamp(1rem,2vw,1.7rem); border-radius:14px }
.st .n{ font-size:clamp(2.2rem,4.4vw,4rem); line-height:.92 }

@media (max-width:820px){ .stat4{ grid-template-columns:1fr 1fr } }
```

Three items in a four-column grid leaves a hole. Set the column count to match
the item count, or accept an even 2x2.

Count-up animations must land on the real value. Verify by waiting for the
animation to finish and reading `textContent`, not by screenshotting early.

---

## 8. Decorative rules

If a brand has a signature graphic (a repeating strip of shapes or glyphs), it
can double as a horizontal rule between blocks:

```css
.accent.asrule{ padding-top:clamp(.6rem,1.6vh,1rem); border-top:3px solid currentColor;
                overflow:hidden; max-height:2.1em }
.accent.asrule.botrule{ margin-top:auto }   /* park it at the foot */
```

**Collapse adjacent rules.** If a `.rule-line` and an `.accent.asrule` sit next
to each other, both draw `border-top` and you get two lines:

```css
.rule-line + .accent.asrule,
.accent.asrule + .rule-line{ border-top:0; padding-top:.35em }
```

Use accents sparingly. A slide carrying two photos and two lists does not also
need an accent strip — that is a third voice.
