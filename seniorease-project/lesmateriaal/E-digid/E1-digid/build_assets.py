#!/usr/bin/env python3
"""E1 instructiebeelden — digid.nl-route, geen echte login/persoonsgegevens."""
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
DIGID_TEAL = (0, 102, 102)
DIGID_GREEN = (0, 140, 120)
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
    d.text((80, 70), "BIJ DIGID", fill=NAVY, font=font(20))
    d.text((80, 150), "ZELF OPENEN", fill=GOLD, font=font(32))
    d.text((80, 220), "→ INLOGGEN HERKENNEN", fill=NAVY, font=font(28))
    d.text((80, 290), "→ DIGID HERKENNEN", fill=NAVY, font=font(28))
    d.text((80, 360), "→ VEILIG AFSLUITEN", fill=NAVY, font=font(28))
    d.text((80, 450), "SeniorEase-oefening", fill=GRAY, font=font(14))
    save(im, "shared/e1-kapstok.png")


def definitie():
    im = Image.new("RGB", (980, 480), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 450], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 60), "Wat is DigiD?", fill=GOLD, font=font(18))
    d.text((60, 130), "DigiD is een persoonlijke", fill=NAVY, font=font(30))
    d.text((60, 180), "digitale inlogmethode.", fill=NAVY, font=font(30))
    d.text((60, 260), "Voor de overheid — en andere organisaties", fill=NAVY, font=font(20))
    d.text((60, 300), "die DigiD gebruiken.", fill=NAVY, font=font(20))
    d.text((60, 370), "Niet hetzelfde als MijnOverheid (dat komt later).", fill=GRAY, font=font(16))
    save(im, "shared/e1-definitie.png")


def browser_phone(platform: str):
    im, d = phone_frame()
    status(d)
    label = "iPhone" if platform == "iPhone" else "Android"
    col = IOS_BLUE if platform == "iPhone" else ANDROID_TEAL
    d.text((40, 70), f"Adresbalk — {label} · voorbeeld", fill=GOLD, font=font(13))
    d.rounded_rectangle([40, 120, 400, 190], radius=14, fill=(245, 245, 248), outline=(200, 200, 210))
    d.text((55, 145), "digid.nl", fill=NAVY, font=font(22))
    mark(d, [34, 114, 406, 196])
    d.text((48, 230), "Typ digid.nl in de adresbalk", fill=NAVY, font=font(18))
    d.text((48, 280), "Daarna openen", fill=GRAY, font=font(15))
    d.rounded_rectangle([48, 340, 220, 400], radius=12, fill=col)
    d.text((85, 358), "Openen", fill=WHITE, font=font(18))
    d.text((48, 440), "Geen login · geen persoonlijke gegevens", fill=GOLD, font=font(13))
    save(im, f"{'ios' if platform == 'iPhone' else 'android'}/e1-adresbalk.png")


def browser_computer():
    im = Image.new("RGB", (980, 620), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 590], radius=14, fill=WHITE, outline=(80, 80, 80), width=2)
    d.rectangle([30, 30, 950, 78], fill=(230, 230, 235))
    d.ellipse([48, 46, 62, 60], fill=(220, 80, 80))
    d.ellipse([70, 46, 84, 60], fill=(220, 180, 60))
    d.ellipse([92, 46, 106, 60], fill=(80, 180, 80))
    d.rounded_rectangle([130, 42, 900, 70], radius=8, fill=WHITE, outline=(190, 190, 200))
    d.text((150, 48), "digid.nl", fill=NAVY, font=font(16))
    mark(d, [124, 36, 906, 76], width=3)
    d.text((60, 120), "Computer — adresbalk", fill=GOLD, font=font(18))
    d.text((60, 180), "Typ digid.nl in de adresbalk.", fill=NAVY, font=font(28))
    d.text((60, 250), "Daarna openen.", fill=NAVY, font=font(28))
    d.text((60, 340), "Geen login · geen persoonlijke gegevens", fill=GRAY, font=font(16))
    d.text((60, 400), "SeniorEase-oefening · digid.nl gecontroleerd", fill=GOLD, font=font(14))
    save(im, "computer/e1-adresbalk.png")


def digid_home():
    """digid.nl-startpagina — actueel: Mijn DigiD als toegang tot inloggen."""
    im = Image.new("RGB", (980, 640), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 610], radius=14, fill=WHITE, outline=DIGID_TEAL, width=3)
    d.rectangle([30, 30, 950, 110], fill=DIGID_TEAL)
    d.text((60, 55), "DigiD", fill=WHITE, font=font(28))
    d.text((720, 58), "Mijn DigiD", fill=WHITE, font=font(20))
    mark(d, [700, 48, 920, 92], width=3)
    d.text((60, 150), "digid.nl — startpagina (voorbeeld)", fill=GOLD, font=font(16))
    d.text((60, 210), "Laat zien wie je bent", fill=NAVY, font=font(32))
    d.text((60, 280), "Zoek hier de weg naar Inloggen / Mijn DigiD.", fill=NAVY, font=font(20))
    d.text((60, 340), "Uw scherm kan er iets anders uitzien. Dat is normaal.", fill=GRAY, font=font(16))
    d.rounded_rectangle([60, 400, 420, 470], radius=10, fill=(230, 245, 245), outline=DIGID_TEAL)
    d.text((90, 425), "KIJKEN · HERKENNEN", fill=DIGID_TEAL, font=font(18))
    d.text((60, 510), "Oefening SeniorEase — geen echte login · geen persoonsgegevens", fill=GRAY, font=font(14))
    save(im, "shared/e1-digid-home.png")


