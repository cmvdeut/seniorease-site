#!/usr/bin/env python3
"""G1 Wat is AI."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-G1-Wat-Is-AI-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = GLessonPDF(
        f"SeniorEase  |  G1 Wat is AI?  |  Pakket G  |  {LESSON_VERSION}",
        package_label="Pakket G - AI voor dagelijks gebruik",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "G1 - Wat is AI?",
        "Lesmiddag 90 minuten",
        "Inclusief beamerpresentatie voor de begeleider. Deelnemers oefenen daarna "
        "op hun eigen telefoon, tablet of computer. Wat AI is, waar u het ziet, "
        "dat het fout kan zijn, en een veilige appeltaart-proef.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken",
            "4. Kaart + zaalchecklist + nazorg",
            "Beamer-PDF in map beamer/",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket G (4 lessen): EUR 19,95",
            "Gids: seniorease.nl/wat-is-ai",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted(
        "90 min (+ 15 inloop)  |  Max. 8-10  |  "
        "Beamer eerst, daarna eigen toestel"
    )
    pdf.body(
        "Didactiek: Kijken op de beamer - zelf doen - samen controleren - volgende stap."
    )

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "In eigen woorden zeggen wat AI is",
            "Voorbeelden noemen (vertalen, foto, spraak, chat, ...)",
            "Weten: denkt niet als mens; kan overtuigend fout zijn",
            "Appeltaart-proef gezien of mee gedaan",
            "Zelfstandige eindopdracht",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Tijdlijn (beamer gekoppeld)")
    pdf.tijdlijn_item("Beamer Wat is AI", "")
    pdf.tijdlijn_item("Voorbeelden", "")
    pdf.tijdlijn_item("Wat AI niet is", "")
    pdf.tijdlijn_item("Beamerdemo appeltaart + zelf proberen", "")
    pdf.tijdlijn_item("Eindopdracht", "")

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
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket G  -  {LESSON_VERSION}")
    pdf.ln(2)
    pdf.box(
        "Wat is AI?",
        [
            "Technologie waarmee een computer bijvoorbeeld tekst, afbeeldingen "
            "of antwoorden kan maken en patronen kan herkennen.",
            "Het denkt niet zoals een mens. Het kan overtuigend klinken "
            "terwijl het antwoord toch fout is.",
        ],
    )
    pdf.ln(2)
    pdf.h2("Voorbeelden")
    pdf.bullet("Vertalen, foto's herkennen, spraak-naar-tekst, AI-chat")
    pdf.bullet("Spellingscontrole, aanbevelingen, zoeken")

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    for title, body in [
        ("Oefentaak 1 - Eigen woorden", "Zeg: AI is... Onthoud: kan overtuigend fout zijn."),
        ("Oefentaak 2 - Voorbeeld", "Noem er een: vertalen, foto, spraak, chat, ..."),
        ("Oefentaak 3 - Wat niet", "Geen mens. Kan fout. Belangrijk: later controleren (G4)."),
        ("Oefentaak 4 - Appeltaart", "Recept vragen. Zeg: Dit antwoord kan fout zijn."),
        ("Oefentaak 5 - Zelfstandig", "Zin over AI + een voorbeeld. Optioneel: seniorease.nl/wat-is-ai."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Kaart + checklist + nazorg")
    pdf.box(
        "AI is / is niet",
        [
            "IS: tekst/beelden/antwoorden maken; patronen herkennen.",
            "IS NIET: een mens; altijd waar; enige bron bij grote beslissingen.",
        ],
    )
    pdf.ln(4)
    for t in [
        "Beamer-PDF klaar",
        "Wifi + AI-URL op A4",
        "Print oefentaken (altijd)",
        "8-10x kaarten",
    ]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "AI maakt tekst of antwoorden - denkt niet als mens - kan fout zijn.",
            "U heeft AI geproefd met appeltaart.",
            "seniorease.nl/wat-is-ai",
            "Volgende: G2 AI openen en gebruiken.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
