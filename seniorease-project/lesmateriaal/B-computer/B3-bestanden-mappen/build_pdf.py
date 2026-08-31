#!/usr/bin/env python3
"""B3 Bestanden en mappen."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import BLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-B3-Bestanden-Mappen-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = BLessonPDF(
        f"SeniorEase  |  B3 Bestanden & mappen  |  Pakket B  |  {LESSON_VERSION}",
        package_label="Pakket B - Computer & laptop",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "B3 - Bestanden en mappen",
        "Lesmiddag 90 minuten",
        "Verkenner, map maken, opslaan met map controleren, Documenten vs Downloads, "
        "Naam wijzigen, Verkenner sluiten en bestand zelf terugvinden.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op de computer)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket B (4 lessen): EUR 19,95",
            "Vorige: B2 - Volgende: B4",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Computer/laptop")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Verkenner en Documenten openen",
            "Map aanmaken; map vs bestand",
            "Opslaan - altijd eerst: in welke map ben ik?",
            "Documenten vs Downloads begrijpen",
            "Hernoemen via Naam wijzigen (geen F2 als standaard)",
            "Verkenner sluiten en bestand zelf terugvinden",
            "Zelfstandig: opslaan - sluiten - terugvinden",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.tijdlijn_item("12:25-12:40 - Verkenner (oefentaak 1)", "Documenten. Kort: Documenten vs Downloads.")
    pdf.tijdlijn_item("12:40-12:52 - Map maken (oefentaak 2)", "Oefening SeniorEase.")
    pdf.tijdlijn_item(
        "12:52-13:05 - Opslaan (oefentaak 3)",
        "In welke map ben ik? - Opslaan als - oefening.",
    )
    pdf.tijdlijn_item("13:10-13:18 - Terugvinden (oefentaak 4)", "")
    pdf.tijdlijn_item(
        "13:18-13:25 - Naam wijzigen (oefentaak 5)",
        "Rechtermuisknop - Naam wijzigen - oefening-vandaag.",
    )
    pdf.tijdlijn_item("13:25-13:32 - Verkenner dicht (oefentaak 6)", "Sluiten - zelf opnieuw openen.")
    pdf.tijdlijn_item("13:32-13:40 - Eindopdracht (oefentaak 7)", "")
    pdf.tijdlijn_item("13:40-13:45 - Afronding", "Nazorg. Volgende: B4.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Niet schrappen: map + opslaan + zelf terugvinden")

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
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket B  -  {LESSON_VERSION}")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Verkenner / Documenten")
    pdf.numbered(2, "Map maken")
    pdf.numbered(3, "Opslaan (map controleren!)")
    pdf.numbered(4, "Terugvinden")
    pdf.numbered(5, "Naam wijzigen")
    pdf.numbered(6, "Verkenner dicht - zelf terug")
    pdf.numbered(7, "Zelfstandig")

    pdf.box(
        "Opslaan",
        [
            "Altijd eerst: In welke map ben ik?",
            "Documenten = zelf bewaren. Downloads = van internet (B4).",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted(f"Versie {LESSON_VERSION.lstrip('v')}.")

    pdf.h2("Oefentaak 1 - Verkenner")
    pdf.body("Documenten. Documenten vs Downloads.")

    pdf.h2("Oefentaak 2 - Map maken")
    pdf.body("Oefening SeniorEase.")

    pdf.h2("Oefentaak 3 - Opslaan")
    pdf.body("In welke map ben ik? - oefening - Opslaan.")

    pdf.h2("Oefentaak 4 - Terugvinden")
    pdf.body("Map - dubbelklik.")

    pdf.h2("Oefentaak 5 - Naam wijzigen")
    pdf.body("Rechtermuisknop - Naam wijzigen - oefening-vandaag.")

    pdf.h2("Oefentaak 6 - Verkenner dicht")
    pdf.body("Sluiten - zelf opnieuw vinden.")

    pdf.h2("Oefentaak 7 - Zelfstandig")
    pdf.body("Opslaan - sluiten - terugvinden.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in [
        "Pc's aan; Verkenner werkt",
        "Documenten bereikbaar",
        "Extra muizen",
        "8-10x deelnemerskaart en oefentaken",
        "Helper voor Opslaan als / OneDrive",
    ]:
        pdf.check(t)

    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Map = doos. Verkenner = gele map.",
            "Opslaan: in welke map ben ik? - naam - Opslaan.",
            "Naam wijzigen via menu, niet F2 als standaard.",
            "seniorease.nl",
            "Volgende les: B4 Downloaden en printen.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
