#!/usr/bin/env python3
"""H1 SeniorEase-herkenningsiconen A–D (volwassen · eenvoudig · geen emoji)."""
from pathlib import Path

from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parent / "assets" / "icons"
NAVY = (46, 36, 28)
GOLD = (139, 94, 60)
CREAM = (245, 238, 230)
WHITE = (255, 255, 255)
SIZE = 256


def _base() -> tuple[Image.Image, ImageDraw.ImageDraw]:
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    margin = 18
    d.rounded_rectangle(
        [margin, margin, SIZE - margin, SIZE - margin],
        radius=36,
        fill=CREAM + (255,),
        outline=NAVY + (255,),
        width=6,
    )
    return img, d


def icon_uitleggen() -> Image.Image:
    """Open boek / tekst → eenvoudiger: blad + pijl omlaag naar korte regels."""
    img, d = _base()
    # blad
    d.rounded_rectangle([70, 58, 186, 198], radius=10, outline=NAVY, width=5)
    for y in (78, 98, 118):
        d.line([(88, y), (168, y)], fill=GOLD, width=4)
    # korte regels onderaan (eenvoudiger)
    d.line([(88, 150), (140, 150)], fill=NAVY, width=5)
    d.line([(88, 170), (128, 170)], fill=NAVY, width=5)
    return img


def icon_ideeen() -> Image.Image:
    """Lamp / idee — rustige cirkel + stralen."""
    img, d = _base()
    cx, cy = SIZE // 2, 110
    d.ellipse([cx - 42, cy - 42, cx + 42, cy + 42], outline=NAVY, width=5)
    d.ellipse([cx - 22, cy - 22, cx + 22, cy + 22], fill=GOLD)
    for angle_pts in (
        [(cx, 48), (cx, 62)],
        [(cx - 55, 70), (cx - 42, 82)],
        [(cx + 55, 70), (cx + 42, 82)],
        [(cx - 50, 130), (cx - 38, 120)],
        [(cx + 50, 130), (cx + 38, 120)],
    ):
        d.line(angle_pts, fill=NAVY, width=4)
    d.rectangle([cx - 14, 155, cx + 14, 190], outline=NAVY, width=4)
    d.line([(cx - 10, 168), (cx + 10, 168)], fill=GOLD, width=3)
    return img


def icon_formuleren() -> Image.Image:
    """Bericht / potlood — tekstballon + tip."""
    img, d = _base()
    d.rounded_rectangle([58, 70, 198, 155], radius=18, outline=NAVY, width=5)
    d.polygon([(90, 155), (110, 155), (88, 185)], fill=NAVY)
    d.line([(80, 100), (170, 100)], fill=GOLD, width=4)
    d.line([(80, 122), (150, 122)], fill=GOLD, width=4)
    # potlood
    d.polygon([(168, 168), (198, 138), (208, 148), (178, 178)], fill=GOLD, outline=NAVY)
    d.polygon([(198, 138), (208, 128), (218, 138), (208, 148)], fill=NAVY)
    return img


def icon_stappen() -> Image.Image:
    """Drie stappen / mogelijkheden — genummerde blokken."""
    img, d = _base()
    boxes = [(58, 70), (98, 110), (138, 150)]
    for i, (x, y) in enumerate(boxes, 1):
        d.rounded_rectangle([x, y, x + 70, y + 48], radius=10, outline=NAVY, width=4)
        # streepjes als "opties"
        d.line([(x + 14, y + 18), (x + 54, y + 18)], fill=GOLD, width=4)
        d.line([(x + 14, y + 32), (x + 44, y + 32)], fill=NAVY, width=3)
    return img


def build() -> list[Path]:
    OUT.mkdir(parents=True, exist_ok=True)
    mapping = {
        "icon-uitleggen.png": icon_uitleggen,
        "icon-ideeen.png": icon_ideeen,
        "icon-formuleren.png": icon_formuleren,
        "icon-stappen.png": icon_stappen,
    }
    paths = []
    for name, fn in mapping.items():
        path = OUT / name
        fn().save(path)
        paths.append(path)
        print("wrote", path)
    return paths


if __name__ == "__main__":
    build()
