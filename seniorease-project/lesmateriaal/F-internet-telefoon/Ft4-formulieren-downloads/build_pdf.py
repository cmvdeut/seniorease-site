#!/usr/bin/env python3
"""Ft4 Formulieren en downloads - telefoon/tablet, WhatsApp-stijl."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = (
    Path(__file__).resolve().parent
    / "pdf"
    / "SeniorEase-Ft4-Formulieren-Downloads-v1.pdf"
)


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF(
        "SeniorEase  |  Ft4 Formulieren & downloads  |  Pakket F  |  v1.0",
        package_label="Pakket F - Internet (telefoon/tablet)",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "Ft4 - Formulieren invullen en downloads terugvinden",
        "Lesmiddag 90 minuten",
        "Rustige doe-middag op het eigen toestel: een formulier invullen, "
        "een bestand downloaden en terugvinden. Geen bord, geen computer.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Kaart: downloads terugvinden",
            "5. Zaalchecklist",
            "6. Nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Pakket F-telefoon (4 lessen): EUR 19,95",
            "Laatste les van pakket F (telefoon/tablet)",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5,
        "Toon: volwassen, rustig. Kijken, doen, controleren, pauzeren. Wifi nodig.",
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted(
        "90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon of tablet + wifi  |  Geen bord/beamer"
    )

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Een formulier op een website openen en velden invullen",
            "Door een formulier scrollen en het toetsenbord gebruiken",
            "Een bestand downloaden via een veilige link",
            "Een download terugvinden in Bestanden/Downloads",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen formulier verzenden (alleen oefenen)")
    pdf.bullet("Geen DigiD, bank of betalen (pakket E / D)")
    pdf.bullet("Geen downloads van onbekende sites")
    pdf.bullet("Geen computer")

    pdf.h2("Didactiek")
    pdf.numbered(1, "Kijken - u toont op uw toestel")
    pdf.numbered(2, "Doen")
    pdf.numbered(3, "Controleren - helper loopt rond")
    pdf.numbered(4, "Pauzeren")

    pdf.h2("Voorbereiding")
    pdf.bullet("Wifi-wachtwoord op A4")
    pdf.bullet("Veilige downloadlink klaar (bijv. PDF op seniorease.nl)")
    pdf.bullet("Kaart downloads terugvinden uit deze PDF printen")
    pdf.bullet("Eigen toestel klaar om voor te doen")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Wifi. Vandaag: formulier invullen en download terugvinden.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + Android of iPhone. Wel eens iets gedownload?")
    pdf.h3("12:25-12:45 - Stap 1: formulier openen (oefentaak 1)")
    pdf.body("seniorease.nl - contactpagina.")
    pdf.h3("12:45-13:05 - Stap 2: invullen (oefentaak 2)")
    pdf.body("Jan, test@voorbeeld.nl, Dit is een oefening. Niet verzenden.")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:30 - Stap 3: downloaden (oefentaak 3)")
    pdf.body("Veilige link van u. PDF openen of downloaden.")
    pdf.h3("13:30-13:40 - Stap 4: terugvinden (oefentaak 4)")
    pdf.body("App Bestanden - Downloads.")
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorg. Laatste les pakket F. Overheid = pakket E.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Download in browser is genoeg als terugvinden te lastig is")
    pdf.bullet("Niet schrappen: formulier invullen + een download")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 14)
    pdf.cell(
        0,
        11,
        "  Formulieren en downloads",
        new_x="LMARGIN",
        new_y="NEXT",
        fill=True,
    )
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket F  -  telefoon of tablet  -  wifi nodig")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Contactformulier openen")
    pdf.numbered(2, "Velden invullen (niet verzenden)")
    pdf.numbered(3, "Een bestand downloaden")
    pdf.numbered(4, "Download terugvinden")

    pdf.h2("Handige woorden")
    pdf.bullet("Formulier = pagina met lege vakken om in te typen")
    pdf.bullet("Download = bestand van internet naar uw telefoon")
    pdf.bullet("Downloads = map waar die bestanden staan")

    pdf.h2("Tips")
    pdf.bullet("Tik Klaar/Gereed op toetsenbord om het weg te halen")
    pdf.bullet("Controleer altijd voordat u op Verzenden tikt")
    pdf.bullet("Vast? Hand opsteken - de helper komt naar u toe")

    pdf.box(
        "Onthoud",
        [
            "Oefenen mag. Verzenden doet u thuis pas als u zeker bent. "
            "Gemeente en DigiD: pakket E.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Wifi aan. Download alleen wat de begeleider aanwijst. Formulier niet verzenden.")

    pdf.h2("Oefentaak 1 - Formulier openen")
    pdf.numbered(1, "Open Chrome of Safari.")
    pdf.numbered(2, "Ga naar seniorease.nl.")
    pdf.numbered(3, "Open de contactpagina.")
    pdf.body("Klaar als: u invulvelden ziet.")

    pdf.h2("Oefentaak 2 - Velden invullen")
    pdf.numbered(1, "Naam: Jan")
    pdf.numbered(2, "E-mail: test@voorbeeld.nl")
    pdf.numbered(3, "Bericht: Dit is een oefening")
    pdf.numbered(4, "Niet op Verzenden tikken.")
    pdf.body("Klaar als: drie velden zijn ingevuld.")

    pdf.h2("Oefentaak 3 - Downloaden")
    pdf.numbered(1, "Open de veilige link van de begeleider.")
    pdf.numbered(2, "Tik op Downloaden of Openen.")
    pdf.numbered(3, "Wacht op de melding.")
    pdf.body("Klaar als: bestand is opgeslagen of geopend.")

    pdf.h2("Oefentaak 4 - Terugvinden")
    pdf.numbered(1, "Open app Bestanden.")
    pdf.numbered(2, "Tik op Downloads.")
    pdf.numbered(3, "Open het oefenbestand opnieuw.")
    pdf.body("Klaar als: u het bestand weer ziet.")

    pdf.h2("Android / iPhone (helper)")
    pdf.bullet("Android: Bestanden-app; Chrome download-icoon")
    pdf.bullet("iPhone: Bestanden-app; Safari Opslaan in Bestanden")
    pdf.bullet("Pop-ups negeren")
    pdf.bullet("Overheid: pakket E")

    pdf.add_page()
    pdf.h1("4. Kaart - downloads terugvinden")
    pdf.muted("Print 1x. Begeleider houdt omhoog of op tafel. Geen bord nodig.")
    pdf.ln(4)
    pdf.box(
        "Android",
        [
            "1. App Bestanden (map-icoon) openen",
            "2. Tik op Downloads",
            "3. Tik op het bestand om te openen",
            "Of: in Chrome het pijltje-omlaag-icoon (downloads)",
        ],
    )
    pdf.ln(4)
    pdf.box(
        "iPhone / iPad",
        [
            "1. App Bestanden openen",
            "2. Tik op Browse - Downloads (of Op mijn iPhone)",
            "3. Tik op het bestand",
            "Of: in Safari - de download-melding bovenin",
        ],
    )
    pdf.ln(4)
    pdf.body(
        "Alleen downloaden van sites die u vertrouwt. "
        "Formulieren van gemeente of Belastingdienst: pakket E - DigiD & overheid."
    )

    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "Geen bord of beamer nodig",
        "Wifi + wachtwoord op A4",
        "Veilige downloadlink genoteerd (PDF seniorease.nl)",
        "Kaart downloads terugvinden geprint",
        "Begeleider-toestel klaar om voor te doen",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
        "Helper: Android en iPhone",
    ]:
        pdf.check(t)

    pdf.h1("6. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Formulier: veld tikken, typen, controleren - dan pas Verzenden.",
            "Download: veilige site. Bestanden-app - Downloads.",
            "Gemeente, DigiD, Belastingdienst: pakket E.",
            "seniorease.nl",
            "Pakket F (telefoon/tablet) afgerond. Computer? Pakket F-computer.",
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
