#!/usr/bin/env python3
"""D2 beamer — Veilig omgaan met links en QR-codes v2.0 (deelnemersbeamer)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import DBeamerPDF, GOLD, NAVY  # noqa: E402

D2_VERSION = "v2.0"
D2_TITLE = "Veilig omgaan met links en QR-codes"
OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-D2-Beamer-v2.pdf"
SHOTS = Path(__file__).resolve().parent / "assets" / "screenshots"
NOTE = "Uw scherm kan er iets anders uitzien. Dat is normaal."


def shot(pdf, title: str, filename: str, caption: str) -> None:
    image = SHOTS / filename
    if not image.exists():
        raise FileNotFoundError(f"D2 beamer vereist screenshot zonder placeholder: {image}")
    pdf.zaal_shot_slide(title, image, caption=caption, label="", note=NOTE)


def eindmissie_assets(pdf: DBeamerPDF) -> None:
    """Open opdracht + kaart 3 + QR-2 — geen antwoorden / checklist."""
    pdf._bar("")
    pdf.set_xy(22, 24)
    pdf.set_font("DejaVu", "B", 16)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 7, "Eindmissie")

    pdf.set_xy(22, 40)
    pdf.set_font("DejaVu", "B", 20)
    pdf.multi_cell(160, 9, "U krijgt een link-voorbeeld en een QR.")
    pdf.set_xy(22, pdf.get_y() + 4)
    pdf.set_font("DejaVu", "B", 22)
    pdf.multi_cell(160, 10, "Wat doet u nu?")
    pdf.set_xy(22, pdf.get_y() + 6)
    pdf.set_font("DejaVu", "", 16)
    pdf.multi_cell(
        160,
        8,
        "Laat zien hoe u zelf typt, het echte domein aanwijst, en de QR-bestemming eerst bekijkt.",
    )
    pdf.set_xy(22, pdf.get_y() + 8)
    pdf.set_font("DejaVu", "I", 12)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(160, 6, "Geen antwoorden van tevoren · doe dit zelf")

    kaart = SHOTS / "shared/d2-domein-kaart3-open.png"
    qr = SHOTS / "shared/d2-qr2-eindmissie-bare.png"
    if not kaart.exists() or not qr.exists():
        raise FileNotFoundError("Eindmissie vereist open kaart 3 en QR-2")

    # Rechts: open kaart 3 (zonder antwoord) + QR-2
    pdf.image(str(kaart), x=190, y=36, w=85)
    pdf.image(str(qr), x=205, y=118, w=55)
    pdf.set_xy(190, 178)
    pdf.set_font("DejaVu", "", 11)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(85, 5, "Kaart 3 · QR-2")


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = DBeamerPDF("D2", D2_TITLE)
    pdf._slide_version = D2_VERSION

    # Opening
    pdf.concept_slide(
        D2_TITLE,
        [
            "Zelf een webadres kiezen",
            "en de bestemming van een QR eerst bekijken",
        ],
        label="",
    )
    pdf.concept_slide(
        "U krijgt een bericht met een link.",
        ["Hoe weet u waar u terechtkomt?", "Wat doet u als u twijfelt?"],
        label="",
    )
    pdf.concept_slide(
        "Eerder stopte u bij een onverwacht verzoek.",
        [
            "Vandaag: zelf typen",
            "en eerst kijken waar een link of QR u naartoe brengt.",
        ],
        label="",
    )

    # Kapstok
    shot(pdf, "Bij een link of QR", "shared/d2-kapstok.png", "STOP → NIET VERDERGAAN → ZELF CONTROLEREN")
    pdf.concept_slide(
        "QR",
        [
            "SCANNEN → BESTEMMING BEKIJKEN",
            "→ CONTROLEREN → PAS DAN VERDER",
        ],
        label="",
    )
    pdf.concept_slide(
        "NIET BETALEN · GEEN CODE DELEN",
        ["NIET OP EEN ONVERWACHTE LINK TIKKEN"],
        label="",
    )
    shot(
        pdf,
        "Slotje of HTTPS",
        "shared/d2-slotje-geen-bewijs.png",
        "Geen bewijs dat een website betrouwbaar is",
    )

    # Zelf typen
    pdf.concept_slide(
        "Typ zelf een webadres dat u kent",
        ["Niet via de link in een bericht.", "Niet inloggen."],
        label="",
    )
    shot(pdf, "iPhone — browser openen", "ios/d2-browser-openen.png", "Open eerst de browser")
    shot(pdf, "Android — browser openen", "android/d2-browser-openen.png", "Open eerst de browser")
    pdf.concept_slide("Typ zelf", ["digid.nl"], label="")
    shot(pdf, "iPhone — adres zelf typen", "ios/d2-browser-adres.png", "Adresbalk — zelf getypt")
    shot(pdf, "Android — adres zelf typen", "android/d2-browser-adres.png", "Adresbalk — zelf getypt")
    pdf.concept_slide("Nu u", ["Open de browser.", "Typ digid.nl.", "Kijk in de adresbalk."], label="")

    # Domein
    shot(pdf, "Zo kijkt u", "shared/d2-domein-methode.png", "Eenvoudig — niets openen")
    pdf.concept_slide(
        "Alleen kijken",
        ["Deze voorbeelden openen we niet.", "Niet klikbaar."],
        label="",
    )
    shot(pdf, "Kijkkaart 1", "shared/d2-domein-kaart1.png", "iets.digid.nl → website digid.nl")
    shot(
        pdf,
        "Kijkkaart 2",
        "shared/d2-domein-kaart2.png",
        "digid.nl.nepsite.com → website nepsite.com",
    )
    pdf.concept_slide(
        "Een bekende naam ervoor",
        ["maakt de website niet automatisch officieel."],
        label="",
    )

    # Link in bericht
    pdf.concept_slide(
        "We kijken alleen naar dit voorbeeld.",
        ["Dit bericht staat niet op uw telefoon.", "Tik nergens."],
        label="",
    )
    shot(
        pdf,
        "Kijkvoorbeeld",
        "shared/d2-bericht-link.png",
        "SeniorEase-oefening — geen echte link",
    )
    pdf.concept_slide(
        "Bij twijfel",
        ["Wegleggen.", "Zelf een bekend adres typen."],
        label="",
    )

    # Pauze
    pdf.concept_slide("Korte pauze", ["Daarna: een QR scannen."], label="")

    # QR-1
    pdf.concept_slide(
        "Scan de QR.",
        [
            "Kijk naar de melding die verschijnt.",
            "Bekijk welke website of bestemming wordt genoemd",
            "voordat u erop tikt.",
        ],
        label="",
    )
    pdf.concept_slide(
        "Een QR op een vertrouwde plek",
        ["is niet automatisch veilig.", "Eerst bestemming bekijken."],
        label="",
    )
    shot(pdf, "iPhone — scannen", "ios/d2-qr-scannen.png", "Scan de QR van de begeleider")
    shot(pdf, "Android — scannen", "android/d2-qr-scannen.png", "Scan de QR van de begeleider")
    shot(
        pdf,
        "QR-1 — oefening",
        "shared/d2-qr1-veiligheid-bare.png",
        "Alleen de QR van de begeleider",
    )
    shot(pdf, "iPhone — melding bekijken", "ios/d2-qr-melding.png", "Eerst bestemming — dan openen of stoppen")
    shot(
        pdf,
        "Android — melding bekijken",
        "android/d2-qr-melding.png",
        "Eerst bestemming — dan openen of stoppen",
    )
    pdf.concept_slide(
        "Nu u",
        [
            "Scan QR-1.",
            "Bekijk de bestemming.",
            "Daarna pas openen of stoppen.",
        ],
        label="",
    )

    # Herhalen
    pdf.concept_slide(
        "Even herhalen",
        [
            "STOP → NIET VERDERGAAN → ZELF CONTROLEREN",
            "SCANNEN → BESTEMMING BEKIJKEN → CONTROLEREN → PAS DAN VERDER",
        ],
        label="",
    )

    # Eindmissie
    eindmissie_assets(pdf)
    shot(
        pdf,
        "Eindmissie — kijkkaart 3",
        "shared/d2-domein-kaart3-open.png",
        "Alleen kijken — niet openen · geen antwoord vooraf",
    )
    shot(pdf, "Eindmissie — QR-2", "shared/d2-qr2-eindmissie-bare.png", "Andere bestemming dan QR-1")

    pdf.concept_slide(
        "Gelukt?",
        [
            "Dan weet u hoe u zelf een webadres kiest,",
            "waar u naar de echte websitenaam kijkt,",
            "en hoe u bij een QR eerst de bestemming bekijkt",
            "vóór u verdergaat.",
        ],
        label="",
    )

    pdf.output(str(OUT))
    print(f"Beamer geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
