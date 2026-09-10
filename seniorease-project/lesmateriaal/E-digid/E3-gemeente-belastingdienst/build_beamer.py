#!/usr/bin/env python3
"""E3 beamer — Iets regelen bij de digitale overheid v2.0."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import EBeamerPDF, GOLD, NAVY  # noqa: E402

E3_VERSION = "v2.0"
E3_TITLE = "Iets regelen bij de digitale overheid"
OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-E3-Beamer-v2.pdf"
SHOTS = Path(__file__).resolve().parent / "assets" / "screenshots"
NOTE = "Uw scherm kan er iets anders uitzien. Dat is normaal."


def shot(pdf, title: str, filename: str, caption: str) -> None:
    image = SHOTS / filename
    if not image.exists():
        raise FileNotFoundError(f"E3 beamer vereist screenshot: {image}")
    pdf.zaal_shot_slide(title, image, caption=caption, label="", note=NOTE)


def eindmissie(pdf: EBeamerPDF) -> None:
    pdf._bar("")
    pdf.set_xy(22, 24)
    pdf.set_font("DejaVu", "B", 16)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 7, "Eindmissie")

    pdf.set_xy(22, 42)
    pdf.set_font("DejaVu", "B", 18)
    pdf.multi_cell(253, 9, "U wilt bij dezelfde gemeente weten waar u")
    pdf.set_xy(22, pdf.get_y() + 1)
    pdf.multi_cell(253, 9, "een paspoort of identiteitskaart kunt regelen.")
    pdf.set_xy(22, pdf.get_y() + 8)
    pdf.set_font("DejaVu", "B", 24)
    pdf.multi_cell(253, 11, "Wat doet u nu?")
    pdf.set_xy(22, pdf.get_y() + 8)
    pdf.set_font("DejaVu", "", 16)
    pdf.multi_cell(
        253,
        8,
        "Laat zien waar u zelf begint en vind waar u moet zijn.",
    )
    pdf.set_xy(22, pdf.get_y() + 10)
    pdf.set_font("DejaVu", "I", 14)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(
        253,
        7,
        "Stop voordat u persoonlijke gegevens invult,",
    )
    pdf.set_xy(22, pdf.get_y() + 1)
    pdf.multi_cell(253, 7, "een afspraak vastlegt of iets verstuurt.")
    pdf.set_xy(22, pdf.get_y() + 8)
    pdf.set_font("DejaVu", "I", 12)
    pdf.multi_cell(253, 6, "Geen antwoorden van tevoren · doe dit zelf")
    pdf._foot()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = EBeamerPDF("E3", E3_TITLE)
    pdf._slide_version = E3_VERSION

    # Opening
    pdf.concept_slide(
        E3_TITLE,
        [
            "Een officiële overheidsroute openen",
            "en vinden waar u moet beginnen",
        ],
        label="",
    )
    pdf.concept_slide(
        "Even zelf — vorige keer",
        [
            "U wilt weten waar berichten van",
            "de overheid voor u kunnen staan.",
            "Laat zien waar u zelf begint.",
        ],
        label="",
    )
    shot(pdf, "Vandaag", "shared/e3-situatie.png", "Waar begint u?")
    pdf.concept_slide(
        "Vorige keer: MijnOverheid.",
        [
            "Vandaag: waar beginnen bij",
            "een overheidstaak.",
        ],
        label="",
    )

    # Kapstok
    shot(
        pdf,
        "Bij de digitale overheid",
        "shared/e3-kapstok.png",
        "OFFICIËLE ROUTE OPENEN → TAAK VINDEN → PERSOONLIJK DEEL → NIETS AFRONDEN",
    )
    pdf.concept_slide(
        "Route vinden = succes",
        [
            "Taak uitvoeren = niet in deze les.",
            "We vragen niets echt aan.",
        ],
        label="",
    )
    pdf.concept_slide(
        "Oefenvoorbeeld",
        [
            "Gemeente Utrecht.",
            "Uw eigen gemeente kan er anders uitzien.",
            "Dat is normaal.",
        ],
        label="",
    )

    # Openen
    pdf.concept_slide(
        "We openen de officiële website zelf.",
        ["Typ utrecht.nl in de adresbalk."],
        label="",
    )
    shot(pdf, "Telefoon — adresbalk", "ios/e3-adresbalk.png", "Typ utrecht.nl")
    shot(pdf, "Android — adresbalk", "android/e3-adresbalk.png", "Typ utrecht.nl")
    shot(pdf, "Computer — adresbalk", "computer/e3-adresbalk.png", "Typ utrecht.nl")
    pdf.concept_slide(
        "Nu u",
        ["Open utrecht.nl zelf.", "Nog niets aanvragen."],
        label="",
    )

    # Taak A
    shot(pdf, "utrecht.nl", "shared/e3-utrecht-home.png", "Oefenvoorbeeld · zoeken mag")
    shot(
        pdf,
        "Zoek de taak",
        "shared/e3-taak-a-zoeken.png",
        "Verhuizing doorgeven",
    )
    pdf.concept_slide(
        "Nu u",
        ["Zoek: Verhuizing doorgeven.", "Nog niets invullen."],
        label="",
    )
    shot(
        pdf,
        "Verhuizing doorgeven",
        "shared/e3-taak-a-pagina.png",
        "Openbare pagina · nog niet verder",
    )

    # Persoonlijk + stop
    pdf.concept_slide(
        "Wat ziet u nu?",
        ["Hier begint het persoonlijke deel."],
        label="",
    )
    shot(
        pdf,
        "Hier stopt de oefening",
        "shared/e3-stoppunt.png",
        "U heeft gevonden waar u moet zijn",
    )
    pdf.concept_slide(
        "Nu u",
        ["Herken het persoonlijke deel.", "Stop. Vul niets in."],
        label="",
    )

    # Pauze
    pdf.concept_slide("Korte pauze", ["Daarna: opnieuw zelf."], label="")

    # Open herhaling
    shot(
        pdf,
        "Nog een keer",
        "shared/e3-herhaling.png",
        "Laat zien waar u zelf begint",
    )

    # Belastingdienst transfer
    shot(
        pdf,
        "Ook bij andere overheden",
        "shared/e3-belastingdienst.png",
        "Eerst officiële route · dan stoppen",
    )

    # Privacy + afsluiten
    shot(pdf, "Privacy", "shared/e3-privacy.png", "Codes en overheidsinformatie blijven privé")
    shot(pdf, "Veilig afsluiten", "shared/e3-afsluiten.png", "Niet ingelogd → sluiten")

    # Eindmissie — NO task B answer route
    eindmissie(pdf)

    pdf.concept_slide(
        "Gelukt?",
        [
            "Dan kunt u zelf een officiële",
            "overheidsroute openen,",
            "een taak vinden,",
            "en herkennen waar u moet beginnen —",
            "zonder iets af te ronden.",
            "Volgende keer: berichten van",
            "de overheid vinden en lezen.",
        ],
        label="",
    )

    pdf.output(str(OUT))
    print(f"Beamer geschreven: {OUT} ({pdf.page_no()} dia's)")
    return OUT


if __name__ == "__main__":
    build()
