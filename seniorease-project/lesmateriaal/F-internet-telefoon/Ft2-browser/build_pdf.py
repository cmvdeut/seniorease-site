#!/usr/bin/env python3
"""Ft2 Browser gebruiken - telefoon/tablet."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import FtLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-Ft2-Browser-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = FtLessonPDF(
        f"SeniorEase  |  Ft2 Browser gebruiken  |  Pakket F  |  {LESSON_VERSION}",
        package_label="Pakket F - Internet (telefoon/tablet)",
    )
    pdf.alias_nb_pages()
    pdf.cover(
        "Ft2 - De browser leren gebruiken",
        "Lesmiddag 90 minuten",
        "Google zoeken vs webadres typen. Adresbalk controleren. "
        "Terug, tabbladen (Chrome en Safari verschillen), wisselen en sluiten. "
        "Geen bord, geen computer.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Volgende les: Ft3 QR-codes",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon of tablet + wifi")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Verschil: Google zoeken vs webadres typen",
            "Adresbalk: op welke site bent u?",
            "Terug, nieuw tabblad, wisselen, sluiten (op hun toestel)",
            "Zelfstandige eindopdracht",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Niet doen alsof elk toestel hetzelfde kruisje heeft")
    pdf.bullet("Geen QR (Ft3) / downloads (Ft4)")

    pdf.h2("Tijdlijn")
    pdf.tijdlijn_item("Zoeken vs adres", "")
    pdf.tijdlijn_item("Link + terug", "")
    pdf.tijdlijn_item("Tabbladen (Chrome/Safari)", "")
    pdf.tijdlijn_item("Sluiten", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Niet schrappen: adres typen + terug + tabblad + eindopdracht")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Browser gebruiken", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket F  -  telefoon/tablet  -  {LESSON_VERSION}")
    pdf.ln(2)
    pdf.h2("Vandaag oefenen")
    pdf.numbered(1, "Adres typen + adresbalk checken")
    pdf.numbered(2, "Link + terug")
    pdf.numbered(3, "Nieuw tabblad + wisselen")
    pdf.numbered(4, "Tabblad sluiten")
    pdf.numbered(5, "Zelfstandig: hele route")
    pdf.box(
        "Onthoud",
        [
            "Google = zoeken. Adresbalk = site die u kent.",
            "Chrome en Safari: tabbladen zien er anders uit - helper helpt.",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    for title, body in [
        ("Oefentaak 1 - Zoeken of adres", "Typ seniorease.nl. Controleer adresbalk."),
        ("Oefentaak 2 - Link + terug", "Link openen - pijl terug."),
        ("Oefentaak 3 - Tabbladen", "Nieuw tabblad - tweede site - wisselen. Helper bij icoon."),
        ("Oefentaak 4 - Sluiten", "Kruisje of veeg (Safari) - browser blijft open."),
        (
            "Oefentaak 5 - Zelfstandig",
            "Typen - link - terug - nieuw tabblad - tweede site - wisselen - sluiten.",
        ),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in [
        "Wifi op A4",
        "Helper kent Chrome en Safari-tabbladen",
        "8-10x kaarten",
    ]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Adresbalk: typ site of controleer waar u bent. + = nieuw tabblad.",
            "Chrome en Safari verschillen - vraag de helper op uw toestel.",
            "seniorease.nl",
            "Volgende: Ft3 QR-codes.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
