#!/usr/bin/env python3
"""Generate C3 instructional shots (platformgetrouw, veilige oefengegevens)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import math

ROOT = Path(__file__).resolve().parent
SHOTS = ROOT / "assets" / "screenshots"
for p in [SHOTS / "ios", SHOTS / "android", SHOTS / "shared", ROOT / "pdf", ROOT / "beamer"]:
    p.mkdir(parents=True, exist_ok=True)

NAVY = (62, 39, 35)
GOLD = (166, 124, 82)
CREAM = (245, 240, 232)
WA_GREEN = (7, 94, 84)
RED = (220, 50, 50)
GREEN = (37, 211, 102)
DARK = (18, 28, 32)


def font(size: int):
    for name in ["C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/segoeui.ttf", "arial.ttf"]:
        try:
            return ImageFont.truetype(name, size)
        except Exception:
            pass
    return ImageFont.load_default()


def draw_phone(w=440, h=800):
    im = Image.new("RGB", (w, h), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([20, 20, w - 20, h - 20], radius=36, fill=(250, 250, 250), outline=(40, 40, 40), width=3)
    return im, d


def status_bar(d, x0, y0, x1, light=True):
    col = (30, 30, 30) if light else (230, 230, 230)
    d.text((x0 + 16, y0 + 10), "09:41", fill=col, font=font(16))
    d.text((x1 - 70, y0 + 10), "82%", fill=col, font=font(16))


def icon_phone(d, cx, cy, r=12, fill="white"):
    # classic handset
    d.arc([cx - r, cy - r, cx + r, cy + r], 200, 340, fill=fill, width=3)
    d.line([cx - r + 2, cy - 2, cx - r + 8, cy + 6], fill=fill, width=3)
    d.line([cx + r - 2, cy - 2, cx + r - 8, cy + 6], fill=fill, width=3)


def icon_video(d, x, y, w=22, h=16, fill="white"):
    d.rounded_rectangle([x, y, x + w, y + h], radius=3, outline=fill, width=2)
    d.polygon([(x + w, y + 3), (x + w + 10, y - 2), (x + w + 10, y + h + 2), (x + w, y + h - 3)], outline=fill, width=2)


def icon_mic(d, cx, cy, fill="white"):
    d.rounded_rectangle([cx - 7, cy - 16, cx + 7, cy + 2], radius=7, fill=fill)
    d.arc([cx - 14, cy - 8, cx + 14, cy + 14], 0, 180, fill=fill, width=3)
    d.line([cx, cy + 14, cx, cy + 22], fill=fill, width=3)
    d.line([cx - 10, cy + 22, cx + 10, cy + 22], fill=fill, width=3)


def icon_cam(d, cx, cy, fill="white"):
    d.rounded_rectangle([cx - 16, cy - 10, cx + 10, cy + 10], radius=3, outline=fill, width=2)
    d.polygon([(cx + 10, cy - 4), (cx + 22, cy - 12), (cx + 22, cy + 12), (cx + 10, cy + 4)], outline=fill, width=2)


def mark_one(d, box, arrow_from=None):
    d.ellipse(box, outline=RED, width=4)
    if arrow_from:
        ax, ay = arrow_from
        mx = (box[0] + box[2]) / 2
        my = (box[1] + box[3]) / 2
        d.line([ax, ay, mx, my], fill=RED, width=4)
        d.polygon([(mx, my), (mx - 10, my - 8), (mx - 4, my - 14)], fill=RED)


def wa_header(d, x0, y0, x1, name="SeniorEase oefencontact", mark_name=False, show_call=False, mark_call=None):
    d.rectangle([x0, y0, x1, y0 + 56], fill=WA_GREEN)
    d.text((x0 + 44, y0 + 10), "<", fill="white", font=font(22))
    d.ellipse([x0 + 70, y0 + 10, x0 + 106, y0 + 46], fill=(180, 180, 180))
    d.text((x0 + 118, y0 + 14), name[:20], fill="white", font=font(16))
    if mark_name:
        mark_one(d, [x0 + 112, y0 + 6, x1 - 100, y0 + 50])
    if show_call:
        vx, vy = x1 - 92, y0 + 12
        px, py = x1 - 48, y0 + 12
        d.rounded_rectangle([vx, vy, vx + 34, vy + 32], radius=8, fill=(15, 110, 95))
        icon_video(d, vx + 5, vy + 8, 16, 12, "white")
        d.ellipse([px, py, px + 34, py + 32], fill=GREEN)
        icon_phone(d, px + 17, py + 16, 9, "white")
        if mark_call == "phone":
            mark_one(d, [px - 6, py - 6, px + 40, py + 38], arrow_from=(px - 35, py + 16))
        if mark_call == "video":
            mark_one(d, [vx - 6, vy - 6, vx + 40, vy + 38], arrow_from=(vx - 35, vy + 16))


def save_shot(im: Image.Image, rel: str):
    dest = SHOTS / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest)
    print("shot", rel)


def main():
    # Bellen starten — alleen telefoonknop gemarkeerd
    im, d = draw_phone()
    status_bar(d, 30, 36, 410)
    d.text((40, 70), "Audiogesprek starten", fill=NAVY, font=font(17))
    wa_header(d, 30, 100, 410, show_call=True, mark_call="phone")
    d.rectangle([30, 156, 410, 760], fill=(236, 229, 221))
    d.text((50, 220), "Rechtsboven: telefoonknop = bellen", fill=NAVY, font=font(15))
    save_shot(im, "shared/c3-gesprek-knoppen.png")

    im, d = draw_phone()
    status_bar(d, 30, 36, 410)
    d.text((40, 70), "Naam controleren", fill=NAVY, font=font(17))
    wa_header(d, 30, 100, 410, mark_name=True, show_call=True)
    d.rectangle([30, 156, 410, 760], fill=(236, 229, 221))
    d.text((50, 220), "KIJK EERST NAAR DE NAAM", fill=NAVY, font=font(16))
    save_shot(im, "shared/c3-naam-controleren.png")

    im, d = draw_phone()
    status_bar(d, 30, 36, 410)
    d.text((40, 70), "Videobellen starten", fill=NAVY, font=font(17))
    wa_header(d, 30, 100, 410, show_call=True, mark_call="video")
    d.rectangle([30, 156, 410, 760], fill=(236, 229, 221))
    d.text((50, 220), "Camera-knop = videobellen", fill=NAVY, font=font(15))
    d.text((50, 255), "Eerst vragen of het uitkomt.", fill=(100, 100, 100), font=font(14))
    save_shot(im, "shared/c3-video-starten.png")

    # Lopend audiogesprek — knoppenrij onderaan zoals WhatsApp
    im, d = draw_phone()
    status_bar(d, 30, 36, 410, light=False)
    d.rectangle([30, 70, 410, 760], fill=DARK)
    d.text((105, 130), "SeniorEase oefencontact", fill="white", font=font(18))
    d.text((175, 170), "00:12", fill=(160, 160, 160), font=font(15))
    d.ellipse([170, 240, 270, 340], fill=(70, 80, 85))
    # bottom controls: speaker · mic · hangup
    d.ellipse([70, 580, 140, 650], fill=(55, 60, 65))
    d.ellipse([90, 600, 120, 630], outline="white", width=2)
    d.polygon([(95, 610), (85, 600), (85, 630)], fill="white")
    d.ellipse([185, 580, 255, 650], fill=(55, 60, 65))
    icon_mic(d, 220, 608, "white")
    d.ellipse([300, 580, 370, 650], fill=RED)
    icon_phone(d, 335, 615, 11, "white")
    # mark only hangup on this overview? Better mark mic area lightly - audio shot marks mic row note
    d.text((70, 690), "Onderin: microfoon · rode knop = ophangen", fill=(190, 190, 190), font=font(13))
    save_shot(im, "shared/c3-audio-gesprek.png")

    # Ophangen — één markering op rode knop
    im, d = draw_phone()
    status_bar(d, 30, 36, 410, light=False)
    d.rectangle([30, 70, 410, 760], fill=DARK)
    d.text((120, 140), "Gesprek beëindigen", fill="white", font=font(18))
    d.text((100, 190), "SeniorEase oefencontact", fill=(180, 180, 180), font=font(14))
    d.ellipse([70, 560, 140, 630], fill=(55, 60, 65))
    icon_mic(d, 105, 588, (180, 180, 180))
    d.ellipse([185, 540, 275, 630], fill=RED)
    icon_phone(d, 230, 585, 14, "white")
    mark_one(d, [175, 530, 285, 640], arrow_from=(140, 480))
    d.text((90, 680), "Rode knop = ophangen", fill="white", font=font(16))
    save_shot(im, "shared/c3-ophangen.png")

    # Inkomende oproep — groen opnemen gemarkeerd
    im, d = draw_phone()
    status_bar(d, 30, 36, 410, light=False)
    d.rectangle([30, 70, 410, 760], fill=(12, 45, 38))
    d.text((135, 130), "WhatsApp-oproep", fill="white", font=font(17))
    d.ellipse([165, 190, 275, 300], fill=(150, 155, 160))
    d.text((85, 330), "SeniorEase oefencontact", fill="white", font=font(18))
    d.text((160, 370), "belt u…", fill=(170, 200, 190), font=font(15))
    # decline / accept
    d.ellipse([70, 560, 160, 650], fill=RED)
    icon_phone(d, 115, 605, 12, "white")
    d.ellipse([280, 560, 370, 650], fill=GREEN)
    icon_phone(d, 325, 605, 12, "white")
    mark_one(d, [270, 550, 380, 660], arrow_from=(220, 520))
    d.text((70, 700), "Kijk wie belt → tik op de groene knop", fill=(220, 220, 220), font=font(14))
    save_shot(im, "shared/c3-inkomende-oproep.png")

    # Microfoon uit — één markering
    im, d = draw_phone()
    status_bar(d, 30, 36, 410, light=False)
    d.rectangle([30, 70, 410, 760], fill=DARK)
    d.text((110, 130), "Microfoon uit / aan", fill="white", font=font(18))
    d.text((55, 180), "MICROFOON UIT = de ander hoort u niet", fill=(255, 200, 120), font=font(14))
    d.ellipse([70, 560, 140, 630], fill=(55, 60, 65))
    d.ellipse([175, 540, 265, 630], fill=(80, 50, 50))
    icon_mic(d, 220, 575, "white")
    d.line([195, 555, 245, 615], fill=RED, width=5)
    mark_one(d, [165, 530, 275, 640], arrow_from=(120, 480))
    d.ellipse([300, 560, 370, 630], fill=RED)
    icon_phone(d, 335, 595, 11, "white")
    d.text((90, 680), "Dempen is niet ophangen", fill=(200, 200, 200), font=font(15))
    save_shot(im, "shared/c3-microfoon.png")

    # Videogesprek — overzicht knoppen (geen multi-mark; caption only)
    im, d = draw_phone()
    status_bar(d, 30, 36, 410, light=False)
    d.rectangle([30, 70, 410, 760], fill=(25, 28, 35))
    d.rounded_rectangle([45, 100, 395, 480], radius=14, fill=(55, 75, 65))
    d.text((130, 250), "Videogesprek", fill="white", font=font(20))
    d.text((95, 295), "SeniorEase oefencontact", fill=(230, 230, 230), font=font(14))
    d.rounded_rectangle([300, 115, 385, 215], radius=10, fill=(70, 75, 85))
    d.text((325, 150), "u", fill="white", font=font(18))
    d.ellipse([60, 560, 130, 630], fill=(50, 55, 60))
    icon_mic(d, 95, 588, "white")
    d.ellipse([185, 560, 255, 630], fill=(50, 55, 60))
    icon_cam(d, 210, 595, "white")
    d.ellipse([310, 560, 380, 630], fill=RED)
    icon_phone(d, 345, 595, 11, "white")
    d.text((55, 680), "Microfoon · camera · ophangen", fill=(190, 190, 190), font=font(14))
    save_shot(im, "shared/c3-video-gesprek.png")

    # Camera uit — één markering
    im, d = draw_phone()
    status_bar(d, 30, 36, 410, light=False)
    d.rectangle([30, 70, 410, 760], fill=(25, 28, 35))
    d.text((120, 130), "Camera uit / aan", fill="white", font=font(18))
    d.text((60, 180), "CAMERA UIT = de ander ziet u niet", fill=(255, 200, 120), font=font(14))
    d.rounded_rectangle([45, 220, 395, 480], radius=14, fill=(40, 42, 48))
    d.text((150, 330), "Camera staat uit", fill=(160, 160, 160), font=font(16))
    d.ellipse([60, 560, 130, 630], fill=(50, 55, 60))
    icon_mic(d, 95, 588, (160, 160, 160))
    d.ellipse([175, 540, 265, 630], fill=(80, 50, 50))
    icon_cam(d, 210, 585, "white")
    d.line([190, 555, 250, 615], fill=RED, width=5)
    mark_one(d, [165, 530, 275, 640], arrow_from=(120, 500))
    d.ellipse([310, 560, 380, 630], fill=RED)
    icon_phone(d, 345, 595, 11, "white")
    save_shot(im, "shared/c3-camera.png")

    # Terug
    im, d = draw_phone()
    status_bar(d, 30, 36, 410)
    d.text((40, 70), "Terug naar het gesprek", fill=NAVY, font=font(17))
    wa_header(d, 30, 100, 410)
    d.rectangle([30, 156, 410, 760], fill=(236, 229, 221))
    mark_one(d, [38, 108, 82, 152], arrow_from=(120, 180))
    d.text((50, 220), "Na ophangen bent u terug in WhatsApp.", fill=NAVY, font=font(15))
    save_shot(im, "shared/c3-terug-gesprek.png")

    # Persoon vs groep — schematisch OK
    im = Image.new("RGB", (880, 520), CREAM)
    d = ImageDraw.Draw(im)
    d.text((40, 30), "Persoon of groep? Kijk bovenaan.", fill=NAVY, font=font(22))
    d.rounded_rectangle([40, 80, 420, 460], radius=16, fill="white", outline=GOLD, width=3)
    d.rectangle([40, 80, 420, 140], fill=WA_GREEN)
    d.text((60, 100), "SeniorEase oefencontact", fill="white", font=font(16))
    d.text((60, 180), "Eén persoon", fill=NAVY, font=font(20))
    d.text((60, 230), "Naam van één contact.", fill=(80, 80, 80), font=font(15))
    d.rounded_rectangle([460, 80, 840, 460], radius=16, fill="white", outline=RED, width=4)
    d.rectangle([460, 80, 840, 140], fill=WA_GREEN)
    d.text((480, 100), "SeniorEase oefengroep", fill="white", font=font(16))
    d.text((480, 180), "Een groep", fill=NAVY, font=font(20))
    d.text((480, 230), "Groepsnaam bovenaan.", fill=(80, 80, 80), font=font(15))
    d.text((480, 280), "Alleen herkennen — geen groep maken.", fill=GOLD, font=font(14))
    save_shot(im, "shared/c3-persoon-vs-groep.png")

    im, d = draw_phone()
    status_bar(d, 30, 36, 410, light=False)
    d.rectangle([30, 70, 410, 760], fill=DARK)
    d.text((110, 140), "Camera wisselen", fill="white", font=font(18))
    d.text((70, 200), "Ondersteunend — niet verplicht", fill=(170, 170, 170), font=font(14))
    d.ellipse([160, 340, 280, 460], fill=(55, 60, 65))
    d.arc([180, 360, 260, 440], 40, 320, fill="white", width=4)
    mark_one(d, [150, 330, 290, 470])
    save_shot(im, "shared/c3-camera-wisselen.png")

    print("done assets")


if __name__ == "__main__":
    main()
