#!/usr/bin/env python3
"""Ft4 Formulieren en downloads - telefoon/tablet."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import FtLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = (
    Path(__file__).resolve().parent
    / "pdf"
    / "SeniorEase-Ft4-Formulieren-Downloads-v1.pdf"
)


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = FtLessonPDF(
        f"SeniorEase  |  Ft4 Formulieren & downloads  |  Pakket F  |  {LESSON_VERSION}",
        package_label="Pakket F - Internet (telefoon/tablet)",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "Ft4 - Formulieren en downloads",
        "Lesmiddag 90 minuten",
        "Hoofdonderwerp: formulieren (tekst, e-mail, keuzelijst, vinkvakje, "
        "foutmelding, controleren). Oefenformulier: seniorease.nl/oefenen/formulier. "
        "Daarna eenvoudig: veilige PDF downloaden en terugvinden in Bestanden.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken",
            "4. Kaart Downloads + zaalchecklist + nazorg",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Laatste les pakket F (telefoon/tablet)",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon of tablet + wifi")
    pdf.body("Oefenpagina: seniorease.nl/oefenen/formulier")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Formulier openen op telefoon/tablet",
            "Tekst, e-mail, keuzelijst, vinkvakje",
            "Foutmelding herkennen, corrigeren, controleren",
            "Eenvoudig downloaden + Bestanden/Downloads",
            "Zelfstandige eindopdracht",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen DigiD/bank (E/D)")
    pdf.bullet("Contact-pagina: niet verzenden (alleen demo)")
    pdf.bullet("Geen onbekende downloads")

    pdf.h2("Tijdlijn")
    pdf.tijdlijn_item("Formulier openen + tekst/e-mail", "")
    pdf.tijdlijn_item("Keuzes", "")
    pdf.tijdlijn_item("Foutmelding + verzenden", "")
    pdf.tijdlijn_item("Eenvoudige download", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Niet schrappen: formulier + foutmelding + eindopdracht")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 14)
    pdf.cell(0, 11, "  Formulieren en downloads", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket F  -  telefoon/tablet  -  {LESSON_VERSION}")
    pdf.ln(2)
    pdf.h2("Formulier (hoofd)")
    pdf.numbered(1, "Tekstveld + e-mailveld")
    pdf.numbered(2, "Keuzelijst + vinkvakje")
    pdf.numbered(3, "Foutmelding - corrigeren - controleren")
    pdf.h2("Download (eenvoudig)")
    pdf.numbered(1, "Veilige PDF")
    pdf.numbered(2, "Bestanden - Downloads - opnieuw openen")
    pdf.box(
        "Onthoud",
        [
            "Oefenformulier: mag verzenden, niets wordt bewaard.",
            "iPhone: Downloads onder iCloud of Op mijn iPhone/iPad.",
            "DigiD: pakket E.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("seniorease.nl/oefenen/formulier")
    for title, body in [
        ("Oefentaak 1 - Tekst + e-mail", "Jan, test@voorbeeld.nl, bericht."),
        ("Oefentaak 2 - Keuzes", "Keuzelijst + vinkvakje (+ keuzerondje als aanwezig)."),
        ("Oefentaak 3 - Fout + verzenden", "Veld leeg - fout - corrigeren - controleren - verzenden."),
        (
            "Oefentaak 4 - Download",
            "Veilige PDF - Bestanden - Downloads. iPhone: iCloud of Op mijn iPhone.",
        ),
        ("Oefentaak 5 - Zelfstandig", "Formulier zelf; optioneel download terugvinden."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Kaart Downloads + checklist + nazorg")
    pdf.box(
        "Android",
        [
            "App Bestanden - Downloads",
            "Of: download-icoon in Chrome",
        ],
    )
    pdf.ln(3)
    pdf.box(
        "iPhone / iPad",
        [
            "App Bestanden",
            "Downloads onder iCloud Drive",
            "of Op mijn iPhone / Op mijn iPad",
            "Map anders? Helper helpt 1-op-1",
        ],
    )
    pdf.ln(4)
    for t in [
        "oefenen/formulier bereikbaar",
        "Veilige PDF-link klaar",
        "Kaart Downloads geprint",
        "8-10x kaarten",
    ]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Formulier: typen, kiezen, controleren - dan Verzenden.",
            "Oefenen: seniorease.nl/oefenen/formulier. Download: Bestanden - Downloads.",
            "DigiD: pakket E. Computer: pakket F-computer.",
            "seniorease.nl",
            "Pakket F (telefoon/tablet) afgerond.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
