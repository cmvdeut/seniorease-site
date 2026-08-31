#!/usr/bin/env python3
"""B4 Downloaden, printen, documenten openen."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import BLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-B4-Downloaden-Printen-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = BLessonPDF(
        f"SeniorEase  |  B4 Downloaden & printen  |  Pakket B  |  {LESSON_VERSION}",
        package_label="Pakket B - Computer & laptop",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "B4 - Downloaden, printen en documenten openen",
        "Lesmiddag 90 minuten",
        "Veilig document openen, veiligheidscheck vóór downloaden, terugvinden in "
        "Downloads, printen met pagina's controleren. Einde pakket B.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op de computer)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket B compleet - EUR 19,95 voor 4 lessen",
            "Alleen downloads die de begeleider aanwijst",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Wifi + optioneel printer")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Document in browser openen",
            "Vóór downloaden: veiligheidscheck (verwacht, bron, naam, pop-ups)",
            "Downloaden naar Downloads of Documenten",
            "Bestand terugvinden en openen",
            "Printen met aantal pagina's controleren",
            "Zelfstandig: openen - check - download - vinden - printvoorbeeld",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Regel")
    pdf.body(
        "Download/open alleen bestanden die u verwacht en waarvan u de bron vertrouwt."
    )

    pdf.h2("Veiligheidscheck vóór downloaden")
    pdf.numbered(1, "Verwacht ik dit bestand?")
    pdf.numbered(2, "Vertrouw ik de bron?")
    pdf.numbered(3, "Herken ik de bestandsnaam?")
    pdf.numbered(4, "Geen vreemde pop-ups?")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.tijdlijn_item("12:25-12:40 - Openen (oefentaak 1)", "")
    pdf.tijdlijn_item("12:40-12:55 - Check + downloaden (oefentaak 2)", "")
    pdf.tijdlijn_item("13:00-13:15 - Terugvinden (oefentaak 3)", "")
    pdf.tijdlijn_item(
        "13:15-13:28 - Printen (oefentaak 4)",
        "Ctrl+P - aantal pagina's controleren - Afdrukken of voorbeeld.",
    )
    pdf.tijdlijn_item("13:28-13:40 - Eindopdracht (oefentaak 5)", "")
    pdf.tijdlijn_item("13:40-13:45 - Afronding", "Pakket B compleet.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap echt printen")
    pdf.bullet("Niet schrappen: openen, check, downloaden, terugvinden")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Downloaden en printen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket B  -  {LESSON_VERSION}")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Document openen")
    pdf.numbered(2, "Veiligheidscheck + downloaden")
    pdf.numbered(3, "Terugvinden in Downloads")
    pdf.numbered(4, "Printen (pagina's controleren)")
    pdf.numbered(5, "Zelfstandig")

    pdf.box(
        "Vóór downloaden",
        [
            "Verwacht bestand? Betrouwbare bron?",
            "Herkenbare naam? Geen vreemde pop-ups?",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted(f"Alleen download van de begeleider. Versie {LESSON_VERSION.lstrip('v')}.")

    pdf.h2("Oefentaak 1 - Openen")
    pdf.body("Browser - link van begeleider.")

    pdf.h2("Oefentaak 2 - Check + downloaden")
    pdf.body("Vier vragen - Downloaden - Opslaan - wachten.")

    pdf.h2("Oefentaak 3 - Terugvinden")
    pdf.body("Verkenner - Downloads - dubbelklik.")

    pdf.h2("Oefentaak 4 - Printen")
    pdf.body("Ctrl+P - aantal pagina's controleren - Afdrukken of voorbeeld.")

    pdf.h2("Oefentaak 5 - Zelfstandig")
    pdf.body("Hele keten zelf doen.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in [
        "Wifi werkt",
        "Veilige oefen-PDF of link klaar",
        "Printer getest OF Print to PDF",
        "8-10x deelnemerskaart en oefentaken",
        "Helper tegen pop-ups",
    ]:
        pdf.check(t)

    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Alleen downloaden wat u verwacht van een bron die u vertrouwt.",
            "Terugvinden: Verkenner - Downloads.",
            "Printen: Ctrl+P - controleer aantal pagina's.",
            "seniorease.nl",
            "Pakket B is compleet. Opfrisser: les B1.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
