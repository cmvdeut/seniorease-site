#!/usr/bin/env python3
"""E4 Berichtenbox en berichten van de overheid - einde pakket E."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import ELessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = (
    Path(__file__).resolve().parent
    / "pdf"
    / "SeniorEase-E4-Berichtenbox-Overheid-v1.pdf"
)


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = ELessonPDF(
        f"SeniorEase  |  E4 Berichtenbox  |  Pakket E  |  {LESSON_VERSION}",
        package_label="Pakket E - DigiD & digitale overheid",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "E4 - Berichtenbox en berichten van de overheid",
        "Lesmiddag 90 minuten",
        "MijnOverheid openen, Berichtenbox vinden, afzender en onderwerp bekijken, "
        "bericht en bijlage openen, teruggaan en uitloggen. "
        "E-mailmelding is niet het bericht zelf. Korte veiligheid - dieper: pakket D.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket E compleet - EUR 19,95 voor 4 lessen",
            "Fraude-oefeningen: pakket D Veilig online",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon/tablet of computer")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "MijnOverheid - Berichtenbox - bericht openen",
            "Afzender, onderwerp en PDF/bijlage herkennen",
            "Teruggaan en uitloggen",
            "E-mailmelding vs echt bericht - bij twijfel zelf mijnoverheid.nl",
            "Eindopdracht zelfstandig",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen uitgebreide fraude-oefening (pakket D)")
    pdf.bullet("Geen berichten hardop voorlezen")
    pdf.bullet("Geen phishing-links openen")

    pdf.h2("Tijdlijn")
    pdf.tijdlijn_item("MijnOverheid + Berichtenbox", "")
    pdf.tijdlijn_item("Bericht openen + bijlage", "")
    pdf.tijdlijn_item("Terug + uitloggen", "")
    pdf.tijdlijn_item("E-mailmelding + korte veiligheid", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Niet schrappen: Berichtenbox-route + e-mailmelding + eindopdracht")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Berichtenbox", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket E  -  {LESSON_VERSION}")
    pdf.ln(2)

    pdf.h2("Route")
    pdf.numbered(1, "mijnoverheid.nl openen")
    pdf.numbered(2, "Berichtenbox")
    pdf.numbered(3, "Afzender + onderwerp")
    pdf.numbered(4, "Bericht + bijlage")
    pdf.numbered(5, "Terug + uitloggen")

    pdf.h2("E-mailmelding")
    pdf.body(
        "Mail 'u heeft een bericht' is vaak alleen een melding. "
        "Open zelf mijnoverheid.nl - klik niet op de link als u twijfelt."
    )

    pdf.h2("Kort veilig")
    pdf.body("Geen DigiD-code via chat of vreemde beller. Meer oefenen: pakket D.")

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Privacy eerst. Geen verdachte links.")
    for title, body in [
        ("Oefentaak 1 - Berichtenbox", "mijnoverheid.nl - optioneel inloggen - Berichtenbox."),
        ("Oefentaak 2 - Bericht openen", "Afzender + onderwerp - bericht - PDF/bijlage herkennen."),
        ("Oefentaak 3 - Terug + uit", "Terug - uitloggen."),
        ("Oefentaak 4 - E-mailmelding", "Melding vs bericht - zelf typen - korte veiligheid - pakket D."),
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
        "Geen inhoud klassikaal bespreken",
        "Pakket D kunnen noemen",
        "8-10x deelnemerskaart en oefentaken",
    ]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Berichten in MijnOverheid - niet via link in mail als u twijfelt.",
            "Geen DigiD-code via chat. Meer veiligheid: pakket D.",
            "seniorease.nl",
            "Pakket E compleet. Opfrisser: les E1.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
