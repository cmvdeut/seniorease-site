#!/usr/bin/env python3
"""Ft3 QR-codes openen - telefoon/tablet, WhatsApp-stijl."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-Ft3-QR-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF(
        "SeniorEase  |  Ft3 QR-codes  |  Pakket F  |  v1.0",
        package_label="Pakket F - Internet (telefoon/tablet)",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "Ft3 - QR-codes openen",
        "Lesmiddag 90 minuten",
        "Rustige doe-middag op het eigen toestel: QR scannen met de camera, "
        "de link openen, en weten wanneer u wel of niet scant. Geen bord, geen computer.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Kaart: wanneer wel / wanneer niet",
            "5. Zaalchecklist",
            "6. Nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Pakket F-telefoon (4 lessen): EUR 19,95",
            "Volgende les: Ft4 Formulieren en downloads",
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
            "Een QR-code herkennen",
            "Scannen met de camera",
            "De link openen die verschijnt",
            "Weten wanneer ze wel of niet scannen",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen QR van onbekende briefjes ter oefening")
    pdf.bullet("Geen diepe fraudeles (pakket D, les D2)")
    pdf.bullet("Geen betalen of inloggen via QR")
    pdf.bullet("Geen computer")

    pdf.h2("Didactiek")
    pdf.numbered(1, "Kijken - u toont de oefen-QR op A4")
    pdf.numbered(2, "Doen")
    pdf.numbered(3, "Controleren - helper loopt rond")
    pdf.numbered(4, "Pauzeren")

    pdf.h2("Voorbereiding")
    pdf.bullet("Wifi-wachtwoord op A4")
    pdf.bullet("Oefen-QR printen (groot) naar seniorease.nl")
    pdf.bullet("Kaart wanneer wel/niet uit deze PDF printen")
    pdf.bullet("Eigen toestel klaar om voor te doen")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Wifi. Vandaag: QR-codes scannen op uw eigen telefoon.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + Android of iPhone. Al eens menu gescand?")
    pdf.h3("12:25-12:30 - Kort: wat is een QR?")
    pdf.body("Toon oefen-QR. Vierkant met stippen - telefoon opent een website.")
    pdf.h3("12:30-12:50 - Stap 1: scannen (oefentaak 1)")
    pdf.body("Camera. Richten. Wachten op melding.")
    pdf.h3("12:50-13:10 - Stap 2: link openen (oefentaak 2)")
    pdf.body("Tik melding. Browser opent. Kort kijken.")
    pdf.h3("13:10-13:15 - Pauze")
    pdf.h3("13:15-13:30 - Stap 3: nog een keer (oefentaak 3)")
    pdf.body("Camera opnieuw. Zelfde QR. Opnieuw openen.")
    pdf.h3("13:30-13:40 - Stap 4: wanneer wel/niet (oefentaak 4)")
    pdf.body("A4-kaart uit PDF. Verwijs naar D2 voor verdachte QR.")
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorg. Volgende: Ft4 Formulieren en downloads.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 3")
    pdf.bullet("Niet schrappen: scannen + link openen + wanneer-niet-regel")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  QR-codes openen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket F  -  telefoon of tablet  -  wifi nodig")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "QR scannen met de camera")
    pdf.numbered(2, "De link openen")
    pdf.numbered(3, "Nog een keer zelf proberen")
    pdf.numbered(4, "Wanneer wel en wanneer niet scannen")

    pdf.h2("Handige woorden")
    pdf.bullet("QR-code = vierkant met zwarte stippen")
    pdf.bullet("Scannen = camera erop richten; telefoon leest de code")
    pdf.bullet("Melding = link die verschijnt - tik om te openen")

    pdf.h2("Tips")
    pdf.bullet("Houd de telefoon rustig, 20-30 cm van de QR")
    pdf.bullet("Meer licht helpt als het niet lukt")
    pdf.bullet("Vast? Hand opsteken - de helper komt naar u toe")

    pdf.box(
        "Onthoud",
        [
            "Menu in een café of QR van de begeleider: oké. "
            "Onbekend briefje op uw deur of auto: niet scannen.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Op uw eigen telefoon of tablet. Scan alleen de QR van de begeleider.")

    pdf.h2("Oefentaak 1 - QR scannen")
    pdf.numbered(1, "Open de Camera-app.")
    pdf.numbered(2, "Richt op de QR op de A4 van de begeleider.")
    pdf.numbered(3, "Houd rustig, ongeveer 20-30 cm afstand.")
    pdf.numbered(4, "Wacht op een melding of link op het scherm.")
    pdf.body("Klaar als: u een melding ziet.")

    pdf.h2("Oefentaak 2 - Link openen")
    pdf.numbered(1, "Tik op de melding.")
    pdf.numbered(2, "Browser opent. Wacht tot de pagina laadt.")
    pdf.numbered(3, "Kijk: staat seniorease.nl in de adresbalk?")
    pdf.body("Klaar als: de website is geopend.")

    pdf.h2("Oefentaak 3 - Nog een keer")
    pdf.numbered(1, "Ga terug naar start of sluit browser.")
    pdf.numbered(2, "Open camera opnieuw.")
    pdf.numbered(3, "Scan dezelfde QR. Open de link weer.")
    pdf.body("Klaar als: u het opnieuw heeft gedaan.")

    pdf.h2("Oefentaak 4 - Wanneer wel / niet")
    pdf.numbered(1, "Kijk naar de A4-kaart van de begeleider.")
    pdf.numbered(2, "Onthoud: onbekend briefje = niet scannen.")
    pdf.body("Klaar als: u het verschil kunt noemen.")

    pdf.h2("Android / iPhone (helper)")
    pdf.bullet("Android: camera; soms Google Lens of QR in Chrome")
    pdf.bullet("iPhone: camera; QR staat soms uit - Instellingen")
    pdf.bullet("Oude telefoon: helper 1-op-1")
    pdf.bullet("Verdachte QR: pakket D les D2")

    pdf.add_page()
    pdf.h1("4. Kaart - wanneer wel / wanneer niet?")
    pdf.muted("Print 1x. Begeleider houdt omhoog. Geen bord nodig.")
    pdf.ln(4)
    pdf.box(
        "WEL scannen (als u het vertrouwt)",
        [
            "Menu in een café of restaurant",
            "Ticket of toegangsbewijs",
            "Poster van een bekende organisatie",
            "QR van de begeleider (vandaag)",
        ],
    )
    pdf.ln(4)
    pdf.box(
        "NIET scannen",
        [
            "Briefje op uw deur of ruit (onbekend)",
            "Sticker op een auto (parkeer-boete-truc)",
            "U heeft prijs gewonnen - scan hier",
            "U twijfelt wie de QR neerzette",
        ],
    )
    pdf.ln(4)
    pdf.body(
        "Regel: twijfel? Niet scannen. Typ het adres zelf (Ft2) of vraag om hulp. "
        "Meer over verdachte QR: pakket D, les D2."
    )

    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "Geen bord of beamer nodig",
        "Wifi + wachtwoord op A4",
        "Oefen-QR (groot) naar seniorease.nl geprint",
        "Kaart wanneer wel/niet geprint",
        "Begeleider-toestel klaar om voor te doen",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
        "Helper: Android en iPhone",
    ]:
        pdf.check(t)

    pdf.h1("6. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Camera op QR richten. Tik op de melding om de link te openen.",
            "Menu of ticket: oké als u het vertrouwt. Onbekend briefje: niet scannen.",
            "Twijfel? Typ het adres zelf of vraag hulp.",
            "seniorease.nl",
            "Volgende les: Ft4 Formulieren invullen en downloads terugvinden.",
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
