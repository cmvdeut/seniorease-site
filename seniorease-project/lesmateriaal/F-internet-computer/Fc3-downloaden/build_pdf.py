#!/usr/bin/env python3
"""Fc3 Veilig downloaden en bestanden herkennen - computer."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import FLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = (
    Path(__file__).resolve().parent
    / "pdf"
    / "SeniorEase-Fc3-Veilig-Downloaden-v1.pdf"
)


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = FLessonPDF(
        f"SeniorEase  |  Fc3 Veilig downloaden  |  Pakket F  |  {LESSON_VERSION}",
        package_label="Pakket F - Internet (computer)",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "Fc3 - Veilig downloaden en bestanden herkennen",
        "Lesmiddag 90 minuten",
        "Alleen downloaden wat u verwacht, site controleren, echte knop vs advertentie, "
        "veilige oefendownload, Downloads-map, PDF en bestandstypen. "
        "Geen knippen naar Documenten (pakket B3).",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken",
            "4. Kaart Downloads + zaalchecklist + nazorg",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Volgende: Fc4 Formulieren",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Computer + internet  |  Primair Windows")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Alleen verwachte download van gecontroleerde site",
            "Echte knop vs advertentie/pop-up; virusmelding negeren",
            "Downloads-map terugvinden en openen",
            "PDF en veelvoorkomende bestandstypen herkennen",
            "Zelfstandige eindopdracht",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen onbekende sites")
    pdf.bullet("Geen Knippen/Plakken naar Documenten (B3)")
    pdf.bullet("Pop-ups niet aanklikken")

    pdf.h2("Tijdlijn")
    pdf.tijdlijn_item("Regels + site openen", "")
    pdf.tijdlijn_item("Downloaden", "")
    pdf.tijdlijn_item("Downloads + openen", "")
    pdf.tijdlijn_item("Bestandstypen", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Niet schrappen: regels + download + Downloads + eindopdracht")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Veilig downloaden", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket F  -  computer  -  {LESSON_VERSION}")
    pdf.ln(2)
    pdf.h2("Regels")
    pdf.numbered(1, "Alleen wat u verwacht")
    pdf.numbered(2, "Controleer de website (adresbalk)")
    pdf.numbered(3, "Echte knop - geen advertentie/pop-up")
    pdf.numbered(4, "Vreemde virusmelding: sluiten")
    pdf.box("Bestandstypen", ["PDF = document", "Foto: .jpg / .png", "Word: .docx", "Zip: .zip (voorzichtig)"])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    for title, body in [
        ("Oefentaak 1 - Site controleren", "Link begeleider - adresbalk checken."),
        ("Oefentaak 2 - Downloaden", "Echte knop - Opslaan in Downloads. Geen pop-up."),
        ("Oefentaak 3 - Terugvinden", "Verkenner - Downloads - dubbelklik."),
        ("Oefentaak 4 - Bestandstypen", "PDF herkennen + korte typen."),
        ("Oefentaak 5 - Zelfstandig", "Hele veilige route zelf."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Kaart Downloads + checklist + nazorg")
    pdf.box(
        "Windows - Downloads terugvinden",
        [
            "1. Verkenner (map-icoon taakbalk)",
            "2. Links: Downloads",
            "3. Dubbelklik bestand",
            "Of: download-icoon in de browser",
        ],
    )
    pdf.ln(4)
    for t in ["Pc's aan", "Veilige downloadlink klaar", "8-10x kaarten", "Helper"]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Alleen verwachte downloads. Check de site. Echte knop, geen pop-up.",
            "Verkenner - Downloads. Mappen verplaatsen: pakket B3.",
            "seniorease.nl",
            "Volgende: Fc4 Formulieren.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
