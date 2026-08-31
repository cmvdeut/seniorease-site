#!/usr/bin/env python3
"""Fc4 Formulieren invullen - computer."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import FLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-Fc4-Formulieren-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = FLessonPDF(
        f"SeniorEase  |  Fc4 Formulieren  |  Pakket F  |  {LESSON_VERSION}",
        package_label="Pakket F - Internet (computer)",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "Fc4 - Formulieren invullen",
        "Lesmiddag 90 minuten",
        "Tekstveld, e-mail, keuzelijst, vinkvakje, keuzerondje, verplichte velden, "
        "foutmelding herkennen en corrigeren. Oefenformulier: seniorease.nl/oefenen/formulier "
        "(mag verzenden, geen opslag). Fallback: Verzenden alleen demonstratie.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Laatste les pakket F (computer)",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Computer + internet  |  Primair Windows")
    pdf.body("Oefenpagina: seniorease.nl/oefenen/formulier")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Formulier openen",
            "Tekst, e-mail, keuzelijst, vinkvakje, keuzerondje",
            "Verplicht veld + foutmelding + corrigeren",
            "Controleren en (optioneel) verzenden op oefenformulier",
            "Zelfstandige eindopdracht",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen echte persoonsgegevens")
    pdf.bullet("Geen DigiD (pakket E)")
    pdf.bullet("Contact-pagina: niet verzenden (alleen demo)")

    pdf.h2("Tijdlijn")
    pdf.tijdlijn_item("Openen + tekst/e-mail", "")
    pdf.tijdlijn_item("Keuzelijst/vink/rondje", "")
    pdf.tijdlijn_item("Foutmelding + controleren", "")
    pdf.tijdlijn_item("Verzenden", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Niet schrappen: veldtypen + foutmelding + eindopdracht")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Formulieren invullen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket F  -  computer  -  {LESSON_VERSION}")
    pdf.ln(2)
    pdf.h2("Veldtypen")
    pdf.numbered(1, "Tekstveld")
    pdf.numbered(2, "E-mailveld")
    pdf.numbered(3, "Keuzelijst (dropdown)")
    pdf.numbered(4, "Vinkvakje")
    pdf.numbered(5, "Keuzerondje")
    pdf.box(
        "Onthoud",
        [
            "Controleer alles voor Verzenden.",
            "Oefenformulier: mag verzenden, niets wordt bewaard.",
            "Gemeente/DigiD: pakket E.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("seniorease.nl/oefenen/formulier")
    for title, body in [
        ("Oefentaak 1 - Tekst + e-mail", "Jan, test@voorbeeld.nl, bericht."),
        ("Oefentaak 2 - Keuzes", "Keuzelijst, vinkvakje, keuzerondje."),
        ("Oefentaak 3 - Foutmelding", "Veld leeg laten - fout zien - corrigeren - controleren."),
        ("Oefentaak 4 - Verzenden", "Oefenformulier: verzenden. Contact: alleen aanwijzen."),
        ("Oefentaak 5 - Zelfstandig", "Hele formulier zelf oefenen."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in [
        "Pc's aan, internet",
        "oefenen/formulier bereikbaar",
        "Fallback Contact: niet verzenden",
        "8-10x kaarten",
    ]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Klik veld - typ of kies - controleer - dan pas Verzenden.",
            "Oefenen: seniorease.nl/oefenen/formulier. DigiD: pakket E.",
            "seniorease.nl",
            "Pakket F (computer) afgerond.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
