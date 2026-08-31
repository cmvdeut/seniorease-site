#!/usr/bin/env python3
"""A3 Wifi - telefoon/tablet."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import (  # noqa: E402
    GOLD,
    LESSON_VERSION,
    MUTED,
    NAVY,
    WHITE,
    ALessonPDF,
)

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-A3-Wifi-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = ALessonPDF(
        f"SeniorEase  |  A3 Wifi  |  Pakket A  |  {LESSON_VERSION}",
        package_label="Pakket A - Telefoon & tablet",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "A3 - Wifi, mobiele data en verbinding",
        "Lesmiddag 90 minuten",
        "Wifi vinden, veilig netwerk herkennen, verbinden, internet controleren "
        "(seniorease.nl), wifi versus mobiele data begrijpen, en zelf oplossen als "
        "internet niet werkt. Wachtwoord alleen van de leslocatie op het A4. "
        "Geen bord - geen presentatie.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Wifi-A4 (invullen en printen)",
            "5. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket A (4 lessen): EUR 19,95",
            "Vorige: A2 - Volgende: A4 Fotos",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Wifi in de zaal  |  Geen bord/beamer")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Wifi vinden en wifi-symbool bovenaan herkennen",
            "Veilig netwerk herkennen (officieel netwerk van de locatie)",
            "Verbinden met het netwerk van het A4",
            "seniorease.nl openen om internet te controleren",
            "Wifi versus mobiele data begrijpen; beide symbolen herkennen",
            "Zelf stappen volgen bij geen internet",
            "Zelfstandig: wifi - netwerk - verbonden - browser - seniorease.nl - data aanwijzen",
        ],
        1,
    ):
        pdf.numbered(i, t)
    pdf.muted("Extra (niet hoofddoel): netwerk vergeten - alleen met helper indien nodig.")

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen routers, IP-adressen of hotspots")
    pdf.bullet("Mobiele data niet aan- of uitzetten - alleen aanwijzen")
    pdf.bullet("Geen wachtwoorden hardop; geen persoonlijke wachtwoorden op het A4")
    pdf.bullet("Geen computer, bord of presentatie")

    pdf.h2("Voorbereiding")
    pdf.bullet("Wifi-A4: netwerknaam + wachtwoord van de leslocatie (meerdere kopieen)")
    pdf.bullet("Zelf vooraf verbinden ter test")
    pdf.bullet("Helper voor typefouten, verkeerd netwerk en eventueel Vergeten")

    pdf.h2("Veiligheid openbare wifi")
    pdf.body(
        "Gratis Wifi is niet automatisch betrouwbaar. Kies het officiële netwerk van "
        "de locatie (staat op het A4). Bij twijfel: vraag een medewerker."
    )

    pdf.h2("Wifi versus mobiele data (kort)")
    pdf.bullet("Wifi = internet via een wifi-netwerk (thuis, bibliotheek, buurthuis)")
    pdf.bullet("Mobiele data = internet via uw abonnement; kan uit de databundel gaan")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.tijdlijn_item(
        "12:00-12:15 - Inloop",
        "Welkom. Wachtwoord leslocatie op A4. Niet hardop door de zaal.",
    )
    pdf.tijdlijn_item(
        "12:15-12:25 - Kennismaking",
        "Voornaam + Android/iPhone. Thuis al wifi? Symbolen bovenaan?",
    )
    pdf.tijdlijn_item(
        "12:25-12:38 - Stap 1: wifi vinden (oefentaak 1)",
        "Instellingen of snelmenu. Wifi aan. Symbolen bovenaan. Scroll door lijst.",
    )
    pdf.tijdlijn_item(
        "12:38-12:48 - Stap 2: veilig netwerk herkennen",
        "Officieel netwerk van de locatie. Gratis Wifi is niet automatisch veilig.",
    )
    pdf.tijdlijn_item(
        "12:48-13:05 - Stap 3: verbinden (oefentaak 2)",
        "Netwerk van A4. Wachtwoord. Verbinden. Streepjes bovenaan?",
    )
    pdf.tijdlijn_item("13:05-13:10 - Pauze", "")
    pdf.tijdlijn_item(
        "13:10-13:22 - Stap 4: internet controleren (oefentaak 3)",
        "Browser: seniorease.nl. Controleer of de site laadt.",
    )
    pdf.tijdlijn_item(
        "13:22-13:32 - Stap 5: wifi vs data (oefentaak 4)",
        "Verschil uitleggen. Symbolen aanwijzen. Niets aan- of uitzetten.",
    )
    pdf.tijdlijn_item(
        "13:32-13:40 - Stap 6: geen internet, wat nu? (oefentaak 5)",
        "Volgorde: wifi aan? Juist netwerk? Symbool zichtbaar? Website openen? "
        "Nog niet? Vraag hulp.",
    )
    pdf.tijdlijn_item(
        "13:40-13:43 - Eindopdracht zelfstandig (oefentaak 6)",
        "Wifi openen - netwerk herkennen - verbonden? - browser - seniorease.nl - "
        "mobiele data aanwijzen.",
    )
    pdf.tijdlijn_item("13:43-13:45 - Afronding", "Nazorg. Volgende: A4 Fotos.")

    pdf.h2("Extra: netwerk vergeten")
    pdf.body(
        "Alleen indien nodig - helper laat Vergeten zien. Geen hoofdleerdoel; "
        "minder belangrijk dan begrijpen waarom internet niet werkt."
    )

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap eindopdracht (oefentaak 6) of verkort oefentaak 5")
    pdf.bullet(
        "Niet schrappen: wifi vinden + veilig netwerk + verbinden + "
        "seniorease.nl + wifi vs data"
    )

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Wifi en verbinding", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket A  -  telefoon of tablet  -  {LESSON_VERSION}")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Wifi vinden")
    pdf.numbered(2, "Veilig netwerk kiezen en verbinden")
    pdf.numbered(3, "seniorease.nl - internet controleren")
    pdf.numbered(4, "Wifi en mobiele data herkennen")
    pdf.numbered(5, "Geen internet, wat nu?")
    pdf.numbered(6, "Zelfstandig: wifi - netwerk - browser - seniorease.nl - data")

    pdf.h2("Wifi of mobiele data?")
    pdf.bullet("Wifi = internet via wifi-netwerk (thuis, bibliotheek, buurthuis)")
    pdf.bullet("Mobiele data = via abonnement; kan uit databundel gaan")
    pdf.bullet("Symbolen staan bovenaan op uw scherm")

    pdf.box(
        "Geen internet, wat nu?",
        [
            "1. Staat wifi aan?",
            "2. Juiste netwerk gekozen?",
            "3. Wifi-symbool zichtbaar?",
            "4. Website openen",
            "5. Nog niet? Vraag hulp.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted(f"Wachtwoord leslocatie op A4. Niet hardop. Versie {LESSON_VERSION.lstrip('v')}.")

    pdf.h2("Oefentaak 1 - Wifi vinden")
    pdf.numbered(1, "Kijk bovenaan: wifi-symbool (boogjes/streepjes)?")
    pdf.numbered(2, "Open Instellingen - Wifi / Wi-Fi / Netwerk.")
    pdf.numbered(3, "Zet wifi aan. Scroll door de netwerklijst.")
    pdf.body("Klaar als: u netwerknamen ziet.")

    pdf.h2("Oefentaak 2 - Veilig netwerk kiezen en verbinden")
    pdf.body(
        "Gratis Wifi is niet automatisch betrouwbaar. Kies het netwerk van het A4 "
        "(officieel netwerk van de locatie)."
    )
    pdf.numbered(1, "Tik op de netwerknaam van het A4.")
    pdf.numbered(2, "Typ het wachtwoord (hoofdletters letten).")
    pdf.numbered(3, "Verbinden / Join / OK.")
    pdf.body("Klaar als: Verbonden of wifi-streepjes bovenaan.")

    pdf.h2("Oefentaak 3 - Internet controleren")
    pdf.numbered(1, "Open Chrome of Safari.")
    pdf.numbered(2, "Typ: seniorease.nl")
    pdf.numbered(3, "Controleer of u de SeniorEase-site ziet.")
    pdf.body("Klaar als: de pagina laadt.")

    pdf.h2("Oefentaak 4 - Wifi en mobiele data")
    pdf.body(
        "Wifi = via wifi-netwerk. Mobiele data = via abonnement (kan uit databundel)."
    )
    pdf.numbered(1, "Symbolen bovenaan: wifi of data (4G/5G/LTE)?")
    pdf.numbered(2, "Wijs Wifi en Mobiele data aan in Instellingen of snelmenu.")
    pdf.numbered(3, "Zet vandaag niets aan of uit - alleen aanwijzen.")
    pdf.body("Klaar als: u beide kunt aanwijzen en het verschil kent.")

    pdf.h2("Oefentaak 5 - Geen internet, wat nu?")
    pdf.numbered(1, "Staat wifi aan?")
    pdf.numbered(2, "Juiste netwerk gekozen?")
    pdf.numbered(3, "Wifi-symbool zichtbaar?")
    pdf.numbered(4, "Website openen (seniorease.nl).")
    pdf.numbered(5, "Nog niet? Vraag hulp.")
    pdf.body("Klaar als: u de volgorde kent.")

    pdf.h2("Oefentaak 6 - Zelfstandig (eindopdracht)")
    pdf.numbered(1, "Wifi-instellingen openen.")
    pdf.numbered(2, "Juiste netwerk herkennen.")
    pdf.numbered(3, "Controleren of verbonden.")
    pdf.numbered(4, "Browser openen - seniorease.nl.")
    pdf.numbered(5, "Aanwijzen waar mobiele data staat.")
    pdf.body("Klaar als: u alle stappen zelf heeft gedaan.")

    pdf.h2("Extra - Netwerk vergeten (alleen met helper)")
    pdf.body(
        "Geen verplichte oefening. Wifi - verkeerd netwerk - Vergeten - opnieuw verbinden."
    )

    pdf.add_page()
    pdf.h1("4. Wifi-A4 (voor de zaal)")
    pdf.muted(
        "Print en vul in. Alleen het wifi-wachtwoord van de leslocatie - "
        "niet voor thuis of persoonlijke wachtwoorden."
    )
    pdf.ln(4)
    pdf.box(
        "Wifi op deze leslocatie",
        [
            "Netwerknaam: _______________________________",
            "",
            "Wachtwoord: ________________________________________",
            "",
            "Let op hoofdletters en tekens.",
            "Alleen voor vandaag op deze locatie.",
            "Zeg het wachtwoord niet hardop door de zaal.",
        ],
    )
    pdf.ln(4)
    pdf.body("Test vooraf of dit netwerk werkt met 2-3 toestellen.")

    pdf.add_page()
    pdf.h1("5. Zaalchecklist + nazorgkaart")
    for t in [
        "Geen bord of beamer nodig",
        "Wifi werkt; zelf getest",
        "Wifi-A4 ingevuld (leslocatie) - meerdere kopieen",
        "Helper voor typefouten, verkeerd netwerk, eventueel Vergeten",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
    ]:
        pdf.check(t)

    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Wifi = via netwerk op locatie. Data = via abonnement (databundel).",
            "Gratis Wifi is niet automatisch veilig - kies het netwerk van het A4.",
            "Geen internet? Wifi aan - juist netwerk - symbool - website - vraag hulp.",
            "Mobiele data: alleen aanwijzen, niet aan/uit tijdens les.",
            "seniorease.nl",
            "Volgende les: A4 Fotos maken, terugvinden en delen.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
