#!/usr/bin/env python3
"""B2 Vensters, tabbladen, programma's."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import BLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-B2-Vensters-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = BLessonPDF(
        f"SeniorEase  |  B2 Vensters  |  Pakket B  |  {LESSON_VERSION}",
        package_label="Pakket B - Computer & laptop",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "B2 - Vensters, tabbladen en programma's",
        "Lesmiddag 90 minuten",
        "Programma minimaliseren en terugvinden via taakbalk, verschil programma "
        "en tabblad, twee tabbladen openen/wisselen/sluiten, tussen programma's wisselen.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op de computer)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket B (4 lessen): EUR 19,95",
            "Vorige: B1 - Volgende: B3",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Computer/laptop")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Vensterknoppen: minimaliseren, maximaliseren, sluiten",
            "Programma minimaliseren en terugvinden via taakbalk",
            "Verschil programma/venster en browser-tabblad",
            "Twee tabbladen openen, wisselen en een sluiten",
            "Tussen twee programma's wisselen",
            "Zelfstandig: minimaliseren - tabblad - wisselen",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Programma vs tabblad")
    pdf.bullet("Programma = hele app (Kladblok); terug via taakbalk")
    pdf.bullet("Tabblad = pagina in browser; klein kruisje sluit alleen tabblad")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.tijdlijn_item("12:25-12:38 - Vensterknoppen (oefentaak 1)", "Kladblok - streepje, vierkantje, kruisje.")
    pdf.tijdlijn_item("12:38-12:52 - Waar is mijn programma? (oefentaak 2)", "Minimaliseren - terug via taakbalk.")
    pdf.tijdlijn_item(
        "12:52-13:02 - Programma vs tabblad (uitleg)",
        "Groot kruisje = programma. Klein kruisje = tabblad.",
    )
    pdf.tijdlijn_item(
        "13:07-13:22 - Twee tabbladen (oefentaak 3)",
        "seniorease.nl - plusje - wisselen - een tabblad sluiten.",
    )
    pdf.tijdlijn_item("13:22-13:32 - Wisselen programma's (oefentaak 4)", "Kladblok + browser via taakbalk.")
    pdf.tijdlijn_item(
        "13:32-13:40 - Eindopdracht (oefentaak 5)",
        "Zelfstandig: minimaliseren - tabblad - wisselen.",
    )
    pdf.tijdlijn_item("13:40-13:45 - Afronding", "Nazorg. Volgende: B3.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap wisselen tussen programma's")
    pdf.bullet("Niet schrappen: minimaliseren + tabbladen + programma vs tabblad")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Vensters en programma's", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket B  -  {LESSON_VERSION}")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Vensterknoppen")
    pdf.numbered(2, "Minimaliseren en terugvinden")
    pdf.numbered(3, "Twee tabbladen")
    pdf.numbered(4, "Tussen programma's wisselen")
    pdf.numbered(5, "Zelfstandig oefenen")

    pdf.box(
        "Waar is mijn programma?",
        [
            "Niet weg - op de taakbalk onderaan.",
            "Klik op het icoon om terug te komen.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted(f"Versie {LESSON_VERSION.lstrip('v')}.")

    pdf.h2("Oefentaak 1 - Vensterknoppen")
    pdf.body("Streepje, vierkantje, kruisje.")

    pdf.h2("Oefentaak 2 - Minimaliseren en terugvinden")
    pdf.body("Streepje - icoon op taakbalk - terug.")

    pdf.h2("Oefentaak 3 - Twee tabbladen")
    pdf.body("+ - seniorease.nl - wisselen - klein kruisje op tabblad.")

    pdf.h2("Oefentaak 4 - Wisselen")
    pdf.body("Kladblok + browser via taakbalk.")

    pdf.h2("Oefentaak 5 - Zelfstandig")
    pdf.body("Minimaliseren - tabblad - wisselen.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in [
        "Pc's aan; browser werkt",
        "Wifi handig voor seniorease.nl",
        "Extra muizen",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
    ]:
        pdf.check(t)

    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Programma kwijt? Taakbalk. Tabblad dicht? Klein kruisje.",
            "Groot kruisje = hele programma sluiten.",
            "seniorease.nl",
            "Volgende les: B3 Bestanden en mappen.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
