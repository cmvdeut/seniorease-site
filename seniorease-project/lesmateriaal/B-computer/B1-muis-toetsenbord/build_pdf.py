#!/usr/bin/env python3
"""B1 Muis, toetsenbord, bureaublad - computer."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-B1-Muis-Toetsenbord-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  B1 Muis & toetsenbord  |  Pakket B  |  v1.0",
        package_label="Pakket B - Computer & laptop")
    pdf.alias_nb_pages()

    pdf.cover(
        "B1 - Muis, toetsenbord en bureaublad",
        "Lesmiddag 90 minuten",
        "Op de computer: muis bewegen en klikken, bureaublad herkennen, Start openen, "
        "kort typen in Kladblok. Geen presentatie verplicht - voordoen op een scherm.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op de computer)",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Primair Windows; Mac: helper 1-op-1",
            "Pakket B (4 lessen): EUR 19,95",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Kijken, doen, controleren, pauzeren. Extra muizen meenemen helpt.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Computer/laptop  |  Geen presentatie verplicht")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Muis bewegen, klikken en dubbelklikken",
            "Bureaublad en taakbalk herkennen",
            "Start-menu openen (Windows)",
            "Kort typen in Kladblok",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen internet of downloaden (later)")
    pdf.bullet("Geen bestanden organiseren (B3)")
    pdf.bullet("Geen PowerPoint verplicht")

    pdf.h2("Voorbereiding")
    pdf.bullet("Pc's aan; extra USB-muizen")
    pdf.bullet("Kladblok bereikbaar via Start")
    pdf.bullet("Helper: touchpad en Mac")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Muis, toetsenbord, bureaublad. Rustig tempo.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam. Windows of Apple? Muis of touchpad?")
    pdf.h3("12:25-12:45 - Stap 1: muis (oefentaak 1)")
    pdf.body("Bewegen, linksklik, dubbelklik, kruisje om te sluiten.")
    pdf.h3("12:45-13:05 - Stap 2: bureaublad en Start (oefentaak 2)")
    pdf.body("Iconen, taakbalk, Windows-logo / Start openen en sluiten.")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:30 - Stap 3: typen (oefentaak 3)")
    pdf.body("Start - typ kladblok - openen - typ Hallo - spatie en Backspace.")
    pdf.h3("13:30-13:40 - Stap 4: scrollen (oefentaak 4)")
    pdf.body("Muiswiel of twee vingers op touchpad.")
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorg. Volgende: B2.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 4")
    pdf.bullet("Niet schrappen: klikken, Start, kort typen")

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
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket B  -  computer of laptop")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Muis: bewegen, klikken, dubbelklikken")
    pdf.numbered(2, "Bureaublad en Start")
    pdf.numbered(3, "Kort typen")
    pdf.numbered(4, "Scrollen")

    pdf.h2("Muis")
    pdf.bullet("Pijltje op het scherm volgt de muis")
    pdf.bullet("Linkermuisknop: een keer = selecteren; twee keer snel = openen")
    pdf.bullet("Kruisje rechtsboven = venster sluiten")

    pdf.h2("Toetsenbord")
    pdf.bullet("Spatiebalk = spatie tussen woorden")
    pdf.bullet("Backspace = letter wissen")
    pdf.bullet("Enter = vaak bevestigen of nieuwe regel")

    pdf.box("Onthoud", ["Bureaublad = iconen. Start = Windows-logo. Kladblok = typen oefenen."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Op de computer of laptop.")

    pdf.h2("Oefentaak 1 - Muis")
    pdf.numbered(1, "Beweeg de muis - volg het pijltje.")
    pdf.numbered(2, "Een keer linksklikken op een icoon.")
    pdf.numbered(3, "Dubbelklik op een icoon (bijv. Prullenbak).")
    pdf.numbered(4, "Sluit met het kruisje rechtsboven.")
    pdf.body("Klaar als: u kunt klikken en sluiten.")

    pdf.h2("Oefentaak 2 - Bureaublad en Start")
    pdf.numbered(1, "Herken het bureaublad (iconen).")
    pdf.numbered(2, "Klik op Start (Windows-logo).")
    pdf.numbered(3, "Sluit Start weer (klik buiten of Esc).")
    pdf.body("Klaar als: Start open en dicht is geweest.")

    pdf.h2("Oefentaak 3 - Typen")
    pdf.numbered(1, "Start - typ: kladblok - open Kladblok.")
    pdf.numbered(2, "Typ: Hallo")
    pdf.numbered(3, "Probeer spatiebalk en Backspace.")
    pdf.body("Klaar als: Hallo op het scherm staat. Opslaan niet nodig.")

    pdf.h2("Oefentaak 4 - Scrollen")
    pdf.numbered(1, "Open Start of een lang menu.")
    pdf.numbered(2, "Muiswiel of twee vingers op de touchpad.")
    pdf.body("Klaar als: u een keer heeft gescrolld.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Geen presentatie verplicht",
        "Pc's/laptops aan en werkend",
        "Extra USB-muizen",
        "Kladblok bereikbaar",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
        "Helper voor touchpad/Mac",
    ]:
        pdf.check(t)

    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Muis: bewegen, linksklik, dubbelklik. Kruisje = sluiten.",
            "Start = Windows-logo. Kladblok = typen oefenen.",
            "seniorease.nl",
            "Volgende les: B2 Vensters, tabbladen en programma's.",
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
