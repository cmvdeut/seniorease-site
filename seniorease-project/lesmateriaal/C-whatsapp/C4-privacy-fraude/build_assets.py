#!/usr/bin/env python3
"""C4 instructiebeelden — fictieve berichten + platformgetrouwe bedieningsroutes.

Bediening: iPhone en Android gelijkwaardig; apart waar de route echt verschilt.
Maximaal één rode markering per leermoment.
Geen privégegevens, geen echte nummers, geen klikbare links.
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
WA_TEAL = (0, 128, 105)  # huidige WhatsApp-header (licht thema)
WA_GREEN = (7, 94, 84)
WA_LIGHT = (236, 229, 221)
BG_LIST = (242, 242, 242)
WHITE = (255, 255, 255)
GRAY = (120, 120, 120)
ROW = (255, 255, 255)
RED = (200, 40, 40)
DANGER = (192, 57, 43)
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


def phone_frame(w=440, h=860, fill=WHITE):
    im = Image.new("RGB", (w, h), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([18, 18, w - 18, h - 18], radius=40, fill=fill, outline=(35, 35, 35), width=3)
    # notch / status area
    d.rounded_rectangle([160, 28, 280, 48], radius=10, fill=(30, 30, 30))
    return im, d


def status(d, x0=34, y0=52, x1=406, dark=False):
    col = (240, 240, 240) if dark else (25, 25, 25)
    d.text((x0 + 10, y0), "09:41", fill=col, font=font(15))
    d.text((x1 - 58, y0), "82%", fill=col, font=font(15))


def mark(d, box, width=3):
    d.rounded_rectangle(box, radius=10, outline=RED, width=width)


def label_bar(d, text, y=70):
    d.text((40, y), text, fill=NAVY, font=font(15))


def avatar(d, cx, cy, r=42, fill=(180, 180, 185)):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill)


def row_item(d, x0, y, x1, h, title, subtitle=None, danger=False, chevron=True, selected=False):
    d.rectangle([x0, y, x1, y + h], fill=ROW)
    tc = DANGER if danger else NAVY
    d.text((x0 + 18, y + (14 if not subtitle else 10)), title, fill=tc, font=font(16))
    if subtitle:
        d.text((x0 + 18, y + 34), subtitle, fill=GRAY, font=font(12))
    if chevron and not danger:
        d.text((x1 - 28, y + 12), "›", fill=(170, 170, 170), font=font(22))
    if selected:
        # radio / check
        d.ellipse([x1 - 42, y + h // 2 - 10, x1 - 22, y + h // 2 + 10], outline=ANDROID_TEAL, width=2)
        d.ellipse([x1 - 36, y + h // 2 - 4, x1 - 28, y + h // 2 + 4], fill=ANDROID_TEAL)
    d.line([x0 + 16, y + h, x1, y + h], fill=(230, 230, 230), width=1)


# ── Fictieve berichten (ongewijzigd inhoudelijk) ─────────────────────────────


def fictive_messages():
    # nieuw nummer
    im, d = phone_frame(h=820)
    status(d)
    label_bar(d, "Fictief oefenbericht")
    d.rectangle([30, 100, 410, 168], fill=WA_TEAL)
    d.text((44, 118), "‹", fill=WHITE, font=font(26))
    avatar(d, 88, 134, 22, (190, 190, 190))
    d.text((118, 122), "Onbekend nummer", fill=WHITE, font=font(15))
    d.rectangle([30, 168, 410, 760], fill=WA_LIGHT)
    lines = ["Hoi mam, dit is mijn nieuwe nummer.", "Mijn telefoon is kapot.", "Kun je me even helpen?"]
    y = 200
    bh = 18 + 22 * len(lines)
    d.rounded_rectangle([48, y, 370, y + bh], radius=14, fill=WHITE, outline=(210, 210, 210))
    yy = y + 12
    for line in lines:
        d.text((64, yy), line, fill=NAVY, font=font(14))
        yy += 22
    mark(d, [44, y - 4, 374, y + bh + 4])
    d.text((48, y + bh + 28), "SeniorEase-oefening — geen echt bericht", fill=GOLD, font=font(13))
    save(im, "shared/c4-bericht-nieuw-nummer.png")

    # geld
    im, d = phone_frame(h=820)
    status(d)
    label_bar(d, "Fictief vervolgbericht")
    d.rectangle([30, 100, 410, 168], fill=WA_TEAL)
    d.text((44, 118), "‹", fill=WHITE, font=font(26))
    avatar(d, 88, 134, 22, (190, 190, 190))
    d.text((118, 122), "Onbekend nummer", fill=WHITE, font=font(15))
    d.rectangle([30, 168, 410, 760], fill=WA_LIGHT)
    lines = ["Kun je 350 euro voor me betalen?", "Ik betaal het vanavond terug."]
    y = 200
    bh = 18 + 22 * len(lines)
    d.rounded_rectangle([48, y, 370, y + bh], radius=14, fill=WHITE, outline=(210, 210, 210))
    yy = y + 12
    for line in lines:
        d.text((64, yy), line, fill=NAVY, font=font(14))
        yy += 22
    mark(d, [44, y - 4, 374, y + bh + 4])
    d.text((48, y + bh + 28), "GELD + HAAST = reden om te STOPPEN", fill=RED, font=font(14))
    save(im, "shared/c4-bericht-geld.png")

    im, d = phone_frame(h=820)
    status(d)
    label_bar(d, "Fictief codebericht")
    d.rectangle([30, 100, 410, 168], fill=WA_TEAL)
    d.text((44, 118), "‹", fill=WHITE, font=font(26))
    avatar(d, 88, 134, 22, (190, 190, 190))
    d.text((118, 122), "Onbekend nummer", fill=WHITE, font=font(15))
    d.rectangle([30, 168, 410, 760], fill=WA_LIGHT)
    lines = [
        "Ik heb per ongeluk een code naar",
        "jouw telefoon laten sturen.",
        "Kun je die even doorgeven?",
    ]
    y = 200
    bh = 18 + 22 * len(lines)
    d.rounded_rectangle([48, y, 370, y + bh], radius=14, fill=WHITE, outline=(210, 210, 210))
    yy = y + 12
    for line in lines:
        d.text((64, yy), line, fill=NAVY, font=font(14))
        yy += 22
    mark(d, [44, y - 4, 374, y + bh + 4])
    d.text((48, y + bh + 28), "GEEN CODE DELEN", fill=RED, font=font(16))
    save(im, "shared/c4-bericht-code.png")

    im, d = phone_frame(h=820)
    status(d)
    label_bar(d, "Eindmissie — fictief")
    d.rectangle([30, 100, 410, 168], fill=WA_TEAL)
    d.text((44, 118), "‹", fill=WHITE, font=font(26))
    avatar(d, 88, 134, 22, (190, 190, 190))
    d.text((118, 122), "Onbekend nummer", fill=WHITE, font=font(15))
    d.rectangle([30, 168, 410, 760], fill=WA_LIGHT)
    lines = [
        "Hallo, ik help u met uw account.",
        "Er is iets mis.",
        "Stuur mij de code die u zojuist",
        "heeft ontvangen.",
        "Dit moet binnen 10 minuten.",
    ]
    y = 190
    bh = 18 + 22 * len(lines)
    d.rounded_rectangle([48, y, 370, y + bh], radius=14, fill=WHITE, outline=(210, 210, 210))
    yy = y + 12
    for line in lines:
        d.text((64, yy), line, fill=NAVY, font=font(14))
        yy += 22
    mark(d, [44, y - 4, 374, y + bh + 4])
    save(im, "shared/c4-eindmissie-bericht.png")

    # kapstok
    im = Image.new("RGB", (900, 560), CREAM)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([40, 40, 860, 520], radius=20, fill=WHITE, outline=GOLD, width=3)
    d.text((80, 70), "KLOPT EEN WHATSAPP-BERICHT NIET?", fill=NAVY, font=font(26))
    d.text((80, 130), "STOP", fill=RED, font=font(36))
    d.text((80, 190), "→ NIET VERDERGAAN", fill=NAVY, font=font(24))
    d.text((80, 250), "→ ZELF CONTROLEREN", fill=NAVY, font=font(24))
    d.text((80, 330), "NIET BETALEN  ·  GEEN CODE DELEN", fill=GOLD, font=font(18))
    d.text((80, 370), "NIET OP EEN ONVERWACHTE LINK TIKKEN", fill=GOLD, font=font(18))
    d.text((80, 440), "BEL ZELF VIA EEN NUMMER DAT U AL HAD", fill=NAVY, font=font(16))
    save(im, "shared/c4-kapstok.png")


# ── Platformgetrouwe bediening ───────────────────────────────────────────────


def ios_contact_info(mark_target: str):
    """Contactinfo iPhone: Blokkeer / Rapporteer contact onderaan (rood)."""
    im, d = phone_frame(h=900, fill=BG_LIST)
    status(d)
    label_bar(d, "iPhone — contactinformatie")
    # nav
    d.rectangle([30, 98, 410, 150], fill=WHITE)
    d.text((40, 112), "‹ Chats", fill=IOS_BLUE, font=font(16))
    d.text((160, 112), "Info", fill=NAVY, font=font(17))
    # profile
    avatar(d, 220, 220, 48, (175, 175, 180))
    d.text((128, 280), "Onbekend nummer", fill=NAVY, font=font(18))
    d.text((148, 308), "Fictief voorbeeld", fill=GRAY, font=font(13))
    # media row
    d.rounded_rectangle([48, 345, 392, 400], radius=12, fill=WHITE)
    d.text((68, 362), "Media, links en docs", fill=NAVY, font=font(15))
    d.text((350, 360), "›", fill=(170, 170, 170), font=font(20))
    # danger actions
    y_block = 430
    d.rounded_rectangle([48, y_block, 392, y_block + 56], radius=12, fill=WHITE)
    d.text((68, y_block + 16), "Blokkeer", fill=DANGER, font=font(16))
    y_rep = 500
    d.rounded_rectangle([48, y_rep, 392, y_rep + 56], radius=12, fill=WHITE)
    d.text((68, y_rep + 16), "Rapporteer contact", fill=DANGER, font=font(16))
    if mark_target == "block":
        mark(d, [44, y_block - 2, 396, y_block + 58])
        d.text((48, 590), "Stop VÓÓR definitieve bevestiging", fill=GOLD, font=font(14))
        d.text((48, 620), "Niemand daadwerkelijk blokkeren", fill=GRAY, font=font(13))
    else:
        mark(d, [44, y_rep - 2, 396, y_rep + 58])
        d.text((48, 590), "Rapporteren = melden bij WhatsApp", fill=GRAY, font=font(13))
        d.text((48, 618), "Niet hetzelfde als aangifte", fill=GRAY, font=font(13))
    return im


def android_contact_info(mark_target: str):
    """Contactinfo Android: Blokkeren / Rapporteren onderaan."""
    im, d = phone_frame(h=900, fill=BG_LIST)
    status(d)
    label_bar(d, "Android — contactinformatie")
    d.rectangle([30, 98, 410, 150], fill=WA_TEAL)
    d.text((44, 112), "‹", fill=WHITE, font=font(24))
    d.text((80, 116), "Contactinfo", fill=WHITE, font=font(17))
    avatar(d, 220, 220, 48, (175, 175, 180))
    d.text((128, 280), "Onbekend nummer", fill=NAVY, font=font(18))
    d.text((148, 308), "Fictief voorbeeld", fill=GRAY, font=font(13))
    d.rounded_rectangle([48, 345, 392, 400], radius=12, fill=WHITE)
    d.text((68, 362), "Media, links en docs", fill=NAVY, font=font(15))
    # actions
    y_block = 430
    d.rounded_rectangle([48, y_block, 392, y_block + 56], radius=12, fill=WHITE)
    d.text((68, y_block + 16), "Blokkeren", fill=DANGER, font=font(16))
    y_rep = 500
    d.rounded_rectangle([48, y_rep, 392, y_rep + 56], radius=12, fill=WHITE)
    d.text((68, y_rep + 16), "Rapporteren", fill=DANGER, font=font(16))
    if mark_target == "block":
        mark(d, [44, y_block - 2, 396, y_block + 58])
        d.text((48, 590), "Stop VÓÓR definitieve bevestiging", fill=GOLD, font=font(14))
        d.text((48, 620), "Niemand daadwerkelijk blokkeren", fill=GRAY, font=font(13))
    else:
        mark(d, [44, y_rep - 2, 396, y_rep + 58])
        d.text((48, 590), "Rapporteren = melden bij WhatsApp", fill=GRAY, font=font(13))
        d.text((48, 618), "Niet hetzelfde als aangifte", fill=GRAY, font=font(13))
    return im


def ios_open_contact_hint():
    """Stap vóór contactinfo: tik op de naam bovenaan in het gesprek."""
    im, d = phone_frame(h=820)
    status(d)
    label_bar(d, "iPhone — contactinformatie openen")
    d.rectangle([30, 100, 410, 168], fill=WA_TEAL)
    d.text((44, 118), "‹", fill=WHITE, font=font(26))
    avatar(d, 88, 134, 22, (190, 190, 190))
    d.text((118, 122), "Onbekend nummer", fill=WHITE, font=font(15))
    # mark name area = open contact info
    mark(d, [108, 112, 340, 156])
    d.rectangle([30, 168, 410, 760], fill=WA_LIGHT)
    d.rounded_rectangle([48, 210, 300, 270], radius=12, fill=WHITE)
    d.text((64, 230), "Hallo…", fill=NAVY, font=font(14))
    d.text((48, 320), "Tik op de naam bovenaan", fill=GOLD, font=font(15))
    d.text((48, 350), "→ daarna Blokkeren vinden", fill=NAVY, font=font(14))
    return im


def android_open_contact_hint():
    im, d = phone_frame(h=820)
    status(d)
    label_bar(d, "Android — contactinformatie openen")
    d.rectangle([30, 100, 410, 168], fill=WA_TEAL)
    d.text((44, 118), "‹", fill=WHITE, font=font(26))
    avatar(d, 88, 134, 22, (190, 190, 190))
    d.text((118, 122), "Onbekend nummer", fill=WHITE, font=font(15))
    mark(d, [108, 112, 340, 156])
    d.rectangle([30, 168, 410, 760], fill=WA_LIGHT)
    d.rounded_rectangle([48, 210, 300, 270], radius=12, fill=WHITE)
    d.text((64, 230), "Hallo…", fill=NAVY, font=font(14))
    d.text((48, 320), "Tik op de naam bovenaan", fill=GOLD, font=font(15))
    d.text((48, 350), "→ daarna Blokkeren vinden", fill=NAVY, font=font(14))
    return im


def confirm_stop_dialog(platform: str):
    """Bevestigingsdialoog — markeer Annuleren / stop vóór bevestigen."""
    im, d = phone_frame(h=820, fill=(40, 40, 40))
    status(d, dark=True)
    label_bar_col = (230, 230, 230)
    d.text((40, 70), f"{platform} — stop vóór bevestiging", fill=label_bar_col, font=font(15))
    # dimmed contact behind
    d.rectangle([60, 140, 380, 420], fill=(60, 60, 60))
    d.text((100, 200), "Blokkeer dit contact?", fill=(220, 220, 220), font=font(16))
    # dialog
    d.rounded_rectangle([70, 280, 370, 480], radius=16, fill=WHITE)
    d.text((100, 310), "Blokkeer dit contact?", fill=NAVY, font=font(17))
    d.text((100, 350), "Fictief voorbeeld — oefening", fill=GRAY, font=font(12))
    # Annuleren marked
    d.rounded_rectangle([95, 400, 210, 448], radius=10, fill=(245, 245, 245))
    d.text((118, 414), "Annuleren", fill=NAVY, font=font(14))
    mark(d, [91, 396, 214, 452])
    d.rounded_rectangle([230, 400, 345, 448], radius=10, fill=(245, 245, 245))
    d.text((252, 414), "Blokkeer", fill=DANGER, font=font(14))
    d.text((70, 520), "Hier stopt u. Bevestig niet in de les.", fill=GOLD, font=font(14))
    return im


def ios_privacy_open():
    """Instellingen-tab → Privacy (iPhone)."""
    im, d = phone_frame(h=900, fill=BG_LIST)
    status(d)
    label_bar(d, "iPhone — Privacy openen")
    d.rectangle([30, 98, 410, 150], fill=WHITE)
    d.text((180, 112), "Instellingen", fill=NAVY, font=font(18))
    # account row
    d.rounded_rectangle([48, 170, 392, 240], radius=12, fill=WHITE)
    avatar(d, 80, 205, 22, (37, 211, 102))
    d.text((115, 190), "Oefenaccount", fill=NAVY, font=font(15))
    d.text((115, 212), "Fictief — geen echte gegevens", fill=GRAY, font=font(11))
    # privacy row marked
    y = 270
    d.rounded_rectangle([48, y, 392, y + 56], radius=12, fill=WHITE)
    d.rounded_rectangle([60, y + 12, 92, y + 44], radius=6, fill=(0, 120, 215))
    d.text((110, y + 16), "Privacy", fill=NAVY, font=font(16))
    d.text((350, y + 14), "›", fill=(170, 170, 170), font=font(20))
    mark(d, [44, y - 2, 396, y + 58])
    # other rows (unmarked)
    for i, label in enumerate(["Gesprekken", "Meldingen", "Opslag en gegevens"]):
        yy = 350 + i * 58
        d.rounded_rectangle([48, yy, 392, yy + 50], radius=12, fill=WHITE)
        d.text((110, yy + 14), label, fill=NAVY, font=font(15))
        d.text((350, yy + 12), "›", fill=(170, 170, 170), font=font(18))
    # tab bar — Settings marked is the open path; mark is on Privacy row only
    d.rectangle([30, 780, 410, 860], fill=WHITE)
    d.line([30, 780, 410, 780], fill=(220, 220, 220))
    tabs = ["Updates", "Gesprekken", "Instellingen"]
    for i, t in enumerate(tabs):
        x = 55 + i * 115
        col = ANDROID_TEAL if t == "Instellingen" else GRAY
        d.text((x, 810), t[:10], fill=col, font=font(11))
    d.text((48, 720), "Route: Instellingen → Privacy", fill=GOLD, font=font(13))
    return im


def android_privacy_open():
    """Menu → Instellingen → Privacy (Android)."""
    im, d = phone_frame(h=900, fill=BG_LIST)
    status(d)
    label_bar(d, "Android — Privacy openen")
    d.rectangle([30, 98, 410, 160], fill=WA_TEAL)
    d.text((48, 118), "WhatsApp", fill=WHITE, font=font(20))
    # drie puntjes (menu)
    for dy in (112, 124, 136):
        d.ellipse([370, dy, 380, dy + 10], fill=WHITE)
    # overflow menu — één markering op Instellingen
    d.rounded_rectangle([200, 155, 400, 340], radius=10, fill=WHITE, outline=(210, 210, 210))
    items = [("Nieuwe groep", False), ("Instellingen", True), ("Schakelen", False)]
    yy = 170
    for label, m in items:
        d.text((220, yy), label, fill=NAVY, font=font(15))
        if m:
            mark(d, [210, yy - 6, 390, yy + 28])
        yy += 42
    d.text((48, 380), "Daarna: Instellingen → Privacy", fill=GOLD, font=font(14))
    d.rounded_rectangle([48, 430, 392, 560], radius=12, fill=WHITE)
    d.text((68, 450), "In Instellingen ziet u:", fill=GRAY, font=font(13))
    d.text((68, 485), "Privacy", fill=NAVY, font=font(16))
    d.text((68, 515), "Profielfoto · Laatst gezien · Groepen", fill=GRAY, font=font(12))
    return im


def privacy_menu_shared():
    """Privacy-hoofdlijst — gelijkwaardig op beide platformen."""
    im, d = phone_frame(h=900, fill=BG_LIST)
    status(d)
    label_bar(d, "Privacy-instellingen")
    d.rectangle([30, 98, 410, 150], fill=WA_TEAL)
    d.text((44, 112), "‹", fill=WHITE, font=font(22))
    d.text((80, 116), "Privacy", fill=WHITE, font=font(18))
    items = [
        ("Profielfoto", "Wie kan mijn foto zien?", False),
        ("Laatst gezien en online", "Wie kan dit zien?", False),
        ("Info", "Wie kan mijn info zien?", False),
        ("Groepen", "Wie kan me toevoegen?", False),
    ]
    y = 175
    for title, sub, m in items:
        d.rounded_rectangle([48, y, 392, y + 64], radius=12, fill=WHITE)
        d.text((68, y + 12), title, fill=NAVY, font=font(15))
        d.text((68, y + 36), sub, fill=GRAY, font=font(12))
        d.text((360, y + 18), "›", fill=(170, 170, 170), font=font(20))
        if m:
            mark(d, [44, y - 2, 396, y + 66])
        y += 74
    d.text((48, 500), "U kiest zelf wat u deelt", fill=GOLD, font=font(14))
    d.text((48, 530), "Bekijken mag — wijzigen hoeft niet", fill=GRAY, font=font(13))
    return im


def choice_screen(title: str, choices: list[str], mark_index: int, footer: str, filename: str):
    im, d = phone_frame(h=860, fill=BG_LIST)
    status(d)
    label_bar(d, title)
    d.rectangle([30, 98, 410, 150], fill=WA_TEAL)
    d.text((44, 112), "‹", fill=WHITE, font=font(22))
    short = title.split("—")[-1].strip() if "—" in title else title
    d.text((80, 116), short[:22], fill=WHITE, font=font(17))
    y = 180
    for i, label in enumerate(choices):
        d.rounded_rectangle([48, y, 392, y + 58], radius=12, fill=WHITE)
        d.text((68, y + 18), label, fill=NAVY, font=font(15))
        # radio
        d.ellipse([350, y + 16, 378, y + 44], outline=ANDROID_TEAL, width=2)
        if i == mark_index:
            d.ellipse([357, y + 23, 371, y + 37], fill=ANDROID_TEAL)
            mark(d, [44, y - 2, 396, y + 60])
        y += 68
    d.text((48, y + 20), footer, fill=GOLD, font=font(14))
    save(im, filename)
    return im


def duo(left: Image.Image, right: Image.Image, left_cap: str, right_cap: str, out: str):
    """Side-by-side duo voor shared-referentie."""
    w = left.width + right.width + 60
    h = max(left.height, right.height) + 80
    im = Image.new("RGB", (w, h), CREAM)
    d = ImageDraw.Draw(im)
    d.text((30, 20), left_cap, fill=NAVY, font=font(18))
    d.text((left.width + 50, 20), right_cap, fill=NAVY, font=font(18))
    im.paste(left, (20, 55))
    im.paste(right, (left.width + 40, 55))
    save(im, out)


def bediening():
    # Open contact
    save(ios_open_contact_hint(), "ios/c4-contactinfo-openen.png")
    save(android_open_contact_hint(), "android/c4-contactinfo-openen.png")

    # Blokkeren
    ios_b = ios_contact_info("block")
    and_b = android_contact_info("block")
    save(ios_b, "ios/c4-blokkeren.png")
    save(and_b, "android/c4-blokkeren.png")
    duo(ios_b, and_b, "iPhone", "Android", "shared/c4-blokkeren.png")

    # Stop vóór bevestiging
    save(confirm_stop_dialog("iPhone"), "ios/c4-blokkeren-stop.png")
    save(confirm_stop_dialog("Android"), "android/c4-blokkeren-stop.png")
    duo(
        confirm_stop_dialog("iPhone"),
        confirm_stop_dialog("Android"),
        "iPhone",
        "Android",
        "shared/c4-blokkeren-stop.png",
    )

    # Rapporteren
    ios_r = ios_contact_info("report")
    and_r = android_contact_info("report")
    save(ios_r, "ios/c4-rapporteren.png")
    save(and_r, "android/c4-rapporteren.png")
    duo(ios_r, and_r, "iPhone", "Android", "shared/c4-rapporteren.png")

    # Privacy openen (route verschilt)
    ios_p = ios_privacy_open()
    and_p = android_privacy_open()
    save(ios_p, "ios/c4-privacy-openen.png")
    save(and_p, "android/c4-privacy-openen.png")
    duo(ios_p, and_p, "iPhone", "Android", "shared/c4-privacy-openen.png")
    save(privacy_menu_shared(), "shared/c4-privacy-menu.png")

    # Privacy submenu's (bediening gelijkwaardig → shared)
    choice_screen(
        "Profielfoto — wie mag zien?",
        ["Iedereen", "Mijn contacten", "Mijn contacten behalve…", "Niemand"],
        1,
        "Geen voorschrift — u kiest zelf",
        "shared/c4-profielfoto.png",
    )
    choice_screen(
        "Laatst gezien / online",
        ["Iedereen", "Mijn contacten", "Mijn contacten behalve…", "Niemand"],
        1,
        "DEEL ALLEEN WAT U WILT DELEN",
        "shared/c4-laatst-gezien.png",
    )
    choice_screen(
        "Wie mag u aan groepen toevoegen?",
        ["Iedereen", "Mijn contacten", "Mijn contacten behalve…"],
        1,
        "Alleen herkennen — geen groep maken",
        "shared/c4-groepen-toevoegen.png",
    )


def main():
    fictive_messages()
    bediening()
    print("done assets")


if __name__ == "__main__":
    main()
