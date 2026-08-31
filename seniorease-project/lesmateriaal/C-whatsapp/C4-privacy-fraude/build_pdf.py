#!/usr/bin/env python3
"""C4 WhatsApp privacy en fraude."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import CLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-C4-Privacy-Fraude-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = CLessonPDF(
        f"SeniorEase  |  C4 Privacy & fraude  |  Pakket C  |  {LESSON_VERSION}",
        package_label="Pakket C - WhatsApp",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "C4 - Privacy en fraude",
        "Lesmiddag 90 minuten",
        "Privacy-instellingen, blokkeren en rapporteren, hoofdregel bij fraude, "
        "twee veilige scenario's. Einde pakket C. Meer: pakket D.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Scenario-A4 + zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket C compleet - EUR 19,95 voor 4 lessen",
            "Meer veiligheid: pakket D",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Geen paniek - twijfel is verstandig")
    pdf.body("Geen vervanging van pakket D.")

    pdf.h2("Hoofdregel")
    pdf.body(
        "Geld, code, haast of geheimhouding? Stop en controleer via een "
        "contactgegeven dat u zelf al had."
    )

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Privacy: Profielfoto, Laatst gezien, Groepen",
            "Blokkeren (demo) en Rapporteren herkennen",
            "Twee fraudescenario's doorlopen",
            "Zelfstandig: privacy + hoofdregel toepassen",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Tijdlijn")
    pdf.tijdlijn_item("Privacy", "")
    pdf.tijdlijn_item("Blokkeren/rapporteren", "")
    pdf.tijdlijn_item("Scenario 1 familie", "")
    pdf.tijdlijn_item("Scenario 2 link", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  WhatsApp - privacy en fraude", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket C  -  {LESSON_VERSION}")

    pdf.box(
        "Hoofdregel",
        [
            "Geld, code, haast of geheimhouding?",
            "Stop - controleer via contact dat u al had.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    for title, body in [
        ("Oefentaak 1 - Instellingen", "WhatsApp - Instellingen."),
        ("Oefentaak 2 - Privacy", "Profielfoto, Laatst gezien, Groepen."),
        ("Oefentaak 3 - Blokkeren/Rapporteren", "Demo-nummer - deblokkeren - Rapporteren zien."),
        ("Oefentaak 4 - Scenario 1", "Nieuw nummer + geld + geheim = stop."),
        ("Oefentaak 5 - Scenario 2", "Haast + link = niet klikken."),
        ("Oefentaak 6 - Zelfstandig", "Privacy - hoofdregel - scenario."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Scenario-A4 (print 1x)")
    pdf.muted("Omhoog houden of uitdelen. Geen echt verzoek.")
    pdf.ln(2)
    pdf.box(
        "Scenario 1 - familie/fraude",
        [
            '"Oma, nieuw nummer. Stuur 100 euro. Vertel mama niet."',
            "Signalen: geld, geheim, nieuw nummer.",
            "Actie: stop - bekend nummer in Contacten.",
        ],
    )
    pdf.ln(3)
    pdf.box(
        "Scenario 2 - link/haast",
        [
            '"Pakket mislukt - betaal 2,99 vandaag via link."',
            "Signalen: haast, onbekende link.",
            "Actie: niet klikken - officiële site zelf intypen.",
        ],
    )

    pdf.h2("Zaalchecklist")
    for t in [
        "Demo-spamnummer op A4",
        "Scenario-A4 geprint",
        "8-10x deelnemerskaart en oefentaken",
        "Pakket D kunnen noemen",
    ]:
        pdf.check(t)

    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Hoofdregel: geld/code/haast/geheim = stop + bekend contact.",
            "Instellingen - Privacy. Blokkeren en Rapporteren in contactinfo.",
            "seniorease.nl/uitleg/veiligheid",
            "Pakket C compleet. Meer: pakket D Veilig online.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
