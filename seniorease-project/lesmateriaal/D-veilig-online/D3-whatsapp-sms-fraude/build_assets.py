#!/usr/bin/env python3
"""D3 instructiebeelden — fictieve scenario’s, geen echte bank/nummers."""
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
    d.text((80, 70), "BIJ EEN ONVERWACHTE BELLER OF HELPDESK", fill=NAVY, font=font(20))
    d.text((80, 140), "STOP → NIET VERDERGAAN → ZELF CONTROLEREN", fill=RED, font=font(18))
    d.text((80, 220), "ONVERWACHTE HULP?", fill=GOLD, font=font(24))
    d.text((80, 290), "→ STOP", fill=NAVY, font=font(32))
    d.text((80, 360), "→ ZELF TERUGBELLEN", fill=NAVY, font=font(32))
    d.text((80, 450), "SeniorEase-oefening", fill=GRAY, font=font(14))
    save(im, "shared/d3-kapstok.png")


def risico_software_scherm():
    im = Image.new("RGB", (900, 420), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([40, 40, 860, 380], radius=20, fill=WHITE, outline=GOLD, width=3)
    d.text((80, 90), "GEEN SOFTWARE INSTALLEREN", fill=RED, font=font(28))
    d.text((80, 170), "GEEN SCHERM DELEN", fill=RED, font=font(28))
    d.text((80, 260), "Niet op verzoek van een onverwachte beller.", fill=NAVY, font=font(18))
    d.text((80, 310), "SeniorEase — veilig oefenen", fill=GOLD, font=font(14))
    save(im, "shared/d3-geen-software-scherm.png")


def terugbelzin():
    im = Image.new("RGB", (980, 420), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 390], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 70), "Terugbelzin", fill=GOLD, font=font(18))
    d.text((60, 140), "Ik bel u zelf terug", fill=NAVY, font=font(34))
    d.text((60, 200), "via het officiële nummer.", fill=NAVY, font=font(34))
    d.text((60, 290), "Eerst beëindigen · alleen als controleren nodig is", fill=GRAY, font=font(16))
    d.text((60, 330), "Nooit via het nummer uit het gesprek of bericht", fill=GRAY, font=font(16))
    save(im, "shared/d3-terugbelzin.png")


def gesprek_kaart(letter: str, lines: list[str], out: str, footer: str):
    im = Image.new("RGB", (980, 560), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 530], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 55), f"Oefening SeniorEase — geen echt gesprek · scenario {letter}", fill=GOLD, font=font(16))
    y = 110
    for line in lines:
        d.text((60, y), line, fill=NAVY, font=font(22))
        y += 48
    d.text((60, 460), footer, fill=GRAY, font=font(14))
    save(im, out)


def bericht_b():
    im, d = phone_frame(h=860)
    status(d)
    d.text((40, 70), "Oefening SeniorEase — geen echt bericht", fill=GOLD, font=font(13))
    d.rectangle([30, 100, 410, 168], fill=(240, 240, 245))
    d.text((44, 118), "‹", fill=IOS_BLUE, font=font(26))
    d.text((100, 122), "Helpdesk (voorbeeld)", fill=NAVY, font=font(16))
    d.text((100, 144), "Fictief · niet op uw telefoon", fill=GRAY, font=font(12))
    d.rectangle([30, 168, 410, 780], fill=(248, 248, 250))
    body = [
        "Met de helpdesk van uw bank.",
        "Er is een probleem.",
        "Bel dit nummer terug",
        "(niet klikbaar · geen echt nummer)",
        "Reageer binnen 15 minuten.",
    ]
    y = 200
    bh = 24 + 28 * len(body)
    d.rounded_rectangle([48, y, 392, y + bh], radius=16, fill=WHITE, outline=(210, 210, 210))
    yy = y + 14
    for line in body:
        d.text((64, yy), line, fill=NAVY, font=font(14))
        yy += 28
    d.text((48, y + bh + 24), "Geen familie · tik nergens", fill=GOLD, font=font(14))
    save(im, "shared/d3-bericht-b.png")


