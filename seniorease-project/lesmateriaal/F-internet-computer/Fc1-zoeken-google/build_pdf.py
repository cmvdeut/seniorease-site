#!/usr/bin/env python3
"""Fc1 Zoeken met Google - computer."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import FLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-Fc1-Zoeken-Google-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = FLessonPDF(
        f"SeniorEase  |  Fc1 Zoeken met Google  |  Pakket F  |  {LESSON_VERSION}",
        package_label="Pakket F - Internet (computer)",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "Fc1 - Zoeken met Google",
        "Lesmiddag 90 minuten",
        "Op de computer: browser openen, zoekwoorden specifieker maken, "
        "resultaten rustig beoordelen. Gesponsord = advertentie — controleer of de site klopt. "
        "Primair Windows. Tabbladen: Fc2.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op de computer)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket F-computer (4 lessen): EUR 19,95",
            "Volgende les: Fc2 Websites en tabbladen",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Computer + internet  |  Primair Windows")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Browser openen (Edge of Chrome)",
            "Specifieker zoeken met meerdere woorden",
            "Resultaten beoordelen; Gesponsord = advertentie",
            "Resultaat openen en teruggaan",
            "Zelfstandige eindopdracht",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen tabbladen diep (Fc2)")
    pdf.bullet("Geen muislessen (B1)")
    pdf.bullet("Geen telefoon/tablet (F-telefoon)")

    pdf.h2("Tijdlijn")
    pdf.tijdlijn_item("Browser", "")
    pdf.tijdlijn_item("Specifieker zoeken", "")
    pdf.tijdlijn_item("Resultaten beoordelen", "")
    pdf.tijdlijn_item("Eigen vraag", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Niet schrappen: zoeken + beoordelen + eindopdracht")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Zoeken met Google", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket F  -  computer  -  {LESSON_VERSION}")
    pdf.ln(2)
    pdf.h2("Vandaag oefenen")
    pdf.numbered(1, "Browser openen")
    pdf.numbered(2, "Specifieker zoeken")
    pdf.numbered(3, "Resultaten beoordelen")
    pdf.numbered(4, "Eigen zoekvraag")
    pdf.numbered(5, "Zelfstandig")
    pdf.box(
        "Onthoud",
        [
            "Meerdere woorden helpen.",
            "Gesponsord = advertentie; controleer of dit echt de site is die u zoekt.",
            "Pijl terug = zoeklijst.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Tabbladen oefent u in Fc2.")
    for title, body in [
        ("Oefentaak 1 - Browser", "Open Edge of Chrome."),
        ("Oefentaak 2 - Specifieker", "Breed zoeken, dan specifiekere woorden. Vergelijk."),
        (
            "Oefentaak 3 - Beoordelen",
            "Titel, tekst, webadres. Gesponsord = advertentie. Open + pijl terug.",
        ),
        ("Oefentaak 4 - Eigen vraag", "Bijv. kapper + plaats of apotheek openingstijden."),
        ("Oefentaak 5 - Zelfstandig", "Eigen zoekopdracht - beoordelen - openen - terug."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in ["Pc's aan, internet werkt", "Extra muizen", "8-10x kaarten", "Helper Windows/Mac"]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Meerdere woorden. Resultaten rustig bekijken. Pijl terug.",
            "Gesponsord = advertentie; controleer of de site klopt.",
            "seniorease.nl",
            "Volgende: Fc2 Websites en tabbladen.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
