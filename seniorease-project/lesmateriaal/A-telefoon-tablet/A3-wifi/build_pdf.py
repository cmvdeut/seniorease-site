#!/usr/bin/env python3
"""A3 Wifi - telefoon/tablet."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-A3-Wifi-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  A3 Wifi  |  Pakket A  |  v1.0",
        package_label="Pakket A - Telefoon & tablet")
    pdf.alias_nb_pages()

    pdf.cover(
        "A3 - Wifi, mobiele data en verbinding",
        "Lesmiddag 90 minuten",
        "Op het eigen toestel: wifi aanzetten, netwerk kiezen, wachtwoord intoetsen, "
        "testen of internet werkt. Geen bord - wifi-gegevens op A4.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Wifi-A4 (invullen en printen)",
            "5. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Pakket A (4 lessen): EUR 19,95",
            "Vorige: A2 - Volgende: A4 Fotos",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Wachtwoorden niet hardop door de zaal. A4 op elke tafel helpt.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Wifi in de zaal  |  Geen bord/beamer")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Wifi-instellingen openen en wifi aanzetten",
            "Een netwerk kiezen en wachtwoord intoetsen",
            "Zien of ze verbonden zijn",
            "Wifi en mobiele data uit elkaar houden",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen router of hotspot-diepte")
    pdf.bullet("Geen wachtwoorden hardop laten voorlezen")
    pdf.bullet("Geen computer, bord of presentatie")

    pdf.h2("Voorbereiding")
    pdf.bullet("Wifi-A4 invullen (netwerknaam + wachtwoord) - meerdere kopieen")
    pdf.bullet("Zelf vooraf verbinden ter test")
    pdf.bullet("Helper voor typefouten en verkeerd netwerk")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Wachtwoord op A4. Niet hardop door de zaal.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + Android/iPhone. Thuis al wifi?")
    pdf.h3("12:25-12:40 - Stap 1: wifi-scherm (oefentaak 1)")
    pdf.body("Instellingen of snelmenu. Wifi aan. Lijst met netwerken.")
    pdf.h3("12:40-13:05 - Stap 2: verbinden (oefentaak 2)")
    pdf.body("Juiste netwerk. Wachtwoord van A4. Verbinden. Streepjes bovenaan?")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:25 - Stap 3: testen (oefentaak 3)")
    pdf.body("Browser: seniorease.nl. Pagina laadt = gelukt.")
    pdf.h3("13:25-13:40 - Stap 4: wifi vs data (oefentaak 4)")
    pdf.body("Beide aanwijzen. Niets uitzetten tenzij nodig.")
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorg. Volgende: A4 Fotos.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 4")
    pdf.bullet("Niet schrappen: openen, verbinden, browser-test")

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
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket A  -  telefoon of tablet")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Wifi-scherm openen")
    pdf.numbered(2, "Verbinden met een netwerk")
    pdf.numbered(3, "Internet testen in de browser")
    pdf.numbered(4, "Wifi en mobiele data herkennen")

    pdf.h2("Stappen om te verbinden")
    pdf.numbered(1, "Instellingen - Wifi - aan")
    pdf.numbered(2, "Kies de juiste naam (van het A4)")
    pdf.numbered(3, "Typ het wachtwoord")
    pdf.numbered(4, "Verbinden - wacht op streepjes bovenaan")

    pdf.h2("Wifi of mobiele data?")
    pdf.bullet("Wifi: vaak gratis in huis of clubhuis")
    pdf.bullet("Mobiele data: via uw abonnement / beltegoed")

    pdf.box("Tip", ["Lukt verbinden niet? Meestal typefout of verkeerd netwerk. Helper helpt."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Wachtwoord van het A4. Niet hardop door de zaal.")

    pdf.h2("Oefentaak 1 - Wifi-scherm openen")
    pdf.numbered(1, "Open Instellingen.")
    pdf.numbered(2, "Tik op Wifi / Wi-Fi / Netwerk.")
    pdf.numbered(3, "Zet wifi aan.")
    pdf.body("Klaar als: u een lijst met netwerken ziet.")

    pdf.h2("Oefentaak 2 - Verbinden")
    pdf.numbered(1, "Tik op de netwerknaam van het A4.")
    pdf.numbered(2, "Typ het wachtwoord (hoofdletters letten).")
    pdf.numbered(3, "Verbinden / Join / OK.")
    pdf.body("Klaar als: Verbonden of wifi-streepjes bovenaan.")

    pdf.h2("Oefentaak 3 - Internet testen")
    pdf.numbered(1, "Open Chrome of Safari.")
    pdf.numbered(2, "Typ: seniorease.nl")
    pdf.numbered(3, "Open de pagina.")
    pdf.body("Klaar als: de pagina laadt.")

    pdf.h2("Oefentaak 4 - Wifi en data aanwijzen")
    pdf.numbered(1, "Zoek Wifi in Instellingen of snelmenu.")
    pdf.numbered(2, "Zoek Mobiele data / Cellular.")
    pdf.numbered(3, "Wijs beide aan. Zet vandaag niets uit.")
    pdf.body("Klaar als: u beide kunt aanwijzen.")

    pdf.add_page()
    pdf.h1("4. Wifi-A4 (voor de zaal)")
    pdf.muted("Print en vul in. Leg op tafels of bij de deur. Geen bord nodig.")
    pdf.ln(4)
    pdf.box(
        "Wifi op deze locatie",
        [
            "Netwerknaam (SSID): _______________________________",
            "",
            "Wachtwoord: ________________________________________",
            "",
            "Let op hoofdletters en tekens.",
            "Zeg het wachtwoord niet hardop door de zaal.",
        ],
    )
    pdf.ln(4)
    pdf.body("Test vooraf of dit netwerk werkt met 2-3 toestellen.")

    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "Geen bord of beamer nodig",
        "Wifi werkt; zelf getest",
        "Wifi-A4 ingevuld - meerdere kopieen",
        "Helper voor typefouten",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
    ]:
        pdf.check(t)

    pdf.h1("Nazorgkaart")
    pdf.nazorg_card(
        [
            "Instellingen - Wifi - netwerk kiezen - wachtwoord - Verbinden.",
            "Test: open de browser. Wifi is vaak gratis op locatie; data gaat van uw abonnement.",
            "seniorease.nl",
            "Volgende les: A4 Fotos maken, terugvinden en delen.",
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
