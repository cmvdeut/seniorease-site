#!/usr/bin/env python3
"""C4 WhatsApp privacy en fraude - kort, doorverwijzing naar D."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-C4-Privacy-Fraude-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  C4 Privacy & fraude  |  Pakket C  |  v1.0",
        package_label="Pakket C - WhatsApp")
    pdf.alias_nb_pages()

    pdf.cover(
        "C4 - Privacy en fraude",
        "Lesmiddag 90 minuten",
        "Op het toestel: WhatsApp-privacy openen, blokkeren vinden, een verdacht "
        "verzoek herkennen. Kort en rustig. Dieper oefenen: pakket D. Geen bord.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Scenario-A4 + zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Einde pakket C - EUR 19,95 voor 4 lessen",
            "Meer veiligheid: pakket D Veilig online",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Geen paniek, geen schaamte. Twijfel is verstandig.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon of tablet  |  Geen bord/beamer")
    pdf.body(
        "Dit is geen vervanging van pakket D. Verwijs door voor nepberichten, "
        "phishing en bankfraude."
    )

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "WhatsApp-instellingen en Privacy openen",
            "Een privacy-optie bekijken",
            "Blokkeren vinden (niet verplicht uitvoeren)",
            "Geheim + geld = stop; bekend contact zoeken",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen paniekzaaierij")
    pdf.bullet("Geen echte fraude-links openen")
    pdf.bullet("Geen volledige veiligheidsreeks (dat is D)")
    pdf.bullet("Geen computer, bord of presentatie")

    pdf.h2("Voorbereiding")
    pdf.bullet("Veilig oefenbericht of scenario-A4")
    pdf.bullet("Helper voor afwijkende menu's")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Privacy en rare verzoeken - rustig, zonder paniek.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + Android/iPhone. Rare WhatsApp gehad? Ja/nee genoeg.")
    pdf.h3("12:25-12:50 - Stap 1: privacy (oefentaak 1-2)")
    pdf.body("Instellingen - Privacy. Een optie bekijken. Wijzigen alleen als zij willen.")
    pdf.h3("12:50-13:05 - Stap 2: blokkeren vinden (oefentaak 3)")
    pdf.body("Menu vinden. Niet verplicht echt blokkeren.")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:35 - Stap 3: fraude-oefening (oefentaak 4)")
    pdf.body("Oefenbericht. Signalen noemen. Bekend contact zoeken.")
    pdf.h3("13:35-13:45 - Afronding")
    pdf.body("Nazorg. Pakket C compleet. Pakket D noemen.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap blokkeren")
    pdf.bullet("Niet schrappen: privacy openen + geheim+geld=stop")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  WhatsApp - privacy en fraude", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket C  -  telefoon of tablet")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Instellingen en Privacy openen")
    pdf.numbered(2, "Blokkeren vinden")
    pdf.numbered(3, "Verdacht verzoek herkennen")

    pdf.h2("Privacy - kort")
    pdf.bullet("WhatsApp - Instellingen - Privacy")
    pdf.bullet("Profielfoto / Laatst gezien / Info: wie mag dat zien?")

    pdf.h2("Fraude - gouden regel")
    pdf.numbered(1, "Nieuw nummer + geld + geheim = stop")
    pdf.numbered(2, "Niet overmaken, niet op links tikken")
    pdf.numbered(3, "Bel of app via een contact dat u al had")

    pdf.box(
        "Meer oefenen",
        ["Pakket D Veilig online - vier lessen over nepberichten, links en bankieren."],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Geen geld overmaken. Geen verdachte links openen.")

    pdf.h2("Oefentaak 1 - Instellingen openen")
    pdf.numbered(1, "Open WhatsApp.")
    pdf.numbered(2, "Ga naar Instellingen (tandwiel, puntjes of tab onderaan).")
    pdf.body("Klaar als: u het instellingenmenu ziet.")

    pdf.h2("Oefentaak 2 - Privacy bekijken")
    pdf.numbered(1, "Tik op Privacy.")
    pdf.numbered(2, "Open een optie (bijv. Profielfoto).")
    pdf.numbered(3, "Kijk wie het mag zien. Wijzig alleen als u wilt.")
    pdf.body("Klaar als: u Privacy heeft bekeken.")

    pdf.h2("Oefentaak 3 - Blokkeren vinden")
    pdf.numbered(1, "Open een chat - naam of meer.")
    pdf.numbered(2, "Zoek Blokkeren.")
    pdf.numbered(3, "Blokkeer vandaag niemand tenzij u dat wilt - ga terug.")
    pdf.body("Klaar als: u Blokkeren heeft gezien.")

    pdf.h2("Oefentaak 4 - Verdacht verzoek")
    pdf.numbered(1, "Lees het oefenbericht of de scenario-A4.")
    pdf.numbered(2, "Noem de signalen.")
    pdf.numbered(3, "Zoek in Contacten iemand die u al kende.")
    pdf.body("Klaar als: signalen genoemd + bekend contact gevonden.")

    pdf.add_page()
    pdf.h1("4. Scenario-A4")
    pdf.muted("Print 1x. Omhoog houden of uitdelen. Geen bord nodig.")
    pdf.ln(2)
    pdf.box(
        "OEFENING - geen echt verzoek",
        [
            'WhatsApp van onbekend nummer: "Oma, nieuw nummer.',
            'Stuur 100 euro. Vertel mama niet."',
            "",
            "Wat valt op?",
            "Wat doet u? (niet overmaken - bekend contact)",
        ],
    )

    pdf.h1("Zaalchecklist")
    for t in [
        "Geen bord of beamer nodig",
        "Oefenbericht of scenario-A4 klaar",
        "Geen schaamte / geen paniek",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
        "Pakket D kunnen noemen",
    ]:
        pdf.check(t)

    pdf.add_page()
    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Instellingen - Privacy. Geheim + geld = stop. Bel terug via bekend nummer.",
            "Meer oefenen: pakket D Veilig online.",
            "seniorease.nl/uitleg/veiligheid",
            "Pakket C is compleet. Opfrisser: les C1.",
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
