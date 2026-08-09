#!/usr/bin/env python3
"""Emit ready-to-paste @font-face rules with the font base64-embedded.

    python3 scripts/embed-font.py bgc          # Patika + Goga + Apercu Mono
    python3 scripts/embed-font.py bcc          # Special Gothic + Goga + Apercu Mono
    python3 scripts/embed-font.py fonts/patika-black.woff2 Head 900

Bundled faces live in fonts/. A deck is one file with no network, so every
face it uses has to be embedded this way.

Only embed the weights the deck actually uses. Each face is ~35KB raw, ~47KB
once base64'd, and they add up.
"""
import base64
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / 'fonts'

# family name, css weight, style, bundled file
SETS = {
    'bgc': [
        ('Patika',     500, 'normal', 'patika-medium.woff2'),
        ('Patika',     700, 'normal', 'patika-bold.woff2'),
        ('Patika',     900, 'normal', 'patika-black.woff2'),
        ('Goga',       400, 'normal', 'goga-regular.woff2'),
        ('Goga',       400, 'italic', 'goga-italic.woff2'),
        ('Goga',       600, 'normal', 'goga-semibold.woff2'),
        ('ApercuMono', 700, 'normal', 'apercu-mono-bold.woff2'),
    ],
    'bcc': [
        ('Special Gothic Condensed One', 400, 'normal', 'special-gothic-condensed.woff2'),
        ('Goga',       400, 'normal', 'goga-regular.woff2'),
        ('Goga',       400, 'italic', 'goga-italic.woff2'),
        ('Goga',       600, 'normal', 'goga-semibold.woff2'),
        ('Apercu Mono', 700, 'normal', 'apercu-mono-bold.woff2'),
    ],
}


def rule(family: str, weight, style: str, path: Path) -> str:
    if not path.exists():
        return f'/* MISSING: {path.name} */'
    b64 = base64.b64encode(path.read_bytes()).decode()
    display = 'block' if int(weight) >= 700 else 'swap'
    return (f"@font-face{{font-family:'{family}';"
            f"src:url(data:font/woff2;base64,{b64}) format('woff2');"
            f"font-weight:{weight};font-style:{style};font-display:{display}}}")


def main() -> int:
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        print('bundled faces:')
        for f in sorted(FONTS.glob('*.woff2')):
            print(f'  {f.name}  ({f.stat().st_size // 1024} KB)')
        return 2

    if args[0] in SETS:
        total = 0
        for family, weight, style, fname in SETS[args[0]]:
            p = FONTS / fname
            print(rule(family, weight, style, p))
            if p.exists():
                total += p.stat().st_size
        print(f'\n/* {args[0]} set: {total // 1024} KB raw, '
              f'~{int(total * 1.37) // 1024} KB base64 */', file=sys.stderr)
        return 0

    path = Path(args[0])
    if not path.is_absolute() and not path.exists():
        path = FONTS / path.name
    family = args[1] if len(args) > 1 else path.stem
    weight = args[2] if len(args) > 2 else 400
    style = args[3] if len(args) > 3 else 'normal'
    print(rule(family, weight, style, path))
    return 0


if __name__ == '__main__':
    sys.exit(main())
