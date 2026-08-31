#!/usr/bin/env python3
"""Fc2 Websites en tabbladen - computer."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-Fc2-Websites-Tabbladen-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF(
        "SeniorEase  |  Fc2 Websites & tabbladen  |  Pakket F  |  v1.1",
        package_label="Pakket F - Internet (computer)",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "Fc2 - Websites en tabbladen",
        "Lesmiddag 90 minuten",
        "Adres typen, terug en vooruit, tabbladen openen en sluiten. Primair Windows.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op de computer)",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        ["Versie 1.1 - augustus 2026", "Volgende les: Fc3 Downloaden"],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Kijken, doen, controleren, pauzeren. Mac: helper 1-op-1.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Computer + internet")
    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Webadres typen in de adresbalk",
            "Terug en vooruit gebruiken",
            "Nieuw tabblad openen en wisselen",
            "Tabblad sluiten (niet de hele browser)",
        ],
        1,
    ):
        pdf.numbered(i, t)
    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen QR (F-telefoon / D2)")
    pdf.bullet("Geen downloaden (Fc3)")
    pdf.h2("Didactiek")
    pdf.numbered(1, "Kijken - u toont op scherm")
    pdf.numbered(2, "Doen")
    pdf.numbered(3, "Controleren - helper 1-op-1")
    pdf.numbered(4, "Pauzeren")
    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:25-12:45 - seniorease.nl typen")
    pdf.h3("12:45-13:05 - link + pijl terug")
    pdf.h3("13:10-13:30 - tabblad + weer.nl")
    pdf.h3("13:30-13:40 - tabblad sluiten")
    pdf.h2("Als de tijd krap is")
    pdf.bullet("Niet schrappen: adres + terug + tabblad")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Websites en tabbladen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.numbered(1, "seniorease.nl typen")
    pdf.numbered(2, "Terug en vooruit")
    pdf.numbered(3, "Tabbladen (+)")
    pdf.numbered(4, "Tabblad sluiten")
    pdf.box("Onthoud", ["Kruisje op tabblad is niet het venster sluiten."])
    pdf.body("Vast? Hand opsteken.")

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.h2("Oefentaak 1 - Website openen")
    pdf.numbered(1, "Open Edge of Chrome.")
    pdf.numbered(2, "Klik in adresbalk. Typ seniorease.nl. Enter.")
    pdf.body("Klaar als: SeniorEase-website zichtbaar.")
    pdf.h2("Oefentaak 2 - Terug en vooruit")
    pdf.numbered(1, "Klik op een link.")
    pdf.numbered(2, "Klik pijl terug linksboven.")
    pdf.body("Klaar als: u terug bent bij vorige pagina.")
    pdf.h2("Oefentaak 3 - Tabbladen")
    pdf.numbered(1, "Klik + voor nieuw tabblad.")
    pdf.numbered(2, "Typ weer.nl of nos.nl. Enter.")
    pdf.numbered(3, "Wissel tussen tabbladen.")
    pdf.body("Klaar als: twee tabbladen open.")
    pdf.h2("Oefentaak 4 - Tabblad sluiten")
    pdf.numbered(1, "Klik kruisje op tabblad.")
    pdf.body("Klaar als: browser nog open is.")
    pdf.h2("Helper")
    pdf.bullet("Tabblad-kruisje vs venster-kruisje")
    pdf.bullet("Mac: Cmd+T; helper 1-op-1")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in ["Pc's aan", "Internet", "Extra muizen", "8-10x kaarten", "Helper"]:
        pdf.check(t)
    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Adresbalk: seniorease.nl. + = tabblad. Pijl terug.",
            "seniorease.nl",
            "Volgende: Fc3 Downloaden.",
        ]
    )
    pdf.h2("Licentie")
    pdf.body("Copyright SeniorEase.")

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
