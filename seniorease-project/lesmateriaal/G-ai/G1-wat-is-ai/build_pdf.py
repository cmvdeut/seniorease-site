#!/usr/bin/env python3
"""G1 Wat is AI."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-G1-Wat-Is-AI-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF(
        "SeniorEase  |  G1 Wat is AI?  |  Pakket G  |  v1.0",
        package_label="Pakket G - AI voor dagelijks gebruik",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "G1 - Wat is AI?",
        "Lesmiddag 90 minuten",
        "In gewone taal: wat AI is, waar u het tegenkomt, en wat het niet is. "
        "Aan het eind: korte proef met AI — een appeltaart-recept. Telefoon, tablet of computer.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken",
            "4. Kaart: wat is AI / wat niet",
            "5. Zaalchecklist",
            "6. Nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket G (4 lessen): EUR 19,95",
            "Volgende les: G2 AI openen en gebruiken",
            "Gids: seniorease.nl/wat-is-ai",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Kijken, doen, controleren, pauzeren. Proef: appeltaart-recept. Geen account verplicht.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Geen bord/beamer")
    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "In eigen woorden zeggen wat AI ongeveer is",
            "Voorbeelden noemen waar ze AI tegenkomen",
            "Weten: AI is geen mens en kan fout zitten",
            "Een keer gezien hoe AI antwoord geeft (recept)",
            "Weten waar ze verder lezen (seniorease.nl/wat-is-ai)",
        ],
        1,
    ):
        pdf.numbered(i, t)
    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen technische diepgang")
    pdf.bullet("Geen account klassikaal aanmaken")
    pdf.bullet("Alleen een korte proefvraag (G2 gaat dieper)")
    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:25-12:40 - Wat is AI? (oefentaak 1)")
    pdf.h3("12:40-13:00 - Voorbeelden (oefentaak 2)")
    pdf.h3("13:05-13:25 - Wat AI niet is (oefentaak 3)")
    pdf.h3("13:25-13:40 - Proef AI: appeltaart-recept (oefentaak 4)")
    pdf.h3("13:40-13:48 - Gids seniorease.nl (oefentaak 5)")
    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 5; proef recept minimaal als demo begeleider")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Wat is AI?", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket G  -  telefoon, tablet of computer")
    pdf.ln(2)
    pdf.h2("Vandaag")
    pdf.numbered(1, "Wat AI ongeveer is")
    pdf.numbered(2, "Voorbeelden herkennen")
    pdf.numbered(3, "Wat AI niet is")
    pdf.numbered(4, "Proef: appeltaart-recept via AI")
    pdf.numbered(5, "Gids op seniorease.nl")
    pdf.box("Onthoud", ["AI = programma dat antwoord geeft. Geen mens. Kan fout zitten."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.h2("Oefentaak 1 - In eigen woorden")
    pdf.body("Zeg: AI is... (één zin). Klaar als u kunt uitleggen.")
    pdf.h2("Oefentaak 2 - Herken een voorbeeld")
    pdf.body("Spellingscontrole, spraakassistent, aanbevelingen, zoeken.")
    pdf.h2("Oefentaak 3 - Wat AI niet is")
    pdf.body("Geen mens. Kan fout zitten. Geen dokter/advocaat vervangen.")
    pdf.h2("Oefentaak 4 - Proef: appeltaart-recept")
    pdf.body(
        "Open AI-chat (URL op A4). Typ: Geef een simpel recept voor Hollandse appeltaart "
        "voor 6 personen. Versturen. Lees ingredienten. Meekijken mag."
    )
    pdf.h2("Oefentaak 5 - Gids")
    pdf.body("seniorease.nl/wat-is-ai openen en bladeren.")

    pdf.add_page()
    pdf.h1("4. Kaart - wat is AI / wat niet")
    pdf.muted("Print 1x. Begeleider houdt omhoog.")
    pdf.box(
        "AI is (simpel)",
        [
            "Een computerprogramma dat tekst maakt of antwoord geeft.",
            "Soms lijkt het op een gesprek - maar het is geen persoon.",
            "Voorbeelden: spellingscontrole, aanbevelingen, soms zoeken.",
        ],
    )
    pdf.ln(3)
    pdf.box(
        "AI is niet",
        [
            "Geen mens die u kent.",
            "Niet altijd waar - het kan fouten maken.",
            "Geen vervanging van dokter, bank of advocaat.",
        ],
    )

    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in ["Wifi op A4", "Kaart geprint", "AI-start-URL op A4", "8-10x kaarten", "Helper"]:
        pdf.check(t)
    pdf.h1("6. Nazorgkaart")
    pdf.nazorg_card(
        [
            "AI = programma, geen mens. Kan fout zitten.",
            "U heeft AI geproefd met een appeltaart-recept.",
            "Meer uitleg en video's op de website.",
            "seniorease.nl/wat-is-ai",
            "Volgende les: G2 AI openen en gebruiken.",
        ]
    )
    pdf.h2("Licentie")
    pdf.body("Copyright SeniorEase.")

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
