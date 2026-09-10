#!/usr/bin/env python3
"""D1 instructiebeelden — fictieve kijkvoorbeelden A/B/C + veilige oefenschermen.

Regels: geen echte nummers · geen klikbare verdachte links · geen frauduleuze sms.
Maximaal één rode markering per leermoment. iPhone | Android gelijkwaardig.
"""
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
RED = (200, 40, 40)
IOS_BLUE = (0, 122, 255)
ANDROID_TEAL = (18, 140, 126)
SMS_GREEN = (52, 199, 89)
DIGID_BLUE = (15, 70, 140)
POSTNL_ORANGE = (237, 110, 0)


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


def phone_frame(w=440, h=860, fill=WHITE):
    im = Image.new("RGB", (w, h), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([18, 18, w - 18, h - 18], radius=40, fill=fill, outline=(35, 35, 35), width=3)
    d.rounded_rectangle([160, 28, 280, 48], radius=10, fill=(30, 30, 30))
    return im, d


def status(d, x0=34, y0=52, x1=406, dark=False):
    col = (240, 240, 240) if dark else (25, 25, 25)
    d.text((x0 + 10, y0), "09:41", fill=col, font=font(15))
    d.text((x1 - 58, y0), "82%", fill=col, font=font(15))


def mark(d, box, width=3):
    d.rounded_rectangle(box, radius=10, outline=RED, width=width)


def oefen_banner(d, y=70):
    d.text((40, y), "Oefening SeniorEase — geen echt bericht", fill=GOLD, font=font(13))


def message_card(title: str, lines: list[str], footer: str, out: str, mark_link=True):
    im, d = phone_frame(h=860)
    status(d)
    oefen_banner(d)
    # Berichten-header (neutraal, geen WhatsApp)
    d.rectangle([30, 100, 410, 168], fill=(240, 240, 245))
    d.text((44, 118), "‹", fill=IOS_BLUE, font=font(26))
    d.text((118, 122), title, fill=NAVY, font=font(16))
    d.text((118, 144), "Kijkvoorbeeld · niet op uw telefoon", fill=GRAY, font=font(12))
    d.rectangle([30, 168, 410, 780], fill=(248, 248, 250))

    y = 200
    bh = 28 + 24 * len(lines)
    d.rounded_rectangle([48, y, 392, y + bh], radius=16, fill=WHITE, outline=(210, 210, 210))
    yy = y + 14
    for line in lines:
        d.text((64, yy), line, fill=NAVY, font=font(15))
        yy += 24
    if mark_link:
        # Markeer alleen de “Tik hier / Open de link”-regel als leerpunt
        mark(d, [52, y + bh - 36, 388, y + bh - 4])
    d.text((48, y + bh + 24), footer, fill=GOLD, font=font(13))
    d.text((48, y + bh + 48), "Geen echte link · geen echt telefoonnummer", fill=GRAY, font=font(12))
    save(im, out)


def kapstok():
    im = Image.new("RGB", (900, 560), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([40, 40, 860, 520], radius=20, fill=WHITE, outline=GOLD, width=3)
    d.text((80, 70), "BIJ EEN ONVERWACHT VERZOEK", fill=NAVY, font=font(24))
    d.text((80, 130), "STOP", fill=RED, font=font(40))
    d.text((80, 200), "→ NIET VERDERGAAN", fill=NAVY, font=font(26))
    d.text((80, 260), "→ ZELF CONTROLEREN", fill=NAVY, font=font(26))
    d.text((80, 340), "NIET BETALEN  ·  GEEN CODE DELEN", fill=GOLD, font=font(18))
    d.text((80, 380), "NIET OP EEN ONVERWACHTE LINK TIKKEN", fill=GOLD, font=font(18))
    d.text((80, 450), "OPEN ZELF DE OFFICIËLE ROUTE VAN DIE DIENST", fill=NAVY, font=font(16))
    save(im, "shared/d1-kapstok.png")


def a_vs_b():
    im = Image.new("RGB", (980, 520), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 470, 490], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.rounded_rectangle([510, 30, 950, 490], radius=18, fill=WHITE, outline=NAVY, width=3)
    d.text((60, 55), "A — Navigatie oefenen", fill=GOLD, font=font(22))
    for i, t in enumerate(
        [
            "Zelfstandig navigeren",
            "SeniorEase-veiligheidspagina",
            "seniorease.nl/uitleg/veiligheid",
            "",
            "Claim:",
            "We hebben de veilige",
            "controleroute geoefend.",
        ]
    ):
        d.text((60, 110 + i * 42), t, fill=NAVY, font=font(18))
    d.text((540, 55), "B — Passend controleren", fill=NAVY, font=font(22))
    for i, t in enumerate(
        [
            "Het verzoek controleren",
            "Account → DigiD / dienst",
            "Pakket → PostNL / vervoerder",
            "",
            "Claim:",
            "Officiële route van die dienst",
            "(zonder inloggen).",
        ]
    ):
        d.text((540, 110 + i * 42), t, fill=NAVY, font=font(18))
    save(im, "shared/d1-a-vs-b.png")


def demo_terug():
    """Veilig demoscherm: terug/verlaten — niet ‘op uw verdachte bericht’."""
    im, d = phone_frame(h=860, fill=(242, 242, 247))
    status(d)
    d.text((40, 70), "Veilig demoscherm — begeleider", fill=GOLD, font=font(13))
    d.rectangle([30, 100, 410, 168], fill=WHITE)
    d.text((44, 122), "‹ Terug", fill=IOS_BLUE, font=font(20))
    mark(d, [36, 110, 160, 158])
    d.text((48, 200), "Berichten", fill=NAVY, font=font(28))
    d.rounded_rectangle([48, 260, 392, 340], radius=14, fill=WHITE)
    d.text((64, 280), "Oefencontact (veilig)", fill=NAVY, font=font(16))
    d.text((64, 308), "Hoi, tot zo!", fill=GRAY, font=font(14))
    d.text((48, 380), "Hier toont u ‘terug / verlaten’.", fill=GRAY, font=font(14))
    d.text((48, 410), "Niet alsof de beamerkaart", fill=GRAY, font=font(14))
    d.text((48, 436), "op de deelnemerstelefoon staat.", fill=GRAY, font=font(14))
    save(im, "shared/d1-demo-terug.png")


def home_screen(platform: str):
    im, d = phone_frame(h=860, fill=(30, 30, 35))
    status(d, dark=True)
    d.text((40, 70), f"Neutrale start — {platform}", fill=(200, 200, 200), font=font(13))
    apps = [("Berichten", SMS_GREEN), ("Safari" if platform == "iPhone" else "Chrome", IOS_BLUE), ("DigiD", DIGID_BLUE), ("PostNL", POSTNL_ORANGE)]
    x, y = 60, 160
    for name, col in apps:
        d.rounded_rectangle([x, y, x + 90, y + 90], radius=20, fill=col)
        d.text((x + 8, y + 100), name, fill=WHITE, font=font(12))
        x += 110
        if x > 320:
            x = 60
            y = 300
    d.text((48, 520), "Vanuit hier oefent u op uw toestel.", fill=(220, 220, 220), font=font(14))
    save(im, f"{'ios' if platform == 'iPhone' else 'android'}/d1-startscherm.png")


def browser_address(platform: str):
    im, d = phone_frame(h=860, fill=WHITE)
    status(d)
    d.text((40, 70), f"Browser — {platform}", fill=GOLD, font=font(13))
    # Adresbalk
    d.rounded_rectangle([40, 110, 400, 160], radius=12, fill=(240, 240, 245), outline=(200, 200, 210))
    d.text((54, 124), "seniorease.nl/uitleg/veiligheid", fill=NAVY, font=font(14))
    mark(d, [36, 104, 404, 166])
    d.rectangle([30, 180, 410, 780], fill=CREAM)
    d.text((50, 220), "SeniorEase", fill=NAVY, font=font(22))
    d.text((50, 260), "Veiligheid", fill=NAVY, font=font(28))
    d.text((50, 320), "U heeft zelf getypt.", fill=GRAY, font=font(16))
    d.text((50, 360), "Dit is navigatieoefening A.", fill=GRAY, font=font(16))
    save(im, f"{'ios' if platform == 'iPhone' else 'android'}/d1-browser-adres.png")


def veiligheidspagina():
    im = Image.new("RGB", (900, 700), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([40, 40, 860, 660], radius=16, fill=WHITE, outline=GOLD, width=3)
    d.text((70, 70), "SeniorEase", fill=GOLD, font=font(20))
    d.text((70, 120), "Veiligheid", fill=NAVY, font=font(36))
    d.text((70, 190), "U bent op de SeniorEase-veiligheidspagina.", fill=NAVY, font=font(18))
    d.text((70, 240), "Dit is navigatieoefening A.", fill=NAVY, font=font(18))
    d.text((70, 290), "Niet: controle van het fictieve accountprobleem.", fill=GRAY, font=font(16))
    d.text((70, 360), "seniorease.nl/uitleg/veiligheid", fill=GOLD, font=font(18))
    d.text((70, 430), "Zelf getypt — niet via een link in een bericht.", fill=NAVY, font=font(16))
    save(im, "shared/d1-veiligheidspagina.png")


def digid_start():
    im, d = phone_frame(h=860, fill=WHITE)
    status(d)
    d.text((40, 70), "Oefenvoorbeeld — herkennen, niet inloggen", fill=GOLD, font=font(12))
    d.rectangle([30, 100, 410, 200], fill=DIGID_BLUE)
    d.text((50, 130), "DigiD", fill=WHITE, font=font(32))
    d.text((50, 172), "Officiële route (voorbeeld)", fill=(200, 220, 255), font=font(14))
    d.rounded_rectangle([60, 260, 380, 330], radius=12, fill=DIGID_BLUE)
    d.text((120, 282), "Inloggen met DigiD", fill=WHITE, font=font(18))
    d.text((50, 380), "Hier stopt u in de les.", fill=NAVY, font=font(16))
    d.text((50, 420), "Niet inloggen. Geen gegevens.", fill=GRAY, font=font(15))
    mark(d, [50, 250, 390, 340])
    save(im, "shared/d1-digid-start.png")


def postnl_start():
    im, d = phone_frame(h=860, fill=WHITE)
    status(d)
    d.text((40, 70), "Oefenvoorbeeld — herkennen, niet inloggen", fill=GOLD, font=font(12))
    d.rectangle([30, 100, 410, 200], fill=POSTNL_ORANGE)
    d.text((50, 130), "PostNL", fill=WHITE, font=font(32))
    d.text((50, 172), "Officiële route (voorbeeld)", fill=(255, 230, 200), font=font(14))
    d.rounded_rectangle([48, 240, 392, 320], radius=14, fill=(250, 250, 250), outline=(230, 230, 230))
    d.text((64, 260), "Mijn pakketten", fill=NAVY, font=font(18))
    d.text((64, 290), "Bekijk bezorging", fill=GRAY, font=font(14))
    mark(d, [44, 234, 396, 326])
    d.text((50, 380), "Hier stopt u in de les.", fill=NAVY, font=font(16))
    d.text((50, 420), "Niet inloggen. Geen gegevens.", fill=GRAY, font=font(15))
    save(im, "shared/d1-postnl-start.png")


def build():
    message_card(
        "Onbekende afzender",
        [
            "Er is een probleem met uw account.",
            "Binnen 1 uur geblokkeerd.",
            "Tik hier om te herstellen.",
        ],
        "Bericht A — account (kijkvoorbeeld)",
        "shared/d1-bericht-a.png",
    )
    message_card(
        "Onbekende afzender",
        [
            "Uw pakket wacht.",
            "Bevestig vandaag nog — anders retour.",
            "Open de link in dit bericht.",
        ],
        "Bericht B — pakket (kijkvoorbeeld)",
        "shared/d1-bericht-b.png",
    )
    message_card(
        "Onbekende afzender",
        [
            "Belangrijk: er is activiteit",
            "op uw account.",
            "Log nu in via deze melding.",
            "Dit moet binnen 10 minuten.",
        ],
        "Bericht C — eindmissie (kijkvoorbeeld)",
        "shared/d1-bericht-c.png",
        mark_link=False,
    )
    kapstok()
    a_vs_b()
    demo_terug()
    home_screen("iPhone")
    home_screen("Android")
    browser_address("iPhone")
    browser_address("Android")
    veiligheidspagina()
    digid_start()
    postnl_start()
    print("D1 assets klaar.")


if __name__ == "__main__":
    build()
