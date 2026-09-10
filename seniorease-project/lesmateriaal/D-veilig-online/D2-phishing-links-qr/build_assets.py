#!/usr/bin/env python3
"""D2 instructiebeelden + veilige QR-1/QR-2 (exacte SeniorEase-bestemmingen)."""
from pathlib import Path
import qrcode
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
SHOTS = ROOT / "assets" / "screenshots"
QR_DIR = ROOT / "assets" / "qr"
for p in [SHOTS / "ios", SHOTS / "android", SHOTS / "shared", QR_DIR, ROOT / "pdf", ROOT / "beamer"]:
    p.mkdir(parents=True, exist_ok=True)

NAVY = (62, 39, 35)
GOLD = (166, 124, 82)
CREAM = (245, 240, 232)
WHITE = (255, 255, 255)
GRAY = (120, 120, 120)
RED = (200, 40, 40)
IOS_BLUE = (0, 122, 255)
ANDROID_TEAL = (18, 140, 126)

QR1_URL = "https://www.seniorease.nl/uitleg/veiligheid"
QR2_URL = "https://www.seniorease.nl/uitleg/qr-code"


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


def make_qr(url: str, out: Path, label: str):
    qr = qrcode.QRCode(version=None, error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=12, border=2)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    # Printable card with label
    card = Image.new("RGB", (900, 1040), CREAM)
    d = ImageDraw.Draw(card)
    d.rounded_rectangle([40, 40, 860, 1000], radius=20, fill=WHITE, outline=GOLD, width=3)
    d.text((70, 70), label, fill=NAVY, font=font(28))
    d.text((70, 120), "SeniorEase-oefening — veilige bestemming", fill=GOLD, font=font(16))
    # center QR
    qr_big = img.resize((640, 640))
    card.paste(qr_big, (130, 180))
    d.text((70, 860), url.replace("https://", ""), fill=GRAY, font=font(16))
    d.text((70, 900), "Printbaar · goed scanbaar · geen verdachte QR", fill=GRAY, font=font(14))
    card.save(out, optimize=True)
    print("qr", out.name)
    # also bare QR for beamer
    bare = out.with_name(out.stem + "-bare.png")
    img.resize((720, 720)).save(bare, optimize=True)
    return out


def kapstok():
    im = Image.new("RGB", (900, 620), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([40, 40, 860, 580], radius=20, fill=WHITE, outline=GOLD, width=3)
    d.text((80, 70), "BIJ EEN LINK OF QR", fill=NAVY, font=font(24))
    d.text((80, 130), "STOP → NIET VERDERGAAN → ZELF CONTROLEREN", fill=RED, font=font(22))
    d.text((80, 200), "QR", fill=GOLD, font=font(20))
    d.text((80, 250), "SCANNEN", fill=NAVY, font=font(28))
    d.text((80, 300), "→ BESTEMMING BEKIJKEN", fill=NAVY, font=font(24))
    d.text((80, 350), "→ CONTROLEREN", fill=NAVY, font=font(24))
    d.text((80, 400), "→ PAS DAN VERDER", fill=NAVY, font=font(24))
    d.text((80, 480), "NIET BETALEN  ·  GEEN CODE DELEN", fill=GOLD, font=font(16))
    d.text((80, 520), "NIET OP EEN ONVERWACHTE LINK TIKKEN", fill=GOLD, font=font(16))
    save(im, "shared/d2-kapstok.png")


def slotje_geen_bewijs():
    im = Image.new("RGB", (900, 420), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([40, 40, 860, 380], radius=20, fill=WHITE, outline=GOLD, width=3)
    d.text((80, 90), "Een slotje of HTTPS", fill=NAVY, font=font(28))
    d.text((80, 160), "is GEEN bewijs", fill=RED, font=font(36))
    d.text((80, 240), "dat een website betrouwbaar is.", fill=NAVY, font=font(24))
    d.text((80, 310), "Kijk zelf waar u terechtkomt.", fill=GOLD, font=font(18))
    save(im, "shared/d2-slotje-geen-bewijs.png")


def domain_card(url: str, website: str, note: str, out: str, mark_right=True):
    im = Image.new("RGB", (980, 420), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 390], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 55), "Kijkkaart — niet openen · niet klikbaar", fill=GOLD, font=font(16))
    d.text((60, 110), url, fill=NAVY, font=font(28))
    # one mark on the website part
    if mark_right:
        idx = url.rfind(website) if website in url else -1
        if idx >= 0:
            before = url[:idx]
            bx = 60 + d.textbbox((0, 0), before, font=font(28))[2]
            w = d.textbbox((0, 0), website, font=font(28))[2]
            mark(d, [bx - 6, 100, bx + w + 6, 155])
    d.text((60, 200), f"→ website: {website}", fill=NAVY, font=font(24))
    d.text((60, 270), note, fill=GRAY, font=font(18))
    d.text((60, 330), "SeniorEase-oefening — fictief voorbeeld", fill=GOLD, font=font(14))
    save(im, out)


