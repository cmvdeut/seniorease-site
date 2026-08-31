#!/usr/bin/env python3
"""A4 Fotos - telefoon/tablet, pakket A-stijl."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import (  # noqa: E402
    GOLD,
    LESSON_VERSION,
    MUTED,
    NAVY,
    WHITE,
    ALessonPDF,
)

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-A4-Fotos-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = ALessonPDF(
        f"SeniorEase  |  A4 Fotos  |  Pakket A  |  {LESSON_VERSION}",
        package_label="Pakket A - Telefoon & tablet",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "A4 - Fotos maken, terugvinden en delen",
        "Lesmiddag 90 minuten",
        "Camera leren kennen, eenvoudige foto's maken, door de galerij vegen, "
        "testfoto verwijderen, delen via WhatsApp met controle vóór versturen. "
        "Einde van pakket A. Privacy: altijd toestemming vragen. Geen bord.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. Zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Gidsen: seniorease.nl/uitleg/fotos-maken",
            "Pakket A compleet - EUR 19,95 voor 4 lessen",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.muted("90 min (+ 15 inloop)  |  Max. 8-10  |  Telefoon of tablet  |  Geen bord/beamer")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Camera kennen: sluiter, voor-/achtercamera, foto vs video",
            "Zelfstandig de camera gebruiken en een duidelijke foto maken",
            "Eenvoudige foto's: voorwerp dichtbij, iets verder weg (selfie optioneel)",
            "In Galerij/Fotos door foto's vegen en terug naar overzicht",
            "Testfoto verwijderen (alleen foto's van vandaag)",
            "Foto delen via WhatsApp; vóór versturen foto en ontvanger controleren",
            "Zelfstandig: camera - foto - vinden - delen - testfoto weg",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen filters, bewerking, albums of cloudopslag")
    pdf.bullet("Geen fotos naar de computer")
    pdf.bullet("Nooit bestaande persoonlijke foto's laten verwijderen")
    pdf.bullet("Geen computer, bord of presentatie")

    pdf.h2("Voorbereiding")
    pdf.bullet("Genoeg licht; oplaadkabels")
    pdf.bullet("WhatsApp-nummer begeleider op A4")
    pdf.bullet("Helper: Android vs iPhone galerij, verwijderen, delen")

    pdf.h2("Drie fototips + zoom")
    pdf.numbered(1, "Voldoende licht op het onderwerp")
    pdf.numbered(2, "Telefoon stilhouden - twee handen")
    pdf.numbered(3, "Tikken om scherp te stellen")
    pdf.body("Zoom (kort): twee vingers spreiden = inzoomen; knijpen = uitzoomen.")

    pdf.h2("Privacy")
    pdf.body(
        "Vraag toestemming vóór u iemand fotografeert of een foto deelt."
    )

    pdf.h2("Tijdlijn (start 12:00)")
    pdf.tijdlijn_item(
        "12:00-12:15 - Inloop",
        "Welkom. Camera, foto's, galerij, delen, testfoto weg. Rustig tempo.",
    )
    pdf.tijdlijn_item(
        "12:15-12:25 - Kennismaking + privacy",
        "Voornaam + Android/iPhone. Toestemming vragen vóór foto's van anderen.",
    )
    pdf.tijdlijn_item(
        "12:25-12:38 - Stap 1: camera kennen (oefentaak 1)",
        "Sluiterknop, voor-/achtercamera, foto vs video (vandaag alleen foto).",
    )
    pdf.tijdlijn_item(
        "12:38-13:00 - Stap 2: foto's maken (oefentaak 2)",
        "Tips + zoom kort. Doe-opdracht: iets moois of grappigs in de zaal. "
        "Voorwerp dichtbij, iets verder weg, selfie optioneel.",
    )
    pdf.tijdlijn_item("13:00-13:05 - Pauze", "")
    pdf.tijdlijn_item(
        "13:05-13:18 - Stap 3: door foto's vegen (oefentaak 3)",
        "Galerij openen. Vegen. Terug naar overzicht.",
    )
    pdf.tijdlijn_item(
        "13:18-13:28 - Stap 4: testfoto verwijderen (oefentaak 4)",
        "Alleen testfoto van vandaag. Prullenbak/Recent verwijderd - soms terughalen.",
    )
    pdf.tijdlijn_item(
        "13:28-13:40 - Stap 5: delen via WhatsApp (oefentaak 5)",
        "Lesonderdeel voor wie WhatsApp heeft. Delen - controleren foto + ontvanger - "
        "versturen. Geen WhatsApp: meekijken, stop na stap 4.",
    )
    pdf.tijdlijn_item(
        "13:40-13:43 - Eindopdracht zelfstandig (oefentaak 6)",
        "Camera - testfoto - vinden - openen - overzicht - delen/aanwijzen Delen - "
        "testfoto verwijderen.",
    )
    pdf.tijdlijn_item("13:43-13:45 - Afronding", "Nazorg. Pakket A compleet.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap eindopdracht (oefentaak 6) of selfie")
    pdf.bullet(
        "Niet schrappen: camera + foto's maken + galerij vegen + testfoto "
        "verwijderen + delen (WhatsApp)"
    )

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
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket A  -  telefoon of tablet  -  {LESSON_VERSION}")
    pdf.ln(2)

    pdf.h2("Wat u vandaag oefent")
    pdf.numbered(1, "Camera leren kennen")
    pdf.numbered(2, "Eenvoudige foto's maken")
    pdf.numbered(3, "Door foto's heen vegen in Galerij")
    pdf.numbered(4, "Testfoto verwijderen (alleen van vandaag)")
    pdf.numbered(5, "Delen via WhatsApp + controleren vóór versturen")
    pdf.numbered(6, "Zelfstandig: hele keten opnieuw")

    pdf.h2("Drie tips bij het maken")
    pdf.numbered(1, "Voldoende licht (niet tegen het raam in)")
    pdf.numbered(2, "Stilhouden - liefst twee handen")
    pdf.numbered(3, "Tik op het scherm om scherp te stellen")

    pdf.box(
        "Privacy",
        [
            "Vraag toestemming vóór u iemand fotografeert of een foto deelt.",
            "Vóór versturen: klopt de foto? Klopt de ontvanger?",
        ],
    )

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted(f"Op uw eigen telefoon of tablet. Versie {LESSON_VERSION.lstrip('v')}.")

    pdf.h2("Oefentaak 1 - Camera leren kennen")
    pdf.numbered(1, "Open Camera. Zoek sluiterknop en wissel voor-/achtercamera.")
    pdf.numbered(2, "Foto = stilstaand beeld. Video = bewegend (vandaag alleen foto).")
    pdf.body("Klaar als: u de sluiterknop kent en kunt wisselen.")

    pdf.h2("Oefentaak 2 - Eenvoudige foto's maken")
    pdf.body("Tips: licht, stilhouden, tikken. Zoom: twee vingers spreiden/knijpen.")
    pdf.numbered(1, "Eén voorwerp dichtbij.")
    pdf.numbered(2, "Iets verder weg.")
    pdf.numbered(3, "Doe-opdracht: iets moois of grappigs in de zaal.")
    pdf.numbered(4, "Selfie - optioneel.")
    pdf.body("Klaar als: minstens twee duidelijke foto's.")

    pdf.h2("Oefentaak 3 - Door foto's heen vegen")
    pdf.numbered(1, "Open Galerij / Fotos.")
    pdf.numbered(2, "Open een foto groot - veeg links/rechts.")
    pdf.numbered(3, "Ga terug naar het overzicht.")
    pdf.body("Klaar als: u heeft geveegd en het overzicht teruggevonden.")

    pdf.h2("Oefentaak 4 - Testfoto verwijderen")
    pdf.body("Alleen testfoto van vandaag - nooit een oude persoonlijke foto.")
    pdf.numbered(1, "Open testfoto - Verwijderen / Prullenbak - bevestigen.")
    pdf.body(
        "Verwijderde foto vaak in Prullenbak/Recent verwijderd - soms terughalen."
    )
    pdf.body("Klaar als: één testfoto weg; oude foto's intact.")

    pdf.h2("Oefentaak 5 - Delen via WhatsApp")
    pdf.body("Geen WhatsApp? Meekijken - klaar na oefentaak 4.")
    pdf.numbered(1, "Foto openen - Delen - WhatsApp - begeleider (A4).")
    pdf.numbered(2, "Controleren: klopt foto? Klopt ontvanger? Versturen.")
    pdf.body("Klaar als: foto verstuurd of Delen geoefend.")

    pdf.h2("Oefentaak 6 - Zelfstandig (eindopdracht)")
    pdf.body(
        "Camera - testfoto - vinden - openen - overzicht - delen of Delen aanwijzen - "
        "testfoto verwijderen."
    )

    pdf.h2("Android / iPhone (helper)")
    pdf.bullet("Android: Galerij; Prullenbak; Delen-icoon")
    pdf.bullet("iPhone: Fotos; Recent verwijderd; vierkant met pijl omhoog")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist + nazorgkaart")
    for t in [
        "Geen bord of beamer nodig",
        "Genoeg licht in de zaal",
        "Oplaadkabels / powerbank",
        "WhatsApp-nummer begeleider op A4",
        "8-10x deelnemerskaart en oefentaken",
        "8-10x nazorgkaart",
    ]:
        pdf.check(t)

    pdf.ln(4)
    pdf.nazorg_card(
        [
            "Camera: sluiter, wisselen, foto. Tips: licht, stil, tikken. Zoom: twee vingers.",
            "Galerij: vegen door foto's - terug naar overzicht.",
            "Verwijderen: alleen testfoto's. Prullenbak/Recent verwijderd.",
            "Delen: controleren foto + ontvanger. Toestemming vragen.",
            "seniorease.nl/uitleg/fotos-maken",
            "Pakket A is compleet. Opfrisser: les A1.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
