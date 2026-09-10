#!/usr/bin/env python3
"""E4 instructiebeelden — openbare MijnOverheid + SeniorEase-oefenomgeving (geen echt account)."""
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
MO_BLUE = (0, 70, 127)
MO_LIGHT = (230, 240, 248)
IOS_BLUE = (0, 122, 255)
ANDROID_TEAL = (18, 140, 126)
DEMO_BANNER = (90, 110, 90)  # rustig groen · oefenlabel


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


def oefen_banner(d, x0, y0, x1, y1):
    """Permanent herkenbaar oefenlabel — geen alarmtoon."""
    d.rectangle([x0, y0, x1, y1], fill=DEMO_BANNER)
    d.text((x0 + 16, y0 + 8), "SENIOREASE — OEFENOMGEVING", fill=WHITE, font=font(14))


def phone_frame(w=440, h=860, fill=WHITE):
    im = Image.new("RGB", (w, h), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([18, 18, w - 18, h - 18], radius=40, fill=fill, outline=(35, 35, 35), width=3)
    d.rounded_rectangle([160, 28, 280, 48], radius=10, fill=(30, 30, 30))
    return im, d


def status(d):
    d.text((44, 52), "09:41", fill=(25, 25, 25), font=font(15))
    d.text((348, 52), "82%", fill=(25, 25, 25), font=font(15))


# --- Shared cards ---

def kapstok():
    im = Image.new("RGB", (900, 640), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([40, 40, 860, 600], radius=20, fill=WHITE, outline=GOLD, width=3)
    d.text((80, 60), "BIJ OVERHEIDSBERICHTEN", fill=NAVY, font=font(16))
    steps = [
        "MELDING",
        "→ ZELF MIJNOVERHEID OPENEN",
        "→ BERICHTENBOX",
        "→ BERICHT VINDEN",
        "→ LEZEN",
        "→ BIJLAGE HERKENNEN",
        "→ TERUG",
        "→ VEILIG AFSLUITEN",
    ]
    for i, s in enumerate(steps):
        col = GOLD if i == 0 else NAVY
        d.text((80, 110 + i * 48), s, fill=col, font=font(22 if i == 0 else 20))
    d.text((80, 540), "SeniorEase-oefening · geen echte login nodig", fill=GRAY, font=font(14))
    save(im, "shared/e4-kapstok.png")


def melding_kaart():
    im = Image.new("RGB", (980, 520), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([60, 60, 920, 460], radius=16, fill=WHITE, outline=(200, 200, 210), width=2)
    d.text((100, 90), "Melding (voorbeeld · oefening)", fill=GOLD, font=font(16))
    d.text((100, 150), "Er staat een nieuw bericht voor u", fill=NAVY, font=font(28))
    d.text((100, 200), "klaar in MijnOverheid.", fill=NAVY, font=font(28))
    d.text((100, 280), "Geen werkende link nodig in de les.", fill=GRAY, font=font(18))
    d.text((100, 340), "Wat doet u nu?", fill=GOLD, font=font(22))
    d.text((100, 400), "Geen echte naam · geen echte e-mail", fill=GRAY, font=font(14))
    save(im, "shared/e4-melding.png")


def melding_niet_bericht():
    im = Image.new("RGB", (980, 520), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 490], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 60), "Kernregel", fill=GOLD, font=font(18))
    d.text((60, 130), "MELDING ≠ BERICHT", fill=NAVY, font=font(36))
    d.text((60, 210), "Een e-mail of melding kan u vertellen", fill=NAVY, font=font(22))
    d.text((60, 255), "dat er iets klaarstaat.", fill=NAVY, font=font(22))
    d.text((60, 320), "Het echte bericht leest u in MijnOverheid.", fill=NAVY, font=font(22))
    d.rounded_rectangle([60, 390, 700, 455], radius=10, fill=MO_LIGHT, outline=MO_BLUE)
    d.text((90, 410), "Ik open MijnOverheid zelf.", fill=MO_BLUE, font=font(22))
    save(im, "shared/e4-melding-niet-bericht.png")


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
    d.rounded_rectangle([48, 360, 220, 420], radius=12, fill=col)
    d.text((85, 378), "Openen", fill=WHITE, font=font(18))
    d.text((48, 470), "Geen login · geen persoonlijke gegevens", fill=GOLD, font=font(13))
    save(im, f"{'ios' if platform == 'iPhone' else 'android'}/e4-adresbalk.png")


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
    d.text((60, 400), "Geverifieerd: mijnoverheid.nl · Inloggen met DigiD", fill=GOLD, font=font(14))
    save(im, "computer/e4-adresbalk.png")


def mo_home():
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
    d.text((60, 555), "Openbare interface · geen echte login · geverifieerd 2026-09-11", fill=GRAY, font=font(14))
    save(im, "shared/e4-mo-home.png")


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
    save(im, "shared/e4-digid-toegang.png")


def brug_demolaag():
    im = Image.new("RGB", (980, 480), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 450], radius=18, fill=WHITE, outline=DEMO_BANNER, width=3)
    oefen_banner(d, 30, 30, 950, 70)
    d.text((60, 110), "Verder oefenen we in de", fill=NAVY, font=font(26))
    d.text((60, 160), "SeniorEase-oefenomgeving.", fill=NAVY, font=font(26))
    d.text((60, 240), "Geen echte account.", fill=GOLD, font=font(22))
    d.text((60, 290), "Geen echte berichten.", fill=GOLD, font=font(22))
    d.text((60, 360), "Wel dezelfde route: Berichtenbox → bericht → terug.", fill=GRAY, font=font(18))
    save(im, "shared/e4-brug-demolaag.png")


