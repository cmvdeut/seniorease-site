#!/usr/bin/env python3
"""G3 beamer-slides."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import BeamerPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-G3-Beamer-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = BeamerPDF("G3", "Goede vragen stellen")
    pdf.title_slide()

    pdf.concept_slide(
        "Methode",
        [
            "1. Wat wilt u?",
            "2. Belangrijke informatie",
            "3. Hoe wilt u het antwoord?",
        ],
    )
    pdf.concept_slide(
        "Voorbeeld",
        [
            "Schrijf een vriendelijke WhatsApp",
            "om mijn buurvrouw te bedanken",
            "voor het water geven van de planten.",
            "Maximaal 4 zinnen.",
        ],
        label="Voorbeeld",
    )
    pdf.concept_slide(
        "Vervolgvragen (live)",
        [
            "Korter. · Iets vriendelijker.",
            "Geef een voorbeeld.",
            "Maak er 5 stappen van.",
            "Ik begrijp stap 3 niet. Leg die nog eens uit.",
            "Leg het nog eenvoudiger uit, zonder moeilijke woorden.",
        ],
        label="Demo",
        note="Kleine wijziging = ander antwoord. Dat is de kracht.",
    )

    pdf.oefentaak_slide(
        1,
        "Duidelijke vraag",
        "methode toepassen",
        ["Typ de WhatsApp- of wifi-voorbeeldvraag", "Versturen - lees"],
        "u een bruikbaar antwoord ziet",
    )
    pdf.oefentaak_slide(
        2,
        "Vervolgvragen",
        "minstens drie vervolgen",
        [
            "In hetzelfde gesprek",
            "Probeer: korter / voorbeeld / zonder moeilijke woorden",
        ],
        "u drie vervolgen heeft gedaan",
    )
    pdf.oefentaak_slide(
        4,
        "Zelfstandig",
        "vraag + twee vervolgen",
        ["Eigen vraag met de methode", "Twee vervolgvragen"],
        "u vraag + twee vervolgen zelf heeft gedaan",
    )

    pdf.output(str(OUT))
    print(f"Beamer-PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
