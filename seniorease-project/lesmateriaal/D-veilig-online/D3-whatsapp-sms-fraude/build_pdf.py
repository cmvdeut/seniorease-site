#!/usr/bin/env python3
"""D3 WhatsApp- & sms-fraude - telefoon/tablet, zonder bord."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-D3-WhatsApp-SMS-Fraude-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  D3 WhatsApp- & sms-fraude  |  Pakket D  |  v1.2",
        package_label="Pakket D - Veilig online")
    pdf.alias_nb_pages()

    pdf.cover(
        "D3 - WhatsApp- en sms-fraude",
        "Lesmiddag 90 minuten",
        "Oefenen op telefoon of tablet: WhatsApp-oefenbericht lezen, bekend contact zoeken, "
        "SMS bekijken zonder te klikken. Geen echt geld, geen bord, geen presentatie.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Scenario-A4 (als iemand geen WhatsApp heeft)",
            "5. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.2 - augustus 2026",
            "Gids: seniorease.nl/uitleg/veiligheid",
            "Pakket D (4 lessen): EUR 19,95",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5,
        "Toon: rustig, geen schaamte. Kijken, doen, controleren, pauzeren.",
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
            "WhatsApp openen en een oefenbericht lezen",
            "Herkennen: nieuw nummer + geld + geheim = stop",
            "In Contacten een bekend nummer vinden",
            "SMS bekijken zonder op links te tikken",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen echt geld overmaken")
    pdf.bullet("Geen verdachte links openen")
    pdf.bullet("Geen schaamte")
    pdf.bullet("Geen computer, bord of presentatie")

    pdf.h2("Voorbereiding")
    pdf.bullet("Wifi op A4; uw nummer op A4 voor oefen-WhatsApp")
    pdf.bullet("Veilig oefenbericht klaarzetten (zie hieronder)")
    pdf.bullet("Scenario-A4 printen voor wie geen WhatsApp heeft")

    pdf.h2("Veilig oefenbericht (WhatsApp)")
    pdf.quote(
        "OEFENING SeniorEase - dit is GEEN echt verzoek. "
        'Doe alsof: "Oma, nieuw nummer. Stuur 100 euro. Vertel mama niet." '
        "Wat zou u doen? (Niet overmaken.)"
    )

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Geen echt geld vandaag. Telefoon of tablet.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + Android/iPhone. Heeft u WhatsApp? Zo niet: scenario-A4.")
    pdf.h3("12:25-12:45 - Stap 1: oefenbericht (oefentaak 1)")
    pdf.body("WhatsApp openen, oefenbericht lezen, alarmsignalen noemen.")
    pdf.h3("12:45-13:05 - Stap 2: bekend contact (oefentaak 2)")
    pdf.body(
        "Contacten openen, familielid of vriend zoeken. "
        "Bij twijfel: dit nummer, niet het nieuwe nummer uit het rare bericht."
    )
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:25 - Stap 3: SMS (oefentaak 3)")
    pdf.body("Berichten openen, lezen, niet op links tikken.")
    pdf.h3("13:25-13:40 - Stap 4: wat zegt u? (oefentaak 4)")
    pdf.body('"Ik bel je even op het nummer dat ik al had." Daarna startscherm.')
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Geheim + geld = stop. Nazorg. Volgende: D4.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 4")
    pdf.bullet("Niet schrappen: oefenbericht + bekend contact")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  WhatsApp- en sms-fraude", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket D  -  telefoon of tablet")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Oefenbericht in WhatsApp lezen")
    pdf.numbered(2, "Bekend contact zoeken")
    pdf.numbered(3, "SMS bekijken zonder te klikken")
    pdf.numbered(4, "Een rustige zin paraat hebben")

    pdf.h2("WhatsApp - let op")
    pdf.numbered(1, 'Bericht van "familie" vanaf een nieuw nummer')
    pdf.numbered(2, "Haast: nu, snel, meteen")
    pdf.numbered(3, "Geheimhouding: vertel het niet aan ...")
    pdf.numbered(4, "Vraag om geld, cadeaukaarten of codes")

    pdf.h2("SMS - let op")
    pdf.numbered(1, "Pakket / boete / rekening + link")
    pdf.numbered(2, "Onbekende afzender")
    pdf.numbered(3, "Druk om snel te reageren")

    pdf.h2("Wat doet u?")
    pdf.numbered(1, "Niet overmaken, niet op de link tikken")
    pdf.numbered(2, "Bel of app via een contact dat u al had")
    pdf.numbered(3, "Of bel de bank via het nummer op uw pas")

    pdf.box("Gouden regel", ["Geheim + geld vragen = stoppen tot u het zeker weet."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Op uw telefoon of tablet. Geen geld overmaken.")

    pdf.h2("Oefentaak 1 - Oefenbericht in WhatsApp")
    pdf.numbered(1, "Open WhatsApp.")
    pdf.numbered(2, "Open het oefenbericht van de begeleider (of lees de scenario-A4).")
    pdf.numbered(3, "Lees. Tik niet op links.")
    pdf.numbered(4, "Welke signalen ziet u? (nieuw nummer, geld, geheim)")
    pdf.body("Klaar als: u heeft gelezen en niets overgemaakt.")

    pdf.h2("Oefentaak 2 - Bekend contact zoeken")
    pdf.numbered(1, "Open Contacten of telefoonboek.")
    pdf.numbered(2, "Zoek iemand die u al lang kent.")
    pdf.numbered(3, "Open dat contact. Kijk naar het nummer.")
    pdf.numbered(4, "Onthoud: bij twijfel dit nummer - niet een nieuw nummer uit een rare chat.")
    pdf.body("Klaar als: u een bekend contact op het scherm heeft.")

    pdf.h2("Oefentaak 3 - SMS alleen bekijken")
    pdf.numbered(1, "Open Berichten.")
    pdf.numbered(2, "Open een bericht.")
    pdf.numbered(3, "Link gezien? Tik er niet op.")
    pdf.numbered(4, "Noem soft of hardop wat opvalt (druk, bank, pakket).")
    pdf.body("Klaar als: gelezen zonder link te openen.")

    pdf.h2("Oefentaak 4 - Wat zegt u?")
    pdf.body('Zeg of lees: "Ik bel je even op het nummer dat ik al had."')
    pdf.numbered(1, "Zeg de zin een keer.")
    pdf.numbered(2, "Ga naar het startscherm.")
    pdf.numbered(3, "Leg het rare bericht weg.")
    pdf.body("Klaar als: u de zin een keer heeft gedaan.")

    pdf.add_page()
    pdf.h1("4. Scenario-A4")
    pdf.muted("Print 1x. Voor wie geen WhatsApp heeft, of om klassikaal te tonen (omhoog houden).")
    pdf.ln(3)
    pdf.box(
        "OEFENING - dit is geen echt bericht",
        [
            "WhatsApp van een onbekend nummer:",
            '"Oma, ik ben mijn telefoon kwijt. Dit is mijn nieuwe nummer.',
            "Stuur snel 100 euro. Vertel het mama niet.\"",
            "",
            "Vragen voor u:",
            "- Wat valt op? (nieuw nummer, geld, geheim)",
            "- Wat doet u? (niet overmaken - bekend contact bellen)",
        ],
    )
    pdf.ln(2)
    pdf.box(
        "Tweede voorbeeld (SMS)",
        [
            "SMS: Uw ING-rekening wordt geblokkeerd. Bevestig nu via deze link.",
            "Wat doet u? Niet tikken. Bank bellen via nummer op uw pas.",
        ],
    )

    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "Geen bord of beamer nodig",
        "Wifi-wachtwoord op A4",
        "Begeleider-nummer op A4",
        "Veilig WhatsApp-oefenbericht klaar",
        "Scenario-A4 geprint",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
        "Helper aanwezig (ook voor emotionele verhalen)",
    ]:
        pdf.check(t)

    pdf.h1("Nazorgkaart")
    pdf.nazorg_card(
        [
            "Geheim + geld = alarm. Bel terug via een nummer dat u al kende.",
            "Bank vraagt nooit om pincode via WhatsApp of sms.",
            "seniorease.nl/uitleg/veiligheid",
            "Volgende les: D4 Veilig betalen en bankieren.",
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
