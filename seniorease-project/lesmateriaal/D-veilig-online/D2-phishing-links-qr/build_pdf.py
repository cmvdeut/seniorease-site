#!/usr/bin/env python3
"""D2 Phishing, links & QR - telefoon/tablet, zonder bord/beamer."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-D2-Phishing-Links-QR-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  D2 Phishing, links & QR  |  Pakket D  |  v1.3",
        package_label="Pakket D - Veilig online")
    pdf.alias_nb_pages()

    pdf.cover(
        "D2 - Phishing, links en QR-codes",
        "Lesmiddag 90 minuten",
        "Deelnemers oefenen op telefoon of tablet: zelf adressen typen, links bekijken "
        "zonder te openen, veilige QR scannen. Geen computer, geen bord, geen presentatie - "
        "alleen prints en de telefoon van de begeleider.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Voorbeeldkaart echt/nep (A4 omhoog houden)",
            "5. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.3 - augustus 2026",
            "Gids: seniorease.nl/uitleg/veiligheid",
            "Pakket D (4 lessen): EUR 19,95",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5,
        "Clubhuis zonder whiteboard? Prima. Print de A4's. Geen PowerPoint nodig.",
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
            "Browser openen en een adres zelf typen",
            "In de adresbalk zien of het adres klopt",
            "Een link in een bericht bekijken zonder te openen",
            "Een veilige QR scannen - en weten wanneer niet",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen verdachte links openen")
    pdf.bullet("Geen QR van onbekende stickers scannen")
    pdf.bullet("Geen bank inloggen")
    pdf.bullet("Geen computer, bord of presentatie vereisen")

    pdf.h2("Didactiek")
    pdf.numbered(1, "Kijken (uw telefoon omhoog of A4 tonen)")
    pdf.numbered(2, "Doen")
    pdf.numbered(3, "Controleren")
    pdf.numbered(4, "Pauzeren")

    pdf.h2("Voorbereiding")
    pdf.bullet("Wifi-wachtwoord op A4")
    pdf.bullet("Voorbeeldkaart echt/nep printen (pagina in dit PDF)")
    pdf.bullet("Veilige QR naar seniorease.nl/uitleg/veiligheid")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Links en QR op telefoon of tablet. We typen zelf. Verdachte links niet openen.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + Android of iPhone. Een stap tegelijk.")
    pdf.h3("12:25-12:35 - Wat is phishing? (kort)")
    pdf.body("Iemand lokt u naar een valse site. Daarna meteen doen.")
    pdf.h3("12:35-12:55 - Stap 1: digid.nl typen (oefentaak 1)")
    pdf.body("Browser - adresbalk - typ digid.nl - kijk of het klopt.")
    pdf.h3("12:55-13:10 - Stap 2: postnl.nl + voorbeeldkaart (oefentaak 2)")
    pdf.body("Typ postnl.nl. Toon de A4 echt/nep. Nep-adres niet openen.")
    pdf.h3("13:10-13:15 - Pauze")
    pdf.h3("13:15-13:30 - Stap 3: link niet openen (oefentaak 3)")
    pdf.body("Lang indrukken om te kijken, niet openen bij twijfel. Of meekijken bij u.")
    pdf.h3("13:30-13:40 - Stap 4: QR begeleider (oefentaak 4)")
    pdf.body("Alleen uw SeniorEase-QR. Onbekend briefje = niet scannen.")
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorgkaart. Volgende: D3.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 3 of 4")
    pdf.bullet("Niet schrappen: zelf typen + QR-regel")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Phishing, links en QR-codes", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket D  -  telefoon of tablet")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Zelf digid.nl en postnl.nl typen")
    pdf.numbered(2, "Links bekijken zonder te openen")
    pdf.numbered(3, "Veilige QR van de begeleider scannen")

    pdf.h2("Bij een link")
    pdf.numbered(1, "Niet meteen openen")
    pdf.numbered(2, "Verwachtte u dit bericht?")
    pdf.numbered(3, "Liever zelf typen: digid.nl / postnl.nl / uw bank.nl")

    pdf.h2("Bij een QR-code")
    pdf.numbered(1, "Weet u wie deze QR neerzette?")
    pdf.numbered(2, "Nee of twijfel - niet scannen")
    pdf.numbered(3, "Ja (les of echte factuur) - kijk waar u uitkomt")

    pdf.box("Gouden regel", ["Typ belangrijke adressen zelf. Klik of scan niet blind."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Op uw telefoon of tablet. Geen verdachte links openen.")

    pdf.h2("Oefentaak 1 - digid.nl typen")
    pdf.numbered(1, "Open Chrome of Safari.")
    pdf.numbered(2, "Tik in de adresbalk.")
    pdf.numbered(3, "Typ: digid.nl")
    pdf.numbered(4, "Open. Staat er echt digid.nl in de balk?")
    pdf.body("Klaar als: u digid.nl zelf heeft geopend.")

    pdf.h2("Oefentaak 2 - postnl.nl + voorbeeldkaart")
    pdf.numbered(1, "Typ: postnl.nl")
    pdf.numbered(2, "Kijk of postnl.nl in de balk staat.")
    pdf.numbered(3, "Kijk naar de A4 die de begeleider toont: echt of nep? (nep niet openen)")
    pdf.body("Klaar als: u postnl.nl heeft geopend en de voorbeeldkaart heeft gezien.")

    pdf.h2("Oefentaak 3 - Link niet openen")
    pdf.numbered(1, "Open Berichten of WhatsApp.")
    pdf.numbered(2, "Zoek een bericht met een link (of oefenbericht).")
    pdf.numbered(3, "Tik de link niet kort aan.")
    pdf.numbered(4, "Optioneel: lang indrukken om het adres te zien.")
    pdf.numbered(5, "Bij twijfel: wegleggen en zelf typen.")
    pdf.body("Klaar als: u een link heeft gezien zonder die te openen.")

    pdf.h2("Oefentaak 4 - QR van de begeleider")
    pdf.numbered(1, "Open de camera (of QR-scanner).")
    pdf.numbered(2, "Richt op de QR van de begeleider.")
    pdf.numbered(3, "Open alleen die melding.")
    pdf.numbered(4, "Onthoud: onbekend briefje of sticker = niet scannen.")
    pdf.body("Klaar als: u de SeniorEase-QR heeft gescand.")

    # Voorbeeldkaart A4
    pdf.add_page()
    pdf.h1("4. Voorbeeldkaart - echt of nep?")
    pdf.muted("Print 1x groot. Begeleider houdt deze A4 omhoog. Geen bord nodig.")
    pdf.ln(4)
    pdf.box(
        "ECHT - dit mag u zelf typen",
        [
            "digid.nl",
            "postnl.nl",
            "belastingdienst.nl",
            "ing.nl  /  rabobank.nl  (uw eigen bank)",
        ],
    )
    pdf.ln(4)
    pdf.box(
        "NEP - dit opent u NIET (alleen kijken op deze kaart)",
        [
            "digid-check-nu.net",
            "postnl-pakket-betaal.com",
            "ing-bank-secure.com",
            "rabobank-veilig-inloggen.com",
        ],
    )
    pdf.ln(4)
    pdf.body(
        "Regel: zie u rare woorden in het adres (check, veilig-inloggen, secure)? "
        "Dan typ u liever zelf het korte echte adres."
    )

    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "Geen bord of beamer nodig",
        "Wifi-wachtwoord op A4",
        "Voorbeeldkaart echt/nep geprint",
        "Veilige QR naar seniorease.nl/uitleg/veiligheid",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
        "Helper aanwezig",
    ]:
        pdf.check(t)

    pdf.h1("Nazorgkaart")
    pdf.nazorg_card(
        [
            "Typ bank.nl, digid.nl of postnl.nl zelf. Open geen vreemde links.",
            "QR: alleen als u weet wie hem neerzette. Twijfel? Niet scannen.",
            "seniorease.nl/uitleg/veiligheid",
            "Volgende les: D3 WhatsApp- en sms-fraude.",
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
