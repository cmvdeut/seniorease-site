#!/usr/bin/env python3
"""E3 Gemeente / Belastingdienst."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, NAVY, MUTED, WHITE, LessonPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-E3-Gemeente-Belastingdienst-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF("SeniorEase  |  E3 Gemeente & Belastingdienst  |  Pakket E  |  v1.0",
        package_label="Pakket E - DigiD & digitale overheid")
    pdf.alias_nb_pages()

    pdf.cover(
        "E3 - Gemeente en Belastingdienst",
        "Lesmiddag 90 minuten",
        "belastingdienst.nl en de gemeentesite veilig openen, DigiD-inloggen vinden. "
        "Geen aangifte of betaling in de les. Telefoon/tablet of computer.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
        [
            "Versie 1.0 - augustus 2026",
            "Geen aangifte afronden in de groep",
            "Pakket E (4 lessen): EUR 19,95",
        ],
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5, "Zelf typen of veilig zoeken. Bij twijfel: IDO.")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon/tablet of computer")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "belastingdienst.nl zelf openen",
            "De site van hun gemeente vinden",
            "Inloggen / DigiD-knop herkennen",
            "Weten: geen aangifte forceren; IDO mag",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen volledige aangifte of betaling")
    pdf.bullet("Geen BSN of bedragen hardop")
    pdf.bullet("Geen nep-links uit SMS")

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.h3("12:00-12:15 - Inloop")
    pdf.body("Welkom. Sites openen - geen aangifte vandaag.")
    pdf.h3("12:15-12:25 - Kennismaking")
    pdf.body("Voornaam + woonplaats. Apparaat?")
    pdf.h3("12:25-12:50 - Stap 1: Belastingdienst (oefentaak 1-2)")
    pdf.body("Typ belastingdienst.nl. Zoek Inloggen / DigiD.")
    pdf.h3("12:50-13:05 - Stap 2: gemeente vinden (oefentaak 3)")
    pdf.body("Zoek: gemeente + plaatsnaam. Check URL.")
    pdf.h3("13:05-13:10 - Pauze")
    pdf.h3("13:10-13:35 - Stap 3: gemeentesite (oefentaak 4)")
    pdf.body("DigiD / Mijn gemeente / Afspraak - alleen kijken.")
    pdf.h3("13:35-13:45 - Afronding")
    pdf.body("Nazorg. Volgende: E4.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Alleen Belastingdienst + gemeente openen")
    pdf.bullet("Niet schrappen: zelf typen / veilig zoeken")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Gemeente en Belastingdienst", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  -  Pakket E  -  telefoon/tablet of computer")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "belastingdienst.nl openen")
    pdf.numbered(2, "Inloggen / DigiD vinden")
    pdf.numbered(3, "Uw gemeentesite vinden")
    pdf.numbered(4, "Op de gemeentesite DigiD of Mijn ... zoeken")

    pdf.h2("Echte adressen")
    pdf.bullet("belastingdienst.nl")
    pdf.bullet("digid.nl")
    pdf.bullet("Gemeente: zoek op gemeente + uw plaats")

    pdf.h2("Veilig")
    pdf.bullet("Typ zelf of kies de officiële site - geen link uit een rare SMS")
    pdf.bullet("Geen aangifte afronden in de lesgroep")
    pdf.bullet("Hulp: IDO / Digisterker")

    pdf.box("Onthoud", ["Aankomen is genoeg vandaag. Afronden doet u rustig thuis of met hulp."])

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Geen aangifte of betaling afronden. Codes stil.")

    pdf.h2("Oefentaak 1 - Belastingdienst")
    pdf.body("Typ belastingdienst.nl (telefoon of computer).")
    pdf.body("Klaar als: de site open is.")

    pdf.h2("Oefentaak 2 - Inloggen vinden")
    pdf.numbered(1, "Zoek Inloggen / Mijn Belastingdienst / DigiD.")
    pdf.numbered(2, "Stop of 1-op-1 met helper - niet verplicht inloggen.")
    pdf.body("Klaar als: u de route heeft gevonden.")

    pdf.h2("Oefentaak 3 - Gemeente vinden")
    pdf.numbered(1, "Zoek: gemeente + uw plaatsnaam.")
    pdf.numbered(2, "Open de officiele gemeentesite.")
    pdf.numbered(3, "Check de adresbalk.")
    pdf.body("Klaar als: u op uw gemeentesite bent.")

    pdf.h2("Oefentaak 4 - Rondkijken op de gemeentesite")
    pdf.numbered(1, "Zoek DigiD / Inloggen / Mijn gemeente / Afspraak.")
    pdf.numbered(2, "Alleen kijken - niets afronden.")
    pdf.body("Klaar als: u zo'n knop heeft gezien.")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Wifi op A4",
        "belastingdienst.nl bereikbaar",
        "Helper voor Google-hits / login",
        "Geen aangiftes afronden",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
    ]:
        pdf.check(t)

    pdf.h1("5. Nazorgkaart")
    pdf.nazorg_card(
        [
            "Typ belastingdienst.nl zelf. Gemeente: zoek gemeente + plaatsnaam.",
            "Inloggen met DigiD. Aangifte rustig thuis of met IDO/Digisterker.",
            "seniorease.nl",
            "Volgende les: E4 Veilig omgaan met DigiD-berichten.",
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
