#!/usr/bin/env python3
"""G2 AI openen en gebruiken."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-G2-AI-Gebruiken-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF(
        "SeniorEase  |  G2 AI gebruiken  |  Pakket G  |  v1.1",
        package_label="Pakket G - AI voor dagelijks gebruik",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "G2 - AI openen en gebruiken",
        "Lesmiddag 90 minuten",
        "AI-chat openen, vraag stellen, antwoord lezen, nieuw gesprek. "
        "Na G1: nu zelf chatten. Geen persoonlijke gegevens. Inloggen niet verplicht.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket G (4 lessen): EUR 19,95",
            "Volgende les: G3 Goede vragen stellen",
            "Gids: seniorease.nl/wat-is-ai/chatgpt",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5,
        "Kijken, doen, controleren, pauzeren. Begeleider kiest: ChatGPT, Gemini of Copilot.",
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Geen bord/beamer")
    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "AI-chat openen (zelfde site als begeleider)",
            "Vraag typen en versturen",
            "Antwoord lezen",
            "Nieuw gesprek starten",
        ],
        1,
    ):
        pdf.numbered(i, t)
    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen BSN, wachtwoord, bank of medisch intypen")
    pdf.bullet("Geen klassikale account-aanmelding")
    pdf.bullet("Geen diepe prompts (G3)")
    pdf.h2("Didactiek")
    pdf.body("Kijken - doen - controleren - pauzeren.")
    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:25-12:45 - AI openen (oefentaak 1)")
    pdf.h3("12:45-13:05 - Wifi-vraag (oefentaak 2)")
    pdf.h3("13:10-13:30 - Eigen vraag, bijv. erwtensoep (oefentaak 3)")
    pdf.h3("13:30-13:40 - Nieuw gesprek (oefentaak 4)")
    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 4")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  AI openen en gebruiken", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket G  -  telefoon, tablet of computer")
    pdf.ln(2)
    pdf.set_text_color(*NAVY)
    pdf.numbered(1, "AI-chat openen")
    pdf.numbered(2, "Eerste vraag: wifi uitleg")
    pdf.numbered(3, "Eigen vraag (recept, weer, ...)")
    pdf.numbered(4, "Nieuw gesprek")
    pdf.box("Niet typen", ["Geen wachtwoord, BSN, pincode of medische details."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.h2("Oefentaak 1 - AI-chat openen")
    pdf.body("URL van A4. Chatvenster zichtbaar. Inloggen niet verplicht.")
    pdf.h2("Oefentaak 2 - Eerste vraag")
    pdf.body("Typ: Leg wifi uit in eenvoudige taal voor een beginner. Versturen. Lees antwoord.")
    pdf.h2("Oefentaak 3 - Eigen vraag")
    pdf.body(
        "Bijv. Recept voor Hollandse erwtensoep voor 4 personen. "
        "Of weer morgen in [plaats]. Geen persoonlijke gegevens."
    )
    pdf.h2("Oefentaak 4 - Nieuw gesprek")
    pdf.body("Nieuw gesprek / + / New chat. Leeg typvak.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in ["Wifi op A4", "Start-URL op A4", "Site getest op eigen toestel", "8-10x kaarten", "Helper"]:
        pdf.check(t)
    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Typ vraag. Versturen. Lees antwoord rustig.",
            "Geen geheimen intypen.",
            "seniorease.nl/wat-is-ai/chatgpt",
            "Volgende: G3 Goede vragen stellen.",
        ]
    )
    pdf.h2("Licentie")
    pdf.body("Copyright SeniorEase.")

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
