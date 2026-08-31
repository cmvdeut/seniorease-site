#!/usr/bin/env python3
"""Ft1 Zoeken - telefoon/tablet."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import FtLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-Ft1-Zoeken-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = FtLessonPDF(
        f"SeniorEase  |  Ft1 Zoeken  |  Pakket F  |  {LESSON_VERSION}",
        package_label="Pakket F - Internet (telefoon/tablet)",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "Ft1 - Iets opzoeken op Google",
        "Lesmiddag 90 minuten",
        "Op het eigen toestel: browser openen, specifieker zoeken, "
        "twee resultaten vergelijken. Gesponsord = advertentie — controleer of het klopt. "
        "Geen bord, geen computer.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket F-telefoon (4 lessen): EUR 19,95",
            "Volgende les: Ft2 Browser gebruiken",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon of tablet + wifi")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Browser openen (Chrome of Safari)",
            "Specifieker zoeken (bijv. bloemenwinkel + plaats)",
            "Twee resultaten vergelijken; Gesponsord = advertentie",
            "Zelfstandige eindopdracht",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen Google Maps (bonus)")
    pdf.bullet("Geen computer (F-computer)")

    pdf.h2("Tijdlijn")
    pdf.tijdlijn_item("Browser", "")
    pdf.tijdlijn_item("Specifieker zoeken", "")
    pdf.tijdlijn_item("Twee resultaten vergelijken", "")
    pdf.tijdlijn_item("Eigen vraag", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Niet schrappen: zoeken + vergelijken + eindopdracht")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Zoeken op Google", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket F  -  telefoon/tablet  -  {LESSON_VERSION}")
    pdf.ln(2)
    pdf.h2("Vandaag oefenen")
    pdf.numbered(1, "Browser openen")
    pdf.numbered(2, "Specifieker zoeken")
    pdf.numbered(3, "Twee resultaten vergelijken")
    pdf.numbered(4, "Eigen zoekvraag")
    pdf.numbered(5, "Zelfstandig")
    pdf.box(
        "Onthoud",
        [
            "Meerdere woorden helpen.",
            "Gesponsord = advertentie; controleer of dit echt het resultaat is dat u zoekt.",
            "Pijl terug = zoeklijst.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Eigen telefoon of tablet. Wifi aan.")
    for title, body in [
        ("Oefentaak 1 - Browser", "Chrome of Safari openen."),
        ("Oefentaak 2 - Specifieker", "bloemenwinkel, daarna bloemenwinkel + woonplaats."),
        (
            "Oefentaak 3 - Vergelijken",
            "Twee resultaten: titel, tekst, webadres. Gesponsord = advertentie. Open + terug.",
        ),
        ("Oefentaak 4 - Eigen vraag", "Bijv. kapper + plaats."),
        ("Oefentaak 5 - Zelfstandig", "Eigen zoekopdracht - vergelijken - openen - terug."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in [
        "Wifi + wachtwoord op A4",
        "Geen bord verplicht",
        "8-10x kaarten",
        "Helper Android/iPhone",
    ]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Meerdere woorden. Twee resultaten vergelijken. Pijl terug.",
            "Gesponsord = advertentie; controleer of het resultaat klopt.",
            "seniorease.nl",
            "Volgende: Ft2 Browser gebruiken.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
