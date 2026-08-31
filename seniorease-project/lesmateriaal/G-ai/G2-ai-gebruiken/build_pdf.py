#!/usr/bin/env python3
"""G2 AI openen en gebruiken."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-G2-AI-Gebruiken-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = GLessonPDF(
        f"SeniorEase  |  G2 AI gebruiken  |  Pakket G  |  {LESSON_VERSION}",
        package_label="Pakket G - AI voor dagelijks gebruik",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "G2 - AI openen en gebruiken",
        "Lesmiddag 90 minuten",
        "Inclusief beamerpresentatie voor de begeleider. Deelnemers oefenen daarna "
        "op hun eigen toestel. Vraag - antwoord - vervolgvraag - context in het gesprek. "
        "Nieuw gesprek vs verder praten. Geen geheimen.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken",
            "4. Zaalchecklist + nazorg",
            "Beamer-PDF in map beamer/",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Volgende: G3 Goede vragen stellen",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Beamer eerst, daarna eigen toestel")
    pdf.body("Didactiek: Kijken op de beamer - zelf doen - controleren - volgende stap.")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "AI-chat openen; verstuurknop herkennen",
            "Vraag - lezen - vervolgvraag - aanpassen",
            "Context in hetzelfde gesprek ervaren",
            "Verschil: verder praten vs nieuw gesprek",
            "Zelfstandige eindopdracht",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Tijdlijn (beamer)")
    pdf.tijdlijn_item("Openen", "")
    pdf.tijdlijn_item("Beamerdemo erwtensoep / 2 personen / boodschappenlijst", "")
    pdf.tijdlijn_item("Nieuw gesprek", "")
    pdf.tijdlijn_item("Eigen chat", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  AI openen en gebruiken", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket G  -  {LESSON_VERSION}")
    pdf.ln(2)
    pdf.h2("Vandaag")
    pdf.numbered(1, "Openen + versturen")
    pdf.numbered(2, "Gesprek: recept - 2 personen - boodschappenlijst")
    pdf.numbered(3, "Nieuw gesprek")
    pdf.numbered(4, "Eigen vraag + vervolg")
    pdf.numbered(5, "Zelfstandig")
    pdf.box(
        "Onthoud",
        [
            "In hetzelfde gesprek onthoudt AI de context.",
            "Nieuw gesprek = schone lei.",
            "Geen geheimen typen.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    for title, body in [
        ("Oefentaak 1 - Openen", "URL - typvak - verstuurknop."),
        (
            "Oefentaak 2 - Gesprek",
            "Erwtensoep - maak voor 2 - boodschappenlijstje. Zelfde gesprek.",
        ),
        ("Oefentaak 3 - Nieuw gesprek", "Nieuw gesprek / + . Leeg typvak."),
        ("Oefentaak 4 - Eigen + vervolg", "Eigen vraag + vervolg. Bonus: spraak."),
        ("Oefentaak 5 - Zelfstandig", "Openen - vraag - vervolg - nieuw gesprek."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorg")
    for t in ["Beamer-PDF", "AI-URL op A4", "Wifi", "Print oefentaken", "Helper"]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Vraag - lezen - vervolgvraag in hetzelfde gesprek.",
            "Nieuw gesprek = opnieuw beginnen.",
            "seniorease.nl/wat-is-ai/chatgpt",
            "Volgende: G3 Goede vragen stellen.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
