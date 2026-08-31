#!/usr/bin/env python3
"""C1 WhatsApp berichten."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import CLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-C1-Berichten-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = CLessonPDF(
        f"SeniorEase  |  C1 Berichten  |  Pakket C  |  {LESSON_VERSION}",
        package_label="Pakket C - WhatsApp",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "C1 - Berichten sturen",
        "Lesmiddag 90 minuten",
        "WhatsApp openen, bericht sturen, typefout corrigeren, emoji, vinkjes begrijpen, "
        "lezen en beantwoorden, bericht verwijderen. Fotos in C2. Geen bord.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Gids: seniorease.nl/uitleg/whatsapp-basis",
            "Pakket C (4 lessen): EUR 19,95",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon of tablet")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "WhatsApp openen; gesprek starten of openen",
            "Bericht sturen; typefout corrigeren; emoji",
            "Vinkjes begrijpen (blauw = leesbewijzen aan)",
            "Ontvangen bericht lezen en beantwoorden",
            "Bericht kort verwijderen (oefenbericht)",
            "Zelfstandig: gesprek - sturen - antwoord",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Vinkjes - kort")
    pdf.bullet("Een grijs = verzonden")
    pdf.bullet("Twee grijs = afgeleverd")
    pdf.bullet("Twee blauw = gelezen (alleen als leesbewijzen aan staan)")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.tijdlijn_item("Openen", "")
    pdf.tijdlijn_item("Gesprek", "")
    pdf.tijdlijn_item("Bericht + typefout", "")
    pdf.tijdlijn_item("Emoji", "")
    pdf.tijdlijn_item("Vinkjes", "")
    pdf.tijdlijn_item("Lezen/beantwoorden", "")
    pdf.tijdlijn_item("Verwijderen", "")
    pdf.tijdlijn_item("Eindopdracht", "")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap emoji of verwijderen")
    pdf.bullet("Niet schrappen: sturen, vinkjes, beantwoorden, eindopdracht")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  WhatsApp - berichten sturen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket C  -  {LESSON_VERSION}")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "WhatsApp openen")
    pdf.numbered(2, "Gesprek openen")
    pdf.numbered(3, "Bericht sturen + typefout")
    pdf.numbered(4, "Emoji")
    pdf.numbered(5, "Vinkjes")
    pdf.numbered(6, "Lezen en beantwoorden")
    pdf.numbered(7, "Zelfstandig")

    pdf.box("Onthoud", ["Nooit bankgegevens via WhatsApp. Blauwe vinkjes = leesbewijzen."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted(f"Versie {LESSON_VERSION.lstrip('v')}.")

    for title, body in [
        ("Oefentaak 1 - WhatsApp openen", "Groene icoon - chatlijst."),
        ("Oefentaak 2 - Gesprek openen", "Juiste naam bovenaan."),
        ("Oefentaak 3 - Bericht + typefout", "Zin typen - fout - wissen - versturen."),
        ("Oefentaak 4 - Emoji", "Smiley - kiezen - versturen."),
        ("Oefentaak 5 - Vinkjes", "Een/twee grijs; blauw = leesbewijzen."),
        ("Oefentaak 6 - Lezen en beantwoorden", "Antwoord lezen - kort reageren."),
        ("Oefentaak 7 - Verwijderen", "Lang indrukken - Verwijder voor mij (oefenbericht)."),
        ("Oefentaak 8 - Zelfstandig", "Gesprek - sturen - antwoord."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in [
        "Wifi + begeleider-nummer op A4",
        "WhatsApp op begeleider-telefoon werkt",
        "8-10x deelnemerskaart en oefentaken",
        "Helper voor installeren/Android-iPhone",
    ]:
        pdf.check(t)

    pdf.ln(4)
    pdf.nazorg_card(
        [
            "WhatsApp - gesprek - typen - pijl. Emoji via smiley.",
            "Vinkjes: blauw alleen met leesbewijzen aan.",
            "seniorease.nl/uitleg/whatsapp-basis",
            "Volgende les: C2 Fotos en documenten.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
