#!/usr/bin/env python3
"""D2 Phishing, links en QR."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import DLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-D2-Phishing-Links-QR-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = DLessonPDF(
        f"SeniorEase  |  D2 Links & QR  |  Pakket D  |  {LESSON_VERSION}",
        package_label="Pakket D - Veilig online",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "D2 - Phishing, links en QR-codes",
        "Lesmiddag 90 minuten",
        "Zelf typen, de echte domeinnaam herkennen, links niet openen bij twijfel, "
        "QR: eerst adres/betaalscherm bekijken. Scannen is niet automatisch veilig.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Voorbeeldkaart + zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket D (4 lessen): EUR 19,95",
            "Vorige: D1 - Volgende: D3",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.stappenregel()
    pdf.h2("Domeinnaam")
    pdf.body(
        "iets.digid.nl: relevant is digid.nl.  digid.nl.nepsite.com: de echte site "
        "is nepsite.com. Alleen kijken - geen nep-links openen."
    )
    pdf.h2("QR-regel")
    pdf.body(
        "Scan - kijk eerst welk adres of betaalscherm verschijnt - controleer - "
        "pas daarna verder. QR op rekening, parkeerautomaat of poster kan vervangen zijn."
    )
    pdf.h2("Niet doen")
    pdf.bullet("Geen lang indrukken als verplichte groeps-oefening")
    pdf.bullet("Woorden als secure of check betekenen niet automatisch nep")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Links en QR-codes", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket D  -  {LESSON_VERSION}")
    pdf.stappenregel()
    pdf.h2("QR")
    pdf.body("Eerst kijken waar u terechtkomt. Scannen is niet automatisch veilig.")

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    for title, body in [
        ("Oefentaak 1 - Zelf typen", "digid.nl - check adresbalk."),
        ("Oefentaak 2 - Domeinnaam", "Voorbeeldkaart + zelf postnl.nl."),
        ("Oefentaak 3 - Link niet openen", "Bij twijfel: wegleggen, zelf typen."),
        ("Oefentaak 4 - QR", "Scan SeniorEase-QR - eerst kijken - dan openen."),
        ("Oefentaak 5 - Zelfstandig", "Typen - domein aanwijzen - QR-regel zeggen."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Voorbeeldkaart (print, niet aanklikken)")
    pdf.box(
        "Echte website herkennen",
        [
            "iets.digid.nl  ->  de site is digid.nl",
            "digid.nl.nepsite.com  ->  de site is nepsite.com (niet DigiD)",
            "Open deze voorbeelden niet. Alleen kijken.",
        ],
    )
    pdf.h2("Zaalchecklist")
    for t in [
        "Wifi op A4",
        "Voorbeeldkaart domeinnamen geprint",
        "Een veilige QR naar seniorease.nl/uitleg/veiligheid",
        "8-10x deelnemerskaart en oefentaken",
    ]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Zelf typen. Kijk naar de echte domeinnaam.",
            "QR: scan - kijken - controleren - dan verder.",
            "seniorease.nl/uitleg/veiligheid",
            "Volgende les: D3 WhatsApp- en sms-fraude.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