# --- Demolaag A–G ---

MSG_ROWS_A = [
    ("Gemeente Oefenstad", "Informatie: openingstijden bibliotheek", "3 sep 2026"),
    ("Gemeente Oefenstad", "Informatie over afvalkalender", "28 aug 2026"),
    ("Waterschap Oefenwater", "Informatie: onderhoud fietspad", "8 sep 2026"),
    ("Rijksoverheid Oefen", "Bevestiging: informatieaanvraag ontvangen", "20 aug 2026"),
]

MSG_ROWS_B = [
    ("Waterschap Oefenwater", "Informatie: onderhoud fietspad", "8 sep 2026"),
    ("Gemeente Oefenstad", "Informatie: openingstijden bibliotheek", "3 sep 2026"),
    ("Gemeente Oefenstad", "Informatie over afvalkalender", "28 aug 2026"),
    ("Rijksoverheid Oefen", "Bevestiging: informatieaanvraag ontvangen", "20 aug 2026"),
]


def demo_shell(title_bar: str):
    im = Image.new("RGB", (980, 700), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 670], radius=14, fill=WHITE, outline=MO_BLUE, width=3)
    oefen_banner(d, 30, 30, 950, 68)
    d.rectangle([30, 68, 950, 128], fill=MO_BLUE)
    d.text((60, 85), title_bar, fill=WHITE, font=font(22))
    return im, d


def sidebar(d, active: str):
    d.rounded_rectangle([50, 150, 280, 620], radius=10, fill=MO_LIGHT)
    for i, label in enumerate(["Overzicht", "Berichtenbox", "Uw gegevens", "Instellingen"]):
        y = 180 + i * 70
        fill = MO_BLUE if label == active else WHITE
        text_c = WHITE if label == active else NAVY
        d.rounded_rectangle([65, y, 265, y + 50], radius=8, fill=fill)
        d.text((85, y + 12), label, fill=text_c, font=font(16))


def demo_overzicht():
    """A — MijnOverheid-oefenoverzicht"""
    im, d = demo_shell("MijnOverheid — oefenoverzicht")
    sidebar(d, "Overzicht")
    d.text((320, 160), "Welkom in de oefenomgeving", fill=NAVY, font=font(24))
    d.text((320, 220), "Geen echte naam · geen BSN", fill=GRAY, font=font(16))
    d.text((320, 255), "geen echte berichten.", fill=GRAY, font=font(16))
    d.rounded_rectangle([320, 320, 900, 450], radius=12, fill=(248, 248, 250), outline=(200, 200, 210))
    d.text((350, 350), "Hier oefent u de Berichtenbox.", fill=NAVY, font=font(20))
    d.text((350, 395), "Kies links: Berichtenbox.", fill=GOLD, font=font(18))
    d.text((50, 640), "Fictief · SeniorEase", fill=GRAY, font=font(13))
    save(im, "shared/e4-demo-overzicht.png")