def domain_card_open(url: str, out: str):
    """Eindmissie-kijkkaart: adres tonen zonder antwoord."""
    im = Image.new("RGB", (980, 420), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 390], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 55), "Kijkkaart — niet openen · niet klikbaar", fill=GOLD, font=font(16))
    d.text((60, 140), url, fill=NAVY, font=font(28))
    d.text((60, 240), "Alleen kijken. Welke website noemt dit adres?", fill=GRAY, font=font(20))
    d.text((60, 310), "SeniorEase-oefening — fictief voorbeeld · .example", fill=GOLD, font=font(14))
    save(im, out)


def domain_methode():
    im = Image.new("RGB", (980, 520), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([30, 30, 950, 490], radius=18, fill=WHITE, outline=GOLD, width=3)
    d.text((60, 60), "Zo kijkt u (eenvoudig)", fill=NAVY, font=font(26))
    lines = [
        "1. Kijk eerst naar het adresdeel vóór de eerste /",
        "2. Kijk binnen dat deel van rechts naar links",
        "3. Bekende naam ervoor ≠ automatisch officiële website",
    ]
    y = 140
    for line in lines:
        d.text((60, y), line, fill=NAVY, font=font(22))
        y += 70
    d.text((60, 400), "Geen technische URL-les — veilig handelen.", fill=GOLD, font=font(16))
    save(im, "shared/d2-domein-methode.png")


def fictive_link_message():
    im, d = phone_frame(h=860)
    status(d)
    d.text((40, 70), "Oefening SeniorEase — geen echt bericht", fill=GOLD, font=font(13))
    d.rectangle([30, 100, 410, 168], fill=(240, 240, 245))
    d.text((44, 118), "‹", fill=IOS_BLUE, font=font(26))
    d.text((118, 122), "Onbekende afzender", fill=NAVY, font=font(16))
    d.text((118, 144), "Kijkvoorbeeld · niet op uw telefoon", fill=GRAY, font=font(12))
    d.rectangle([30, 168, 410, 780], fill=(248, 248, 250))
    lines = [
        "Er is een update voor uw account.",
        "Open de link hieronder.",
        "tik-hier-voorbeeld  (niet klikbaar)",
    ]
    y = 200
    bh = 28 + 26 * len(lines)
    d.rounded_rectangle([48, y, 392, y + bh], radius=16, fill=WHITE, outline=(210, 210, 210))
    yy = y + 14
    for i, line in enumerate(lines):
        d.text((64, yy), line, fill=NAVY if i < 2 else RED, font=font(15))
        yy += 26
    mark(d, [52, y + bh - 40, 388, y + bh - 6])
    d.text((48, y + bh + 24), "Geen echte link · tik nergens", fill=GOLD, font=font(14))
    save(im, "shared/d2-bericht-link.png")


def browser_address(platform: str, address="digid.nl"):
    im, d = phone_frame(h=860, fill=WHITE)
    status(d)
    label = "Safari" if platform == "iPhone" else "Chrome"
    d.text((40, 70), f"{label} — {platform}", fill=GOLD, font=font(13))
    # toolbar
    if platform == "iPhone":
        d.rounded_rectangle([40, 110, 400, 165], radius=12, fill=(240, 240, 245))
        d.text((54, 126), address, fill=NAVY, font=font(18))
        mark(d, [36, 104, 404, 171])
    else:
        d.rectangle([30, 100, 410, 170], fill=(245, 245, 245))
        d.rounded_rectangle([50, 118, 390, 158], radius=20, fill=WHITE, outline=(200, 200, 200))
        d.text((70, 128), address, fill=NAVY, font=font(18))
        mark(d, [46, 112, 394, 164])
    d.rectangle([30, 180, 410, 780], fill=CREAM)
    d.text((50, 240), "Zelf getypt", fill=NAVY, font=font(26))
    d.text((50, 300), "Niet via een link in een bericht.", fill=GRAY, font=font(16))
    d.text((50, 360), "Niet inloggen in deze les.", fill=GRAY, font=font(16))
    save(im, f"{'ios' if platform == 'iPhone' else 'android'}/d2-browser-adres.png")


def browser_open(platform: str):
    im, d = phone_frame(h=860, fill=(30, 30, 35))
    status(d, dark=True)
    d.text((40, 70), f"Neutrale start — {platform}", fill=(200, 200, 200), font=font(13))
    apps = [("Safari" if platform == "iPhone" else "Chrome", IOS_BLUE if platform == "iPhone" else ANDROID_TEAL), ("Camera", (80, 80, 90))]
    x, y = 60, 180
    for name, col in apps:
        d.rounded_rectangle([x, y, x + 100, y + 100], radius=22, fill=col)
        d.text((x + 12, y + 110), name, fill=WHITE, font=font(14))
        if name in ("Safari", "Chrome"):
            mark(d, [x - 6, y - 6, x + 106, y + 106])
        x += 140
    d.text((48, 400), "Open eerst de browser.", fill=(220, 220, 220), font=font(16))
    save(im, f"{'ios' if platform == 'iPhone' else 'android'}/d2-browser-openen.png")


def qr_prompt(platform: str):
    """Stylized destination prompt — not claiming exact OS clone."""
    im, d = phone_frame(h=860, fill=WHITE)
    status(d)
    d.text((40, 70), f"Voorbeeldmelding — {platform}", fill=GOLD, font=font(13))
    d.text((40, 100), "Uw scherm kan er iets anders uitzien.", fill=GRAY, font=font(12))
    d.rounded_rectangle([48, 200, 392, 420], radius=18, fill=(245, 245, 248), outline=(210, 210, 220))
    d.text((70, 230), "Website gevonden", fill=NAVY, font=font(20))
    d.text((70, 280), "seniorease.nl", fill=IOS_BLUE if platform == "iPhone" else ANDROID_TEAL, font=font(18))
    d.text((70, 330), "Bekijk de bestemming", fill=GRAY, font=font(15))
    d.text((70, 360), "vóór u erop tikt.", fill=GRAY, font=font(15))
    mark(d, [64, 270, 320, 310])
    d.text((48, 460), "Eerst kijken — dan openen of stoppen.", fill=NAVY, font=font(15))
    save(im, f"{'ios' if platform == 'iPhone' else 'android'}/d2-qr-melding.png")


def qr_scan_hint(platform: str):
    im, d = phone_frame(h=860, fill=(20, 20, 25))
    status(d, dark=True)
    d.text((40, 70), f"Camera — {platform}", fill=(200, 200, 200), font=font(13))
    d.rounded_rectangle([80, 200, 360, 480], radius=16, outline=WHITE, width=3)
    d.text((120, 330), "QR in beeld", fill=WHITE, font=font(18))
    mark(d, [74, 194, 366, 486])
    d.text((48, 540), "Scan de QR van de begeleider.", fill=(220, 220, 220), font=font(15))
    save(im, f"{'ios' if platform == 'iPhone' else 'android'}/d2-qr-scannen.png")


def build():
    make_qr(QR1_URL, QR_DIR / "d2-qr1-veiligheid.png", "QR-1 — begeleide oefening")
    make_qr(QR2_URL, QR_DIR / "d2-qr2-eindmissie.png", "QR-2 — eindmissie")
    # copy printable QR into screenshots for beamer shots
    for name in ["d2-qr1-veiligheid.png", "d2-qr2-eindmissie.png", "d2-qr1-veiligheid-bare.png", "d2-qr2-eindmissie-bare.png"]:
        src = QR_DIR / name
        if src.exists():
            save(Image.open(src), f"shared/{name}")

    kapstok()
    slotje_geen_bewijs()
    domain_methode()
    domain_card("iets.digid.nl", "digid.nl", "→ “iets” staat ervoor", "shared/d2-domein-kaart1.png")
    domain_card(
        "digid.nl.nepsite.com",
        "nepsite.com",
        "→ digid.nl staat ervoor, maar is niet de website",
        "shared/d2-domein-kaart2.png",
    )
    domain_card(
        "postnl.nl.pakket-controle.example",
        "pakket-controle.example",
        "→ postnl.nl staat wel in het adres — niet de officiële PostNL-website",
        "shared/d2-domein-kaart3.png",
    )
    # Eindmissie: zelfde adres, ZONDER antwoord (geen website-regel, geen markering)
    domain_card_open(
        "postnl.nl.pakket-controle.example",
        "shared/d2-domein-kaart3-open.png",
    )
    fictive_link_message()
    browser_open("iPhone")
    browser_open("Android")
    browser_address("iPhone")
    browser_address("Android")
    qr_scan_hint("iPhone")
    qr_scan_hint("Android")
    qr_prompt("iPhone")
    qr_prompt("Android")
    print("D2 assets klaar.")


if __name__ == "__main__":
    build()
