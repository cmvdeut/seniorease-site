#!/usr/bin/env python3
"""Fc3 Downloaden - computer."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-Fc3-Downloaden-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF(
        "SeniorEase  |  Fc3 Downloaden  |  Pakket F  |  v1.1",
        package_label="Pakket F - Internet (computer)",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "Fc3 - Downloaden",
        "Lesmiddag 90 minuten",
        "Veilige link openen, bestand downloaden, terugvinden in Downloads.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken",
            "4. Kaart: Downloads terugvinden",
            "5. Zaalchecklist",
            "6. Nazorgkaart",
        ],
        ["Versie 1.1 - augustus 2026", "Volgende: Fc4 Formulieren"],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Alleen download van link van de begeleider.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.h2("Voorbereiding")
    pdf.bullet("Veilige downloadlink (PDF seniorease.nl)")
    pdf.bullet("Kaart Downloads printen")
    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen onbekende sites")
    pdf.bullet("Pop-ups negeren")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Downloaden", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.numbered(1, "Document openen")
    pdf.numbered(2, "Downloaden")
    pdf.numbered(3, "Downloads-map")
    pdf.numbered(4, "Opnieuw openen")
    pdf.body("Vast? Hand opsteken.")

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.h2("Oefentaak 1")
    pdf.body("Browser - link begeleider - document zichtbaar.")
    pdf.h2("Oefentaak 2")
    pdf.body("Downloaden - Opslaan in Downloads.")
    pdf.h2("Oefentaak 3")
    pdf.body("Verkenner - Downloads - bestand vinden.")
    pdf.h2("Oefentaak 4")
    pdf.body("Dubbelklik - document open.")

    pdf.add_page()
    pdf.h1("4. Kaart - Downloads terugvinden")
    pdf.box(
        "Windows",
        [
            "1. Verkenner (map-icoon taakbalk)",
            "2. Links: Downloads",
            "3. Dubbelklik bestand",
            "Of: download-icoon in browser",
        ],
    )
    pdf.ln(4)
    pdf.box("Mac", ["Finder - Downloads. Helper 1-op-1."])

    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in ["Pc's aan", "Downloadlink klaar", "Kaart geprint", "8-10x kaarten"]:
        pdf.check(t)
    pdf.h1("6. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Download alleen van vertrouwde sites.",
            "Verkenner - Downloads.",
            "seniorease.nl",
            "Volgende: Fc4 Formulieren.",
        ]
    )
    pdf.h2("Licentie")
    pdf.body("Copyright SeniorEase.")

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
