---
name: building-decks
description: Build presentation decks as a single self-contained HTML file that reads on a projector and on a phone. Use when the user asks for a deck, keynote, pitch deck, board deck, slide deck, or presentation, or asks to restyle an existing deck or PDF into a brand. Not for responsive marketing pages or app UI, which are ordinary web work.
---

# Building decks

A deck is **one HTML file**. Fonts, images, logos and QR codes are base64-embedded
so it renders with no network. Conference wifi fails; a deck that needs a CDN can
fail in the room.

Two decks built this way, as reference:

- **Conference keynote**, BGC skin, 13 slides — https://www.wearebcc.org/en/theo-tech
- **Partner pitch**, BCC skin, 19 slides — https://www.wearebcc.org/en/rancho-cordova
  (password-gated; ask Fonz for access)

Open the keynote, resize the window past 820px, and watch it change modes.
`assets/starter.html` is that architecture with nothing in it — start there.

## Order of work

1. **Get the content first.** If restyling a PDF, read every page before writing
   any CSS. If starting fresh, get the slide list agreed before designing.
2. **Inventory the brand.** Fonts, logos, colour tokens, photography. Never
   invent a logo or approximate a brand colour.
   → `references/brands.md`
3. **Build the shell**, then the slides. Start from `assets/starter.html`.
   → `references/architecture.md` — read this before writing any CSS
4. **Verify.** `scripts/verify.mjs`, then open screenshots and look at them.
5. **Iterate on real feedback**, re-verifying every pass.

## The three things that will bite you

**1. Phone and projector need different layouts, not one flexible one.**
Ship both modes and switch at 820px. Projector gets fixed viewports and scroll
snap; phone gets an ordinary scrolling document. Do not try to make one serve
both.

**2. Mobile overrides must be the LAST block in the stylesheet.**
Many mobile rules tie on specificity with the desktop rules they must beat. When
specificity ties, source order decides. A mobile block placed higher silently
loses. This broke two slides twice before it was understood.

**3. A passing script is not a verified design.**
`verify.mjs` measures overflow. It says nothing about whether a layout is
legible, balanced, or collapsed. **Open the screenshot and look at it** before
saying anything is done.

## Projector legibility

Decks get projected into rooms where people sit at the back.

- **14px is the absolute floor.** Nothing renders below it.
- For a keynote the working floor is higher: body 21–24px at 1920, labels 19px.
- If a sub-paragraph is too small to read, **delete it and keep the title.**
  Three titles at 48px beat three titles with unreadable copy beneath.
- Set `-webkit-text-size-adjust:100%`. Without it iOS inflates text in narrow
  blocks and a clean emulator is still a broken phone.
- Give short viewports their own rules. `@media (min-width:821px) and
  (max-height:820px)` catches 1280x720 projectors, which are still common.

## Contrast is measured, not eyeballed

Run every text-on-ground pair through `scripts/contrast.py` before shipping it.

```bash
python3 scripts/contrast.py FF9400 FFFFFF   # 2.21:1  FAIL
python3 scripts/contrast.py FF9400 000000   # 9.49:1  AAA
```

White on a mid-tone brand colour looks fine in a mockup and fails in a room. To
keep a two-tone headline, put the accent line in a filled block of the dark
colour with the brand colour as type on top.

## Verification loop

```bash
node scripts/verify.mjs path/to/deck.html            # 8 viewports, overflow + alignment
node scripts/verify.mjs path/to/deck.html --shots    # also writes /tmp/deckshots/NN.png
```

Then **read the screenshots**. Checks the script runs:

- zero horizontal overflow at 1920, 1440, 1280, 1024, 820, 1180, 390, 360
- `documentElement.scrollWidth === innerWidth` at 390
- distinct left edges per slide (more than 3 means the gutter is broken)
- every `.reveal` reaching full opacity
- no section with more than 110px of dead space

If a deck has a QR code, decode it back out of the **rendered screenshot**, never
trust generation:

```python
import cv2
data,_,_ = cv2.QRCodeDetector().detectAndDecode(cv2.imread('/tmp/deckshots/13.png'))
assert data == 'https://expected-url.example'
```

## Reference files

Read these when the task reaches them, not up front.

| File | Read when |
| --- | --- |
| `references/architecture.md` | before writing any CSS |
| `references/components.md` | building slides — galleries, image splits, hero slides, cards |
| `references/brands.md` | setting up tokens, fonts, logos |
| `references/content-rules.md` | writing or editing slide copy, numbers, citations |

## Failure modes

- **"It looks jumbled on mobile"** → measure left edges. Not a styling problem, a
  gutter problem. `references/architecture.md`.
- **"The image is tiny" / "the logo is huge"** → an element sized by height when
  the artwork is a wide lockup, or vice versa. Cap by both.
- **Slide overflows vertically** → do not shrink type past the floor. Cut
  content, or give that slide its own short-viewport rule.
- **Two rules stacking** → two components each drawing `border-top`. Collapse the
  adjacency, do not delete one component.
- **A component works on desktop and collapses on mobile** → source order. See
  gotcha 2.
