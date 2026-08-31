#!/usr/bin/env python3
"""C3 WhatsApp bellen, video en groepen."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import CLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-C3-Bellen-Groepen-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = CLessonPDF(
        f"SeniorEase  |  C3 Bellen & groepen  |  Pakket C  |  {LESSON_VERSION}",
        package_label="Pakket C - WhatsApp",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "C3 - Bellen, videobellen en groepen",
        "Lesmiddag 90 minuten",
        "Spraak- en video-oproep, microfoon dempen, camera wisselen, wifi vs data, "
        "groep met deelnemerslijst, meldingen dempen. Zelf groep maken: optioneel.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket C (4 lessen): EUR 19,95",
            "Vorige: C2 - Volgende: C4",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Wifi aanbevolen")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Spraakoproep starten en ophangen",
            "Video: dempen, camera wisselen; wifi vs data",
            "Groep openen; deelnemers zien; bericht sturen",
            "Meldingen dempen",
            "Zelfstandig oefenen",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wifi vs data (kort)")
    pdf.bullet("Wifi = vaak stabieler voor video")
    pdf.bullet("Mobiele data = kan uit databundel")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  WhatsApp - bellen en groepen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket C  -  {LESSON_VERSION}")

    pdf.h2("Video - kort")
    pdf.bullet("Microfoon dempen = doorgestreept icoon")
    pdf.bullet("Camera wisselen = voor/achter")
    pdf.bullet("Rood = ophangen")

    pdf.h2("Groep")
    pdf.bullet("Groepsnaam bovenaan = deelnemerslijst")
    pdf.bullet("Zelf groep maken: optioneel met helper")

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    for title, body in [
        ("Oefentaak 1 - Chat", "1-op-1 chat openen."),
        ("Oefentaak 2 - Spraak", "Telefoon-icoon - ophangen."),
        ("Oefentaak 3 - Video", "Camera - dempen - wisselen - ophangen."),
        ("Oefentaak 4 - Groep", "Deelnemers zien - bericht sturen."),
        ("Oefentaak 5 - Dempen", "Meldingen dempen in groep."),
        ("Oefentaak 6 - Zelfstandig", "Bellen - groep - deelnemers."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in [
        "Wifi op A4",
        "Optioneel: oefengroep",
        "Helper: camera/microfoon-toestemming",
        "8-10x deelnemerskaart en oefentaken",
    ]:
        pdf.check(t)

    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Telefoon = geluid. Camera = video. Rood = ophangen.",
            "Groep: tik op naam - deelnemers. Zelf maken mag later.",
            "seniorease.nl/uitleg/whatsapp-basis",
            "Volgende les: C4 Privacy en fraude.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
