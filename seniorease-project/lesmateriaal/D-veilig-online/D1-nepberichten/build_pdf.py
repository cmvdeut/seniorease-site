#!/usr/bin/env python3
"""D1 Nepberichten - telefoon/tablet, WhatsApp-stijl oefeningen."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-D1-Nepberichten-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  D1 Nepberichten  |  Pakket D  |  v1.2",
        package_label="Pakket D - Veilig online")
    pdf.alias_nb_pages()

    pdf.cover(
        "D1 - Nepberichten herkennen",
        "Lesmiddag 90 minuten",
        "Kant-en-klaar printpakket. Deelnemers oefenen op hun eigen telefoon of tablet: "
        "berichten openen, alleen kijken, alarmsignalen herkennen, zelf digid.nl typen. "
        "Geen computer, geen bord, geen presentatie nodig.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.2 - augustus 2026",
            "Gids: https://www.seniorease.nl/uitleg/veiligheid",
            "Pakket D (4 lessen): EUR 19,95",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5,
        "Toon: volwassen, rustig. Principe: kijken, doen, controleren, pauzeren. "
        "Nooit op verdachte links tikken in de les.",
    )

    # Draaiboek
    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted(
        "90 minuten (+ 15 inloop)  |  Max. 8-10  |  1 begeleider + 1 helper  |  Telefoon of tablet"
    )

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Berichten (SMS) openen op telefoon of tablet",
            "Een bericht bekijken zonder op links te tikken",
            "Vijf alarmsignalen herkennen",
            "Bij twijfel: wegleggen en zelf digid.nl typen",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet in deze les")
    pdf.bullet("Geen verdachte links aanklikken")
    pdf.bullet("Geen bank-apps om in te loggen")
    pdf.bullet("Geen V/D-quiz op papier als hoofdoefening")
    pdf.bullet("Geen computer/pc (dat is pakket B)")

    pdf.h2("Didactiek (elke stap)")
    pdf.numbered(1, "Kijken - u toont een handeling")
    pdf.numbered(2, "Doen - iedereen dezelfde handeling")
    pdf.numbered(3, "Controleren - helper loopt rond")
    pdf.numbered(4, "Pauzeren - wacht tot driekwart klaar is")

    pdf.h2("Voorbereiding: veilig oefenbericht")
    pdf.body(
        "Stuur (optioneel) een SMS zonder link, bijvoorbeeld: "
        '"Oefening SeniorEase. Dit is GEEN echte bank. Rekening binnen 1 uur geblokkeerd? '
        'Bel 06-00000000." Zo oefent iedereen hetzelfde zonder gevaar.'
    )

    pdf.h2("Tijdlijn")
    pdf.muted("Voorbeeldrooster bij start 12:00. Begint u later? Schuif de tijden op.")

    pdf.h3("12:00-12:15 - Inloop")
    pdf.body(
        "Welkom, wifi, volume. Zegt u: Vandaag oefenen we rustig op uw telefoon of tablet. "
        "We klikken niet op verdachte links. We wachten op elkaar."
    )

    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body(
        "Voornaam + Android of iPhone. Afspraken: een stap tegelijk, hand opsteken, "
        "geen links aanklikken."
    )

    pdf.h3("12:25-12:40 - Stap 1: Berichten openen")
    pdf.body(
        "Toon het icoon Berichten / SMS / Messages. Iedereen opent de app (oefentaak 1). "
        "Controleren: ziet u de lijst?"
    )

    pdf.h3("12:40-13:00 - Stap 2: Bericht alleen bekijken")
    pdf.body(
        "Open een gesprek of het oefenbericht. Lees - tik niet op links (oefentaak 2). "
        "Daarna vijf alarmsignalen met de deelnemerskaart. Welke ziet u in dit bericht?"
    )

    pdf.h3("13:00-13:05 - Korte pauze")

    pdf.h3("13:05-13:25 - Stap 3: Zelf checken")
    pdf.body(
        "Startscherm - browser openen - typ digid.nl - kijk naar de adresbalk (oefentaak 3). "
        "Bij twijfel: niet klikken, wegleggen, zelf typen."
    )

    pdf.h3("13:25-13:40 - Afronding")
    pdf.body(
        "Herhaal signalen + drie stappen. Nazorgkaart. "
        "seniorease.nl/uitleg/veiligheid. Volgende: D2."
    )

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Kort kennismaken of pauze in")
    pdf.bullet("Niet schrappen: berichten openen, alleen kijken, digid.nl typen")

    # Deelnemerskaart
    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Nepberichten herkennen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket D  -  telefoon of tablet  -  seniorease.nl")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Berichten-app openen")
    pdf.numbered(2, "Een bericht lezen zonder op links te tikken")
    pdf.numbered(3, "Vijf alarmsignalen herkennen")
    pdf.numbered(4, "Zelf digid.nl typen in de browser")

    pdf.h2("Vijf alarmsignalen")
    pdf.numbered(1, 'Druk - "nu", "anders geblokkeerd", "nog 1 uur"')
    pdf.numbered(2, "Vreemd nummer of afzender")
    pdf.numbered(3, "Spelfouten of rare zinnen")
    pdf.numbered(4, "Vreemde link - tik er niet op")
    pdf.numbered(5, "Vraag om gegevens of geld")

    pdf.h2("Bij twijfel - drie stappen")
    pdf.numbered(1, "Niet klikken en niet overmaken")
    pdf.numbered(2, "Bericht wegleggen / negeren")
    pdf.numbered(3, "Zelf checken: typ een adres dat u kent (bijv. digid.nl)")

    pdf.box(
        "Onthoud",
        ["Twijfel is verstandig. U hoeft niet snel te zijn. Tik niet blind op een link."],
    )

    # Oefentaken
    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Op uw eigen telefoon of tablet. Tik niet op verdachte links.")

    pdf.h2("Oefentaak 1 - Berichten openen")
    pdf.body("Doel: de berichten-app open hebben.")
    pdf.numbered(1, "Zoek het icoon Berichten (soms SMS of Messages).")
    pdf.numbered(2, "Tik erop.")
    pdf.numbered(3, "U ziet een lijst met gesprekken.")
    pdf.body("Klaar als: u de lijst met berichten ziet.")

    pdf.h2("Oefentaak 2 - Eén bericht alleen bekijken")
    pdf.body("Doel: lezen zonder op links te tikken.")
    pdf.numbered(1, "Tik op een gesprek (of het oefenbericht van de begeleider).")
    pdf.numbered(2, "Lees de tekst rustig.")
    pdf.numbered(3, "Ziet u een link? Tik er niet op.")
    pdf.numbered(4, "Welke alarmsignalen ziet u? (deelnemerskaart)")
    pdf.body("Klaar als: u de tekst heeft gelezen en geen link heeft geopend.")

    pdf.h2("Oefentaak 3 - Zelf digid.nl typen")
    pdf.body("Doel: bij twijfel zelf een bekend adres typen.")
    pdf.numbered(1, "Ga terug naar het startscherm.")
    pdf.numbered(2, "Open Chrome of Safari.")
    pdf.numbered(3, "Tik in de adresbalk.")
    pdf.numbered(4, "Typ precies: digid.nl")
    pdf.numbered(5, "Open de pagina. Staat er echt digid.nl in de balk?")
    pdf.body("Klaar als: u digid.nl zelf heeft getypt (geen link uit een SMS).")

    pdf.h2("Android / iPhone (voor de helper)")
    pdf.bullet("Berichten: Android vaak Berichten; iPhone/iPad: Berichten (groen)")
    pdf.bullet("Browser: Android vaak Chrome; iPhone: Safari")
    pdf.bullet("Helper: alleen helpen bij wie vastzit - niet alles klassikaal uitleggen")

    # Zaal
    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    pdf.h2("Ruimte en techniek")
    for t in [
        "Geen bord of beamer nodig",
        "Wifi-wachtwoord op A4 (tafel of deur)",
        "Iedereen kan bij telefoon of tablet",
        "Begeleider-telefoon opgeladen (voordoen)",
        "Optioneel: veilig oefen-SMS klaar (zonder link)",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
    ]:
        pdf.check(t)
    pdf.h2("Mensen en toon")
    for t in [
        "Begeleider + helper",
        "Max. 8-10 deelnemers",
        "Geen paniek, geen schaamte",
        "Kijken, doen, controleren, pauzeren",
    ]:
        pdf.check(t)

    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Vijf signalen: druk, vreemd nummer, spelfouten, vreemde link, vraag om gegevens/geld.",
            "Bij twijfel: niet klikken - wegleggen - zelf typen (bijv. digid.nl).",
            "seniorease.nl/uitleg/veiligheid",
            "Volgende les: D2 Phishing, links en QR-codes (weer op telefoon/tablet).",
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
