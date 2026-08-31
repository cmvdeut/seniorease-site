#!/usr/bin/env python3
"""A1 Ik ken mijn telefoon en durf hem te bedienen - telefoon/tablet."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import ALessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-A1-Toestel-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = ALessonPDF(
        f"SeniorEase  |  A1 Durven bedienen  |  Pakket A  |  {LESSON_VERSION}",
        package_label="Pakket A - Telefoon & tablet",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "A1 - Ik ken mijn telefoon en durf hem te bedienen",
        "Lesmiddag 90 minuten",
        "Rustige doe-middag op het eigen toestel: ontgrendelen, terug-navigeren, "
        "volume echt oefenen, meldingen, apps openen en wisselen.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket A (4 lessen): EUR 19,95",
            "Volgende les: A2 Apps installeren",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Kern: Oeps, terug naar start — uw telefoon is niet kapot.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted(
        "90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon of tablet  |  Geen bord/beamer"
    )
    pdf.box(
        "Kernboodschap",
        [
            "Oeps, ik zit ergens waar ik niet wil zijn.",
            "Ga terug naar uw startscherm. Uw telefoon is niet kapot.",
        ],
    )
    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Scherm aan/uit, vergrendelen en ontgrendelen",
            "Startscherm — expres terug oefenen",
            "Tikken, lang indrukken, vegen, scrollen",
            "Volume harder/zachter — echt horen",
            "Meldingen en helderheid",
            "Apps openen, terug en wisselen",
        ],
        1,
    ):
        pdf.numbered(i, t)
    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen apps installeren (A2)")
    pdf.bullet("Geen wifi (A3)")
    pdf.bullet("Geen fotos (A4)")

    pdf.add_page()
    pdf.h2("Tijdlijn (start 12:00)")
    pdf.tijdlijn_item("12:00-12:15 - Inloop", "Welkom. Vandaag: durven. Eigen toestel.")
    pdf.tijdlijn_item("12:15-12:22 - Kennismaking + kernboodschap", "")
    pdf.tijdlijn_item("12:22-12:32 - Oefentaak 1: aan/uit en vergrendelen", "")
    pdf.tijdlijn_item(
        "12:32-12:45 - Oefentaak 2: Oeps terug",
        "Klok, Instellingen, andere pagina — steeds terug.",
    )
    pdf.tijdlijn_item("12:45-12:50 - Pauze", "")
    pdf.tijdlijn_item("12:50-13:00 - Oefentaak 3: tik, veeg, scrollen", "")
    pdf.tijdlijn_item("13:00-13:10 - Oefentaak 4: volume (echt oefenen)", "")
    pdf.tijdlijn_item("13:10-13:18 - Oefentaak 5: meldingen en helderheid", "")
    pdf.tijdlijn_item("13:18-13:28 - Oefentaak 6: apps wisselen", "")
    pdf.tijdlijn_item("13:28-13:33 - Oefentaak 7: lettergrootte (optioneel)", "")
    pdf.tijdlijn_item("13:33-13:45 - Afronding", "")
    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 7")
    pdf.bullet("Niet schrappen: Oeps-terug, volume, vergrendelen")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Durven bedienen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket A  -  telefoon of tablet")
    pdf.ln(2)
    pdf.box(
        "Onthoud",
        ["Verkeerde plek? Terug naar start. Uw telefoon is niet kapot."],
    )
    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Vergrendelen")
    pdf.numbered(2, "Oeps — expres terug")
    pdf.numbered(3, "Tikken en vegen")
    pdf.numbered(4, "Volume (echt horen)")
    pdf.numbered(5, "Meldingen en helderheid")
    pdf.numbered(6, "Apps wisselen")

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Op uw eigen telefoon of tablet.")
    pdf.h2("Oefentaak 1 - Scherm aan, vergrendelen")
    pdf.body("Aan/uit-knop. Ontgrendelen. Weer op slot.")
    pdf.h2("Oefentaak 2 - Oeps, terug")
    pdf.body("Klok — terug. Instellingen — terug. Andere pagina — terug.")
    pdf.h2("Oefentaak 3 - Tik, veeg, scrollen")
    pdf.h2("Oefentaak 4 - Volume (echt oefenen)")
    pdf.body("Volume +/-. Hoor het verschil. Bel/trillen/stil?")
    pdf.h2("Oefentaak 5 - Meldingen en helderheid")
    pdf.h2("Oefentaak 6 - Apps wisselen")
    pdf.h2("Oefentaak 7 - Lettergrootte (optioneel)")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Geen bord of beamer",
        "Oplaadkabels / powerbank",
        "Begeleider-toestel demo-klaar (volume, melding)",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
        "Helper: Android en iPhone",
    ]:
        pdf.check(t)
    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Verkeerde plek? Terug naar start. Uw telefoon is niet kapot.",
            "Volume: knoppen zijkant.",
            "seniorease.nl",
            "Volgende les: A2 Apps installeren.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