def situatie_c():
    im = Image.new("RGB", (980, 480), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 450], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 55), "Oefening SeniorEase — geen echt verzoek", fill=GOLD, font=font(16))
    d.text((60, 120), "“Uw rekening is niet veilig.", fill=NAVY, font=font(26))
    d.text((60, 170), "Maak geld over naar een veilige rekening.”", fill=NAVY, font=font(26))
    d.text((60, 250), "→ STOP", fill=RED, font=font(28))
    d.text((60, 310), "→ NIET OVERMAKEN", fill=RED, font=font(28))
    d.text((60, 380), "Geen echte rekening · geen betaling in de les", fill=GRAY, font=font(16))
    save(im, "shared/d3-situatie-c.png")


def officiele_app(platform: str):
    im, d = phone_frame(h=860, fill=WHITE)
    status(d)
    label = "iPhone" if platform == "iPhone" else "Android"
    d.text((40, 70), f"Officiële app — {label} · voorbeeld", fill=GOLD, font=font(13))
    d.text((40, 100), "Geen echte bank · geen login", fill=GRAY, font=font(12))
    # Generic app tile — not a real bank logo
    col = IOS_BLUE if platform == "iPhone" else ANDROID_TEAL
    d.rounded_rectangle([140, 220, 300, 380], radius=28, fill=col)
    d.text((165, 290), "Uw bank", fill=WHITE, font=font(22))
    mark(d, [134, 214, 306, 386])
    d.text((50, 440), "Officiële app die u al gebruikt", fill=NAVY, font=font(18))
    d.text((50, 490), "Tot startscherm · niet inloggen", fill=GRAY, font=font(15))
    d.text((50, 540), "Niet: nummer uit het gesprek", fill=GRAY, font=font(15))
    save(im, f"{'ios' if platform == 'iPhone' else 'android'}/d3-officiele-app.png")


def gecontroleerd_nummer(platform: str):
    im, d = phone_frame(h=860, fill=WHITE)
    status(d)
    label = "iPhone" if platform == "iPhone" else "Android"
    d.text((40, 70), f"Gecontroleerd nummer — {label}", fill=GOLD, font=font(13))
    d.rectangle([30, 110, 410, 200], fill=(245, 245, 248))
    d.text((50, 130), "Zoeken", fill=GRAY, font=font(14))
    d.text((50, 160), "Officieel nummer (voorbeeld)", fill=NAVY, font=font(16))
    d.rounded_rectangle([48, 230, 392, 340], radius=14, fill=(250, 250, 252), outline=(210, 210, 220))
    d.text((70, 255), "Bank — officieel (voorbeeld)", fill=NAVY, font=font(16))
    d.text((70, 290), "Eerder zelf gecontroleerd", fill=GRAY, font=font(14))
    mark(d, [42, 224, 398, 346])
    d.text((48, 380), "Niet: willekeurig contact", fill=RED, font=font(15))
    d.text((48, 420), "omdat het in Contacten staat.", fill=RED, font=font(15))
    d.text((48, 480), "Geen echt nummer · niet bellen in de les", fill=GOLD, font=font(13))
    save(im, f"{'ios' if platform == 'iPhone' else 'android'}/d3-gecontroleerd-nummer.png")


def build():
    kapstok()
    risico_software_scherm()
    terugbelzin()
    gesprek_kaart(
        "A",
        [
            "Beller: “Met de bank / helpdesk.”",
            "“Er is fraude op uw rekening.”",
            "“Installeer nu deze app.”",
            "“Deel uw scherm.”",
            "“Het moet snel.”",
        ],
        "shared/d3-gesprek-a.png",
        "Geen echt nummer · geen echte bank · geen echte app",
    )
    gesprek_kaart(
        "D",
        [
            "Beller: “Met de beveiligingsafdeling.”",
            "“Er is een verdachte betaling.”",
            "“Geef mij de code die u nu ontvangt.”",
            "“Of open remote support.”",
        ],
        "shared/d3-scenario-d.png",
        "Eindmissie · geen echt nummer · geen echte code",
    )
    bericht_b()
    situatie_c()
    officiele_app("iPhone")
    officiele_app("Android")
    gecontroleerd_nummer("iPhone")
    gecontroleerd_nummer("Android")
    print("D3 assets klaar.")


if __name__ == "__main__":
    build()
