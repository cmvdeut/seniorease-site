#!/usr/bin/env python3
"""Ft3 QR-codes - telefoon/tablet."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import FtLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-Ft3-QR-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = FtLessonPDF(
        f"SeniorEase  |  Ft3 QR-codes  |  Pakket F  |  {LESSON_VERSION}",
        package_label="Pakket F - Internet (telefoon/tablet)",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "Ft3 - QR-codes openen",
        "Lesmiddag 90 minuten",
        "Scannen - bestemming controleren - pas daarna verder. "
        "QR = vierkante code die uw camera kan lezen. "
        "Vertrouwde plek kan vervangen zijn. Fraude: pakket D, les D2.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Kaart situaties + zaalchecklist + nazorg",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Volgende les: Ft4 Formulieren en downloads",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon of tablet + wifi")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "QR herkennen (vierkante code voor de camera)",
            "Scannen met de camera",
            "Webadres/bestemming controleren voor openen",
            "Situaties: normaal / extra opletten / altijd eerst controleren",
            "Zelfstandige eindopdracht",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen betalen of inloggen via QR")
    pdf.bullet("Geen diepe fraudeles (D2)")
    pdf.bullet("Geen QR van onbekende briefjes")

    pdf.h2("Tijdlijn")
    pdf.tijdlijn_item("Wat is QR", "")
    pdf.tijdlijn_item("Scannen", "")
    pdf.tijdlijn_item("Bestemming controleren", "")
    pdf.tijdlijn_item("Opnieuw", "")
    pdf.tijdlijn_item("Situatiekaart", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Niet schrappen: scannen + controleren + eindopdracht")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  QR-codes openen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket F  -  telefoon/tablet  -  {LESSON_VERSION}")
    pdf.ln(2)
    pdf.h2("Drie stappen")
    pdf.numbered(1, "Scannen")
    pdf.numbered(2, "Bestemming controleren")
    pdf.numbered(3, "Pas daarna verder")
    pdf.box(
        "Onthoud",
        [
            "QR = vierkante code die uw camera kan lezen.",
            "Ook op een vertrouwde plek: controleer altijd de bestemming.",
            "Fraude oefenen: pakket D, les D2.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Alleen de QR van de begeleider.")
    for title, body in [
        ("Oefentaak 1 - Scannen", "Camera op oefen-QR. Wacht op melding."),
        (
            "Oefentaak 2 - Controleren (belangrijk)",
            "Lees URL voor tikken. Klopt? Openen. Raar? Annuleren. Check adresbalk.",
        ),
        ("Oefentaak 3 - Nog een keer", "Scannen - controleren - openen."),
        ("Oefentaak 4 - Situaties", "Kaart: normaal / extra opletten / altijd eerst controleren."),
        ("Oefentaak 5 - Zelfstandig", "Scannen - webadres controleren - openen of annuleren."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Kaart situaties + checklist + nazorg")
    pdf.muted("Print 1x. Begeleider houdt omhoog.")
    pdf.ln(2)
    pdf.box(
        "Normaal (toch eerst controleren)",
        [
            "Menu in een cafe",
            "Ticket of toegangsbewijs",
            "QR van de begeleider (vandaag)",
        ],
    )
    pdf.ln(3)
    pdf.box(
        "Extra opletten",
        [
            "Poster op straat of in een winkelcentrum",
            "QR op een sticker die er later bij lijkt geplakt",
            "U herkent de organisatie niet meteen",
        ],
    )
    pdf.ln(3)
    pdf.box(
        "Altijd eerst controleren (of niet openen)",
        [
            "Briefje op deur, ruit of auto",
            "U heeft een prijs gewonnen - scan hier",
            "U twijfelt wie de QR neerzette",
            "Bestemming/URL ziet er vreemd uit",
        ],
    )
    pdf.ln(3)
    pdf.body(
        "Regel: scannen - bestemming controleren - pas daarna verder. "
        "Vertrouwde plek kan vervangen zijn. Fraude: pakket D, les D2."
    )
    pdf.ln(4)
    for t in [
        "Oefen-QR naar seniorease.nl",
        "Kaart situaties geprint",
        "Wifi op A4",
        "8-10x kaarten",
    ]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Scannen - URL controleren - pas daarna openen.",
            "Ook op een vertrouwde plek: controleer de bestemming.",
            "Verdachte QR: pakket D, les D2.",
            "seniorease.nl",
            "Volgende: Ft4 Formulieren en downloads.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
