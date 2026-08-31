#!/usr/bin/env python3
"""C1 WhatsApp berichten - telefoon/tablet."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-C1-Berichten-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  C1 Berichten  |  Pakket C  |  v1.0",
        package_label="Pakket C - WhatsApp")
    pdf.alias_nb_pages()

    pdf.cover(
        "C1 - Berichten sturen",
        "Lesmiddag 90 minuten",
        "Op het eigen toestel: WhatsApp openen, een gesprek starten, een tekstbericht "
        "sturen. Fotos komen in les C2. Geen bord, geen presentatie.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Gids: seniorease.nl/uitleg/whatsapp-basis",
            "Pakket C (4 lessen): EUR 19,95",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5,
        "Toon: volwassen, rustig. Kijken, doen, controleren, pauzeren. Geen tempo.",
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon of tablet  |  Geen bord/beamer")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "WhatsApp openen",
            "Een gesprek openen of starten",
            "Een tekstbericht sturen",
            "Zien of het bericht is verzonden",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen fotos (C2)")
    pdf.bullet("Geen groepen, status of videobellen (C3)")
    pdf.bullet("Geen nieuw account tenzij helper 1-op-1")
    pdf.bullet("Geen computer, bord of presentatie")

    pdf.h2("Voorbereiding")
    pdf.bullet("Wifi op A4; uw nummer op A4")
    pdf.bullet("WhatsApp op uw telefoon klaar")
    pdf.bullet("Helper: installeren en Android/iPhone")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Wifi. Heeft u WhatsApp? Zo niet: helper. Welkom: vandaag een bericht sturen.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + Android/iPhone. Geen bankgegevens via WhatsApp.")
    pdf.h3("12:25-12:40 - Stap 1: openen (oefentaak 1)")
    pdf.body("Groene icoon. Chatlijst zichtbaar?")
    pdf.h3("12:40-13:00 - Stap 2: gesprek (oefentaak 2)")
    pdf.body("Bestaande chat of nieuw naar begeleider/buur. Nog niet typen.")
    pdf.h3("13:00-13:05 - Pauze")
    pdf.h3("13:05-13:30 - Stap 3: bericht (oefentaak 3)")
    pdf.body('Typ: "Hallo, dit is een oefening van de lesmiddag." Verstuurknop (pijl).')
    pdf.h3("13:30-13:40 - Stap 4: controleren (oefentaak 4)")
    pdf.body("Vinkjes / verzonden. Eventueel kort antwoord lezen.")
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorg. Volgende: C2.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 4")
    pdf.bullet("Niet schrappen: openen, gesprek, bericht sturen")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  WhatsApp - berichten sturen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket C  -  telefoon of tablet")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "WhatsApp openen")
    pdf.numbered(2, "Een gesprek openen")
    pdf.numbered(3, "Een tekstbericht sturen")
    pdf.numbered(4, "Controleren of het is verzonden")

    pdf.h2("Stappen")
    pdf.numbered(1, "Groene icoon - WhatsApp")
    pdf.numbered(2, "Tik op een naam (of nieuw gesprek)")
    pdf.numbered(3, "Typ in het witte vak - tik op de pijl")

    pdf.h2("Oefenzin")
    pdf.quote("Hallo, dit is een oefening van de lesmiddag.")

    pdf.box(
        "Onthoud",
        ["Nooit bankgegevens of wachtwoorden via WhatsApp sturen."],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Op uw eigen telefoon of tablet.")

    pdf.h2("Oefentaak 1 - WhatsApp openen")
    pdf.numbered(1, "Zoek het groene icoon.")
    pdf.numbered(2, "Tik erop.")
    pdf.body("Klaar als: u de chatlijst ziet.")

    pdf.h2("Oefentaak 2 - Gesprek openen")
    pdf.numbered(1, "Tik op een bekende naam - of nieuw gesprek naar de begeleider (nummer op A4).")
    pdf.numbered(2, "U ziet het typvak onderaan.")
    pdf.body("Klaar als: u een open gesprek ziet.")

    pdf.h2("Oefentaak 3 - Bericht sturen")
    pdf.numbered(1, "Tik in het typvak.")
    pdf.numbered(2, 'Typ: Hallo, dit is een oefening van de lesmiddag.')
    pdf.numbered(3, "Tik op de verstuurknop (pijl).")
    pdf.body("Klaar als: uw bericht rechts in de chat staat.")

    pdf.h2("Oefentaak 4 - Controleren")
    pdf.numbered(1, "Kijk naar vinkjes of verzonden.")
    pdf.numbered(2, "Optioneel: lees een kort antwoord.")
    pdf.body("Klaar als: u ziet dat het bericht is weggegaan.")

    pdf.h2("Android / iPhone (helper)")
    pdf.bullet("Nieuwe chat: Android vaak rechtsonder; iPhone vaak rechtsboven")
    pdf.bullet("Geen WhatsApp: Play Store of App Store - helper 1-op-1")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Geen bord of beamer nodig",
        "Wifi-wachtwoord op A4",
        "Begeleider-nummer op A4",
        "WhatsApp op begeleider-telefoon werkt",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
        "Helper aanwezig",
    ]:
        pdf.check(t)

    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "WhatsApp openen - gesprek kiezen - typen - pijl om te versturen.",
            "Nooit bankgegevens via WhatsApp.",
            "seniorease.nl/uitleg/whatsapp-basis",
            "Volgende les: C2 Fotos en documenten.",
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
