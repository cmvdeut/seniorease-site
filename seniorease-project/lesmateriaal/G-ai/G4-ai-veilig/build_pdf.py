#!/usr/bin/env python3
"""G4 AI veilig gebruiken."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-G4-AI-Veilig-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = GLessonPDF(
        f"SeniorEase  |  G4 AI veilig  |  Pakket G  |  {LESSON_VERSION}",
        package_label="Pakket G - AI voor dagelijks gebruik",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "G4 - AI veilig gebruiken",
        "Lesmiddag 90 minuten",
        "Inclusief beamerpresentatie. Drie regels: geen geheimen; controleren; "
        "bij gezondheid/geld/recht/overheid deskundige of officiële bron. "
        "Echt controleren (niet alleen AI om een bron vragen). "
        "Geen gevoelige documenten uploaden.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken",
            "4. Zaalchecklist + nazorg",
            "Beamer-PDF in map beamer/",
        ],
        ["Versie 1.1 - augustus 2026", "Laatste les pakket G"],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Beamer eerst, daarna eigen toestel")

    pdf.h2("Drie regels")
    pdf.numbered(1, "Geen geheimen of gevoelige persoonsgegevens")
    pdf.numbered(2, "Belangrijke informatie controleren - AI kan fouten maken")
    pdf.numbered(
        3,
        "Gezondheid, geld, recht, overheid: deskundige of officiele bron",
    )

    pdf.h2("Tijdlijn (beamer)")
    pdf.tijdlijn_item("Regels", "")
    pdf.tijdlijn_item("Echt controleren (Hoe kan ik controleren? + zelf checken)", "")
    pdf.tijdlijn_item("Wanneer deskundige", "")
    pdf.tijdlijn_item("Upload-waarschuwing", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  AI veilig gebruiken", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket G  -  {LESSON_VERSION}")
    pdf.ln(2)
    pdf.box(
        "Drie regels",
        [
            "1. Geen geheimen of gevoelige gegevens.",
            "2. Belangrijke informatie controleren.",
            "3. Gezondheid / geld / recht / overheid: deskundige of officiele bron.",
        ],
    )
    pdf.ln(2)
    pdf.box(
        "Uploaden",
        [
            "Geen paspoort, bankafschrift, belastingbrief of medisch document in AI.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    for title, body in [
        ("Oefentaak 1 - Drie regels", "Noem de regels hardop."),
        (
            "Oefentaak 2 - Echt controleren",
            "Vraag AI hoe te controleren. Check daarna een feit zelf (bijv. Wikipedia).",
        ),
        ("Oefentaak 3 - Deskundige", "Noem een situatie voor huisarts/bank/D/E."),
        ("Oefentaak 4 - Uploaden", "Nee tegen wachtwoord/BSN/gevoelige documenten."),
        ("Oefentaak 5 - Zelfstandig", "Regels + controle-route."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorg")
    for t in ["Beamer-PDF", "A4 AI veilig", "AI-URL", "Print", "Helper"]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Geen geheimen. Controleren. Deskundige of officiele bron bij grote zaken.",
            "AI kan bronnen verzinnen - zoek zelf na.",
            "Fraude: pakket D. DigiD: pakket E.",
            "seniorease.nl/wat-is-ai",
            "Pakket G afgerond.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
