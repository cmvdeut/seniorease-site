#!/usr/bin/env python3
"""A2 Apps installeren - telefoon/tablet."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-A2-Apps-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  A2 Apps  |  Pakket A  |  v1.0",
        package_label="Pakket A - Telefoon & tablet")
    pdf.alias_nb_pages()

    pdf.cover(
        "A2 - Apps installeren, verwijderen en bijwerken",
        "Lesmiddag 90 minuten",
        "Op het eigen toestel: Play Store of App Store openen, een betrouwbare app "
        "installeren, weten hoe verwijderen en updates werken. Geen bord, geen presentatie.",
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
            "Vorige: A1 - Volgende: A3 Wifi",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Wachtwoorden niet hardop. Alleen gratis, betrouwbare oefen-app.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Wifi aanbevolen  |  Geen bord/beamer")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Play Store of App Store openen",
            "Een betrouwbare app zoeken en installeren",
            "Weten hoe een app verwijderen werkt",
            "Updates vinden (en eventueel een bijwerken)",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen betaalde apps verplichten")
    pdf.bullet("Geen obscure apps")
    pdf.bullet("Geen wachtwoorden hardop")
    pdf.bullet("Geen computer, bord of presentatie")

    pdf.h2("Voorbereiding")
    pdf.bullet("Wifi-wachtwoord op A4")
    pdf.bullet("Afgesproken oefen-app: bijv. KNMI (gratis)")
    pdf.bullet("Helper voor Google-/Apple-account")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Wifi. Welkom. Rustig een app installeren. Wachtwoorden stil.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + Android/iPhone. Heeft u een store-account?")
    pdf.h3("12:25-12:40 - Stap 1: store openen (oefentaak 1)")
    pdf.body("Play Store of App Store. Controleren: kunt u zoeken?")
    pdf.h3("12:40-13:05 - Stap 2: installeren (oefentaak 2)")
    pdf.body("Zoek KNMI (of afgesproken app). Installeren/Haal. Wacht op icoon.")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:25 - Stap 3: openen + verwijderen (oefentaak 3)")
    pdf.body("Nieuwe app openen. Verwijderen uitleggen; echt verwijderen optioneel.")
    pdf.h3("13:25-13:40 - Stap 4: updates (oefentaak 4)")
    pdf.body("Updatescherm tonen. Een update mag; niet alles forceren.")
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorg. Volgende: A3.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 4")
    pdf.bullet("Niet schrappen: store + een app installeren")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Apps installeren", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket A  -  telefoon of tablet")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Play Store of App Store openen")
    pdf.numbered(2, "Een app zoeken en installeren")
    pdf.numbered(3, "App openen; verwijderen kennen")
    pdf.numbered(4, "Updates bekijken")

    pdf.h2("Welke store?")
    pdf.bullet("Android: Play Store (kleuren-driehoekje)")
    pdf.bullet("iPhone / iPad: App Store (blauwe A)")

    pdf.h2("Tips")
    pdf.bullet("Alleen gratis apps vandaag")
    pdf.bullet("Bij twijfel over de maker: vraag de helper")
    pdf.bullet("Wachtwoorden niet hardop zeggen")

    pdf.box(
        "Onthoud",
        ["Store openen - zoeken - installeren - icoon verschijnt. Klaar."],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Wifi bij voorkeur aan. Wachtwoorden stil.")

    pdf.h2("Oefentaak 1 - Store openen")
    pdf.body("Android: Play Store. iPhone/iPad: App Store. Tik erop.")
    pdf.body("Klaar als: u kunt zoeken.")

    pdf.h2("Oefentaak 2 - Een app installeren")
    pdf.numbered(1, "Tik op Zoeken (vergrootglas).")
    pdf.numbered(2, "Typ de naam die de begeleider zegt (bijv. KNMI).")
    pdf.numbered(3, "Kies de juiste app (vraag bij twijfel).")
    pdf.numbered(4, "Tik Installeren / Download / Haal.")
    pdf.numbered(5, "Wacht tot het icoon verschijnt.")
    pdf.body("Klaar als: het nieuwe icoon zichtbaar is. Bij betaalvraag: stoppen.")

    pdf.h2("Oefentaak 3 - Openen (verwijderen optioneel)")
    pdf.numbered(1, "Tik op het nieuwe icoon.")
    pdf.numbered(2, "Kijk of de app opent. Terug naar start.")
    pdf.numbered(3, "Optioneel: lang indrukken op een app die weg mag - Verwijderen.")
    pdf.body("Klaar als: nieuwe app geopend. Verwijderen niet verplicht.")

    pdf.h2("Oefentaak 4 - Updates")
    pdf.numbered(1, "Open opnieuw de store.")
    pdf.numbered(2, "Zoek Updates (vaak via account/profiel).")
    pdf.numbered(3, "Kijk of er updates zijn. Een bijwerken mag.")
    pdf.body("Klaar als: u het updatescherm heeft gezien.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Geen bord of beamer nodig",
        "Wifi-wachtwoord op A4",
        "Oefen-app afgesproken (bijv. KNMI)",
        "Helper voor Google/Apple-account",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
    ]:
        pdf.check(t)

    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Android: Play Store. iPhone: App Store. Zoeken - installeren - icoon.",
            "Verwijderen: icoon lang indrukken. Updates: in de store.",
            "seniorease.nl",
            "Volgende les: A3 Wifi, mobiele data en verbinding.",
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
