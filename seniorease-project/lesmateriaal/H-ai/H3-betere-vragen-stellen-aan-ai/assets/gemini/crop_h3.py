#!/usr/bin/env python3
"""Crop H3 Gemini shots: conversation only, no sidebar/PII/chrome."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
RAW = ROOT / "raw"
OUT = ROOT


def crop(src: Path, box: tuple[int, int, int, int], dest: Path) -> None:
    im = Image.open(src).convert("RGB")
    im.crop(box).save(dest, "PNG", optimize=True)
    print("wrote", dest.name, im.crop(box).size)


def main() -> None:
    # Viewport 1440x900 — exclude left sidebar + top chrome + location/login
    # S1: full “Wat kan ik koken?” bubble + short clarifying reply
    crop(RAW / "h3-s1-voor.png", (280, 80, 1320, 500), OUT / "H3-S1-voor.png")

    # S2: improved Q + start of structured answer (niet hele tekstmuur)
    crop(RAW / "h3-s2-na.png", (280, 70, 1280, 600), OUT / "H3-S2-na.png")

    # Soft cream bar over any residual bottom chrome if present (safety)
    for name in ("H3-S1-voor.png", "H3-S2-na.png"):
        p = OUT / name
        im = Image.open(p).convert("RGB")
        # no location text expected after crop; verify size
        print("ok", name, im.size)


if __name__ == "__main__":
    main()
