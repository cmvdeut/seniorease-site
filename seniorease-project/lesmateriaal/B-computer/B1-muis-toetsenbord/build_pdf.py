#!/usr/bin/env python3
"""B1 Muis, toetsenbord, bureaublad - computer."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import BLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-B1-Muis-Toetsenbord-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = BLessonPDF(
        f"SeniorEase  |  B1 Muis & toetsenbord  |  Pakket B  |  {LESSON_VERSION}",
        package_label="Pakket B - Computer & laptop",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "B1 - Muis, toetsenbord en bureaublad",
        "Lesmiddag 90 minuten",
        "Muis en klikken, bureaublad en Start, typen en corrigeren, Shift en Caps Lock, "
        "rechtermuisknop kort, verkeerd venster sluiten. Voordoen op een scherm. "
        "Geen presentatie verplicht.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op de computer)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Primair Windows; Mac: helper 1-op-1",
            "Pakket B (4 lessen): EUR 19,95",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Computer/laptop")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Muis bewegen, klikken en dubbelklikken",
            "Bureaublad en Start-menu openen",
            "Een zin typen en een fout corrigeren",
            "Shift en Caps Lock voor hoofdletters; Caps Lock herkennen",
            "Rechtermuisknop kort herkennen (extra menu)",
            "Verkeerd venster sluiten met kruisje",
            "Zelfstandig: Start - Kladblok - typen - corrigeren - sluiten",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen internet of downloaden (later)")
    pdf.bullet("Geen bestanden organiseren (B3)")
    pdf.bullet("Geen PowerPoint verplicht")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.tijdlijn_item("12:00-12:15 - Inloop", "Welkom. Muis, toetsenbord, bureaublad.")
    pdf.tijdlijn_item("12:15-12:25 - Kennismaking", "Voornaam. Windows of Apple? Muis of touchpad?")
    pdf.tijdlijn_item("12:25-12:40 - Stap 1: muis (oefentaak 1)", "Bewegen, linksklik, dubbelklik, kruisje.")
    pdf.tijdlijn_item(
        "12:40-12:50 - Stap 2: bureaublad en Start (oefentaak 2)",
        "Iconen, taakbalk, Start openen en sluiten.",
    )
    pdf.tijdlijn_item("12:50-13:05 - Stap 3: typen (oefentaak 3)", "Kladblok - zin - Backspace - spatie.")
    pdf.tijdlijn_item("13:05-13:10 - Pauze", "")
    pdf.tijdlijn_item(
        "13:10-13:22 - Stap 4: Shift, Caps Lock, rechts (oefentaak 4)",
        "Hoofdletters. Caps Lock uit als alles HOOFD is. Rechts klikken = menu.",
    )
    pdf.tijdlijn_item("13:22-13:28 - Stap 5: scrollen (oefentaak 5)", "Muiswiel of touchpad.")
    pdf.tijdlijn_item("13:28-13:33 - Stap 6: verkeerd venster (oefentaak 6)", "Kruisje - opnieuw openen.")
    pdf.tijdlijn_item(
        "13:33-13:40 - Eindopdracht (oefentaak 7)",
        "Start - Kladblok - zin - corrigeren - sluiten.",
    )
    pdf.tijdlijn_item("13:40-13:45 - Afronding", "Nazorg. Volgende: B2.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap scrollen of verkort oefentaak 6")
    pdf.bullet("Niet schrappen: klikken, Start, typen + Shift, eindopdracht")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Muis, toetsenbord, bureaublad", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket B  -  computer  -  {LESSON_VERSION}")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Muis: bewegen, klikken")
    pdf.numbered(2, "Bureaublad en Start")
    pdf.numbered(3, "Zin typen en corrigeren")
    pdf.numbered(4, "Shift, Caps Lock, rechtermuisknop")
    pdf.numbered(5, "Verkeerd venster sluiten")
    pdf.numbered(6, "Zelfstandig: Start - Kladblok - sluiten")

    pdf.h2("Toetsenbord - kort")
    pdf.bullet("Shift + letter = hoofdletter")
    pdf.bullet("Caps Lock = alles hoofdletter (lampje?)")
    pdf.bullet("Backspace = wissen")
    pdf.bullet("Rechts klikken = extra menu")

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted(f"Op de computer. Versie {LESSON_VERSION.lstrip('v')}.")

    pdf.h2("Oefentaak 1 - Muis")
    pdf.body("Bewegen - linksklik - dubbelklik - kruisje. Klaar als: klikken en sluiten.")

    pdf.h2("Oefentaak 2 - Bureaublad en Start")
    pdf.body("Start openen en sluiten. Klaar als: Start open en dicht geweest.")

    pdf.h2("Oefentaak 3 - Zin typen")
    pdf.body("Kladblok - Hallo, dit is mijn oefening. - foutje - Backspace.")

    pdf.h2("Oefentaak 4 - Shift, Caps Lock, rechts")
    pdf.body("Shift voor hoofdletter. Caps Lock herkennen. Rechts klikken = menu zien.")

    pdf.h2("Oefentaak 5 - Scrollen")
    pdf.body("Muiswiel of touchpad. Klaar als: een keer gescrolld.")

    pdf.h2("Oefentaak 6 - Verkeerd venster")
    pdf.body("Per ongeluk openen - kruisje - opnieuw Kladblok.")

    pdf.h2("Oefentaak 7 - Zelfstandig")
    pdf.body("Start - Kladblok - zin - corrigeren - sluiten.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in [
        "Pc's/laptops aan; extra USB-muizen",
        "Kladblok bereikbaar via Start",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
        "Helper voor touchpad/Mac",
    ]:
        pdf.check(t)

    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Verkeerd venster? Kruisje = sluiten.",
            "Caps Lock uit als alles HOOFD is. Shift = een hoofdletter.",
            "Start = Windows-logo. Kladblok = typen oefenen.",
            "seniorease.nl",
            "Volgende les: B2 Vensters, tabbladen en programma's.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
