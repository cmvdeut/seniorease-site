#!/usr/bin/env python3
"""G1 beamer-slides — optioneel, naast print."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import BeamerPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-G1-Beamer-v1.pdf"

SLIDES = [
    (
        "In eigen woorden",
        "weten wat u onder AI verstaat",
        ["Luister naar de begeleider", "Zeg hardop: AI is... (één zin)"],
        "u één zin over AI kunt zeggen",
    ),
    (
        "Herken een voorbeeld",
        "zien dat u AI misschien al gebruikt",
        [
            "Kies één voorbeeld op uw toestel",
            "Spellingscontrole, spraakassistent, aanbevelingen of zoeken",
            "Noem het aan uw buur",
        ],
        "u één voorbeeld kunt noemen",
    ),
    (
        "Wat AI níet is",
        "realistische verwachting",
        [
            "Lees de A4-kaart van de begeleider",
            "Onthoud: geen mens, kan fout zitten",
            "Medisch/juridisch/geld: niet alleen op AI",
        ],
        "u het verschil kunt noemen tussen handig en altijd waar",
    ),
    (
        "Proef: appeltaart-recept",
        "één keer zien hoe AI antwoord geeft",
        [
            "Open AI-chat (URL op A4)",
            "Typ: Geef een simpel recept voor Hollandse appeltaart voor 6 personen",
            "Versturen — lees de ingredienten",
        ],
        "u het antwoord heeft gezien (zelf of meegekeken)",
        "Meekijken bij buur is OK. Geen wachtwoord of BSN typen.",
    ),
    (
        "Gids op seniorease.nl",
        "weten waar u thuis verder leest",
        [
            "Open browser",
            "Typ: seniorease.nl/wat-is-ai",
            "Blader kort door de pagina",
        ],
        "u de pagina heeft gezien",
    ),
]


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = BeamerPDF("G1", "Wat is AI?")
    pdf.title_slide()
    for i, slide in enumerate(SLIDES, 1):
        note = slide[4] if len(slide) > 4 else None
        pdf.oefentaak_slide(i, slide[0], slide[1], slide[2], slide[3], note)
    pdf.output(str(OUT))
    print(f"Beamer-PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
