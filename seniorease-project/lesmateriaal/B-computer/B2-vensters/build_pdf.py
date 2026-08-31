#!/usr/bin/env python3
"""B2 Vensters, tabbladen, programma's."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-B2-Vensters-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  B2 Vensters  |  Pakket B  |  v1.0",
        package_label="Pakket B - Computer & laptop")
    pdf.alias_nb_pages()

    pdf.cover(
        "B2 - Vensters, tabbladen en programma's",
        "Lesmiddag 90 minuten",
        "Op de computer: programma openen, vensterknoppen, wisselen via de taakbalk, "
        "tabblad in de browser. Geen presentatie verplicht.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op de computer)",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Pakket B (4 lessen): EUR 19,95",
            "Vorige: B1 - Volgende: B3",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Let op: kruisje op tabblad is iets anders dan kruisje van het hele venster.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Computer/laptop")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Een programma openen via Start",
            "Venster minimaliseren, maximaliseren, sluiten",
            "Tussen twee programma's wisselen via de taakbalk",
            "Een browser-tabblad openen en sluiten",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen mappen organiseren (B3)")
    pdf.bullet("Geen downloaden/printen (B4)")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Vensters en programma's vandaag.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam. Weleens een kruisje gemist?")
    pdf.h3("12:25-12:45 - Stap 1: vensterknoppen (oefentaak 1)")
    pdf.body("Start - Kladblok of browser. Streepje, vierkantje, kruisje.")
    pdf.h3("12:45-13:05 - Stap 2: wisselen (oefentaak 2)")
    pdf.body("Kladblok + browser. Wisselen via taakbalk.")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:30 - Stap 3: tabbladen (oefentaak 3)")
    pdf.body("Plusje - seniorease.nl - tabblad-kruisje.")
    pdf.h3("13:30-13:40 - Stap 4: verslepen (oefentaak 4)")
    pdf.body("Titelbalk vasthouden en slepen.")
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorg. Volgende: B3.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 4")
    pdf.bullet("Niet schrappen: knoppen, wisselen, een tabblad")

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
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket B  -  computer of laptop")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Vensterknoppen")
    pdf.numbered(2, "Wisselen via de taakbalk")
    pdf.numbered(3, "Tabblad openen en sluiten")
    pdf.numbered(4, "Venster verslepen")

    pdf.h2("Rechtsboven (Windows)")
    pdf.bullet("Streepje = minimaliseren")
    pdf.bullet("Vierkantje = groter / kleiner")
    pdf.bullet("Kruisje = programma sluiten")

    pdf.h2("Tabblad")
    pdf.bullet("Plusje (+) = nieuw tabblad")
    pdf.bullet("Klein kruisje op het tabblad = alleen dat tabblad dicht")

    pdf.box("Onthoud", ["Taakbalk onderaan: daar wisselt u tussen open programma's."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")

    pdf.h2("Oefentaak 1 - Vensterknoppen")
    pdf.numbered(1, "Open Kladblok of de browser via Start.")
    pdf.numbered(2, "Probeer streepje - terug via taakbalk.")
    pdf.numbered(3, "Probeer vierkantje.")
    pdf.body("Klaar als: u streepje en vierkantje heeft gebruikt.")

    pdf.h2("Oefentaak 2 - Wisselen")
    pdf.numbered(1, "Open Kladblok en de browser.")
    pdf.numbered(2, "Klik op de taakbalk heen en weer.")
    pdf.body("Klaar als: u kunt wisselen.")

    pdf.h2("Oefentaak 3 - Tabblad")
    pdf.numbered(1, "In de browser: klik op +")
    pdf.numbered(2, "Typ seniorease.nl - Enter.")
    pdf.numbered(3, "Sluit het tabblad met het kleine kruisje.")
    pdf.body("Klaar als: tabblad open en dicht. Geen wifi? Alleen + en sluiten.")

    pdf.h2("Oefentaak 4 - Verslepen")
    pdf.numbered(1, "Venster niet op volledig scherm.")
    pdf.numbered(2, "Sleep via de bovenste balk.")
    pdf.body("Klaar als: het venster is verplaatst.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Pc's aan; browser werkt",
        "Wifi handig voor seniorease.nl",
        "Extra muizen",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
    ]:
        pdf.check(t)

    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Streepje / vierkantje / kruisje rechtsboven. Taakbalk = wisselen.",
            "Browser: + voor nieuw tabblad; klein kruisje sluit alleen dat tabblad.",
            "seniorease.nl",
            "Volgende les: B3 Bestanden en mappen.",
        ]
    )
    pdf.h2("Licentie")
    pdf.body(
        "Copyright SeniorEase. Printen voor uzelf of een lesgroep mag. "
        "Niet doorverkopen zonder toestemming."
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
