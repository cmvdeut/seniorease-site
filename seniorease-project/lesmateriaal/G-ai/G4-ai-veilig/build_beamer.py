#!/usr/bin/env python3
"""G4 beamer-slides."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import BeamerPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-G4-Beamer-v1.pdf"

SLIDES = [
    (
        "Drie regels onthouden",
        "veilig omgaan met AI",
        [
            "Lees de A4-kaart van de begeleider",
            "Geen geheimen — altijd controleren",
            "Dokter, bank, juridisch: mens of officiële site",
        ],
        "u de drie regels kunt noemen (hardop tegen buur)",
    ),
    (
        "Kritisch lezen",
        "twijfel oefenen — AI klinkt zeker, maar is dat zo?",
        [
            "Typ: Noem drie bekende Nederlandse schilders",
            "Typ: Weet u dat zeker? Noem de bron",
            "Bespreek met buur: vertrouwt u dit blind?",
        ],
        "u heeft geoefend met even twijfelen",
    ),
    (
        "Wanneer géén AI",
        "weten wanneer u iemand anders vraagt",
        [
            "Noem één situatie waarin u géén AI gebruikt",
            "Bijv. pijn → huisarts, geld → bank",
            "Verdacht bericht → pakket D, overheid → pakket E",
        ],
        "u één situatie kunt noemen",
    ),
    (
        "Thuis verder leren",
        "nazorg — pakket G afronden",
        [
            "Open seniorease.nl/wat-is-ai",
            "Fraude → pakket D. Overheid → pakket E",
            "Pakket G is klaar — thuis herhalen mag",
        ],
        "u weet waar u hulp vindt",
    ),
]


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = BeamerPDF("G4", "AI veilig gebruiken")
    pdf.title_slide()
    for i, slide in enumerate(SLIDES, 1):
        note = slide[4] if len(slide) > 4 else None
        pdf.oefentaak_slide(i, slide[0], slide[1], slide[2], slide[3], note)
    pdf.output(str(OUT))
    print(f"Beamer-PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
