#!/usr/bin/env python3
"""E2 MijnOverheid."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-E2-MijnOverheid-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  E2 MijnOverheid  |  Pakket E  |  v1.0",
        package_label="Pakket E - DigiD & digitale overheid")
    pdf.alias_nb_pages()

    pdf.cover(
        "E2 - MijnOverheid",
        "Lesmiddag 90 minuten",
        "mijnoverheid.nl zelf openen, Inloggen met DigiD vinden, optioneel veilig "
        "inloggen (1-op-1). Telefoon/tablet of computer. Geen bord. Privacy eerst.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Inloggen optioneel - codes niet hardop",
            "Pakket E (4 lessen): EUR 19,95",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Tot aan DigiD-scherm is genoeg als iemand niet wil inloggen.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon/tablet of computer")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "mijnoverheid.nl zelf openen",
            "Uitleggen wat MijnOverheid ongeveer is",
            "Inloggen met DigiD vinden",
            "Optioneel veilig inloggen en uitloggen",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen berichten hardop voorlezen")
    pdf.bullet("Geen codes hardop")
    pdf.bullet("Geen aangifte vandaag (E3)")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Digitale brievenbus. Inloggen mag, hoeft niet.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + apparaat. Al MijnOverheid gebruikt?")
    pdf.h3("12:25-12:45 - Stap 1: site openen (oefentaak 1)")
    pdf.body("Typ mijnoverheid.nl. Check adresbalk.")
    pdf.h3("12:45-13:05 - Stap 2: Inloggen vinden (oefentaak 2)")
    pdf.body("Kort wat het is. Knop Inloggen / DigiD.")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:35 - Stap 3: DigiD optioneel (oefentaak 3)")
    pdf.body("1-op-1 login. Scherm van de groep weg. Berichten alleen voor zichzelf.")
    pdf.h3("13:35-13:45 - Stap 4: uitloggen + afronding (oefentaak 4)")
    pdf.body("Uitloggen. Nazorg. Volgende: E3.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Geen echte login")
    pdf.bullet("Niet schrappen: site typen + Inloggen-knop")

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
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket E  -  telefoon/tablet of computer")
    pdf.ln(2)

    pdf.h2("Wat is MijnOverheid?")
    pdf.body(
        "Een persoonlijke pagina waar de overheid berichten en gegevens kan tonen. "
        "U logt in met DigiD."
    )

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "mijnoverheid.nl typen")
    pdf.numbered(2, "Inloggen-knop vinden")
    pdf.numbered(3, "Optioneel: inloggen en uitloggen")

    pdf.h2("Veilig")
    pdf.bullet("Typ mijnoverheid.nl zelf")
    pdf.bullet("Codes niet hardop; scherm bij inloggen priv")
    pdf.bullet("Berichten niet hardop voorlezen in de zaal")

    pdf.box("Echte adressen", ["mijnoverheid.nl", "digid.nl"])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Inloggen optioneel. Privacy eerst.")

    pdf.h2("Oefentaak 1 - Site openen")
    pdf.body("Telefoon/tablet of computer: typ mijnoverheid.nl")
    pdf.body("Klaar als: juiste adres in de balk.")

    pdf.h2("Oefentaak 2 - Inloggen vinden")
    pdf.numbered(1, "Zoek Inloggen / DigiD.")
    pdf.numbered(2, "Tik/klik - stop als u niet wilt inloggen.")
    pdf.body("Klaar als: u de knop heeft gevonden.")

    pdf.h2("Oefentaak 3 - Optioneel inloggen")
    pdf.numbered(1, "Helper 1-op-1.")
    pdf.numbered(2, "Log in - codes stil.")
    pdf.numbered(3, "Kijk alleen voor uzelf naar de startpagina.")
    pdf.body("Klaar als: ingelogd of bewust overgeslagen.")

    pdf.h2("Oefentaak 4 - Uitloggen")
    pdf.body("Zoek Uitloggen / Afmelden. Of startscherm als u niet was ingelogd.")
    pdf.body("Klaar als: netjes afgesloten.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Wifi op A4",
        "mijnoverheid.nl bereikbaar",
        "Helper vrij voor 1-op-1 login",
        "Geen hardop voorlezen van berichten",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
    ]:
        pdf.check(t)

    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Typ mijnoverheid.nl zelf. Inloggen met DigiD. Daarna uitloggen.",
            "Berichten zijn prive. Hulp: IDO / Digisterker.",
            "seniorease.nl",
            "Volgende les: E3 Gemeente / Belastingdienst.",
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
