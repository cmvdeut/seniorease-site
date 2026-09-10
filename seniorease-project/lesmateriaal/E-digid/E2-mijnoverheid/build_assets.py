#!/usr/bin/env python3
"""E2 instructiebeelden — MijnOverheid-route + neutrale demolaag (geen echt account)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
SHOTS = ROOT / "assets" / "screenshots"
for p in [
    SHOTS / "ios",
    SHOTS / "android",
    SHOTS / "computer",
    SHOTS / "shared",
    ROOT / "pdf",
    ROOT / "beamer",
]:
    p.mkdir(parents=True, exist_ok=True)

NAVY = (62, 39, 35)
GOLD = (166, 124, 82)
CREAM = (245, 240, 232)
WHITE = (255, 255, 255)
GRAY = (120, 120, 120)
RED = (180, 50, 50)
MO_BLUE = (0, 70, 127)  # herkenbaar overheidsblauw · geen echt logo-copy
MO_LIGHT = (230, 240, 248)
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


def status(d):
    d.text((44, 52), "09:41", fill=(25, 25, 25), font=font(15))
    d.text((348, 52), "82%", fill=(25, 25, 25), font=font(15))


def kapstok():
    im = Image.new("RGB", (900, 560), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([40, 40, 860, 520], radius=20, fill=WHITE, outline=GOLD, width=3)
    d.text((80, 60), "BIJ MIJNOVERHEID", fill=NAVY, font=font(18))
    d.text((80, 120), "ZELF OPENEN", fill=GOLD, font=font(30))
    d.text((80, 185), "→ INLOGGEN HERKENNEN", fill=NAVY, font=font(26))
    d.text((80, 250), "→ BERICHTENBOX VINDEN", fill=NAVY, font=font(26))
    d.text((80, 315), "→ TERUG", fill=NAVY, font=font(26))
    d.text((80, 380), "→ AFSLUITEN", fill=NAVY, font=font(26))
    d.text((80, 460), "SeniorEase-oefening · geen echte login nodig", fill=GRAY, font=font(14))
    save(im, "shared/e2-kapstok.png")


def digid_vs_mo():
    im = Image.new("RGB", (980, 560), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 470, 530], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.rounded_rectangle([510, 30, 950, 530], radius=18, fill=WHITE, outline=MO_BLUE, width=3)
    d.text((60, 55), "DigiD", fill=GOLD, font=font(28))
    d.text((60, 130), "Waarmee u zich digitaal", fill=NAVY, font=font(22))
    d.text((60, 170), "kunt identificeren /", fill=NAVY, font=font(22))
    d.text((60, 210), "inloggen.", fill=NAVY, font=font(22))
    d.text((60, 300), "Uw manier om in te loggen.", fill=GRAY, font=font(16))

    d.text((540, 55), "MijnOverheid", fill=MO_BLUE, font=font(28))
    d.text((540, 130), "Persoonlijke digitale", fill=NAVY, font=font(22))
    d.text((540, 170), "omgeving voor zaken", fill=NAVY, font=font(22))
    d.text((540, 210), "met de overheid.", fill=NAVY, font=font(22))
    d.text((540, 300), "Berichtenbox = onderdeel", fill=MO_BLUE, font=font(18))
    d.text((540, 340), "van MijnOverheid.", fill=MO_BLUE, font=font(18))
    d.text((540, 420), "Niet hetzelfde als DigiD.", fill=GRAY, font=font(16))
    save(im, "shared/e2-digid-vs-mo.png")


def browser_phone(platform: str):
    im, d = phone_frame()
    status(d)
    label = "iPhone" if platform == "iPhone" else "Android"
    col = IOS_BLUE if platform == "iPhone" else ANDROID_TEAL
    d.text((40, 70), f"Adresbalk — {label} · voorbeeld", fill=GOLD, font=font(13))
    d.rounded_rectangle([40, 120, 400, 190], radius=14, fill=(245, 245, 248), outline=(200, 200, 210))
    d.text((55, 145), "mijnoverheid.nl", fill=NAVY, font=font(20))
    mark(d, [34, 114, 406, 196])
    d.text((48, 230), "Typ mijnoverheid.nl", fill=NAVY, font=font(18))
    d.text((48, 265), "in de adresbalk", fill=NAVY, font=font(18))
    d.text((48, 310), "Daarna openen", fill=GRAY, font=font(15))
    d.rounded_rectangle([48, 360, 220, 420], radius=12, fill=col)
    d.text((85, 378), "Openen", fill=WHITE, font=font(18))
    d.text((48, 470), "Geen login · geen persoonlijke gegevens", fill=GOLD, font=font(13))
    save(im, f"{'ios' if platform == 'iPhone' else 'android'}/e2-adresbalk.png")


def browser_computer():
    im = Image.new("RGB", (980, 620), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 590], radius=14, fill=WHITE, outline=(80, 80, 80), width=2)
    d.rectangle([30, 30, 950, 78], fill=(230, 230, 235))
    d.ellipse([48, 46, 62, 60], fill=(220, 80, 80))
    d.ellipse([70, 46, 84, 60], fill=(220, 180, 60))
    d.ellipse([92, 46, 106, 60], fill=(80, 180, 80))
    d.rounded_rectangle([130, 42, 900, 70], radius=8, fill=WHITE, outline=(190, 190, 200))
    d.text((150, 48), "mijnoverheid.nl", fill=NAVY, font=font(16))
    mark(d, [124, 36, 906, 76], width=3)
    d.text((60, 120), "Computer — adresbalk", fill=GOLD, font=font(18))
    d.text((60, 180), "Typ mijnoverheid.nl in de adresbalk.", fill=NAVY, font=font(26))
    d.text((60, 250), "Daarna openen.", fill=NAVY, font=font(26))
    d.text((60, 340), "Geen login · geen persoonlijke gegevens", fill=GRAY, font=font(16))
    d.text((60, 400), "SeniorEase-oefening · mijnoverheid.nl gecontroleerd", fill=GOLD, font=font(14))
    save(im, "computer/e2-adresbalk.png")


def mo_home():
    """Startpagina — gebaseerd op actuele publieke interface (Inloggen met DigiD)."""
    im = Image.new("RGB", (980, 640), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 610], radius=14, fill=WHITE, outline=MO_BLUE, width=3)
    d.rectangle([30, 30, 950, 110], fill=MO_BLUE)
    d.text((60, 55), "MijnOverheid", fill=WHITE, font=font(28))
    d.rounded_rectangle([680, 48, 920, 92], radius=8, fill=WHITE)
    d.text((700, 58), "Inloggen met DigiD", fill=MO_BLUE, font=font(16))
    mark(d, [670, 40, 930, 100], width=3)
    d.text((60, 140), "mijnoverheid.nl — startpagina (voorbeeld)", fill=GOLD, font=font(15))
    d.text((60, 190), "Post van de overheid digitaal ontvangen", fill=NAVY, font=font(26))
    d.text((60, 250), "Uw persoonlijke gegevens op één plek", fill=NAVY, font=font(20))
    d.rounded_rectangle([60, 310, 420, 420], radius=12, fill=MO_LIGHT, outline=MO_BLUE)
    d.text((85, 335), "Berichtenbox", fill=MO_BLUE, font=font(22))
    d.text((85, 375), "Digitale brievenbus", fill=GRAY, font=font(16))
    d.rounded_rectangle([450, 310, 810, 420], radius=12, fill=(245, 245, 248), outline=(180, 180, 190))
    d.text((475, 335), "Uw gegevens", fill=NAVY, font=font(22))
    d.text((475, 375), "Persoonlijke info", fill=GRAY, font=font(16))
    d.rounded_rectangle([60, 460, 380, 520], radius=10, fill=(255, 240, 235), outline=RED)
    d.text((90, 480), "KIJKEN · HERKENNEN", fill=RED, font=font(18))
    d.text((60, 555), "Oefening SeniorEase — geen echte login · geen persoonsgegevens", fill=GRAY, font=font(14))
    save(im, "shared/e2-mo-home.png")


def digid_toegang():
    im = Image.new("RGB", (980, 520), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 490], radius=14, fill=WHITE, outline=MO_BLUE, width=3)
    d.text((60, 60), "Persoonlijke toegang", fill=GOLD, font=font(18))
    d.text((60, 120), "MijnOverheid gebruikt DigiD", fill=NAVY, font=font(28))
    d.text((60, 170), "voor persoonlijke toegang.", fill=NAVY, font=font(28))
    d.text((60, 250), "Zoek: Inloggen met DigiD", fill=MO_BLUE, font=font(22))
    d.rounded_rectangle([60, 320, 420, 390], radius=10, fill=(255, 240, 235), outline=RED)
    d.text((90, 342), "KIJKEN · HERKENNEN", fill=RED, font=font(20))
    d.text((60, 420), "Niet: nu inloggen. Vul niets in.", fill=GRAY, font=font(16))
    save(im, "shared/e2-digid-toegang.png")


def demo_overzicht():
    """Neutraal MijnOverheid-overzicht — oefenbeeld, geen echte gegevens."""
    im = Image.new("RGB", (980, 640), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 610], radius=14, fill=WHITE, outline=MO_BLUE, width=3)
    d.rectangle([30, 30, 950, 100], fill=MO_BLUE)
    d.text((60, 50), "MijnOverheid — oefenbeeld", fill=WHITE, font=font(24))
    d.text((700, 55), "Oefening", fill=WHITE, font=font(16))
    # sidebar-achtige items
    d.rounded_rectangle([50, 130, 300, 560], radius=10, fill=MO_LIGHT)
    items = ["Overzicht", "Berichtenbox", "Uw gegevens", "Instellingen"]
    for i, label in enumerate(items):
        y = 160 + i * 70
        fill = MO_BLUE if label == "Overzicht" else WHITE
        text_c = WHITE if label == "Overzicht" else NAVY
        d.rounded_rectangle([70, y, 280, y + 50], radius=8, fill=fill)
        d.text((90, y + 12), label, fill=text_c, font=font(18))
    d.text((340, 140), "Welkom bij MijnOverheid", fill=NAVY, font=font(26))
    d.text((340, 200), "Dit is een SeniorEase-oefenbeeld.", fill=GOLD, font=font(18))
    d.text((340, 250), "Geen echte naam · geen BSN", fill=GRAY, font=font(16))
    d.text((340, 290), "geen echte berichten.", fill=GRAY, font=font(16))
    d.rounded_rectangle([340, 360, 900, 480], radius=12, fill=(248, 248, 250), outline=(200, 200, 210))
    d.text((370, 390), "Hier vindt u later uw persoonlijke omgeving.", fill=NAVY, font=font(18))
    d.text((370, 430), "Nu oefenen we met de Berichtenbox.", fill=NAVY, font=font(18))
    d.text((50, 575), "Neutrale demolaag · geen echt account", fill=GRAY, font=font(13))
    save(im, "shared/e2-demo-overzicht.png")


def demo_berichtenbox_locatie():
    im = Image.new("RGB", (980, 640), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 610], radius=14, fill=WHITE, outline=MO_BLUE, width=3)
    d.rectangle([30, 30, 950, 100], fill=MO_BLUE)
    d.text((60, 50), "MijnOverheid — oefenbeeld", fill=WHITE, font=font(24))
    d.rounded_rectangle([50, 130, 300, 560], radius=10, fill=MO_LIGHT)
    items = ["Overzicht", "Berichtenbox", "Uw gegevens", "Instellingen"]
    for i, label in enumerate(items):
        y = 160 + i * 70
        fill = MO_BLUE if label == "Berichtenbox" else WHITE
        text_c = WHITE if label == "Berichtenbox" else NAVY
        d.rounded_rectangle([70, y, 280, y + 50], radius=8, fill=fill)
        d.text((90, y + 12), label, fill=text_c, font=font(18))
        if label == "Berichtenbox":
            mark(d, [60, y - 8, 290, y + 58], width=4)
    d.text((340, 160), "Waar vindt u de Berichtenbox?", fill=NAVY, font=font(26))
    d.text((340, 240), "Wijs aan op dit oefenbeeld.", fill=GOLD, font=font(20))
    d.text((340, 300), "Nog geen bericht openen.", fill=GRAY, font=font(18))
    d.text((340, 360), "(Dat komt later — E4.)", fill=GRAY, font=font(16))
    d.text((50, 575), "Neutrale demolaag · geen echte berichten", fill=GRAY, font=font(13))
    save(im, "shared/e2-demo-berichtenbox-locatie.png")


def demo_berichtenbox_overzicht():
    im = Image.new("RGB", (980, 640), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 610], radius=14, fill=WHITE, outline=MO_BLUE, width=3)
    d.rectangle([30, 30, 950, 100], fill=MO_BLUE)
    d.text((60, 50), "Berichtenbox — oefenbeeld", fill=WHITE, font=font(24))
    # terug hint area (not the answer alone - will be separate slide for practice)
    d.rounded_rectangle([60, 130, 200, 175], radius=8, fill=MO_LIGHT, outline=MO_BLUE)
    d.text((80, 142), "← Terug", fill=MO_BLUE, font=font(18))
    d.text((60, 200), "Overzicht (fictief · oefening)", fill=GOLD, font=font(16))
    # fictional rows - no real content to read
    rows = [
        ("Voorbeeldorganisatie A", "Voorbeeldbericht · niet openen"),
        ("Voorbeeldorganisatie B", "Voorbeeldbericht · niet openen"),
        ("Voorbeeldorganisatie C", "Voorbeeldbericht · niet openen"),
    ]
    for i, (org, note) in enumerate(rows):
        y = 250 + i * 90
        d.rounded_rectangle([60, y, 900, y + 70], radius=10, fill=(248, 248, 250), outline=(200, 200, 210))
        d.text((90, y + 12), org, fill=NAVY, font=font(20))
        d.text((90, y + 42), note, fill=GRAY, font=font(14))
    d.text((60, 555), "Geen echte berichten · geen inhoud lezen · geen bijlage", fill=GRAY, font=font(14))
    save(im, "shared/e2-demo-berichtenbox-overzicht.png")


def demo_terug():
    im = Image.new("RGB", (980, 640), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 610], radius=14, fill=WHITE, outline=MO_BLUE, width=3)
    d.rectangle([30, 30, 950, 100], fill=MO_BLUE)
    d.text((60, 50), "Berichtenbox — oefenbeeld", fill=WHITE, font=font(24))
    d.rounded_rectangle([60, 140, 240, 210], radius=10, fill=MO_LIGHT, outline=MO_BLUE, width=2)
    d.text((90, 162), "← Terug", fill=MO_BLUE, font=font(22))
    mark(d, [50, 130, 250, 220], width=4)
    d.text((300, 160), "Waar gaat u nu terug?", fill=NAVY, font=font(28))
    d.text((300, 230), "Kies zelf op dit oefenbeeld.", fill=GOLD, font=font(20))
    d.text((300, 300), "Doel: terug naar het", fill=NAVY, font=font(20))
    d.text((300, 340), "MijnOverheid-overzicht.", fill=NAVY, font=font(20))
    d.rounded_rectangle([60, 420, 900, 520], radius=12, fill=(255, 248, 240), outline=GOLD)
    d.text((90, 450), "U oefent zelf — de begeleider wijst niet alles voor.", fill=NAVY, font=font(18))
    d.text((90, 485), "Nog geen bericht openen.", fill=GRAY, font=font(16))
    save(im, "shared/e2-demo-terug.png")


def demo_terug_bij_overzicht():
    im = Image.new("RGB", (980, 640), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 610], radius=14, fill=WHITE, outline=MO_BLUE, width=3)
    d.rectangle([30, 30, 950, 100], fill=MO_BLUE)
    d.text((60, 50), "MijnOverheid — oefenbeeld", fill=WHITE, font=font(24))
    d.rounded_rectangle([50, 130, 300, 560], radius=10, fill=MO_LIGHT)
    items = ["Overzicht", "Berichtenbox", "Uw gegevens", "Instellingen"]
    for i, label in enumerate(items):
        y = 160 + i * 70
        fill = MO_BLUE if label == "Overzicht" else WHITE
        text_c = WHITE if label == "Overzicht" else NAVY
        d.rounded_rectangle([70, y, 280, y + 50], radius=8, fill=fill)
        d.text((90, y + 12), label, fill=text_c, font=font(18))
    d.text((340, 180), "U bent terug bij het overzicht.", fill=NAVY, font=font(26))
    d.text((340, 260), "Route geoefend:", fill=GOLD, font=font(18))
    d.text((340, 320), "Overzicht → Berichtenbox", fill=NAVY, font=font(20))
    d.text((340, 365), "→ overzicht → Terug", fill=NAVY, font=font(20))
    d.text((340, 410), "→ Overzicht", fill=NAVY, font=font(20))
    d.text((340, 490), "Geen bericht geopend.", fill=GRAY, font=font(16))
    save(im, "shared/e2-demo-terug-bij-overzicht.png")


def afsluiten():
    im = Image.new("RGB", (980, 520), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 470, 490], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.rounded_rectangle([510, 30, 950, 490], radius=18, fill=WHITE, outline=MO_BLUE, width=3)
    d.text((60, 60), "Niet ingelogd", fill=GOLD, font=font(24))
    d.text((60, 140), "→ Tabblad of app", fill=NAVY, font=font(24))
    d.text((60, 190), "sluiten", fill=NAVY, font=font(24))
    d.text((60, 280), "Standaard in deze les.", fill=GRAY, font=font(16))
    d.text((540, 60), "Wel ingelogd", fill=MO_BLUE, font=font(24))
    d.text((540, 140), "→ Eerst uitloggen", fill=NAVY, font=font(24))
    d.text((540, 190), "→ Daarna eventueel", fill=NAVY, font=font(22))
    d.text((540, 240), "tabblad/app sluiten", fill=NAVY, font=font(22))
    d.text((540, 320), "Alleen als u echt", fill=GRAY, font=font(16))
    d.text((540, 360), "bent ingelogd.", fill=GRAY, font=font(16))
    save(im, "shared/e2-afsluiten.png")


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
    save(im, "shared/e2-privacy.png")


def main():
    kapstok()
    digid_vs_mo()
    browser_phone("iPhone")
    browser_phone("Android")
    browser_computer()
    mo_home()
    digid_toegang()
    demo_overzicht()
    demo_berichtenbox_locatie()
    demo_berichtenbox_overzicht()
    demo_terug()
    demo_terug_bij_overzicht()
    afsluiten()
    privacy()
    print("E2 assets klaar")


if __name__ == "__main__":
    main()
