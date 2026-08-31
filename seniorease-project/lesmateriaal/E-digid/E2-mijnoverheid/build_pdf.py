#!/usr/bin/env python3
"""E2 MijnOverheid."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import ELessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-E2-MijnOverheid-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = ELessonPDF(
        f"SeniorEase  |  E2 MijnOverheid  |  Pakket E  |  {LESSON_VERSION}",
        package_label="Pakket E - DigiD & digitale overheid",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "E2 - MijnOverheid",
        "Lesmiddag 90 minuten",
        "mijnoverheid.nl openen, Inloggen vinden, Berichtenbox herkennen, "
        "teruggaan en uitloggen. Privacy eerst - geen inhoud klassikaal bespreken. "
        "Inloggen optioneel (1-op-1).",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Privacy eerst - inloggen optioneel",
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
            "mijnoverheid.nl zelf openen",
            "Inloggen vinden",
            "Berichtenbox herkennen (optioneel ingelogd)",
            "Weten waar berichten en gegevens staan - zonder inhoud te delen",
            "Teruggaan, uitloggen + eindopdracht",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen berichten hardop voorlezen")
    pdf.bullet("Geen persoonlijke inhoud klassikaal tonen")
    pdf.bullet("Geen codes hardop")

    pdf.h2("Tijdlijn")
    pdf.tijdlijn_item("Site openen", "")
    pdf.tijdlijn_item("Inloggen", "")
    pdf.tijdlijn_item("Berichtenbox (optioneel)", "")
    pdf.tijdlijn_item("Terug + uitloggen", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Geen login - wel: site + Inloggen + Berichtenbox als concept")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  MijnOverheid", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket E  -  {LESSON_VERSION}")
    pdf.ln(2)

    pdf.h2("Wat is MijnOverheid?")
    pdf.body("Digitale post van de overheid. Inloggen met DigiD.")

    pdf.h2("Vandaag oefenen")
    pdf.numbered(1, "mijnoverheid.nl typen")
    pdf.numbered(2, "Inloggen vinden")
    pdf.numbered(3, "Berichtenbox + gegevens (privé)")
    pdf.numbered(4, "Terug + uitloggen")
    pdf.numbered(5, "Zelfstandig")

    pdf.box("Adressen", ["mijnoverheid.nl", "digid.nl"])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Privacy eerst. Inloggen optioneel.")
    for title, body in [
        ("Oefentaak 1 - Site openen", "Typ mijnoverheid.nl - check adresbalk."),
        ("Oefentaak 2 - Inloggen", "Knop Inloggen / DigiD vinden."),
        ("Oefentaak 3 - Berichtenbox", "Optioneel ingelogd: Berichtenbox + waar gegevens staan."),
        ("Oefentaak 4 - Terug + uit", "Terug uit bericht - uitloggen."),
        ("Oefentaak 5 - Zelfstandig", "Hele route zelf."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in [
        "Wifi op A4",
        "mijnoverheid.nl bereikbaar",
        "Helper voor 1-op-1 login",
        "Geen hardop voorlezen van berichten",
        "8-10x deelnemerskaart en oefentaken",
    ]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Typ mijnoverheid.nl zelf. Berichtenbox na inloggen. Daarna uitloggen.",
            "Berichten zijn privé. Hulp: IDO.",
            "seniorease.nl",
            "Volgende les: E3 Gemeente en Belastingdienst.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
