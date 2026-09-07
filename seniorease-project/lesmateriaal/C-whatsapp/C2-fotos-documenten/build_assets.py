#!/usr/bin/env python3
"""Generate C2 practice photos, instructional shots, and oefen-PDFs."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from fpdf import FPDF

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"
SHOTS = ASSETS / "screenshots"
OEFEN = ASSETS / "oefen"
for p in [
    ASSETS,
    SHOTS / "ios",
    SHOTS / "android",
    SHOTS / "shared",
    OEFEN,
    ROOT / "pdf",
    ROOT / "beamer",
]:
    p.mkdir(parents=True, exist_ok=True)

NAVY = (62, 39, 35)
GOLD = (166, 124, 82)
CREAM = (245, 240, 232)
WA_GREEN = (7, 94, 84)


def font(size: int):
    for name in ["C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/segoeui.ttf", "arial.ttf"]:
        try:
            return ImageFont.truetype(name, size)
        except Exception:
            pass
    return ImageFont.load_default()


def draw_phone(w=420, h=760):
    im = Image.new("RGB", (w, h), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle(
        [20, 20, w - 20, h - 20],
        radius=36,
        fill=(250, 250, 250),
        outline=(40, 40, 40),
        width=3,
    )
    return im, d


def status_bar(d, x0, y0, x1):
    d.text((x0 + 16, y0 + 10), "09:41", fill=(30, 30, 30), font=font(16))
    d.text((x1 - 70, y0 + 10), "82%", fill=(30, 30, 30), font=font(16))


def wa_header(d, x0, y0, x1, name="SeniorEase oefencontact", mark=False):
    d.rectangle([x0, y0, x1, y0 + 56], fill=WA_GREEN)
    d.text((x0 + 44, y0 + 10), "<", fill="white", font=font(22))
    d.ellipse([x0 + 70, y0 + 10, x0 + 106, y0 + 46], fill=(180, 180, 180))
    d.text((x0 + 118, y0 + 14), name, fill="white", font=font(18))
    if mark:
        d.rounded_rectangle([x0 + 112, y0 + 8, x1 - 18, y0 + 48], radius=6, outline=(200, 30, 30), width=3)


def make_mug_photo(path: Path, label: str):
    im = Image.new("RGB", (640, 640), (240, 236, 228))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([200, 180, 400, 460], radius=20, fill=(210, 90, 70), outline=NAVY, width=3)
    d.arc([390, 230, 480, 350], 270, 90, fill=NAVY, width=8)
    d.ellipse([230, 160, 370, 210], fill=(230, 120, 100), outline=NAVY, width=2)
    d.text((220, 520), label, fill=NAVY, font=font(28))
    d.text((180, 560), "SeniorEase oefenfoto", fill=GOLD, font=font(20))
    im.save(path)
    return path


def make_flowers_photo(path: Path, label: str):
    im = Image.new("RGB", (640, 640), (235, 242, 235))
    d = ImageDraw.Draw(im)
    for cx, cy, col in [(250, 260, (220, 80, 100)), (380, 240, (240, 180, 60)), (320, 340, (120, 160, 80))]:
        d.ellipse([cx - 40, cy - 40, cx + 40, cy + 40], fill=col, outline=NAVY, width=2)
        d.line([cx, cy + 40, cx, cy + 140], fill=(60, 120, 60), width=6)
    d.text((170, 520), label, fill=NAVY, font=font(28))
    d.text((160, 560), "SeniorEase oefenfoto", fill=GOLD, font=font(20))
    im.save(path)
    return path


def save_shot(im: Image.Image, rel: str):
    dest = SHOTS / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest)
    print("shot", rel)


def make_oefen_pdf(path: Path, title: str, subtitle: str, body: str):
    # Core fonts = latin-1; avoid fancy dashes/quotes
    title = title.replace("—", "-").replace("–", "-")
    body = body.replace("—", "-").replace("–", "-")
    pdf = FPDF()
    pdf.add_page()
    pdf.set_fill_color(*NAVY)
    pdf.rect(0, 0, 210, 40, "F")
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_xy(15, 14)
    pdf.cell(0, 10, "SeniorEase")
    pdf.set_text_color(*NAVY)
    pdf.set_font("Helvetica", "B", 22)
    pdf.set_xy(15, 55)
    pdf.multi_cell(180, 10, title)
    pdf.set_font("Helvetica", "B", 28)
    pdf.set_text_color(*GOLD)
    pdf.set_xy(15, 90)
    pdf.multi_cell(180, 14, subtitle)
    pdf.set_text_color(*NAVY)
    pdf.set_font("Helvetica", "", 16)
    pdf.set_xy(15, 120)
    pdf.multi_cell(180, 9, body)
    pdf.set_font("Helvetica", "I", 11)
    pdf.set_text_color(120, 120, 120)
    pdf.set_xy(15, 250)
    pdf.cell(0, 8, "Oefenbestand - geen persoonsgegevens - seniorease.nl")
    pdf.output(str(path))
    print("pdf", path.name)


def load_oefenfoto(bron_name: str, dest: Path, fallback_maker) -> Path:
    """Gebruik aangeleverde/gegenereerde echte oefenfoto; val terug op tekening."""
    bron = SHOTS / "_bron" / bron_name
    if bron.exists():
        Image.open(bron).convert("RGB").save(dest)
        print("photo from bron", bron_name, "->", dest.name)
        return dest
    return fallback_maker(dest)


def main():
    mug = load_oefenfoto(
        "c2-lesfoto-mok.png",
        OEFEN / "c2-lesfoto-mok.png",
        lambda p: make_mug_photo(p, "Lesfoto — mok"),
    )
    flowers = load_oefenfoto(
        "c2-eindmissiefoto-bloemen.png",
        OEFEN / "c2-eindmissiefoto-bloemen.png",
        lambda p: make_flowers_photo(p, "Eindmissiefoto"),
    )
    print("photos", mug.name, flowers.name)

    # iPhone home
    im, d = draw_phone()
    status_bar(d, 30, 36, 390)
    d.text((40, 80), "WhatsApp openen (iPhone)", fill=NAVY, font=font(18))
    apps = ["Berichten", "Agenda", "Fotos", "Camera", "Mail", "Klok", "Kaarten", "Weer"]
    for i, name in enumerate(apps):
        x = 50 + (i % 4) * 85
        y = 140 + (i // 4) * 100
        d.rounded_rectangle([x, y, x + 60, y + 60], radius=14, fill=(100 + i * 10, 140, 200), outline=NAVY)
        d.text((x, y + 66), name[:8], fill=NAVY, font=font(12))
    wx, wy = 50, 360
    d.rounded_rectangle([wx, wy, wx + 60, wy + 60], radius=14, fill=(37, 211, 102), outline=(200, 30, 30), width=4)
    d.text((wx + 10, wy + 15), "WA", fill="white", font=font(18))
    d.text((wx, wy + 66), "WhatsApp", fill=NAVY, font=font(12))
    d.polygon([(200, 390), (140, 390), (160, 370)], fill=(200, 30, 30))
    save_shot(im, "ios/c2-whatsapp-openen.png")

    # Android home
    im, d = draw_phone()
    status_bar(d, 30, 36, 390)
    d.rectangle([30, 70, 390, 740], fill=(30, 30, 35))
    d.text((40, 80), "WhatsApp openen (Android)", fill="white", font=font(17))
    d.rounded_rectangle([50, 120, 370, 155], radius=18, fill=(60, 60, 65))
    d.text((70, 128), "Zoeken", fill=(180, 180, 180), font=font(14))
    apps = ["Play", "Facebook", "Spotify", "Netflix", "WhatsApp", "Berichten", "Camera", "Galerij"]
    for i, name in enumerate(apps):
        x = 55 + (i % 4) * 85
        y = 190 + (i // 4) * 110
        is_wa = name == "WhatsApp"
        d.rounded_rectangle(
            [x, y, x + 60, y + 60],
            radius=14,
            fill=(37, 211, 102) if is_wa else (80, 90, 120),
            outline=(200, 30, 30) if is_wa else (200, 200, 200),
            width=4 if is_wa else 1,
        )
        d.text((x, y + 66), name[:9], fill="white", font=font(12))
    d.polygon([(200, 420), (140, 420), (160, 400)], fill=(200, 30, 30))
    save_shot(im, "android/c2-whatsapp-openen.png")

    def chat_with_photo(title: str, mark: str):
        im, d = draw_phone(440, 800)
        status_bar(d, 30, 36, 410)
        d.text((40, 70), title, fill=NAVY, font=font(16))
        wa_header(d, 30, 100, 410, mark=(mark == "name"))
        d.rectangle([30, 156, 410, 760], fill=(236, 229, 221))
        thumb = Image.open(mug).resize((180, 180))
        im.paste(thumb, (50, 200))
        if mark == "photo":
            d.rounded_rectangle([46, 196, 234, 384], radius=8, outline=(200, 30, 30), width=4)
            d.polygon([(280, 290), (250, 290), (265, 270)], fill=(200, 30, 30))
        d.text((50, 400), "Lesfoto — mok", fill=(80, 80, 80), font=font(14))
        return im

    save_shot(chat_with_photo("Ontvangen foto in gesprek", "photo"), "shared/c2-foto-ontvangen.png")
    save_shot(chat_with_photo("Naam bovenaan", "name"), "shared/c2-gesprek-naam.png")

    im, d = draw_phone(440, 800)
    status_bar(d, 30, 36, 410)
    d.text((40, 70), "Foto geopend", fill=NAVY, font=font(18))
    d.rectangle([30, 100, 410, 760], fill=(20, 20, 20))
    # Terug-chevron linksboven (platformgetrouw)
    d.ellipse([40, 112, 78, 150], outline=(200, 30, 30), width=4)
    d.text((48, 118), "<", fill="white", font=font(24))
    d.polygon([(100, 130), (80, 120), (80, 140)], fill=(200, 30, 30))
    im.paste(Image.open(mug).resize((320, 320)), (60, 220))
    d.text((120, 560), "Terug naar het gesprek", fill="white", font=font(16))
    save_shot(im, "shared/c2-foto-geopend.png")

    # iPhone: + links van het typvak (huidige WhatsApp iOS)
    im, d = draw_phone()
    status_bar(d, 30, 36, 390)
    d.text((40, 70), "Toevoegen — iPhone", fill=NAVY, font=font(17))
    wa_header(d, 30, 100, 390)
    d.rectangle([30, 156, 390, 740], fill=(236, 229, 221))
    d.rounded_rectangle([44, 678, 300, 722], radius=20, fill="white", outline=(200, 200, 200))
    d.ellipse([50, 684, 86, 720], fill=(37, 211, 102), outline=(200, 30, 30), width=4)
    d.text((58, 690), "+", fill="white", font=font(22))
    d.text((96, 692), "Typ een bericht", fill=(150, 150, 150), font=font(14))
    d.ellipse([318, 680, 358, 720], fill=(37, 211, 102))
    d.polygon([(140, 655), (75, 700), (140, 700)], fill=(200, 30, 30))
    d.text((40, 735), "iPhone: tik op +", fill=(100, 100, 100), font=font(13))
    save_shot(im, "ios/c2-toevoegen.png")

    # Android: paperclip / bijlage (niet dezelfde + als iPhone)
    im, d = draw_phone()
    status_bar(d, 30, 36, 390)
    d.text((40, 70), "Bijlage — Android", fill=NAVY, font=font(17))
    wa_header(d, 30, 100, 390)
    d.rectangle([30, 156, 390, 740], fill=(236, 229, 221))
    d.rounded_rectangle([44, 678, 300, 722], radius=20, fill="white", outline=(200, 200, 200))
    d.text((56, 692), "Typ een bericht", fill=(150, 150, 150), font=font(14))
    # paperclip rechts in typvak
    cx, cy = 268, 700
    d.arc([cx - 10, cy - 14, cx + 10, cy + 10], 200, 80, fill=(90, 90, 90), width=3)
    d.line([cx - 2, cy - 8, cx - 2, cy + 6], fill=(90, 90, 90), width=3)
    d.ellipse([cx - 22, cy - 22, cx + 22, cy + 22], outline=(200, 30, 30), width=4)
    d.ellipse([318, 680, 358, 720], fill=(37, 211, 102))
    d.polygon([(250, 655), (268, 685), (230, 685)], fill=(200, 30, 30))
    d.text((40, 735), "Android: tik op de paperclip / bijlage", fill=(100, 100, 100), font=font(13))
    save_shot(im, "android/c2-toevoegen.png")

    # iPhone: na + → menu met Foto's (lijststijl)
    im, d = draw_phone(440, 800)
    status_bar(d, 30, 36, 410)
    d.text((40, 70), "Foto's kiezen — iPhone", fill=NAVY, font=font(17))
    wa_header(d, 30, 100, 410)
    d.rectangle([30, 156, 410, 500], fill=(236, 229, 221))
    d.rounded_rectangle([40, 520, 400, 760], radius=18, fill="white", outline=(210, 210, 210))
    rows = [
        ("Camera", False),
        ("Foto's", True),
        ("Document", False),
        ("Locatie", False),
    ]
    y = 545
    for label, mark in rows:
        d.rounded_rectangle([60, y, 380, y + 40], radius=8, fill=(245, 245, 245))
        d.text((80, y + 10), label, fill=NAVY, font=font(16))
        if mark:
            d.rounded_rectangle([56, y - 2, 384, y + 42], radius=8, outline=(200, 30, 30), width=4)
            d.polygon([(330, y + 20), (360, y + 8), (360, y + 32)], fill=(200, 30, 30))
        y += 50
    save_shot(im, "ios/c2-fotos-galerij.png")

    # Android: bijlagemenu raster — behoud aangeleverde bron indien aanwezig
    galerij_bron = SHOTS / "_bron" / "c2-fotos-galerij.png"
    if galerij_bron.exists():
        Image.open(galerij_bron).convert("RGB").save(SHOTS / "android" / "c2-fotos-galerij.png")
        Image.open(galerij_bron).convert("RGB").save(SHOTS / "shared" / "c2-fotos-galerij.png")
        print("shot android/c2-fotos-galerij.png (from bron)")
    else:
        im, d = draw_phone(440, 800)
        status_bar(d, 30, 36, 410)
        d.text((40, 70), "Galerij kiezen — Android", fill=NAVY, font=font(17))
        wa_header(d, 30, 100, 410)
        d.rectangle([30, 156, 410, 480], fill=(236, 229, 221))
        d.rounded_rectangle([40, 500, 400, 760], radius=16, fill="white")
        items = [("Foto's", True), ("Camera", False), ("Document", False)]
        for i, (label, mark) in enumerate(items):
            x = 70 + i * 110
            d.ellipse([x, 540, x + 70, 610], fill=(120, 80, 160) if mark else (80, 140, 200))
            d.text((x + 8, 620), label, fill=NAVY, font=font(13))
            if mark:
                d.rounded_rectangle([x - 8, 530, x + 78, 650], radius=10, outline=(200, 30, 30), width=4)
        save_shot(im, "android/c2-fotos-galerij.png")
        save_shot(im, "shared/c2-fotos-galerij.png")

    im, d = draw_phone(440, 800)
    status_bar(d, 30, 36, 410)
    d.text((40, 70), "FOTO + PERSOON", fill=NAVY, font=font(18))
    wa_header(d, 30, 100, 410, mark=True)
    d.rectangle([30, 156, 410, 760], fill=(236, 229, 221))
    im.paste(Image.open(mug).resize((200, 200)), (120, 200))
    d.rounded_rectangle([116, 196, 324, 404], radius=8, outline=(200, 30, 30), width=3)
    d.text((110, 430), "1. Juiste foto?", fill=NAVY, font=font(18))
    d.text((110, 465), "2. Juiste persoon?", fill=NAVY, font=font(18))
    d.text((110, 510), "Dan pas VERSTUREN", fill=GOLD, font=font(18))
    save_shot(im, "shared/c2-foto-persoon.png")

    im, d = draw_phone(440, 800)
    status_bar(d, 30, 36, 410)
    d.text((40, 70), "Document ontvangen", fill=NAVY, font=font(17))
    wa_header(d, 30, 100, 410)
    d.rectangle([30, 156, 410, 760], fill=(236, 229, 221))
    d.rounded_rectangle([50, 210, 360, 330], radius=12, fill="white", outline=(200, 30, 30), width=3)
    d.rectangle([66, 226, 110, 280], fill=(200, 60, 60))
    d.text((70, 240), "PDF", fill="white", font=font(14))
    d.text((120, 230), "SeniorEase-oefendocument-C2.pdf", fill=NAVY, font=font(13))
    d.text((120, 255), "PDF-document", fill=(100, 100, 100), font=font(12))
    d.text((50, 360), "STOP — Verwachtte u dit?", fill=(200, 30, 30), font=font(18))
    save_shot(im, "shared/c2-document-ontvangen.png")

    # Document geopend (schematisch) + aparte terug-navigatie
    im = Image.new("RGB", (640, 800), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([40, 40, 600, 760], radius=16, fill="white", outline=GOLD, width=3)
    d.text((80, 80), "SeniorEase - Oefendocument C2", fill=NAVY, font=font(26))
    d.text((80, 160), "Gelukt!", fill=GOLD, font=font(40))
    d.text((80, 230), "U heeft het juiste document geopend.", fill=NAVY, font=font(22))
    d.rounded_rectangle([70, 70, 590, 120], outline=(200, 30, 30), width=3)
    save_shot(im, "shared/c2-document-geopend.png")

    im, d = draw_phone(440, 800)
    status_bar(d, 30, 36, 410)
    d.text((40, 70), "Terug vanuit document", fill=NAVY, font=font(17))
    d.rectangle([30, 100, 410, 760], fill=(250, 250, 250))
    d.rectangle([30, 100, 410, 156], fill=WA_GREEN)
    d.ellipse([40, 112, 78, 148], outline=(255, 220, 80), width=4)
    d.text((48, 116), "<", fill="white", font=font(22))
    d.polygon([(110, 130), (85, 118), (85, 142)], fill=(200, 30, 30))
    d.text((90, 118), "Terug", fill="white", font=font(16))
    d.text((70, 200), "SeniorEase-oefendocument-C2.pdf", fill=NAVY, font=font(14))
    d.text((70, 280), "Gelukt!", fill=GOLD, font=font(28))
    d.text((70, 330), "U heeft het juiste document geopend.", fill=NAVY, font=font(15))
    d.text((50, 700), "Tik op < om terug te gaan naar WhatsApp", fill=(100, 100, 100), font=font(13))
    save_shot(im, "shared/c2-document-terug.png")

    im, d = draw_phone(440, 800)
    status_bar(d, 30, 36, 410)
    d.text((40, 70), "Document terugvinden", fill=NAVY, font=font(17))
    wa_header(d, 30, 100, 410)
    d.rectangle([30, 156, 410, 760], fill=(236, 229, 221))
    d.text((160, 180), "Vandaag", fill=(100, 100, 100), font=font(12))
    d.rounded_rectangle([50, 220, 360, 320], radius=12, fill="white", outline=(200, 30, 30), width=3)
    d.rectangle([66, 236, 110, 280], fill=(200, 60, 60))
    d.text((70, 248), "PDF", fill="white", font=font(14))
    d.text((120, 245), "SeniorEase-oefendocument-C2.pdf", fill=NAVY, font=font(12))
    d.polygon([(300, 360), (280, 330), (320, 330)], fill=(200, 30, 30))
    save_shot(im, "shared/c2-document-terugvinden.png")

    # gallery choose flowers for eindmissie hint
    im, d = draw_phone(440, 800)
    status_bar(d, 30, 36, 410)
    d.text((40, 70), "Tweede oefenfoto kiezen", fill=NAVY, font=font(17))
    d.rectangle([30, 100, 410, 760], fill=(245, 245, 245))
    im.paste(Image.open(flowers).resize((160, 160)), (50, 160))
    im.paste(Image.open(mug).resize((160, 160)), (230, 160))
    d.rounded_rectangle([46, 156, 214, 324], radius=8, outline=(200, 30, 30), width=4)
    d.text((50, 340), "Eindmissiefoto", fill=NAVY, font=font(16))
    save_shot(im, "shared/c2-eindmissiefoto-kiezen.png")

    make_oefen_pdf(
        OEFEN / "SeniorEase-oefendocument-C2.pdf",
        "SeniorEase - Oefendocument C2",
        "Gelukt!",
        "U heeft het juiste document geopend.\n\n"
        "Dit is het oefendocument voor les C2.\n"
        "Gebruik dit bestand alleen om te oefenen met openen en terugvinden in WhatsApp.",
    )
    make_oefen_pdf(
        OEFEN / "SeniorEase-eindmissie-C2.pdf",
        "SeniorEase - Eindmissie C2",
        "Gelukt!",
        "U heeft het eindmissie-document geopend.\n\n"
        "Dit bestand is anders dan het oefendocument.\n"
        "Zo weet u zeker dat u het juiste document opnieuw kunt herkennen.",
    )
    for name in ["SeniorEase-oefendocument-C2.pdf", "SeniorEase-eindmissie-C2.pdf"]:
        (ROOT / name).write_bytes((OEFEN / name).read_bytes())
    print("done assets")


if __name__ == "__main__":
    main()
