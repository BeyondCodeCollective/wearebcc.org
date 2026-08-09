# Deck architecture

Read before writing CSS. Start from `assets/starter.html`, which already has all
of this wired.

## Contents

1. Two-mode architecture
2. The four mobile rules
3. Source order — the gotcha that breaks slides silently
4. Reveal animations and the active-slide observer
5. Speaker notes

---

## 1. Two-mode architecture

**A fixed-viewport slide model and a phone are incompatible.** Do not compromise
between them. Ship both and switch at 820px.

### Projector mode, above 820px

```css
.deck  { height:100dvh; overflow-y:auto; scroll-snap-type:y mandatory;
         scroll-behavior:smooth }
.slide { height:100dvh; overflow-y:auto; overflow-x:hidden;
         scroll-snap-align:start; position:relative; isolation:isolate;
         display:flex; flex-direction:column; justify-content:center;
         padding:clamp(1.4rem,4.4vw,4.4rem) }
```

Plus a fixed footer bar fed from the active slide, and dot navigation.

`isolation:isolate` on `.slide` matters. Without it, any z-index inside a slide
competes globally and can paint over the fixed chrome. Symptom: speaker notes or
decorative marks drawing on top of the footer mid-scroll.

### Document mode, 820px and below

```css
@media (max-width:820px){
  html,body { height:auto; overflow:visible }
  .deck     { height:auto; min-height:0; overflow:visible; scroll-snap-type:none }
  .slide    { height:auto; min-height:0; overflow:visible; scroll-snap-align:none;
              display:flex; flex-direction:column; justify-content:flex-start;
              padding:var(--sp-lg) var(--g) }
  .dots, .deckfoot { display:none }
}
```

The page scrolls. Sections size to content. One scrollbar.

**Why this matters.** Before this change the phone build was
`body{overflow:hidden}` wrapping a nested scroll container with mandatory snap,
every section forced to `min-height:100svh`. You were scrolling a box inside a
locked page, snap fighting your thumb, short sections padded out to a screen of
empty colour. Horizontal overflow measured zero the whole time. **What felt
broken was the scrolling itself, not the pixels.** No amount of styling fixes
that; only changing the model does.

---

## 2. The four mobile rules

Mobile is a designed layer, not a squeezed desktop. When someone says it looks
"jumbled", measure the left edge of every block. On one real slide there were
**eleven different left edges**.

1. **One gutter.** Every block starts on the same left edge. Media is the only
   thing allowed to break it, and only by going fully edge to edge.
2. **One rhythm.** Vertical space comes from a single `--sp`. Components do not
   invent their own margins.
3. **One scale.** Type sizes are fixed for mobile rather than clamped per
   component, so a heading is the same size on every section.
4. **No desktop chrome.** Corner brackets, device bezels, decorative negative
   offsets and outline frames are projector jewellery. On a phone they are just
   things that fail to line up.

```css
@media (max-width:820px){
  :root{ --g:22px; --sp:1.5rem; --sp-lg:2.4rem }
  .slide > * + *              { margin-top:var(--sp) }
  .slide > *, .slide .row > * { max-width:100%!important; margin-left:0; margin-right:0 }
  .row,.grid,.split           { display:block!important }
  /* media is the only thing allowed to break the gutter */
  figure,.card-img{ margin-left:calc(var(--g) * -1); margin-right:calc(var(--g) * -1);
                    width:calc(100% + var(--g) * 2) }
  .sq,.bracket,.bezel{ display:none!important }
}
```

**Section wayfinding.** `.slide` is a flex column, so the per-slide `.foot`
markup can be reordered to the top on mobile and become a header:

```css
.foot{ display:flex; order:-1; margin:0 0 var(--sp) }
.foot span:first-child{ display:none }   /* see below */
```

Show **only the slide number**. If the footer label repeats the kicker, every
slide prints its title twice. This happened on 12 of 13 slides.

---

## 3. Source order — the gotcha

**Mobile overrides must be the last block in the stylesheet.**

Many mobile rules tie on specificity with the desktop rules they need to beat:

```css
.lxp .row{ align-items:center }            /* desktop, 0,2,0 */
@media (max-width:820px){
  .lxp .row{ align-items:stretch }         /* mobile,  0,2,0 — SAME */
}
```

When specificity ties, **source order decides**. If the media query sits higher
in the file than the desktop rule, it loses and nothing appears to happen.

Real symptoms this produced:

- a device frame collapsing to 19px wide with its images at 7px
- hub diagram nodes stacking on top of each other with labels off-screen

Related traps:

- **Higher-specificity re-enablers.** `.slide.on .net2 .n-left` is 0,3,0. A reset
  at 0,2,0 will not beat it however late it appears. Match the weight.
- **Inline styles win.** `style="align-items:center"` on an element beats any
  stylesheet rule without `!important`. Move it to a class so the media query
  can beat it.
- **Anchor programmatic CSS edits on a unique selector.** Inserting before
  `.og{color:var(--org)}` matched `.cthread .og{...}` first and produced a
  descendant selector that never fired.

---

## 4. Reveal animations and the observer

One IntersectionObserver does three jobs: marks the active slide, drives the
dots, and feeds the fixed footer.

```js
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('on');                       // never removed
  const i = slides.indexOf(e.target);
  dots.forEach((b,j) => b.classList.toggle('act', j===i));
  const f = e.target.querySelector('.foot');
  deckfoot.innerHTML = f ? f.innerHTML : '';
}), { threshold:.5 });
slides.forEach(s => io.observe(s));
```

`.on` is added once and never removed, so reveals do not replay on scroll-back.

**Gate anything time-based on `.on`.** A rotating gallery started at page load
means a presenter who scrolls to slide 10 arrives mid-rotation. See
`components.md`.

Always honour reduced motion:

```css
@media (prefers-reduced-motion:reduce){
  .slide > *{ opacity:1!important; transform:none!important; transition:none!important }
}
```

---

## 5. Speaker notes

Put a `.note` block in each slide, hidden by default, shown with a `notes-on`
class on `body`. Notes travel with the file, which makes them the right home for:

- denominators behind any number on the slide
- full citations
- permissions warnings for named people or logos
- anything cut from a slide for space
- delivery beats

Because `.note` sits inside `.slide`, give it a z-index below the fixed chrome,
or rely on `isolation:isolate` (section 1) to contain it.
