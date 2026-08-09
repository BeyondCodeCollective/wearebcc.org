# Brand skins

Never invent a logo, approximate a brand colour, or substitute a similar font.
Find the real assets first. If they do not exist, say so and use a text wordmark
in the deck's own type rather than guessing at a mark.

## Setting up a new brand

1. **Find the brand folder.** Look for `Branding/`, `Fonts/`, `Brand Images/`,
   or a one-sheet PDF. Read the guideline PDF before writing tokens.
2. **Convert fonts to woff2.** OTF and TTF are 2x the size for identical
   rendering. `fontTools` is usually already available:

```python
from fontTools.ttLib import TTFont
f = TTFont('Brand-Black.otf'); f.flavor = 'woff2'; f.save('brand-black.woff2')
```

3. **Base64 everything** — fonts, logos, photography — into the single file.
4. **Check for conflicting sources.** Two brand PDFs may disagree on hexes.
   Pick one, say which you used, and flag the discrepancy.

```python
import base64
uri = 'data:font/woff2;base64,' + base64.b64encode(open('brand-black.woff2','rb').read()).decode()
```

## Reference skin — BCC

```css
:root{
  --blue:#1D59FF; --yellow:#E5F701; --white:#fff; --black:#000;
  --head:'Special Gothic Condensed One',Impact,sans-serif;
  --body:'Goga','Avenir Next',sans-serif;
  --mono:'Apercu Mono','IBM Plex Mono',monospace;
}
```

Rules: blue, yellow and white only. No black as a large surface. Alternating
blue and white slide grounds for rhythm. No em dashes in copy.

## Reference skin — BGC

```css
:root{
  --org:#FF9400;  /* Essential Orange, primary, most applications */
  --urg:#FF4C00; --yl:#FFF000; --ll:#AD9DF3; --tl:#00F1A6; --pc:#FFB769;
  --gr:#00B931;  --pk:#FF0041; --ep:#FF69C2; --bl:#BCD5FE; --mg:#FF009D;
  --blk:#000000; --wht:#FFFFFF;
  --head:'Patika'; --body:'Goga'; --mono:'ApercuMono';
}
```

**Signature graphic — Fibers, Threads, Quilts.** This is what makes a deck read
as BGC rather than generic. Fibers are simple shapes; Threads are repeating rows
of fibers or code glyphs; Quilts are multiple threads on orange. Build in CSS,
do not import artwork:

```html
<div class="thread" aria-hidden="true"><i class="t0"></i><i class="t1"></i>…</div>
```

```css
.thread   { display:flex; gap:clamp(5px,.7vw,11px); align-items:center;
            overflow:hidden; height:clamp(14px,2vh,22px); flex:0 0 auto }
.thread i { flex:0 0 auto; width:clamp(10px,1.4vw,18px); aspect-ratio:1/1; display:block }
.thread .t0{ background:var(--ll); border-radius:3px }
.thread .t1{ background:var(--tl); border-radius:50% }
.thread .t2{ background:var(--pk); width:clamp(20px,2.8vw,36px); border-radius:99px }
.thread .t4{ background:var(--gr); clip-path:polygon(0 0,100% 0,0 100%) }
```

`overflow:hidden` on the strip clips the repeat; without it the row extends the
document and the page scrolls sideways on a phone.

**Restraint.** Using all thirteen palette colours on one slide reads as mess. Two
accents plus black and white per slide.

## Logos

- **Cap by width and height.** A horizontal logotype can be 15:1. Setting only a
  height gives a 530px-wide logo that overflows a 393px phone.
- **Match cap heights across a lockup.** Two wordmarks set by different rules
  render at different sizes and one reads as a footnote. Give them a shared
  height; the value is set by what fits, not by either mark.
- **Recolour rather than place a clashing mark.** For a single-colour logo wall,
  reverse the ink and keep the original alpha, which preserves antialiasing:

```python
from PIL import Image
im = Image.open('logo.png').convert('RGBA'); px = im.load()
for y in range(im.height):
    for x in range(im.width):
        px[x,y] = (255,255,255, px[x,y][3])   # ink to white, shape unchanged
```

A luminance threshold instead of alpha will chew serif edges.

- **Key out a baked background** with a luminance ramp, not a threshold, so
  knockouts inside the mark keep working:

```python
lum = 0.299*r + 0.587*g + 0.114*b
alpha = clamp((lum - lum_bg) / (255 - lum_bg))
```

- **Trim to the mark's own bounds** so it optically matches its neighbours, and
  crop decorative tails (a leaf stem, a tagline) that add height but no weight.

## Photography

- Real photos of real people beat stock on any deck arguing about real people.
  If a slide uses stock, say so.
- Crop to the frame's aspect, anchored so faces sit on a consistent line.
- Grayscale treatments unify mixed sources but crush dark-on-dark shots. Lift
  those with a gamma curve on the shadows, not flat brightness, or the
  highlights blow.

```python
g = 0.68
lut = [min(255, int(round(255*((i/255)**g)))) for i in range(256)]
im = im.point(lut*3)
```

- **Verify every face.** A supplied mock had five of seven people wrong,
  including two sitting legislators. Never place a named person's photo without
  confirming who it is.
