#!/usr/bin/env python3
"""B3 Bestanden en mappen."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-B3-Bestanden-Mappen-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  B3 Bestanden & mappen  |  Pakket B  |  v1.0",
        package_label="Pakket B - Computer & laptop")
    pdf.alias_nb_pages()

    pdf.cover(
        "B3 - Bestanden en mappen",
        "Lesmiddag 90 minuten",
        "Op de computer: Verkenner openen, een map maken, een tekst opslaan en "
        "terugvinden. Mappen = dozen. Geen presentatie verplicht.",
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
            "Vorige: B2 - Volgende: B4",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Geen USB of cloud verplicht. Documenten op de pc is genoeg.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Computer/laptop")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Verkenner en Documenten openen",
            "Map en bestand uit elkaar houden",
            "Een map aanmaken",
            "Een tekst opslaan en terugvinden",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen USB verplicht")
    pdf.bullet("Geen cloud-account verplicht")
    pdf.bullet("Geen downloaden van internet (B4)")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Bewaren en terugvinden - mappen als dozen.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam. Weleens iets kwijt op de pc?")
    pdf.h3("12:25-12:45 - Stap 1: Verkenner (oefentaak 1)")
    pdf.body("Gele map / Verkenner - Documenten.")
    pdf.h3("12:45-13:05 - Stap 2: map maken (oefentaak 2)")
    pdf.body("Nieuw - Map - Oefening SeniorEase.")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:30 - Stap 3: opslaan (oefentaak 3)")
    pdf.body("Kladblok - Opslaan als - map kiezen - oefening.")
    pdf.h3("13:30-13:40 - Stap 4: terugvinden (oefentaak 4)")
    pdf.body("Verkenner - map - dubbelklik bestand.")
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorg. Volgende: B4.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Niet schrappen: map maken + opslaan + terugvinden")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Bestanden en mappen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket B  -  computer of laptop")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Verkenner / Documenten openen")
    pdf.numbered(2, "Een map maken")
    pdf.numbered(3, "Een bestand opslaan")
    pdf.numbered(4, "Het bestand terugvinden")

    pdf.h2("Map of bestand?")
    pdf.bullet("Map = doos (kan andere dingen bevatten)")
    pdf.bullet("Bestand = het document zelf (bijv. tekst of foto)")

    pdf.h2("Opslaan - stappen")
    pdf.numbered(1, "Bestand - Opslaan als")
    pdf.numbered(2, "Kies de map")
    pdf.numbered(3, "Geef een naam - Opslaan")

    pdf.box("Onthoud", ["Documenten - eigen map - opslaan - later terug via Verkenner."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")

    pdf.h2("Oefentaak 1 - Verkenner")
    pdf.numbered(1, "Open Verkenner (gele map).")
    pdf.numbered(2, "Ga naar Documenten.")
    pdf.body("Klaar als: u in Documenten bent.")

    pdf.h2("Oefentaak 2 - Map maken")
    pdf.numbered(1, "Nieuw - Map.")
    pdf.numbered(2, "Naam: Oefening SeniorEase - Enter.")
    pdf.body("Klaar als: de map zichtbaar is.")

    pdf.h2("Oefentaak 3 - Opslaan")
    pdf.numbered(1, "Open Kladblok - typ: Dit is mijn oefening.")
    pdf.numbered(2, "Bestand - Opslaan als.")
    pdf.numbered(3, "Kies de map Oefening SeniorEase.")
    pdf.numbered(4, "Naam: oefening - Opslaan.")
    pdf.body("Klaar als: opgeslagen zonder fout.")

    pdf.h2("Oefentaak 4 - Terugvinden")
    pdf.numbered(1, "Verkenner - Documenten - Oefening SeniorEase.")
    pdf.numbered(2, "Dubbelklik op oefening.")
    pdf.body("Klaar als: uw zin weer zichtbaar is.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Pc's aan; Verkenner werkt",
        "Documenten bereikbaar",
        "Extra muizen",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
        "Helper voor Opslaan als / OneDrive-keuze",
    ]:
        pdf.check(t)

    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Map = doos. Verkenner = gele map. Bewaar in Documenten in uw eigen map.",
            "Opslaan als - map kiezen - naam - Opslaan. Terug: zelfde map openen.",
            "seniorease.nl",
            "Volgende les: B4 Downloaden, printen en documenten openen.",
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
