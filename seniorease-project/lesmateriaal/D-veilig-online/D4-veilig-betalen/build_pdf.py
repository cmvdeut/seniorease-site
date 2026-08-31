#!/usr/bin/env python3
"""D4 Veilig betalen - telefoon/tablet, zonder bord."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-D4-Veilig-Betalen-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  D4 Veilig betalen  |  Pakket D  |  v1.2",
        package_label="Pakket D - Veilig online")
    pdf.alias_nb_pages()

    pdf.cover(
        "D4 - Veilig betalen en bankieren",
        "Lesmiddag 90 minuten",
        "Oefenen op telefoon of tablet: bank-app of bankadres, nummer op de pas, "
        "iDEAL controleren, geen codes delen. Geen verplichte login, geen bord, geen presentatie.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. iDEAL-voorbeeldkaart (A4)",
            "5. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.2 - augustus 2026",
            "Gids: seniorease.nl/uitleg/online-bankieren",
            "Einde pakket D - EUR 19,95 voor 4 lessen",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5,
        "Toon: rustig. Nooit pincodes laten voorlezen in de groep.",
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted(
        "90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon of tablet  |  Geen bord/beamer"
    )

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Bank-app openen of bankadres zelf typen",
            "Telefoonnummer van de bank op de pas vinden",
            "Bij iDEAL bedrag en ontvanger controleren",
            "Pincode of codes weigeren via telefoon/chat",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen verplichte bank-login in de zaal")
    pdf.bullet("Geen pincodes of codes laten delen")
    pdf.bullet("Geen scherm delen met onbekende helpdesk")
    pdf.bullet("Geen computer, bord of presentatie")

    pdf.h2("Voorbereiding")
    pdf.bullet("Wifi op A4; iDEAL-voorbeeldkaart printen")
    pdf.bullet("Vraag deelnemers: bankpas meenemen (alleen nummer zoeken)")
    pdf.bullet("Inloggen alleen 1-op-1 met helper als iemand dat wil")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Niet verplicht inloggen. Geen pincodes delen.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + Android/iPhone. Bank-app? Pas bij zich?")
    pdf.h3("12:25-12:45 - Stap 1: bank-app of adres (oefentaak 1)")
    pdf.body(
        "Optie A: officiële bank-app openen. "
        "Optie B: browser, typ zelf ing.nl / rabobank.nl / abnamro.nl."
    )
    pdf.h3("12:45-13:05 - Stap 2: nummer op de pas (oefentaak 2)")
    pdf.body("Pas pakken, telefoonnummer bank zoeken. Dat nummer bellen bij twijfel.")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:25 - Stap 3: iDEAL-kaart (oefentaak 3)")
    pdf.body("Toon A4. Bedrag en ontvanger controleren. Klopt het niet: niet bevestigen.")
    pdf.h3("13:25-13:40 - Stap 4: nee zeggen (oefentaak 4)")
    pdf.body('"Nee, ik geef geen pincode via de telefoon." Ophangen. Nummer op de pas.')
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorg. Pakket D compleet.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 4")
    pdf.bullet("Niet schrappen: app/adres + pasnummer + iDEAL-kaart")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Veilig betalen en bankieren", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket D  -  telefoon of tablet")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Bank-app openen of bankadres zelf typen")
    pdf.numbered(2, "Nummer van de bank op de pas vinden")
    pdf.numbered(3, "iDEAL: bedrag en ontvanger checken")
    pdf.numbered(4, "Pincode niet delen via telefoon")

    pdf.h2("Veilig naar uw bank")
    pdf.numbered(1, "Officiele bank-app of browser")
    pdf.numbered(2, "Typ het adres zelf - geen link uit sms of mail")
    pdf.numbered(3, "Inloggen alleen als u dat wilt (vandaag niet verplicht)")

    pdf.h2("iDEAL - voor u akkoord gaat")
    pdf.numbered(1, "Klopt het bedrag?")
    pdf.numbered(2, "Herkent u de ontvanger?")
    pdf.numbered(3, "Zo niet: annuleer")

    pdf.h2("Nooit doen")
    pdf.bullet("Pincode of codes via telefoon, WhatsApp of mail")
    pdf.bullet("Scherm delen met iemand die u niet kent")
    pdf.bullet("Inloggen via een link in een onverwacht bericht")

    pdf.box(
        "Op telefoon of tablet",
        [
            "Liever de officiele bank-app uit de appwinkel.",
            "Of typ zelf: ing.nl / rabobank.nl / abnamro.nl (uw bank).",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Op telefoon of tablet. Geen pincode delen. Inloggen niet verplicht.")

    pdf.h2("Oefentaak 1 - Bank-app of bankadres")
    pdf.body("Keuze A: open de officiele bank-app (niet verplicht inloggen).")
    pdf.body("Keuze B: Chrome/Safari - typ zelf het adres van uw bank.")
    pdf.body("Klaar als: app open is, of u het adres zelf heeft getypt.")

    pdf.h2("Oefentaak 2 - Nummer op de bankpas")
    pdf.numbered(1, "Pak uw bankpas.")
    pdf.numbered(2, "Zoek het telefoonnummer van de bank.")
    pdf.numbered(3, "Wijs het aan. Bij twijfel belt u dit nummer - niet een sms-nummer.")
    pdf.body("Klaar als: u het nummer heeft gevonden.")

    pdf.h2("Oefentaak 3 - iDEAL-voorbeeldkaart")
    pdf.numbered(1, "Kijk naar de A4 van de begeleider.")
    pdf.numbered(2, "Klopt het bedrag?")
    pdf.numbered(3, "Kent u de ontvanger?")
    pdf.numbered(4, "Zo niet: niet bevestigen / annuleren.")
    pdf.body("Klaar als: u bedrag en ontvanger heeft nagekeken.")

    pdf.h2("Oefentaak 4 - Nee zeggen")
    pdf.body('Beller vraagt pincode "om fraude te stoppen".')
    pdf.body('Zeg: "Nee. Ik geef geen pincode via de telefoon."')
    pdf.body("Daarna: ophangen - nummer op de pas bellen.")
    pdf.body("Klaar als: u de zin een keer heeft gezegd of gelezen.")

    pdf.add_page()
    pdf.h1("4. iDEAL-voorbeeldkaart")
    pdf.muted("Print 1x. Begeleider houdt deze A4 omhoog. Geen bord nodig.")
    pdf.ln(3)
    pdf.box(
        "Voorbeeld op het scherm (oefening)",
        [
            "Bedrag: 87,50 euro",
            "Ontvanger: Webshop XYZ (naam die u niet kent)",
            "",
            "U dacht 19,95 te betalen bij een winkel die u wel kent.",
            "",
            "Vragen:",
            "- Klopt het bedrag?  Nee",
            "- Kent u de ontvanger?  Nee",
            "- Wat doet u?  Niet bevestigen / annuleren",
        ],
    )
    pdf.ln(3)
    pdf.box(
        "Goed voorbeeld (ter vergelijking)",
        [
            "Bedrag: 19,95 euro",
            "Ontvanger: een webshop waar u net iets bestelde (naam herkent u)",
            "Dan mag u bevestigen - als bedrag en naam kloppen.",
        ],
    )

    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "Geen bord of beamer nodig",
        "Wifi-wachtwoord op A4",
        "iDEAL-voorbeeldkaart geprint",
        "Deelnemers gevraagd bankpas mee te nemen",
        "Geen verplichte logins; helper voor 1-op-1",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
    ]:
        pdf.check(t)

    pdf.h1("Nazorgkaart")
    pdf.nazorg_card(
        [
            "Typ het bankadres zelf of gebruik de officiele app. Deel nooit pincode via telefoon.",
            "iDEAL: controleer bedrag en ontvanger. Twijfel? Nummer op de pas.",
            "seniorease.nl/uitleg/online-bankieren",
            "Pakket D is compleet. Opfrisser: les D1.",
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
