#!/usr/bin/env python3
"""E1 DigiD - telefoon/tablet of computer, met kaders."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-E1-DigiD-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  E1 DigiD  |  Pakket E  |  v1.0",
        package_label="Pakket E - DigiD & digitale overheid")
    pdf.alias_nb_pages()

    pdf.cover(
        "E1 - DigiD",
        "Lesmiddag 90 minuten",
        "DigiD leren kennen: digid.nl zelf openen, inlogscherm bekijken, DigiD-app "
        "vinden, codes nooit delen. Telefoon/tablet of computer (kaders in de oefeningen). "
        "Geen bord. Geen vervanging van Digisterker/IDO.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Echt inloggen niet verplicht - codes niet hardop",
            "Pakket E (4 lessen): EUR 19,95",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Aanvragen DigiD: 1-op-1 of IDO - niet klassikaal met paspoorten.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon/tablet of computer  |  Geen bord")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Uitleggen waar DigiD voor is",
            "digid.nl zelf openen (typen)",
            "DigiD-app vinden of weten dat die op de telefoon hoort",
            "Codes nooit delen via WhatsApp of vreemde bellers",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen klassikale DigiD-aanvraag")
    pdf.bullet("Geen codes hardop")
    pdf.bullet("Geen claim: vervangt Digisterker")
    pdf.bullet("IDO/bibliotheek mogen noemen")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. DigiD rustig. Codes niet hardop.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + telefoon of computer. Al DigiD? Ja/nee.")
    pdf.h3("12:25-12:40 - Stap 1: wat is DigiD + digid.nl (oefentaak 1)")
    pdf.body("Digitale sleutel voor overheid. Typ digid.nl zelf.")
    pdf.h3("12:40-13:00 - Stap 2: inlogscherm (oefentaak 2)")
    pdf.body("Bekijken. Inloggen optioneel 1-op-1 met helper.")
    pdf.h3("13:00-13:05 - Pauze")
    pdf.h3("13:05-13:25 - Stap 3: DigiD-app (oefentaak 3)")
    pdf.body("App zoeken/openen. Op computer: digid.nl; app hoort op de telefoon.")
    pdf.h3("13:25-13:40 - Stap 4: veiligheid (oefentaak 4)")
    pdf.body("Geen code via telefoon/WhatsApp. Nee zeggen oefenen.")
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorg. Volgende: E2 MijnOverheid. IDO noemen.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap app-installatie")
    pdf.bullet("Niet schrappen: digid.nl typen + codes niet delen")

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
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket E  -  telefoon/tablet of computer")
    pdf.ln(2)

    pdf.h2("Wat is DigiD?")
    pdf.body(
        "DigiD is uw digitale sleutel om in te loggen bij de overheid "
        "(Belastingdienst, zorg, gemeente, MijnOverheid)."
    )

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "digid.nl zelf typen")
    pdf.numbered(2, "Inlogscherm bekijken")
    pdf.numbered(3, "DigiD-app vinden")
    pdf.numbered(4, "Codes niet delen")

    pdf.h2("Veilig")
    pdf.bullet("Typ digid.nl zelf - klik niet op een link in een rare mail of SMS")
    pdf.bullet("Geef nooit uw DigiD-code via WhatsApp of een onbekende beller")
    pdf.bullet("Hulp nodig bij aanvragen? IDO in veel bibliotheken / Digisterker")

    pdf.box("Echt adres", ["digid.nl"])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Codes en wachtwoorden niet hardop. Inloggen niet verplicht.")

    pdf.h2("Oefentaak 1 - digid.nl openen")
    pdf.body("Op telefoon/tablet: Chrome of Safari - typ digid.nl")
    pdf.body("Op de computer: Edge of Chrome - typ digid.nl - Enter")
    pdf.body("Klaar als: de DigiD-site open is en digid.nl in de balk staat.")

    pdf.h2("Oefentaak 2 - Inlogscherm")
    pdf.numbered(1, "Zoek Inloggen.")
    pdf.numbered(2, "Bekijk de velden.")
    pdf.numbered(3, "Niet verplicht inloggen - of 1-op-1 met de helper.")
    pdf.body("Klaar als: u het inlogscherm heeft gezien.")

    pdf.h2("Oefentaak 3 - DigiD-app")
    pdf.body("Telefoon/tablet: zoek of open de DigiD-app (of in de store).")
    pdf.body("Computer: geen app op de pc - u gebruikt digid.nl; app hoort op de telefoon.")
    pdf.body("Klaar als: u de app heeft gezien of weet waar die hoort.")

    pdf.h2("Oefentaak 4 - Codes niet delen")
    pdf.body('Zeg: "Nee. Ik geef geen DigiD-code via telefoon of WhatsApp."')
    pdf.body("Daarna: negeren / ophangen - zelf digid.nl of de app - of IDO.")
    pdf.body("Klaar als: u de zin een keer heeft gedaan.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Geen bord verplicht",
        "Wifi op A4",
        "digid.nl bereikbaar",
        "Geen klassikale aanvraag met ID-bewijzen",
        "Helper voor 1-op-1 inloggen",
        "IDO/Digisterker-info paraat",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
    ]:
        pdf.check(t)

    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Typ digid.nl zelf. DigiD-app op de telefoon. Codes nooit via WhatsApp of vreemde bellers.",
            "Aanvragen of vastgelopen? IDO / Digisterker / digid.nl",
            "seniorease.nl",
            "Volgende les: E2 MijnOverheid.",
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
