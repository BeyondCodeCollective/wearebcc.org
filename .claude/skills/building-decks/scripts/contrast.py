#!/usr/bin/env python3
"""WCAG contrast ratio for a text/ground pair.

    python3 contrast.py FF9400 FFFFFF      -> 2.21:1  FAIL
    python3 contrast.py FF9400 000000      -> 9.49:1  AAA
    python3 contrast.py --palette FF9400 000000 FFFFFF FFF000

Run this on every text-on-ground pair before shipping. White on a mid-tone
brand colour looks fine in a mockup and fails in a room.

Thresholds: 3:1 large text (>=24px, or >=18.66px bold), 4.5:1 body, 7:1 AAA.
"""
import sys


def _lin(c: float) -> float:
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def luminance(hex_colour: str) -> float:
    h = hex_colour.lstrip('#')
    if len(h) == 3:
        h = ''.join(ch * 2 for ch in h)
    if len(h) != 6:
        raise ValueError(f'not a hex colour: {hex_colour}')
    r, g, b = (_lin(int(h[i:i + 2], 16) / 255) for i in (0, 2, 4))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(a: str, b: str) -> float:
    la, lb = sorted((luminance(a), luminance(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


def verdict(r: float) -> str:
    if r >= 7:    return 'AAA'
    if r >= 4.5:  return 'AA'
    if r >= 3:    return 'AA large text only'
    return 'FAIL'


def main() -> int:
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        return 2

    if args[0] == '--palette':
        cols = args[1:]
        if len(cols) < 2:
            print('need at least two colours')
            return 2
        width = max(len(c) for c in cols) + 2
        print(' ' * width + ''.join(c.rjust(width) for c in cols))
        for a in cols:
            row = a.rjust(width)
            for b in cols:
                row += ('-' if a == b else f'{ratio(a, b):.2f}').rjust(width)
            print(row)
        print('\n3:1 large text, 4.5:1 body, 7:1 AAA')
        return 0

    if len(args) != 2:
        print('usage: contrast.py FG BG   |   contrast.py --palette C1 C2 C3 ...')
        return 2

    r = ratio(args[0], args[1])
    v = verdict(r)
    print(f'#{args[0].lstrip("#")} on #{args[1].lstrip("#")}  ->  {r:.2f}:1  {v}')
    return 0 if r >= 3 else 1


if __name__ == '__main__':
    sys.exit(main())
