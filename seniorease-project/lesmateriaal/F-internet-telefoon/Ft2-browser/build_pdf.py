#!/usr/bin/env python3
"""Ft2 Browser gebruiken - telefoon/tablet, WhatsApp-stijl."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-Ft2-Browser-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF(
        "SeniorEase  |  Ft2 Browser gebruiken  |  Pakket F  |  v1.0",
        package_label="Pakket F - Internet (telefoon/tablet)",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "Ft2 - De browser leren gebruiken",
        "Lesmiddag 90 minuten",
        "Rustige doe-middag op het eigen toestel: een adres typen, terug en vooruit, "
        "tabbladen openen en sluiten. Geen bord, geen presentatie, geen computer.",
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
            "Volgende les: Ft3 QR-codes openen",
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
            "Een website openen door het adres te typen",
            "Terug en vooruit gebruiken",
            "Een nieuw tabblad openen en ertussen wisselen",
            "Een tabblad sluiten (niet de hele browser)",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen QR-codes (Ft3)")
    pdf.bullet("Geen downloads of formulieren (Ft4)")
    pdf.bullet("Geen instellingen of wachtwoorden wijzigen")
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
    pdf.body("Welkom. Wifi. Vandaag: terug, vooruit, tabbladen - op uw eigen telefoon.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + Android of iPhone. Ft1 gedaan of al wel eens gezocht?")
    pdf.h3("12:25-12:45 - Stap 1: website typen (oefentaak 1)")
    pdf.body("Adresbalk. Typ seniorease.nl. Enter.")
    pdf.h3("12:45-13:05 - Stap 2: terug en vooruit (oefentaak 2)")
    pdf.body("Tik op een link. Pijl terug. Eventueel pijl vooruit.")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:30 - Stap 3: tabbladen (oefentaak 3)")
    pdf.body("Nieuw tabblad (+). Typ weer.nl of nos.nl. Wissel tussen tabbladen.")
    pdf.h3("13:30-13:40 - Stap 4: tabblad sluiten (oefentaak 4)")
    pdf.body("Kruisje op het tabblad - browser blijft open.")
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorg. Volgende: Ft3 QR-codes openen.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Tabblad sluiten kan in oefentaak 3 mee")
    pdf.bullet("Niet schrappen: adres typen + terug + een tabblad")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Browser gebruiken", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket F  -  telefoon of tablet  -  wifi nodig")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Een webadres typen (seniorease.nl)")
    pdf.numbered(2, "Terug en vooruit")
    pdf.numbered(3, "Tabbladen openen en wisselen")
    pdf.numbered(4, "Een tabblad sluiten")

    pdf.h2("Handige woorden")
    pdf.bullet("Adresbalk = balk bovenaan waar het webadres staat")
    pdf.bullet("Tabblad = een open pagina; u kunt er meerdere tegelijk hebben")
    pdf.bullet("Pijl terug = terug naar de vorige pagina")

    pdf.h2("Tips")
    pdf.bullet("Typ alleen seniorease.nl - geen https:// nodig")
    pdf.bullet("Kruisje op tabblad is niet hetzelfde als de app sluiten")
    pdf.bullet("Vast? Hand opsteken - de helper komt naar u toe")

    pdf.box(
        "Onthoud",
        [
            "Adres typen = direct naar die site. Tabblad = extra pagina ernaast. Pijl terug = een stap terug.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Op uw eigen telefoon of tablet. Wifi aan.")

    pdf.h2("Oefentaak 1 - Een website openen")
    pdf.numbered(1, "Open Chrome of Safari.")
    pdf.numbered(2, "Tik in de adresbalk bovenaan.")
    pdf.numbered(3, "Typ: seniorease.nl")
    pdf.numbered(4, "Tik Enter of Ga.")
    pdf.numbered(5, "Wacht tot de pagina laadt.")
    pdf.body("Klaar als: u de SeniorEase-website ziet.")

    pdf.h2("Oefentaak 2 - Terug en vooruit")
    pdf.numbered(1, "Tik op een link op seniorease.nl.")
    pdf.numbered(2, "Tik op de pijl terug (linksboven of linksonder).")
    pdf.numbered(3, "Probeer eventueel de pijl vooruit.")
    pdf.body("Klaar als: u terug bent gegaan met de pijl terug.")

    pdf.h2("Oefentaak 3 - Tabbladen")
    pdf.numbered(1, "Tik op + voor een nieuw tabblad.")
    pdf.numbered(2, "Typ weer.nl of nos.nl en ga.")
    pdf.numbered(3, "Wissel terug naar seniorease.nl.")
    pdf.numbered(4, "Wissel nog een keer heen en weer.")
    pdf.body("Klaar als: u twee tabbladen heeft en ertussen wisselt.")

    pdf.h2("Oefentaak 4 - Tabblad sluiten")
    pdf.numbered(1, "Open het tabblad-overzicht.")
    pdf.numbered(2, "Sluit een tabblad met het kruisje op dat tabblad.")
    pdf.numbered(3, "Laat minstens een tabblad open.")
    pdf.body("Klaar als: een tabblad is gesloten en u zit nog in de browser.")

    pdf.h2("Android / iPhone (helper)")
    pdf.bullet("Android Chrome: tabblad-icoon met cijfer; + voor nieuw tabblad")
    pdf.bullet("iPhone Safari: twee vierkantjes onderaan; + in overzicht")
    pdf.bullet("Tabblad-kruisje vs app sluiten - even uitleggen")
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
            "Adresbalk: typ bijv. seniorease.nl - Enter.",
            "Pijl terug = vorige pagina. + = nieuw tabblad.",
            "Tabblad sluiten: kruisje op het tabblad, niet de hele app.",
            "seniorease.nl",
            "Volgende les: Ft3 QR-codes openen (camera of scanner).",
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
