#!/usr/bin/env python3
"""C3 WhatsApp bellen, video en groepen."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-C3-Bellen-Groepen-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  C3 Bellen & groepen  |  Pakket C  |  v1.0",
        package_label="Pakket C - WhatsApp")
    pdf.alias_nb_pages()

    pdf.cover(
        "C3 - Bellen, videobellen en groepen",
        "Lesmiddag 90 minuten",
        "Op het eigen toestel: spraakoproep, korte video-oproep, een bestaande groep "
        "openen. Zelf een groep maken is niet verplicht. Geen bord, geen presentatie.",
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
    pdf.multi_cell(0, 5, "Wifi aanbevolen voor video. Kort oefenen - ophangen mag altijd.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Wifi aanbevolen  |  Geen bord/beamer")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Een spraakoproep starten en ophangen",
            "Een korte video-oproep proberen",
            "Een bestaande groep openen en een bericht sturen",
            "Weten dat zelf een groep maken niet verplicht is",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen grote groepen verplicht aanmaken")
    pdf.bullet("Geen groepsbeheer uitdiepen")
    pdf.bullet("Geen status / verhalen")
    pdf.bullet("Geen computer, bord of presentatie")

    pdf.h2("Voorbereiding")
    pdf.bullet("Wifi op A4")
    pdf.bullet("Optioneel: oefengroep SeniorEase van tevoren")
    pdf.bullet("Helper: camera- en microfoontoestemming")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Eerst geluid, dan kort video. Groepen rustig.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + Android/iPhone. Al een familie-groep?")
    pdf.h3("12:25-12:50 - Stap 1: spraakoproep (oefentaak 1-2)")
    pdf.body("Chat openen - telefoon-icoon - kort praten - ophangen.")
    pdf.h3("12:50-13:05 - Stap 2: video (oefentaak 3)")
    pdf.body("Camera-icoon - 30-60 seconden - ophangen. Meekijken mag.")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:35 - Stap 3: groep (oefentaak 4)")
    pdf.body("Bestaande of oefengroep. Bericht: Hallo, oefening groep.")
    pdf.h3("13:35-13:45 - Afronding")
    pdf.body("Nazorg. Volgende: C4 Privacy.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap video of groepen")
    pdf.bullet("Niet schrappen: spraakoproep starten en ophangen")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  WhatsApp - bellen en groepen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket C  -  telefoon of tablet")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Spraakoproep")
    pdf.numbered(2, "Korte video-oproep")
    pdf.numbered(3, "Een groep openen")

    pdf.h2("Bellen - stappen")
    pdf.numbered(1, "Open een 1-op-1 chat")
    pdf.numbered(2, "Tik op telefoon (geluid) of camera (video)")
    pdf.numbered(3, "Praat kort")
    pdf.numbered(4, "Rood knopje = ophangen")

    pdf.h2("Groepen")
    pdf.bullet("Open een groep die u al heeft - of de oefengroep")
    pdf.bullet("Stuur een kort bericht")
    pdf.bullet("Zelf een groep maken: alleen als u wilt")

    pdf.box("Onthoud", ["Ophangen mag altijd. Video lust wifi - handig in het clubhuis."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Wifi bij voorkeur aan.")

    pdf.h2("Oefentaak 1 - Chat openen")
    pdf.numbered(1, "Open WhatsApp.")
    pdf.numbered(2, "Open chat met begeleider of buur (geen groep nog).")
    pdf.body("Klaar als: 1-op-1 chat open is.")

    pdf.h2("Oefentaak 2 - Spraakoproep")
    pdf.numbered(1, "Tik op het telefoon-icoon.")
    pdf.numbered(2, "Zeg kort hallo.")
    pdf.numbered(3, "Hang op (rood knopje).")
    pdf.body("Klaar als: u heeft gebeld of opgenomen en opgehangen.")

    pdf.h2("Oefentaak 3 - Video (kort)")
    pdf.numbered(1, "Tik op camera / video.")
    pdf.numbered(2, "Sta camera toe als gevraagd.")
    pdf.numbered(3, "30-60 seconden - ophangen.")
    pdf.body("Klaar als: u video heeft geprobeerd (meekijken mag).")

    pdf.h2("Oefentaak 4 - Groep openen")
    pdf.numbered(1, "Open een bestaande groep of de oefengroep.")
    pdf.numbered(2, "Typ: Hallo, oefening groep.")
    pdf.numbered(3, "Verstuur.")
    pdf.body("Klaar als: bericht in de groep staat. Zelf groep maken niet verplicht.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Geen bord of beamer nodig",
        "Wifi-wachtwoord op A4",
        "Optioneel: oefengroep van tevoren",
        "Helper voor camera-toestemming",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
    ]:
        pdf.check(t)

    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "In een chat: telefoon = geluid, camera = video. Rood = ophangen.",
            "Groep: openen en bericht sturen is genoeg. Zelf maken mag later.",
            "seniorease.nl/uitleg/whatsapp-basis",
            "Volgende les: C4 Privacy en fraude.",
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
