#!/usr/bin/env python3
"""A4 Fotos - telefoon/tablet, pakket A-stijl."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-A4-Fotos-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  A4 Fotos  |  Pakket A  |  v1.0",
        package_label="Pakket A - Telefoon & tablet")
    pdf.alias_nb_pages()

    pdf.cover(
        "A4 - Fotos maken, terugvinden en delen",
        "Lesmiddag 90 minuten",
        "Op het eigen toestel: camera openen, foto maken, terugvinden in de galerij, "
        "optioneel delen via WhatsApp. Einde van pakket A. Geen bord, geen presentatie.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Gidsen: seniorease.nl/uitleg/fotos-maken",
            "Pakket A compleet - EUR 19,95 voor 4 lessen",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5,
        "Drie tips: licht, stilhouden, tikken om scherp te stellen. Geen tempo.",
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon of tablet  |  Geen bord/beamer")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Camera openen en een scherpe foto maken",
            "De foto terugvinden in Galerij / Fotos",
            "Een foto delen via WhatsApp (optioneel)",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen fotos naar de computer")
    pdf.bullet("Geen filters of bewerken")
    pdf.bullet("Geen cloud-accounts verplichten")
    pdf.bullet("Geen computer, bord of presentatie")

    pdf.h2("Voorbereiding")
    pdf.bullet("Genoeg licht; oplaadkabels")
    pdf.bullet("Optioneel: WhatsApp-nummer begeleider op A4")
    pdf.bullet("Helper: Android vs iPhone galerij-namen")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Foto maken, terugvinden, eventueel delen. Rustig tempo.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + Android/iPhone. Geen vreemde mensen zonder toestemming.")
    pdf.h3("12:25-12:45 - Stap 1: foto maken (oefentaak 1)")
    pdf.body("Tips: licht, stilhouden, tikken. 2 of 3 fotos van iets in de zaal.")
    pdf.h3("12:45-13:05 - Stap 2: terugvinden (oefentaak 2)")
    pdf.body("Galerij / Fotos. Zoek recente fotos. Open er een groot.")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:30 - Stap 3: delen (oefentaak 3)")
    pdf.body("Foto - Delen - WhatsApp - oefencontact. Geen WhatsApp? Stop na stap 2.")
    pdf.h3("13:30-13:45 - Afronding")
    pdf.body("Maken, vinden, delen. Nazorg. Pakket A compleet.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap delen")
    pdf.bullet("Niet schrappen: camera, foto maken, galerij")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Fotos maken en delen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket A  -  telefoon of tablet")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Een foto maken")
    pdf.numbered(2, "De foto terugvinden")
    pdf.numbered(3, "Optioneel: delen via WhatsApp")

    pdf.h2("Drie tips bij het maken")
    pdf.numbered(1, "Licht op het onderwerp (niet tegen het raam in)")
    pdf.numbered(2, "Stilhouden - liefst twee handen")
    pdf.numbered(3, "Tik op het scherm om scherp te stellen")

    pdf.h2("Delen - kort")
    pdf.numbered(1, "Open de foto")
    pdf.numbered(2, "Tik op Delen")
    pdf.numbered(3, "Kies WhatsApp en een vertrouwd contact")

    pdf.box("Onthoud", ["Maken - terugvinden - delen. Een foto per keer is genoeg."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Op uw eigen telefoon of tablet.")

    pdf.h2("Oefentaak 1 - Foto maken")
    pdf.numbered(1, "Open de Camera.")
    pdf.numbered(2, "Kies iets in de zaal (niet tegen fel licht in).")
    pdf.numbered(3, "Houd stil, tik op het scherm, maak 2 of 3 fotos.")
    pdf.body("Klaar als: u nieuwe fotos heeft gemaakt.")

    pdf.h2("Oefentaak 2 - Terugvinden")
    pdf.numbered(1, "Open Galerij / Fotos / Google Fotos.")
    pdf.numbered(2, "Zoek de fotos van zojuist (vaak bovenaan).")
    pdf.numbered(3, "Open er een groot.")
    pdf.body("Klaar als: u de foto van zojuist kunt aanwijzen.")

    pdf.h2("Oefentaak 3 - Delen via WhatsApp (optioneel)")
    pdf.numbered(1, "Open de foto - Delen - WhatsApp.")
    pdf.numbered(2, "Kies begeleider of buur - versturen.")
    pdf.body("Of: WhatsApp-chat - bijlage - foto - versturen.")
    pdf.body("Klaar als: de ander de foto ontvangt. Geen WhatsApp? Stop na oefentaak 2.")

    pdf.h2("Android / iPhone (helper)")
    pdf.bullet("Android: Galerij of Google Fotos; Delen-icoon")
    pdf.bullet("iPhone: Fotos; vierkant met pijl omhoog om te delen")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Geen bord of beamer nodig",
        "Genoeg licht in de zaal",
        "Oplaadkabels / powerbank",
        "Optioneel: WhatsApp-nummer begeleider op A4",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
    ]:
        pdf.check(t)

    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Camera: licht, stilhouden, tikken. Galerij: recente fotos bovenaan.",
            "Delen: foto - Delen - WhatsApp - vertrouwd contact.",
            "seniorease.nl/uitleg/fotos-maken",
            "Pakket A is compleet. Opfrisser: les A1.",
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
