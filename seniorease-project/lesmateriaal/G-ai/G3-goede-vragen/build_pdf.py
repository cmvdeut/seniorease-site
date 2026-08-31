#!/usr/bin/env python3
"""G3 Goede vragen stellen."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-G3-Goede-Vragen-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = GLessonPDF(
        f"SeniorEase  |  G3 Goede vragen  |  Pakket G  |  {LESSON_VERSION}",
        package_label="Pakket G - AI voor dagelijks gebruik",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "G3 - Goede vragen stellen",
        "Lesmiddag 90 minuten",
        "Inclusief beamerpresentatie. Methode: Wat wilt u? + informatie + hoe wilt u "
        "het antwoord? Vervolgvragen: korter, eenvoudiger, voorbeeld, 5 stappen, "
        "leg stap 3 uit. Zonder moeilijke woorden.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken",
            "4. Zaalchecklist + nazorg",
            "Beamer-PDF in map beamer/",
        ],
        ["Versie 1.1 - augustus 2026", "Volgende: G4 AI veilig"],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Beamer eerst, daarna eigen toestel")

    pdf.h2("Methode")
    pdf.body("Wat wilt u? + belangrijke informatie + hoe wilt u het antwoord?")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Duidelijke vraag met de methode",
            "Vervolgvragen: korter, vriendelijker, voorbeeld, stappen, uitleg",
            "Drie soorten: uitleg, stappen, tekst",
            "Zelfstandige eindopdracht",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Tijdlijn (beamer)")
    pdf.tijdlijn_item("Methode op beamer", "")
    pdf.tijdlijn_item("Duidelijke vraag", "")
    pdf.tijdlijn_item("Live vervolgvragen", "")
    pdf.tijdlijn_item("Drie soorten", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Goede vragen stellen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket G  -  {LESSON_VERSION}")
    pdf.ln(2)
    pdf.box(
        "Methode",
        ["Wat wilt u? + belangrijke informatie + hoe wilt u het antwoord?"],
    )
    pdf.ln(2)
    pdf.h2("Handige vervolgvragen")
    pdf.bullet("Korter. / Iets vriendelijker. / Geef een voorbeeld.")
    pdf.bullet("Maak er 5 stappen van.")
    pdf.bullet("Ik begrijp stap 3 niet. Leg die nog eens uit.")
    pdf.bullet("Leg het nog eenvoudiger uit, zonder moeilijke woorden.")

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    for title, body in [
        (
            "Oefentaak 1 - Duidelijke vraag",
            "Bijv. vriendelijke WhatsApp bedanken buurvrouw, max. 4 zinnen.",
        ),
        ("Oefentaak 2 - Vervolgvragen", "Minstens drie vervolgen in hetzelfde gesprek."),
        ("Oefentaak 3 - Drie soorten", "Uitleg, stappenplan, korte tekst."),
        ("Oefentaak 4 - Zelfstandig", "Eigen vraag met methode + twee vervolgen."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorg")
    for t in ["Beamer-PDF", "Kaart slecht/goed", "AI-URL", "Print", "Helper"]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Methode: wat wilt u + info + hoe wilt u het antwoord.",
            "Vervolgvragen zijn goud waard: korter, eenvoudiger, voorbeeld, stappen.",
            "seniorease.nl/wat-is-ai/prompts",
            "Volgende: G4 AI veilig gebruiken.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