def demo_berichtenbox(rows, highlight_idx, fname, hint: str):
    im, d = demo_shell("Berichtenbox — oefenoverzicht")
    d.rounded_rectangle([50, 150, 200, 195], radius=8, fill=MO_LIGHT, outline=MO_BLUE)
    d.text((70, 162), "← Terug", fill=MO_BLUE, font=font(16))
    d.text((50, 215), hint, fill=GOLD, font=font(15))
    for i, (org, subj, date) in enumerate(rows):
        y = 250 + i * 85
        bg = (255, 248, 235) if i == highlight_idx else (248, 248, 250)
        outline = GOLD if i == highlight_idx else (200, 200, 210)
        d.rounded_rectangle([50, y, 920, y + 72], radius=10, fill=bg, outline=outline, width=2 if i == highlight_idx else 1)
        d.text((70, y + 10), org, fill=NAVY, font=font(18))
        d.text((70, y + 40), subj, fill=GRAY, font=font(14))
        d.text((780, y + 22), date, fill=GRAY, font=font(13))
        if i == highlight_idx:
            mark(d, [44, y - 4, 926, y + 76], width=3)
    d.text((50, 640), "Fictieve berichten · geen echte persoonsgegevens", fill=GRAY, font=font(13))
    save(im, fname)


def demo_bericht_a():
    """C + D — geopend bericht A met bijlage"""
    im, d = demo_shell("Bericht — oefening")
    d.rounded_rectangle([50, 150, 200, 195], radius=8, fill=MO_LIGHT, outline=MO_BLUE)
    d.text((70, 162), "← Terug", fill=MO_BLUE, font=font(16))
    d.text((50, 220), "Van: Gemeente Oefenstad", fill=NAVY, font=font(20))
    d.text((50, 260), "Onderwerp: Informatie: openingstijden bibliotheek", fill=NAVY, font=font(18))
    d.text((50, 295), "Datum: 3 september 2026", fill=GRAY, font=font(16))
    d.line([50, 330, 920, 330], fill=(220, 220, 225), width=1)
    d.text((50, 355), "De bibliotheek past de openingstijden aan.", fill=NAVY, font=font(18))
    d.text((50, 390), "U hoeft niets te doen.", fill=NAVY, font=font(18))
    d.text((50, 425), "Meer informatie staat in de bijlage.", fill=NAVY, font=font(18))
    # Bijlage herkenbaar
    d.rounded_rectangle([50, 490, 620, 580], radius=12, fill=MO_LIGHT, outline=MO_BLUE, width=2)
    d.text((70, 505), "Bijlage", fill=GOLD, font=font(14))
    d.text((70, 535), "Openingstijden-bibliotheek.pdf", fill=MO_BLUE, font=font(18))
    mark(d, [44, 484, 626, 586], width=3)
    d.text((50, 610), "Alleen herkennen · niet downloaden in de les", fill=GRAY, font=font(14))
    save(im, "shared/e4-demo-bericht-a.png")


def demo_terug():
    """E — terug naar Berichtenbox"""
    im, d = demo_shell("Berichtenbox — oefenoverzicht")
    d.rounded_rectangle([50, 150, 240, 210], radius=10, fill=MO_LIGHT, outline=MO_BLUE, width=2)
    d.text((80, 170), "← Terug", fill=MO_BLUE, font=font(20))
    mark(d, [44, 140, 250, 220], width=4)
    d.text((300, 170), "Waar gaat u nu terug?", fill=NAVY, font=font(26))
    d.text((300, 240), "Kies zelf in de oefenomgeving.", fill=GOLD, font=font(18))
    d.text((50, 300), "U komt terug bij het Berichtenbox-overzicht.", fill=NAVY, font=font(18))
    for i, (org, subj, date) in enumerate(MSG_ROWS_A[:3]):
        y = 360 + i * 70
        d.rounded_rectangle([50, y, 920, y + 58], radius=8, fill=(248, 248, 250), outline=(200, 200, 210))
        d.text((70, y + 8), org, fill=NAVY, font=font(16))
        d.text((70, y + 32), subj, fill=GRAY, font=font(13))
    d.text((50, 640), "Zelf oefenen · geen antwoord voorzeggen", fill=GRAY, font=font(13))
    save(im, "shared/e4-demo-terug.png")


