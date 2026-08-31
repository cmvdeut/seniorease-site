#!/usr/bin/env python3
"""G2 beamer-slides."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import BeamerPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-G2-Beamer-v1.pdf"

SLIDES = [
    (
        "AI-chat openen",
        "de chatpagina vinden",
        [
            "Open Chrome, Safari of Edge",
            "Typ de URL van de A4 (bijv. chatgpt.com)",
            "Wacht tot het chatvenster zichtbaar is",
        ],
        "u het chatvenster of startscherm ziet",
        "Inloggen niet verplicht — helper helpt bij blokkerend scherm.",
    ),
    (
        "Eerste vraag",
        "een vraag typen en antwoord krijgen",
        [
            "Tik/klik in het typvak onderaan",
            "Typ: Leg wifi uit in eenvoudige taal voor een beginner",
            "Versturen — lees het antwoord rustig",
        ],
        "u een antwoord op het scherm ziet",
    ),
    (
        "Uw eigen vraag",
        "zelf iets praktisch vragen",
        [
            "Typ bijv.: Recept voor Hollandse erwtensoep voor 4 personen",
            "Of: Weer morgen in [uw plaats]",
            "Versturen — lees het antwoord",
        ],
        "u uw eigen vraag heeft gesteld",
        "Geen BSN, wachtwoord of medische gegevens.",
    ),
    (
        "Nieuw gesprek",
        "opnieuw beginnen zonder oude chat",
        [
            "Zoek Nieuw gesprek, + of New chat",
            "Tik/klik erop",
            "U ziet een leeg typvak",
        ],
        "u een lege chat heeft",
    ),
]


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = BeamerPDF("G2", "AI openen en gebruiken")
    pdf.title_slide()
    for i, slide in enumerate(SLIDES, 1):
        note = slide[4] if len(slide) > 4 else None
        pdf.oefentaak_slide(i, slide[0], slide[1], slide[2], slide[3], note)
    pdf.output(str(OUT))
    print(f"Beamer-PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
