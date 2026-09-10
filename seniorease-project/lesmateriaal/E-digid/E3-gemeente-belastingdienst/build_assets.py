#!/usr/bin/env python3
"""E3 instructiebeelden — Utrecht-route · geen persoonsgegevens · geen antwoordroute taak B op beamer."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
SHOTS = ROOT / "assets" / "screenshots"
for p in [SHOTS / "ios", SHOTS / "android", SHOTS / "computer", SHOTS / "shared", ROOT / "pdf", ROOT / "beamer"]:
    p.mkdir(parents=True, exist_ok=True)

NAVY = (62, 39, 35)
GOLD = (166, 124, 82)
CREAM = (245, 240, 232)
WHITE = (255, 255, 255)
GRAY = (120, 120, 120)
RED = (180, 50, 50)
UT_RED = (200, 16, 46)  # herkenbaar gemeentelijk accent · geen logo-copy
UT_LIGHT = (255, 240, 242)
IOS_BLUE = (0, 122, 255)
ANDROID_TEAL = (18, 140, 126)
BD_BLUE = (0, 70, 127)


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


def status(d):
    d.text((44, 52), "09:41", fill=(25, 25, 25), font=font(15))
    d.text((348, 52), "82%", fill=(25, 25, 25), font=font(15))


def kapstok():
    im = Image.new("RGB", (900, 560), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([40, 40, 860, 520], radius=20, fill=WHITE, outline=GOLD, width=3)
    d.text((80, 60), "BIJ DE DIGITALE OVERHEID", fill=NAVY, font=font(18))
    d.text((80, 130), "OFFICIËLE ROUTE OPENEN", fill=GOLD, font=font(28))
    d.text((80, 200), "→ TAAK VINDEN", fill=NAVY, font=font(26))
    d.text((80, 270), "→ PERSOONLIJK DEEL HERKENNEN", fill=NAVY, font=font(26))
    d.text((80, 340), "→ NIETS AFRONDEN", fill=NAVY, font=font(26))
    d.text((80, 430), "Route vinden = succes · taak uitvoeren = niet in deze les", fill=GRAY, font=font(14))
    save(im, "shared/e3-kapstok.png")


def situatie():
    im = Image.new("RGB", (980, 480), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 450], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 70), "U wilt iets regelen bij uw gemeente.", fill=NAVY, font=font(28))
    d.text((60, 160), "Waar begint u —", fill=NAVY, font=font(28))
    d.text((60, 210), "en hoe vindt u de juiste plek?", fill=NAVY, font=font(28))
    d.text((60, 320), "Oefenvoorbeeld: Gemeente Utrecht", fill=GOLD, font=font(18))
    d.text((60, 370), "Uw eigen gemeente kan er anders uitzien. Dat is normaal.", fill=GRAY, font=font(16))
    save(im, "shared/e3-situatie.png")


def browser_phone(platform: str):
    im, d = phone_frame()
    status(d)
    label = "iPhone" if platform == "iPhone" else "Android"
    col = IOS_BLUE if platform == "iPhone" else ANDROID_TEAL
    d.text((40, 70), f"Adresbalk — {label} · voorbeeld", fill=GOLD, font=font(13))
    d.rounded_rectangle([40, 120, 400, 190], radius=14, fill=(245, 245, 248), outline=(200, 200, 210))
    d.text((55, 145), "utrecht.nl", fill=NAVY, font=font(22))
    mark(d, [34, 114, 406, 196])
    d.text((48, 230), "Typ utrecht.nl", fill=NAVY, font=font(18))
    d.text((48, 265), "in de adresbalk", fill=NAVY, font=font(18))
    d.rounded_rectangle([48, 340, 220, 400], radius=12, fill=col)
    d.text((85, 358), "Openen", fill=WHITE, font=font(18))
    d.text((48, 450), "Geen Google · geen login", fill=GOLD, font=font(13))
    save(im, f"{'ios' if platform == 'iPhone' else 'android'}/e3-adresbalk.png")


def browser_computer():
    im = Image.new("RGB", (980, 620), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 590], radius=14, fill=WHITE, outline=(80, 80, 80), width=2)
    d.rectangle([30, 30, 950, 78], fill=(230, 230, 235))
    d.ellipse([48, 46, 62, 60], fill=(220, 80, 80))
    d.ellipse([70, 46, 84, 60], fill=(220, 180, 60))
    d.ellipse([92, 46, 106, 60], fill=(80, 180, 80))
    d.rounded_rectangle([130, 42, 900, 70], radius=8, fill=WHITE, outline=(190, 190, 200))
    d.text((150, 48), "utrecht.nl", fill=NAVY, font=font(16))
    mark(d, [124, 36, 906, 76], width=3)
    d.text((60, 120), "Computer — adresbalk", fill=GOLD, font=font(18))
    d.text((60, 180), "Typ utrecht.nl in de adresbalk.", fill=NAVY, font=font(28))
    d.text((60, 250), "Daarna openen.", fill=NAVY, font=font(28))
    d.text((60, 340), "Geen Google · geen login · geen persoonlijke gegevens", fill=GRAY, font=font(16))
    d.text((60, 400), "SeniorEase-oefening · utrecht.nl gecontroleerd 2026-09-10", fill=GOLD, font=font(14))
    save(im, "computer/e3-adresbalk.png")


def utrecht_home():
    im = Image.new("RGB", (980, 640), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 610], radius=14, fill=WHITE, outline=UT_RED, width=3)
    d.rectangle([30, 30, 950, 110], fill=UT_RED)
    d.text((60, 55), "Gemeente Utrecht — voorbeeld", fill=WHITE, font=font(24))
    d.rounded_rectangle([700, 48, 920, 92], radius=8, fill=WHITE)
    d.text((720, 58), "Zoeken…", fill=GRAY, font=font(16))
    mark(d, [690, 40, 930, 100], width=3)
    d.text((60, 140), "utrecht.nl — startpagina (voorbeeld)", fill=GOLD, font=font(15))
    d.text((60, 200), "Offline loket · Online loket · Afspraak", fill=NAVY, font=font(22))
    d.rounded_rectangle([60, 280, 420, 380], radius=12, fill=UT_LIGHT, outline=UT_RED)
    d.text((90, 310), "Online loket", fill=UT_RED, font=font(22))
    d.text((90, 345), "Producten en diensten", fill=GRAY, font=font(16))
    d.text((60, 420), "Op deze website kunt u de taaknaam zoeken.", fill=NAVY, font=font(18))
    d.text((60, 470), "Oefenvoorbeeld · geen reclame voor deze gemeente", fill=GRAY, font=font(14))
    d.text((60, 520), "Uw eigen gemeente kan er anders uitzien. Dat is normaal.", fill=GRAY, font=font(14))
    save(im, "shared/e3-utrecht-home.png")


def taak_a_zoeken():
    im = Image.new("RGB", (980, 560), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 530], radius=14, fill=WHITE, outline=UT_RED, width=3)
    d.text((60, 60), "Zoek op de website", fill=GOLD, font=font(18))
    d.rounded_rectangle([60, 120, 900, 200], radius=12, fill=(245, 245, 248), outline=(200, 200, 210))
    d.text((90, 148), "Verhuizing doorgeven", fill=NAVY, font=font(24))
    mark(d, [50, 110, 910, 210], width=3)
    d.text((60, 250), "Zoek alleen de afgesproken taaknaam.", fill=NAVY, font=font(22))
    d.text((60, 310), "Nog niets invullen. Nog niets versturen.", fill=GRAY, font=font(18))
    d.text((60, 390), "Geen algemene zoekles.", fill=GOLD, font=font(16))
    save(im, "shared/e3-taak-a-zoeken.png")


def taak_a_pagina():
    im = Image.new("RGB", (980, 640), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 610], radius=14, fill=WHITE, outline=UT_RED, width=3)
    d.rectangle([30, 30, 950, 100], fill=UT_RED)
    d.text((60, 50), "Online loket — voorbeeld", fill=WHITE, font=font(22))
    d.text((60, 130), "Verhuizing doorgeven", fill=NAVY, font=font(30))
    d.text((60, 190), "Openbare productpagina (voorbeeld)", fill=GOLD, font=font(16))
    d.text((60, 250), "Hier vindt u informatie over deze taak.", fill=NAVY, font=font(20))
    d.rounded_rectangle([60, 320, 420, 420], radius=12, fill=(230, 245, 245), outline=(0, 102, 102), width=2)
    d.text((90, 350), "Met DigiD", fill=(0, 102, 102), font=font(22))
    d.text((90, 385), "Persoonlijk vervolg", fill=GRAY, font=font(16))
    mark(d, [50, 310, 430, 430], width=3)
    d.text((60, 470), "Nog geen DigiD gebruiken. Nog niets doorgeven.", fill=NAVY, font=font(18))
    d.text((60, 530), "SeniorEase-oefening · geen persoonsgegevens", fill=GRAY, font=font(14))
    save(im, "shared/e3-taak-a-pagina.png")


def persoonlijk_stop():
    im = Image.new("RGB", (980, 560), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 530], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 70), "Hier begint het persoonlijke deel.", fill=NAVY, font=font(28))
    d.text((60, 150), "Bijvoorbeeld DigiD, gegevens of een formulier.", fill=NAVY, font=font(20))
    d.rounded_rectangle([60, 230, 900, 380], radius=14, fill=(255, 248, 240), outline=GOLD, width=2)
    d.text((100, 270), "U heeft gevonden waar u moet zijn.", fill=NAVY, font=font(24))
    d.text((100, 320), "Hier stopt de oefening.", fill=GOLD, font=font(24))
    d.text((60, 430), "Route vinden = succes. Taak uitvoeren = niet in deze les.", fill=GRAY, font=font(16))
    save(im, "shared/e3-stoppunt.png")


def herhaling():
    im = Image.new("RGB", (980, 480), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 450], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 70), "Probeer het nog een keer", fill=GOLD, font=font(18))
    d.text((60, 140), "U wilt opnieuw weten waar u deze taak", fill=NAVY, font=font(24))
    d.text((60, 190), "kunt regelen.", fill=NAVY, font=font(24))
    d.text((60, 270), "Laat zien waar u zelf begint.", fill=NAVY, font=font(24))
    d.text((60, 340), "Stop wanneer de oefening klaar is.", fill=GRAY, font=font(20))
    save(im, "shared/e3-herhaling.png")


def belastingdienst():
    im = Image.new("RGB", (980, 520), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 490], radius=14, fill=WHITE, outline=BD_BLUE, width=3)
    d.rectangle([30, 30, 950, 100], fill=BD_BLUE)
    d.text((60, 50), "Belastingdienst — kort voorbeeld", fill=WHITE, font=font(22))
    d.text((60, 140), "Ook hier: eerst de officiële route.", fill=NAVY, font=font(26))
    d.text((60, 210), "Daarna: waar begint het persoonlijke deel?", fill=NAVY, font=font(22))
    d.text((60, 290), "Geen aangifte. Geen login. Geen bedragen.", fill=GRAY, font=font(18))
    d.rounded_rectangle([60, 360, 420, 440], radius=10, fill=(255, 240, 235), outline=RED)
    d.text((90, 385), "KIJKEN · STOPPEN", fill=RED, font=font(18))
    save(im, "shared/e3-belastingdienst.png")


def privacy():
    im = Image.new("RGB", (980, 480), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 450], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 60), "Privacy", fill=GOLD, font=font(18))
    d.text((60, 130), "Mijn DigiD-gegevens en codes", fill=NAVY, font=font(26))
    d.text((60, 180), "houd ik voor mezelf.", fill=NAVY, font=font(26))
    d.text((60, 270), "Mijn persoonlijke overheidsinformatie", fill=NAVY, font=font(26))
    d.text((60, 320), "blijft privé.", fill=NAVY, font=font(26))
    d.text((60, 390), "Niet hardop · niet projecteren", fill=GRAY, font=font(16))
    save(im, "shared/e3-privacy.png")


def afsluiten():
    im = Image.new("RGB", (980, 480), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 470, 450], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.rounded_rectangle([510, 30, 950, 450], radius=18, fill=WHITE, outline=BD_BLUE, width=3)
    d.text((60, 70), "Niet ingelogd", fill=GOLD, font=font(24))
    d.text((60, 160), "→ Tabblad of app", fill=NAVY, font=font(22))
    d.text((60, 210), "sluiten", fill=NAVY, font=font(22))
    d.text((60, 300), "Standaard in deze les.", fill=GRAY, font=font(16))
    d.text((540, 70), "Wel ingelogd", fill=BD_BLUE, font=font(24))
    d.text((540, 160), "→ Eerst uitloggen", fill=NAVY, font=font(22))
    d.text((540, 220), "→ Daarna eventueel", fill=NAVY, font=font(20))
    d.text((540, 270), "tabblad/app sluiten", fill=NAVY, font=font(20))
    save(im, "shared/e3-afsluiten.png")


def main():
    kapstok()
    situatie()
    browser_phone("iPhone")
    browser_phone("Android")
    browser_computer()
    utrecht_home()
    taak_a_zoeken()
    taak_a_pagina()
    persoonlijk_stop()
    herhaling()
    belastingdienst()
    privacy()
    afsluiten()
    print("E3 assets klaar")


if __name__ == "__main__":
    main()
