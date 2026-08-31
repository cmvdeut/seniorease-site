#!/usr/bin/env python3
"""G4 AI veilig gebruiken."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-G4-AI-Veilig-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF(
        "SeniorEase  |  G4 AI veilig  |  Pakket G  |  v1.1",
        package_label="Pakket G - AI voor dagelijks gebruik",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "G4 - AI veilig gebruiken",
        "Lesmiddag 90 minuten",
        "Drie regels, kritisch lezen, wanneer geen AI. Koppeling pakket D en E. "
        "Laatste les pakket G.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken",
            "4. Kaart: AI veilig",
            "5. Zaalchecklist",
            "6. Nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Laatste les pakket G",
            "Gids: seniorease.nl/wat-is-ai",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Kijken, doen, controleren, pauzeren. Geen geheimen intypen.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Laatste les pakket G")
    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Drie regels noemen (geen geheimen, controleren, niet alles aan AI)",
            "Twijfelachtig AI-antwoord herkennen",
            "Weten wanneer mens of officiële site (niet AI)",
            "Verwijzing pakket D (fraude) en E (overheid)",
        ],
        1,
    ):
        pdf.numbered(i, t)
    pdf.h2("Drie regels")
    pdf.numbered(1, "Geen geheimen intypen")
    pdf.numbered(2, "Altijd controleren - AI kan verzinnen")
    pdf.numbered(3, "Medisch, geld, juridisch: mens of officiële site")
    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:25-12:45 - Drie regels (oefentaak 1)")
    pdf.h3("12:45-13:05 - Kritisch lezen: schilders (oefentaak 2)")
    pdf.h3("13:10-13:30 - Wanneer geen AI (oefentaak 3)")
    pdf.h3("13:30-13:40 - Thuis verder (oefentaak 4)")
    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 4")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  AI veilig gebruiken", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*NAVY)
    pdf.numbered(1, "Drie regels onthouden")
    pdf.numbered(2, "Kritisch lezen (twijfel)")
    pdf.numbered(3, "Wanneer geen AI")
    pdf.numbered(4, "Thuis verder leren")
    pdf.box("Onthoud", ["Geen geheimen. Altijd controleren. Niet alles aan AI."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.h2("Oefentaak 1 - Drie regels")
    pdf.body("Kaart lezen. Geen geheimen. Controleren. Dokter/bank: geen AI alleen.")
    pdf.h2("Oefentaak 2 - Kritisch lezen")
    pdf.body(
        "Typ: Noem drie bekende Nederlandse schilders. "
        "Daarna: Weet u dat zeker? Noem de bron. Bespreek met buur."
    )
    pdf.h2("Oefentaak 3 - Wanneer geen AI")
    pdf.body("Pijn: huisarts. Geld: bank. Verdacht bericht: pakket D. Overheid: pakket E.")
    pdf.h2("Oefentaak 4 - Thuis verder")
    pdf.body("seniorease.nl/wat-is-ai. Pakket G afgerond.")

    pdf.add_page()
    pdf.h1("4. Kaart - AI veilig")
    pdf.muted("Print 1x. Begeleider houdt omhoog.")
    pdf.box(
        "Wel doen",
        [
            "Algemene vragen: uitleg, recept, brief in algemene zin.",
            "Altijd even nadenken: klopt dit?",
            "Bij twijfel: kind, huisarts, officiële site.",
        ],
    )
    pdf.ln(3)
    pdf.box(
        "Niet doen",
        [
            "Geen wachtwoord, BSN, pincode, medische details intypen.",
            "Blind vertrouwen bij geld, belasting, medicijnen.",
            "Verdachte mail/WhatsApp: pakket D Veilig online.",
        ],
    )

    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in ["Kaart AI veilig geprint", "Wifi op A4", "AI-URL op A4", "8-10x kaarten", "Helper"]:
        pdf.check(t)
    pdf.h1("6. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Geen geheimen. Altijd controleren.",
            "Fraude: pakket D. Overheid: pakket E.",
            "seniorease.nl/wat-is-ai",
            "Pakket G afgerond.",
        ]
    )
    pdf.h2("Licentie")
    pdf.body("Copyright SeniorEase.")

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
