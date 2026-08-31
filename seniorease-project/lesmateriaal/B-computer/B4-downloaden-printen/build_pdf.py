#!/usr/bin/env python3
"""B4 Downloaden, printen, documenten openen."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-B4-Downloaden-Printen-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  B4 Downloaden & printen  |  Pakket B  |  v1.0",
        package_label="Pakket B - Computer & laptop")
    pdf.alias_nb_pages()

    pdf.cover(
        "B4 - Downloaden, printen en documenten openen",
        "Lesmiddag 90 minuten",
        "Op de computer: een veilig document openen, downloaden, terugvinden en printen "
        "(of printvoorbeeld / Print to PDF). Einde pakket B.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op de computer)",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Pakket B compleet - EUR 19,95 voor 4 lessen",
            "Alleen downloads die de begeleider aanwijst",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Geen verdachte pop-ups. Geen printer? Printvoorbeeld telt als geslaagd.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Wifi + optioneel printer")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Een document in de browser openen",
            "Veilig downloaden naar Downloads of Documenten",
            "Het bestand terugvinden en openen",
            "Printen of printvoorbeeld / Print to PDF gebruiken",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen verdachte downloads of virus-pop-ups")
    pdf.bullet("Geen betaalde software installeren")
    pdf.bullet("Geen printerdrivers uitdiepen")

    pdf.h2("Voorbereiding")
    pdf.bullet("Veilige oefen-PDF of bekende link klaarzetten")
    pdf.bullet("Printer getest OF Microsoft Print to PDF")
    pdf.bullet("Map Downloads op de demo-pc kennen")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Alleen bestanden die wij aanwijzen.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam. Thuis een printer?")
    pdf.h3("12:25-12:45 - Stap 1: openen (oefentaak 1)")
    pdf.body("Browser - veilige link/PDF van de begeleider.")
    pdf.h3("12:45-13:05 - Stap 2: downloaden (oefentaak 2)")
    pdf.body("Download-knop - Opslaan - wachten tot klaar.")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:30 - Stap 3: terugvinden (oefentaak 3)")
    pdf.body("Verkenner - Downloads - dubbelklik.")
    pdf.h3("13:30-13:40 - Stap 4: printen (oefentaak 4)")
    pdf.body("Ctrl+P. Printer of Print to PDF of alleen voorbeeld.")
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorg. Pakket B compleet.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap echt printen")
    pdf.bullet("Niet schrappen: openen, downloaden, terugvinden")

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
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket B  -  computer of laptop")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Document openen")
    pdf.numbered(2, "Downloaden")
    pdf.numbered(3, "Terugvinden in Downloads")
    pdf.numbered(4, "Printen of printvoorbeeld")

    pdf.h2("Downloaden - stappen")
    pdf.numbered(1, "Alleen wat de begeleider aanwijst")
    pdf.numbered(2, "Download / pijltje")
    pdf.numbered(3, "Opslaan - wachten")
    pdf.numbered(4, "Openen via Verkenner - Downloads")

    pdf.h2("Printen")
    pdf.bullet("Ctrl + P (of Bestand - Afdrukken)")
    pdf.bullet("Geen printer: Print to PDF of stop bij het voorbeeld")

    pdf.box(
        "Veiligheid",
        ["Geen pop-ups over virus of prijzen aanklikken. Twijfel? Vraag de helper."],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Alleen de download die de begeleider aanwijst.")

    pdf.h2("Oefentaak 1 - Openen")
    pdf.numbered(1, "Open de browser.")
    pdf.numbered(2, "Ga naar de link of het bestand van de begeleider.")
    pdf.body("Klaar als: u het document ziet.")

    pdf.h2("Oefentaak 2 - Downloaden")
    pdf.numbered(1, "Klik op Downloaden / pijltje.")
    pdf.numbered(2, "Opslaan in Downloads of Documenten.")
    pdf.numbered(3, "Wacht tot het klaar is.")
    pdf.body("Klaar als: download klaar is.")

    pdf.h2("Oefentaak 3 - Terugvinden")
    pdf.numbered(1, "Verkenner - Downloads (of Documenten).")
    pdf.numbered(2, "Dubbelklik op het oefenbestand.")
    pdf.body("Klaar als: het document weer open is.")

    pdf.h2("Oefentaak 4 - Printen")
    pdf.numbered(1, "Ctrl + P (of Bestand - Afdrukken).")
    pdf.numbered(2, "Bekijk het voorbeeld.")
    pdf.numbered(3, "Print een pagina - of Print to PDF - of stop bij het voorbeeld.")
    pdf.body("Klaar als: u het afdrukscherm heeft gebruikt.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Wifi werkt",
        "Veilige oefen-PDF of link klaar",
        "Printer getest OF Print to PDF",
        "Map Downloads bekend",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
        "Helper tegen pop-ups / verkeerde downloads",
    ]:
        pdf.check(t)

    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Download alleen wat u verwacht. Terugvinden: Verkenner - Downloads.",
            "Printen: Ctrl+P. Geen printer? Print to PDF of voorbeeld.",
            "seniorease.nl",
            "Pakket B is compleet. Opfrisser: les B1.",
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
