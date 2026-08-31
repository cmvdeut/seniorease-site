#!/usr/bin/env python3
"""D1 Nepberichten."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import DLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-D1-Nepberichten-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = DLessonPDF(
        f"SeniorEase  |  D1 Nepberichten  |  Pakket D  |  {LESSON_VERSION}",
        package_label="Pakket D - Veilig online",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "D1 - Nepberichten herkennen",
        "Lesmiddag 90 minuten",
        "Op het eigen toestel: berichten alleen bekijken, vijf vragen stellen, "
        "niet via het bericht handelen, zelf de officiële app of website openen. "
        "Twijfel is reden om te stoppen. Geen bord.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Gids: seniorease.nl/uitleg/veiligheid",
            "Pakket D (4 lessen): EUR 19,95",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon of tablet")
    pdf.stappenregel()

    pdf.h2("Hoofdregel")
    pdf.body(
        "Onverwacht bericht over geld, gegevens of inloggen? Niet via het bericht "
        "handelen. Open zelf de officiële app of typ zelf het bekende webadres."
    )

    pdf.h2("Vijf vragen")
    pdf.numbered(1, "Verwachtte ik dit bericht?")
    pdf.numbered(2, "Moet ik haast maken?")
    pdf.numbered(3, "Wordt om geld, gegevens, codes of inloggen gevraagd?")
    pdf.numbered(4, "Moet ik via een link, QR of nummer in het bericht handelen?")
    pdf.numbered(5, "Kan ik zelf controleren via app, website of contact dat ik al had?")
    pdf.body("Een logo of bekende naam bewijst niet dat het echt is. Spelfouten zijn geen alarm.")

    pdf.h2("Tijdlijn")
    pdf.tijdlijn_item("Berichten openen", "")
    pdf.tijdlijn_item("Alleen kijken + vijf vragen", "")
    pdf.tijdlijn_item("Officiële route (DigiD of app)", "")
    pdf.tijdlijn_item("Algemeen voorbeeld (bericht sluiten, app zelf)", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Niet schrappen: vijf vragen + officiële route + eindopdracht")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Nepberichten herkennen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket D  -  {LESSON_VERSION}")
    pdf.ln(2)
    pdf.stappenregel()
    pdf.h2("Vijf vragen")
    pdf.numbered(1, "Verwachtte ik dit?")
    pdf.numbered(2, "Haast?")
    pdf.numbered(3, "Geld, gegevens, codes, inloggen?")
    pdf.numbered(4, "Via het bericht handelen?")
    pdf.numbered(5, "Zelf controleren via officiële route?")

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted(f"Niet op links tikken. Versie {LESSON_VERSION.lstrip('v')}.")
    for title, body in [
        ("Oefentaak 1 - Berichten openen", "Berichten-app - lijst zien."),
        ("Oefentaak 2 - Alleen kijken", "Oefenbericht lezen - vijf vragen - geen links."),
        ("Oefentaak 3 - Officiële route", "Bericht sluiten - DigiD-app of zelf digid.nl typen."),
        ("Oefentaak 4 - Algemeen", "Bericht sluiten - officiële app zelf openen (bijv. PostNL)."),
        ("Oefentaak 5 - Zelfstandig", "Beoordelen - niets aanklikken - officiële route."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in [
        "Wifi op A4",
        "Veilig oefenbericht zonder werkende nep-link",
        "8-10x deelnemerskaart en oefentaken",
        "Helper: geen schaamte, rustig tempo",
    ]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "STOP - niet klikken - zelf de officiële app of website openen.",
            "Vijf vragen. Logo bewijst niets. Spelfouten zijn geen alarm.",
            "seniorease.nl/uitleg/veiligheid",
            "Volgende les: D2 Links en QR.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
