#!/usr/bin/env python3
"""A2 Apps installeren - telefoon/tablet."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import ALessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-A2-Apps-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = ALessonPDF(
        f"SeniorEase  |  A2 Apps  |  Pakket A  |  {LESSON_VERSION}",
        package_label="Pakket A - Telefoon & tablet",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "A2 - Apps installeren, verwijderen en bijwerken",
        "Lesmiddag 90 minuten",
        "Op het eigen toestel: store openen, app controleren (naam, maker, beoordeling), "
        "gratis installeren, één minuut gebruiken, verwijderen met helper, updates bekijken, "
        "en zelfstandig opnieuw oefenen. Wachtwoorden niet hardop. Alleen gratis oefen-apps. "
        "Geen bord, geen presentatie.",
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
            "Vorige: A1 - Volgende: A3 Wifi",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Wifi aanbevolen  |  Geen bord/beamer")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Play Store of App Store openen",
            "App controleren: naam, maker, beoordeling; gratis vs betaald",
            "Een betrouwbare app installeren",
            "De nieuwe app één minuut gebruiken",
            "Eén app verwijderen (alleen na goedkeuring helper, of oefen-app)",
            "Updates vinden (en eventueel een bijwerken)",
            "Zelfstandig: zoeken - controleren - installeren - openen - terug naar start",
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
    pdf.bullet("Helper keurt verwijderen goed of wijst oefen-app aan")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.tijdlijn_item(
        "12:00-12:15 - Inloop",
        "Wifi. Welkom. Rustig een app installeren. Wachtwoorden stil.",
    )
    pdf.tijdlijn_item(
        "12:15-12:25 - Kennismaking",
        "Voornaam + Android/iPhone. Heeft u een store-account?",
    )
    pdf.tijdlijn_item(
        "12:25-12:38 - Stap 1: store openen (oefentaak 1)",
        "Play Store of App Store. Controleren: kunt u zoeken?",
    )
    pdf.tijdlijn_item(
        "12:38-13:02 - Stap 2: controleren en installeren (oefentaak 2)",
        "Zoek KNMI (of afgesproken app). Controleer naam, maker, beoordeling. "
        "Leg kort uit: Gratis = niets betalen; prijs = overslaan; in-app aankopen = "
        "binnenin betalen - vandaag niet. Installeren/Haal. "
        "Machtigingen: Lees eerst waar de app toegang toe vraagt. Begrijpt u niet waarom? "
        "Kies Niet toestaan en vraag hulp.",
    )
    pdf.tijdlijn_item("13:02-13:07 - Pauze", "")
    pdf.tijdlijn_item(
        "13:07-13:18 - Stap 3: één minuut gebruiken (oefentaak 3)",
        "Nieuwe app openen. Eén minuut kijken. Terug naar start.",
    )
    pdf.tijdlijn_item(
        "13:18-13:28 - Stap 4: app verwijderen (oefentaak 4)",
        "Alleen na goedkeuring helper, of op oefen-app. Lang indrukken - Verwijderen - "
        "bevestigen. Niet zomaar een app verwijderen.",
    )
    pdf.tijdlijn_item(
        "13:28-13:36 - Stap 5: updates (oefentaak 5)",
        "Updatescherm tonen. Een update mag; niet alles forceren.",
    )
    pdf.tijdlijn_item(
        "13:36-13:43 - Eindopdracht zelfstandig (oefentaak 6)",
        "Zoeken - controleren - installeren - openen - terug naar start. "
        "Tweede gratis app of zelfde stappen opnieuw.",
    )
    pdf.tijdlijn_item("13:43-13:45 - Afronding", "Nazorg. Volgende: A3.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 6 (eindopdracht) of verkort oefentaak 5")
    pdf.bullet("Niet schrappen: store + controleren + installeren + één minuut gebruiken")

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
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket A  -  telefoon of tablet  -  v1.1")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Play Store of App Store openen")
    pdf.numbered(2, "App controleren en installeren")
    pdf.numbered(3, "App één minuut gebruiken")
    pdf.numbered(4, "App verwijderen (met helper)")
    pdf.numbered(5, "Updates bekijken")
    pdf.numbered(6, "Zelfstandig: zoeken - controleren - installeren - openen - start")

    pdf.h2("Welke store?")
    pdf.bullet("Android: Play Store (kleuren-driehoekje)")
    pdf.bullet("iPhone / iPad: App Store (blauwe A)")

    pdf.h2("Tips")
    pdf.bullet("Controleer appnaam, maker en beoordeling vóór installeren")
    pdf.bullet("Alleen gratis vandaag - prijs of in-app aankopen overslaan")
    pdf.bullet(
        "Pop-up over toegang? Lees eerst. Begrijpt u niet waarom? Niet toestaan - vraag hulp"
    )
    pdf.bullet("Verwijderen alleen na goedkeuring helper")
    pdf.bullet("Wachtwoorden niet hardop zeggen")

    pdf.box(
        "Onthoud",
        [
            "Controleren - installeren - één minuut gebruiken - terug naar start.",
            "Verwijderen alleen met helper.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Wifi bij voorkeur aan. Wachtwoorden stil. Versie 1.1.")

    pdf.h2("Oefentaak 1 - Store openen")
    pdf.body("Android: Play Store. iPhone/iPad: App Store. Tik erop.")
    pdf.body("Klaar als: u kunt zoeken.")

    pdf.h2("Oefentaak 2 - Een app installeren")
    pdf.numbered(1, "Tik op Zoeken (vergrootglas).")
    pdf.numbered(2, "Typ de naam die de begeleider zegt (bijv. KNMI).")
    pdf.numbered(3, "Controleer: appnaam, maker/ontwikkelaar, beoordelingen.")
    pdf.numbered(4, "Gratis? Ja. Prijs of in-app aankopen? Vandaag overslaan.")
    pdf.numbered(5, "Tik Installeren / Download / Haal. Wacht tot het icoon verschijnt.")
    pdf.body(
        "Pop-up over toegang? Lees eerst waar de app toegang toe vraagt. "
        "Begrijpt u niet waarom? Kies Niet toestaan en vraag hulp."
    )
    pdf.body("Klaar als: het nieuwe icoon zichtbaar is.")

    pdf.h2("Oefentaak 3 - App één minuut gebruiken")
    pdf.numbered(1, "Tik op het nieuwe icoon.")
    pdf.numbered(2, "Kijk of de app opent.")
    pdf.numbered(3, "Blijf één minuut in de app - scroll of tik op iets.")
    pdf.numbered(4, "Ga terug naar het startscherm.")
    pdf.body("Klaar als: u de app één minuut heeft gebruikt.")

    pdf.h2("Oefentaak 4 - App verwijderen")
    pdf.numbered(1, "Vraag eerst de helper: welke app mag weg? Of oefen-app?")
    pdf.numbered(2, "Verwijder niet zomaar zonder goedkeuring helper.")
    pdf.numbered(3, "Houd het icoon lang ingedrukt.")
    pdf.numbered(4, "Kies Verwijderen / Verwijder app / Deïnstalleren. Bevestig.")
    pdf.body("Klaar als: met goedkeuring helper één app verwijderd (vaak oefen-app).")

    pdf.h2("Oefentaak 5 - Updates")
    pdf.numbered(1, "Open opnieuw de store.")
    pdf.numbered(2, "Zoek Updates (vaak via account/profiel).")
    pdf.numbered(3, "Kijk of er updates zijn. Een bijwerken mag.")
    pdf.body("Klaar als: u het updatescherm heeft gezien.")

    pdf.h2("Oefentaak 6 - Zelfstandig (eindopdracht)")
    pdf.numbered(1, "Zoeken - store open, app opzoeken.")
    pdf.numbered(2, "Controleren - naam, maker, beoordeling; alleen gratis.")
    pdf.numbered(3, "Installeren - wachten tot het icoon er is.")
    pdf.numbered(4, "Openen - app starten.")
    pdf.numbered(5, "Terug naar start - startscherm.")
    pdf.body("Klaar als: u alle vijf stappen zelf heeft gedaan.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Geen bord of beamer nodig",
        "Wifi-wachtwoord op A4",
        "Oefen-app afgesproken (bijv. KNMI)",
        "Helper keurt verwijderen goed of wijst oefen-app aan",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
    ]:
        pdf.check(t)

    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Android: Play Store. iPhone: App Store. Controleer naam, maker, beoordeling.",
            "Gratis = ok. Prijs of in-app aankopen = overslaan.",
            "Pop-up? Lees eerst. Niet begrijpen? Niet toestaan - vraag hulp.",
            "Verwijderen alleen met helper. Updates: in de store.",
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
