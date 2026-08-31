#!/usr/bin/env python3
"""E3 Gemeente en Belastingdienst."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import ELessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-E3-Gemeente-Belastingdienst-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = ELessonPDF(
        f"SeniorEase  |  E3 Gemeente & Belastingdienst  |  Pakket E  |  {LESSON_VERSION}",
        package_label="Pakket E - DigiD & digitale overheid",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "E3 - Gemeente en Belastingdienst",
        "Lesmiddag 90 minuten",
        "belastingdienst.nl en officiële gemeentesite openen, DigiD-knop vinden, "
        "één openbare taak oefenen (openingstijden of paspoort/rijbewijs). "
        "Geen aangifte, betaling, BSN of bedragen in de groep.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Alleen openbare informatie in de les",
            "Pakket E (4 lessen): EUR 19,95",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon/tablet of computer")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "belastingdienst.nl openen + Inloggen/DigiD vinden",
            "Officiële gemeentesite vinden + URL controleren",
            "DigiD-knop op gemeentesite",
            "Openbare info zoeken (openingstijden of paspoort/rijbewijs)",
            "Eindopdracht zelfstandig",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen aangifte of betaling")
    pdf.bullet("Geen BSN of bedragen hardop")
    pdf.bullet("Geen nep-links uit SMS")

    pdf.h2("Tijdlijn")
    pdf.tijdlijn_item("Belastingdienst + Inloggen", "")
    pdf.tijdlijn_item("Officiële gemeente + URL check", "")
    pdf.tijdlijn_item("DigiD + openbare taak", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Niet schrappen: beide sites + officiële URL + één openbare pagina")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Gemeente en Belastingdienst", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket E  -  {LESSON_VERSION}")
    pdf.ln(2)

    pdf.h2("Vandaag oefenen")
    pdf.numbered(1, "belastingdienst.nl")
    pdf.numbered(2, "Inloggen / DigiD")
    pdf.numbered(3, "Officiële gemeente (URL check)")
    pdf.numbered(4, "Openbare pagina (tijden of paspoort)")
    pdf.numbered(5, "Zelfstandig")

    pdf.box("Onthoud", ["Aankomen is genoeg. Afronden doet u thuis of met hulp."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Geen aangifte of betaling. Codes stil.")
    for title, body in [
        ("Oefentaak 1 - Belastingdienst", "Typ belastingdienst.nl."),
        ("Oefentaak 2 - Inloggen", "Zoek Inloggen / Mijn Belastingdienst / DigiD."),
        ("Oefentaak 3 - Gemeente", "Zoek officiële site - check webadres."),
        ("Oefentaak 4 - Openbare taak", "DigiD-knop + openingstijden of paspoort/rijbewijs info."),
        ("Oefentaak 5 - Zelfstandig", "Beide sites + één openbare pagina."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in [
        "Wifi op A4",
        "belastingdienst.nl bereikbaar",
        "Helper voor Google-hits / login",
        "Geen aangiftes of betalingen",
        "8-10x deelnemerskaart en oefentaken",
    ]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Typ belastingdienst.nl zelf. Gemeente: officiële site + URL check.",
            "Aangifte rustig thuis of met IDO.",
            "seniorease.nl",
            "Volgende les: E4 Berichtenbox.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
