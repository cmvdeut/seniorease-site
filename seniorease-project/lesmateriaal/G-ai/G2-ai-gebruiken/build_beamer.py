#!/usr/bin/env python3
"""G2 beamer-slides."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import BeamerPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-G2-Beamer-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = BeamerPDF("G2", "AI openen en gebruiken")
    pdf.title_slide()

    pdf.concept_slide(
        "Vandaag op de beamer",
        [
            "Eerst kijken hoe een gesprek werkt",
            "Daarna doet u het zelf op uw toestel",
        ],
    )
    pdf.concept_slide(
        "Demo: één gesprek",
        [
            "1. Geef mij een eenvoudig recept voor erwtensoep.",
            "2. Maak het voor 2 personen.",
            "3. Maak een boodschappenlijstje.",
        ],
        label="Demo",
        note="AI onthoudt binnen dit gesprek de context.",
    )
    pdf.concept_slide(
        "Zelfde gesprek of nieuw?",
        [
            "Zelfde gesprek = AI onthoudt wat u eerder vroeg",
            "Nieuw gesprek = schone lei",
        ],
    )

    pdf.oefentaak_slide(
        1,
        "AI openen",
        "typvak en versturen vinden",
        ["Open de URL van de A4", "Zoek typvak en verstuurknop (pijl)"],
        "u typvak en versturen ziet",
        "Inloggen niet verplicht.",
    )
    pdf.oefentaak_slide(
        2,
        "Gesprek met vervolg",
        "context in één gesprek ervaren",
        [
            "Typ het erwtensoep-recept",
            "Zelfde gesprek: Maak het voor 2 personen",
            "Daarna: Maak een boodschappenlijstje",
        ],
        "u drie antwoorden in één gesprek heeft",
    )
    pdf.oefentaak_slide(
        3,
        "Nieuw gesprek",
        "schone lei starten",
        ["Zoek Nieuw gesprek of +", "U ziet een leeg typvak"],
        "u een lege chat heeft",
    )
    pdf.oefentaak_slide(
        5,
        "Zelfstandig",
        "hele route zelf",
        ["Openen", "Vraag + vervolgvraag", "Nieuw gesprek"],
        "u de route zelf kent",
    )

    pdf.output(str(OUT))
    print(f"Beamer-PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
