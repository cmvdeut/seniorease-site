#!/usr/bin/env python3
"""Ft1 Zoeken - telefoon/tablet, WhatsApp-stijl."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-Ft1-Zoeken-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF(
        "SeniorEase  |  Ft1 Zoeken  |  Pakket F  |  v1.0",
        package_label="Pakket F - Internet (telefoon/tablet)",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "Ft1 - Iets opzoeken op Google",
        "Lesmiddag 90 minuten",
        "Rustige doe-middag op het eigen toestel: browser openen, zoeken op Google, "
        "een resultaat openen en terug. Geen bord, geen presentatie, geen computer.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Pakket F-telefoon (4 lessen): EUR 19,95",
            "Volgende les: Ft2 Browser gebruiken",
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
            "De browser openen (Chrome of Safari)",
            "Google openen of zoeken in de adresbalk",
            "Een zoekvraag typen (meerdere woorden)",
            "Een resultaat openen en weer teruggaan",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen Google Maps (andere les / bonus)")
    pdf.bullet("Geen AI / ChatGPT diep uitleggen")
    pdf.bullet("Geen account aanmaken verplichten")
    pdf.bullet("Geen computer (pakket F-computer)")

    pdf.h2("Didactiek")
    pdf.numbered(1, "Kijken - u toont op uw toestel")
    pdf.numbered(2, "Doen")
    pdf.numbered(3, "Controleren - helper loopt rond")
    pdf.numbered(4, "Pauzeren")

    pdf.h2("Voorbereiding")
    pdf.bullet("Wifi-wachtwoord op A4")
    pdf.bullet("Eigen toestel klaar om voor te doen")
    pdf.bullet("Helper: Android vs iPhone 1-op-1")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Wifi. Vandaag zoeken op Google - op uw eigen telefoon of tablet.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + Android of iPhone. Heeft u weleens iets opgezocht?")
    pdf.h3("12:25-12:40 - Stap 1: browser openen (oefentaak 1)")
    pdf.body("Chrome of Safari. Zoekvak / adresbalk.")
    pdf.h3("12:40-13:05 - Stap 2: zoeken (oefentaak 2)")
    pdf.body(
        "Typ bijv. recept pannenkoeken of weer morgen. Zoeken / Enter."
    )
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:30 - Stap 3: resultaat openen (oefentaak 3)")
    pdf.body("Tik op een resultaat (geen Gesponsord). Lees kort. Terug met pijl.")
    pdf.h3("13:30-13:40 - Stap 4: eigen zoekvraag (oefentaak 4)")
    pdf.body("Bijv. kapper of postkantoor (eventueel met woonplaats).")
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorg. Volgende: Ft2 Browser gebruiken.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 4")
    pdf.bullet("Niet schrappen: browser + zoeken + een resultaat openen")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Zoeken op Google", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket F  -  telefoon of tablet  -  wifi nodig")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Browser openen (Chrome of Safari)")
    pdf.numbered(2, "Iets opzoeken op Google")
    pdf.numbered(3, "Een resultaat openen en terug")
    pdf.numbered(4, "Zelf een zoekvraag bedenken")

    pdf.h2("Handige woorden")
    pdf.bullet("Browser = programma om internet te bekijken (Chrome, Safari)")
    pdf.bullet("Zoekvak / adresbalk = balk bovenaan waar u typt")
    pdf.bullet("Gesponsord = advertentie - kies liever een ander resultaat")

    pdf.h2("Tips")
    pdf.bullet("Meerdere woorden geven betere antwoorden")
    pdf.bullet("Wifi aan voordat u zoekt")
    pdf.bullet("Vast? Hand opsteken - de helper komt naar u toe")

    pdf.box(
        "Onthoud",
        [
            "Typ uw vraag, tik op Zoeken. Tik op een resultaat. Pijl terug = weer bij de lijst.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Op uw eigen telefoon of tablet. Wifi aan.")

    pdf.h2("Oefentaak 1 - Browser openen")
    pdf.numbered(1, "Zoek Chrome (kleurrijk) of Safari (kompas).")
    pdf.numbered(2, "Tik erop.")
    pdf.numbered(3, "U ziet een zoekvak of adresbalk bovenaan.")
    pdf.body("Klaar als: de browser open is.")

    pdf.h2("Oefentaak 2 - Iets opzoeken")
    pdf.numbered(1, "Tik in het zoekvak of de adresbalk.")
    pdf.numbered(2, "Typ: recept pannenkoeken of weer morgen.")
    pdf.numbered(3, "Tik op Zoeken of druk Enter.")
    pdf.numbered(4, "Kijk of u resultaten of een direct antwoord ziet.")
    pdf.body("Klaar als: u zoekresultaten ziet.")

    pdf.h2("Oefentaak 3 - Een resultaat openen")
    pdf.numbered(1, "Tik op een resultaat (geen Gesponsord als u dat ziet).")
    pdf.numbered(2, "Lees kort wat er staat.")
    pdf.numbered(3, "Ga terug met de pijl linksboven.")
    pdf.body("Klaar als: u een pagina heeft geopend en weer terug bent.")

    pdf.h2("Oefentaak 4 - Zelf een vraag bedenken")
    pdf.numbered(1, "Bedenk iets praktisch: kapper, postkantoor, apotheek (eventueel met woonplaats).")
    pdf.numbered(2, "Typ het in het zoekvak.")
    pdf.numbered(3, "Zoeken / Enter.")
    pdf.numbered(4, "Kijk of u een nuttig resultaat ziet.")
    pdf.body("Klaar als: u uw eigen zoekvraag heeft gedaan.")

    pdf.h2("Android / iPhone (helper)")
    pdf.bullet("Android: vaak Chrome")
    pdf.bullet("iPhone/iPad: Safari")
    pdf.bullet("google.nl typen of zoeken in adresbalk - allebei goed")
    pdf.bullet("Alleen helpen bij wie vastzit")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Geen bord of beamer nodig",
        "Wifi + wachtwoord op A4",
        "Begeleider-toestel klaar om voor te doen",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
        "Helper: Android en iPhone",
    ]:
        pdf.check(t)

    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Browser openen. Typ uw vraag in het zoekvak. Tik Zoeken.",
            "Tik op een resultaat. Pijl terug = weer bij de zoeklijst.",
            "Gesponsord = advertentie - kies liever een ander resultaat.",
            "seniorease.nl",
            "Volgende les: Ft2 Browser gebruiken (tabbladen, terug, vooruit).",
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
