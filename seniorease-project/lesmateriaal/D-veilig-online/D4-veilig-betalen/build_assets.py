#!/usr/bin/env python3
"""D4 instructiebeelden — fictieve betaalkaarten, geen echte bank/logo's/codes."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
SHOTS = ROOT / "assets" / "screenshots"
for p in [SHOTS / "ios", SHOTS / "android", SHOTS / "shared", ROOT / "pdf", ROOT / "beamer"]:
    p.mkdir(parents=True, exist_ok=True)

NAVY = (62, 39, 35)
GOLD = (166, 124, 82)
CREAM = (245, 240, 232)
WHITE = (255, 255, 255)
GRAY = (120, 120, 120)
RED = (180, 50, 50)
IOS_BLUE = (0, 122, 255)
ANDROID_TEAL = (18, 140, 126)


def font(size: int):
    for name in [
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/calibri.ttf",
    ]:
        try:
            return ImageFont.truetype(name, size)
        except Exception:
            pass
    return ImageFont.load_default()


def save(im, rel):
    dest = SHOTS / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, optimize=True)
    print("shot", rel)


def mark(d, box, width=3):
    d.rounded_rectangle(box, radius=10, outline=RED, width=width)


def phone_frame(w=440, h=860, fill=WHITE):
    im = Image.new("RGB", (w, h), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([18, 18, w - 18, h - 18], radius=40, fill=fill, outline=(35, 35, 35), width=3)
    d.rounded_rectangle([160, 28, 280, 48], radius=10, fill=(30, 30, 30))
    return im, d


def status(d, dark=False):
    col = (240, 240, 240) if dark else (25, 25, 25)
    d.text((44, 52), "09:41", fill=col, font=font(15))
    d.text((348, 52), "82%", fill=col, font=font(15))


def kapstok():
    im = Image.new("RGB", (900, 560), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([40, 40, 860, 520], radius=20, fill=WHITE, outline=GOLD, width=3)
    d.text((80, 70), "BIJ EEN BETAALMOMENT", fill=NAVY, font=font(20))
    d.text((80, 140), "STOP → NIET VERDERGAAN → ZELF CONTROLEREN", fill=RED, font=font(18))
    d.text((80, 230), "VERWACHT", fill=GOLD, font=font(36))
    d.text((80, 300), "→ CONTROLEER", fill=NAVY, font=font(36))
    d.text((80, 370), "→ PAS DAN BEVESTIGEN", fill=NAVY, font=font(36))
    d.text((80, 460), "SeniorEase-oefening", fill=GRAY, font=font(14))
    save(im, "shared/d4-kapstok.png")


def vier_vragen():
    im = Image.new("RGB", (980, 620), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 590], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 55), "Vier betaalvragen", fill=GOLD, font=font(20))
    vragen = [
        "1. Verwacht ik deze betaling?",
        "2. Ben ik zelf met deze aankoop begonnen?",
        "3. Klopt het bedrag?",
        "4. Past de ontvanger of betaalcontext",
    ]
    y = 120
    for v in vragen:
        d.text((60, y), v, fill=NAVY, font=font(26))
        y += 70
    d.text((60, y - 20), "   bij wat ik wilde betalen?", fill=NAVY, font=font(26))
    d.text((60, 520), "Alleen: past dit bij wat u zelf wilde?", fill=GRAY, font=font(16))
    save(im, "shared/d4-vier-vragen.png")


def nee_zin():
    im = Image.new("RGB", (980, 420), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 390], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 70), "Bij afwijking of twijfel", fill=GOLD, font=font(18))
    d.text((60, 140), "Nee, dit bevestig ik niet.", fill=NAVY, font=font(36))
    d.text((60, 230), "→ NIET BEVESTIGEN", fill=RED, font=font(28))
    d.text((60, 290), "→ ZELF CONTROLEREN", fill=RED, font=font(28))
    save(im, "shared/d4-nee-zin.png")


def betaalkaart(
    letter: str,
    context_line: str,
    ontvanger: str,
    bedrag: str,
    out: str,
    footer: str,
):
    """Fictieve betaalkaart — geen antwoordlabels, geen klikbare knop."""
    im = Image.new("RGB", (980, 620), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 590], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 50), "Oefening SeniorEase — geen echte betaling", fill=GOLD, font=font(16))
    d.text((60, 95), context_line, fill=NAVY, font=font(20))

    # Payment overview card
    d.rounded_rectangle([60, 160, 920, 460], radius=14, fill=(250, 248, 244), outline=(210, 200, 190), width=2)
    d.text((90, 185), "Betaaloverzicht (voorbeeld)", fill=GOLD, font=font(16))
    d.text((90, 235), "Ontvanger / context", fill=GRAY, font=font(16))
    d.text((90, 270), ontvanger, fill=NAVY, font=font(28))
    d.text((90, 340), "Bedrag", fill=GRAY, font=font(16))
    d.text((90, 375), bedrag, fill=NAVY, font=font(32))
    d.text((520, 340), "Via", fill=GRAY, font=font(16))
    d.text((520, 375), "iDEAL (voorbeeld)", fill=NAVY, font=font(24))

    # Non-clickable placeholder — not a working button, no "confirm"
    d.rounded_rectangle([60, 490, 400, 545], radius=10, fill=(230, 225, 218), outline=(200, 190, 180))
    d.text((95, 505), "Alleen kijken · niet klikbaar", fill=GRAY, font=font(16))
    d.text((60, 555), footer, fill=GRAY, font=font(14))
    save(im, out)


def situatie_c():
    im = Image.new("RGB", (980, 480), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 450], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 55), "Oefening SeniorEase — geen echt verzoek", fill=GOLD, font=font(16))
    d.text((60, 115), "“Bevestig nu een betaling”", fill=NAVY, font=font(26))
    d.text((60, 165), "of “Maak over naar een veilige rekening.”", fill=NAVY, font=font(26))
    d.text((60, 235), "U was zelf niet met een aankoop bezig.", fill=NAVY, font=font(20))
    d.text((60, 300), "→ STOP", fill=RED, font=font(28))
    d.text((60, 350), "→ NIET BETALEN · NIET OVERMAKEN", fill=RED, font=font(26))
    d.text((60, 410), "Geen echte rekening · geen betaling", fill=GRAY, font=font(16))
    save(im, "shared/d4-situatie-c.png")


def bank_app(platform: str):
    im, d = phone_frame(h=860, fill=WHITE)
    status(d)
    label = "iPhone" if platform == "iPhone" else "Android"
    d.text((40, 70), f"Uw eigen bank — {label} · voorbeeld", fill=GOLD, font=font(13))
    d.text((40, 100), "Geen echte bank · geen login · geen reclame", fill=GRAY, font=font(12))
    col = IOS_BLUE if platform == "iPhone" else ANDROID_TEAL
    d.rounded_rectangle([140, 220, 300, 380], radius=28, fill=col)
    d.text((165, 290), "Uw bank", fill=WHITE, font=font(22))
    mark(d, [134, 214, 306, 386])
    d.text((50, 440), "App die u al gebruikt", fill=NAVY, font=font(18))
    d.text((50, 490), "Tot startscherm · niet inloggen", fill=GRAY, font=font(15))
    d.text((50, 540), "Niet via link of QR uit een bericht", fill=GRAY, font=font(15))
    save(im, f"{'ios' if platform == 'iPhone' else 'android'}/d4-bank-app.png")


def bank_adres(platform: str):
    im, d = phone_frame(h=860, fill=WHITE)
    status(d)
    label = "iPhone" if platform == "iPhone" else "Android"
    d.text((40, 70), f"Zelf typen — {label} · voorbeeld", fill=GOLD, font=font(13))
    d.rounded_rectangle([40, 120, 400, 180], radius=12, fill=(245, 245, 248), outline=(200, 200, 210))
    d.text((55, 140), "uw-bank.nl  (voorbeeld · zelf typen)", fill=NAVY, font=font(14))
    mark(d, [34, 114, 406, 186])
    d.text((48, 220), "Adres dat u zelf typt", fill=NAVY, font=font(18))
    d.text((48, 270), "Niet via onverwachte link of QR", fill=GRAY, font=font(15))
    d.text((48, 320), "Tot startscherm · niet inloggen", fill=GRAY, font=font(15))
    d.text((48, 400), "Geen echte bank · geen reclame", fill=GOLD, font=font(13))
    save(im, f"{'ios' if platform == 'iPhone' else 'android'}/d4-bank-adres.png")


def build():
    kapstok()
    vier_vragen()
    nee_zin()
    betaalkaart(
        "A",
        "U heeft zelf een boek besteld bij “Boekwinkel Voorbeeld”.",
        "Boekwinkel Voorbeeld",
        "€ 24,95",
        "shared/d4-kaart-a.png",
        "Fictief · geen echte winkel · geen echte betaling",
    )
    betaalkaart(
        "B",
        "U dacht: ticket voor een concert bij “Muziek Voorbeeld”.",
        "BetaalService XYZ",
        "€ 189,00",
        "shared/d4-kaart-b.png",
        "Fictief · geen echte betaling · alleen kijken",
    )
    betaalkaart(
        "D",
        "U wilde een cadeaubon van € 15 bij “Cadeau Voorbeeld”.",
        "GiftPay Europe",
        "€ 75,00",
        "shared/d4-kaart-d.png",
        "Nieuw · fictief · deelnemer beoordeelt zelf",
    )
    situatie_c()
    bank_app("iPhone")
    bank_app("Android")
    bank_adres("iPhone")
    bank_adres("Android")
    print("D4 assets klaar.")


if __name__ == "__main__":
    build()
