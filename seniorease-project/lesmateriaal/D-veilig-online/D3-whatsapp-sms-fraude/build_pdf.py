#!/usr/bin/env python3
"""D3 WhatsApp- en sms-fraude."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import DLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-D3-WhatsApp-SMS-Fraude-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = DLessonPDF(
        f"SeniorEase  |  D3 WhatsApp & SMS  |  Pakket D  |  {LESSON_VERSION}",
        package_label="Pakket D - Veilig online",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "D3 - WhatsApp- en sms-fraude",
        "Lesmiddag 90 minuten",
        "Geld, code, haast of geheimhouding? Stop. Controleer via een contact of "
        "officiële app/site die u al had. Nooit scherm delen of software installeren "
        "op verzoek van een onverwachte beller.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Scenario-A4 + zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket D (4 lessen): EUR 19,95",
            "Vorige: D2 - Volgende: D4",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.stappenregel()
    pdf.h2("Hoofdregel")
    pdf.body(
        "Geld, code, haast of geheimhouding? Stop en controleer via een "
        "contactgegeven dat u zelf al had."
    )
    pdf.h2("Controleren via")
    pdf.bullet("Officiële bank-app")
    pdf.bullet("Zelf getypte officiële website")
    pdf.bullet("Eerder opgeslagen of officieel telefoonnummer")
    pdf.body("Niet als vaste methode: nummer op de bankpas (niet elke pas heeft dat).")
    pdf.h2("Oefenzin")
    pdf.body("Ik bel u zelf terug via het officiële nummer.")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  WhatsApp- en sms-fraude", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket D  -  {LESSON_VERSION}")
    pdf.stappenregel()
    pdf.h2("Nooit")
    pdf.bullet("Software installeren omdat een beller dat vraagt")
    pdf.bullet("Scherm delen met een onverwachte helpdesk")

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    for title, body in [
        ("Oefentaak 1 - Familie", "Nieuw nummer + geld + geheim - stop."),
        ("Oefentaak 2 - Terugbellen", "Bekend contact + zin oefenen + bank-app of site zelf."),
        ("Oefentaak 3 - Helpdesk", "Niet installeren, niet scherm delen - ophangen."),
        ("Oefentaak 4 - SMS", "Lezen - niet klikken."),
        ("Oefentaak 5 - Zelfstandig", "Beoordelen - stoppen - officiële controle."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Scenario-A4 (print, fictief)")
    pdf.box(
        "Scenario 1 - familie",
        ['"Oma, nieuw nummer. Stuur 100 euro. Vertel mama niet."', "Stop - bekend nummer."],
    )
    pdf.ln(2)
    pdf.box(
        "Scenario 2 - helpdesk",
        [
            '"Met de bank. Deel uw scherm / installeer deze app. Snel."',
            "Ophangen - nooit scherm delen - zelf de bank-app.",
        ],
    )
    pdf.h2("Zaalchecklist")
    for t in [
        "Twee oefenberichten klaar (geen werkende nep-links)",
        "8-10x deelnemerskaart en oefentaken",
        "Helper voor wie geen WhatsApp heeft",
    ]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Geld, code, haast of geheim? Stop. Controleer via wat u al had.",
            "Zin: Ik bel u zelf terug via het officiële nummer.",
            "seniorease.nl/uitleg/veiligheid",
            "Volgende les: D4 Veilig betalen.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
