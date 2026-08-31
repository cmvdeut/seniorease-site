#!/usr/bin/env python3
"""E1 DigiD - telefoon/tablet of computer."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import ELessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-E1-DigiD-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = ELessonPDF(
        f"SeniorEase  |  E1 DigiD  |  Pakket E  |  {LESSON_VERSION}",
        package_label="Pakket E - DigiD & digitale overheid",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "E1 - DigiD",
        "Lesmiddag 90 minuten",
        "DigiD kennen: persoonlijke digitale inlog voor overheid en andere DigiD-gebruikers. "
        "digid.nl zelf openen, Inloggen vinden, DigiD-app herkennen, veilig afsluiten. "
        "Echt inloggen optioneel. Telefoon/tablet of computer.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Codes niet hardop - inloggen optioneel",
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
            "Uitleggen wat DigiD is (persoonlijke digitale inlog)",
            "digid.nl zelf openen",
            "Inloggen vinden",
            "DigiD-app herkennen (mobiel) of digid.nl (computer)",
            "Veilig afsluiten + eindopdracht zelfstandig",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen klassikale DigiD-aanvraag")
    pdf.bullet("Geen codes hardop")
    pdf.bullet("Echt inloggen alleen optioneel 1-op-1")

    pdf.h2("Tijdlijn")
    pdf.tijdlijn_item("Wat is DigiD + digid.nl", "")
    pdf.tijdlijn_item("Inloggen bekijken", "")
    pdf.tijdlijn_item("DigiD-app", "")
    pdf.tijdlijn_item("Veilig afsluiten + codes", "")
    pdf.tijdlijn_item("Eindopdracht zelfstandig", "")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Niet schrappen: digid.nl + Inloggen + eindopdracht")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  DigiD", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket E  -  {LESSON_VERSION}")
    pdf.ln(2)

    pdf.h2("Wat is DigiD?")
    pdf.body(
        "Uw persoonlijke digitale inlog voor overheidsorganisaties "
        "en andere organisaties die DigiD gebruiken."
    )

    pdf.h2("Vandaag oefenen")
    pdf.numbered(1, "digid.nl zelf typen")
    pdf.numbered(2, "Inloggen vinden")
    pdf.numbered(3, "DigiD-app herkennen")
    pdf.numbered(4, "Veilig afsluiten")
    pdf.numbered(5, "Zelfstandig: hele route")

    pdf.box("Adres", ["digid.nl"])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Codes niet hardop. Inloggen niet verplicht.")
    for title, body in [
        ("Oefentaak 1 - digid.nl", "Browser - typ digid.nl - check adresbalk."),
        ("Oefentaak 2 - Inloggen", "Knop Inloggen - scherm bekijken - optioneel 1-op-1."),
        ("Oefentaak 3 - DigiD-app", "Mobiel: app zoeken. Computer: digid.nl."),
        ("Oefentaak 4 - Afsluiten + codes", "Uitloggen/sluiten. Geen code via chat/beller."),
        ("Oefentaak 5 - Zelfstandig", "digid.nl - Inloggen - app - veilig afsluiten."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in [
        "Wifi op A4",
        "digid.nl bereikbaar",
        "Geen klassikale aanvraag met ID-bewijzen",
        "Helper voor optioneel 1-op-1 inloggen",
        "8-10x deelnemerskaart en oefentaken",
    ]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Typ digid.nl zelf. DigiD-app op mobiel. Codes nooit via WhatsApp of vreemde beller.",
            "Aanvragen? IDO / digid.nl thuis met helper.",
            "seniorease.nl",
            "Volgende les: E2 MijnOverheid.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
