#!/usr/bin/env python3
"""D4 beamer — Veilig online betalen v2.0."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import DBeamerPDF, GOLD, NAVY  # noqa: E402

D4_VERSION = "v2.0"
D4_TITLE = "Veilig online betalen"
OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-D4-Beamer-v2.pdf"
SHOTS = Path(__file__).resolve().parent / "assets" / "screenshots"
NOTE = "Uw scherm kan er iets anders uitzien. Dat is normaal."


def shot(pdf, title: str, filename: str, caption: str) -> None:
    image = SHOTS / filename
    if not image.exists():
        raise FileNotFoundError(f"D4 beamer vereist screenshot: {image}")
    pdf.zaal_shot_slide(title, image, caption=caption, label="", note=NOTE)


def eindmissie(pdf: DBeamerPDF) -> None:
    """Kaart D + open opdracht — geen checklist/antwoorden."""
    pdf._bar("")
    pdf.set_xy(22, 24)
    pdf.set_font("DejaVu", "B", 16)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 7, "Eindmissie")

    pdf.set_xy(22, 40)
    pdf.set_font("DejaVu", "B", 20)
    pdf.multi_cell(155, 9, "U komt bij een betaalmoment.")
    pdf.set_xy(22, pdf.get_y() + 4)
    pdf.set_font("DejaVu", "B", 22)
    pdf.multi_cell(155, 10, "Wat doet u nu?")
    pdf.set_xy(22, pdf.get_y() + 6)
    pdf.set_font("DejaVu", "", 15)
    pdf.multi_cell(
        155,
        7.5,
        "Laat zien hoe u controleert of de betaling past — "
        "en wat u doet bij twijfel.",
    )
    pdf.set_xy(22, pdf.get_y() + 8)
    pdf.set_font("DejaVu", "I", 12)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(155, 6, "Geen antwoorden van tevoren · doe dit zelf")

    img = SHOTS / "shared/d4-kaart-d.png"
    if not img.exists():
        raise FileNotFoundError(img)
    pdf.image(str(img), x=185, y=36, w=90)


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = DBeamerPDF("D4", D4_TITLE)
    pdf._slide_version = D4_VERSION

    # Opening
    pdf.concept_slide(
        D4_TITLE,
        [
            "Een betaalmoment controleren",
            "en bij twijfel niet bevestigen",
        ],
        label="",
    )
    pdf.concept_slide(
        "U wilt iets online kopen.",
        [
            "U komt bij het betaalmoment.",
            "Hoe controleert u of u de juiste",
            "betaling gaat bevestigen?",
        ],
        label="",
    )
    pdf.concept_slide(
        "Eerder oefende u stoppen en zelf controleren.",
        [
            "Vandaag: bij een betaalmoment kijken of de betaling past —",
            "en bij twijfel niet bevestigen.",
        ],
        label="",
    )

    # Kapstok
    shot(
        pdf,
        "Bij een betaalmoment",
        "shared/d4-kapstok.png",
        "VERWACHT → CONTROLEER → PAS DAN BEVESTIGEN",
    )
    pdf.concept_slide(
        "STOP → NIET VERDERGAAN",
        ["→ ZELF CONTROLEREN"],
        label="",
    )
    shot(
        pdf,
        "Vier betaalvragen",
        "shared/d4-vier-vragen.png",
        "Past dit bij wat u zelf wilde?",
    )
    pdf.concept_slide(
        "Een andere handelsnaam of betaalprovider",
        [
            "is niet automatisch fraude —",
            "wel reden om te controleren.",
            "Bij afwijking of twijfel: niet bevestigen.",
        ],
        label="",
    )

    # Bankroute
    pdf.concept_slide(
        "Open zelf de route van uw eigen bank.",
        [
            "De app die u al gebruikt,",
            "of het adres dat u zelf typt.",
        ],
        label="",
    )
    pdf.concept_slide(
        "Niet via een link of QR",
        ["uit een onverwacht bericht."],
        label="",
    )
    shot(pdf, "iPhone — uw bank", "ios/d4-bank-app.png", "Tot startscherm · niet inloggen")
    shot(pdf, "Android — uw bank", "android/d4-bank-app.png", "Tot startscherm · niet inloggen")
    shot(pdf, "iPhone — zelf typen", "ios/d4-bank-adres.png", "Bekend adres · zelf typen")
    shot(pdf, "Android — zelf typen", "android/d4-bank-adres.png", "Bekend adres · zelf typen")
    pdf.concept_slide(
        "Nu u",
        [
            "Open de route van uw eigen bank.",
            "Niet inloggen. Geen echte betaling.",
        ],
        label="",
    )

    # Kaart A — guided
    pdf.concept_slide(
        "We kijken naar een fictieve aankoop.",
        ["SeniorEase-oefening.", "Geen echte betaling."],
        label="",
    )
    shot(
        pdf,
        "Betaalkaart A",
        "shared/d4-kaart-a.png",
        "Oefening SeniorEase — geen echte betaling",
    )
    pdf.concept_slide(
        "Loop de vier vragen rustig langs.",
        [
            "Verwacht? Zelf begonnen?",
            "Bedrag? Ontvanger of context?",
        ],
        label="",
    )
    pdf.concept_slide(
        "Als deze vier dingen passen,",
        [
            "bewijst dat niet dat een betaling veilig is.",
            "U controleert of die past bij wat u zelf wilde.",
        ],
        label="",
    )

    # Zin
    shot(
        pdf,
        "Bij afwijking of twijfel",
        "shared/d4-nee-zin.png",
        "Nee, dit bevestig ik niet.",
    )
    pdf.concept_slide(
        "Nu u",
        ["Zeg de zin zelf — rustig.", "Alleen of met iemand naast u."],
        label="",
    )

    # Pauze
    pdf.concept_slide("Korte pauze", ["Daarna: een nieuwe betaalkaart."], label="")

    # Kaart B — NO answers
    pdf.concept_slide(
        "We kijken naar dit voorbeeld.",
        ["SeniorEase-oefening.", "Geen echte betaling."],
        label="",
    )
    shot(
        pdf,
        "Betaalkaart B",
        "shared/d4-kaart-b.png",
        "Oefening SeniorEase — geen echte betaling",
    )
    pdf.concept_slide("Wat doet u nu?", [], label="")
    # Answers only AFTER participant response — in lesson flow
    pdf.concept_slide(
        "Gebruik de vier betaalvragen.",
        ["Verwacht? Zelf begonnen? Bedrag? Context?"],
        label="",
    )
    pdf.concept_slide(
        "Nee, dit bevestig ik niet.",
        ["→ NIET BEVESTIGEN → ZELF CONTROLEREN"],
        label="",
    )
    pdf.concept_slide(
        "Een andere naam is niet automatisch fraude.",
        ["Wel reden om te controleren.", "Bij twijfel: niet bevestigen."],
        label="",
    )

    # Situatie C
    shot(
        pdf,
        "Onverwacht verzoek",
        "shared/d4-situatie-c.png",
        "STOP · NIET BETALEN · NIET OVERMAKEN",
    )
    pdf.concept_slide(
        "Kort:",
        ["Geen code, software of scherm delen."],
        label="",
    )

    # Herhalen
    pdf.concept_slide(
        "Even herhalen",
        [
            "VERWACHT → CONTROLEER → PAS DAN BEVESTIGEN",
            "Bij twijfel: niet bevestigen.",
        ],
        label="",
    )

    # Eindmissie — NO answers on beamer
    eindmissie(pdf)
    shot(
        pdf,
        "Eindmissie — betaalkaart",
        "shared/d4-kaart-d.png",
        "Oefening SeniorEase — geen echte betaling",
    )

    pdf.concept_slide(
        "Gelukt?",
        [
            "Dan weet u hoe u bij een betaalmoment",
            "controleert of de betaling past —",
            "en dat u bij twijfel niet bevestigt.",
            "Pakket D is compleet.",
        ],
        label="",
    )

    pdf.output(str(OUT))
    print(f"Beamer geschreven: {OUT} ({pdf.page_no()} dia’s)")
    return OUT


if __name__ == "__main__":
    build()
