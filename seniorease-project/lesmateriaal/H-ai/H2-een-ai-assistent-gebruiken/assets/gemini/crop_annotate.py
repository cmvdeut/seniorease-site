#!/usr/bin/env python3
"""Crop + light annotate current Gemini screenshots for H2 beamer."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent
RAW = ROOT / "raw"
OUT = ROOT
GOLD = (196, 149, 67)
NAVY = (26, 43, 74)
WHITE = (255, 255, 255)


def crop(src: Path, box: tuple[int, int, int, int], dest: Path) -> None:
    im = Image.open(src).convert("RGB")
    im.crop(box).save(dest, "PNG", optimize=True)
    print("wrote", dest.name, im.crop(box).size)


def annotate_circle(im: Image.Image, xy: tuple[int, int], r: int = 28) -> Image.Image:
    """One clear annotation circle (instruction moment)."""
    draw = ImageDraw.Draw(im)
    x, y = xy
    draw.ellipse((x - r, y - r, x + r, y + r), outline=GOLD, width=6)
    draw.ellipse((x - r + 4, y - r + 4, x + r - 4, y + r - 4), outline=NAVY, width=2)
    return im


def scrub_location_strip(im: Image.Image) -> Image.Image:
    """Hide IP-based location strip if present in lower-left of full frames."""
    # For crops that still include sidebar bottom: paint a cream bar.
    w, h = im.size
    draw = ImageDraw.Draw(im)
    # conservative: only if image is wide full-ish sidebar crops
    if w > 400 and h > 500:
        draw.rectangle((0, int(h * 0.82), int(w * 0.22), h), fill=(248, 249, 250))
    return im


def main() -> None:
    # S1 — empty typvak (central)
    crop(RAW / "full-s1.png", (280, 300, 1160, 560), OUT / "G2-S1-openen-typvak.png")

    # S2 — typed + send (annotate send button; crop wide enough for blue arrow)
    s2 = Image.open(RAW / "full-s2.png").convert("RGB").crop((260, 310, 1280, 575))
    annotate_circle(s2, (900, 188), r=32)
    s2.save(OUT / "G2-S2-vragen-versturen.png", "PNG", optimize=True)
    print("wrote G2-S2-vragen-versturen.png", s2.size)

    # S3 — antwoord: titel + tip body · top strak zodat letters de crop vullen
    s3 = Image.open(RAW / "full-after-send.png").convert("RGB").crop((470, 245, 1080, 302))
    s3 = s3.resize((s3.width * 4, s3.height * 4), Image.Resampling.LANCZOS)
    s3.save(OUT / "G2-S3-antwoord.png", "PNG", optimize=True)
    print("wrote G2-S3-antwoord.png", s3.size)

    # S4a — follow-up typed: focus on typvak (beamer-readable)
    s4a = Image.open(RAW / "full-s4a.png").convert("RGB").crop((300, 620, 1380, 880))
    annotate_circle(s4a, (920, 135), r=30)
    s4a.save(OUT / "G2-S4a-vervolgvraag.png", "PNG", optimize=True)
    print("wrote G2-S4a-vervolgvraag.png", s4a.size)

    # S4b — follow-up answer
    crop(RAW / "full-s4.png", (250, 60, 1380, 520), OUT / "G2-S4b-vervolgantwoord.png")

    # S5 — alleen rij "Nieuw gesprek" (geen loginregel) · cirkel strak om pictogram
    s5 = Image.open(RAW / "full-after-send.png").convert("RGB").crop((4, 58, 280, 105))
    scale = 3
    s5 = s5.resize((s5.width * scale, s5.height * scale), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(s5)
    # na opschalen: strak om pictogram, tekst volledig vrij
    cx, cy, r = 20 * scale, 17 * scale, 16
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=GOLD, width=3)
    s5.save(OUT / "G2-S5-nieuw-gesprek.png", "PNG", optimize=True)
    print("wrote G2-S5-nieuw-gesprek.png", s5.size)

    # S6 — empty after new chat (prefer dedicated capture; fallback S1)
    s6_src = RAW / "full-s6-empty.png"
    if not s6_src.exists():
        s6_src = RAW / "full-s1.png"
    crop(s6_src, (280, 300, 1160, 560), OUT / "G2-S6-leeg-typvak.png")

    # Also keep dialog as optional support asset (not primary instruction if confusing)
    if (RAW / "full-s5-dialog.png").exists():
        crop(RAW / "full-s5-dialog.png", (420, 280, 1020, 620), OUT / "G2-S5-dialog-optioneel.png")

    print("done")


if __name__ == "__main__":
    main()