def demo_bericht_b():
    """G — eindmissiebericht B"""
    im, d = demo_shell("Bericht — oefening (eindmissie)")
    d.rounded_rectangle([50, 150, 200, 195], radius=8, fill=MO_LIGHT, outline=MO_BLUE)
    d.text((70, 162), "← Terug", fill=MO_BLUE, font=font(16))
    d.text((50, 220), "Van: Waterschap Oefenwater", fill=NAVY, font=font(20))
    d.text((50, 260), "Onderwerp: Informatie: onderhoud fietspad", fill=NAVY, font=font(18))
    d.text((50, 295), "Datum: 8 september 2026", fill=GRAY, font=font(16))
    d.line([50, 330, 920, 330], fill=(220, 220, 225), width=1)
    d.text((50, 355), "In oktober wordt het fietspad langs de dijk", fill=NAVY, font=font(18))
    d.text((50, 390), "onderhouden.", fill=NAVY, font=font(18))
    d.text((50, 430), "U hoeft niets te doen.", fill=NAVY, font=font(18))
    d.text((50, 465), "Details staan in de bijlage.", fill=NAVY, font=font(18))
    d.rounded_rectangle([50, 520, 680, 600], radius=12, fill=MO_LIGHT, outline=MO_BLUE, width=2)
    d.text((70, 535), "Bijlage", fill=GOLD, font=font(14))
    d.text((70, 565), "Informatie-onderhoud-fietspad.pdf", fill=MO_BLUE, font=font(18))
    d.text((50, 630), "Alleen herkennen · geen downloadles", fill=GRAY, font=font(14))
    save(im, "shared/e4-demo-bericht-b.png")


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
    save(im, "shared/e4-afsluiten.png")


def privacy():
    im = Image.new("RGB", (980, 520), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 490], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 55), "Privacy", fill=GOLD, font=font(18))
    d.text((60, 110), "Mijn DigiD-gegevens en codes", fill=NAVY, font=font(24))
    d.text((60, 155), "houd ik voor mezelf.", fill=NAVY, font=font(24))
    d.text((60, 230), "Mijn persoonlijke overheidsinformatie", fill=NAVY, font=font(24))
    d.text((60, 275), "blijft privé.", fill=NAVY, font=font(24))
    d.text((60, 350), "Een persoonlijk bericht hoeft u in de les", fill=NAVY, font=font(20))
    d.text((60, 395), "aan niemand te laten zien.", fill=NAVY, font=font(20))
    d.text((60, 450), "Niet hardop · niet projecteren · niet nazeggen", fill=GRAY, font=font(14))
    save(im, "shared/e4-privacy.png")


def main():
    kapstok()
    melding_kaart()
    melding_niet_bericht()
    browser_phone("iPhone")
    browser_phone("Android")
    browser_computer()
    mo_home()
    digid_toegang()
    brug_demolaag()
    demo_overzicht()
    demo_berichtenbox(
        MSG_ROWS_A,
        0,
        "shared/e4-demo-berichtenbox-a.png",
        "Zoek het oefenbericht over openingstijden bibliotheek",
    )
    demo_bericht_a()
    demo_terug()
    demo_berichtenbox(
        MSG_ROWS_B,
        0,
        "shared/e4-demo-berichtenbox-b.png",
        "Eindmissie: zoek het nieuwe oefenbericht zelf",
    )
    demo_bericht_b()
    afsluiten()
    privacy()
    print("E4 assets klaar")


if __name__ == "__main__":
    main()
