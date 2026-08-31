#!/usr/bin/env python3
"""G3 beamer-slides."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import BeamerPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-G3-Beamer-v1.pdf"

SLIDES = [
    (
        "Een duidelijke vraag",
        "specifiek vragen — niet vaag",
        [
            "Open uw AI-chat",
            "Typ: Leg in max 5 korte zinnen uit wat wifi is, voor iemand van 70",
            "Versturen — lees het antwoord",
        ],
        "u een begrijpelijk antwoord ziet",
        "Tip: wie, wat, hoe kort — dat helpt AI.",
    ),
    (
        "Vervolgvraag",
        "bijsturen als het antwoord te moeilijk is",
        [
            "In hetzelfde gesprek typen",
            "Leg het nog simpeler uit, alsof u tegen mijn kleinkind praat",
            "Vergelijk met het eerste antwoord",
        ],
        "u een eenvoudiger antwoord heeft gelezen",
    ),
    (
        "Drie soorten vragen",
        "verschillende soorten hulp proberen",
        [
            "Uitleg: Wat is een QR-code? Kort antwoord",
            "Stappen: 4 stappen om een foto te maken met smartphone",
            "Tekst: Schrijf een korte sms dat ik later kom (2 zinnen)",
        ],
        "u drie antwoorden heeft gezien",
        "Elk apart versturen.",
    ),
    (
        "Uw eigen praktische vraag",
        "iets bedenken dat u echt wilt weten",
        [
            "Bedenk iets praktisch — geen BSN, medisch of bank",
            "Typ uw vraag — versturen",
            "Lees kritisch: zou u dit blind vertrouwen?",
        ],
        "u uw eigen vraag heeft gesteld",
    ),
]


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = BeamerPDF("G3", "Goede vragen stellen")
    pdf.title_slide()
    for i, slide in enumerate(SLIDES, 1):
        note = slide[4] if len(slide) > 4 else None
        pdf.oefentaak_slide(i, slide[0], slide[1], slide[2], slide[3], note)
    pdf.output(str(OUT))
    print(f"Beamer-PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
