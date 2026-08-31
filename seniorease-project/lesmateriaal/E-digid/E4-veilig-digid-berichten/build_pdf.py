#!/usr/bin/env python3
"""E4 Veilig DigiD-berichten - einde pakket E."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-E4-Veilig-DigiD-Berichten-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  E4 Veilig DigiD-berichten  |  Pakket E  |  v1.0",
        package_label="Pakket E - DigiD & digitale overheid")
    pdf.alias_nb_pages()

    pdf.cover(
        "E4 - Veilig omgaan met DigiD-berichten",
        "Lesmiddag 90 minuten",
        "Berichten over DigiD beoordelen, zelf digid.nl openen, codes niet delen. "
        "Einde pakket E. Dieper oefenen met oplichting: pakket D.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Scenario-A4 + zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Pakket E compleet - EUR 19,95 voor 4 lessen",
            "Vervolg veiligheid: pakket D",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Geen echte phishing-links. Twijfel is verstandig.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon/tablet of computer")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Een DigiD-bericht beoordelen zonder te klikken",
            "digid.nl of mijnoverheid.nl zelf openen",
            "Geen DigiD-code delen via chat of vreemde beller",
            "Bij twijfel: negeren, zelf typen of IDO",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen echte phishing-links openen")
    pdf.bullet("Geen paniekzaaierij")
    pdf.bullet("Geen volledige reeks van pakket D")

    pdf.h2("Voorbereiding")
    pdf.bullet("Veilig oefenbericht of scenario-A4")
    pdf.quote(
        "OEFENING SeniorEase - geen echt bericht. "
        '"Uw DigiD wordt geblokkeerd. Stuur uw code naar dit nummer." Wat doet u?'
    )

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. DigiD-berichten beoordelen. Niet klikken op verdachte links.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam. Rare DigiD-SMS gehad? Ja/nee.")
    pdf.h3("12:25-12:50 - Stap 1: oefenbericht (oefentaak 1)")
    pdf.body("Signalen: druk, code, rare link, WhatsApp van 'overheid'.")
    pdf.h3("12:50-13:05 - Stap 2: zelf checken (oefentaak 2)")
    pdf.body("Typ digid.nl of mijnoverheid.nl.")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:30 - Stap 3: wat zegt u? (oefentaak 3)")
    pdf.body("Nee-zin + ophangen / zelf typen / IDO.")
    pdf.h3("13:30-13:40 - Stap 4: eigen inbox (oefentaak 4)")
    pdf.body("Alleen kijken. Twijfel: niet klikken.")
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorg. Pakket E compleet. Pakket D noemen.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 4")
    pdf.bullet("Niet schrappen: oefenbericht + digid.nl + geen code delen")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Veilig DigiD-berichten", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket E  -  telefoon/tablet of computer")
    pdf.ln(2)

    pdf.h2("Alarmsignalen")
    pdf.numbered(1, "Druk: nu, anders geblokkeerd")
    pdf.numbered(2, "Vraag om DigiD-code of wachtwoord")
    pdf.numbered(3, "Link in SMS / WhatsApp / rare mail")
    pdf.numbered(4, "Iemand belt of appt alsof hij DigiD of Belastingdienst is")

    pdf.h2("Bij twijfel")
    pdf.numbered(1, "Niet klikken, geen code geven")
    pdf.numbered(2, "Negeren of ophangen")
    pdf.numbered(3, "Zelf typen: digid.nl of mijnoverheid.nl")
    pdf.numbered(4, "Of hulp: IDO / bibliotheek")

    pdf.box(
        "Gouden regel",
        ["Overheid vraagt nooit om uw DigiD-code via WhatsApp of een vreemde beller."],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Geen verdachte links openen. Codes niet delen.")

    pdf.h2("Oefentaak 1 - Oefenbericht")
    pdf.numbered(1, "Lees het oefenbericht of de scenario-A4.")
    pdf.numbered(2, "Noem de signalen.")
    pdf.numbered(3, "Tik niet op links.")
    pdf.body("Klaar als: u een signaal heeft genoemd.")

    pdf.h2("Oefentaak 2 - Zelf checken")
    pdf.body("Typ digid.nl of mijnoverheid.nl in de browser.")
    pdf.body("Klaar als: de echte site open is.")

    pdf.h2("Oefentaak 3 - Wat zegt u?")
    pdf.body('Zeg: "Nee. Ik geef geen DigiD-code via telefoon of chat."')
    pdf.body("Daarna: ophangen / negeren / zelf typen / IDO.")
    pdf.body("Klaar als: u de zin een keer heeft gedaan.")

    pdf.h2("Oefentaak 4 - Eigen inbox (optioneel)")
    pdf.numbered(1, "Open SMS of mail.")
    pdf.numbered(2, "Zoek een DigiD- of overheidsbericht.")
    pdf.numbered(3, "Alleen lezen - twijfel: niet klikken, zelf typen.")
    pdf.body("Klaar als: gekeken zonder verdachte link te openen.")

    pdf.add_page()
    pdf.h1("4. Scenario-A4")
    pdf.muted("Print 1x. Omhoog houden. Geen bord nodig.")
    pdf.ln(2)
    pdf.box(
        "OEFENING - geen echt bericht",
        [
            "SMS of WhatsApp:",
            '"Uw DigiD wordt binnen 1 uur geblokkeerd.',
            'Bevestig hier of stuur uw code."',
            "",
            "Wat valt op?",
            "Wat doet u? (niet klikken - geen code - typ digid.nl zelf)",
        ],
    )

    pdf.h1("Zaalchecklist")
    for t in [
        "Veilig oefenbericht of scenario-A4",
        "Geen echte phishing-URL's",
        "Geen paniek / geen schaamte",
        "Pakket D kunnen noemen",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
    ]:
        pdf.check(t)

    pdf.add_page()
    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Geen DigiD-code via WhatsApp of vreemde beller. Twijfel: typ digid.nl zelf.",
            "Meer oefenen: pakket D Veilig online.",
            "seniorease.nl/uitleg/veiligheid",
            "Pakket E is compleet. Opfrisser: les E1.",
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
