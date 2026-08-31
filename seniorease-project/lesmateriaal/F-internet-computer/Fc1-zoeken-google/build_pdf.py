#!/usr/bin/env python3
"""Fc1 Zoeken met Google - computer."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-Fc1-Zoeken-Google-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF(
        "SeniorEase  |  Fc1 Zoeken met Google  |  Pakket F  |  v1.0",
        package_label="Pakket F - Internet (computer)",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "Fc1 - Zoeken met Google",
        "Lesmiddag 90 minuten",
        "Op de computer: browser openen, zoeken op Google, een resultaat openen en terug. "
        "Primair Windows. Geen presentatie verplicht.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op de computer)",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Pakket F-computer (4 lessen): EUR 19,95",
            "Volgende les: Fc2 Websites en tabbladen",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Kijken, doen, controleren, pauzeren. Mac: helper 1-op-1.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Computer + internet")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Browser openen (Edge of Chrome)",
            "Google gebruiken om te zoeken",
            "Zoekvraag typen (meerdere woorden)",
            "Resultaat openen en teruggaan",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen Google Maps (bonus)")
    pdf.bullet("Geen AI diep uitleggen")
    pdf.bullet("Geen telefoon/tablet (F-telefoon)")
    pdf.bullet("Geen muislessen (B1)")

    pdf.h2("Didactiek")
    pdf.numbered(1, "Kijken - u toont op scherm")
    pdf.numbered(2, "Doen - deelnemer op eigen pc")
    pdf.numbered(3, "Controleren - helper loopt rond")
    pdf.numbered(4, "Pauzeren")

    pdf.h2("Voorbereiding")
    pdf.bullet("Pc's aan, internet werkt")
    pdf.bullet("Extra muizen")
    pdf.bullet("Helper: Windows vs Mac 1-op-1")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Vandaag zoeken op Google - op de computer. Rustig tempo.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam. Windows of Mac?")
    pdf.h3("12:25-12:40 - Browser (oefentaak 1)")
    pdf.h3("12:40-13:05 - Zoeken (oefentaak 2)")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:30 - Resultaat (oefentaak 3)")
    pdf.h3("13:30-13:40 - Eigen vraag (oefentaak 4)")
    pdf.body("Nazorg. Volgende: Fc2.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 4")
    pdf.bullet("Niet schrappen: browser + zoeken + een resultaat")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Zoeken met Google", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket F  -  computer")
    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Browser openen")
    pdf.numbered(2, "Zoeken op Google")
    pdf.numbered(3, "Resultaat openen en terug")
    pdf.numbered(4, "Zelf een zoekvraag")
    pdf.box("Onthoud", ["Meerdere woorden. Geen Gesponsord. Pijl terug = zoeklijst."])
    pdf.body("Vast? Hand opsteken - de helper komt naar u toe.")

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.h2("Oefentaak 1 - Browser")
    pdf.numbered(1, "Open Edge of Chrome.")
    pdf.body("Klaar als: browser open is.")
    pdf.h2("Oefentaak 2 - Zoeken")
    pdf.numbered(1, "Typ: recept pannenkoeken of weer morgen. Enter.")
    pdf.body("Klaar als: u resultaten ziet.")
    pdf.h2("Oefentaak 3 - Resultaat")
    pdf.numbered(1, "Klik resultaat (geen Gesponsord). Pijl terug.")
    pdf.body("Klaar als: u terug bent bij de lijst.")
    pdf.h2("Oefentaak 4 - Eigen vraag")
    pdf.numbered(1, "Zoek kapper, postkantoor of apotheek.")
    pdf.body("Klaar als: eigen zoekvraag gedaan.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in ["Pc's aan, internet werkt", "Extra muizen", "8-10x kaarten", "Helper Windows/Mac"]:
        pdf.check(t)
    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Browser openen. Typ vraag. Enter. Klik resultaat. Pijl terug.",
            "Gesponsord = advertentie.",
            "seniorease.nl",
            "Volgende: Fc2 Websites en tabbladen.",
        ]
    )
    pdf.h2("Licentie")
    pdf.body("Copyright SeniorEase. Printen voor uzelf of lesgroep mag.")

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
