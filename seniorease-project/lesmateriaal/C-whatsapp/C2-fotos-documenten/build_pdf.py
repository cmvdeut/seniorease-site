#!/usr/bin/env python3
"""C2 WhatsApp fotos en documenten."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import CLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-C2-Fotos-Documenten-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = CLessonPDF(
        f"SeniorEase  |  C2 Fotos & documenten  |  Pakket C  |  {LESSON_VERSION}",
        package_label="Pakket C - WhatsApp",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "C2 - Fotos en documenten",
        "Lesmiddag 90 minuten",
        "Foto uit galerij sturen (controle vóór versturen), PDF ontvangen, openen, "
        "sluiten en opnieuw terugvinden. Geen bord.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket C (4 lessen): EUR 19,95",
            "Vorige: C1 - Volgende: C3",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Foto uit galerij sturen; vóór versturen: foto en ontvanger controleren",
            "Foto groot bekijken",
            "Veilige oefen-PDF ontvangen, openen, sluiten, opnieuw vinden",
            "Zelfstandig: foto + PDF in chat",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Voorbereiding")
    pdf.bullet("Veilige oefen-PDF klaar om te sturen naar deelnemers")
    pdf.bullet("Deelnemers: foto in galerij")

    pdf.h2("Tijdlijn")
    pdf.tijdlijn_item("Chat", "")
    pdf.tijdlijn_item("Foto galerij (controle!)", "")
    pdf.tijdlijn_item("PDF ontvangen", "")
    pdf.tijdlijn_item("Open/sluit/vind", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  WhatsApp - fotos en documenten", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket C  -  {LESSON_VERSION}")

    pdf.h2("Vóór Versturen")
    pdf.numbered(1, "Klopt de foto?")
    pdf.numbered(2, "Klopt de ontvanger (naam bovenaan)?")

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    for title, body in [
        ("Oefentaak 1 - Chat openen", "Begeleider of buur."),
        ("Oefentaak 2 - Foto uit galerij", "Paperclip - Galerij - controle - Versturen."),
        ("Oefentaak 3 - Foto groot", "Tik op foto - terug."),
        ("Oefentaak 4 - Oefen-PDF", "Ontvangen - openen - sluiten - opnieuw vinden."),
        ("Oefentaak 5 - Zelfstandig", "Foto + PDF zelf doen."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in [
        "Wifi + begeleider-nummer op A4",
        "Veilige oefen-PDF klaar",
        "8-10x deelnemerskaart en oefentaken",
    ]:
        pdf.check(t)

    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Galerij = hoofdroute voor foto's. Controleer vóór Versturen.",
            "PDF: tik in chat - open - sluit - scroll terug.",
            "seniorease.nl/uitleg/whatsapp-basis",
            "Volgende les: C3 Bellen en groepen.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
