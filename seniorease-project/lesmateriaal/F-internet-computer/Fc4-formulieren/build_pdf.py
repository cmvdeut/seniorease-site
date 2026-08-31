#!/usr/bin/env python3
"""Fc4 Formulieren invullen - computer."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-Fc4-Formulieren-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF(
        "SeniorEase  |  Fc4 Formulieren  |  Pakket F  |  v1.1",
        package_label="Pakket F - Internet (computer)",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "Fc4 - Formulieren invullen",
        "Lesmiddag 90 minuten",
        "Contactformulier invullen en controleren. Vandaag niet verzenden.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        ["Versie 1.1 - augustus 2026", "Laatste les pakket F (computer)"],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Overheid/DigiD: pakket E.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Formulier openen",
            "Velden invullen",
            "Scrollen en controleren",
            "Weten wanneer wel verzenden",
        ],
        1,
    ):
        pdf.numbered(i, t)
    pdf.h2("Niet doen")
    pdf.bullet("Niet verzenden vandaag")
    pdf.bullet("Geen DigiD (pakket E)")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Formulieren invullen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.numbered(1, "Contactformulier openen")
    pdf.numbered(2, "Invullen - niet verzenden")
    pdf.numbered(3, "Controleren")
    pdf.box("Onthoud", ["Controleer altijd. Gemeente/DigiD = pakket E."])
    pdf.body("Vast? Hand opsteken.")

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.h2("Oefentaak 1")
    pdf.body("seniorease.nl - Contact.")
    pdf.h2("Oefentaak 2")
    pdf.body("Jan, test@voorbeeld.nl, Dit is een oefening. Niet op Verzenden.")
    pdf.h2("Oefentaak 3")
    pdf.body("Scrollen. Invoer nakijken. Eventueel corrigeren.")
    pdf.h2("Oefentaak 4")
    pdf.body("Thuis pas verzenden als u zeker bent.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in ["Pc's aan", "Internet", "8-10x kaarten"]:
        pdf.check(t)
    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Klik veld - typ - controleer - dan pas Verzenden.",
            "Gemeente, DigiD: pakket E.",
            "seniorease.nl",
            "Pakket F (computer) afgerond.",
        ]
    )
    pdf.h2("Licentie")
    pdf.body("Copyright SeniorEase.")

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
