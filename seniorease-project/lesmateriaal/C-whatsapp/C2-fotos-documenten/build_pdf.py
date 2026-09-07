#!/usr/bin/env python3
"""C2 Foto's en documenten via WhatsApp — printpakket v2.0 (C1-productiemal)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import CLessonPDF, MUTED, NAVY, GOLD  # noqa: E402

C2_VERSION = "v2.0"
C2_TITLE = "Foto's en documenten via WhatsApp"
OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-C2-Fotos-Documenten-v2.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = CLessonPDF(
        f"SeniorEase  |  C2 {C2_TITLE}  |  Pakket C  |  {C2_VERSION}",
        package_label="Pakket C - WhatsApp",
    )
    pdf._footer_version = C2_VERSION
    pdf.alias_nb_pages()

    pdf.cover(
        f"C2 - {C2_TITLE}",
        "Les circa 90 minuten",
        "ONTVANGEN → OPENEN → TERUGVINDEN → KIEZEN → CONTROLEREN → VERSTUREN. "
        "Een foto of document ontvangen, terugvinden en veilig versturen. "
        "Ook geschikt voor begeleiders zonder technische achtergrond.",
        [
            "START HIER · Draaiboek · Beamer · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist",
            "De Beamer hoort bij deze les en wordt als apart PDF-bestand geleverd.",
        ],
        [
            "Versie 2.0 — september 2026",
            "Volgende: C3 Bellen en videobellen met WhatsApp",
        ],
        contents_title="Bij deze les ontvangt u",
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5,
        "Methode: ZIEN → NADOEN → BEGRIJPEN → ZELF DOEN. "
        "Inloop telt niet mee. Geen apart oefenblad. Eindmissie altijd behouden. "
        "iPhone en Android gelijkwaardig.",
    )

    # START HIER
    pdf.add_page()
    pdf.h1("1. START HIER — voor de begeleider")
    pdf.muted("Lees dit blad eerst.")
    pdf.box(
        "U hoeft geen technisch expert te zijn",
        [
            "U begeleidt. Deelnemers oefenen op hun eigen telefoon of tablet.",
            "Route: ONTVANGEN → OPENEN → TERUGVINDEN → KIEZEN → CONTROLEREN → VERSTUREN.",
            "FOTO + PERSOON → dan pas versturen.",
            "VERWACHT U DIT DOCUMENT? → dan pas openen.",
        ],
    )
    pdf.h2("Wat leert de deelnemer?")
    pdf.body(
        "Na C2 kan de deelnemer een foto of document in WhatsApp openen "
        "en zelf een foto veilig naar de juiste persoon sturen."
    )
    pdf.h2("Oefencontact (vast)")
    pdf.body(
        "Begeleider of helper = veilig oefencontact. Eigen bekende mag ook. "
        "Geen telefoonnummers op de beamer. Helper weet wanneer foto/document moet worden gestuurd."
    )
    pdf.h2("Oefenmateriaal klaarzetten")
    pdf.bullet("Lesfoto (neutraal object) + tweede eindmissiefoto")
    pdf.bullet("Neutrale retourfoto (helper stuurt terug in eindmissie)")
    pdf.bullet("SeniorEase-oefendocument-C2.pdf")
    pdf.bullet("SeniorEase-eindmissie-C2.pdf")
    pdf.bullet(
        "Helper eindmissie vooraf klaar: tweede oefenfoto · retourfoto · eindmissie-PDF"
    )
    pdf.bullet("Geen personen, kinderen, medische info of identiteitsdocumenten")
    pdf.h2("Vooraf (± 10–15 min)")
    pdf.numbered(1, "Bekijk de beamer-PDF.")
    pdf.numbered(2, "Zelf kort: oefenfoto en oefendocument sturen via WhatsApp.")
    pdf.numbered(3, "Lees Hulp bij vastlopen.")
    pdf.numbered(4, "Controleer oefencontact en oefenbestanden.")
    pdf.numbered(5, "Print, beamer, deelnemerskaarten, oplaadkabels.")
    pdf.h2("Groep")
    pdf.bullet("Max. ongeveer 8–10 · helper sterk aanbevolen")
    pdf.bullet("Inloop vóór de les — telt niet mee in de 90 minuten")
    pdf.bullet("iPhone én Android gelijkwaardig")
    pdf.h2("Afspraken")
    pdf.bullet('Eerst: "Wat ziet u nu?"')
    pdf.bullet("Vragen → uitleggen → aanwijzen → zelf → pas laatste kort overnemen.")
    pdf.bullet("Uw scherm kan er iets anders uitzien. Dat is normaal.")
    pdf.bullet('Niet zeggen: "Een PDF is veilig."')
    pdf.bullet("Eindmissie nooit schrappen — verkort liever herhalen.")

    # Draaiboek
    pdf.add_page()
    pdf.h1("2. Draaiboek — begeleider")
    pdf.h2("Rollen")
    pdf.body("Begeleider: tempo, groep, voorbeeld.")
    pdf.body("Helper: alleen 1-op-1. Max. 8–10 | Wat ziet u nu?")
    pdf.h2("Leerdoel")
    pdf.body(
        "Foto of document openen; foto veilig versturen; ontvangen media "
        "later opnieuw in het gesprek terugvinden."
    )
    pdf.h2("Centrale situatie")
    pdf.body(
        '"Iemand stuurt u via WhatsApp een foto en een document. '
        "Hoe bekijkt u die later opnieuw — en hoe stuurt u zelf de juiste foto "
        'naar de juiste persoon?"'
    )
    pdf.h2("Gouden kapstokken")
    pdf.body("ONTVANGEN → OPENEN → TERUGVINDEN → KIEZEN → CONTROLEREN → VERSTUREN")
    pdf.body("CONTROLEER DE FOTO ÉN DE PERSOON → DAN PAS VERSTUREN")
    pdf.body("VERWACHT U DIT DOCUMENT? → DAN PAS OPENEN")
    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen Camera-/Galerij-les (A4) · geen bellen (C3) · geen fraude/privacy (C4)")
    pdf.bullet("Geen Downloads-les · geen WhatsApp Web")

    pdf.ln(2)
    pdf._left()
    pdf.set_font("DejaVu", "B", 13)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(0, 7, "Tijdlijn (90 minuten — inloop telt niet mee)")
    pdf.ln(1)
    for when, what in [
        ("0–5", "C1 terughalen"),
        ("5–10", "Situatie + kapstokken"),
        ("10–20", "Foto ontvangen → openen"),
        ("20–30", "Foto opnieuw terugvinden (kern)"),
        ("30–45", "Zelf bestaande foto kiezen"),
        ("45–50", "FOTO + PERSOON → versturen"),
        ("50–55", "Pauze"),
        ("55–65", "Document: verwachting → openen"),
        ("65–72", "Document opnieuw terugvinden (kern)"),
        ("72–78", "Herhalen / hulp"),
        ("78–90", "Eindmissie (altijd behouden)"),
    ]:
        pdf.ensure_space(7)
        pdf._left()
        pdf.set_font("DejaVu", "B", 10)
        pdf.set_text_color(*NAVY)
        pdf.cell(22, 4.8, when)
        pdf.set_font("DejaVu", "", 10)
        pdf.set_text_color(*MUTED)
        pdf.multi_cell(0, 4.8, what)

    pdf.add_page()

    def blok(titel, situatie, doel, zegt, extra):
        pdf.h2(titel)
        pdf.set_font("DejaVu", "B", 10)
        pdf.set_text_color(*NAVY)
        pdf.multi_cell(0, 5, "Situatie")
        pdf.body(situatie)
        pdf.set_font("DejaVu", "B", 10)
        pdf.set_text_color(*NAVY)
        pdf.multi_cell(0, 5, "Doel")
        pdf.body(doel)
        pdf.set_font("DejaVu", "B", 10)
        pdf.set_text_color(*NAVY)
        pdf.multi_cell(0, 5, "Zegt u ongeveer")
        pdf.body(zegt)
        for line in extra:
            pdf.bullet(line)

    pdf.h2("C1 terughalen (0–5)")
    pdf.body(
        "WhatsApp → oefencontact → naam → Ik ben klaar om te oefenen. → antwoord. "
        "Brug: Vorige keer tekstbericht. Vandaag foto en document."
    )
    blok(
        "Foto ontvangen (10–20)",
        "Helper stuurt de lesfoto.",
        "Foto herkennen en openen; terug naar gesprek.",
        "U krijgt zo een oefenfoto. Open die. Ga daarna terug naar het gesprek.",
        ["Helper stuurt lesfoto"],
    )
    blok(
        "Foto terugvinden (20–30) — kern",
        "Even weg van de foto.",
        "Zelfde ontvangen foto opnieuw in het gesprek vinden.",
        "Kunt u de foto nu zelf weer terugvinden?",
        ["Niet: openen → klaar"],
    )
    blok(
        "Zelf foto kiezen (30–45)",
        "Vanuit WhatsApp een bestaande foto.",
        "Toevoegen → Foto's/Galerij → afgesproken oefenfoto.",
        "Nog niet versturen.",
        ["iPhone | Android alleen waar knoppen verschillen"],
    )

    pdf.add_page()
    blok(
        "FOTO + PERSOON (45–50)",
        "Twee stopmomenten.",
        "Juiste foto én juiste persoon → dan versturen.",
        "Stop. Is dit de juiste foto? Stop. Klopt de naam? Dan pas versturen.",
        ["Veiligheidskern van C2"],
    )
    blok(
        "Document ontvangen (55–65)",
        "Helper stuurt SeniorEase-oefendocument-C2.pdf.",
        "Vóór openen: verwacht ik dit? Daarna openen.",
        "Stop. Verwachtte u dit document? Twijfel? Niet openen.",
        ['Niet zeggen: "Een PDF is veilig."'],
    )
    blok(
        "Document terugvinden (65–72) — kern",
        "Even weg van het document.",
        "Document opnieuw in hetzelfde gesprek vinden.",
        "Kunt u het document zelf weer terugvinden?",
        ["Geen Downloads-/mappenles"],
    )

    pdf.h2("Eindmissie (78–90) — 18 stappen — zonder voordoen — altijd behouden")
    pdf.muted(
        "Helper klaar: tweede oefenfoto · neutrale retourfoto · SeniorEase-eindmissie-C2.pdf. "
        "Binnen ca. 10–12 min."
    )
    for i, t in enumerate(
        [
            "Open WhatsApp.",
            "Kies het afgesproken oefencontact of uw eigen oefenpersoon.",
            "Controleer de naam.",
            "Kies vanuit WhatsApp de afgesproken tweede oefenfoto.",
            "Controleer: is dit de juiste foto?",
            "Controleer: is dit de juiste persoon?",
            "Verstuur de foto.",
            "Wacht tot het oefencontact een neutrale foto terugstuurt.",
            "Open de ontvangen foto.",
            "Ga terug naar het gesprek.",
            "Verander kort van positie in het gesprek.",
            "Zoek de ontvangen foto zelfstandig opnieuw terug en open hem.",
            "Wacht tot het oefencontact SeniorEase-eindmissie-C2.pdf stuurt.",
            "Stop vóór u het opent.",
            "Controleer: verwachtte ik dit document?",
            "Open het document.",
            "Ga terug naar WhatsApp.",
            "Zoek het document opnieuw terug in het gesprek.",
        ],
        1,
    ):
        pdf.numbered(i, t)
    pdf.bullet(
        'Afsluiting: "Gelukt? Dan kunt u zelf een foto via WhatsApp versturen '
        'en een verwacht document openen en terugvinden."'
    )
    pdf.muted("Tijd krap: verkort herhalen — eindmissie niet schrappen.")

    # Hulp
    pdf.add_page()
    pdf.h1("3. C2 — Hulp bij vastlopen")
    pdf.muted("Voor begeleider en helper. Niet op de beamer.")
    pdf.box(
        "Centrale vraag + volgorde",
        [
            'Eerst: "Wat ziet u nu?"',
            "Daarna: vragen → uitleggen → aanwijzen → zelf → pas laatste kort overnemen.",
        ],
    )
    for titel, bullets in [
        ("Ik zie de ontvangen foto niet", ["Scroll in gesprek", "Helper 1-op-1"]),
        ("De foto opent niet", ["Tik op de foto", "Even wachten"]),
        ("Ik weet niet hoe ik terugkom", ["Terugpijl / gebaar", "Terug naar chat"]),
        ("Ik zie Foto's/Galerij niet", ["iPhone | Android tonen", "Niet eindeloos zoeken"]),
        ("Verkeerde foto geselecteerd", ["Annuleren vóór versturen", "FOTO + PERSOON"]),
        ("Twijfel naar wie", ["STOP · naam controleren", "Niet versturen"]),
        ("Ik zie het document niet", ["Scroll · PDF-icoon/naam"]),
        ("Mag ik openen?", ["Verwacht?", "Twijfel → niet openen"]),
        ("Document opent in andere app", ["Normaal", "Terug naar WhatsApp"]),
        ("Scherm ziet er anders uit", ["Dat is normaal."]),
        ("Oefencontact stuurt niet", ["Helper checkt · opnieuw sturen"]),
    ]:
        pdf.h2(titel)
        for b in bullets:
            pdf.bullet(b)

    # Deelnemerskaart
    pdf.add_page()
    pdf.h1("4. Deelnemerskaart")
    pdf.muted("Mee naar huis. Niet de hele les.")
    pdf.box(
        "Kapstok",
        [
            "ONTVANGEN → OPENEN → TERUGVINDEN → KIEZEN → CONTROLEREN → VERSTUREN",
        ],
    )
    pdf.h2("Foto ontvangen")
    pdf.body("OPENEN → TERUG → TERUGVINDEN")
    pdf.h2("Foto versturen")
    pdf.body("KIEZEN → FOTO CONTROLEREN → PERSOON CONTROLEREN → VERSTUREN")
    pdf.box("FOTO + PERSOON", ["→ DAN PAS VERSTUREN"])
    pdf.h2("Document")
    pdf.body("VERWACHT U DIT DOCUMENT? → DAN PAS OPENEN")
    pdf.body("Bij twijfel: NIET OPENEN → EERST CONTROLEREN")
    pdf.h2("Dit kan ik nu")
    for t in [
        "Ontvangen foto openen",
        "Foto opnieuw terugvinden",
        "Juiste foto kiezen",
        "Juiste persoon controleren",
        "Foto versturen",
        "Verwacht document openen",
        "Document opnieuw terugvinden",
    ]:
        pdf.check(t)

    # Zaalchecklist
    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "START HIER gelezen; hulpkaart bij de hand",
        "WhatsApp werkt",
        "Internetverbinding werkt",
        "Oefencontact bereikbaar",
        "Lesfoto gereed",
        "Tweede eindmissiefoto gereed",
        "Neutrale retourfoto gereed (eindmissie)",
        "SeniorEase-oefendocument-C2.pdf gereed",
        "SeniorEase-eindmissie-C2.pdf gereed",
        "iPhone-route gecontroleerd",
        "Android-route gecontroleerd",
        "Geen privéfoto's nodig",
        "Geen telefoonnummers op beamer",
        "Helper weet: lesfoto / oefendocument / eindmissie-retour + PDF",
        "Eindmissie-materiaal apart klaarhouden (18 stappen)",
        "Beamer-PDF klaar",
        "8–10× deelnemerskaart",
    ]:
        pdf.check(t)

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
