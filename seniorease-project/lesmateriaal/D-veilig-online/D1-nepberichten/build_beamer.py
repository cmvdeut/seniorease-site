#!/usr/bin/env python3
"""D1 beamer — Een verdacht bericht veilig controleren v2.0 (C1–C4-productiemal).

Deelnemersbeamer: geen methodenamen, geen schoolse oefentaaklabels,
geen 7 observatiestappen op de eindmissiedia.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import DBeamerPDF  # noqa: E402

D1_VERSION = "v2.0"
D1_TITLE = "Een verdacht bericht veilig controleren"
OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-D1-Beamer-v2.pdf"
SHOTS = Path(__file__).resolve().parent / "assets" / "screenshots"
NOTE = "Uw scherm kan er iets anders uitzien. Dat is normaal."


def shot(pdf, title: str, filename: str, caption: str) -> None:
    image = SHOTS / filename
    if not image.exists():
        raise FileNotFoundError(f"D1 beamer vereist screenshot zonder placeholder: {image}")
    pdf.zaal_shot_slide(title, image, caption=caption, label="", note=NOTE)


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = DBeamerPDF("D1", D1_TITLE)
    pdf._slide_version = D1_VERSION

    # Opening
    pdf.concept_slide(
        D1_TITLE,
        ["Stoppen bij een onverwacht verzoek", "en zelf een officiële route kiezen"],
        label="",
    )
    pdf.concept_slide(
        "U krijgt een bericht: er zou iets mis zijn met uw account.",
        ["U moet snel op een link tikken.", "Wat doet u?"],
        label="",
    )

    # Kapstok
    shot(pdf, "Hoofdkapstok", "shared/d1-kapstok.png", "STOP → NIET VERDERGAAN → ZELF CONTROLEREN")
    pdf.concept_slide(
        "NIET BETALEN · GEEN CODE DELEN",
        ["NIET OP EEN ONVERWACHTE LINK TIKKEN"],
        label="",
    )
    pdf.concept_slide(
        "ONVERWACHT VERZOEK?",
        ["→ STOP", "→ ZELF CONTROLEREN"],
        label="",
    )

    # Bericht A
    pdf.concept_slide(
        "We kijken alleen naar dit voorbeeld.",
        ["Dit bericht staat niet op uw telefoon.", "Tik nergens."],
        label="",
    )
    shot(
        pdf,
        "Kijkvoorbeeld",
        "shared/d1-bericht-a.png",
        "SeniorEase-oefening — geen echt bericht",
    )
    pdf.concept_slide(
        "Een logo of nette tekst",
        ["bewijst niet dat het echt is."],
        label="",
    )
    pdf.concept_slide(
        "Wat doet u nu?",
        ["Niet: is dit echt of nep?", "U weet wat u veilig kunt doen."],
        label="",
    )

    # Navigatie A
    pdf.concept_slide(
        "Eerst: veilig navigeren oefenen",
        ["Nog niet: het accountprobleem controleren."],
        label="",
    )
    shot(
        pdf,
        "Begeleider toont: terug / verlaten",
        "shared/d1-demo-terug.png",
        "Op een veilig demoscherm — niet uw verdachte bericht",
    )
    shot(
        pdf,
        "iPhone — neutrale start",
        "ios/d1-startscherm.png",
        "Vanuit hier oefent u op uw toestel",
    )
    shot(
        pdf,
        "Android — neutrale start",
        "android/d1-startscherm.png",
        "Vanuit hier oefent u op uw toestel",
    )
    pdf.concept_slide(
        "Open zelf de browser",
        ["Typ zelf:", "seniorease.nl/uitleg/veiligheid"],
        label="",
    )
    shot(
        pdf,
        "iPhone — zelf typen",
        "ios/d1-browser-adres.png",
        "Adres zelf intypen — niet via een link",
    )
    shot(
        pdf,
        "Android — zelf typen",
        "android/d1-browser-adres.png",
        "Adres zelf intypen — niet via een link",
    )
    shot(
        pdf,
        "U bent op de veiligheidspagina",
        "shared/d1-veiligheidspagina.png",
        "Navigatieoefening A — controleroute geoefend",
    )

    # A ≠ B
    shot(
        pdf,
        "Twee verschillende oefeningen",
        "shared/d1-a-vs-b.png",
        "Navigatie oefenen ≠ passend controleren",
    )
    pdf.concept_slide(
        "Nu: zelf de officiële route",
        [
            "van de dienst waarover het bericht gaat.",
            "Geen inloggen nodig.",
        ],
        label="",
    )
    pdf.concept_slide(
        "Ik open zelf de officiële route",
        [
            "van de dienst waarover het bericht gaat",
            "en controleer daar of er werkelijk",
            "iets aan de hand is.",
        ],
        label="",
    )
    shot(
        pdf,
        "Accountbericht → DigiD / dienst",
        "shared/d1-digid-start.png",
        "Herkennen — niet inloggen",
    )
    pdf.concept_slide(
        "Nu u",
        ["Open zelf de passende dienst.", "Niet inloggen."],
        label="",
    )

    # Pauze
    pdf.concept_slide("Korte pauze", ["Daarna: een tweede situatie."], label="")

    # Bericht B
    pdf.concept_slide(
        "Nieuw kijkvoorbeeld",
        ["Wat doet u nu?"],
        label="",
    )
    shot(
        pdf,
        "Kijkvoorbeeld",
        "shared/d1-bericht-b.png",
        "SeniorEase-oefening — geen echt bericht",
    )
    pdf.concept_slide(
        "Bij een pakketbericht",
        ["→ zelf de officiële route van de vervoerder"],
        label="",
    )
    shot(
        pdf,
        "Pakketbericht → PostNL / vervoerder",
        "shared/d1-postnl-start.png",
        "Herkennen — niet inloggen",
    )
    pdf.concept_slide(
        "Nu u",
        ["Kies de passende route.", "Niet via de link in het bericht."],
        label="",
    )

    # Herhalen
    pdf.concept_slide(
        "Even herhalen",
        ["STOP → NIET VERDERGAAN → ZELF CONTROLEREN"],
        label="",
    )

    # Eindmissie — bericht C + open opdracht op één dia (geen stappenlijst)
    image_c = SHOTS / "shared/d1-bericht-c.png"
    if not image_c.exists():
        raise FileNotFoundError(f"D1 eindmissie vereist screenshot: {image_c}")
    pdf.eindmissie_open_slide(image_c, note=NOTE)

    pdf.concept_slide(
        "Gelukt?",
        [
            "Dan weet u wat u veilig kunt doen",
            "als een bericht onverwacht om actie vraagt:",
            "stoppen, niet verdergaan via het bericht,",
            "en zelf de officiële route van de juiste dienst kiezen.",
        ],
        label="",
    )

    pdf.output(str(OUT))
    print(f"Beamer geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
