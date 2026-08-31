#!/usr/bin/env python3
"""C2 WhatsApp fotos en documenten."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-C2-Fotos-Documenten-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  C2 Fotos & documenten  |  Pakket C  |  v1.0",
        package_label="Pakket C - WhatsApp")
    pdf.alias_nb_pages()

    pdf.cover(
        "C2 - Fotos en documenten",
        "Lesmiddag 90 minuten",
        "Op het eigen toestel: een foto uit de galerij sturen, groot bekijken, "
        "en zien hoe een document werkt. Geen bord, geen presentatie.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Gids: seniorease.nl/uitleg/whatsapp-basis",
            "Pakket C (4 lessen): EUR 19,95",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Deel alleen met iemand die u vertrouwt. Geen tempo.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon of tablet  |  Geen bord/beamer")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Een foto uit de galerij via WhatsApp sturen",
            "Een foto groot openen",
            "Zien hoe een document/PDF werkt",
            "Alleen delen met een vertrouwd contact",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen status of verhalen")
    pdf.bullet("Geen groepen of videobellen (C3)")
    pdf.bullet("Geen computer, bord of presentatie")

    pdf.h2("Voorbereiding")
    pdf.bullet("Wifi + begeleider-nummer op A4")
    pdf.bullet("Optioneel: PDF op uw telefoon om voor te doen")
    pdf.bullet("Deelnemers: minstens een foto in de galerij")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Vandaag een foto sturen via WhatsApp.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + Android/iPhone. Foto in galerij?")
    pdf.h3("12:25-12:40 - Stap 1: chat openen (oefentaak 1)")
    pdf.body("Chat met begeleider of buur.")
    pdf.h3("12:40-13:05 - Stap 2: foto sturen (oefentaak 2)")
    pdf.body("Paperclip/+ /camera - Galerij - een foto - Versturen.")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:25 - Stap 3: foto groot (oefentaak 3)")
    pdf.body("Tik op de foto. Terug met pijl.")
    pdf.h3("13:25-13:40 - Stap 4: document (oefentaak 4)")
    pdf.body("Bijlage - Document. Meekijken mag; sturen optioneel.")
    pdf.h3("13:40-13:45 - Afronding")
    pdf.body("Nazorg. Volgende: C3.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 4")
    pdf.bullet("Niet schrappen: foto sturen + groot openen")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  WhatsApp - fotos en documenten", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket C  -  telefoon of tablet")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Chat openen")
    pdf.numbered(2, "Een foto sturen")
    pdf.numbered(3, "Foto groot bekijken")
    pdf.numbered(4, "Document-knop kennen")

    pdf.h2("Foto sturen - stappen")
    pdf.numbered(1, "Open een chat")
    pdf.numbered(2, "Tik op paperclip, + of camera")
    pdf.numbered(3, "Kies Fotos / Galerij")
    pdf.numbered(4, "Kies een foto - Versturen")

    pdf.h2("Tips")
    pdf.bullet("Een bestaande foto is genoeg - nieuw maken mag")
    pdf.bullet("Deel alleen met iemand die u vertrouwt")
    pdf.bullet("Geen bankpassen of codes op de foto")

    pdf.box("Onthoud", ["Bijlage - galerij - een foto - versturen."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Op uw eigen telefoon of tablet.")

    pdf.h2("Oefentaak 1 - Chat openen")
    pdf.numbered(1, "Open WhatsApp.")
    pdf.numbered(2, "Open chat met begeleider of buur.")
    pdf.body("Klaar als: u het typvak ziet.")

    pdf.h2("Oefentaak 2 - Foto sturen")
    pdf.numbered(1, "Tik op paperclip, + of camera.")
    pdf.numbered(2, "Kies Fotos / Galerij.")
    pdf.numbered(3, "Kies een foto - Versturen.")
    pdf.body("Klaar als: de foto in de chat staat.")

    pdf.h2("Oefentaak 3 - Foto groot bekijken")
    pdf.numbered(1, "Tik in de chat op de foto.")
    pdf.numbered(2, "Bekijk groot.")
    pdf.numbered(3, "Terug met pijl.")
    pdf.body("Klaar als: u de foto groot heeft gezien.")

    pdf.h2("Oefentaak 4 - Document (optioneel)")
    pdf.numbered(1, "Paperclip of + - Document / Bestand.")
    pdf.numbered(2, "Kies een bestand of kijk mee bij de begeleider.")
    pdf.body("Klaar als: u Document heeft gezien. Sturen niet verplicht.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Geen bord of beamer nodig",
        "Wifi + begeleider-nummer op A4",
        "Deelnemers hebben een foto in de galerij",
        "Optioneel: PDF om voor te doen",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
    ]:
        pdf.check(t)

    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "In de chat: paperclip of + - Galerij - foto - versturen.",
            "Foto groot: tik erop. Document: zelfde bijlage-menu.",
            "seniorease.nl/uitleg/whatsapp-basis",
            "Volgende les: C3 Bellen, videobellen en groepen.",
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