def inlog_omgeving():
    """DigiD-inlogomgeving — lege velden, alleen kijken."""
    im = Image.new("RGB", (980, 640), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 610], radius=14, fill=WHITE, outline=DIGID_TEAL, width=3)
    d.rectangle([30, 30, 950, 100], fill=DIGID_TEAL)
    d.text((60, 50), "DigiD — inloggen (voorbeeld)", fill=WHITE, font=font(24))
    d.text((60, 130), "KIJKEN / HERKENNEN — niet invullen", fill=RED, font=font(20))
    d.text((60, 190), "Gebruikersnaam", fill=GRAY, font=font(16))
    d.rounded_rectangle([60, 220, 700, 275], radius=8, fill=(248, 248, 250), outline=(200, 200, 210))
    d.text((80, 238), "(leeg · niet invullen)", fill=GRAY, font=font(16))
    d.text((60, 310), "Wachtwoord", fill=GRAY, font=font(16))
    d.rounded_rectangle([60, 340, 700, 395], radius=8, fill=(248, 248, 250), outline=(200, 200, 210))
    d.text((80, 358), "(leeg · niet invullen)", fill=GRAY, font=font(16))
    d.rounded_rectangle([60, 430, 280, 495], radius=10, fill=(200, 210, 210))
    d.text((110, 452), "Inloggen", fill=GRAY, font=font(20))
    d.text((60, 530), "Oefening SeniorEase — geen echte login · geen codes", fill=GOLD, font=font(14))
    save(im, "shared/e1-inlog-omgeving.png")


def digid_app(platform: str):
    im, d = phone_frame()
    status(d)
    label = "iPhone" if platform == "iPhone" else "Android"
    d.text((40, 70), f"DigiD-app herkennen — {label}", fill=GOLD, font=font(13))
    d.rounded_rectangle([140, 200, 300, 360], radius=28, fill=DIGID_TEAL)
    d.text((175, 260), "DigiD", fill=WHITE, font=font(26))
    mark(d, [134, 194, 306, 366])
    d.text((50, 420), "Alleen herkennen indien aanwezig", fill=NAVY, font=font(17))
    d.text((50, 470), "Niet openen · niet activeren", fill=GRAY, font=font(15))
    d.text((50, 520), "Geen app? Prima — digid.nl is genoeg", fill=GRAY, font=font(15))
    save(im, f"{'ios' if platform == 'iPhone' else 'android'}/e1-digid-app.png")


def afsluiten():
    im = Image.new("RGB", (980, 520), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 480, 490], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.rounded_rectangle([500, 30, 950, 490], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 60), "NIET INGELOGD", fill=GOLD, font=font(18))
    d.text((60, 160), "→ tabblad/app", fill=NAVY, font=font(28))
    d.text((60, 220), "  sluiten", fill=NAVY, font=font(28))
    d.text((60, 320), "Standaard in deze les", fill=GRAY, font=font(16))
    d.text((530, 60), "WEL INGELOGD", fill=GOLD, font=font(18))
    d.text((530, 160), "→ eerst uitloggen", fill=NAVY, font=font(26))
    d.text((530, 220), "→ daarna eventueel", fill=NAVY, font=font(26))
    d.text((530, 280), "  sluiten", fill=NAVY, font=font(26))
    d.text((530, 360), "Alleen na echte login", fill=GRAY, font=font(16))
    save(im, "shared/e1-afsluiten.png")


def privacyzin():
    im = Image.new("RGB", (980, 420), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 390], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 70), "Privacy", fill=GOLD, font=font(18))
    d.text((60, 150), "Mijn DigiD-gegevens en codes", fill=NAVY, font=font(30))
    d.text((60, 210), "houd ik voor mezelf.", fill=NAVY, font=font(30))
    d.text((60, 300), "Begeleider zegt dit één keer — u hoeft het niet na te zeggen.", fill=GRAY, font=font(16))
    save(im, "shared/e1-privacyzin.png")


def build():
    kapstok()
    definitie()
    browser_phone("iPhone")
    browser_phone("Android")
    browser_computer()
    digid_home()
    inlog_omgeving()
    digid_app("iPhone")
    digid_app("Android")
    afsluiten()
    privacyzin()
    print("E1 assets klaar.")


if __name__ == "__main__":
    build()
