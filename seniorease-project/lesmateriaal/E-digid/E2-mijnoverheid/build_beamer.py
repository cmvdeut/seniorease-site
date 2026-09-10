#!/usr/bin/env python3
"""E2 beamer — MijnOverheid gebruiken v2.0."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import EBeamerPDF, GOLD, NAVY  # noqa: E402

E2_VERSION = "v2.0"
E2_TITLE = "MijnOverheid gebruiken"
OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-E2-Beamer-v2.pdf"
SHOTS = Path(__file__).resolve().parent / "assets" / "screenshots"
NOTE = "Uw scherm kan er iets anders uitzien. Dat is normaal."


def shot(pdf, title: str, filename: str, caption: str) -> None:
    image = SHOTS / filename
    if not image.exists():
        raise FileNotFoundError(f"E2 beamer vereist screenshot: {image}")
    pdf.zaal_shot_slide(title, image, caption=caption, label="", note=NOTE)


def eindmissie(pdf: EBeamerPDF) -> None:
    pdf._bar("")
    pdf.set_xy(22, 24)
    pdf.set_font("DejaVu", "B", 16)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 7, "Eindmissie")

    pdf.set_xy(22, 42)
    pdf.set_font("DejaVu", "B", 20)
    pdf.multi_cell(253, 9, "U wilt kijken waar berichten van")
    pdf.set_xy(22, pdf.get_y() + 1)
    pdf.multi_cell(253, 9, "de overheid voor u kunnen staan.")
    pdf.set_xy(22, pdf.get_y() + 8)
    pdf.set_font("DejaVu", "B", 24)
    pdf.multi_cell(253, 11, "Wat doet u nu?")
    pdf.set_xy(22, pdf.get_y() + 8)
    pdf.set_font("DejaVu", "", 16)
    pdf.multi_cell(
        253,
        8,
        "Laat zien waar u zelf begint en waar u de Berichtenbox kunt vinden.",
    )
    pdf.set_xy(22, pdf.get_y() + 10)
    pdf.set_font("DejaVu", "I", 14)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(253, 7, "U hoeft niet in te loggen.")
    pdf.set_xy(22, pdf.get_y() + 6)
    pdf.set_font("DejaVu", "I", 12)
    pdf.multi_cell(253, 6, "Geen antwoorden van tevoren · doe dit zelf")
    pdf._foot()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = EBeamerPDF("E2", E2_TITLE)
    pdf._slide_version = E2_VERSION

    # Opening
    pdf.concept_slide(
        E2_TITLE,
        [
            "Zelf MijnOverheid openen",
            "en de Berichtenbox vinden",
        ],
        label="",
    )
    pdf.concept_slide(
        "Even zelf — zoals vorige keer",
        [
            "Open digid.nl.",
            "Vind Inloggen.",
            "Sluit weer.",
        ],
        label="",
    )
    pdf.concept_slide(
        "U hoort: er staat een bericht voor u",
        [
            "in MijnOverheid.",
            "Waar vindt u MijnOverheid?",
            "Waar staat de Berichtenbox?",
        ],
        label="",
    )
    pdf.concept_slide(
        "Vorige keer: DigiD.",
        [
            "Vandaag: MijnOverheid.",
            "U hoeft niet verplicht in te loggen.",
        ],
        label="",
    )

    # Kapstok + DigiD vs MO
    shot(
        pdf,
        "Bij MijnOverheid",
        "shared/e2-kapstok.png",
        "ZELF OPENEN → INLOGGEN HERKENNEN → BERICHTENBOX → TERUG → AFSLUITEN",
    )
    shot(
        pdf,
        "DigiD en MijnOverheid",
        "shared/e2-digid-vs-mo.png",
        "Niet hetzelfde · Berichtenbox hoort bij MijnOverheid",
    )

    # Openen
    pdf.concept_slide(
        "We openen MijnOverheid zelf.",
        ["Typ mijnoverheid.nl in de adresbalk."],
        label="",
    )
    shot(pdf, "Telefoon — adresbalk", "ios/e2-adresbalk.png", "Typ mijnoverheid.nl")
    shot(pdf, "Android — adresbalk", "android/e2-adresbalk.png", "Typ mijnoverheid.nl")
    shot(pdf, "Computer — adresbalk", "computer/e2-adresbalk.png", "Typ mijnoverheid.nl")
    pdf.concept_slide(
        "Nu u",
        ["Open MijnOverheid zelf.", "Nog niet inloggen."],
        label="",
    )

    # Inloggen herkennen
    shot(
        pdf,
        "mijnoverheid.nl",
        "shared/e2-mo-home.png",
        "Zoek: Inloggen met DigiD",
    )
    pdf.concept_slide(
        "KIJKEN / HERKENNEN",
        ["Niet: nu inloggen.", "Vul niets in."],
        label="",
    )
    shot(
        pdf,
        "Persoonlijke toegang",
        "shared/e2-digid-toegang.png",
        "MijnOverheid gebruikt DigiD",
    )
    pdf.concept_slide(
        "Nu u",
        ["Vind Inloggen met DigiD.", "Herken DigiD als toegang.", "Vul niets in."],
        label="",
    )

    # Demolaag deel 1
    pdf.concept_slide(
        "SeniorEase-oefenbeeld",
        [
            "Geen echte account.",
            "Zo ziet MijnOverheid er ongeveer uit.",
        ],
        label="",
    )
    shot(
        pdf,
        "Oefenbeeld — overzicht",
        "shared/e2-demo-overzicht.png",
        "Neutraal · geen echte gegevens",
    )
    shot(
        pdf,
        "Waar is de Berichtenbox?",
        "shared/e2-demo-berichtenbox-locatie.png",
        "Wijs aan op dit oefenbeeld",
    )
    pdf.concept_slide(
        "Nu u",
        ["Wijs de Berichtenbox aan.", "Nog geen bericht openen."],
        label="",
    )

    # Pauze
    pdf.concept_slide("Korte pauze", ["Daarna: terug oefenen."], label="")

    # Demolaag deel 2 — terugroute
    shot(
        pdf,
        "Berichtenbox-overzicht",
        "shared/e2-demo-berichtenbox-overzicht.png",
        "Fictief · niet openen · niet lezen",
    )
    shot(
        pdf,
        "Waar gaat u nu terug?",
        "shared/e2-demo-terug.png",
        "Kies zelf op het oefenbeeld",
    )
    shot(
        pdf,
        "Terug bij het overzicht",
        "shared/e2-demo-terug-bij-overzicht.png",
        "Route geoefend · geen bericht geopend",
    )
    pdf.concept_slide(
        "Nu u",
        [
            "Oefen de route nog eens.",
            "Berichtenbox vinden.",
            "Zelf terug.",
        ],
        label="",
    )

    # Afsluiten + privacy
    shot(
        pdf,
        "Veilig afsluiten",
        "shared/e2-afsluiten.png",
        "Niet ingelogd → sluiten",
    )
    shot(
        pdf,
        "Privacy",
        "shared/e2-privacy.png",
        "Codes en overheidsinformatie blijven privé",
    )

    # Open herhaling — GEEN stappenlijst
    pdf.concept_slide(
        "Probeer het nog een keer",
        [
            "U wilt weten waar berichten van",
            "de overheid voor u kunnen staan.",
            "Laat zien hoe u zelf begint.",
            "Gebruik het oefenbeeld waar dat nodig is.",
        ],
        label="",
    )

    # Eindmissie
    eindmissie(pdf)

    pdf.concept_slide(
        "Gelukt?",
        [
            "Dan weet u wat MijnOverheid is,",
            "opent u MijnOverheid zelf,",
            "en weet u waar de Berichtenbox",
            "te vinden is — ook zonder in te loggen.",
            "Volgende keer: iets regelen bij",
            "de digitale overheid.",
        ],
        label="",
    )

    pdf.output(str(OUT))
    print(f"Beamer geschreven: {OUT} ({pdf.page_no()} dia's)")
    return OUT


if __name__ == "__main__":
    build()
