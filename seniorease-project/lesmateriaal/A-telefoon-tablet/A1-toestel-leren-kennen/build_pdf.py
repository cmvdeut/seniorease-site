#!/usr/bin/env python3
"""A1 Toestel leren kennen - telefoon/tablet, WhatsApp-stijl."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-A1-Toestel-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  A1 Toestel leren kennen  |  Pakket A  |  v1.0",
        package_label="Pakket A - Telefoon & tablet")
    pdf.alias_nb_pages()

    pdf.cover(
        "A1 - Uw smartphone of tablet leren kennen",
        "Lesmiddag 90 minuten",
        "Rustige doe-middag op het eigen toestel: aan/uit, startscherm, scrollen, "
        "een app openen en terug. Geen bord, geen presentatie, geen computer.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Pakket A (4 lessen): EUR 19,95",
            "Volgende les: A2 Apps installeren",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5,
        "Toon: volwassen, rustig. Kijken, doen, controleren, pauzeren. Geen tempo.",
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted(
        "90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon of tablet  |  Geen bord/beamer"
    )

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Scherm aan/uit en vergrendelen",
            "Startscherm herkennen en terugkeren",
            "Scrollen / vegen",
            "Een app openen en weer terug naar start",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen apps installeren (A2)")
    pdf.bullet("Geen wifi instellen (A3)")
    pdf.bullet("Geen fotos maken (A4)")
    pdf.bullet("Geen computer, bord of presentatie")

    pdf.h2("Didactiek")
    pdf.numbered(1, "Kijken - u toont op uw toestel")
    pdf.numbered(2, "Doen")
    pdf.numbered(3, "Controleren - helper loopt rond")
    pdf.numbered(4, "Pauzeren")

    pdf.h2("Voorbereiding")
    pdf.bullet("Oplaadkabels / powerbank meenemen")
    pdf.bullet("Eigen toestel klaar om voor te doen")
    pdf.bullet("Helper: Android vs iPhone 1-op-1")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Eigen toestel. Geen tempo. We wachten op elkaar.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + Android of iPhone/iPad.")
    pdf.h3("12:25-12:40 - Stap 1: aan/uit en vergrendelen (oefentaak 1)")
    pdf.body("Knop zijkant. Ontgrendelen zoals zij gewend zijn. Codes niet hardop.")
    pdf.h3("12:40-13:00 - Stap 2: startscherm (oefentaak 2)")
    pdf.body("Iconen herkennen. Terug naar start: rondje, veeg of Home.")
    pdf.h3("13:00-13:05 - Pauze")
    pdf.h3("13:05-13:25 - Stap 3: scrollen (oefentaak 3)")
    pdf.body("Zacht vegen. Alsof u papier verschuift.")
    pdf.h3("13:25-13:40 - Stap 4: app openen en terug (oefentaak 4)")
    pdf.body("Klok, Weer of Instellingen openen - niets wijzigen - terug naar start.")
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorg. Volgende: A2.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 3")
    pdf.bullet("Niet schrappen: vergrendelen, startscherm, app openen/terug")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Toestel leren kennen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket A  -  telefoon of tablet")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Scherm aan en vergrendelen")
    pdf.numbered(2, "Startscherm vinden")
    pdf.numbered(3, "Vegen / scrollen")
    pdf.numbered(4, "Een app openen en terug")

    pdf.h2("Handige knoppen")
    pdf.bullet("Aan/uit: vaak aan de zijkant - kort drukken = scherm aan/uit")
    pdf.bullet("Volume: knoppen aan de zijkant")
    pdf.bullet("Terug naar start: rondje/veeg (Android) of veeg omhoog/Home (iPhone)")

    pdf.h2("Tips")
    pdf.bullet("Druk niet te hard - een zachte tik of veeg is genoeg")
    pdf.bullet("Codes niet hardop zeggen")
    pdf.bullet("Vast? Hand opsteken - de helper komt naar u toe")

    pdf.box("Onthoud", ["Startscherm = de iconen. Daar wilt u vaak terugkomen."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Op uw eigen telefoon of tablet.")

    pdf.h2("Oefentaak 1 - Scherm aan en vergrendelen")
    pdf.numbered(1, "Druk kort op de aan/uit-knop.")
    pdf.numbered(2, "Ontgrendel zoals u gewend bent.")
    pdf.numbered(3, "Zet het scherm weer op slot met dezelfde knop.")
    pdf.body("Klaar als: scherm aan en weer vergrendeld. Code niet hardop zeggen.")

    pdf.h2("Oefentaak 2 - Startscherm")
    pdf.numbered(1, "Ontgrendel.")
    pdf.numbered(2, "Zoek de iconen (startscherm).")
    pdf.numbered(3, "Open per ongeluk iets? Ga terug naar start (rondje, veeg of Home).")
    pdf.body("Klaar als: u de iconen weer ziet.")

    pdf.h2("Oefentaak 3 - Scrollen / vegen")
    pdf.numbered(1, "Veeg zacht omhoog of naar links.")
    pdf.numbered(2, "Kijk of er meer iconen verschijnen.")
    pdf.numbered(3, "Veeg terug naar een vertrouwd scherm.")
    pdf.body("Klaar als: u een keer heeft geveegd en weer terug bent.")

    pdf.h2("Oefentaak 4 - App openen en terug")
    pdf.numbered(1, "Tik op Klok, Weer of Instellingen.")
    pdf.numbered(2, "Kijk kort. Wijzig niets.")
    pdf.numbered(3, "Ga terug naar het startscherm.")
    pdf.body("Klaar als: app was open en u ziet weer de iconen.")

    pdf.h2("Android / iPhone (helper)")
    pdf.bullet("Android: vaak rondje of veeg omhoog naar start")
    pdf.bullet("iPhone/iPad: veeg omhoog of Home-knop")
    pdf.bullet("Alleen helpen bij wie vastzit")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Geen bord of beamer nodig",
        "Oplaadkabels / powerbank",
        "Begeleider-toestel klaar om voor te doen",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
        "Helper: Android en iPhone",
    ]:
        pdf.check(t)

    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Aan/uit-knop = scherm aan of op slot. Startscherm = de iconen.",
            "App openen: tik. Terug: rondje, veeg of Home.",
            "seniorease.nl",
            "Volgende les: A2 Apps installeren, verwijderen en bijwerken.",
        ]
    )
    pdf.h2("Licentie")
    pdf.body(
        "Copyright SeniorEase. Printen voor uzelf of een lesgroep mag. "
        "Niet doorverkopen zonder toestemming."
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
