#!/usr/bin/env python3
"""G3 Goede vragen stellen."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-G3-Goede-Vragen-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF(
        "SeniorEase  |  G3 Goede vragen  |  Pakket G  |  v1.1",
        package_label="Pakket G - AI voor dagelijks gebruik",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "G3 - Goede vragen stellen",
        "Lesmiddag 90 minuten",
        "Duidelijke vragen, vervolgvragen, drie soorten hulp. "
        "Meer detail = beter antwoord. Na G2.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken",
            "4. Kaart: slecht vs goede vraag",
            "5. Zaalchecklist",
            "6. Nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Volgende les: G4 AI veilig gebruiken",
            "Gids: seniorease.nl/wat-is-ai/prompts",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Kijken, doen, controleren, pauzeren. Geen persoonlijke gegevens intypen.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  G2 of vergelijkbaar")
    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Vraag duidelijk formuleren (wie, wat, hoe kort)",
            "Vervolgvraag stellen als antwoord te moeilijk is",
            "Drie soorten vragen proberen (uitleg, stappen, tekst)",
            "Weten: meer detail = beter antwoord",
        ],
        1,
    ):
        pdf.numbered(i, t)
    pdf.h2("Voorbeeld kaart")
    pdf.body("Slecht: Vertel over internet.")
    pdf.body("Goed: Leg in max 5 zinnen uit wat wifi is, voor iemand van 70 die net begint.")
    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:25-12:45 - Duidelijke vraag (oefentaak 1)")
    pdf.h3("12:45-13:05 - Vervolgvraag (oefentaak 2)")
    pdf.h3("13:10-13:30 - Drie soorten (oefentaak 3)")
    pdf.h3("13:30-13:40 - Eigen vraag (oefentaak 4)")
    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap een van de drie vragen in oefentaak 3")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Goede vragen stellen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*NAVY)
    pdf.numbered(1, "Duidelijke vraag (wifi)")
    pdf.numbered(2, "Vervolgvraag (simpeler)")
    pdf.numbered(3, "Drie soorten: uitleg, stappen, tekst")
    pdf.numbered(4, "Eigen praktische vraag")
    pdf.box("Tip", ["Wie, wat, hoe kort? Hoe duidelijker, hoe beter het antwoord."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.h2("Oefentaak 1 - Duidelijke vraag")
    pdf.body(
        "Leg in maximaal 5 korte zinnen uit wat wifi is, "
        "voor iemand van 70 die net begint."
    )
    pdf.h2("Oefentaak 2 - Vervolgvraag")
    pdf.body("Leg het nog simpeler uit, alsof u tegen mijn kleinkind praat.")
    pdf.h2("Oefentaak 3 - Drie soorten")
    pdf.body("QR-code uitleg; 4 stappen foto maken; korte sms-tekst (2 zinnen).")
    pdf.h2("Oefentaak 4 - Eigen vraag")
    pdf.body("Recept, moestuin of bedank-sms. Kritisch lezen: blind vertrouwen?")

    pdf.add_page()
    pdf.h1("4. Kaart - slecht vs goede vraag")
    pdf.muted("Print 1x. Begeleider houdt omhoog bij start.")
    pdf.box(
        "Slechte vraag (vaag)",
        [
            "Vertel over internet.",
            "Leg iets uit over de computer.",
            "AI weet niet wat u bedoelt - antwoord is wazig.",
        ],
    )
    pdf.ln(3)
    pdf.box(
        "Goede vraag (duidelijk)",
        [
            "Leg in max 5 korte zinnen uit wat wifi is, voor iemand van 70.",
            "Geef 4 stappen om een foto te maken met een smartphone.",
            "Wie, wat, hoe kort - dan helpt AI beter.",
        ],
    )

    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in ["Wifi op A4", "AI-URL op A4", "Kaart slecht/goed geprint", "8-10x kaarten", "Helper"]:
        pdf.check(t)
    pdf.h1("6. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Wees specifiek. Stel vervolgvragen.",
            "Voorbeeldvragen op de website.",
            "seniorease.nl/wat-is-ai/prompts",
            "Volgende: G4 AI veilig gebruiken.",
        ]
    )
    pdf.h2("Licentie")
    pdf.body("Copyright SeniorEase.")

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
