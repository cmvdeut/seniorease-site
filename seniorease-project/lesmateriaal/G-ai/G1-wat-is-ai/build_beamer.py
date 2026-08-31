#!/usr/bin/env python3
"""G1 beamer-slides — gekoppeld aan draaiboek."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import BeamerPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-G1-Beamer-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = BeamerPDF("G1", "Wat is AI?")
    pdf.title_slide()

    pdf.concept_slide(
        "Wat is AI?",
        [
            "Technologie waarmee een computer bijvoorbeeld tekst,",
            "afbeeldingen of antwoorden kan maken",
            "en patronen kan herkennen.",
        ],
    )
    pdf.concept_slide(
        "Belangrijk om te weten",
        [
            "AI denkt niet zoals een mens.",
            "Het kan overtuigend klinken",
            "terwijl het antwoord toch fout is.",
        ],
    )
    pdf.concept_slide(
        "Waar ziet u al AI?",
        [
            "Spellingscontrole en aanbevelingen",
            "Foto's herkennen op de telefoon",
            "Vertalen · spraak naar tekst",
            "AI-chat zoals ChatGPT",
        ],
        note="Bespreek: welk voorbeeld herkent u?",
    )
    pdf.concept_slide(
        "Wat AI niet is",
        [
            "Geen mens die u kent",
            "Niet altijd waar",
            "Niet de enige bron bij gezondheid, geld of recht",
        ],
        label="Uitleg",
    )
    pdf.concept_slide(
        "Demo: appeltaart",
        [
            "Begeleider typt op het scherm:",
            "Geef een simpel recept voor Hollandse",
            "appeltaart voor 6 personen.",
            "Daarna: deelnemers proberen mee.",
        ],
        label="Demo",
        note="Geen geheimen typen. Meekijken mag.",
    )

    pdf.oefentaak_slide(
        1,
        "In eigen woorden",
        "weten wat u onder AI verstaat",
        ["Luister naar de beamer", "Zeg: AI is... (één zin)"],
        "u één zin over AI kunt zeggen",
    )
    pdf.oefentaak_slide(
        2,
        "Waar ziet u AI?",
        "één voorbeeld noemen",
        [
            "Kies: vertalen, foto, spraak, chat, spelling, ...",
            "Noem het aan uw buur",
        ],
        "u één voorbeeld kunt noemen",
    )
    pdf.oefentaak_slide(
        4,
        "Proef: appeltaart",
        "één keer zien hoe AI antwoord geeft",
        [
            "Open AI-chat (URL op A4) of kijk mee",
            "Typ het appeltaart-recept",
            "Zeg: Dit antwoord kan fout zijn",
        ],
        "u het antwoord heeft gezien",
        "Meekijken bij buur is OK.",
    )
    pdf.oefentaak_slide(
        5,
        "Zelfstandig",
        "uitleg + voorbeeld zelf",
        ["Zeg opnieuw wat AI is", "Noem één voorbeeld"],
        "u uitleg + voorbeeld zelf kunt",
    )

    pdf.output(str(OUT))
    print(f"Beamer-PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
