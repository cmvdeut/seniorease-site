#!/usr/bin/env python3
"""Fc2 Websites en tabbladen - computer."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import FLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-Fc2-Websites-Tabbladen-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = FLessonPDF(
        f"SeniorEase  |  Fc2 Websites & tabbladen  |  Pakket F  |  {LESSON_VERSION}",
        package_label="Pakket F - Internet (computer)",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "Fc2 - Websites en tabbladen",
        "Lesmiddag 90 minuten",
        "Google zoeken vs webadres typen. Adresbalk controleren. "
        "Terug/vooruit, tabbladen, favorieten. Primair Windows.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op de computer)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Volgende les: Fc3 Veilig downloaden",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Computer + internet  |  Primair Windows")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Verschil: Google zoeken vs webadres typen",
            "In de adresbalk zien op welke site u bent",
            "Terug, vooruit, tabbladen, favorieten",
            "Zelfstandige eindopdracht",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen downloaden (Fc3)")
    pdf.bullet("Geen diepe vensterlessen (B2)")

    pdf.h2("Tijdlijn")
    pdf.tijdlijn_item("Zoeken vs adres", "")
    pdf.tijdlijn_item("Terug/vooruit + adresbalk", "")
    pdf.tijdlijn_item("Tabbladen", "")
    pdf.tijdlijn_item("Sluiten + favorieten", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Niet schrappen: adres typen + adresbalk + tabblad + eindopdracht")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Websites en tabbladen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket F  -  computer  -  {LESSON_VERSION}")
    pdf.ln(2)
    pdf.h2("Vandaag oefenen")
    pdf.numbered(1, "Adres typen + adresbalk checken")
    pdf.numbered(2, "Terug en vooruit")
    pdf.numbered(3, "Tabbladen (+ / nieuw tabblad)")
    pdf.numbered(4, "Sluiten + favorieten")
    pdf.numbered(5, "Zelfstandig")
    pdf.box(
        "Onthoud",
        [
            "Google = zoeken. Adresbalk = site die u kent.",
            "Kijk in de adresbalk waar u bent.",
            "Kruisje op tabblad is niet het venster sluiten.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    for title, body in [
        ("Oefentaak 1 - Zoeken of adres", "Typ seniorease.nl. Controleer adresbalk."),
        ("Oefentaak 2 - Terug / vooruit", "Link - pijl terug - adresbalk checken."),
        ("Oefentaak 3 - Tabbladen", "Plusje - tweede site - wisselen. Optioneel: rechtsklik nieuw tabblad."),
        ("Oefentaak 4 - Sluiten + favoriet", "Tabblad-kruisje. Ster - Favorieten."),
        ("Oefentaak 5 - Zelfstandig", "Adres - check - tabblad - favoriet."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in ["Pc's aan", "Internet", "Extra muizen", "8-10x kaarten", "Helper"]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Adresbalk: typ site of controleer waar u bent. + = tabblad. Pijl terug.",
            "seniorease.nl",
            "Volgende: Fc3 Veilig downloaden en bestanden herkennen.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
